import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const read = name => readFileSync(new URL('../' + name, import.meta.url), 'utf8');
const element = () => ({textContent:'',value:'',disabled:false,listeners:{},addEventListener(event,fn){this.listeners[event]=fn;}});

test('anúncios e serviços opcionais não contatam terceiros na chegada', () => {
  vm.runInNewContext(read('assets/google-footer-ad.js'), {});
  const consent = element(), translation = element();
  const context = {document:{getElementById:()=>translation,createElement:()=>element(),head:{append(){throw Error('Carregamento automático externo');}}},window:{}};
  translation.append = () => {};
  vm.runInNewContext(read('language-toggle.js'), context);
  vm.runInNewContext(read('project-votes.js'), {document:{querySelector:()=>consent},Intl,Set,localStorage:{getItem(){return null;}}});
  assert.equal(typeof consent.listeners.click,'function');
});

test('caderno recupera versão anterior, salva, exporta e apaga sem rede', () => {
  const nodes = Object.fromEntries(['notes','status','export','clear-notes'].map(id=>[id,element()]));
  let stored = JSON.stringify({stage:3,notes:'Anotação anterior'}), downloaded, revoked;
  const context = {
    document:{body:{dataset:{course:'bb'}},title:'Oficina',getElementById:id=>nodes[id],createElement:()=>({click(){downloaded=this.download;}})},
    localStorage:{getItem(){return stored;},setItem(key,value){assert.equal(key,'casa:1:bb');stored=value;},removeItem(){stored=null;}},
    Blob,URL:{createObjectURL(){return 'blob:local';},revokeObjectURL(url){revoked=url;}},setTimeout(fn){fn();}
  };
  vm.runInNewContext(read('casa-source/course.js'),context);
  assert.equal(nodes.notes.value,'Anotação anterior');
  nodes.notes.value='Nova hipótese e observação';nodes.notes.listeners.input();
  assert.equal(JSON.parse(stored).notes,'Nova hipótese e observação');
  assert.equal(JSON.parse(stored).stage,3);
  nodes.export.listeners.click();assert.equal(downloaded,'caderno-bb.txt');assert.equal(revoked,'blob:local');
  nodes['clear-notes'].listeners.click();assert.equal(stored,null);assert.equal(nodes.notes.value,'');
});

test('falha do armazenamento é visível e permite continuar escrevendo', () => {
  const nodes = Object.fromEntries(['notes','status','export','clear-notes'].map(id=>[id,element()]));
  const context = {document:{body:{dataset:{course:'bb'}},getElementById:id=>nodes[id]},localStorage:{getItem(){throw Error('bloqueado');},setItem(){throw Error('bloqueado');}}};
  vm.runInNewContext(read('casa-source/course.js'),context);
  nodes.notes.value='Texto não salvo';nodes.notes.listeners.input();
  assert.match(nodes.status.textContent,/Não foi possível salvar/);
  assert.equal(nodes.notes.value,'Texto não salvo');
});
