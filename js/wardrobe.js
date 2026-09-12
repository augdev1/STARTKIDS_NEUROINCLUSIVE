/* ==========================================================================
   CAMARIM DO PIP (GUARDA-ROUPA DE 52 ACESSÓRIOS & PERSONALIZAÇÃO COMPLETA)
   Permite mudar Cor do Pip, Olhinhos, Boquinha, Bochechas e 52 Acessórios.
   Visualização em abas, equipar/desequipar em tempo real e persistência.
   ========================================================================== */

import { mascot } from './mascot.js';
import { sound } from './audio.js';
import { ACCESSORIES_DATABASE } from './accessoriesData.js';
import { 
  PIP_BODY_COLORS, 
  PIP_EYE_SHAPES, 
  PIP_MOUTH_SHAPES, 
  PIP_CHEEK_SHAPES 
} from './appearanceData.js';

export const WARDROBE_TABS = [
  { id: 'bodyColor', name: 'Cor do Pip', icon: '🎨' },
  { id: 'eyeShape', name: 'Olhinhos', icon: '👀' },
  { id: 'mouthShape', name: 'Boquinha', icon: '😊' },
  { id: 'cheekShape', name: 'Bochechas', icon: '🌸' },
  { id: 'all', name: 'Todos Acessórios', icon: '✨' },
  { id: 'hats', name: 'Chapéus', icon: '👒' },
  { id: 'face', name: 'Rosto', icon: '👓' },
  { id: 'clothes', name: 'Roupas', icon: '🧣' },
  { id: 'pets', name: 'Amiguinhos', icon: '🐾' },
  { id: 'auras', name: 'Auras', icon: '🌟' }
];

export class WardrobeManager {
  constructor() {
    this.currentCategory = 'bodyColor'; // Inicia exibindo as cores do Pip
    this.modal = null;
  }

  init() {
    this.modal = document.getElementById('wardrobeModal');
    if (!this.modal) return;
    
    // Botão de fechar camarim
    const btnClose = document.getElementById('btnCloseWardrobe');
    if (btnClose) {
      btnClose.addEventListener('click', () => this.close());
    }

    // Botões para abrir camarim (topo e no card do Pip)
    const btnOpenTop = document.getElementById('btnOpenWardrobeTop');
    const btnOpenCard = document.getElementById('btnOpenWardrobeCard');
    if (btnOpenTop) btnOpenTop.addEventListener('click', () => this.open());
    if (btnOpenCard) btnOpenCard.addEventListener('click', () => this.open());

    // Botões rápidos de traço no painel lateral
    const quickTraitBtns = this.modal.querySelectorAll('.btn-trait-pill');
    quickTraitBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-cat');
        if (cat) {
          this.currentCategory = cat;
          try {
            localStorage.setItem('starkids_wardrobe_cat', this.currentCategory);
          } catch (_) {}
          sound.playPop();
          this.renderCategoryTabs();
          this.render();
        }
      });
    });

    this.renderCategoryTabs();
  }

  open(category = null) {
    if (!this.modal) return;
    if (category) {
      this.currentCategory = category;
    }
    this.modal.classList.add('active');
    try {
      localStorage.setItem('starkids_wardrobe_open', 'true');
      localStorage.setItem('starkids_wardrobe_cat', this.currentCategory);
    } catch (_) {}
    sound.playPop();
    this.renderCategoryTabs();
    this.render();
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    try {
      localStorage.removeItem('starkids_wardrobe_open');
    } catch (_) {}
    sound.playPop();
    mascot.render();
  }

  renderCategoryTabs() {
    const tabsContainer = document.getElementById('wardrobeCategoryTabs');
    if (!tabsContainer) return;

    tabsContainer.innerHTML = WARDROBE_TABS.map(tab => `
      <button class="wardrobe-tab-btn ${tab.id === this.currentCategory ? 'active' : ''}" data-cat="${tab.id}">
        <span>${tab.icon}</span>
        <span>${tab.name}</span>
      </button>
    `).join('');

    tabsContainer.querySelectorAll('.wardrobe-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentCategory = btn.getAttribute('data-cat');
        try {
          localStorage.setItem('starkids_wardrobe_cat', this.currentCategory);
        } catch (_) {}
        sound.playPop();
        this.renderCategoryTabs();
        this.render();
      });
    });
  }

  render() {
    // 1. Atualiza o Pip de preview dentro do camarim
    const previewContainer = document.getElementById('wardrobePipPreview');
    if (previewContainer) {
      previewContainer.innerHTML = mascot.getSVG();
    }

    // 2. Atualiza contadores
    const count = mascot.data.unlockedAccessories.length;
    const total = ACCESSORIES_DATABASE.length;
    const countEl = document.getElementById('wardrobeProgressText');
    const fillEl = document.getElementById('wardrobeProgressBarFill');

    const isAppearanceTab = ['bodyColor', 'eyeShape', 'mouthShape', 'cheekShape'].includes(this.currentCategory);
    if (isAppearanceTab) {
      if (countEl) countEl.textContent = '✨ Personalização Livre do Pip';
      if (fillEl) fillEl.style.width = '100%';
    } else {
      if (countEl) countEl.textContent = `${count} de ${total} descobertos (${Math.round((count / total) * 100)}%)`;
      if (fillEl) fillEl.style.width = `${(count / total) * 100}%`;
    }

    // 3. Renderiza a grade de itens
    this.renderItemsGrid();
  }

  renderAppearanceGrid(type, items) {
    const grid = document.getElementById('wardrobeItemsGrid');
    if (!grid) return;

    const currentSelectedId = mascot.getAppearance(type);

    grid.innerHTML = items.map(item => {
      const isSelected = currentSelectedId === item.id;
      let previewHtml = '';

      if (type === 'bodyColor') {
        previewHtml = `
          <div class="appearance-color-circle" style="background: ${item.swatch}; border: 3.5px solid ${item.stroke};" title="${item.name}">
            <span class="color-sparkle-dot" style="background: ${item.stroke};"></span>
          </div>
        `;
      } else if (type === 'eyeShape') {
        previewHtml = `
          <div class="appearance-svg-preview">
            <svg viewBox="68 90 84 28" width="80" height="32" style="overflow: visible;">
              ${item.svg}
            </svg>
          </div>
        `;
      } else if (type === 'mouthShape') {
        previewHtml = `
          <div class="appearance-svg-preview">
            <svg viewBox="95 110 30 20" width="56" height="30" style="overflow: visible;">
              ${item.svg}
            </svg>
          </div>
        `;
      } else if (type === 'cheekShape') {
        previewHtml = item.id === 'none'
          ? `<div class="appearance-none-box">🌿 Sem bochechas</div>`
          : `
          <div class="appearance-svg-preview">
            <svg viewBox="60 108 100 20" width="80" height="22" style="overflow: visible;">
              ${item.svg}
            </svg>
          </div>
        `;
      }

      return `
        <div class="wardrobe-item-card appearance-card ${isSelected ? 'equipped is-selected' : ''}" 
             data-appearance-type="${type}" 
             data-appearance-id="${item.id}" 
             tabindex="0" 
             role="button"
             aria-label="${item.name}">
          <div class="item-icon-box appearance-box">
            ${previewHtml}
          </div>
          <div class="item-meta">
            <span class="item-name">${item.name}</span>
            <span class="item-desc">${item.desc}</span>
          </div>
          <span class="item-action-tag ${isSelected ? 'tag-equipped' : 'tag-equip'}">
            ${isSelected ? '✓ Escolhido' : 'Escolher'}
          </span>
        </div>
      `;
    }).join('');

    // Listener de clique para aplicar traço do mascote
    grid.querySelectorAll('.wardrobe-item-card[data-appearance-id]').forEach(card => {
      card.addEventListener('click', () => {
        const aType = card.getAttribute('data-appearance-type');
        const aId = card.getAttribute('data-appearance-id');
        mascot.setAppearance(aType, aId);
        sound.playPop();
        this.render();
      });
    });
  }

  renderItemsGrid() {
    if (this.currentCategory === 'bodyColor') {
      this.renderAppearanceGrid('bodyColor', PIP_BODY_COLORS);
      return;
    }
    if (this.currentCategory === 'eyeShape') {
      this.renderAppearanceGrid('eyeShape', PIP_EYE_SHAPES);
      return;
    }
    if (this.currentCategory === 'mouthShape') {
      this.renderAppearanceGrid('mouthShape', PIP_MOUTH_SHAPES);
      return;
    }
    if (this.currentCategory === 'cheekShape') {
      this.renderAppearanceGrid('cheekShape', PIP_CHEEK_SHAPES);
      return;
    }

    // Categorias de acessórios normais
    const grid = document.getElementById('wardrobeItemsGrid');
    if (!grid) return;

    const filtered = this.currentCategory === 'all'
      ? ACCESSORIES_DATABASE
      : ACCESSORIES_DATABASE.filter(item => item.category === this.currentCategory);

    grid.innerHTML = filtered.map(item => {
      const isUnlocked = mascot.isUnlocked(item.id);
      const isEquipped = mascot.isEquipped(item.id);

      if (!isUnlocked) {
        return `
          <div class="wardrobe-item-card locked" title="Ganhe no Baú Mágico ao completar um jogo!">
            <div class="item-icon-box">🔒</div>
            <div class="item-meta">
              <span class="item-name">Mistério</span>
              <span class="item-category">${item.category}</span>
            </div>
            <span class="item-action-tag">No Baú Mágico</span>
          </div>
        `;
      }

      return `
        <div class="wardrobe-item-card ${isEquipped ? 'equipped' : ''}" data-item-id="${item.id}" tabindex="0" role="button">
          <div class="item-icon-box">${item.icon}</div>
          <div class="item-meta">
            <span class="item-name">${item.name}</span>
            <span class="item-desc">${item.desc}</span>
          </div>
          <span class="item-action-tag ${isEquipped ? 'tag-equipped' : 'tag-equip'}">
            ${isEquipped ? '✓ Equipado' : '+ Equipar'}
          </span>
        </div>
      `;
    }).join('');

    // Adiciona listener nos cards desbloqueados
    grid.querySelectorAll('.wardrobe-item-card[data-item-id]').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-item-id');
        mascot.toggleEquip(id);
        sound.playPop();
        this.render();
      });
    });
  }
}

export const wardrobe = new WardrobeManager();
