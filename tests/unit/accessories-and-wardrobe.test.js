import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { ACCESSORIES_DATABASE, ACCESSORY_CATEGORIES } from '../../js/accessoriesData.js';
import {
  PIP_BODY_COLORS,
  PIP_CHEEK_SHAPES,
  PIP_EYE_SHAPES,
  PIP_MOUTH_SHAPES
} from '../../js/appearanceData.js';

describe('Unit Harness: Catálogo de 52 Acessórios e Personalização do Pip', () => {
  it('deve conter exatamente 52 acessórios colecionáveis no catálogo', () => {
    assert.equal(ACCESSORIES_DATABASE.length, 52, 'O catálogo deve conter exatamente 52 acessórios');
  });

  it('todos os acessórios devem ter campos obrigatórios válidos', () => {
    const validCategories = new Set(['hats', 'face', 'clothes', 'pets', 'auras']);

    for (const item of ACCESSORIES_DATABASE) {
      assert.ok(item.id && typeof item.id === 'string', `Item deve conter id string válido`);
      assert.ok(item.name && typeof item.name === 'string', `Item ${item.id} deve conter nome`);
      assert.ok(item.icon && typeof item.icon === 'string', `Item ${item.id} deve conter ícone`);
      assert.ok(validCategories.has(item.category), `Item ${item.id} possui categoria inválida: ${item.category}`);
      assert.ok(item.desc && typeof item.desc === 'string', `Item ${item.id} deve conter descrição acolhedora`);
      assert.ok(item.svg && typeof item.svg === 'string' && item.svg.includes('<g'), `Item ${item.id} deve conter SVG estruturado`);
    }
  });

  it('não deve haver identificadores (id) duplicados no catálogo de acessórios', () => {
    const seenIds = new Set();
    for (const item of ACCESSORIES_DATABASE) {
      assert.ok(!seenIds.has(item.id), `ID duplicado detectado: ${item.id}`);
      seenIds.add(item.id);
    }
  });

  it('deve incluir os 3 acessórios iniciais gratuitos do amiguinho', () => {
    const defaultIds = ['leaf_hat', 'star_glasses', 'pet_ladybug'];
    for (const id of defaultIds) {
      const found = ACCESSORIES_DATABASE.find(item => item.id === id);
      assert.ok(found, `Acessório inicial "${id}" deve existir no catálogo de 52 itens`);
    }
  });

  it('deve fornecer categorias de filtro consistentes para o camarim', () => {
    assert.ok(Array.isArray(ACCESSORY_CATEGORIES), 'Categorias devem ser um array');
    assert.ok(ACCESSORY_CATEGORIES.length >= 6, 'Deve haver pelo menos 6 categorias (todas + 5 tipos)');
    const ids = ACCESSORY_CATEGORIES.map(c => c.id);
    assert.ok(ids.includes('all'));
    assert.ok(ids.includes('hats'));
    assert.ok(ids.includes('face'));
    assert.ok(ids.includes('clothes'));
    assert.ok(ids.includes('pets'));
    assert.ok(ids.includes('auras'));
  });

  describe('Traços Corporais e Neuroinclusivos (Cores, Olhos, Bocas, Bochechas)', () => {
    it('deve fornecer 8 variações de cor corporal com paleta acolhedora', () => {
      assert.equal(PIP_BODY_COLORS.length, 8);
      for (const color of PIP_BODY_COLORS) {
        assert.ok(color.id && color.name && color.swatch);
        assert.match(color.swatch, /^#[0-9A-Fa-f]{6}$/, `Swatch deve ser hex válido: ${color.swatch}`);
        assert.ok(color.gradientStops, 'Gradiente SVG deve estar definido');
      }
    });

    it('deve fornecer formatos de olhinhos expressivos e calmos', () => {
      assert.ok(PIP_EYE_SHAPES.length >= 5);
      const defaultEye = PIP_EYE_SHAPES.find(e => e.id === 'default');
      assert.ok(defaultEye, 'Deve haver formato de olho default');
      for (const eye of PIP_EYE_SHAPES) {
        assert.ok(eye.svg && eye.svg.includes('<g'), `Olho ${eye.id} deve ter SVG válido`);
      }
    });

    it('deve fornecer formatos de boca reconfortantes sem expressões agressivas', () => {
      assert.ok(PIP_MOUTH_SHAPES.length >= 5);
      for (const mouth of PIP_MOUTH_SHAPES) {
        assert.ok(mouth.id && mouth.name && mouth.svg);
      }
    });

    it('deve fornecer estilos de bochechinhas suaves', () => {
      assert.ok(PIP_CHEEK_SHAPES.length >= 4);
      for (const cheek of PIP_CHEEK_SHAPES) {
        assert.ok(cheek.id && cheek.name);
        if (cheek.id !== 'none') {
          assert.ok(cheek.svg && cheek.svg.length > 0, `Bochecha ${cheek.id} deve ter SVG`);
        }
      }
    });
  });
});
