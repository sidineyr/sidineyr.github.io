# Universidade do Futuro — plano revisado e kit Copilot

> Versão 0.2 · revisão baseada no documento fornecido e na estrutura pública atual de `sidineyr/sidineyr.github.io`, consultada em 12/11/2026. A implementação existente é um portal estático em `/universidade/`, com páginas por disciplina, versão em inglês para parte do catálogo e sitemap próprio. O modelo original de `/data` em YAML ainda não existe neste portal. Este documento propõe evolução incremental sem substituir a arquitetura em produção.

## 1. Decisões de escopo e segurança

1. **Nome e credenciais.** “Universidade do Futuro” é uma visão/projeto independente, não uma instituição de ensino superior reconhecida. Não prometer diploma, equivalência acadêmica, habilitação profissional ou certificação oficial. Até revisão jurídica e decisão editorial, apresentar a iniciativa como educação aberta e independente e explicar com clareza o que cada certificado de participação significa.
2. **Prática supervisionada.** Ofícios e atividades de risco exigem prática adequada, supervisão e, quando aplicável, formação ou habilitação externa. A página online oferece fundamentos, segurança e roteiros; não autoriza a execução de atividades perigosas.
3. **Saúde, direito e finanças.** Conteúdo educativo não substitui profissionais. Incluir limites claros e encaminhamentos confiáveis revisados antes da publicação.
4. **Libras.** Não solicitar a uma IA que produza ou traduza sinais. Vídeos em Libras precisam de autoria/validação de pessoas surdas e profissionais qualificados, com licença e legendas identificadas.
5. **Fontes e revisão.** Cada curso publicado informa autoria/responsável, data de revisão, fontes e licenças verificadas, público, riscos e aviso educativo. Marcar lacunas `TODO: verificar`; não inventar normas, estatísticas ou referências.
6. **Crianças e segurança digital.** O curso novo é de cidadania e defesa digital, não de intrusão. Atividades exclusivamente offline, fictícias ou em ambiente didático explicitamente autorizado. Não ensinar varredura, exploração de falhas, quebra de senhas, evasão, coleta de dados ou acesso a contas/sistemas reais. Não pedir dados pessoais, criar contas, instalar ferramentas ou contatar desconhecidos. Participação com conhecimento e acompanhamento de responsável adulto; conteúdo e faixa etária precisam de revisão pedagógica antes de serem divulgados.
7. **Privacidade e acesso.** Sem rastreamento por padrão; não coletar dados de estudantes. Priorizar HTML estático, celular, baixa conexão, leitura fácil, teclado, legendas e materiais imprimíveis.

## 2. Visão pedagógica

**Missão:** aprender fazendo, pensando, convivendo e cuidando, com dignidade igual para conhecimentos acadêmicos, comunitários e práticos.

Princípios: observar → experimentar → refletir → evidenciar; aprendizagem situada no Brasil e aberta ao mundo; acessibilidade; fontes abertas com licença explícita; IA como apoio, não autoridade; transparência sobre conteúdo gerado ou assistido por IA; segurança e ética como critérios obrigatórios.

### Camadas de aprendizagem

| Camada | Duração indicativa | Evidência |
|---|---:|---|
| Aula/atividade | 10–30 min | Registro, resposta ou artefato simples |
| Módulo | 2–6 h | Mini-projeto e reflexão |
| Curso | 12–60 h | Portfólio e certificado de participação, se oferecido |
| Trilha | 80–300 h | Portfólio e roteiro de prática quando necessário |
| Percurso integrador | 300+ h | Projeto com comunidade e avaliação documentada |

Níveis: **N0 Descoberta · N1 Fundamentos · N2 Prática · N3 Autonomia · N4 Mentoria**. Avaliação formativa por objetivos observáveis, rubricas, portfólio, autoavaliação e revisão humana. Segurança e ética são requisitos de aprovação, não pontos compensáveis.

### Competências transversais

- **A. Fundamentais:** leitura, escrita, matemática aplicada, línguas, lógica e método científico.
- **B. Socioemocionais:** empatia, comunicação, cooperação, cuidado, ética e autogestão.
- **C. Digitais e IA:** letramento digital, privacidade, segurança, dados, programação e verificação de informação.
- **D. Cidadãs e globais:** direitos, democracia, diversidade, sustentabilidade e participação comunitária.
- **E. Técnicas:** competências próprias de cada disciplina e prática.

Rubrica de domínio: 1 conhece; 2 faz com apoio; 3 faz com autonomia e segurança; 4 resolve situações novas; 5 ensina e orienta. Descrever evidências específicas por curso; não presumir que uma atividade online comprove competência profissional.

## 3. Escolas e catálogo proposto

As 14 escolas do plano inicial continuam como mapa de longo prazo, não como promessa de catálogo já disponível: Ofícios e Construção; Cuidado, Saúde e Envelhecimento; Educação e Docência; Libras, Línguas e Cultura Surda; Ciências Exatas e da Natureza; Humanidades e Sociedade; Direito, Política, Economia e Cidadania; Tecnologia, Dados e IA; Artes, Cultura e Comunicação; Alimentos, Campo e Ambiente; Trabalho, Negócios e Vida; Costura, Moda e Artesanato; Mobilidade e Logística; Cidadania Global e Futuro. A Escola de Integração organiza projetos transversais.

No portal atual já há percursos de química, física, filosofia, religiões, biologia, internet e pesquisa. Preservar as páginas e URLs existentes; ampliar o catálogo por páginas pequenas e revisadas, sem afirmar que o conteúdo do portal já cobre toda a matriz acima.

### Inclusão de segurança digital para crianças

Na Escola de Tecnologia, Dados e IA, incluir **“Hacker ético mirim: segurança digital, curiosidade e cuidado”**, com escopo de cidadania digital e pensamento crítico. “Hacker ético” deve ser explicado como alguém que aprende e ajuda **com autorização explícita**; curiosidade nunca é autorização. Ver a ementa piloto em `universidade/hacker-etico/`.

## 4. Ficha obrigatória para novos cursos

Registrar: id e título; escola; nível; público e faixa etária quando pertinente; pré-requisitos; carga horária estimada; responsável e revisão; objetivos observáveis; competências e níveis-alvo; módulos com observar/experimentar/refletir/evidenciar; materiais e custo; riscos e mitigação; acessibilidade; prática supervisionada necessária; avaliação/rubrica; fontes e licenças; avisos e encaminhamentos; status (`rascunho`, `em revisão`, `publicado`). Não publicar `rascunho` como curso concluído.

O repositório hoje não possui a estrutura YAML/schema sugerida no documento original. Primeiro documentar e testar uma migração em separado; não declarar `/data` como fonte de verdade nem gerar páginas automaticamente até que isso esteja implementado.

## 5. Kit Copilot revisado

### Instruções gerais sugeridas

```markdown
# Portal educacional independente
Idioma principal: pt-BR. Preserve as páginas estáticas, URLs, acessibilidade e identidade existentes.
Antes de editar, inspecione os arquivos reais e siga AGENTS.md. Faça uma mudança pequena por tarefa.
Não invente fontes, licenças, normas, métricas, resultados ou aprovações. Marque incertezas como TODO.
Todo curso informa objetivos, público, revisão humana, fontes/licenças, acessibilidade, riscos e limites.
Não alegue diploma, habilitação ou equivalência acadêmica. Não publique conteúdo sensível sem revisão apropriada.
Conteúdo de Libras exige produção/validação humana por pessoas surdas; nunca simule Libras com IA.
Para cursos infantis: privacidade por padrão, linguagem apropriada, acompanhamento adulto e atividades seguras, fictícias ou em sandbox autorizado. Não orientar acesso a sistemas de terceiros.
Não introduza telemetria, coleta de respostas ou armazenamento de dados pessoais sem decisão explícita e análise de privacidade.
Inclua no PR resumo, arquivos tocados, verificações realizadas, limitações e TODOs.
```

### Prompts de tarefa, um PR por vez

- **Auditoria inicial:** “Inspecione a arquitetura atual antes de propor mudanças. Liste páginas, rotas, fontes de catálogo, testes e lacunas; não crie `/data` nem reescreva páginas ainda.”
- **Curso novo:** “Crie uma página estática de curso usando o padrão existente. Entregue a ficha completa, conteúdo em rascunho quando houver lacunas, acessibilidade e fontes verificáveis; atualize navegação/sitemap apenas para rotas existentes.”
- **Revisão de segurança:** “Avalie riscos e limites, sem fornecer instruções operacionais perigosas. Separe fatos verificados de itens que exigem especialista.”
- **Auditoria de acessibilidade:** “Confira semântica, títulos, foco/teclado, contraste, linguagem clara, alternativa a mídia e funcionamento sem JavaScript; relate o que foi realmente testado.”
- **Evolução de dados:** “Proponha em PR isolado um schema e teste de validação compatíveis com o conteúdo existente. Não migre páginas nem declare fonte de verdade antes da revisão.”

## 6. Ementa piloto: Hacker ético mirim

- **Público provisório:** crianças de 9–12 anos, sempre com responsável adulto. Faixa e linguagem são hipóteses para revisão por educador e família, não validação especializada.
- **Nível/carga:** N0–N1; cerca de 3 horas em seis atividades curtas, adaptáveis offline.
- **Objetivos:** explicar autorização e privacidade com exemplos; identificar informações pessoais que não devem ser publicadas; propor uma senha-frase sem compartilhá-la; reconhecer mensagens suspeitas em exemplos fictícios; saber interromper e pedir ajuda; apresentar uma regra de cuidado digital.
- **Módulos:** 1) curiosidade, ética e autorização; 2) dados pessoais e pegada digital; 3) senhas-frase e autenticação em linguagem conceitual (nunca revelar a senha); 4) mensagens suspeitas e como confirmar com adulto; 5) como proteger um personagem em uma história de faz de conta; 6) cartaz/guia “Parei, não compartilhei, pedi ajuda”.
- **Limites das práticas:** usar cartões, histórias e desenhos. Nenhum alvo real, conta, site, rede, dispositivo de terceiros, ferramenta de teste, download ou coleta de dados. Qualquer demonstração digital deve ser previamente autorizada pelo responsável, usar ambiente local controlado sem rede e não coletar credenciais. Se algo parecer inseguro, parar e chamar adulto de confiança.
- **Avaliação:** rubrica simples: reconhece autorização; protege dados; identifica situação que merece ajuda; explica uma escolha segura. Não avaliar capacidade de invadir, testar ou contornar sistemas.
- **Materiais:** papel e lápis; atividades imprimíveis. Sem custo obrigatório.
- **Aviso:** alfabetização para segurança e cidadania digital; não é treinamento de pentest, não habilita auditoria e não substitui supervisão de adulto.
- **Revisão antes da publicação:** `TODO: revisão pedagógica infantil e de proteção de crianças`; `TODO: validar faixa etária e acessibilidade`; `TODO: revisar fontes, autoria e licença`. O conteúdo pode permanecer piloto/rascunho até esses itens serem resolvidos.

## 7. Roadmap realista

1. **Fundação:** revisar nome e aviso institucional; fazer inventário do site real; definir governança e ficha editorial mínima.
2. **Pilotos:** publicar apenas disciplinas cuja fonte e revisão estejam claras; preparar o curso infantil como rascunho acessível e submetê-lo à revisão antes de promovê-lo como curso pronto.
3. **Qualidade:** conferir links, rotas, teclado, mobile, leitura fácil, sitemap e eventuais testes existentes; não afirmar que CI/Lighthouse/axe existem sem verificá-los.
4. **Modelo de dados:** avaliar schemas e geração de páginas em PR separado, após mapear a arquitetura atual e planejar migração reversível.
5. **Parcerias e prática:** firmar parcerias e protocolos antes de oferecer oficinas de ofícios ou cuidado.

### Critérios de aceite por tarefa

- Escopo pequeno, arquivos/rotas existentes preservados e instruções do repositório seguidas.
- Conteúdo com status honesto, fontes/licenças e avisos; sem promessas não verificadas.
- Páginas navegáveis por teclado e em celular; sem JavaScript obrigatório para ler o curso.
- Para o curso infantil, nenhuma atividade instrui ou incentiva testar sistemas, redes, contas ou dispositivos sem autorização; adulto de referência e privacidade são explícitos.
- Relatório do PR informa testes executados e pendências humanas. Não declarar tarefas U1–U10 como concluídas por apenas criar este plano.
