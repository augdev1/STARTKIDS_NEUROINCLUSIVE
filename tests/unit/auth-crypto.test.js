import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { hashPassword, comparePassword, createSessionToken, verifySessionToken } from '../../server/auth.js';

describe('Unit Harness: Criptografia e Tokens de Sessão', () => {
  it('deve gerar hash bcrypt seguro e comparar com sucesso', async () => {
    const rawPass = 'minhaSenhaMagica';
    const hash = await hashPassword(rawPass);

    assert.notEqual(hash, rawPass);
    assert.ok(hash.startsWith('$2'), 'Hash deve ser do formato bcrypt');

    const isValid = await comparePassword(rawPass, hash);
    assert.equal(isValid, true);

    const isWrong = await comparePassword('outraSenhaErrada', hash);
    assert.equal(isWrong, false);
  });

  it('deve criar e validar token de sessão com assinatura HMAC válida', () => {
    const userId = 42;
    const username = 'CuriosoDasEstrelas';

    const token = createSessionToken(userId, username);
    assert.ok(typeof token === 'string');

    const verified = verifySessionToken(token);
    assert.ok(verified, 'Token deve ser válido');
    assert.equal(verified.userId, 42);
    assert.equal(verified.username, 'CuriosoDasEstrelas');
  });

  it('deve rejeitar token com assinatura adulterada (anti-tampering)', () => {
    const token = createSessionToken(1, 'UserOriginal');
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const parts = decoded.split(':');

    // Tenta forjar para o usuário ID 999 mantendo o resto
    parts[0] = '999';
    const forgedToken = Buffer.from(parts.join(':')).toString('base64');

    const verified = verifySessionToken(forgedToken);
    assert.equal(verified, null, 'Token adulterado deve retornar null');
  });

  it('deve lidar de forma segura com tokens nulos ou mal formatados', () => {
    assert.equal(verifySessionToken(null), null);
    assert.equal(verifySessionToken(''), null);
    assert.equal(verifySessionToken('abc:def'), null);
    assert.equal(verifySessionToken('123456'), null);
  });
});
