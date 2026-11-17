#!/usr/bin/env node

/**
 * StarKids - Quality Gate CLI para Avaliação de Prompts (Prompt Evals)
 * Executado no CI/CD Pipeline antes de qualquer build ou deploy para produção.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PROMPTS_CATALOG from '../../server/prompts/promptsCatalog.js';
import { runQualityGateSuite } from './prompt-evals-engine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log('\n🌟 =================================================================');
  console.log('   STARKIDS: PROMPT EVALS & PEDAGOGICAL QUALITY GATES (CI/CD)');
  console.log('=================================================================\n');

  // 1. Coleta todos os prompts do catálogo oficial
  const promptsToEvaluate = [];

  PROMPTS_CATALOG.greetings.forEach(p => promptsToEvaluate.push({ text: p, category: 'Greetings' }));
  PROMPTS_CATALOG.gentlePrompts.forEach(p => promptsToEvaluate.push({ text: p, category: 'Gentle Mode' }));
  PROMPTS_CATALOG.antiFrustration.forEach(p => promptsToEvaluate.push({ text: p, category: 'Anti-Frustration' }));

  Object.entries(PROMPTS_CATALOG.gameFeedbacks).forEach(([game, list]) => {
    list.forEach(p => promptsToEvaluate.push({ text: p, category: `Game Feedback: ${game}` }));
  });

  console.log(`📋 Total de Prompts em Catálogo Oficial: ${promptsToEvaluate.length} itens\n`);

  // 2. Executa a suíte de Quality Gates
  const report = runQualityGateSuite(promptsToEvaluate);

  // 3. Renderiza o Relatório no Terminal
  console.log('📊 MÉTRICAS DOS QUALITY GATES:');
  console.log('-----------------------------------------------------------------');
  console.log(`  🛡️  Safety & Child Protection Gate:   ${(report.scores.safety * 100).toFixed(0)}% (Mínimo: ${(report.thresholds.minSafetyScore * 100).toFixed(0)}%) -> ${report.scores.safety >= report.thresholds.minSafetyScore ? '✅ APROVADO' : '❌ REPROVADO'}`);
  console.log(`  💖  Neuroinclusion & Warmth Gate:     ${(report.scores.neuroinclusion * 100).toFixed(0)}% (Mínimo: ${(report.thresholds.minNeuroScore * 100).toFixed(0)}%) -> ${report.scores.neuroinclusion >= report.thresholds.minNeuroScore ? '✅ APROVADO' : '❌ REPROVADO'}`);
  console.log(`  🧠  Cognitive Load & Readability Gate: ${(report.scores.readability * 100).toFixed(0)}% (Mínimo: ${(report.thresholds.minReadabilityScore * 100).toFixed(0)}%) -> ${report.scores.readability >= report.thresholds.minReadabilityScore ? '✅ APROVADO' : '❌ REPROVADO'}`);
  console.log(`  🗣️  Neural TTS Readiness Gate:        ${(report.scores.tts * 100).toFixed(0)}% (Mínimo: ${(report.thresholds.minTTSScore * 100).toFixed(0)}%) -> ${report.scores.tts >= report.thresholds.minTTSScore ? '✅ APROVADO' : '❌ REPROVADO'}`);
  console.log('-----------------------------------------------------------------');
  console.log(`  ⭐  Score Geral Composto:             ${(report.scores.overall * 100).toFixed(0)}% (Mínimo: ${(report.thresholds.minOverallScore * 100).toFixed(0)}%)\n`);

  // 4. Salva o Relatório em Disco
  const reportsDir = path.join(__dirname, 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const reportPath = path.join(reportsDir, 'quality-gate-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`💾 Relatório de auditoria gerado em: ${reportPath}\n`);

  // 5. Decisão do Quality Gate
  if (report.qualityGatePassed) {
    console.log('🎉 =================================================================');
    console.log('   ✅ TODOS OS QUALITY GATES FORAM APROVADOS COM SUCESSO!');
    console.log('   Deploy liberado para o ambiente de produção.');
    console.log('=================================================================\n');
    process.exit(0);
  } else {
    console.error('🚨 =================================================================');
    console.error('   ❌ FALHA NO QUALITY GATE DE PROMPTS!');
    console.error('   O deploy foi BLOQUEADO para proteger as crianças e a plataforma.');
    console.error('=================================================================');
    console.error('\nMotivos da reprovação:');
    report.gateFailures.forEach(f => console.error(`  - ${f}`));
    if (report.failedDetails.length > 0) {
      console.error('\nPrompts que violaram as regras:');
      report.failedDetails.forEach(d => {
        console.error(`  * "${d.text}"`);
        Object.values(d.gates).filter(g => !g.passed).forEach(g => {
          console.error(`    ↳ [${g.gate}] ${g.reason}`);
        });
      });
    }
    console.error('');
    process.exit(1);
  }
}

main();
