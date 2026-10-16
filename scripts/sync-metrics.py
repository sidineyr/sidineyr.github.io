"""Read source counters only. Never call VisitorHit, SVG, or a write endpoint."""
from pathlib import Path
from datetime import datetime, timezone
import json, urllib.request, urllib.error, concurrent.futures
ROOT = Path(__file__).resolve().parents[1]
def read(source):
    request = urllib.request.Request(source['endpoint'], headers={'User-Agent':'Sidiney-Portfolio-Metrics/1.0','Accept':'application/json'})
    try:
        with urllib.request.urlopen(request,timeout=20) as response:
            data=json.load(response)
    except urllib.error.HTTPError as error:
        # A new Hits key has no record until the first badge load.
        if error.code == 404 and source.get('since') and source['endpoint'].startswith('https://hits.sh/api/urns/'):
            return 0
        raise
    value=data[source['field']]
    if isinstance(value,bool) or not isinstance(value,int) or value<0:
        raise ValueError('Invalid counter')
    return value

def main():
    sources=json.loads((ROOT/'metrics-sources.json').read_text())
    previous=json.loads((ROOT/'project-metrics.json').read_text())
    now=datetime.now(timezone.utc).isoformat(timespec='seconds')
    def update(item):
        key,source=item
        old=previous.get(key,{})
        metric={**source,'value':old.get('value'),'checkedAt':old.get('checkedAt'),'attemptedAt':now}
        try:
            metric.update(value=read(source),checkedAt=now,status='ok')
        except Exception as error:
            # Keep the last confirmed value AND its original timestamp. No invented zero.
            metric['status']='stale' if metric['value'] is not None else 'unavailable'
            print(f'{key}: {metric["status"]} ({type(error).__name__})')
        return key,metric
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as executor:
        result=dict(executor.map(update,sources.items()))
    (ROOT/'project-metrics.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
if __name__=='__main__':main()
