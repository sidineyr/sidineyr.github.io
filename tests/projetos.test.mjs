import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { isValidProjectUrl, renderProjectCards } from '../scripts/gerar-home.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projects = JSON.parse(await readFile(path.join(root, 'data/projetos.json'), 'utf8'));
const required = [
  'id', 'nome', 'area', 'descricao_pt', 'descricao_en', 'publico', 'url', 'repo', 'status',
  'licenca_codigo', 'licenca_conteudo', 'atualizado_em', 'idiomas', 'acessibilidade_ok',
  'usa_terceiros', 'coleta_dados'
];

test('manifesto contém 14 projetos e campos definidos', () => {
  assert.equal(projects.length, 14);
  for (const project of projects) {
    for (const field of required) assert.ok(Object.hasOwn(project, field), `${project.id}: falta ${field}`);
  }
});

test('IDs são únicos e preservam os identificadores já usados pelos scripts', () => {
  const ids = projects.map(({ id }) => id);
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual(ids, [
    'art', 'einstein', 'horizonte', 'quality-view', 'python-swirl', 'chemical', 'filosofia',
    'biosfera', 'atlas', 'bb', 'contraprova', 'polliniza', 'universidade', 'callguid'
  ]);
});

test('cada projeto possui uma URL HTTPS ou caminho local válido', () => {
  for (const project of projects) assert.ok(isValidProjectUrl(project.url), `${project.id}: ${project.url}`);
  assert.equal(isValidProjectUrl('javascript:alert(1)'), false);
  assert.equal(isValidProjectUrl('//evil.example/path'), false);
});

test('renderização mantém os ganchos usados pelos scripts do portfólio e escapa HTML', () => {
  const html = renderProjectCards(projects);
  assert.equal((html.match(/data-project=/g) || []).length, 14);
  assert.equal((html.match(/class="vote-total"/g) || []).length, 14);
  assert.equal((html.match(/class="access-metric"/g) || []).length, 14);
  assert.match(renderProjectCards([{ ...projects[0], nome: '<script>' }]), /&lt;script&gt;/);
});

test('cada card tem URL de navegação e texto essencial', () => {
  const html = renderProjectCards(projects);
  for (const project of projects) {
    assert.ok(html.includes(`data-project="${project.id}"`));
    assert.ok(html.includes(`href="${project.url}"`));
    assert.ok(html.includes(project.descricao_pt));
  }
});
