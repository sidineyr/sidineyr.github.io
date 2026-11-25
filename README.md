# Portfólio de Sidiney Rodrigues

Site estático com projetos e recursos educacionais abertos em Artes, ciência,
programação, estatística e educação digital.

- **Demonstração:** https://sidineyr.github.io/
- **Sobre e contato:** https://sidineyr.github.io/sobre/ · https://sidineyr.github.io/contato/
- **Oficinas:** https://sidineyr.github.io/cursos/

## Tecnologias

HTML, CSS e JavaScript sem framework de interface. Conteúdo estático; scripts
aprimoram ordenação, consulta de métricas e cadernos locais, mas não são
necessários para ler os projetos e oficinas. A publicação é feita no GitHub
Pages e verificações adicionais rodam no GitHub Actions.

## Estrutura

- `index.html` — portfólio, cards e navegação principal.
- `data/projetos.json` — manifesto editorial dos projetos.
- `project-metrics.json` e `project-updates.json` — snapshots de fontes
  originais; não são contagens atualizadas ao visitar o portfólio.
- `casa-source/` — inventário, conteúdo próprio das oficinas e gerador.
- `cursos/` — páginas publicadas das oficinas e referências do inventário.
- `universidade/` — percursos em português e inglês.
- `assets/` — estilos, scripts e recursos visuais.
- `scripts/` e `tests/` — geração determinística e testes.
- `docs/` — auditoria, mapa de busca e pendências editoriais.

## Executar localmente

Requer Python 3.10 ou superior para testes e geradores. Na raiz:

```powershell
python -m http.server 8000
```

Abra `http://localhost:8000/`. Em Windows com locale não UTF-8, use `-X utf8`
nos comandos Python:

```powershell
python -X utf8 -m unittest discover -s tests -v
python -X utf8 scripts/generate-sitemap.py --check
```

Para reconstruir as páginas de oficina a partir do inventário e dos conteúdos
editáveis:

```powershell
python -X utf8 casa-source/build.py
python -X utf8 scripts/generate-sitemap.py
```

O gerador não cria cursos automaticamente a partir de repositórios e preserva
arquivos e anotações já existentes. A validação HTML e o Lighthouse CI rodam
no workflow `Verificações do site`; localmente, também é possível executar
`node --test tests/*.test.mjs` com Node.js.

## Contribuir

Use issues públicas para relatar erros e pull requests para propor mudanças.
Não inclua credenciais, dados pessoais nem respostas identificáveis de
estudantes. Veja [CONTRIBUTING.md](./CONTRIBUTING.md) e
[CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

## Licenças

- Código original: [MIT](./LICENSE).
- Conteúdo educacional original: [CC BY 4.0](./LICENSE-CONTENT.md).
- Forks, mídias e materiais de terceiros mantêm suas licenças próprias; confira
  cada repositório e recurso antes de reutilizar.

## Privacidade e métricas

A contagem de interesse é opcional e só consulta serviço externo após ativação.
Snapshots de acesso leem fontes originais sem carregar seus SVGs. Consulte
[privacidade](https://sidineyr.github.io/privacidade/) para serviços,
armazenamento local e publicidade.
