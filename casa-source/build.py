"""Oficinas com conteúdo próprio; o inventário nunca cria cursos automaticamente."""
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
    repos, page = [], 1
    while True:
        headers = {'User-Agent': 'CasaCursos', 'Accept': 'application/vnd.github+json'}
        if os.environ.get('GH_TOKEN'):
            headers['Authorization'] = 'Bearer ' + os.environ['GH_TOKEN']
        request = urllib.request.Request(
            f'https://api.github.com/users/sidineyr/repos?per_page=100&page={page}', headers=headers)
        with urllib.request.urlopen(request, timeout=30) as response:
            batch = json.load(response)
        repos.extend(dict(id=r['name'], title=r['name'], repository=r['html_url'],
                          branch=r['default_branch'], description=r.get('description') or '',
                          fork=r.get('fork', False)) for r in batch if not r.get('private'))
        if len(batch) < 100:
            break
        page += 1
    (ROOT / 'catalog.json').write_text(json.dumps(repos, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

def shell(title, description, path, content, course='', canonical=None, archive=False, notebook=''):
    canonical = canonical or BASE + quote(path)
    robots = '<meta name="robots" content="noindex,follow">' if archive else ''
    return f'''<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>{e(title)} · Casa de Cursos</title>
<meta name="description" content="{e(description, quote=True)}"><meta name="author" content="Sidiney Rodrigues">
<meta name="google-adsense-account" content="ca-pub-4924241177850142">
<link rel="canonical" href="{e(canonical, quote=True)}">{robots}
<link rel="stylesheet" href="/cursos/style.css"><script defer src="/cursos/course.js"></script></head>
<body data-course="{e(course, quote=True)}" data-notebook="{e(notebook, quote=True)}"><a class="skip" href="#conteudo">Pular para o conteúdo</a>
<header><a class="brand" href="/cursos/">casa de cursos.</a><nav aria-label="Principal"><a href="/">Portfólio</a><a href="/cursos/">Oficinas</a><a href="/cursos/arquivo/">Arquivo de código</a></nav></header>
<main id="conteudo">{content}<p id="status" class="status" role="status" aria-live="polite"></p></main>
<footer><p>Autoria e direção pedagógica: Sidiney Rodrigues. Oficinas livres, sem diploma reconhecido. Textos preparados com apoio de IA; veja a <a href="/politica-editorial/">política editorial</a>.</p>
<nav aria-label="Informações do site"><a href="/sobre/">Sobre</a><a href="/contato/">Contato e correções</a><a href="/privacidade/">Privacidade</a></nav>
<p>Seu caderno fica neste navegador. Não há envio de respostas nem anúncios nestas oficinas. Links externos têm políticas próprias.</p>
<p>Se desejar, <a href="https://pequenoprincipe.org.br/doadores/apoie-o-pequeno-principe/">doe diretamente ao Hospital Pequeno Príncipe</a>. Iniciativa independente, sem vínculo institucional nem intermediação.</p></footer></body></html>'''

def build():
    repos = json.loads((ROOT / 'catalog.json').read_text(encoding='utf-8'))
    lessons = json.loads((ROOT / 'lessons.json').read_text(encoding='utf-8'))
    assert len({r['id'] for r in repos}) == len(repos)
    assert len({r['id'] for r in lessons}) == len(lessons)
    lookup = {r['id']: r for r in repos}
    for r in repos:
        assert re.fullmatch(r'[A-Za-z0-9_.-]+', r['id']) and r['id'] not in ('.', '..', 'arquivo')
        assert valid_url(r['repository']) and r['repository'].startswith('https://github.com/sidineyr/')
    for lesson in lessons:
        assert lesson['id'] in lookup and not lookup[lesson['id']].get('fork'), 'Oficina exige projeto próprio no inventário'
        assert len(lesson['body']) > 1000, 'Oficina precisa de atividade própria completa'
    OUT.mkdir(exist_ok=True)
    for name in ('style.css', 'course.js'):
        OUT.joinpath(name).write_text(ROOT.joinpath(name).read_text(encoding='utf-8'), encoding='utf-8')
    curated = {r['id'] for r in lessons}
    cards = []
    for lesson in lessons:
        name, title = lesson['id'], lesson['title']
        cards.append(f'<article class="card" data-course><p class="eyebrow">Oficina com atividade própria</p><h2>{e(title)}</h2><p>{e(lesson["description"])}</p><p>{e(lesson["audience"])}</p><a href="{quote(name)}/">Abrir oficina</a></article>')
        content = f'''<section class="hero"><p class="eyebrow">Aprender fazendo · {e(lesson['duration'])}</p><h1>{e(title)}</h1><p class="lead">{e(lesson['description'])}</p><p>{e(lesson['audience'])}</p><p>Publicado em <time datetime="2026-11-18">18 de novembro de 2026</time>.</p></section>
<article class="lesson">{lesson['body']}</article>
<section class="lesson" aria-labelledby="notebook-title"><h2 id="notebook-title">Seu registro, se desejar</h2><p>Todo o conteúdo acima está disponível sem cadastro, vídeo ou JavaScript. Anote também no papel. O caderno digital salva automaticamente neste navegador, não sincroniza entre aparelhos e não avalia suas respostas.</p><label for="notes">Registre sua hipótese, os dados e o que faria diferente</label><textarea id="notes" maxlength="20000"></textarea><div class="chips"><button id="export" type="button">Exportar minhas notas</button><button id="clear-notes" type="button">Apagar minhas notas</button></div><noscript><p>O caderno digital precisa de JavaScript. Use papel ou outro editor para registrar a atividade.</p></noscript></section>'''
        folder = OUT / name
        folder.mkdir(exist_ok=True)
        (folder / 'index.html').write_text(shell(title, lesson['description'], name + '/', content, name), encoding='utf-8')
    archive_items = []
    for r in sorted(repos, key=lambda r: r['id'].casefold()):
        name = r['id']
        kind = 'Fork de projeto de terceiros; consulte a autoria e a licença no repositório.' if r.get('fork') else 'Repositório público do autor; disponibilidade e instruções no GitHub.'
        description = r.get('description') or 'Sem descrição no inventário. Consulte o README antes de tentar executar.'
        archive_items.append(f'<li id="{e(name, quote=True)}"><h2>{e(name)}</h2><p>{e(description)}</p><p>{kind}</p><a href="{e(r["repository"], quote=True)}">Consultar repositório {e(name)}</a></li>')
        if name not in curated:
            content = f'''<section class="hero"><p class="eyebrow">Arquivo de código</p><h1>{e(name)}</h1><p>{e(description)}</p><p>{kind}</p><p>Este endereço anteriormente apresentava uma introdução genérica. Ele foi substituído por esta referência: não há um curso específico publicado aqui.</p><p><a href="/cursos/arquivo/#{quote(name)}">Ver este projeto no arquivo de repositórios</a></p><p><a href="{e(r['repository'], quote=True)}">Abrir código e documentação no GitHub</a></p><p>Para uma atividade orientada, escolha uma das <a href="/cursos/">oficinas com conteúdo próprio</a>.</p></section>'''
            content += '''<details class="lesson"><summary>Recuperar meu caderno anterior</summary><p>Se você anotou algo na versão anterior deste endereço, pode recuperar ou exportar as notas neste mesmo navegador. A mudança de catálogo não apaga essas notas. Elas não são sincronizadas nem enviadas a um servidor.</p><label for="notes">Notas anteriores deste projeto</label><textarea id="notes" maxlength="20000"></textarea><div class="chips"><button id="export" type="button">Exportar minhas notas</button><button id="clear-notes" type="button">Apagar minhas notas</button></div><noscript><p>A recuperação do caderno local precisa de JavaScript.</p></noscript></details>'''
            folder = OUT / name
            folder.mkdir(exist_ok=True)
            (folder / 'index.html').write_text(shell(name, description, name + '/', content,
                canonical=BASE + 'arquivo/', archive=True, notebook=name), encoding='utf-8')
    archive = OUT / 'arquivo'
    archive.mkdir(exist_ok=True)
    archive_content = f'''<section class="hero"><p class="eyebrow">Inventário público</p><h1>Arquivo de código e experiências</h1><p>Este inventário reúne projetos próprios, exercícios e forks. A presença aqui não significa curso, manutenção ativa, autoria integral ou validação pedagógica. Para aprender com uma atividade orientada, abra as <a href="/cursos/">oficinas selecionadas</a>.</p><p>Forks preservam referências a trabalhos de terceiros. Verifique autoria, licença, requisitos e data da última atualização no repositório antes de reutilizar ou executar arquivos.</p></section><ul class="archive-list">{''.join(archive_items)}</ul>'''
    (archive / 'index.html').write_text(shell('Arquivo de repositórios', 'Inventário de projetos próprios e forks, com autoria e limites identificados.', 'arquivo/', archive_content), encoding='utf-8')
    content = f'''<section class="hero"><p class="eyebrow">Oficinas livres · Sidiney Rodrigues</p><h1>Uma pergunta, uma experiência, um registro.</h1><p class="lead">Atividades completas para começar com os recursos que você já tem.</p><p>Escolha entre {len(lessons)} oficinas com objetivos, exemplos resolvidos e critérios para examinar seu resultado. Todo o texto fica disponível sem desbloqueios. São introduções para estudo autônomo; não substituem uma formação completa.</p><p>Os demais repositórios estão no <a href="/cursos/arquivo/">arquivo de código e experiências</a>, com os forks identificados. Atualizações do inventário não criam aulas automaticamente.</p></section><section aria-label="Oficinas"><label for="search">Encontre uma oficina</label><input id="search" type="search" placeholder="Busque por tema"><p id="results" role="status" aria-live="polite">{len(lessons)} oficinas disponíveis</p><div class="grid">{''.join(cards)}</div></section>'''
    (OUT / 'index.html').write_text(shell('Casa de Cursos', 'Oficinas gratuitas de física, estatística, educação digital e leitura filosófica, com atividades e exemplos próprios.', '', content), encoding='utf-8')
    paths = ['', 'arquivo/'] + [r['id'] + '/' for r in lessons]
    (OUT / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + ''.join('<url><loc>' + BASE + quote(p) + '</loc></url>' for p in paths) + '</urlset>', encoding='utf-8')
    # Preserva rotas publicadas, README, evidências e os cadernos locais existentes.
    (OUT / 'generated.json').write_text(json.dumps(sorted(lookup), indent=2) + '\n', encoding='utf-8')
    print(f'{len(lessons)} oficinas com conteúdo próprio; {len(repos) - len(lessons)} referências preservadas no arquivo.')

if __name__ == '__main__':
    import sys
    if '--refresh' in sys.argv:
        refresh()
    build()
