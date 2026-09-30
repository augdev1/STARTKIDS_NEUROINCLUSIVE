import { describe, it, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { harness } from '../harness/test-harness.js';

describe('API Harness: Progressão e Baú (/api/progression)', () => {
  let testUser;
  let testToken;

  beforeEach(async () => {
    harness.resetDb();
    const seeded = await harness.seedUser({ username: 'AstronautaMirim', stars: 7 });
    testUser = seeded.user;
    testToken = seeded.token;
  });

  after(async () => {
    await harness.teardown();
  });

  it('deve bloquear requisição sem cabeçalho Authorization com 401', async () => {
    const res = await harness.request.get('/api/progression');
    assert.equal(res.status, 401);
    assert.match(res.body.error, /Sessão não informada/i);
  });

  it('deve bloquear requisição com token adulterado/inválido com 401', async () => {
    const res = await harness.request
      .get('/api/progression')
      .set('Authorization', 'Bearer token_invalido_adulterado');

    assert.equal(res.status, 401);
    assert.match(res.body.error, /Sessão expirada/i);
  });

  it('deve retornar a progressão do usuário autenticado com 200', async () => {
    const res = await harness.request
      .get('/api/progression')
      .set('Authorization', `Bearer ${testToken}`);

    assert.equal(res.status, 200);
    assert.ok(res.body.progression);
    assert.equal(res.body.progression.stars, 7);
    assert.ok(Array.isArray(res.body.progression.unlocked_accessories));
  });

  it('deve salvar e atualizar acessórios e estrelas com POST /api/progression', async () => {
    const newProgression = {
      unlockedAccessories: ['leaf_hat', 'star_glasses', 'golden_cape'],
      equippedAccessories: { hats: 'golden_cape' },
      gamesCompleted: ['game_colors', 'game_shapes'],
      stars: 12
    };

    const res = await harness.request
      .post('/api/progression')
      .set('Authorization', `Bearer ${testToken}`)
      .send(newProgression);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.progression.stars, 12);
    assert.deepEqual(res.body.progression.equipped_accessories, { hats: 'golden_cape' });

    // Verifica se os dados foram realmente persistidos no banco
    const getRes = await harness.request
      .get('/api/progression')
      .set('Authorization', `Bearer ${testToken}`);

    assert.equal(getRes.body.progression.stars, 12);
    assert.ok(getRes.body.progression.unlocked_accessories.includes('golden_cape'));
  });
});
