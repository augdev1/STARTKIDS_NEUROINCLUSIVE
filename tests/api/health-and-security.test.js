import { describe, it, after } from 'node:test';
import assert from 'node:assert/strict';
import { harness } from '../harness/test-harness.js';

describe('API Harness: Saúde, Logs, TTS e Headers de Segurança', () => {
  after(async () => {
    await harness.teardown();
  });

  describe('Headers de Segurança HTTP', () => {
    it('deve incluir headers de proteção obrigatórios em todas as respostas', async () => {
      const res = await harness.request.get('/api/health');

      assert.equal(res.status, 200);
      assert.equal(res.headers['x-content-type-options'], 'nosniff');
      assert.equal(res.headers['x-frame-options'], 'SAMEORIGIN');
      assert.equal(res.headers['referrer-policy'], 'strict-origin-when-cross-origin');
      assert.equal(res.headers['x-xss-protection'], '1; mode=block');
    });
  });

  describe('GET /api/health', () => {
    it('deve retornar status 200 e informações do sistema', async () => {
      const res = await harness.request.get('/api/health');

      assert.equal(res.status, 200);
      assert.equal(res.body.status, 'ok');
      assert.equal(res.body.app, 'StartKids');
      assert.ok(res.body.time);
    });
  });

  describe('GET /api/logs', () => {
    it('deve retornar histórico de auditoria e estatísticas', async () => {
      const res = await harness.request.get('/api/logs?limit=10');

      assert.equal(res.status, 200);
      assert.equal(res.body.status, 'ok');
      assert.ok(Array.isArray(res.body.logs));
      assert.ok(res.body.stats);
    });
  });

  describe('GET /api/tts (Síntese de Voz)', () => {
    it('deve rejeitar requisição sem parâmetro text (400)', async () => {
      const res = await harness.request.get('/api/tts');

      assert.equal(res.status, 400);
      assert.match(res.body.error, /Texto não informado/i);
    });

    it('deve rejeitar texto excessivamente longo > 500 caracteres (400)', async () => {
      const longText = 'a'.repeat(501);
      const res = await harness.request.get(`/api/tts?text=${longText}`);

      assert.equal(res.status, 400);
      assert.match(res.body.error, /muito longo/i);
    });
  });
});
