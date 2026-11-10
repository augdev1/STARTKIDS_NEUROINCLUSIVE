import { describe, it, after } from 'node:test';
import assert from 'node:assert/strict';
import { harness } from '../harness/test-harness.js';

describe('API Harness: Rotas de Entrada, SPA e Entrega de Arquivos Estáticos', () => {
  after(async () => {
    await harness.teardown();
  });

  it('GET / deve servir a página login.html (status 200, HTML)', async () => {
    const res = await harness.request.get('/');
    assert.equal(res.status, 200);
    assert.match(res.headers['content-type'], /text\/html/);
    assert.match(res.text, /id=["']loginUsername["']/i);
  });

  it('GET /login deve servir a página login.html', async () => {
    const res = await harness.request.get('/login');
    assert.equal(res.status, 200);
    assert.match(res.headers['content-type'], /text\/html/);
    assert.match(res.text, /id=["']loginUsername["']/i);
  });

  it('GET /game deve servir index.html com o ambiente do jogo', async () => {
    const res = await harness.request.get('/game');
    assert.equal(res.status, 200);
    assert.match(res.headers['content-type'], /text\/html/);
    assert.match(res.text, /educational-games-grid/i);
  });

  it('GET /manifest.json deve servir o manifesto PWA válido', async () => {
    const res = await harness.request.get('/manifest.json');
    assert.equal(res.status, 200);
    assert.ok(res.body.name);
    assert.equal(res.body.display, 'standalone');
  });

  it('GET /sw.js deve servir o Service Worker', async () => {
    const res = await harness.request.get('/sw.js');
    assert.equal(res.status, 200);
    assert.match(res.text, /CACHE_NAME/);
  });

  it('GET /css/style.css deve servir folha de estilo global', async () => {
    const res = await harness.request.get('/css/style.css');
    assert.equal(res.status, 200);
    assert.match(res.headers['content-type'], /text\/css/);
    assert.match(res.text, /--primary-dark/);
  });

  it('GET /js/app.js deve servir script JavaScript com MIME correto', async () => {
    const res = await harness.request.get('/js/app.js');
    assert.equal(res.status, 200);
    assert.match(res.text, /EducationalGamesManager/);
  });

  it('GET rota desconhecida deve retornar SPA fallback para login', async () => {
    const res = await harness.request.get('/rota-inexistente-123');
    assert.equal(res.status, 200);
    assert.match(res.headers['content-type'], /text\/html/);
  });
});
