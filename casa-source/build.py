"""Gera apenas cursos/; preserva o restante do portfólio."""
import json
import os
import re
import urllib.request
from html import escape as e
from pathlib import Path
from urllib.parse import quote, urlparse

ROOT = Path(__file__).resolve().parent
OUT = ROOT.parent / 'cursos'
BASE = 'https://sidineyr.github.io/cursos/'

def valid_url(value):
    return isinstance(value, str) and urlparse(value).scheme == 'https'

def refresh():
    repos=[]
    page=1
    while True:
        headers={'User-Agent':'CasaCursos','Accept':'application/vnd.github+json'}
        if os.environ.get('GH_TOKEN'): headers['Authorization']='Bearer '+os.environ['GH_TOKEN']
        request=urllib.request.Request(f'https://api.github.com/users/sidineyr/repos?per_page=100&page={page}',headers=headers)
        with urllib.request.urlopen(request, timeout=30) as response: batch=json.load(response)
        repos.extend(dict(id=r['name'],title=r['name'],repository=r['html_url'],branch=r['default_branch'],description=r.get('description') or '',fork=r.get('fork',False)) for r in batch if not r.get('private'))
        if len(batch)<100: break
        page+=1
    (ROOT/'catalog.json').write_text(json.dumps(repos,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

def shell(title, description, path, content, course=''):
    return f'''<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{e(title) + (' · Casa de Cursos' if title != 'Casa de Cursos' else '')}</title><meta name="description" content="{e(description,quote=True)}">
<meta name="author" content="Sidiney Rodrigues"><link rel="canonical" href="{BASE}{quote(path)}">
<link rel="stylesheet" href="/cursos/style.css"><script defer src="/cursos/course.js"></script></head>
<body data-course="{e(course,quote=True)}"><a class="skip" href="#conteudo">Pular para o conteúdo</a>
<header><a class="brand" href="/cursos/">casa de cursos.</a><nav aria-label="Principal"><a href="/">Portfólio</a><a href="/universidade/">Universidade</a><a href="/cursos/">Todos os percursos</a></nav></header>
<main id="conteudo">{content}<p id="status" class="status" role="status" aria-live="polite"></p></main>
<footer><p>Uma iniciativa de Sidiney Rodrigues. Percursos de exploração inicial, inspirados no <a href="https://sidineyr.github.io/art/">ART</a>. Sem diploma reconhecido.</p>
<p>O caderno e o progresso ficam neste navegador. Nenhuma resposta é enviada a um servidor. Os sites externos têm políticas próprias.</p>
<p><a href="https://github.com/sidineyr/sidineyr.github.io/issues">Contato e correções</a> · <a href="/materiais/">Materiais e condições comerciais</a></p></footer></body></html>'''

def banner():
    return '''<aside class="ad" aria-label="Publicidade"><small>Publicidade · compra opcional</small><h2>Materiais para acompanhar sua prática</h2>
<p>Explore o guia de materiais educativos e confira preço, vendedor e disponibilidade no destino.</p>
<a href="/materiais/">Consultar o guia de materiais →</a>
<a href="https://link.amazon/B0gRgztiU" target="_blank" rel="sponsored noopener noreferrer">Amazon · materiais escolares ↗</a>
<a href="https://www.mercadolivre.com.br/social/mrsid" target="_blank" rel="sponsored noopener noreferrer">Mercado Livre · Aprender e Criar ↗</a>
<p><small>Como participante do Programa de Associados da Amazon, sou remunerado pelas compras qualificadas efetuadas. Também posso receber comissão pelo Mercado Livre. Comprar é opcional e não altera seu progresso.</small></p></aside>'''

def build():
    repos=json.loads((ROOT/'catalog.json').read_text(encoding='utf-8'))
    overrides_path=ROOT/'overrides.json'
    overrides=json.loads(overrides_path.read_text(encoding='utf-8')) if overrides_path.exists() else {}
    for r in repos:
        r.update({k:v for k,v in overrides.get(r['id'],{}).items() if k in ('title','description','video','captions')})
    assert len({r['id'] for r in repos})==len(repos)
    OUT.mkdir(exist_ok=True)
    manifest=OUT/'generated.json'
    current={r['id'] for r in repos}
    if manifest.exists():
        for old in json.loads(manifest.read_text(encoding='utf-8')):
            if old not in current and re.fullmatch(r'[A-Za-z0-9_.-]+',old) and old not in ('.','..'):
                obsolete=OUT/old/'index.html'
                if obsolete.is_file(): obsolete.unlink()
    for name in ('style.css','course.js'):
        OUT.joinpath(name).write_text(ROOT.joinpath(name).read_text(encoding='utf-8'),encoding='utf-8')
    cards=[]
    for r in sorted(repos,key=lambda r:r['title'].lower()):
        name=r['id']; title=r['title']; url=r['repository']
        assert re.fullmatch(r'[A-Za-z0-9_.-]+',name) and name not in ('.','..')
        assert valid_url(url) and url.startswith('https://github.com/sidineyr/')
        description=r.get('description') or f'Observe, experimente e registre sua primeira exploração de {title}.'
        cards.append(f'<article class="card" data-course><p class="eyebrow">Percurso inicial</p><h2>{e(title)}</h2><p>{e(description)}</p><a href="{quote(name)}/">Começar a explorar →</a></article>')
        content=f'''<section class="hero"><p class="eyebrow">Seu percurso · três encontros</p><h1>{e(title)}</h1><p class="lead">Uma primeira exploração, do olhar à prática.</p><p>{e(description)}</p><a href="{e(url,quote=True)}" target="_blank" rel="noopener noreferrer">Abrir projeto e documentação ↗</a></section>
<label for="progress">Seu progresso</label><progress id="progress" max="3" value="0"></progress><p id="score" role="status">0/3 etapas · 0 XP</p>
<section class="lesson"><p class="eyebrow">Encontro 01</p><h2>Observar e compreender</h2>
<p><strong>Objetivo:</strong> descobrir a proposta de {e(title)} e escolher uma pergunta para investigar.</p>
<p><strong>Materiais:</strong> navegador, documentação do projeto e um espaço para anotar.</p>
<ol><li>Abra o projeto e examine sua apresentação, os arquivos e os exemplos.</li><li>Localize requisitos, instruções e licença, quando disponíveis.</li><li>Escolha uma ação pequena descrita pelo autor. Se faltarem instruções, registre essa lacuna e examine um exemplo sem executá-lo.</li></ol>
<p>Antes de executar código, compreenda o ambiente necessário e as instruções. Evite comandos de instalação por tentativa.</p>'''
        video=r.get('video',BASE+'media/como-estudar.mp4')
        r.setdefault('captions',BASE+'media/como-estudar.pt-BR.vtt')
        if valid_url(video):
            content+=f'<video id="video" controls playsinline preload="metadata" src="{e(video,quote=True)}" hidden>'
            if valid_url(r.get('captions')): content+=f'<track kind="captions" srclang="pt-BR" label="Português" src="{e(r["captions"],quote=True)}" default>'
            content+='</video><p id="video-status" role="status"></p><p>Assista a 90% do vídeo ou realize a atividade textual equivalente.</p>'
        content+='''<details><summary>Atividade textual equivalente</summary><p>Observar, experimentar e refletir: consulte a documentação, realize uma pequena tarefa e registre suas descobertas. Sem ambiente de execução, analise um exemplo.</p></details><label for="answer">Qual deve ser seu primeiro passo?</label><select id="answer"><option value="">Escolha uma resposta</option><option value="guess">Executar comandos por tentativa</option><option value="docs">Consultar a proposta, os requisitos e a documentação</option></select>
<p><button id="check" type="button">Verificar e desbloquear a prática</button></p><p id="feedback" role="status" aria-live="polite"></p></section>
<section class="lesson" id="practice" hidden><p class="eyebrow">Encontro 02</p><h2>Experimentar e criar</h2>
<p><strong>Tarefa:</strong> siga uma experiência da documentação. Compare o resultado com sua expectativa; altere um elemento documentado e observe o efeito.</p>
<p><strong>Adaptação:</strong> sem ambiente disponível, leia um exemplo e descreva suas entradas e saídas. Em um projeto sem exemplos, desenhe uma proposta de melhoria e registre a ausência de orientação.</p>
<label><input type="checkbox" id="performed"> Realizei a experiência ou sua adaptação.</label><button type="button" id="complete-practice">Concluir prática</button></section>
<section class="lesson" id="reflection" hidden><p class="eyebrow">Encontro 03</p><h2>Refletir e registrar</h2><label for="notes">O que você observou? O que mudou? Qual será sua próxima pergunta?</label>
<textarea id="notes" placeholder="Escreva no seu caderno…"></textarea><p class="muted">Salvo somente neste navegador. Exporte uma cópia para guardar.</p><div class="chips"><button id="finish" type="button">Concluir percurso</button><button id="export" type="button">Exportar caderno</button></div></section>'''+banner()+'''<noscript><p>Ative JavaScript para a progressão. Você também pode seguir o primeiro encontro acima e registrar sua reflexão no papel.</p></noscript>'''
        folder=OUT/name; folder.mkdir(exist_ok=True)
        folder.joinpath('index.html').write_text(shell(title,description,name+'/',content,name),encoding='utf-8')
    content=f'''<section class="hero"><p class="eyebrow">Projetos abertos · Sidiney Rodrigues</p><h1>O próximo passo começa com uma pergunta.</h1><p class="lead">Observe, experimente e crie seu próprio caminho. Cada projeto tem um percurso inicial e um caderno para guardar descobertas.</p><div class="chips"><span class="chip">{len(repos)} projetos públicos</span><span class="chip">3 etapas por percurso</span><span class="chip">Sem cadastro</span></div></section>
<section aria-label="Catálogo"><label for="search">Encontre um projeto</label><input id="search" type="search" placeholder="Busque por nome ou descrição…"><p id="results" role="status" aria-live="polite">{len(repos)} percursos disponíveis</p><div class="grid">{''.join(cards)}</div></section>'''+banner()
    OUT.joinpath('index.html').write_text(shell('Casa de Cursos','Percursos iniciais gratuitos para explorar os projetos públicos de Sidiney Rodrigues.','',content),encoding='utf-8')
    OUT.joinpath('sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+''.join('<url><loc>'+BASE+quote(p)+'</loc></url>' for p in ['']+[r['id']+'/' for r in repos])+'</urlset>',encoding='utf-8')
    print(f'{len(repos)} percursos gerados; demais páginas preservadas.')
    manifest.write_text(json.dumps(sorted(current),indent=2)+'\n',encoding='utf-8')

if __name__=='__main__':
    import sys
    if '--refresh' in sys.argv: refresh()
    build()
