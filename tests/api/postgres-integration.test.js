import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import pg from 'pg';
import { hashPassword, comparePassword } from '../../server/auth.js';

const pgConnectionString = (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('invalid'))
  ? process.env.DATABASE_URL
  : 'postgres://starkids:starkids_pass@127.0.0.1:5433/starkids_db';

describe('API Harness: Validação e Integração com PostgreSQL Ativo no Docker', () => {
  let pool;
  let testUserId = null;
  const testUsername = `DockerTest_${Date.now()}`;
  const testPassword = 'docker_secret_password';

  before(async () => {
    pool = new pg.Pool({
      connectionString: pgConnectionString,
      connectionTimeoutMillis: 5000
    });
  });

  after(async () => {
    if (pool) {
      if (testUserId) {
        try {
          await pool.query('DELETE FROM users WHERE id = $1', [testUserId]);
        } catch {}
      }
      await pool.end();
    }
  });

  it('deve conectar com sucesso ao PostgreSQL 17 rodando no container Docker', async () => {
    const client = await pool.connect();
    try {
      const res = await client.query('SELECT version(), current_database() as db');
      assert.ok(res.rows[0].version.includes('PostgreSQL 17'));
      assert.equal(res.rows[0].db, 'starkids_db');
    } finally {
      client.release();
    }
  });

  it('deve confirmar a existência das tabelas users e user_progression', async () => {
    const res = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name"
    );
    const tables = res.rows.map(r => r.table_name);
    assert.ok(tables.includes('users'), 'Tabela users deve existir no PostgreSQL');
    assert.ok(tables.includes('user_progression'), 'Tabela user_progression deve existir no PostgreSQL');
  });

  it('deve persistir um novo usuário com senha criptografada via bcrypt no PostgreSQL', async () => {
    const pwdHash = await hashPassword(testPassword);
    const res = await pool.query(
      'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username, created_at',
      [testUsername, pwdHash]
    );

    assert.equal(res.rows.length, 1);
    testUserId = res.rows[0].id;
    assert.ok(testUserId > 0);
    assert.equal(res.rows[0].username, testUsername);

    const matches = await comparePassword(testPassword, pwdHash);
    assert.equal(matches, true, 'Senha deve ser validada com sucesso pelo bcrypt');
  });

  it('deve persistir e consultar progressão com JSONB mantendo os 52 acessórios e estrelas', async () => {
    assert.ok(testUserId, 'ID do usuário de teste deve existir');

    const initialAccessories = ['leaf_hat', 'star_glasses', 'pet_ladybug', 'explorer_cap'];
    const initialEquipped = { hats: 'explorer_cap' };

    await pool.query(
      `INSERT INTO user_progression (user_id, unlocked_accessories, equipped_accessories, games_completed, stars)
       VALUES ($1, $2, $3, $4, $5)`,
      [testUserId, JSON.stringify(initialAccessories), JSON.stringify(initialEquipped), JSON.stringify(['game_1']), 15]
    );

    const check = await pool.query(
      'SELECT unlocked_accessories, equipped_accessories, games_completed, stars FROM user_progression WHERE user_id = $1',
      [testUserId]
    );

    assert.equal(check.rows.length, 1);
    const record = check.rows[0];
    assert.equal(record.stars, 15);
    assert.deepEqual(record.unlocked_accessories, initialAccessories);
    assert.deepEqual(record.equipped_accessories, initialEquipped);
    assert.deepEqual(record.games_completed, ['game_1']);
  });

  it('deve atualizar progressão e persistir no volume Docker via ON CONFLICT DO UPDATE', async () => {
    const updatedAccessories = ['leaf_hat', 'star_glasses', 'pet_ladybug', 'explorer_cap', 'cozy_beanie'];

    await pool.query(
      `INSERT INTO user_progression (user_id, unlocked_accessories, equipped_accessories, games_completed, stars, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (user_id) DO UPDATE SET
         unlocked_accessories = EXCLUDED.unlocked_accessories,
         stars = EXCLUDED.stars,
         updated_at = NOW()`,
      [testUserId, JSON.stringify(updatedAccessories), JSON.stringify({ hats: 'cozy_beanie' }), JSON.stringify(['game_1', 'game_2']), 25]
    );

    const res = await pool.query(
      'SELECT stars, unlocked_accessories FROM user_progression WHERE user_id = $1',
      [testUserId]
    );

    assert.equal(res.rows[0].stars, 25);
    assert.equal(res.rows[0].unlocked_accessories.length, 5);
  });
});
