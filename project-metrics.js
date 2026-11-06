/* Reads a snapshot of the original counters. Viewing this portfolio never increments them. */
(() => {
  'use strict';
  const number = new Intl.NumberFormat('pt-BR');
  const date = new Intl.DateTimeFormat('pt-BR', {dateStyle:'short',timeStyle:'short',timeZone:'America/Sao_Paulo'});
  fetch('/project-metrics.json', {cache:'no-store',credentials:'omit'})
    .then(response => {if (!response.ok) throw new Error(); return response.json();})
    .then(metrics => {
      document.dispatchEvent(new CustomEvent('projectmetrics', {detail:metrics}));
      document.querySelectorAll('[data-project]').forEach(card => {
        const metric = metrics[card.dataset.project];
        const node = card.querySelector('.access-metric');
        if (!metric || !node) return;
        const value = metric.value;
        const valid = Number.isSafeInteger(value) && value >= 0;
        const label = document.createElement('strong');
        label.textContent = valid ? `${number.format(value)} ${metric.label}` : 'Contagem indisponÃ­vel';
        const source = document.createElement('a');
        const url = new URL(metric.source);
        if (url.protocol !== 'https:') return;
        source.href = url.href;
        source.textContent = 'Ver contador original â†—';
        const detail = document.createElement('small');
        detail.textContent = valid && metric.checkedAt ? `Consulta: ${date.format(new Date(metric.checkedAt))}${metric.status === 'stale' ? ' Â· atualizaÃ§Ã£o pendente' : ''}` : (metric.since ? 'Novo contador Â· instalado em 16/10/2026' : 'NÃ£o foi possÃ­vel consultar a fonte');
        node.replaceChildren(label,source,detail);
      });
    }).catch(() => {
      document.querySelectorAll('.access-metric').forEach(node => {
        node.textContent = 'Contadores temporariamente indisponÃ­veis';
      });
    });
})();
