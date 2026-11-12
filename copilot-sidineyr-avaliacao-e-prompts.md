# sidineyr.github.io — Avaliação e plano de melhorias para o GitHub Copilot

> Escopo da análise: página inicial (https://sidineyr.github.io/) e subsite `/art/` lidos diretamente.
> `/cursos/`, `/bb/`, `/qv/`, `/biosfera/`, `/filosofia-aberta/`, `/python-swirl-statistics/` etc. **não puderam ser abertos**; a avaliação deles parte dos cards da home. Antes de executar cada prompt, peça ao Copilot para **ler o repositório real** e confirmar o que existe.

---

## PARTE 1 — AVALIAÇÃO

### 1.1 Pontos fortes
- Posicionamento claro (educação, artes, ciência, tecnologia) e gratuito/aberto.
- Transparência: aviso de privacidade sobre o CounterAPI, "Publicidade · links de afiliados", "certificado simbólico, sem equivalência acadêmica", "sem diagnóstico", "sem vínculo com o hospital".
- Fallback para JavaScript desativado (`noscript`) e link "Pular para o conteúdo" no `/art/`.
- Metadados básicos (canonical, og:locale, robots, theme-color), PT/EN, ordenação dos projetos, pedagogia em três etapas (observar, experimentar, refletir).
- Diversidade real de projetos: Física, Química, Biologia, Filosofia, Artes, Python/Estatística, educação digital, app Android.

### 1.2 Problemas e riscos (por prioridade)

**Alta**
1. **Domínios externos fora do GitHub Pages**: Horizonte (`horizonte-vocacional.blubier.chatgpt.site`) e Atlas do Sagrado (`atlas-do-sagrado.blubier.chatgpt.site`). Risco de link quebrado, sem controle de versão, identidade visual e analytics inconsistentes.
2. **APK distribuído por link `raw.githubusercontent`/`raw/refs/heads/master`**: ruim para confiança e segurança. Falta release versionada, checksum SHA-256, política de privacidade e permissões declaradas. O card do CallGuide também não tem contador como os demais.
3. **`/art/` tem login/cadastro, caderno na conta, mural e modo "Infância"** em site estático. Exige: base legal e consentimento parental (LGPD art. 14 para crianças), política de privacidade própria, moderação documentada, e explicar onde os dados ficam.
4. **Publicidade inconsistente**: `/art/` declara `google-adsense-account` enquanto o portfólio e o CallGuide enfatizam "sem anúncios". Falta banner/gestão de consentimento (LGPD) se houver AdSense e um aviso coerente por site.
5. **Contadores de terceiros (CounterAPI, hits.sh)** enviam IP; contagem manipulável (uma escolha por navegador, limpando dados repete). Métrica pouco confiável usada para **ordenar os projetos**.

**Média**
6. **Primeira dobra da home é uma apresentação de 5 passos com tutor** antes do conteúdo; mesmo com "Pular", atrasa quem chega com objetivo. Conteúdo principal só aparece depois.
7. **SEO/compartilhamento**: `meta-keywords` é obsoleto; `twitter:card=summary` sem imagem; não há `og:image` visível; faltam JSON-LD (`WebSite`, `Person`, `Course`/`LearningResource`), `sitemap.xml`, `robots.txt`, `hreflang` para PT/EN.
8. **Conteúdo depende de JS** (`/art/` mostra "Abrindo o ateliê…"). Bom fallback parcial, mas o conteúdo textual dos percursos deveria existir em HTML estático.
9. **Nome "Universidade da Inteligência Artificial"** pode ser lido como instituição de ensino superior, apesar do aviso. Considere "Portal/Escola/Percursos". O mesmo cuidado vale para "certificado".
10. **"Python Swirl"**: *swirl* já é um pacote educativo conhecido do R; verifique se o nome pode gerar confusão.
11. **Sem licença visível** de conteúdo (ex.: CC BY-SA 4.0) e de código (MIT/Apache) em cada subsite; áudios da Rádio DJIA e imagens do tutor sem créditos/licença na página.
12. **Data "Atualizado em 7 de novembro de 2026" manual**: deve ser gerada do último commit ou do manifesto.
13. **Rádio DJIA**: fallback "abra os áudios no repositório" é fraco; sem controles de teclado/legendas descritivas documentadas; músicas só tocam se o JS carregar.
14. **Inconsistência de estilo**: "Artes" e "ciência" ora maiúsculo, ora minúsculo; "Educação, Artes, ciência e tecnologia" — padronizar a grafia. Subsites com identidades visuais distintas (bom para tema, ruim para navegação comum).

**Baixa**
15. Contraprova e Polliniza: marcados "Em desenvolvimento"; precisam de README com demo, `LICENSE`, `SECURITY.md`, `.env.example`, aviso de uso de APIs.
16. Links de afiliados no rodapé: ok com aviso, mas mover a divulgação para perto do link e usar `rel="sponsored noopener"`.
17. Falta página única de **Privacidade**, **Acessibilidade** (declaração) e **Sobre/Contato** no portfólio.

### 1.3 Avaliação resumida por projeto (com base nas descrições)
| Projeto | Impressão | Principal melhoria |
|---|---|---|
| ART | Muito ambicioso e bem referenciado (Met, MASP, Pinacoteca, Cleveland…) | Privacidade/LGPD, conteúdo estático, publicidade coerente, créditos e licenças das obras |
| Einstein · Física | Missões + laboratório de forças | Alinhar à BNCC/códigos de habilidade, testes de acessibilidade em gráficos, exportar dados |
| Horizonte | Útil, 6 idiomas | Migrar para GitHub Pages, aviso forte de "orientação não é diagnóstico", relatório sem dados pessoais no servidor |
| Quality View | Dados locais, CSV | Explicar que não é instrumento clínico; fonte do questionário e validação; botão "apagar meus dados" |
| Python Swirl | Dez módulos completos | Rodar notebooks em Binder/Colab/JupyterLite; testes automáticos dos notebooks |
| Chemical | Seis trilhas + simulações | Verificar correção científica com referências; modo daltônico em tabela periódica |
| Filosofia Aberta | Boa proposta | Fontes de domínio público/licença clara; trechos com citação e licença |
| Biosfera Aberta | 3D visual | Performance mobile, fallback sem WebGL, descrições alternativas |
| Atlas do Sagrado | Tema sensível | Neutralidade documentada, bibliografia plural, migrar domínio, rever "certificado simbólico" |
| BB · Internet e IA | Muito relevante | Atualização periódica de golpes, versão para idosos, impressão/PDF |
| Contraprova | Ótima ideia | Metodologia pública de checagem, limites, citação de fontes, proteção de chaves de API |
| Polliniza | Ferramenta útil | Política de dados, rate limit, documentação de instalação da extensão |
| Universidade da IA | Portal | Renomear ou reforçar aviso; mapa de percursos |
| CallGuide | App útil | Release assinada, checksum, política de privacidade, Play Store/F-Droid, contador |

---

## PARTE 2 — ARQUIVO `.github/copilot-instructions.md` (cole no repositório)

```markdown
# Instruções para o Copilot — sidineyr.github.io

## Contexto
Portfólio estático em GitHub Pages de Sidiney Rodrigues (professor, pedagogo, programador).
Projetos educacionais gratuitos e abertos. Idioma principal: português do Brasil (pt-BR), com inglês (en).
Público: crianças (com acompanhamento), adolescentes, adultos e professores, em celulares de baixo desempenho e conexões lentas.

## Princípios obrigatórios
1. Sem frameworks pesados nem build obrigatório, salvo decisão explícita. Preferir HTML, CSS e JavaScript (ES modules) puros.
2. Acessibilidade WCAG 2.2 AA: HTML semântico, foco visível, contraste, `prefers-reduced-motion`, rótulos, textos alternativos, navegação por teclado, `lang` correto.
3. Funciona sem JavaScript para o conteúdo essencial (progressive enhancement).
4. Privacidade (LGPD): sem cookies de rastreamento sem consentimento; dados do usuário ficam no navegador por padrão; nenhum dado pessoal em logs; avisos claros.
5. Textos de interface em pt-BR, com acentuação correta; en em arquivos/rotas paralelas. Grafia padronizada: "Artes", "ciência", "tecnologia".
6. Cada subsite tem: `README.md`, `LICENSE` (código) e licença do conteúdo (CC BY-SA 4.0, salvo exceção), página de privacidade, `sitemap`, metadados e `CHANGELOG.md`.
7. Nunca inventar fontes. Citações exigem referência verificável e licença. Conteúdo de saúde, direito, finanças e religião inclui aviso educativo e fontes plurais.
8. Pequenas mudanças, um PR por tarefa, com descrição, checklist e capturas de tela.
9. Sem segredos no repositório. Usar `.env.example`.
10. Cada alteração deve passar em: validação HTML, Lighthouse (Performance ≥ 90, Acessibilidade ≥ 95, SEO ≥ 95, Boas práticas ≥ 95), verificador de links e testes existentes.

## Convenções
- Estrutura: `/assets`, `/data` (JSON), `/i18n` (pt-BR.json, en.json), `/scripts`, `/tests`.
- CSS com variáveis (`--cor-*`), tema claro/escuro, mobile-first.
- Commits em português no imperativo (ex.: "Adiciona manifesto de projetos").
- Comentários de código em português.
```

---

## PARTE 3 — PROMPTS PARA O COPILOT (execute na ordem, um PR por prompt)

> Dica: use o Copilot em **modo agente** e comece cada prompt com "Leia o repositório e liste o que já existe antes de alterar".

### Prompt 1 — Manifesto único de projetos (fonte de verdade)
```
Crie /data/projetos.json como fonte única da lista de projetos do portfólio, com campos:
id, nome, area, descricao_pt, descricao_en, publico, url, repo, status (ativo|novo|em-desenvolvimento),
licenca_codigo, licenca_conteudo, atualizado_em (ISO 8601), idiomas[], acessibilidade_ok (bool), usa_terceiros[] (ex.: CounterAPI), coleta_dados (nenhuma|local|servidor).
Refatore a home para renderizar os cards a partir desse JSON, com fallback em HTML estático gerado por script (/scripts/gerar-home.mjs) para funcionar sem JavaScript.
Gere "Atualizado em" a partir do commit mais recente ou do campo atualizado_em. Adicione teste que falha se um card não tiver URL válida.
```

### Prompt 2 — Home: conteúdo primeiro, apresentação opcional
```
Na home, mostre o título, a frase de valor, o botão "Casa de Cursos" e a lista de projetos acima da dobra.
Transforme a apresentação de 5 passos do tutor em um painel opcional ("Quer um guia?"), lembrando a escolha em localStorage e respeitando prefers-reduced-motion.
Nenhum áudio inicia automaticamente. Garanta foco gerenciado, tecla Esc e leitura por leitores de tela. Meça CLS e LCP antes/depois e registre no PR.
```

### Prompt 3 — SEO, compartilhamento e dados estruturados
```
Remova meta keywords. Adicione og:image (1200x630) e twitter:card=summary_large_image por página,
JSON-LD (WebSite, Person, e Course/LearningResource por projeto), sitemap.xml, robots.txt,
hreflang pt-BR/en, canonical por subsite, e página 404.html útil com busca de projetos.
Valide com testes de HTML e liste URLs com problemas.
```

### Prompt 4 — Privacidade, contadores e LGPD
```
Crie /privacidade/ (pt e en) descrevendo, por projeto, quais dados são tratados e onde.
Substitua CounterAPI e hits.sh por uma opção sem IP persistente (ex.: GoatCounter ou contador próprio agregado), ou torne o contador opt-in.
Remova a ordenação padrão por "mais acessados" quando o contador falhar e use ordem editorial.
Se houver AdSense ou afiliados, implemente banner de consentimento (aceitar/recusar/gerenciar) e só carregue scripts de anúncio após aceite.
Rotule claramente "Publicidade" próximo aos links e use rel="sponsored noopener noreferrer".
```

### Prompt 5 — `/art/`: conta, crianças e moderação
```
Audite /art/ quanto a login/cadastro, caderno, mural e modo "Infância".
Documente em /art/privacidade e /art/moderacao: dados coletados, base legal, retenção, exclusão de conta, exportação do caderno.
Para o modo Infância: não coletar dados pessoais sem responsável; mural desativado; sem anúncios.
Gere HTML estático dos 30 encontros (título, objetivo, atividade, referências) para funcionar sem JS e para indexação.
Adicione créditos e licença de cada obra/imagem de acervo (Met, Cleveland, V&A, LoC, etc.) em um data/creditos.json exibido na interface.
```

### Prompt 6 — Migração de projetos externos
```
Migre Horizonte e Atlas do Sagrado de *.blubier.chatgpt.site para o GitHub Pages (/horizonte/ e /atlas-do-sagrado/) mantendo redirecionamentos documentados.
Padronize cabeçalho, rodapé, tema, aviso educativo e links de privacidade com um pacote compartilhado em /assets/shared/ (CSS e web components simples).
Atualize projetos.json e adicione verificação de links no CI.
```

### Prompt 7 — CallGuide: distribuição segura
```
Crie Releases versionadas no repositório callguid com o APK assinado, SHA-256 no corpo da release e CHANGELOG.
Atualize o botão de download da home para a página da release (não para raw/refs/heads/master).
Adicione política de privacidade, lista de permissões do app, instruções de instalação com avisos de segurança, e avalie publicar na Google Play e F-Droid.
Adicione um contador de interesse equivalente aos outros cards, usando a mesma solução do Prompt 4.
```

### Prompt 8 — Qualidade técnica e CI
```
Crie .github/workflows/qualidade.yml com: html-validate, pa11y/axe, Lighthouse CI com orçamentos, verificação de links, lint de JSON, spellcheck pt-BR, e teste de que páginas essenciais funcionam sem JS.
Adicione CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, templates de issue (sugestão de curso, erro de conteúdo, acessibilidade) e Dependabot.
```

### Prompt 9 — Licenças, créditos e rádio DJIA
```
Adicione LICENSE (código) e LICENSE-CONTEUDO (CC BY-SA 4.0 ou escolha informada) na raiz e em cada subsite.
Crie /creditos/ com autoria e licença das músicas da Rádio DJIA, do tutor e das imagens.
Inclua os áudios no próprio site (formato opus/mp3 leve) com player acessível (play/pause por teclado, volume, transcrição ou descrição) e fallback em <audio controls>.
```

### Prompt 10 — Projetos em desenvolvimento (Contraprova e Polliniza)
```
Em cada repositório: README com objetivo, demo, limites, instalação, .env.example, LICENSE, SECURITY.md e roteiro.
Contraprova: publique /metodologia com critérios de checagem, hierarquia de fontes, política de correção e aviso de que a ferramenta apoia, não substitui, a checagem humana.
Polliniza: documente permissões da extensão, política de dados, rate limit, e modo "simular" sem publicar.
```

### Prompt 11 — Nomes e avisos educativos
```
Revise os nomes e microtextos que possam sugerir vínculo institucional (ex.: "Universidade da Inteligência Artificial", "certificado").
Proponha alternativas (ex.: "Percursos de IA — Portal aberto") e implemente um componente <aviso-educativo> reutilizável com variações: saúde, orientação vocacional, religião/filosofia, finanças, direito, certificado simbólico.
Verifique também colisão de nomes (ex.: "Python Swirl") e sugira renomeação se necessário.
```

---

## PARTE 4 — CASA DE CURSOS: CURRÍCULO PARA O CIDADÃO DO MUNDO

> Meta: cobrir **conhecimento geral e médio** em todas as áreas (exatas, naturais, humanas, sociais, saúde, tecnologia, artes), integrando os projetos existentes. Não consegui abrir `/cursos/`; peça ao Copilot que **reutilize o que já existe** (caderno pessoal, trilhas, etapas) e só expanda a partir daí.

### 4.1 Modelo pedagógico
- Três etapas por aula: **Observar → Experimentar → Refletir** (já usada no site).
- Três níveis: **Fundamentos** (alfabetização básica na área), **Médio** (equivalente ao ensino médio, com referência à BNCC), **Cidadão Global** (integra áreas, problemas reais, ética e ação).
- Cada curso: 4–8 módulos · 6–10 aulas curtas · mini-projeto · avaliação formativa · glossário · bibliografia aberta · caderno pessoal · versão imprimível.
- Todo curso aponta para projeto existente quando houver (ex.: Física → Einstein; Química → Chemical; Biologia → Biosfera; Filosofia → Filosofia Aberta; Artes → ART; Dados → Python Swirl; Internet/IA → BB).

### 4.2 Mapa de áreas e temas

**1. Linguagens e Comunicação**
Português: leitura, escrita, gramática em uso, literatura brasileira e lusófona · Redação e argumentação · Inglês (A1–B2) · Espanhol · Libras (introdução) · Línguas do mundo e linguística básica · Literatura mundial · Retórica, oratória, debate · Comunicação digital e escrita para a web · Tradução e interculturalidade.

**2. Matemática e Lógica**
Aritmética e números · Álgebra · Geometria plana e espacial · Trigonometria · Funções · Probabilidade e estatística · Análise de dados e gráficos · Matemática financeira · Lógica e raciocínio · Pensamento computacional · História da matemática · Matemática do cotidiano.

**3. Ciências da Natureza**
Física (mecânica, termologia, ondas, óptica, eletricidade, física moderna) · Química (matéria, reações, orgânica, ambiental) · Biologia (célula, genética, evolução, ecologia, corpo humano) · Astronomia e cosmologia · Geociências (geologia, clima, solo, água) · Meteorologia · Ciências ambientais e biodiversidade · Método científico e pensamento crítico.

**4. Ciências Humanas**
História: Brasil, mundo, África, Ásia, Américas, Europa, Oriente Médio, povos originários · Geografia física, humana, geopolítica e cartografia · Filosofia (antiga a contemporânea, ética, lógica, filosofia da ciência) · Sociologia · Antropologia · Psicologia (geral, desenvolvimento, social) · Arqueologia e patrimônio · Religiões comparadas e história das religiões · Estudos sobre Brasil: raça, gênero, território, cultura.

**5. Ciências Sociais Aplicadas**
Economia (micro, macro, economia global, desigualdade) · Ciência política e instituições · Direito e cidadania (direitos básicos, consumidor, trabalho, digital) · Relações internacionais e organizações globais · Administração e gestão · Contabilidade básica · Educação e aprendizagem · Comunicação e mídia · Urbanismo e cidades.

**6. Saúde e Bem-estar**
Primeiros socorros · Nutrição e alimentação · Saúde mental e emocional · Saúde pública, vacinas, epidemiologia · Atividade física · Sono, estresse, hábitos · Saúde sexual e reprodutiva · Envelhecimento · Segurança no trabalho e em casa · Medicina baseada em evidências (como ler estudos).
*Aviso educativo obrigatório: não substitui orientação profissional.*

**7. Tecnologia e Computação**
Informática básica · Internet e segurança digital · Python · Dados e estatística · Inteligência artificial (conceitos, ética, limites, prompts) · Algoritmos · Web · Bancos de dados · Eletrônica e robótica · Redes · Privacidade e direitos digitais · Software livre.

**8. Engenharias e Ciências Aplicadas**
Fundamentos de engenharia · Energia e sustentabilidade · Materiais · Construção e arquitetura básica · Agricultura, alimentos e agroecologia · Transportes e mobilidade · Saneamento · Manutenção e reparos domésticos · Design e prototipagem.

**9. Artes e Cultura**
Artes visuais · Música · Dança · Teatro · Cinema e audiovisual · Fotografia · Design e arquitetura · Patrimônio e museus · Culturas populares e indígenas · Literatura como arte · Arte e tecnologia.

**10. Cidadania Global e Sustentabilidade**
Direitos humanos · Democracia e participação · Objetivos de Desenvolvimento Sustentável (ODS) · Mudanças climáticas · Migrações e refúgio · Diversidade, igualdade, antirracismo · Paz e resolução de conflitos · Ética global · Mídia, desinformação e verificação · Cooperação internacional · Consumo consciente.

**11. Competências para a Vida**
Aprender a aprender · Leitura crítica · Estudo e memória · Finanças pessoais · Tomada de decisão · Carreira e orientação (Horizonte) · Empreendedorismo e trabalho · Comunicação interpessoal · Gestão do tempo · Escrita acadêmica e pesquisa · Voluntariado.

**12. Integração e Metaconhecimento**
História das ciências · Epistemologia (como sabemos o que sabemos) · Problemas interdisciplinares (água, alimentos, cidades, saúde, IA) · Projeto final "Cidadão do mundo": um problema real, três áreas, um produto.

### 4.3 Esquema de dados (`/data/cursos.json`)
```json
{
  "id": "fisica-mecanica",
  "area": "ciencias-da-natureza",
  "titulo_pt": "Mecânica: movimento e forças",
  "titulo_en": "Mechanics: motion and forces",
  "nivel": "medio",
  "idade_sugerida": "15+",
  "carga_horaria_estimada": 12,
  "pre_requisitos": ["matematica-funcoes"],
  "objetivos": ["Interpretar gráficos de movimento", "..."],
  "alinhamento": {"bncc": ["EM13CNT101"], "ods": [4], "outros": []},
  "modulos": [{"id": "m1", "titulo_pt": "...", "aulas": [{"observar": "...", "experimentar": "...", "refletir": "..."}]}],
  "projeto_relacionado": "https://sidineyr.github.io/Einstein-Fisica/",
  "avaliacao": {"tipo": "formativa", "banco_questoes": "/data/q/fisica-mecanica.json"},
  "fontes_abertas": [{"titulo": "...", "url": "...", "licenca": "CC BY 4.0"}],
  "aviso_educativo": null,
  "status": "planejado|rascunho|publicado",
  "revisado_por": "",
  "revisado_em": ""
}
```

### 4.4 Prompts do Copilot para a Casa de Cursos

**Prompt C1 — Catálogo e navegação**
```
Em /cursos/, crie um catálogo gerado de /data/cursos.json (esquema da Parte 4.3) com 12 áreas, 3 níveis (Fundamentos, Médio, Cidadão Global), busca por texto, filtros por área/nível/idioma/idade/duração e mapa de pré-requisitos.
Cada área tem página estática (/cursos/<area>/) e cada curso tem página própria (/cursos/<area>/<curso>/), todas funcionando sem JS, com breadcrumbs, JSON-LD Course e botão imprimir/PDF.
Mantenha o caderno pessoal existente e o percurso "observar, experimentar, refletir". Mostre status (planejado/rascunho/publicado) para não prometer o que não existe.
```

**Prompt C2 — Semear o catálogo (planejamento, não conteúdo final)**
```
Com base no mapa de áreas e temas da Parte 4.2 deste documento, gere /data/cursos.json com ao menos 8 cursos por área (3 em Fundamentos, 3 em Médio, 2 em Cidadão Global), todos com status "planejado", objetivos, pré-requisitos e alinhamento preliminar à BNCC/ODS.
Vincule cursos aos projetos existentes (Einstein, Chemical, Biosfera, Filosofia Aberta, ART, Python Swirl, BB, Horizonte, Atlas do Sagrado) e marque "lacuna" onde não houver projeto.
Não invente URLs; use null quando o recurso não existir.
```

**Prompt C3 — Trilhas "Cidadão do Mundo"**
```
Crie trilhas compostas que combinem cursos de várias áreas, por exemplo:
"Entender o clima" (Física + Química + Geografia + Economia + ODS),
"Cidadania digital" (Internet/IA + Direito + Ética + Verificação de fatos),
"Saúde e sociedade" (Biologia + Saúde pública + Estatística + Mídia),
"Cidades e futuro" (Geografia + Urbanismo + Energia + Política),
"Culturas do mundo" (História + Artes + Religiões + Línguas).
Cada trilha termina com um projeto integrador e uma reflexão no caderno.
```

**Prompt C4 — Qualidade pedagógica e fontes**
```
Para cada curso publicado, exija no esquema: objetivos mensuráveis, fontes abertas com licença, revisão por pessoa responsável, data de revisão, e aviso educativo quando a área for Saúde, Direito, Finanças ou Religião.
Crie script que falha o CI se faltar campo obrigatório ou se uma fonte não tiver URL/licença. Priorize fontes abertas: Domínio Público, SciELO, MIT OpenCourseWare, Khan Academy, OER Commons, Portal do MEC, Wikipedia/Wikimedia (com checagem), IBGE, Our World in Data, NASA, Museus com acervo aberto.
```

**Prompt C5 — Avaliação formativa e progresso local**
```
Implemente bancos de questões em JSON por curso (múltipla escolha, verdadeiro/falso com justificativa, resposta curta), feedback explicativo e dicas, sem identificar o usuário.
Salve progresso e caderno em localStorage/IndexedDB com opções "exportar" e "apagar meus dados". Certificado, se existir, deve ser "de participação simbólica" e sem equivalência acadêmica, usando <aviso-educativo>.
```

**Prompt C6 — Idiomas e acessibilidade da Casa de Cursos**
```
Estruture i18n (pt-BR, en e preparação para es) com arquivos /i18n/*.json e chaves por curso.
Garanta leitura fácil (linguagem clara), glossário por aula, legendas/transcrição em vídeos, alternativas textuais em simulações, modo alto contraste e fontes ajustáveis. Teste com axe e navegação só por teclado.
```

### 4.5 Ordem sugerida de produção
1. Competências para a Vida + Linguagens + Matemática (base para tudo).
2. Cidadania Global + Tecnologia/IA/Segurança digital (alta demanda; já há BB e Python Swirl).
3. Ciências da Natureza e Humanas (já há Einstein, Chemical, Biosfera, Filosofia, Atlas).
4. Ciências Sociais Aplicadas e Saúde (exigem revisão especializada e avisos).
5. Engenharias, Artes ampliadas e Integração.

---

## PARTE 5 — CHECKLIST DE ACEITE GERAL
- [ ] Home mostra projetos sem depender do tutor ou de JS
- [ ] Nenhum projeto fora do domínio principal sem justificativa documentada
- [ ] Privacidade por projeto + banner de consentimento quando houver anúncios/rastreio
- [ ] Lighthouse ≥ 90/95/95/95 nas páginas principais
- [ ] Licenças e créditos visíveis
- [ ] APK com release versionada e SHA-256
- [ ] `/cursos/` com 12 áreas, status honesto e vínculo aos projetos existentes
- [ ] Avisos educativos aplicados (saúde, direito, finanças, religião, vocacional, certificado)
