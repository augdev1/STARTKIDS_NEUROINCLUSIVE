import app from '../server/server.js';
import { initDB } from '../server/db.js';

let isDbInitialized = false;

export default async function handler(req, res) {
  const hasDb = process.env.DATABASE_URL ||
                process.env.POSTGRES_URL ||
                process.env.POSTGRES_URL_NON_POOLING ||
                process.env.POSTGRES_PRISMA_URL ||
                process.env.POSTGRES_HOST;

  if (!isDbInitialized && hasDb) {
    try {
      await initDB();
      isDbInitialized = true;
    } catch (e) {
      console.warn('DB init warning on serverless invocation:', e.message);
    }
  }
  return app(req, res);
}
