"""Generate legacy route aliases and an indexable-only sitemap."""
import argparse
import json
from html import escape
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parents[1]
SITE = 'https://sidineyr.github.io'
SITEMAP = ROOT / 'sitemap.xml'
REDIRECTS = json.loads((ROOT / 'data/legacy-redirects.json').read_text(encoding='utf-8'))
NS = 'http://www.sitemaps.org/schemas/sitemap/0.9'


class Metadata(HTMLParser):
    def __init__(self):
        super().__init__()
        self.canonical = None
        self.noindex = False

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag == 'link' and attributes.get('rel', '').lower() == 'canonical':
            self.canonical = attributes.get('href')
        if tag == 'meta' and attributes.get('name', '').lower() == 'robots':
            self.noindex = 'noindex' in attributes.get('content', '').lower()


def alias_html(target):
    canonical = target.split('#', 1)[0]
    destination = SITE + canonical
    title = 'Projeto no catálogo | Sidiney Rodrigues'
    return f'''<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,follow">
  <link rel="canonical" href="{escape(destination, quote=True)}">
  <title>{title}</title>
</head>
<body>
  <main>
    <h1>Este endereço antigo continua disponível.</h1>
    <p>O conteúdo agora faz parte do catálogo de oficinas e referências do portfólio.</p>
    <p><a href="{escape(target, quote=True)}">Abrir a página correspondente no catálogo</a>.</p>
  </main>
</body>
</html>
'''


def write_redirects(check):
    for source, target in REDIRECTS.items():
        relative = source.strip('/')
        if not relative or '..' in Path(relative).parts or not target.startswith('/'):
            raise ValueError(f'Rota de redirecionamento inválida: {source}')
        path = ROOT / relative / 'index.html'
        expected = alias_html(target)
        if path.exists():
            if path.read_text(encoding='utf-8') != expected:
                raise ValueError(f'Recusa sobrescrever conteúdo existente: {path.relative_to(ROOT)}')
        elif check:
            raise ValueError(f'Redirecionamento ausente: {path.relative_to(ROOT)}')
        else:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(expected, encoding='utf-8')


def canonical_exists(url):
    parsed = urlparse(url)
    if parsed.scheme != 'https' or parsed.netloc != 'sidineyr.github.io':
        return False
    path = parsed.path or '/'
    candidate = ROOT / path.lstrip('/')
    if path.endswith('/'):
        candidate = candidate / 'index.html'
    elif not candidate.suffix:
        candidate = candidate / 'index.html'
    return candidate.is_file()


def build_sitemap():
    urls = set()
    for page in ROOT.rglob('*.html'):
        if any(part.startswith('.') for part in page.relative_to(ROOT).parts):
            continue
        metadata = Metadata()
        metadata.feed(page.read_text(encoding='utf-8'))
        if metadata.noindex or not metadata.canonical:
            continue
        if not canonical_exists(metadata.canonical):
            raise ValueError(f'Canonical sem arquivo local: {metadata.canonical} ({page.relative_to(ROOT)})')
        urls.add(metadata.canonical)

    root = ElementTree.Element(f'{{{NS}}}urlset')
    for url in sorted(urls, key=lambda value: (value != SITE + '/', value)):
        item = ElementTree.SubElement(root, f'{{{NS}}}url')
        ElementTree.SubElement(item, f'{{{NS}}}loc').text = url
    return ElementTree.tostring(root, encoding='utf-8', xml_declaration=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--check', action='store_true', help='fail if generated routes or sitemap are stale')
    args = parser.parse_args()
    write_redirects(args.check)
    expected = build_sitemap()
    if args.check:
        if not SITEMAP.exists() or SITEMAP.read_bytes() != expected:
            raise SystemExit('sitemap.xml está desatualizado; execute este script sem --check.')
    else:
        SITEMAP.write_bytes(expected)
    print(f'{len(REDIRECTS)} rotas preservadas; {len(ElementTree.fromstring(expected))} URLs canônicas no sitemap.')


if __name__ == '__main__':
    main()
