import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const SALT_ROUNDS = 10;
const SESSION_SECRET = process.env.SESSION_SECRET || 'starkids_friendly_secret_2026';

/**
 * Cria hash seguro da senha
 */
export async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compara a senha digitada com o hash salvo
 */
export async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

/**
 * Cria um token de sessão simples e seguro
 */
export function createSessionToken(userId, username) {
  const payload = `${userId}:${username}:${Date.now()}`;
  const hmac = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  const token = Buffer.from(`${payload}:${hmac}`).toString('base64');
  return token;
}

/**
 * Valida o token de sessão e retorna os dados do usuário
 */
export function verifySessionToken(token) {
  try {
    if (!token) return null;
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const parts = decoded.split(':');
    if (parts.length !== 4) return null;

    const [userId, username, timestamp, signature] = parts;
    const expectedPayload = `${userId}:${username}:${timestamp}`;
    const expectedHmac = crypto.createHmac('sha256', SESSION_SECRET).update(expectedPayload).digest('hex');

    if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedHmac))) {
      return {
        userId: parseInt(userId, 10),
        username
      };
    }
    return null;
  } catch {
    return null;
  }
}
