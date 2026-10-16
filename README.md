# Projetos de Sidiney Rodrigues

Página central dos projetos públicos de educação, ciência e tecnologia de Sidiney Rodrigues.

- Site: https://sidineyr.github.io/
- Sitemap: https://sidineyr.github.io/sitemap.xml

## Revisão de 16/10/2026

Doze projetos e percursos, incluindo Python Swirl, BB, Contraprova e Polliniza.
Descrições conferidas nos READMEs atuais. Contraprova e Polliniza levam ao código e às instruções: não afirmamos publicação online irrestrita nem APIs configuradas.

### Contadores de interesse

`project-votes.js` consulta o CounterAPI público (`counterapi.com`, não `counterapi.dev`), namespace `sidineyr.github.io`, ação `portfolio-choice-v1`, chave estável por projeto. A carga inicial usa `readOnly=true`; somente o botão envia incremento. Totais começam no serviço, sem números artificiais. Links não dependem da API.

Cada navegador guarda uma marca por projeto em localStorage; falhas de armazenamento usam memória. Outra aba recebe a marca pelo evento storage. Não há autenticação: dados são indicativos e podem sofrer repetição/abuso; não representam pessoas únicas ou resultados educacionais. Não usar como eleição. O serviço externo recebe dados técnicos da conexão, mas não recebe nomes, respostas ou conteúdo dos projetos. As requisições omitem cookies e referrer.

Timeout de dez segundos, validação de resposta e erro explícito sem falso zero. Escritas sem confirmação não são repetidas automaticamente, pois o servidor pode já ter contado. Não há armazenamento de credenciais. A disponibilidade depende de terceiro. Documentação: https://counterapi.com/
