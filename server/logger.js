/* ==========================================================================
   SISTEMA DE LOGS E AUDITORIA - STARKIDS
   Registra requisições HTTP, autenticações, eventos do banco PostgreSQL
   e disponibiliza histórico recente para diagnóstico.
   ========================================================================== */

const MAX_LOG_BUFFER = 150;
const logBuffer = [];

const LOG_LEVELS = {
  INFO:  { emoji: 'ℹ️ ', tag: 'INFO' },
  AUTH:  { emoji: '🔑', tag: 'AUTH' },
  DB:    { emoji: '🗄️ ', tag: 'DB' },
  HTTP:  { emoji: '🌐', tag: 'HTTP' },
  WARN:  { emoji: '⚠️ ', tag: 'WARN' },
  ERROR: { emoji: '❌', tag: 'ERROR' }
};

function formatTimestamp(date = new Date()) {
  return date.toISOString().replace('T', ' ').substring(0, 19);
}

function pushLog(level, category, message, meta = null) {
  const entry = {
    id: Date.now() + Math.random().toString(36).substring(2, 6),
    timestamp: new Date().toISOString(),
    level,
    category,
    message,
    meta: meta ? (typeof meta === 'object' ? meta : { info: meta }) : null
  };

  logBuffer.push(entry);
  if (logBuffer.length > MAX_LOG_BUFFER) {
    logBuffer.shift();
  }

  const { emoji, tag } = LOG_LEVELS[level] || { emoji: '📌', tag: level };
  const metaStr = meta ? ` | ${JSON.stringify(meta)}` : '';
  const formattedLine = `[${formatTimestamp()}] ${emoji} [${tag}] [${category}] ${message}${metaStr}`;

  if (level === 'ERROR') {
    console.error(formattedLine);
  } else if (level === 'WARN') {
    console.warn(formattedLine);
  } else {
    console.log(formattedLine);
  }

  return entry;
}

export const logger = {
  info: (category, message, meta) => pushLog('INFO', category, message, meta),
  auth: (message, meta) => pushLog('AUTH', 'AUTHENTICATION', message, meta),
  db: (message, meta) => pushLog('DB', 'DATABASE', message, meta),
  http: (message, meta) => pushLog('HTTP', 'NETWORK', message, meta),
  warn: (category, message, meta) => pushLog('WARN', category, message, meta),
  error: (category, message, meta) => pushLog('ERROR', category, message, meta),

  /**
   * Middleware para Express registrar requisições automaticamente
   */
  middleware: () => (req, res, next) => {
    const start = Date.now();
    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';

    res.on('finish', () => {
      const duration = Date.now() - start;
      const status = res.statusCode;
      const method = req.method;
      const url = req.originalUrl || req.url;

      // Filtra arquivos estáticos com sucesso para não poluir os logs principais
      const isStaticAsset = url.match(/\.(css|js|png|jpg|jpeg|svg|ico|woff2?|map)$/i);
      if (isStaticAsset && status < 400) {
        return;
      }

      const level = status >= 500 ? 'ERROR' : status >= 400 ? 'WARN' : 'HTTP';
      const userTag = req.user ? ` [User: ${req.user.username}]` : '';

      pushLog(level, 'HTTP', `${method} ${url} -> ${status} (${duration}ms)${userTag}`, {
        ip: ip.split(',')[0].trim(),
        statusCode: status,
        durationMs: duration
      });
    });

    next();
  },

  /**
   * Retorna os logs recentes armazenados no buffer
   */
  getRecentLogs: ({ limit = 50, level = null } = {}) => {
    let result = [...logBuffer];
    if (level) {
      result = result.filter(l => l.level.toUpperCase() === level.toUpperCase());
    }
    return result.slice(-Math.min(limit, MAX_LOG_BUFFER)).reverse();
  },

  /**
   * Retorna estatísticas gerais de eventos
   */
  getStats: () => {
    const counts = { total: logBuffer.length, INFO: 0, AUTH: 0, DB: 0, HTTP: 0, WARN: 0, ERROR: 0 };
    for (const log of logBuffer) {
      if (counts[log.level] !== undefined) counts[log.level]++;
    }
    return counts;
  }
};
