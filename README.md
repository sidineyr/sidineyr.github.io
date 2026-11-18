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


## Contador de acessos (16/10/2026)

A página inicial exibe um contador público Hits, chave `sidineyr.github.io/universidade`. Conta carregamentos do indicador desde a instalação, não pessoas únicas. O serviço externo recebe dados técnicos da conexão; nenhuma resposta de atividade é enviada. O portfólio consulta o total pela API de estatísticas, sem carregar o SVG e sem acrescentar acessos. Histórico anterior à instalação não foi estimado.


## Contadores originais dos projetos

`metrics-sources.json` mapeia cada contador existente, sem mudar chaves nem importar números manuais. `project-metrics.json` é uma consulta datada, não soma de interesse e acesso. Horizonte registra conclusões, Atlas registra leituras da página inicial, QV usa VisitorBadge e BB usa Hits. Novos indicadores Hits contam carregamentos apenas desde 16/10/2026.

O workflow `refresh-metrics.yml` consulta endpoints de estatísticas somente leitura a cada seis horas, registra o JSON e publica o Pages. Não consulta SVG nem VisitorHit. Falhas conservam último valor confirmado com data e estado pendente; sem histórico confirmado, exibe indisponível. Fontes bloqueadas podem exigir correção no provedor. Não há garantia de execução pontual do agendamento do GitHub. Exibir o portfólio nunca deve gerar visita nos projetos.

## Ordenação e histórico (06/11/2026)

Cards podem ser ordenados por acessos, atualização do código ou nome. A ordem de acessos usa os últimos valores confirmados, em ordem decrescente; acessos/visitas/leituras primeiro, conclusões de testes depois e contagens indisponíveis por último. Empates seguem o nome. Essas métricas têm períodos e definições diferentes e não representam visitantes únicos.

Cada card consulta `project-updates.json`, com até cinco mensagens reais de commits e links para o histórico completo. Isso documenta alterações no código, sem afirmar que foram publicadas. Universidade filtra a pasta `universidade` do portal. `scripts/sync-updates.py` atualiza o snapshot no mesmo workflow de seis horas dos contadores, preservando dados e datas anteriores em falhas. Nenhuma credencial é enviada ao navegador.

Quality View: em 06/11/2026, VisitorBadge retornou HTTP 403. Substituído por Hits com chave `sidineyr.github.io/qv`, sem importar ou estimar o histórico anterior. O projeto carrega o SVG; o portfólio lê somente a API de estatísticas.
