/* Public, indicative interest totals. No page-view increments. */
(() => {
  'use strict';
  const base = 'https://counterapi.com/api/sidineyr.github.io/portfolio-choice-v1/';
  const prefix = 'portfolio-choice-v1:';
  const chosen = new Set();
  const formatter = new Intl.NumberFormat('pt-BR');
  const wasChosen = id => {
    try { return chosen.has(id) || localStorage.getItem(prefix + id) === '1'; }
    catch { return chosen.has(id); }
  };
  const remember = id => {
    chosen.add(id);
    try { localStorage.setItem(prefix + id, '1'); } catch { /* Session still works. */ }
  };
  async function request(id, readOnly) {
    const response = await fetch(base + encodeURIComponent(id) + (readOnly ? '?readOnly=true' : ''), {
      credentials: 'omit', referrerPolicy: 'no-referrer', cache: 'no-store',
      signal: AbortSignal.timeout(10000)
    });
    if (!response.ok) throw new Error('Counter unavailable');
    const data = await response.json();
    if (!Number.isSafeInteger(data.value) || data.value < 0) throw new Error('Invalid total');
    return data.value;
  }
  function renderTotal(node, count) {
    node.textContent = formatter.format(count) + (count === 1 ? ' escolha' : ' escolhas');
  }
  document.querySelectorAll('[data-project]').forEach(card => {
    const id = card.dataset.project;
    const button = card.querySelector('.vote');
    const total = card.querySelector('.vote-total');
    let loading = true;
    const markChosen = () => {
      button.disabled = true;
      button.textContent = 'Interesse registrado';
      button.setAttribute('aria-pressed', 'true');
    };
    button.setAttribute('aria-pressed', 'false');
    if (wasChosen(id)) markChosen();
    // Initial reads never record a choice. Navigation is independent of voting.
    request(id, true).then(count => renderTotal(total, count)).catch(() => {
      total.textContent = 'Contagem indisponível';
    }).finally(() => {
      loading = false;
      button.disabled = wasChosen(id);
      if (wasChosen(id)) markChosen();
    });
    button.addEventListener('click', async () => {
      if (loading || button.disabled || wasChosen(id)) return;
      button.disabled = true;
      button.textContent = 'Registrando…';
      try {
        const count = await request(id, false);
        remember(id);
        renderTotal(total, count);
        markChosen();
      } catch {
        // A timeout may occur after the server records the vote. Avoid automatic retries.
        total.textContent = 'Sem confirmação. Recarregue para consultar o total.';
        button.textContent = 'Envio sem confirmação';
      }
    });
    window.addEventListener('storage', event => {
      if (event.key === prefix + id && event.newValue === '1') markChosen();
    });
  });
})();
