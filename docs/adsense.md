# Preparação do portfólio para nova revisão do AdSense

Atualizado em 18 de novembro de 2026.

O e-mail de recusa informa que o site precisa de ajustes, mas não identifica a causa. A causa específica e o estado de revisão devem ser conferidos em **AdSense → Sites**. Este registro não representa aprovação do Google nem confirma que uma nova análise foi solicitada.

## Alterações nesta versão

- Verificação de propriedade pela meta `google-adsense-account`; `ads.txt` preservado.
- Carregador compartilhado de anúncios suspenso. Não executa SDK nem pedidos de anúncios. O carregador opcional da Universidade também foi suspenso.
- Páginas públicas de autoria, contato, privacidade e política editorial, vinculadas à navegação.
- Quatro oficinas com atividades distintas, exemplos comentados e referências. Conteúdo principal acessível sem JavaScript, cadastro ou desbloqueio por vídeo.
- O inventário deixa de transformar automaticamente todos os repositórios em cursos. Forks e experimentos ficam identificados no arquivo. Rotas antigas continuam acessíveis como referências, com canonical do arquivo e `noindex,follow`; não são incluídas no sitemap das oficinas.
- Notas anteriores preservadas nas oficinas correspondentes. Salvamento e exportação locais, com mensagem visível se o navegador bloquear o armazenamento.
- Tradução Google e contagem de interesse só são acionadas por escolha explícita. Os contadores originais continuam sendo consultados por snapshots, sem incrementar acessos.
- Apresentação com tutor opcional, sem cobrir a entrada no conteúdo.
- Geração automática com verificações antes da publicação, para evitar retorno das introduções repetidas.

## Validação e publicação

```sh
python casa-source/build.py
python -m unittest discover -s tests -p 'test_editorial.py' -v
node --test tests/projetos.test.mjs tests/privacy.test.mjs
```

A geração de oficinas deve ser determinística. Atualizar `catalog.json` não inclui novas oficinas: elas precisam de conteúdo próprio em `casa-source/lessons.json`. Não alterar manualmente apenas o HTML gerado.

## Etapa no painel e eventual ativação

Depois de confirmar a publicação, abrir o domínio na lista **Sites**, ler a razão específica e solicitar nova revisão se essa ação estiver disponível. Se houver exigência adicional no painel, resolvê-la antes de afirmar que o processo foi concluído. Não remover e cadastrar o domínio repetidamente durante a análise.

Manter anúncios suspensos até confirmar o estado de aprovação e preparar a configuração de privacidade adequada, incluindo CMP certificada onde exigida. Não tratar eventos JavaScript ou um botão próprio como prova de consentimento válido. Não colocar anúncios em contas, resultados pessoais ou cadernos.

## Referências oficiais

- [Conectar o site ao Google AdSense e verificar pela meta](https://support.google.com/adsense/answer/7584263?hl=pt-BR)
- [Problemas que impedem a aprovação de um site](https://support.google.com/adsense/answer/12176698?hl=pt-BR)
- [Preparação das páginas para o AdSense](https://support.google.com/adsense/answer/7299563?hl=pt-BR)
- [Política sobre telas sem conteúdo ou de baixo valor](https://support.google.com/publisherpolicies/answer/11112688?hl=pt-BR)
- [Exigências de plataformas de consentimento](https://support.google.com/adsense/answer/13554116?hl=pt-BR)

O Copilot não estava disponível nesta conexão. A implementação foi conferida por testes e por navegação no navegador; isso não equivale a auditoria jurídica ou revisão acadêmica independente.
