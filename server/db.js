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

export function getLocalDataDir() {
  return process.env.DATA_DIR ? path.resolve(rootDir, process.env.DATA_DIR) : path.join(rootDir, 'data');
}

export function getLocalDbFile() {
  return process.env.LOCAL_DB_FILE ? path.resolve(rootDir, process.env.LOCAL_DB_FILE) : path.join(getLocalDataDir(), 'local_db.json');
}

const { Pool } = pg;

export function getEffectiveConnectionString() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  if (process.env.POSTGRES_URL) return process.env.POSTGRES_URL;
  if (process.env.POSTGRES_URL_NON_POOLING) return process.env.POSTGRES_URL_NON_POOLING;
  if (process.env.POSTGRES_PRISMA_URL) return process.env.POSTGRES_PRISMA_URL;
  if (process.env.POSTGRES_HOST && process.env.POSTGRES_USER) {
    const user = process.env.POSTGRES_USER;
    const pass = process.env.POSTGRES_PASSWORD || '';
    const host = process.env.POSTGRES_HOST;
    const db = process.env.POSTGRES_DATABASE || 'starkids_db';
    return `postgres://${user}:${pass}@${host}/${db}?sslmode=require`;
  }
  return 'postgres://starkids:starkids_pass@localhost:5432/starkids_db';
}

const connectionString = getEffectiveConnectionString();
const isProduction = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;
const isLocal = connectionString.includes('localhost') ||
                connectionString.includes('127.0.0.1') ||
                connectionString.includes('@postgres:') ||
                connectionString.includes('@postgres/');

export const pool = new Pool({
  connectionString,
  ssl: (!isLocal && (isProduction || connectionString.includes('sslmode=require') || connectionString.includes('ssl=true') || connectionString.includes('.vercel-storage.com') || connectionString.includes('.neon.tech') || connectionString.includes('.supabase.co') || connectionString.includes('.render.com')))
    ? { rejectUnauthorized: false }
    : false,
  connectionTimeoutMillis: 5000,
  max: isProduction ? 10 : 20
});

export let isPgConnected = false;

// Helpers para persistência local de fallback
export function getLocalDB() {
  const dir = getLocalDataDir();
  const file = getLocalDbFile();
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, JSON.stringify({ users: [], progression: {} }, null, 2));
    }
    const raw = fs.readFileSync(file, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { users: [], progression: {} };
  }
}

export function saveLocalDB(data) {
  const dir = getLocalDataDir();
  const file = getLocalDbFile();
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  } catch (e) {
    console.warn('Erro ao salvar banco local:', e.message);
  }
}

export function resetLocalDB(initialData = { users: [], progression: {} }) {
  saveLocalDB(initialData);
  return initialData;
}

export async function closeDB() {
  if (pool) {
    try {
      await pool.end();
    } catch {}
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
  if (!db || !db.progression) return null;
  return db.progression[userId] || db.progression[String(userId)] || null;
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
