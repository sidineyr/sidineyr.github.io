/* Links editoriais por contexto; nenhuma análise de dados pessoais. */
(() => {
 const catalogUrl = new URL('../materiais.html', document.currentScript.src).href;
 const project = "callguide";
 // Match complete route segments, so public lessons such as #contabilidade
 // and #moderacao-de-debates do not accidentally hide the disclosure.
 function privateRoute() {
  const excluded = new Set(['conta','account','caderno','notebook','login','dashboard','moder','moderacao','moderação','moderation','moderar','admin','administracao','administração','resultado','resultados','result','results','respostas','answers','questionario','questionário','questionnaire']);
  return [location.pathname, location.hash.replace(/^#/, '')].some(route =>
   route.split(/[?#]/, 1)[0].split('/').filter(Boolean).some(segment => {
    try { segment = decodeURIComponent(segment); } catch { /* Keep malformed segments literal. */ }
    return excluded.has(segment.toLocaleLowerCase('pt-BR'));
   })
  );
 }
 const pairs = {"art":["Papel para criar e registrar","Paper for creating and recording","Papier pour créer et prendre des notes","Papel para crear y registrar"]};
 const projects={"callguide":"art"};
 const editorial = {"heading":"Como usar este percurso","sourceNotice":"Referências externas para aprofundamento. Sua inclusão não significa parceria, aprovação ou revisão deste projeto pelas instituições citadas.","projects":{"callguide":{"title":"CallGuide · observar e praticar o traçado","audience":"Crianças com acompanhamento de um adulto e pessoas que desejam praticar a escrita manual.","goal":"Observar um movimento de escrita e praticá-lo em uma letra ou palavra curta.","practice":["Escolha uma letra e acompanhe o movimento apresentado.","Pratique algumas tentativas no suporte disponível, no seu ritmo.","Compare as tentativas e escolha um ajuste de direção, espaço ou legibilidade para experimentar."],"limits":"Ferramenta de prática, sem diagnóstico de dificuldades de escrita ou resultado garantido. A escrita envolve também linguagem, leitura e expressão; o traçado isolado não substitui esse conjunto. Preserve a proposta do aplicativo offline e sem anúncios.","sources":[{"label":"Reading Rockets · ensino da escrita manual","url":"https://www.readingrockets.org/topics/writing/articles/importance-teaching-handwriting"}]}}};
 function renderEditorial() {
  const previous = document.getElementById('educational-editorial');
  const wasOpen = previous?.open === true;
  previous?.remove();
  if (privateRoute() || document.documentElement.lang.slice(0,2).toLowerCase() !== 'pt') return;
  const aliases = {chemical:'Chemical',fisica:'Einstein-Fisica',filosofia:'filosofia-aberta',python:'python-swirl-statistics',callguid:'callguide'};
  const entry = editorial.projects[project];
  if (!entry) return;
  const panel = document.createElement('details');
  panel.id = 'educational-editorial';
  panel.open = wasOpen;
  panel.style.cssText = 'box-sizing:border-box;max-width:760px;margin:20px auto;padding:16px;border:1px solid #9995;border-radius:8px;font:16px/1.6 system-ui,sans-serif;';
  const summary = document.createElement('summary');
  summary.textContent = editorial.heading;
  summary.style.cssText = 'cursor:pointer;font-weight:700;';
  panel.append(summary);
  function paragraph(label, text) {
   const p = document.createElement('p');
   const strong = document.createElement('strong');
   strong.textContent = label + ' ';
   const span = document.createElement('span');
   span.textContent = text;
   p.append(strong, span);
   panel.append(p);
  }
  paragraph('Proposta:', entry.title);
  paragraph('Para quem:', entry.audience);
  paragraph('Objetivo:', entry.goal);
  const steps = document.createElement('ol');
  for (const instruction of entry.practice) {
   const item = document.createElement('li'); item.textContent = instruction; steps.append(item);
  }
  panel.append(steps);
  paragraph('Limites:', entry.limits);
  paragraph('Para aprofundar:', editorial.sourceNotice);
  const references = document.createElement('ul');
  for (const source of entry.sources) {
   if (!/^https:\/\//.test(source.url)) continue;
   const item = document.createElement('li'), link = document.createElement('a');
   link.href = source.url; link.textContent = source.label;
   link.target = '_blank'; link.rel = 'noopener noreferrer';
   item.append(link); references.append(item);
  }
  panel.append(references);
  const footer = document.querySelector('body > footer');
  if (footer) footer.before(panel); else document.body.append(panel);
 }
 function render() {
  document.getElementById('educational-affiliate')?.remove();
  renderEditorial();
  if (privateRoute()) return;
  let topic=projects[project]||project;
  if (project==='art') topic=['musica','danca','teatro','integradas'].find(t=>location.hash.includes(t))||'art';
  if (project==='Einstein-Fisica' && /eletri|circuit|arduino/i.test(location.hash+location.pathname)) topic='eletricidade';
  if (!pairs[topic]) return;
  const collectionUrls = {"art":"https://meli.la/2N84Vza"};
  const url = collectionUrls[topic];
  const lang=document.documentElement.lang.slice(0,2), i=({en:1,fr:2,es:3})[lang]||0;
  const labels=[['Publicidade · link de afiliado','Ideias de materiais para educadores e responsáveis','Ver seleção no Mercado Livre (Brasil) ↗','Confira os produtos, preços e condições atuais no Mercado Livre. Posso receber comissão por compras elegíveis. A atividade pode ser feita com o que você já tem.'],['Advertisement · affiliate link','Material ideas for educators and carers','View selection on Mercado Livre (Brazil) ↗','Check current products, prices and terms on Mercado Livre. I may earn a commission on eligible purchases. You can use materials you already have for the activity.'],['Publicité · lien affilié','Idées de matériel pour les équipes éducatives et les familles','Voir la sélection sur Mercado Livre (Brésil) ↗','Consultez les produits, prix et conditions actuels sur Mercado Livre. Je peux percevoir une commission sur les achats éligibles. Pour l’activité, vous pouvez utiliser le matériel dont vous disposez déjà.'],['Publicidad · enlace de afiliado','Ideas de materiales para docentes y familias','Ver selección en Mercado Livre (Brasil) ↗','Consulta los productos, precios y condiciones actuales en Mercado Livre. Puedo recibir una comisión por compras elegibles. Puedes realizar la actividad con los materiales que ya tienes.']][i];
  const box=document.createElement('aside');box.id='educational-affiliate';box.setAttribute('aria-label',labels[0]);box.style.cssText='box-sizing:border-box;max-width:760px;margin:20px auto;padding:12px 16px;border-top:1px solid #9995;font:12px/1.55 sans-serif;';
  const small=document.createElement('small');small.textContent=labels[0];
  const p=document.createElement('p');p.style.margin='6px 0';p.textContent=labels[1]+': '+pairs[topic][i]+'.';
  const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='sponsored noopener noreferrer';a.textContent=labels[2];
  const note=document.createElement('p');note.style.cssText='font-size:11px;margin:6px 0 0';note.textContent=labels[3];
  box.append(small,p,a,note);
  const catalog=document.createElement('a');catalog.href=catalogUrl;catalog.textContent=['Guia de materiais e alternativas gratuitas ↗','Materials and free alternatives ↗','Matériel et alternatives gratuites ↗','Materiales y alternativas gratuitas ↗'][i];
  catalog.style.cssText='display:block;margin-top:12px;font-size:14px;';box.append(catalog);

  const footer=document.querySelector('body > footer');if(footer)footer.before(box);else document.body.append(box);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render,{once:true});else render();
 window.addEventListener('hashchange',render);
 window.addEventListener('popstate',render);
 new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();