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
    ['Explorar','Venha conhecer ideias, experimentar e descobrir novos caminhos.','Educação, ciência, arte e tecnologia: escolha uma pergunta e siga por ela.'],
    ['Participar','O que você gostaria de aprender ou sugerir?','Suas perguntas e sugestões ajudam a construir os próximos caminhos.'],
    ['Aprender juntos','Traga sua curiosidade. Vamos aprender juntos!','Eu ajudo nos primeiros passos. Você escolhe o caminho.'],
    ['Entrar','Com música ou sem música? Escolha seu caminho.','As músicas são do projeto DJIA. As duas opções levam ao mesmo portfólio.']
  ];
  const cues = [
    'Clique em Continuar para descobrir o próximo passo.',
    'Reconheceu uma área que desperta sua curiosidade? Continue comigo.',
    'Estes são alguns dos projetos. Depois da entrada, clique em Explorar no card que escolher.',
    'Mais tarde, procure “Precisa de uma pista?” no rodapé. Agora, clique em Continuar.',
    'Escolha um dos dois botões: com música ou sem música. Você decide!'
  ];
  const actor=dialog.querySelector('.tutor-actor');
  const fallback=dialog.querySelector('.tutor-portrait img');
  const connection=dialog.querySelector('.tutor-connection');
  const connectionPath=connection.querySelector('path');
  const actions=['escreve, levanta o olhar, sorri e acena','apresenta os projetos e aponta a caneta','escreve e oferece a caneta ao visitante','abre os braços e manda um beijo','indica as duas escolhas e aguarda sorrindo'];
  // Thirty-two illustrated poses per action, with anticipation, in-betweens and settling.
  const keyTimes=[
    [0,420,570,710,860,1030,1240,1450,1670,1870,2040,2240,2450,2680,2960,3280],
    [0,350,520,690,880,1080,1270,1460,1780,1950,2140,2330,2530,2760,3020,3300],
    [0,150,300,460,620,790,950,1160,1250,1370,1680,1890,2140,2410,2720,3080],
    [0,320,600,880,1180,1460,1720,1970,2230,2410,2620,2830,3050,3310,3610,3950],
    [0,260,520,780,1040,1310,1580,2560,2810,3060,3310,3580,4550,4840,5180,5550]
  ];
  const timings=keyTimes.map(times=>times.flatMap((time,i)=>[time,i<15?Math.round((time+times[i+1])/2):time+160]));
  let step=0, paused=reduced.matches, elapsed=0, last=0, raf, frame=0, ready=false;
  const sheets=Array.from({length:6},(_,i)=>({url:i===5?'/assets/tutor/natural-idle.webp':`/assets/tutor/scene-32-${i+1}.webp`,loaded:false,image:null}));
  let idleAt=11000;
  const layers=[document.createElement('span'),document.createElement('span')];
  layers.forEach(layer=>{layer.className='tutor-cel';actor.append(layer);});
  let active=0, lastCell='';
  function loadScene(index){
    if(index<0 || index>=sheets.length || sheets[index].image)return;
    const record=sheets[index], image=new Image();record.image=image;
    image.onload=()=>{record.loaded=true;if(step===index){ready=true;actor.hidden=false;fallback.hidden=true;renderFrame();}};
    image.onerror=()=>{if(step===index){ready=false;actor.hidden=true;fallback.hidden=false;}};
    image.src=record.url;
  }
  function setCel(index,instant=false,sheetIndex=step){
    const sheet=sheets[sheetIndex];ready=sheet.loaded;
    if(!ready){actor.hidden=true;fallback.hidden=false;loadScene(sheetIndex);return;}
    actor.hidden=false;fallback.hidden=true;
    const key=`${sheetIndex}:${index}`;if(lastCell===key)return;
    const incoming=layers[1-active], outgoing=layers[active];
    incoming.style.backgroundImage=`url('${sheet.url}')`;
    incoming.style.backgroundSize=sheetIndex===5?'400% 400%':'400% 800%';
    incoming.style.backgroundPosition=`${index%4*100/3}% ${Math.floor(index/4)*100/(sheetIndex===5?3:7)}%`;
    incoming.style.transition='none';incoming.style.opacity='1';incoming.style.zIndex='1';
    outgoing.style.zIndex='2';
    outgoing.style.transition=instant || reduced.matches?'none':'opacity 65ms ease-out';outgoing.style.opacity='0';
    active=1-active;lastCell=key;
  }
  function drawConnection(){
    const pointing=(step===1 && frame>=26) || (step===4 && frame>=7 && frame<=13);
    connection.toggleAttribute('hidden',!pointing || !ready);
    if(!pointing || !ready)return;
    const target=step===4?document.querySelector(frame<=11?'#welcome-listen':'#welcome-silent'):next;
    const box=dialog.getBoundingClientRect(), a=actor.getBoundingClientRect(), b=target.getBoundingClientRect();
    const startX=a.left-box.left+a.width*.97, startY=a.top-box.top+a.height*(step===4?(frame<=11?.45:.65):.58);
    const mobile=window.innerWidth<=650;
    const endX=mobile?b.left-box.left+b.width*.5:b.left-box.left-8, endY=mobile?b.top-box.top-7:b.top-box.top+b.height*.5;
    connection.setAttribute('viewBox',`0 0 ${dialog.clientWidth} ${dialog.clientHeight}`);
    const lane=mobile?dialog.clientWidth-12:startX+12;
    connectionPath.setAttribute('d',`M ${startX} ${startY} L ${lane} ${startY} L ${lane} ${endY} L ${endX} ${endY}`);
  }
  function renderFrame(){
    frame=reduced.matches?31:timings[step].reduce((value,time,index)=>elapsed>=time?index:value,0);
    if(step===4 && !reduced.matches && elapsed>=idleAt && sheets[5].loaded){
      const t=elapsed-idleAt;
      const idleTimes=[0,120,240,360,480,600,670,725,780,840,960,1080,1200,1320,1440,1560];
      if(t<1760){setCel(idleTimes.reduce((value,time,index)=>t>=time?index:value,0),false,5);frame=31;}
      else {idleAt=elapsed+3600+Math.random()*2400;setCel(31);}
    } else setCel(frame,reduced.matches || elapsed===0);
    drawConnection();
  }
  function stop(){cancelAnimationFrame(raf);last=0;}
  function tick(now){
    if(!dialog.open || paused || reduced.matches){last=0;return;}
    if(last)elapsed=elapsed+now-last;last=now;
    renderFrame();
    if(elapsed>=7000 && step<4){show(step+1);return;}
    if(elapsed<7000 || step===4)raf=requestAnimationFrame(tick);
  }
  function schedule(){stop();renderFrame();if(!paused && !reduced.matches && dialog.open)raf=requestAnimationFrame(tick);}
  window.addEventListener('resize',drawConnection);
  dialog.addEventListener('scroll',drawConnection);
  document.addEventListener('visibilitychange',()=>{last=0;});
  function show(value){
    const movingFocus = document.activeElement===next || document.activeElement===pause;
    step=value;elapsed=0;idleAt=11000;lastCell='';loadScene(step);loadScene(step+1); const data=steps[step];
    actor.setAttribute('aria-label',`Tutor do CallGuide: ${actions[step]}.`);
    dialog.dataset.tutorStep=String(step);
    document.querySelector('#tutor-cue').textContent=cues[step];
    next.classList.toggle('tutor-target',step<4);
    document.querySelector('#intro-audio .welcome-actions').classList.toggle('tutor-choice-target',step===4);
    title.textContent=data[1];description.textContent=data[2];stepLabel.textContent=`0${step+1} / 05 · ${data[0]}`;
    document.querySelector('#intro-progress').textContent=steps.map((_,i)=>i===step?'●':'○').join(' ');
    document.querySelector('#intro-previews').hidden=step!==2;
    document.querySelector('#intro-audio').hidden=step!==4;
    next.hidden=step===4;back.disabled=step===0;
    pause.hidden=false;pause.textContent=paused?'Retomar apresentação':'Pausar apresentação';
    dialog.classList.toggle('paused',paused || reduced.matches);
    // If automatic advance hides a focused button, keep keyboard focus inside the dialog.
    if(step===4 && movingFocus) document.querySelector('#welcome-silent').focus();
    schedule();
  }
  next.addEventListener('click',()=>show(Math.min(4,step+1)));
  back.addEventListener('click',()=>show(Math.max(0,step-1)));
  pause.addEventListener('click',()=>{paused=!paused;pause.textContent=paused?'Retomar apresentação':'Pausar apresentação';dialog.classList.toggle('paused',paused);schedule();});
  document.querySelector('#intro-skip').addEventListener('click',()=>document.querySelector('#welcome-silent').click());
  dialog.addEventListener('close',stop);
  reduced.addEventListener('change',()=>{if(reduced.matches)paused=true;dialog.classList.toggle('paused',paused || reduced.matches);schedule();});
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
