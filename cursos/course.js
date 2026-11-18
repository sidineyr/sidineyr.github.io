/* Caderno opcional: sem bloqueios de conteúdo nem envio de respostas. */
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
      $('results').textContent = count === 1 ? '1 oficina encontrada' : count + ' oficinas encontradas';
    });
  }
  const id = document.body.dataset.course || document.body.dataset.notebook;
  if (!id || !$('notes')) return;
  const key = 'casa:1:' + id;
  let state = {stage:0, notes:''};
  try {
    const previous = JSON.parse(localStorage.getItem(key));
    if (previous && typeof previous.notes === 'string') state = {...previous, notes:previous.notes.slice(0, 20000)};
    $('notes').value = state.notes;
  } catch { $('status').textContent = 'Não foi possível recuperar as notas locais. Você pode escrever e exportar uma nova cópia.'; }
  $('notes').addEventListener('input', () => {
    state.notes = $('notes').value;
    try { localStorage.setItem(key, JSON.stringify(state)); $('status').textContent = 'Notas salvas neste navegador.'; }
    catch { $('status').textContent = 'Não foi possível salvar. Exporte as notas antes de sair.'; }
  });
  $('clear-notes').addEventListener('click', () => {
    try { localStorage.removeItem(key); }
    catch { $('status').textContent = 'Não foi possível apagar os dados locais. Use as configurações de armazenamento do navegador.'; return; }
    state = {stage:0, notes:''}; $('notes').value = ''; $('status').textContent = 'Notas desta oficina apagadas.';
  });
  $('export').addEventListener('click', () => {
    const blob = new Blob([document.title + '\n\n' + $('notes').value], {type:'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = 'caderno-' + id + '.txt'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
})();
