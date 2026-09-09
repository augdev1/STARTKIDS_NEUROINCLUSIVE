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
app.use(express.json());
app.use(logger.middleware());

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
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      logger.warn('AUTH', 'Tentativa de cadastro com campos incompletos');
      return res.status(400).json({ error: 'Por favor, digite seu nome e uma senha mágica!' });
    }

    const cleanUsername = username.trim();
    if (cleanUsername.length < 2) {
      logger.warn('AUTH', `Tentativa de cadastro com nome muito curto: "${cleanUsername}"`);
      return res.status(400).json({ error: 'O nome de usuário precisa ter pelo menos 2 letras.' });
    }

    if (password.length < 3) {
      logger.warn('AUTH', `Tentativa de cadastro com senha muito curta para "${cleanUsername}"`);
      return res.status(400).json({ error: 'A senha precisa ter pelo menos 3 caracteres.' });
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
 * Login amigável
 */
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      logger.warn('AUTH', 'Tentativa de login sem usuário ou senha');
      return res.status(400).json({ error: 'Por favor, digite seu nome e senha para entrar.' });
    }

    const user = await findUserByUsername(username);
    if (!user) {
      logger.warn('AUTH', `Tentativa de login com usuário inexistente: "${username}"`);
      return res.status(401).json({ error: 'Não encontramos esse nome. Verifique se escreveu certinho ou crie sua conta!' });
    }

    const match = await comparePassword(password, user.password_hash);
    if (!match) {
      logger.warn('AUTH', `Senha incorreta para o amiguinho "${username}"`);
      return res.status(401).json({ error: 'Senha incorreta! Não se preocupe, tente digitar novamente com calma.' });
    }

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
