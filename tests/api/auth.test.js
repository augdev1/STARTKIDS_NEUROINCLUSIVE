import { describe, it, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { harness } from '../harness/test-harness.js';

describe('API Harness: Autenticação e Segurança (/api/auth)', () => {
  beforeEach(() => {
    harness.resetDb();
  });

  after(async () => {
    await harness.teardown();
  });

  describe('POST /api/auth/register', () => {
    it('deve registrar com sucesso um novo amiguinho e retornar token e progressão', async () => {
      const res = await harness.request
        .post('/api/auth/register')
        .send({
          username: 'EstrelinhaAzul',
          password: 'senhaSegura123'
        });

      assert.equal(res.status, 201);
      assert.ok(res.body.token, 'Deve retornar token de sessão');
      assert.equal(res.body.user.username, 'EstrelinhaAzul');
      assert.ok(res.body.progression, 'Deve inicializar a progressão');
      assert.equal(res.body.progression.stars, 3);
    });

    it('deve rejeitar cadastro sem campos obrigatórios', async () => {
      const res = await harness.request
        .post('/api/auth/register')
        .send({});

      assert.equal(res.status, 400);
      assert.match(res.body.error, /digite seu nome/i);
    });

    it('deve rejeitar nome de usuário com menos de 3 caracteres', async () => {
      const res = await harness.request
        .post('/api/auth/register')
        .send({ username: 'Oi', password: '1234password' });

      assert.equal(res.status, 400);
      assert.match(res.body.error, /pelo menos 3/i);
    });

    it('deve rejeitar senha com menos de 4 caracteres', async () => {
      const res = await harness.request
        .post('/api/auth/register')
        .send({ username: 'SuperLucas', password: '123' });

      assert.equal(res.status, 400);
      assert.match(res.body.error, /pelo menos 4 caracteres/i);
    });

    it('deve rejeitar nomes com símbolos perigosos ou scripts (segurança)', async () => {
      const res = await harness.request
        .post('/api/auth/register')
        .send({ username: '<script>', password: '1234password' });

      assert.equal(res.status, 400);
      assert.match(res.body.error, /sem símbolos estranhos/i);
    });

    it('deve impedir cadastro duplicado com status 409', async () => {
      await harness.seedUser({ username: 'AmigoOriginal' });

      const res = await harness.request
        .post('/api/auth/register')
        .send({ username: 'AmigoOriginal', password: 'outraSenha123' });

      assert.equal(res.status, 409);
      assert.match(res.body.error, /já está sendo usado/i);
    });
  });

  describe('POST /api/auth/login', () => {
    it('deve realizar login com credenciais corretas', async () => {
      const seeded = await harness.seedUser({ username: 'LeoGamer', password: 'senhaCerta456' });

      const res = await harness.request
        .post('/api/auth/login')
        .send({ username: 'LeoGamer', password: 'senhaCerta456' });

      assert.equal(res.status, 200);
      assert.ok(res.body.token);
      assert.equal(res.body.user.username, 'LeoGamer');
      assert.ok(res.body.progression);
    });

    it('deve falhar amigavelmente se a senha estiver incorreta (401)', async () => {
      await harness.seedUser({ username: 'BiaHeroina', password: 'senhaSecreta1' });

      const res = await harness.request
        .post('/api/auth/login')
        .send({ username: 'BiaHeroina', password: 'senhaErrada99' });

      assert.equal(res.status, 401);
      assert.match(res.body.error, /Senha incorreta/i);
      assert.equal(typeof res.body.attemptsRemaining, 'number');
    });

    it('deve informar se o usuário não for encontrado (401)', async () => {
      const res = await harness.request
        .post('/api/auth/login')
        .send({ username: 'NaoExistoMesmo', password: 'qualquerSenha' });

      assert.equal(res.status, 401);
      assert.match(res.body.error, /Não encontramos esse amiguinho/i);
    });
  });
});
