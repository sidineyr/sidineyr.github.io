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
  let step = 0, timer, paused = reduced.matches;
  function stop(){clearTimeout(timer);}
  function schedule(){stop();if(!paused && !reduced.matches && step<4 && dialog.open) timer=setTimeout(()=>show(step+1),3750);}
  function show(value){
    const movingFocus = document.activeElement===next || document.activeElement===pause;
    step=value; const data=steps[step];
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
  help.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',()=>help.close()));
})();
