# Projetos de Sidiney Rodrigues

PÃ¡gina central dos projetos pÃºblicos de educaÃ§Ã£o, ciÃªncia e tecnologia de Sidiney Rodrigues.

- Site: https://sidineyr.github.io/
- Sitemap: https://sidineyr.github.io/sitemap.xml

## RevisÃ£o de 16/10/2026

Doze projetos e percursos, incluindo Python Swirl, BB, Contraprova e Polliniza.
DescriÃ§Ãµes conferidas nos READMEs atuais. Contraprova e Polliniza levam ao cÃ³digo e Ã s instruÃ§Ãµes: nÃ£o afirmamos publicaÃ§Ã£o online irrestrita nem APIs configuradas.

### Contadores de interesse

`project-votes.js` consulta o CounterAPI pÃºblico (`counterapi.com`, nÃ£o `counterapi.dev`), namespace `sidineyr.github.io`, aÃ§Ã£o `portfolio-choice-v1`, chave estÃ¡vel por projeto. A carga inicial usa `readOnly=true`; somente o botÃ£o envia incremento. Totais comeÃ§am no serviÃ§o, sem nÃºmeros artificiais. Links nÃ£o dependem da API.

Cada navegador guarda uma marca por projeto em localStorage; falhas de armazenamento usam memÃ³ria. Outra aba recebe a marca pelo evento storage. NÃ£o hÃ¡ autenticaÃ§Ã£o: dados sÃ£o indicativos e podem sofrer repetiÃ§Ã£o/abuso; nÃ£o representam pessoas Ãºnicas ou resultados educacionais. NÃ£o usar como eleiÃ§Ã£o. O serviÃ§o externo recebe dados tÃ©cnicos da conexÃ£o, mas nÃ£o recebe nomes, respostas ou conteÃºdo dos projetos. As requisiÃ§Ãµes omitem cookies e referrer.

Timeout de dez segundos, validaÃ§Ã£o de resposta e erro explÃ­cito sem falso zero. Escritas sem confirmaÃ§Ã£o nÃ£o sÃ£o repetidas automaticamente, pois o servidor pode jÃ¡ ter contado. NÃ£o hÃ¡ armazenamento de credenciais. A disponibilidade depende de terceiro. DocumentaÃ§Ã£o: https://counterapi.com/


## Contador de acessos (16/10/2026)

A pÃ¡gina inicial exibe um contador pÃºblico Hits, chave `sidineyr.github.io/universidade`. Conta carregamentos do indicador desde a instalaÃ§Ã£o, nÃ£o pessoas Ãºnicas. O serviÃ§o externo recebe dados tÃ©cnicos da conexÃ£o; nenhuma resposta de atividade Ã© enviada. O portfÃ³lio consulta o total pela API de estatÃ­sticas, sem carregar o SVG e sem acrescentar acessos. HistÃ³rico anterior Ã  instalaÃ§Ã£o nÃ£o foi estimado.


## Contadores originais dos projetos

`metrics-sources.json` mapeia cada contador existente, sem mudar chaves nem importar nÃºmeros manuais. `project-metrics.json` Ã© uma consulta datada, nÃ£o soma de interesse e acesso. Horizonte registra conclusÃµes, Atlas registra leituras da pÃ¡gina inicial, QV usa VisitorBadge e BB usa Hits. Novos indicadores Hits contam carregamentos apenas desde 16/10/2026.

O workflow `refresh-metrics.yml` consulta endpoints de estatÃ­sticas somente leitura a cada seis horas, registra o JSON e publica o Pages. NÃ£o consulta SVG nem VisitorHit. Falhas conservam Ãºltimo valor confirmado com data e estado pendente; sem histÃ³rico confirmado, exibe indisponÃ­vel. Fontes bloqueadas podem exigir correÃ§Ã£o no provedor. NÃ£o hÃ¡ garantia de execuÃ§Ã£o pontual do agendamento do GitHub. Exibir o portfÃ³lio nunca deve gerar visita nos projetos.

## OrdenaÃ§Ã£o e histÃ³rico (06/11/2026)

Cards podem ser ordenados por acessos, atualizaÃ§Ã£o do cÃ³digo ou nome. A ordem de acessos usa os Ãºltimos valores confirmados, em ordem decrescente; acessos/visitas/leituras primeiro, conclusÃµes de testes depois e contagens indisponÃ­veis por Ãºltimo. Empates seguem o nome. Essas mÃ©tricas tÃªm perÃ­odos e definiÃ§Ãµes diferentes e nÃ£o representam visitantes Ãºnicos.

Cada card consulta `project-updates.json`, com atÃ© cinco mensagens reais de commits e links para o histÃ³rico completo. Isso documenta alteraÃ§Ãµes no cÃ³digo, sem afirmar que foram publicadas. Universidade filtra a pasta `universidade` do portal. `scripts/sync-updates.py` atualiza o snapshot no mesmo workflow de seis horas dos contadores, preservando dados e datas anteriores em falhas. Nenhuma credencial Ã© enviada ao navegador.

Quality View: em 06/11/2026, VisitorBadge retornou HTTP 403. Substituído por Hits com chave `sidineyr.github.io/qv`, sem importar ou estimar o histórico anterior. O projeto carrega o SVG; o portfólio lê somente a API de estatísticas.
