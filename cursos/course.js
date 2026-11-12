(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  if ($('search')) {
    $('search').addEventListener('input', () => {
      const term = $('search').value.trim().toLocaleLowerCase('pt-BR');
      let count = 0;
      document.querySelectorAll('article[data-course]').forEach(card => {
        card.hidden = !card.textContent.toLocaleLowerCase('pt-BR').includes(term);
        if (!card.hidden) count++;
      });
      $('results').textContent = `${count} percursos encontrados`;
    });
    return;
  }
  if (!document.body.dataset.course) return;

  const course = document.body.dataset.course;
  const contextualActions = document.createElement('section');
  contextualActions.className = 'lesson';
  contextualActions.id = 'contextual-actions';
  contextualActions.hidden = true;
  if (course === 'horizonte') {
    contextualActions.innerHTML = '<h2>Orientação para escolas</h2><p>Conheça a proposta do Modo Orientador. Nenhum nome ou resposta individual é exibido.</p><p><a href="/cursos/horizonte/para-escolas/">Abrir Modo Orientador</a></p><p>Piloto com vagas limitadas</p><p><a href="[LINK_FORMULARIO]">Sou orientador, quero usar com minha turma</a></p><p>[LINK_FORMULARIO / EMAIL_CONTATO]</p>';
  } else if (course === 'qv') {
    contextualActions.innerHTML = '<h2>Visão Gestor</h2><p>Acesso somente agregado, condicionado à aprovação de um mínimo seguro de respondentes. Agregados não são exibidos até essa aprovação.</p><p><a href="/cursos/qv/visao-gestor/">Consultar disponibilidade da visão de gestor</a></p>';
  } else if (course === 'Einstein-Fisica') {
    contextualActions.innerHTML = '<h2>Para professores</h2><p>Você é professor? Baixe o guia da aula</p><p><a href="/cursos/Einstein-Fisica/para-professores/GUIA-1-AULA.md">Baixar o guia da aula</a></p>';
  }
  if (contextualActions.innerHTML) $('conteudo').append(contextualActions);

  if (course === 'qv') {
    const disclaimer = document.createElement('p');
    disclaimer.setAttribute('role', 'note');
    disclaimer.className = 'lesson';
    disclaimer.textContent = 'Este instrumento é de auto-observação e não substitui avaliação profissional de saúde. Não é diagnóstico.';
    const main = $('conteudo');
    main.insertBefore(disclaimer, main.firstChild);
  }

  const key = `casa:1:${course}`;
  let state = {stage:0, notes:''};
  try {
    const data = JSON.parse(localStorage.getItem(key));
    if (data && Number.isInteger(data.stage) && data.stage >= 0 && data.stage <= 3)
      state = {stage:data.stage, notes:typeof data.notes === 'string' ? data.notes : ''};
  } catch {}
  function render() {
    $('progress').value = state.stage;
    $('score').textContent = `${state.stage}/3 etapas · ${state.stage * 100} XP${state.stage===3?' · Percurso concluído!':''}`;
    $('practice').hidden = state.stage < 1;
    $('reflection').hidden = state.stage < 2;
    if (contextualActions.innerHTML) contextualActions.hidden = state.stage < 3;
  }
  function save() {
    try { localStorage.setItem(key, JSON.stringify(state)); }
    catch { $('status').textContent = 'Armazenamento indisponível: progresso válido somente nesta sessão.'; }
    render();
  }
  function unlock() {
    state.stage = Math.max(state.stage, 1); save();
    $('feedback').textContent = 'Primeira etapa concluída. A prática está disponível abaixo.';
  }
  $('notes').value = state.notes;
  $('notes').addEventListener('input', () => { state.notes=$('notes').value; save(); });
  $('check').onclick = () => {
    if ($('answer').value === 'docs') unlock();
    else $('feedback').textContent = 'Consulte primeiro requisitos, licença e instruções. Tente novamente.';
  };
  $('complete-practice').onclick = () => {
    if (!$('performed').checked) { $('status').textContent='Realize a experiência ou sua adaptação antes de concluir.'; return; }
    state.stage=Math.max(state.stage,2); save();
    $('notes').focus();
  };
  $('finish').onclick = () => {
    if ($('notes').value.trim().length < 20) { $('status').textContent='Escreva uma reflexão com pelo menos 20 caracteres.'; $('notes').focus(); return; }
    state.stage=3; save(); $('status').textContent='Percurso concluído. Seu próximo desafio pode começar!';
  };
  $('export').onclick = () => {
    const blob = new Blob([`${document.title}\n\n${state.notes}\n\n${state.stage}/3 etapas`], {type:'text/plain;charset=utf-8'});
    const url=URL.createObjectURL(blob), a=document.createElement('a');
    a.href=url; a.download=`caderno-${course}.txt`; a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  // Suporte a vídeos próprios, configurados opcionalmente no catálogo.
  const video=$('video');
  if (video && video.getAttribute('src')) {
    video.hidden=false;
    let intervals=[]; let previous=0, wall=performance.now();
    const reset=()=>{previous=video.currentTime; wall=performance.now();};
    ['play','pause','seeking','seeked','ratechange'].forEach(e=>video.addEventListener(e,reset));
    document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();reset();});
    video.addEventListener('timeupdate',()=>{
      const now=performance.now(), current=video.currentTime, delta=current-previous;
      if (!document.hidden && !video.paused && !video.seeking && delta>0 && delta<=Math.min(2,(now-wall)/1000*video.playbackRate+.2)) {
        intervals.push([previous,current]);
        intervals.sort((a,b)=>a[0]-b[0]);
        const merged=[];
        for(const segment of intervals){
          const last=merged[merged.length-1];
          if(last && segment[0]<=last[1])last[1]=Math.max(last[1],segment[1]);
          else merged.push([...segment]);
        }
        intervals=merged;
      }
      if(Number.isFinite(video.duration)&&video.duration>0){
        const ratio=intervals.reduce((sum,[a,b])=>sum+b-a,0)/video.duration;
        $('video-status').textContent=`${Math.min(100,Math.floor(ratio*100))}% assistido`;
        if(ratio>=.9)unlock();
      }
      reset();
    });
    video.addEventListener('error',()=>{$('video-status').textContent='Vídeo indisponível. Use a atividade textual abaixo.';});
  }
  render();
})();
