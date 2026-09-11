import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDB, findUserByUsername, createUser, getUserProgression, saveUserProgression } from './db.js';
import { hashPassword, comparePassword, createSessionToken, verifySessionToken } from './auth.js';
import { logger } from './logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const app = express();
const PORT = process.env.PORT || 8085;

app.use(cors());
app.use(express.json({ limit: '100kb' })); // Proteção contra payloads gigantescos

// Headers de segurança HTTP essenciais
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

app.use(logger.middleware());

// Rate Limiting em memória para proteção contra força bruta em rotas sensíveis
const authRateLimits = new Map();
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutos
const MAX_AUTH_ATTEMPTS = 25; // máx 25 tentativas gerais por IP

// Rate Limiting acolhedor por usuário/IP: 5 tentativas erradas = 60s de pausa
const loginAttemptsMap = new Map();
const MAX_FAILED_LOGIN_ATTEMPTS = 5;
const LOGIN_BLOCK_DURATION_MS = 60 * 1000; // 60 segundos

function getLoginAttemptKey(req, username) {
  const ip = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  const cleanUser = (username || '').trim().toLowerCase();
  return `${ip}:${cleanUser}`;
}

function authRateLimiter(req, res, next) {
  const ip = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  const now = Date.now();
  const record = authRateLimits.get(ip);

  if (!record || now > record.resetTime) {
    authRateLimits.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  if (record.count >= MAX_AUTH_ATTEMPTS) {
    logger.warn('SECURITY', `Rate limit atingido para IP ${ip} na rota ${req.url}`);
    return res.status(429).json({
      error: 'Muitas tentativas seguidas! Por favor, aguarde alguns minutinhos antes de tentar de novo.'
    });
  }

  record.count++;
  next();
}

// Limpeza automática periódica de memória dos rate limiters
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of authRateLimits.entries()) {
    if (now > record.resetTime) authRateLimits.delete(ip);
  }
  for (const [key, attempt] of loginAttemptsMap.entries()) {
    if (attempt.blockedUntil && now > attempt.blockedUntil + 60000) {
      loginAttemptsMap.delete(key);
    }
  }
}, 10 * 60 * 1000).unref();

// Servir arquivos estáticos (sem index automático para garantir que a entrada seja login.html)
app.use(express.static(rootDir, { index: false }));

// A rota raiz / leva direto para a página de login para começar desde o cadastro
app.get('/', (req, res) => {
  res.sendFile(path.join(rootDir, 'login.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(rootDir, 'login.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(rootDir, 'login.html'));
});

app.get('/game', (req, res) => {
  res.sendFile(path.join(rootDir, 'index.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(rootDir, 'index.html'));
});

// Middleware de Autenticação para Rotas Protegidas
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Sessão não informada. Faça login para continuar!' });
  }

  const token = authHeader.split(' ')[1];
  const user = verifySessionToken(token);
  if (!user) {
    return res.status(401).json({ error: 'Sessão expirada. Entre novamente para sincronizar.' });
  }

  req.user = user;
  next();
}

// --------------------------------------------------------------------------
// ROTAS DA API
// --------------------------------------------------------------------------

/**
 * Health check
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'StartKids', time: new Date().toISOString() });
});

// Cache em memória para os áudios neurais gerados (otimiza resposta para < 5ms)
const ttsAudioCache = new Map();
const MAX_TTS_CACHE_ITEMS = 600;

let edgeTtsInstance = null;
let edgeTtsModule = null;

async function getEdgeTts() {
  if (!edgeTtsModule) {
    try {
      edgeTtsModule = await import('msedge-tts');
    } catch (err) {
      logger.warn('TTS', `Módulo msedge-tts não disponível: ${err.message}`);
      return null;
    }
  }
  if (!edgeTtsInstance && edgeTtsModule) {
    const { MsEdgeTTS, OUTPUT_FORMAT } = edgeTtsModule;
    edgeTtsInstance = new MsEdgeTTS();
    await edgeTtsInstance.setMetadata('pt-BR-FranciscaNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  }
  return edgeTtsInstance;
}

/**
 * Endpoint de Síntese de Voz Neural Angelical de Alta Qualidade
 * Garante áudio cristalino, doce e idêntico em qualquer celular (Android, iOS) ou desktop.
 */
app.get('/api/tts', async (req, res) => {
  try {
    const rawText = req.query.text || '';
    const cleanText = String(rawText)
      .replace(/!{2,}/g, '.')
      .replace(/\?{2,}/g, '?')
      .replace(/\*/g, '')
      .trim();

    if (!cleanText) {
      return res.status(400).json({ error: 'Texto não informado para síntese.' });
    }

    if (cleanText.length > 500) {
      return res.status(400).json({ error: 'Texto muito longo para síntese.' });
    }

    const cacheKey = cleanText.toLowerCase();

    if (ttsAudioCache.has(cacheKey)) {
      const cachedBuffer = ttsAudioCache.get(cacheKey);
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Length', cachedBuffer.length);
      res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
      return res.end(cachedBuffer);
    }

    const tts = await getEdgeTts();
    if (!tts) {
      return res.status(503).json({ error: 'TTS neural indisponível temporariamente.' });
    }
    const { audioStream } = tts.toStream(cleanText);

    const chunks = [];
    audioStream.on('data', (chunk) => chunks.push(chunk));
    audioStream.on('end', () => {
      const buffer = Buffer.concat(chunks);
      if (ttsAudioCache.size >= MAX_TTS_CACHE_ITEMS) {
        const firstKey = ttsAudioCache.keys().next().value;
        ttsAudioCache.delete(firstKey);
      }
      ttsAudioCache.set(cacheKey, buffer);

      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Length', buffer.length);
      res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
      res.end(buffer);
    });

    audioStream.on('error', (err) => {
      logger.warn('TTS', `Erro no stream de áudio: ${err.message}`);
      edgeTtsInstance = null;
      if (!res.headersSent) {
        res.status(500).json({ error: 'Erro ao sintetizar áudio.' });
      }
    });

  } catch (err) {
    logger.warn('TTS', `Erro na síntese neural: ${err.message}`);
    edgeTtsInstance = null;
    if (!res.headersSent) {
      res.status(500).json({ error: 'Falha na geração da voz neural.' });
    }
  }
});

/**
 * Endpoint de Logs e Auditoria do Sistema
 */
app.get('/api/logs', (req, res) => {
  const limit = Math.min(parseInt(req.query.limit, 10) || 50, 150);
  const level = req.query.level ? String(req.query.level).toUpperCase() : null;
  const logs = logger.getRecentLogs({ limit, level });
  const stats = logger.getStats();

  res.json({
    status: 'ok',
    app: 'StartKids',
    generatedAt: new Date().toISOString(),
    stats,
    count: logs.length,
    logs
  });
});

/**
 * Cadastro descomplicado para crianças
 */
/**
 * Cadastro descomplicado para crianças
 */
app.post('/api/auth/register', authRateLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      logger.warn('AUTH', 'Tentativa de cadastro com campos incompletos');
      return res.status(400).json({ error: 'Por favor, digite seu nome e uma senha mágica!' });
    }

    const cleanUsername = username.trim();
    if (cleanUsername.length < 3) {
      logger.warn('AUTH', `Tentativa de cadastro com nome muito curto: "${cleanUsername}"`);
      return res.status(400).json({ error: 'O nome de usuário precisa ter pelo menos 3 letrinhas ou números.' });
    }

    if (cleanUsername.length > 20) {
      logger.warn('AUTH', `Tentativa de cadastro com nome muito longo: "${cleanUsername}"`);
      return res.status(400).json({ error: 'O nome de usuário pode ter no máximo 20 caracteres.' });
    }

    // Aceita letras (incluindo acentos e ç), números e sublinhado
    const validUserRegex = /^[a-zA-Z0-9_À-ÿ]+( [a-zA-Z0-9_À-ÿ]+)*$/;
    if (!validUserRegex.test(cleanUsername)) {
      return res.status(400).json({ error: 'O nome pode conter apenas letras, números ou underline, sem símbolos estranhos.' });
    }

    if (password.length < 4) {
      logger.warn('AUTH', `Tentativa de cadastro com senha menor que 4 para "${cleanUsername}"`);
      return res.status(400).json({ error: 'A senha precisa ter pelo menos 4 caracteres (números ou letras) para ser segura e fácil de lembrar!' });
    }

    if (password.length > 64) {
      return res.status(400).json({ error: 'A senha é muito longa (máximo de 64 caracteres).' });
    }

    const existingUser = await findUserByUsername(cleanUsername);
    if (existingUser) {
      logger.warn('AUTH', `Tentativa de cadastro com nome duplicado: "${cleanUsername}"`);
      return res.status(409).json({ error: 'Este nome já está sendo usado por outro amiguinho! Que tal tentar outro?' });
    }

    const passwordHash = await hashPassword(password);
    const newUser = await createUser(cleanUsername, passwordHash);
    const progression = await getUserProgression(newUser.id);
    const token = createSessionToken(newUser.id, newUser.username);

    logger.auth(`✨ Novo amiguinho cadastrado com sucesso: "${newUser.username}" (ID: ${newUser.id})`);

    return res.status(201).json({
      message: 'Bem-vindo ao StartKids! Sua conta foi criada com sucesso.',
      token,
      user: {
        id: newUser.id,
        username: newUser.username
      },
      progression
    });
  } catch (err) {
    logger.error('AUTH', `Erro no registro: ${err.message}`, { stack: err.stack });
    return res.status(500).json({ error: 'Ops! Ocorreu um problema ao criar a conta. Tente de novo!' });
  }
});

/**
 * Login amigável com proteção de 5 tentativas e pausa acolhedora de 60s
 */
app.post('/api/auth/login', authRateLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    const cleanUsername = (username || '').trim();
    if (!cleanUsername || !password) {
      logger.warn('AUTH', 'Tentativa de login sem usuário ou senha');
      return res.status(400).json({ error: 'Por favor, digite seu nome e senha para entrar.' });
    }

    const key = getLoginAttemptKey(req, cleanUsername);
    const now = Date.now();
    const attemptRecord = loginAttemptsMap.get(key) || { failedCount: 0, blockedUntil: 0 };

    // 1. Verifica se está em pausa acolhedora (bloqueio temporário de 60s)
    if (attemptRecord.blockedUntil && now < attemptRecord.blockedUntil) {
      const remainingSeconds = Math.ceil((attemptRecord.blockedUntil - now) / 1000);
      logger.warn('SECURITY', `Login bloqueado temporariamente para "${cleanUsername}" (${remainingSeconds}s restantes)`);
      return res.status(429).json({
        error: `Muitas tentativas! Vamos respirar fundo com calma: tente novamente em ${remainingSeconds} segundos 🍃 (ou continue como Visitante!)`,
        isBlocked: true,
        retryAfter: remainingSeconds
      });
    }

    if (password.length < 4) {
      return res.status(400).json({ error: 'A senha precisa ter pelo menos 4 caracteres.' });
    }

    const user = await findUserByUsername(cleanUsername);
    if (!user) {
      attemptRecord.failedCount++;
      if (attemptRecord.failedCount >= MAX_FAILED_LOGIN_ATTEMPTS) {
        attemptRecord.blockedUntil = now + LOGIN_BLOCK_DURATION_MS;
        attemptRecord.failedCount = 0;
        loginAttemptsMap.set(key, attemptRecord);
        return res.status(429).json({
          error: 'Muitas tentativas seguidas! Vamos respirar fundo por 1 minutinho antes de tentar de novo 🍃 (ou entre como Visitante!)',
          isBlocked: true,
          retryAfter: 60
        });
      }
      loginAttemptsMap.set(key, attemptRecord);
      const remaining = MAX_FAILED_LOGIN_ATTEMPTS - attemptRecord.failedCount;
      return res.status(401).json({
        error: `Não encontramos esse amiguinho. Verifique se escreveu certinho! (${remaining} ${remaining === 1 ? 'tentativa restante' : 'tentativas restantes'})`,
        attemptsRemaining: remaining
      });
    }

    const match = await comparePassword(password, user.password_hash);
    if (!match) {
      attemptRecord.failedCount++;
      if (attemptRecord.failedCount >= MAX_FAILED_LOGIN_ATTEMPTS) {
        attemptRecord.blockedUntil = now + LOGIN_BLOCK_DURATION_MS;
        attemptRecord.failedCount = 0;
        loginAttemptsMap.set(key, attemptRecord);
        return res.status(429).json({
          error: 'Muitas tentativas seguidas! Vamos respirar fundo por 1 minutinho antes de tentar de novo 🍃 (ou entre como Visitante!)',
          isBlocked: true,
          retryAfter: 60
        });
      }
      loginAttemptsMap.set(key, attemptRecord);
      const remaining = MAX_FAILED_LOGIN_ATTEMPTS - attemptRecord.failedCount;
      return res.status(401).json({
        error: `Senha incorreta! Não se preocupe, tente digitar novamente com calma. (${remaining} ${remaining === 1 ? 'tentativa restante' : 'tentativas restantes'})`,
        attemptsRemaining: remaining
      });
    }

    // Sucesso! Limpa qualquer registro de tentativas falhas
    loginAttemptsMap.delete(key);

    const progression = await getUserProgression(user.id);
    const token = createSessionToken(user.id, user.username);

    logger.auth(`🚀 Login realizado com sucesso: "${user.username}" (ID: ${user.id})`);

    return res.json({
      message: `Que bom ver você de volta, ${user.username}!`,
      token,
      user: {
        id: user.id,
        username: user.username
      },
      progression
    });
  } catch (err) {
    logger.error('AUTH', `Erro no login: ${err.message}`, { stack: err.stack });
    return res.status(500).json({ error: 'Ops! Ocorreu um problema ao entrar. Tente novamente mais tarde.' });
  }
});

/**
 * Obter progresso do usuário logado
 */
app.get('/api/progression', requireAuth, async (req, res) => {
  try {
    const progression = await getUserProgression(req.user.userId);
    res.json({ progression });
  } catch (err) {
    logger.error('PROGRESSION', `Erro ao buscar progressão (User ${req.user?.userId}): ${err.message}`);
    res.status(500).json({ error: 'Erro ao carregar o progresso do baú.' });
  }
});

/**
 * Salvar / sincronizar progresso (acessórios, baús, roupas equipadas)
 */
app.post('/api/progression', requireAuth, async (req, res) => {
  try {
    const { unlockedAccessories, equippedAccessories, gamesCompleted, stars } = req.body;
    const saved = await saveUserProgression(req.user.userId, {
      unlockedAccessories,
      equippedAccessories,
      gamesCompleted,
      stars
    });

    logger.info('PROGRESSION', `Progresso sincronizado para "${req.user.username}" (${unlockedAccessories?.length || 0} acessórios)`);

    res.json({
      success: true,
      message: 'Progresso salvo no banco com sucesso!',
      progression: saved
    });
  } catch (err) {
    logger.error('PROGRESSION', `Erro ao salvar progressão (User ${req.user?.userId}): ${err.message}`);
    res.status(500).json({ error: 'Não foi possível salvar os novos acessórios.' });
  }
});

// Fallback para SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(rootDir, 'login.html'));
});

// Inicialização se executado diretamente
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  initDB().then(() => {
    app.listen(PORT, () => {
      logger.info('BOOT', `🌟 StartKids Server rodando em http://localhost:${PORT}`);
    });
  }).catch(err => {
    logger.warn('BOOT', `Iniciando servidor com fallback offline de banco de dados: ${err.message}`);
    app.listen(PORT, () => {
      logger.info('BOOT', `🌟 StartKids Server rodando em http://localhost:${PORT}`);
    });
  });
}

export default app;
