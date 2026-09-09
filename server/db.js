import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from './logger.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const localDataDir = path.join(rootDir, 'data');
const localDbFile = path.join(localDataDir, 'local_db.json');

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || 'postgres://starkids:starkids_pass@localhost:5432/starkids_db';
const isProduction = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;

export const pool = new Pool({
  connectionString,
  ssl: isProduction && !connectionString.includes('localhost') && !connectionString.includes('postgres:') ? { rejectUnauthorized: false } : false
});

export let isPgConnected = false;

// Helpers para persistência local de fallback
function getLocalDB() {
  try {
    if (!fs.existsSync(localDataDir)) fs.mkdirSync(localDataDir, { recursive: true });
    if (!fs.existsSync(localDbFile)) {
      fs.writeFileSync(localDbFile, JSON.stringify({ users: [], progression: {} }, null, 2));
    }
    const raw = fs.readFileSync(localDbFile, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { users: [], progression: {} };
  }
}

function saveLocalDB(data) {
  try {
    if (!fs.existsSync(localDataDir)) fs.mkdirSync(localDataDir, { recursive: true });
    fs.writeFileSync(localDbFile, JSON.stringify(data, null, 2));
  } catch (e) {
    console.warn('Erro ao salvar local_db.json:', e.message);
  }
}

/**
 * Inicializa as tabelas se não existirem
 */
export async function initDB() {
  try {
    const client = await pool.connect();
    try {
      // Tabela de Usuários
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(60) UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);

      // Tabela de Progressão e Acessórios
      await client.query(`
        CREATE TABLE IF NOT EXISTS user_progression (
          id SERIAL PRIMARY KEY,
          user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          unlocked_accessories JSONB NOT NULL DEFAULT '["leaf_hat", "star_glasses", "pet_ladybug"]'::jsonb,
          equipped_accessories JSONB NOT NULL DEFAULT '{"hats": "leaf_hat"}'::jsonb,
          games_completed JSONB NOT NULL DEFAULT '[]'::jsonb,
          stars INTEGER NOT NULL DEFAULT 3,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);

      isPgConnected = true;
      logger.db('✅ Banco de Dados PostgreSQL conectado e tabelas sincronizadas com sucesso.');

      // Sincroniza dados do local_db.json para o PostgreSQL se existirem
      try {
        const local = getLocalDB();
        if (local && Array.isArray(local.users) && local.users.length > 0) {
          for (const u of local.users) {
            const check = await client.query('SELECT id FROM users WHERE LOWER(username) = $1', [u.username.toLowerCase()]);
            let userId = null;
            if (check.rows.length === 0) {
              const inserted = await client.query(
                'INSERT INTO users (username, password_hash, created_at) VALUES ($1, $2, $3) RETURNING id',
                [u.username, u.password_hash, u.created_at || new Date()]
              );
              userId = inserted.rows[0].id;
              logger.db(`📥 Usuário "${u.username}" importado para o PostgreSQL (ID: ${userId})`);
            } else {
              userId = check.rows[0].id;
            }

            const prog = local.progression && (local.progression[u.id] || local.progression[String(u.id)]);
            if (prog && userId) {
              const progCheck = await client.query('SELECT id FROM user_progression WHERE user_id = $1', [userId]);
              if (progCheck.rows.length === 0) {
                await client.query(
                  `INSERT INTO user_progression (user_id, unlocked_accessories, equipped_accessories, games_completed, stars, updated_at)
                   VALUES ($1, $2, $3, $4, $5, $6)`,
                  [
                    userId,
                    JSON.stringify(prog.unlocked_accessories || ['leaf_hat', 'star_glasses', 'pet_ladybug']),
                    JSON.stringify(prog.equipped_accessories || { hats: 'leaf_hat' }),
                    JSON.stringify(prog.games_completed || []),
                    prog.stars || 3,
                    prog.updated_at || new Date()
                  ]
                );
                logger.db(`📥 Progressão do usuário "${u.username}" importada com sucesso (${prog.stars} estrelas).`);
              }
            }
          }
        }
      } catch (migrateErr) {
        logger.warn('DB', `Nota sobre sincronização inicial: ${migrateErr.message}`);
      }
    } finally {
      client.release();
    }
  } catch (err) {
    isPgConnected = false;
    logger.warn('DB', `ℹ️ PostgreSQL não acessível no momento: ${err.message}`);
    logger.info('DB', '🛡️ Ativando persistência em arquivo seguro local (em Docker ou Vercel o PostgreSQL será utilizado automaticamente).');
    getLocalDB(); // inicializa arquivo local
  }
}

/**
 * Busca usuário por nome de usuário (case-insensitive para crianças)
 */
export async function findUserByUsername(username) {
  const cleanUser = username.trim().toLowerCase();

  if (isPgConnected) {
    try {
      const res = await pool.query('SELECT * FROM users WHERE LOWER(username) = $1 LIMIT 1', [cleanUser]);
      return res.rows[0] || null;
    } catch (e) {
      console.warn('Erro na query PostgreSQL findUser, usando fallback local:', e.message);
    }
  }

  // Fallback local
  const db = getLocalDB();
  return db.users.find(u => u.username.toLowerCase() === cleanUser) || null;
}

/**
 * Cria um novo usuário e inicializa sua progressão padrão
 */
export async function createUser(username, passwordHash) {
  const cleanUser = username.trim();

  if (isPgConnected) {
    try {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        const userRes = await client.query(
          'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username, created_at',
          [cleanUser, passwordHash]
        );
        const user = userRes.rows[0];

        const initialAccessories = ['leaf_hat', 'star_glasses', 'pet_ladybug'];
        const initialEquipped = { hats: 'leaf_hat' };
        await client.query(
          `INSERT INTO user_progression (user_id, unlocked_accessories, equipped_accessories, games_completed, stars)
           VALUES ($1, $2, $3, $4, $5)`,
          [user.id, JSON.stringify(initialAccessories), JSON.stringify(initialEquipped), JSON.stringify([]), 3]
        );

        await client.query('COMMIT');
        return user;
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
    } catch (e) {
      console.warn('Erro no PostgreSQL createUser, usando fallback local:', e.message);
    }
  }

  // Fallback local
  const db = getLocalDB();
  const newId = db.users.length ? Math.max(...db.users.map(u => u.id)) + 1 : 1;
  const newUser = {
    id: newId,
    username: cleanUser,
    password_hash: passwordHash,
    created_at: new Date().toISOString()
  };
  db.users.push(newUser);

  db.progression[newId] = {
    unlocked_accessories: ['leaf_hat', 'star_glasses', 'pet_ladybug'],
    equipped_accessories: { hats: 'leaf_hat' },
    games_completed: [],
    stars: 3,
    updated_at: new Date().toISOString()
  };

  saveLocalDB(db);
  return newUser;
}

/**
 * Obtém a progressão do usuário
 */
export async function getUserProgression(userId) {
  if (isPgConnected) {
    try {
      const res = await pool.query(
        'SELECT unlocked_accessories, equipped_accessories, games_completed, stars, updated_at FROM user_progression WHERE user_id = $1 LIMIT 1',
        [userId]
      );
      return res.rows[0] || null;
    } catch (e) {
      console.warn('Erro no PostgreSQL getUserProgression, usando fallback local:', e.message);
    }
  }

  // Fallback local
  const db = getLocalDB();
  return db.progression[userId] || null;
}

/**
 * Atualiza / salva a progressão do usuário
 */
export async function saveUserProgression(userId, { unlockedAccessories, equippedAccessories, gamesCompleted, stars }) {
  if (isPgConnected) {
    try {
      const res = await pool.query(
        `INSERT INTO user_progression (user_id, unlocked_accessories, equipped_accessories, games_completed, stars, updated_at)
         VALUES ($1, $2, $3, $4, $5, NOW())
         ON CONFLICT (user_id) DO UPDATE SET
           unlocked_accessories = EXCLUDED.unlocked_accessories,
           equipped_accessories = EXCLUDED.equipped_accessories,
           games_completed = EXCLUDED.games_completed,
           stars = EXCLUDED.stars,
           updated_at = NOW()
         RETURNING unlocked_accessories, equipped_accessories, games_completed, stars, updated_at`,
        [
          userId,
          JSON.stringify(unlockedAccessories || ['leaf_hat', 'star_glasses', 'pet_ladybug']),
          JSON.stringify(equippedAccessories || { hats: 'leaf_hat' }),
          JSON.stringify(gamesCompleted || []),
          stars || 3
        ]
      );
      return res.rows[0];
    } catch (e) {
      console.warn('Erro no PostgreSQL saveUserProgression, usando fallback local:', e.message);
    }
  }

  // Fallback local
  const db = getLocalDB();
  const updated = {
    unlocked_accessories: unlockedAccessories || ['leaf_hat', 'star_glasses', 'pet_ladybug'],
    equipped_accessories: equippedAccessories || { hats: 'leaf_hat' },
    games_completed: gamesCompleted || [],
    stars: stars || 3,
    updated_at: new Date().toISOString()
  };
  db.progression[userId] = updated;
  saveLocalDB(db);
  return updated;
}
