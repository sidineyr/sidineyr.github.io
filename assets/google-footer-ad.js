/* Casa de Cursos — Rodapé. Bloco manual criado no Google AdSense. */
(() => {
  'use strict';
  const id = 'google-footer-ad';
  const privateRoute = () => /(?:^|[\/#?&=_-])(conta|account|login|caderno|notebook|dashboard|admin|resultados|respostas|questionario)(?:$|[\/#?&=_-])/i.test(location.pathname + location.hash);
  function mount() {
    if (document.getElementById(id) || privateRoute()) return;
    const footers = document.querySelectorAll('footer');
    let footer = footers[footers.length - 1];
    if (!footer) {
      footer = document.createElement('footer');
      footer.setAttribute('aria-label', 'Rodapé');
      document.body.append(footer);
    }
    const region = document.createElement('aside');
    region.id = id;
    region.setAttribute('aria-label', 'Publicidade');
    region.style.cssText = 'box-sizing:border-box;clear:both;width:100%;flex-basis:100%;max-width:760px;margin:24px auto 0;padding:12px 16px;font:11px/1.5 system-ui,sans-serif;text-align:center;border-top:1px solid #8883;';
    const label = document.createElement('small');
    label.textContent = 'Publicidade';
    const ad = document.createElement('ins');
    ad.className = 'adsbygoogle';
    ad.style.cssText = 'display:block;width:100%;height:90px;margin:8px auto 0;';
    ad.dataset.adClient = 'ca-pub-4924241177850142';
    ad.dataset.adSlot = '3281870424';
    region.append(label, ad);
    footer.append(region);
    const observer = new MutationObserver(() => {
      if (ad.dataset.adStatus === 'unfilled') { region.remove(); observer.disconnect(); }
    });
    observer.observe(ad, {attributes:true,attributeFilter:['data-ad-status']});
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({});
    if (!document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) {
      const sdk = document.createElement('script');
      sdk.async = true;
      sdk.crossOrigin = 'anonymous';
      sdk.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4924241177850142';
      sdk.onerror = () => { region.remove(); observer.disconnect(); };
      document.head.append(sdk);
    }
    const removeFromPrivateRoute = () => { if(privateRoute()) { region.remove(); observer.disconnect(); } };
    window.addEventListener('hashchange', removeFromPrivateRoute);
    window.addEventListener('popstate', removeFromPrivateRoute);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, {once:true});
  else mount();
})();

