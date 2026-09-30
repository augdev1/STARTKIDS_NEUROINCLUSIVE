import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

describe('Unit Harness: Acessibilidade (A11y), PWA e Neuroinclusão', () => {
  it('login.html deve conter lang="pt-BR" e meta viewport para responsividade', () => {
    const htmlPath = path.join(rootDir, 'login.html');
    assert.ok(fs.existsSync(htmlPath), 'login.html deve existir');

    const content = fs.readFileSync(htmlPath, 'utf-8');
    assert.match(content, /lang=["']pt-BR["']/i, 'Deve ter atributo de idioma pt-BR');
    assert.match(content, /<meta\s+name=["']viewport["']/i, 'Deve ter tag viewport');
    assert.match(content, /autocomplete=/i, 'Deve facilitar o preenchimento de inputs para neurodivergentes');
  });

  it('index.html deve conter estrutura acessível e neuroinclusiva', () => {
    const htmlPath = path.join(rootDir, 'index.html');
    assert.ok(fs.existsSync(htmlPath), 'index.html deve existir');

    const content = fs.readFileSync(htmlPath, 'utf-8');
    assert.match(content, /lang=["']pt-BR["']/i, 'index.html deve ter lang="pt-BR"');
    assert.match(content, /<meta\s+name=["']viewport["']/i, 'index.html deve ter meta viewport');
    assert.match(content, /manifest\.json/i, 'index.html deve vincular o manifest.json para PWA');
  });

  it('manifest.json deve estar configurado para suporte PWA offline e standalone', () => {
    const manifestPath = path.join(rootDir, 'manifest.json');
    assert.ok(fs.existsSync(manifestPath), 'manifest.json deve existir');

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    assert.ok(manifest.name, 'Manifest deve conter nome');
    assert.ok(manifest.short_name, 'Manifest deve conter short_name');
    assert.equal(manifest.display, 'standalone', 'Display deve ser standalone');
    assert.ok(Array.isArray(manifest.icons) && manifest.icons.length > 0, 'Deve ter ícones definidos');
  });

  it('sw.js (Service Worker) deve existir para garantir resiliência offline', () => {
    const swPath = path.join(rootDir, 'sw.js');
    assert.ok(fs.existsSync(swPath), 'sw.js deve existir na raiz');

    const swContent = fs.readFileSync(swPath, 'utf-8');
    assert.match(swContent, /install/i, 'Service Worker deve ouvir evento install');
    assert.match(swContent, /fetch/i, 'Service Worker deve ouvir evento fetch');
  });
});
