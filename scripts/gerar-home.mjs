import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestoPath = path.join(raiz, 'data/projetos.json');
const homePath = path.join(raiz, 'index.html');

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function isValidProjectUrl(value) {
  if (typeof value !== 'string' || value.length === 0) return false;
  if (value.startsWith('/') && !value.startsWith('//')) return true;
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

function validateProjects(projects) {
  if (!Array.isArray(projects) || projects.length === 0) {
    throw new Error('data/projetos.json deve conter uma lista não vazia.');
  }
  const ids = new Set();
  for (const project of projects) {
    for (const field of ['id', 'nome', 'area', 'descricao_pt', 'publico']) {
      if (typeof project[field] !== 'string' || !project[field].trim()) {
        throw new Error(`Projeto sem campo obrigatório válido: ${field}`);
      }
    }
    if (ids.has(project.id)) throw new Error(`ID duplicado no manifesto: ${project.id}`);
    ids.add(project.id);
    if (!isValidProjectUrl(project.url)) throw new Error(`URL inválida em ${project.id}: ${project.url}`);
    if (!['ativo', 'novo', 'em-desenvolvimento'].includes(project.status)) {
      throw new Error(`Status inválido em ${project.id}: ${project.status}`);
    }
  }
  return projects;
}

function renderExtraLinks(links = []) {
  return links.map(({ url, rotulo }) =>
    `<a class="project-link" href="${escapeHtml(url)}">${escapeHtml(rotulo)} <span aria-hidden="true">↗</span></a>`
  ).join('<br />');
}

export function renderProjectCards(projects) {
  validateProjects(projects);
  return projects.map((project) => {
    const statusText = project.status === 'ativo'
      ? project.publico
      : `${project.publico}`;
    const extraNote = project.nota_pt
      ? `<p>${escapeHtml(project.nota_pt)}</p>`
      : '';
    const extraLinks = renderExtraLinks(project.links_extra);
    const cta = project.cta_pt || (project.status === 'em-desenvolvimento' ? 'Ver projeto e instruções' : project.id === 'python-swirl' ? 'Começar o curso' : project.id === 'filosofia' ? 'Começar a ler' : 'Explorar');

    return `        <article class="card" data-project="${escapeHtml(project.id)}" aria-labelledby="title-${escapeHtml(project.id)}">\n` +
      `          <div><span class="tag">${escapeHtml(project.area)}</span><h2 id="title-${escapeHtml(project.id)}">${escapeHtml(project.nome)}</h2><p>${escapeHtml(project.descricao_pt)}</p></div>\n` +
      `          <div class="card-bottom"><span class="status">${escapeHtml(statusText)}</span>\n` +
      `            <a class="project-link" href="${escapeHtml(project.url)}">${escapeHtml(cta)} <span aria-hidden="true">↗</span></a>${extraLinks ? `\n            ${extraLinks}` : ''}${extraNote ? `\n            ${extraNote}` : ''}\n` +
      `            <div class="access-metric" aria-live="polite">Consultando contador do projeto…</div><div class="choice"><button type="button" class="vote" disabled aria-describedby="counter-note" aria-label="Tenho interesse em ${escapeHtml(project.nome)}">Tenho interesse</button><span class="vote-total" aria-live="polite">Carregando…</span></div>\n` +
      `          </div>\n        </article>`;
  }).join('\n\n');
}

export async function generateHome({ write = false } = {}) {
  const projects = validateProjects(JSON.parse(await readFile(manifestoPath, 'utf8')));
  const html = await readFile(homePath, 'utf8');
  const start = '<section class="grid" id="projects" aria-label="Projetos">';
  const startIndex = html.indexOf(start);
  if (startIndex < 0 || html.indexOf(start, startIndex + start.length) >= 0) {
    throw new Error('Esperava encontrar exatamente uma seção #projects em index.html.');
  }
  const contentStart = startIndex + start.length;
  const closeIndex = html.indexOf('</section>', contentStart);
  if (closeIndex < 0) throw new Error('Não encontrei o fechamento da seção #projects.');
  const updated = `${html.slice(0, contentStart)}\n${renderProjectCards(projects)}\n      ${html.slice(closeIndex)}`;
  if (write) await writeFile(homePath, updated, 'utf8');
  return updated;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const write = process.argv.includes('--write');
  try {
    const html = await generateHome({ write });
    if (!write) process.stdout.write(html);
    else console.log('index.html atualizado com os cards de data/projetos.json.');
  } catch (error) {
    console.error(`Falha ao gerar a home: ${error.message}`);
    process.exitCode = 1;
  }
}
