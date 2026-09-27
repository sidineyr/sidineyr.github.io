# Publicação e operação

Site estático no repositório `sidineyr/sidineyr.github.io`, publicado pelo GitHub Pages em `/universidade/`. Cada disciplina tem URL estável em português e inglês. A versão inglesa é uma orientação curta; os materiais originais nem sempre são traduzidos.

## Atualizar uma disciplina

1. Revise o README e o conteúdo real do repositório original.
2. Atualize a página `universidade/<slug>/index.html` e sua orientação `universidade/en/<slug>/index.html`.
3. Revise autoria, licença, fontes, links e data.
4. Se criar uma rota, inclua apenas a URL publicada em `universidade/sitemap.xml`. Corrija links internos e `hreflang`.
5. Abra as páginas em celular e teclado; confira títulos, atividades, links e respostas HTTP.

O arquivo `build_portal.py` foi usado para gerar a primeira versão; o catálogo ainda exige edição dos dados nesse script e publicação dos arquivos gerados. Uma evolução recomendada é manter a curadoria em dados estruturados e automatizar a geração, evitando inconsistências.

## Busca

Implementado: páginas estáticas, título e descrição exclusivos, canonical, alternância linguística, links internos, `robots.txt` e sitemap separado. A submissão do sitemap não foi feita nesta entrega.

Para Google Search Console e Bing Webmaster Tools: verificar a propriedade `https://sidineyr.github.io/` com o método disponível à conta, enviar `https://sidineyr.github.io/universidade/sitemap.xml`, inspecionar URLs importantes e acompanhar cobertura, erros e canonicais. A publicação de um arquivo e o HTTP 200 não comprovam indexação.

## Anúncios

AdSense: nenhum código, ID de editor ou `ads.txt` foi inventado. Antes de pedir avaliação, revisar conteúdo original, políticas, direitos, privacidade e a experiência de estudo. Se a conta aprovar o site, obter o identificador e o conteúdo do `ads.txt` na conta real; testar anúncios longe das atividades e verificar requisitos de consentimento pertinentes. O AdSense avalia o domínio que recebe anúncios.

Google Ads: ver `CAMPANHA-ADS.md`. Campanha não criada nem ativada.

## Conteúdo, inclusão e limites

Sem login, formulário ou armazenamento de respostas neste portal. Relatos de barreiras e correções podem ser enviados por issue no repositório. O portal é iniciativa independente sem diploma reconhecido. Os sites externos têm políticas e funcionamento próprios.
