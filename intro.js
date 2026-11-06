/* Optional, skippable introduction. No image or timer is required to enter. */
(() => {
  'use strict';
  const dialog = document.querySelector('#welcome-dialog');
  const title = document.querySelector('#welcome-title');
  const description = document.querySelector('#welcome-description');
  const stepLabel = document.querySelector('#intro-step');
  const next = document.querySelector('#intro-next');
  const back = document.querySelector('#intro-back');
  const pause = document.querySelector('#intro-pause');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const steps = [
    ['Acolher','Olá! Que bom encontrar você por aqui.','Traga sua curiosidade. Há novos caminhos para descobrir.'],
    ['Explorar','Este é um espaço para explorar, clicar, experimentar e conhecer novas ideias.','Educação, ciência, arte e tecnologia: escolha uma pergunta e siga por ela.'],
    ['Participar','Cada projeto é um convite para aprender.','Suas perguntas e sugestões ajudam a construir os próximos caminhos.'],
    ['Aprender juntos','Traga sua curiosidade. Vamos descobrir e aprender juntos?','Eu ajudo nos primeiros passos. Você escolhe o caminho.'],
    ['Entrar','Quer ouvir uma música do projeto DJIA enquanto explora?','Escolha como entrar. As duas opções levam ao mesmo portfólio.']
  ];
  const cues = [
    'Clique em Continuar para descobrir o próximo passo.',
    'Reconheceu uma área que desperta sua curiosidade? Continue comigo.',
    'Estes são alguns dos projetos. Depois da entrada, clique em Explorar no card que escolher.',
    'Mais tarde, procure “Precisa de uma pista?” no rodapé. Agora, clique em Continuar.',
    'Escolha um dos dois botões: com música ou sem música. Você decide!'
  ];
  let step = 0, timer, paused = reduced.matches;
  function stop(){clearTimeout(timer);}
  function schedule(){stop();if(!paused && !reduced.matches && step<4 && dialog.open) timer=setTimeout(()=>show(step+1),3750);}
  function show(value){
    const movingFocus = document.activeElement===next || document.activeElement===pause;
    step=value; const data=steps[step];
    dialog.dataset.tutorStep=String(step);
    document.querySelector('#tutor-cue').textContent=cues[step];
    next.classList.toggle('tutor-target',step<4);
    document.querySelector('#intro-audio .welcome-actions').classList.toggle('tutor-choice-target',step===4);
    title.textContent=data[1];description.textContent=data[2];stepLabel.textContent=`0${step+1} / 05 · ${data[0]}`;
    document.querySelector('#intro-progress').textContent=steps.map((_,i)=>i===step?'●':'○').join(' ');
    document.querySelector('#intro-previews').hidden=step!==2;
    document.querySelector('#intro-audio').hidden=step!==4;
    next.hidden=step===4;back.disabled=step===0;
    pause.hidden=step===4;pause.textContent=paused?'Retomar apresentação':'Pausar apresentação';
    dialog.classList.toggle('paused',paused || reduced.matches);
    // If automatic advance hides a focused button, keep keyboard focus inside the dialog.
    if(step===4 && movingFocus) document.querySelector('#welcome-silent').focus();
    schedule();
  }
  next.addEventListener('click',()=>show(Math.min(4,step+1)));
  back.addEventListener('click',()=>show(Math.max(0,step-1)));
  pause.addEventListener('click',()=>{paused=!paused;show(step);});
  document.querySelector('#intro-skip').addEventListener('click',()=>document.querySelector('#welcome-silent').click());
  dialog.addEventListener('close',stop);
  reduced.addEventListener('change',()=>{if(reduced.matches)paused=true;show(step);});
  dialog.querySelector('img').addEventListener('error',event=>{event.target.hidden=true;});
  if(typeof dialog.showModal==='function'){dialog.showModal();show(0);}
  const help=document.querySelector('#tutor-help');
  const helpButton=document.querySelector('#tutor-open');
  helpButton.addEventListener('click',()=>help.showModal());
  document.querySelector('#tutor-close').addEventListener('click',()=>help.close());
  let hint, highlighted;
  const hints = {
    '#projects':'Escolha um projeto e clique em Explorar, Começar ou no link disponível no card.',
    '#project-order':'Use este menu para ordenar por acessos, atualizações recentes ou nome.',
    '#portfolio-radio':'Abra “Rádio DJIA” para reproduzir, pausar, escolher uma faixa e ajustar o volume.'
  };
  function clearHint(){hint?.remove();highlighted?.classList.remove('tutor-guided');}
  help.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
    event.preventDefault();help.close();clearHint();
    const selector=link.getAttribute('href');const target=document.querySelector(selector);
    if(!target)return;
    highlighted=selector==='#project-order'?target.closest('.project-toolbar'):target;
    hint=document.createElement('div');hint.className='tutor-inline-hint';hint.setAttribute('role','status');
    const avatar=document.createElement('img');avatar.src=dialog.querySelector('img').src;avatar.alt='';avatar.width=42;avatar.height=42;
    const text=document.createElement('p');text.textContent=hints[selector];
    const close=document.createElement('button');close.type='button';close.className='text-button';close.textContent='Fechar dica';close.addEventListener('click',clearHint);
    hint.append(avatar,text,close);highlighted.before(hint);highlighted.classList.add('tutor-guided');
    hint.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'center'});
    // Keep the hint until dismissed, so visitors can read at their own pace.
  }));
})();
