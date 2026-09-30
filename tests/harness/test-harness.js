import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import supertest from 'supertest';
import { hashPassword, createSessionToken } from '../../server/auth.js';
import { getLocalDB, saveLocalDB, resetLocalDB, closeDB } from '../../server/db.js';
import app from '../../server/server.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fixturesDir = path.resolve(__dirname, '../fixtures');
const testDbPath = path.join(fixturesDir, 'test_db.json');

// Garante isolamento estrito de ambiente para o Test Harness
process.env.NODE_ENV = 'test';
process.env.DATA_DIR = fixturesDir;
process.env.LOCAL_DB_FILE = testDbPath;
process.env.SESSION_SECRET = process.env.SESSION_SECRET || 'starkids_test_secret_harness_2026';

/**
 * Interface principal do Test Harness
 */
export class TestHarness {
  constructor() {
    this.app = app;
    this.request = supertest(app);
    this.fixturesDir = fixturesDir;
    this.testDbPath = testDbPath;
  }

  /**
   * Reseta o banco de testes para um estado limpo
   */
  resetDb(initialState = { users: [], progression: {} }) {
    if (!fs.existsSync(fixturesDir)) {
      fs.mkdirSync(fixturesDir, { recursive: true });
    }
    resetLocalDB(initialState);
  }

  /**
   * Obtém os dados atuais do banco de testes
   */
  getDbData() {
    return getLocalDB();
  }

  /**
   * Cria um usuário diretamente no banco de testes para uso em testes
   */
  async seedUser({ username = 'AmiguinhoTeste', password = '1234password', stars = 5 } = {}) {
    const db = this.getDbData();
    const newId = db.users.length ? Math.max(...db.users.map(u => u.id)) + 1 : 1;
    const passwordHash = await hashPassword(password);

    const user = {
      id: newId,
      username,
      password_hash: passwordHash,
      created_at: new Date().toISOString()
    };
    db.users.push(user);

    db.progression[newId] = {
      unlocked_accessories: ['leaf_hat', 'star_glasses'],
      equipped_accessories: { hats: 'leaf_hat' },
      games_completed: ['game_colors'],
      stars,
      updated_at: new Date().toISOString()
    };

    saveLocalDB(db);

    const token = createSessionToken(user.id, user.username);
    return { user, token, password };
  }

  /**
   * Gera token de autenticação direto
   */
  generateToken(userId, username) {
    return createSessionToken(userId, username);
  }

  /**
   * Executa teardown do Harness
   */
  async teardown() {
    this.resetDb();
    await closeDB();
  }
}

// Instância padrão compartilhada do Harness
export const harness = new TestHarness();
