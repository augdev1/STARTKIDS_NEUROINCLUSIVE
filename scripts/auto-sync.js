#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const DEBOUNCE_MS = 12000; // 12 segundos após a última edição para evitar commits fragmentados
const IGNORE_PATTERNS = [
  /[\\/]\.git([\\/]|$)/,
  /[\\/]node_modules([\\/]|$)/,
  /[\\/]\.vercel([\\/]|$)/,
  /[\\/]data[\\/]local_db\.json$/,
  /[\\/]scratch/,
  /\.log$/
];

let syncTimeout = null;
let changedFiles = new Set();
let isSyncing = false;

function shouldIgnore(filePath) {
  return IGNORE_PATTERNS.some(pattern => pattern.test(filePath));
}

function doAutoDeploy() {
  if (isSyncing) return;
  isSyncing = true;

  try {
    const status = execSync('git status --porcelain', { cwd: rootDir, encoding: 'utf-8' }).trim();
    if (!status) {
      isSyncing = false;
      changedFiles.clear();
      return;
    }

    console.log('\n⚡ [Auto-Deploy] Alterações detectadas. Iniciando validação...');

    // 1. Checagem de sintaxe
    try {
      execSync('npm run test:syntax', { cwd: rootDir, stdio: 'pipe' });
    } catch (err) {
      console.warn('⚠️ [Auto-Deploy] Erro de sintaxe detectado. O deploy foi adiado até o código ser corrigido.');
      isSyncing = false;
      return;
    }

    const fileList = Array.from(changedFiles).map(f => path.basename(f)).join(', ') || 'arquivos modificados';
    const now = new Date().toLocaleTimeString('pt-BR');
    const commitMsg = `auto: sincronização automática [${now}] - (${fileList})`;

    console.log(`📦 [Auto-Deploy] Commitando: "${commitMsg}"...`);
    execSync('git add .', { cwd: rootDir, stdio: 'pipe' });
    execSync(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`, { cwd: rootDir, stdio: 'pipe' });
    
    console.log('🚀 [Auto-Deploy] Enviando para o GitHub (Vercel & Render atualizando instantaneamente)...');
    execSync('git push origin main', { cwd: rootDir, stdio: 'pipe' });

    console.log(`✅ [Auto-Deploy] Deploy concluído com sucesso às ${now}!\n`);
  } catch (err) {
    console.error('❌ [Auto-Deploy] Erro ao sincronizar com o Git:', err.message);
  } finally {
    changedFiles.clear();
    isSyncing = false;
  }
}

function watchDirectory(dir) {
  try {
    fs.watch(dir, { recursive: true }, (eventType, filename) => {
      if (!filename) return;
      const fullPath = path.join(dir, filename);
      if (shouldIgnore(fullPath)) return;

      changedFiles.add(fullPath);
      clearTimeout(syncTimeout);

      process.stdout.write(`\r📝 Arquivo modificado: ${filename} (Auto-deploy em ${DEBOUNCE_MS / 1000}s...)   `);
      syncTimeout = setTimeout(doAutoDeploy, DEBOUNCE_MS);
    });
  } catch (err) {
    console.error('Erro ao monitorar diretório:', err.message);
  }
}

console.log('\n👀 ========================================================');
console.log('   STARKIDS: MODO DEPLOY AUTOMÁTICO (WATCHER ATIVO)');
console.log('   Qualquer arquivo que você salvar será enviado');
console.log('   automaticamente para o GitHub, Vercel e Render!');
console.log('   (Pressione Ctrl + C para encerrar quando quiser)');
console.log('========================================================\n');

watchDirectory(rootDir);
