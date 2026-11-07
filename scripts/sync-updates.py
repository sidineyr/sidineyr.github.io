"""Snapshot recent public project commits; never treat code history as deployment proof."""
from pathlib import Path
from datetime import datetime, timezone
from urllib.parse import urlencode
import concurrent.futures
import json
import os
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
PROJECTS = {
    'art': ('art', None),
    'einstein': ('Einstein-Fisica', None),
    'horizonte': ('horizonte', None),
    'quality-view': ('qv', None),
    'python-swirl': ('python-swirl-statistics', None),
    'chemical': ('Chemical', None),
    'filosofia': ('filosofia-aberta', None),
    'biosfera': ('biosfera', None),
    'atlas': ('atlas-do-sagrado', None),
    'bb': ('bb', None),
    'contraprova': ('contraprova', None),
    'polliniza': ('Polliniza', None),
    'universidade': ('sidineyr.github.io', 'universidade'),
    'callguid': ('callguid', None),
}


def read(repo, path):
    params = {'per_page': 30}
    if path:
        params['path'] = path
    url = f'https://api.github.com/repos/sidineyr/{repo}/commits?{urlencode(params)}'
    headers = {'User-Agent': 'Sidiney-Portfolio-Updates/1.0', 'Accept': 'application/vnd.github+json'}
    token = os.environ.get('GITHUB_TOKEN')
    if token:
        headers['Authorization'] = f'Bearer {token}'
    request = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(request, timeout=25) as response:
        commits = json.load(response)
    if not isinstance(commits, list):
        raise ValueError('Invalid commit list')
    items = []
    for entry in commits:
        author = entry.get('author') or {}
        title = entry['commit']['message'].splitlines()[0].strip()
        if author.get('type') == 'Bot' or author.get('login', '').endswith('[bot]'):
            continue
        if title.lower().startswith(('chore: refresh metrics', 'chore: update metrics', 'refresh project metrics', 'update project metrics')):
            continue
        items.append({'title': title, 'date': entry['commit']['committer']['date'],
                      'url': entry['html_url'], 'sha': entry['sha']})
        if len(items) == 5:
            break
    return items


def main():
    output = ROOT / 'project-updates.json'
    previous = json.loads(output.read_text(encoding='utf-8')) if output.exists() else {}
    now = datetime.now(timezone.utc).isoformat(timespec='seconds')

    def update(item):
        key, (repo, path) = item
        old = previous.get(key, {})
        record = {'repository': f'sidineyr/{repo}',
                  'source': f'https://github.com/sidineyr/{repo}/commits' + (f'/main/{path}' if path else ''),
                  'checkedAt': old.get('checkedAt'), 'attemptedAt': now,
                  'items': old.get('items', [])}
        try:
            record.update(items=read(repo, path), checkedAt=now, status='ok')
        except Exception as error:
            record['status'] = 'stale' if record['items'] else 'unavailable'
            print(f'{key}: {record["status"]} ({type(error).__name__})')
        return key, record

    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
        result = dict(executor.map(update, PROJECTS.items()))
    output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Updated {len(result)} projects; {sum(v["status"] == "ok" for v in result.values())} sources available.')


if __name__ == '__main__':
    main()
