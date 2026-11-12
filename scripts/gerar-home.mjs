export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function normalizeUrl(value) {
  if (!value) {
    return '#';
  }
  return value.startsWith('http') || value.startsWith('/') || value.startsWith('#') ? value : `https://${value}`;
}

export function renderProjectCards(projetos) {
  if (!Array.isArray(projetos) || projetos.length === 0) {
    return '<p class="empty-projects">Nenhum projeto disponível no momento.</p>';
  }

  return projetos
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
    .map((projeto) => {
      const statusText = projeto.status === 'ativo'
        ? 'Ativo'
        : projeto.status === 'novo'
          ? 'Novo no portfólio'
          : 'Em desenvolvimento';

      return `
        <article class="card" data-project="${escapeHtml(projeto.id)}" aria-labelledby="title-${escapeHtml(projeto.id)}">
          <div>
            <span class="tag">${escapeHtml(projeto.area)}</span>
            <h2 id="title-${escapeHtml(projeto.id)}">${escapeHtml(projeto.nome)}</h2>
            <p>${escapeHtml(projeto.descricao_pt)}</p>
          </div>
          <div class="card-bottom">
            <span class="status">${escapeHtml(projeto.publico)} · ${escapeHtml(statusText)}</span>
            <a class="project-link" href="${escapeHtml(normalizeUrl(projeto.url))}">Explorar <span aria-hidden="true">↗</span></a>
            <div class="access-metric" aria-live="polite">Consultando contador do projeto…</div>
            <div class="choice">
              <button type="button" class="vote" aria-label="Tenho interesse em ${escapeHtml(projeto.nome)}">Tenho interesse</button>
              <span class="vote-total" aria-label="Contagem de interesse para ${escapeHtml(projeto.nome)}">0</span>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}
