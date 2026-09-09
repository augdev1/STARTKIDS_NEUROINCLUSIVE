#!/usr/bin/env node

import { execSync } from 'child_process';
import readline from 'readline';

function run(command, silent = false) {
  try {
    return execSync(command, { encoding: 'utf-8', stdio: silent ? 'pipe' : 'inherit' });
  } catch (err) {
    if (silent) return null;
    throw err;
  }
}

function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
  console.log('\n🚀 ==========================================');
  console.log('   STARKIDS: COMMIT & DEPLOY INSTANTÂNEO');
  console.log('==========================================\n');

  // 1. Checagem de Sintaxe
  console.log('🔍 [1/4] Verificando integridade e sintaxe do código...');
  try {
    execSync('npm run test:syntax', { stdio: 'inherit' });
    console.log('✅ Sintaxe validada com sucesso!\n');
  } catch (err) {
    console.error('\n❌ Erro de sintaxe detectado! Corrija os arquivos antes de subir para produção.');
    process.exit(1);
  }

  // 2. Status do Git
  console.log('📂 [2/4] Verificando alterações no repositório...');
  const status = execSync('git status --porcelain', { encoding: 'utf-8' }).trim();
  if (!status) {
    console.log('ℹ️ Nenhuma alteração encontrada para commitar. Seu repositório já está 100% atualizado!\n');
    return;
  }

  console.log(status);
  console.log('');

  // 3. Definir Mensagem de Commit
  let message = process.argv.slice(2).join(' ').trim();
  if (!message) {
    const now = new Date().toLocaleString('pt-BR');
    message = `chore: atualização automática e sincronização [${now}]`;
  }

  console.log(`💬 [3/4] Mensagem do Commit: "${message}"\n`);

  // 4. Executar Git Add, Commit e Push
  console.log('⬆️  [4/4] Enviando para o GitHub (Disparando CI/CD e Vercel)...');
  try {
    run('git add .');
    run(`git commit -m "${message.replace(/"/g, '\\"')}"`);
    run('git push origin main');

    console.log('\n🎉 ========================================================');
    console.log('   DEPLOYS DISPARADOS COM SUCESSO!');
    console.log('   - GitHub Actions: Validação em andamento');
    console.log('   - Vercel: Atualização do Frontend instantânea');
    console.log('   - Render: Atualização do Backend automática');
    console.log('========================================================\n');
  } catch (err) {
    console.error('\n❌ Ocorreu um erro ao enviar para o Git:', err.message);
    process.exit(1);
  }
}

main();
