/* Tradução externa somente por escolha do visitante. */
(() => {
  const target = document.getElementById('google_translate_element');
  if (!target) return;
  const button = document.createElement('button');
  button.type = 'button'; button.textContent = 'Translate with Google';
  button.title = 'Carrega um serviço externo do Google. Consulte a política de privacidade.';
  button.addEventListener('click', () => {
    button.disabled = true; button.textContent = 'Loading translation…';
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;
      target.replaceChildren();
      new window.google.translate.TranslateElement({pageLanguage:'pt', includedLanguages:'pt,en', autoDisplay:false}, target.id);
    };
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onerror = () => { button.textContent = 'Translation unavailable'; };
    document.head.append(script);
  }, {once:true});
  target.append(button);
})();
