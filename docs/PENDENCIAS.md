# Pendências que dependem do autor

Esta lista contém decisões e evidências que não podem ser inventadas nem deduzidas com segurança a partir do código. Atualize os dados apenas quando puder confirmá-los.

## Prioridade alta

- [ ] **Confirmar o escopo das licenças.** Foi escolhida a proposta MIT para código original e CC BY 4.0 para conteúdo educacional original. Revisar arquivos incorporados de terceiros, forks, imagens, áudio, fontes, exemplos e materiais com licença própria antes de declarar cobertura do repositório inteiro. A licença de cada projeto vinculado continua sendo a do seu próprio repositório.
- [ ] **Revisar os dados de autoria e trajetória** que podem ser publicados em Sobre: formação, experiência profissional, áreas de atuação e datas. Nenhuma qualificação ou emprego foi acrescentado sem comprovação.
- [ ] **Definir se haverá contato profissional privado.** Atualmente o canal divulgado é o GitHub Issues, que é público; não publicar e-mail pessoal sem autorização explícita.
- [ ] **Decidir se há autorização para publicar uma foto** e, se sim, fornecer arquivo, descrição alternativa e licença de uso.
- [ ] **Confirmar domínio próprio** e titularidade, caso pretenda trocar `sidineyr.github.io`; revisar DNS, canonical, sitemap e redirecionamentos antes de qualquer migração.
- [ ] **Confirmar a migração de Horizonte e Atlas do Sagrado** para GitHub Pages: verificar conteúdo, dependências, formulários/dados, disponibilidade, licença e URL canônica antes de trocar os domínios externos.

## Conteúdo e apresentação

- [ ] Fornecer capturas autorizadas dos projetos que devam aparecer nos cards, com texto alternativo e identificação de idioma. Não usar os retratos do tutor como miniaturas de projetos.
- [ ] Confirmar público-alvo, nível, tecnologias, requisitos e status de manutenção de cada projeto. O inventário atual não contém todos esses dados.
- [ ] Confirmar datas de atualização que devam aparecer como estado do produto. Datas de commit não comprovam que uma versão esteja publicada ou validada.
- [ ] Revisar descrições introdutórias de 100–200 palavras nas páginas dos projetos vinculados, incluindo benefício, pré-requisitos e resultado de aprendizagem somente quando sustentados pelo conteúdo existente. Esses repositórios têm autonomia própria e não foram alterados nesta tarefa.
- [ ] Fornecer números reais, resultados documentados ou depoimentos autorizados caso queira prova social. Não publicar estimativas de visitas, usuários ou resultados educacionais.
- [ ] Definir se oficinas ou consultoria estão efetivamente disponíveis, escopo, preço e canal; a página atual apresenta essas ofertas como possibilidades, não como serviços contratáveis.

## Publicidade, privacidade e validação

- [ ] Confirmar o estado final da revisão do AdSense no painel antes de ativar qualquer pedido de anúncio. A implementação atual mantém o carregador suspenso.
- [ ] Se publicidade vier a ser ativada, revisar consentimento, CMP aplicável, aviso de cookies, retenção, regiões atendidas e textos da política com orientação jurídica apropriada. Não tratar um botão próprio como consentimento regulatório.
- [ ] Confirmar quais produtos e links afiliados seguem ativos e verificar sua disponibilidade antes de atualizar o catálogo; manter a divulgação de publicidade.
- [ ] Decidir se deseja uma configuração de segurança com cabeçalhos HTTP fora do GitHub Pages. O host estático não oferece configuração geral de CSP por cabeçalho; não aplicar uma política parcial que bloqueie scripts legítimos.
- [ ] Repetir Lighthouse mobile no ambiente publicado e investigar a variabilidade de Performance: duas séries de CI na home marcaram 78/100/100 e depois 92/100/100 (mediana das seis 100; média 95; série mais recente 97,3), com TBT de aproximadamente 1.019 ms na execução mais baixa. Acessibilidade 97, Boas práticas 100 e SEO 100. A nota de referência anterior não foi medida porque o PageSpeed Insights respondeu HTTP 429. Não afirmar o alvo ≥95 de desempenho como consistente até revalidar.
- [ ] Fazer revisão manual com teclado, leitor de tela, zoom/reflow e contraste em dispositivos reais. Testes automatizados não atestam conformidade WCAG 2.2 AA.
- [ ] Revisar com Search Console as consultas reais e a indexação após publicar. As palavras-chave de `docs/PALAVRAS-CHAVE.md` são hipóteses baseadas em intenção, não métricas de volume.

## Configurações manuais no GitHub

- [ ] Configurar Topics e descrição curta nos 59 repositórios inventariados. Confirmar os termos por repositório; não reutilizar uma lista genérica nem inferir tecnologias. Inventário atual: `art`, `atlas-do-sagrado`, `auto-sklearn`, `balanced-dashboard`, `bb`, `biosfera`, `callguid`, `Catch`, `Chemical`, `collective-intelligence-framework`, `computer-science`, `contraprova`, `CyberSecurity`, `DataScienceSpecialization.github.io`, `datasharing`, `donuts`, `EditAI`, `Einstein-Fisica`, `ExData_Plotting1`, `filosofia-aberta`, `fio-de-ariadne`, `fullstack-course1-module2`, `GCompris`, `GCompris-qt`, `horizonte`, `IBM`, `ieml`, `interactive-tutorials`, `LearningC`, `libieml`, `LinkedinBot`, `linux`, `machine-learning-coursera`, `my-first-blog`, `nexmo-python`, `OEnigmadoReiArthur`, `opencog`, `Polliniza`, `PortugueseGame`, `ProgrammingAssignment2`, `project-open-data.github.io`, `puzzless`, `python-swirl-statistics`, `PythonProjects`, `qv`, `reimagined-happiness`, `Rlearning`, `saida-da-caverna`, `serenata-de-amor`, `shiny`, `sidineyr`, `sidineyr.github.io`, `sidletras`, `socios-brasil`, `swirl`, `system-chess`, `Topotime`, `twitterexplode`, `wikiacolhe`.
- [ ] Revisar manualmente os aliases antigos em `data/legacy-redirects.json` e confirmar que cada destino do catálogo continua adequado antes de publicar.
- [ ] Confirmar em Settings → Pages que a publicação continue apontando para a fonte e branch corretas; o workflow atual de métricas também publica o site.
- [ ] Revisar proteção de branch e exigir os checks de qualidade assim que o novo workflow ficar verde.
