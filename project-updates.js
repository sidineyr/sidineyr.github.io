/* Snapshots only: sorting never increments counters or loads project pages. */
(() => {
  'use strict';
  const grid = document.querySelector('.grid');
  const cards = [...grid.querySelectorAll('[data-project]')];
  const order = document.querySelector('#project-order');
  const status = document.querySelector('#order-status');
  const date = new Intl.DateTimeFormat('pt-BR', {dateStyle:'short', timeZone:'America/Sao_Paulo'});
  let metrics = {}, updates = {};
  const count = key => {
    const metric = metrics[key];
    return metric && Number.isSafeInteger(metric.value) && metric.value >= 0 ? metric.value : null;
  };
  const group = key => count(key) === null ? 2 : metrics[key].label === 'testes concluídos' ? 1 : 0;
  const stamp = key => Date.parse(updates[key]?.items?.[0]?.date) || 0;
  const name = card => card.querySelector('h2').textContent;
  function sort() {
    const sorted = [...cards].sort((a,b) => {
      const x = a.dataset.project, y = b.dataset.project;
      let diff = 0;
      if (order.value === 'access') diff = group(x)-group(y) || (count(y) ?? -1)-(count(x) ?? -1);
      if (order.value === 'updated') diff = stamp(y)-stamp(x);
      return diff || name(a).localeCompare(name(b),'pt-BR');
    });
    sorted.forEach(card => grid.append(card));
    status.textContent = order.value === 'access' ? 'Acessos e leituras em ordem decrescente · outras métricas e contagens indisponíveis ao final.' : order.value === 'updated' ? 'Primeiro os projetos com alterações mais recentes no código.' : 'Projetos em ordem alfabética.';
  }
  function safeLink(value) {
    try { const url = new URL(value); return url.protocol === 'https:' && url.hostname === 'github.com' ? url.href : null; } catch { return null; }
  }
  function render() {
    cards.forEach(card => {
      const item = updates[card.dataset.project];
      const box = document.createElement('div');
      box.className = 'project-update';
      const heading = document.createElement('strong');
      heading.textContent = 'Atualizações do projeto';
      box.append(heading);
      const commits = (item?.items || []).filter(commit => safeLink(commit.url) && Number.isFinite(Date.parse(commit.date)));
      if (commits.length) {
        const time = document.createElement('time');
        time.dateTime = commits[0].date;
        time.textContent = `Última alteração: ${date.format(new Date(commits[0].date))}${item.status === 'stale' ? ' · consulta pendente' : ''}`;
        box.append(time);
        const details = document.createElement('details');
        const summary = document.createElement('summary');
        summary.textContent = 'Ver alterações recentes';
        const list = document.createElement('ul');
        commits.forEach(commit => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = safeLink(commit.url); a.textContent = commit.title;
          li.append(a, ` · ${date.format(new Date(commit.date))}`); list.append(li);
        });
        details.append(summary,list);box.append(details);
      } else {
        const p = document.createElement('p'); p.textContent = 'Histórico temporariamente indisponível.'; box.append(p);
      }
      if (safeLink(item?.source)) {
        const a = document.createElement('a'); a.href = safeLink(item.source);a.textContent = 'Histórico completo no GitHub ↗';box.append(a);
      }
      card.querySelector('.card-bottom').append(box);
    });
  }
  document.addEventListener('projectmetrics',event => {metrics=event.detail;sort();});
  order.addEventListener('change',sort);
  fetch('/project-updates.json',{cache:'no-store',credentials:'omit'})
    .then(response=>{if(!response.ok) throw new Error();return response.json();})
    .then(data=>{updates=data;render();sort();})
    .catch(()=>{render();sort();});
})();

