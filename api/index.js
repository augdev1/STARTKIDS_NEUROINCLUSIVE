import app from '../server/server.js';
import { initDB } from '../server/db.js';

let isDbInitialized = false;

export default async function handler(req, res) {
  if (!isDbInitialized && process.env.DATABASE_URL) {
    try {
      await initDB();
      isDbInitialized = true;
    } catch (e) {
      console.warn('DB init warning on serverless invocation:', e.message);
    }
  }
  return app(req, res);
}
