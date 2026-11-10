import { describe, it, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  getLocalDB,
  saveLocalDB,
  resetLocalDB,
  createUser,
  findUserByUsername,
  getUserProgression,
  saveUserProgression,
  closeDB
} from '../../server/db.js';
import { hashPassword } from '../../server/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fixturesDir = path.resolve(__dirname, '../fixtures');
const testDbFile = path.join(fixturesDir, 'test_db.json');

describe('Unit Harness: Resiliência da Camada de Banco de Dados e Fallback', () => {
  beforeEach(() => {
    resetLocalDB({ users: [], progression: {} });
  });

  after(() => {
    resetLocalDB({ users: [], progression: {} });
  });

  it('deve criar novo usuário e inicializar progressão padrão com 3 estrelas', async () => {
    const pwdHash = await hashPassword('segredo123');
    const user = await createUser('PipAmigo', pwdHash);

    assert.ok(user.id, 'Usuário criado deve possuir ID');
    assert.equal(user.username, 'PipAmigo');

    const prog = await getUserProgression(user.id);
    assert.ok(prog, 'Progressão deve ser inicializada');
    assert.equal(prog.stars, 3, 'Novo amiguinho deve iniciar com 3 estrelas de boas-vindas');
    assert.deepEqual(
      prog.unlocked_accessories,
      ['leaf_hat', 'star_glasses', 'pet_ladybug'],
      'Deve desbloquear os 3 acessórios gratuitos'
    );
  });

  it('findUserByUsername deve ser case-insensitive e tolerar espaços laterais', async () => {
    const pwdHash = await hashPassword('segredo123');
    await createUser('LucasBrincalhao', pwdHash);

    const foundLower = await findUserByUsername('lucasbrincalhao');
    assert.ok(foundLower, 'Deve encontrar com letras minúsculas');
    assert.equal(foundLower.username, 'LucasBrincalhao');

    const foundPadded = await findUserByUsername('  LUCASBRINCALHAO  ');
    assert.ok(foundPadded, 'Deve encontrar com espaços laterais e maiúsculas');

    const notFound = await findUserByUsername('NaoExiste');
    assert.equal(notFound, null, 'Usuário inexistente deve retornar null');
  });

  it('saveUserProgression deve persistir novos itens conquistados e estrelas', async () => {
    const pwdHash = await hashPassword('segredo123');
    const user = await createUser('LaraAventureira', pwdHash);

    const updated = await saveUserProgression(user.id, {
      unlockedAccessories: ['leaf_hat', 'star_glasses', 'pet_ladybug', 'explorer_cap', 'star_badge'],
      equippedAccessories: { hats: 'explorer_cap' },
      gamesCompleted: ['game_1', 'game_2'],
      stars: 12
    });

    assert.equal(updated.stars, 12);
    assert.equal(updated.unlocked_accessories.length, 5);

    const retrieved = await getUserProgression(user.id);
    assert.equal(retrieved.stars, 12);
    assert.deepEqual(retrieved.equipped_accessories, { hats: 'explorer_cap' });
    assert.ok(retrieved.games_completed.includes('game_1'));
  });

  it('getLocalDB deve se recuperar com segurança caso o arquivo de banco seja corrompido', () => {
    fs.writeFileSync(testDbFile, '{ este_arquivo_esta_corrompido: true ???');
    const recovered = getLocalDB();

    assert.ok(recovered);
    assert.deepEqual(recovered.users, []);
    assert.deepEqual(recovered.progression, {});
  });
});

