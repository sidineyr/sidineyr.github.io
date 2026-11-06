/* Audio starts only after the visitor chooses to listen. */
(() => {
  'use strict';
  const audio = document.querySelector('#radio-audio');
  const select = document.querySelector('#radio-track');
  const next = document.querySelector('#radio-next');
  const status = document.querySelector('#radio-status');
  const summary = document.querySelector('.radio summary');
  const base = 'https://raw.githubusercontent.com/sidineyr/PythonProjects/master/saida_da_caverna/completa/';
  const files = ['https://raw.githubusercontent.com/sidineyr/PythonProjects/master/abertura_portfolio/portal_da_descoberta.mp3', ...['saida_da_caverna_luminoso.mp3','saida_da_caverna_sereno.mp3','saida_da_caverna_suspenso.mp3'].map(file => base + file)];
  let index = 0, failures = 0, request = 0, listening = false;
  audio.volume = .25;
  audio.src = files[0];
  async function play() {
    listening = true;
    const current = ++request;
    try { await audio.play(); }
    catch (error) {
      if (current !== request || error.name === 'AbortError') return;
      status.textContent = error.name === 'NotAllowedError' ? 'O navegador pede um toque para iniciar o som.' : 'Não foi possível iniciar. Aperte reproduzir para tentar novamente.';
      summary.textContent = '♫ Rádio DJIA · iniciar música';
    }
  }
  function choose(value, resume) {
    index = value; select.value = String(index);
    audio.src = files[index];
    status.textContent = resume ? 'Carregando a faixa…' : 'Faixa selecionada. Aperte reproduzir para ouvir.';
    if (resume) play();
  }
  select.addEventListener('change', () => {failures=0; choose(Number(select.value), !audio.paused);});
  next.addEventListener('click', () => {failures=0;choose((index+1)%files.length,true);});
  audio.addEventListener('ended', () => choose((index+1)%files.length,true));
  audio.addEventListener('playing', () => {listening=true;failures=0;summary.textContent='♫ Rádio DJIA · tocando · controles';status.textContent=`Tocando: ${select.options[index].textContent}`;});
  audio.addEventListener('pause', () => {if(!audio.ended) {status.textContent='Rádio pausada. Continue quando quiser.';summary.textContent='♫ Rádio DJIA · pausada · controles';}});
  audio.addEventListener('error', () => {
    if (!listening) return;
    failures++;
    if (failures < files.length) choose((index+1)%files.length,true);
    else status.textContent='Áudios temporariamente indisponíveis. Tente novamente mais tarde ou abra o repositório.';
  });
  summary.addEventListener('click', () => {
    if (!summary.parentElement.open && audio.paused) {failures=0;play();}
  });
  const welcome = document.querySelector('#welcome-dialog');
  function dismiss() {
    welcome.close();
    document.querySelector('#portfolio-title').focus({preventScroll:true});
  }
  document.querySelector('#welcome-listen').addEventListener('click', () => {play();dismiss();});
  document.querySelector('#welcome-silent').addEventListener('click', dismiss);
  // Escape dismisses the native dialog without starting music.
  // The introduction owns opening the welcome dialog; these buttons own consent.
  if ('mediaSession'  in navigator && typeof MediaMetadata !== 'undefined') {
    audio.addEventListener('playing', () => {
      navigator.mediaSession.metadata = new MediaMetadata({title:select.options[index].textContent,artist:'DJIA',album:'Rádio DJIA · Portfólio'});
    });
    navigator.mediaSession.setActionHandler('nexttrack', () => next.click());
  }
})();
