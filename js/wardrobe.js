/* ==========================================================================
   CAMARIM DO PIP (GUARDA-ROUPA DE 52 ACESSÓRIOS)
   Visualização por abas, contagem de coleção, equipar/desequipar em tempo real.
   ========================================================================== */

import { mascot } from './mascot.js';
import { sound } from './audio.js';
import { ACCESSORIES_DATABASE, ACCESSORY_CATEGORIES } from './accessoriesData.js';

export class WardrobeManager {
  constructor() {
    this.currentCategory = 'all';
    this.modal = null;
  }

  init() {
    this.modal = document.getElementById('wardrobeModal');
    
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

    tabsContainer.innerHTML = ACCESSORY_CATEGORIES.map(cat => `
      <button class="wardrobe-tab-btn ${cat.id === this.currentCategory ? 'active' : ''}" data-cat="${cat.id}">
        <span>${cat.icon}</span>
        <span>${cat.name}</span>
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
        this.renderItemsGrid();
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
    if (countEl) countEl.textContent = `${count} de ${total} descobertos (${Math.round((count / total) * 100)}%)`;
    if (fillEl) fillEl.style.width = `${(count / total) * 100}%`;

    // 3. Renderiza a grade de itens
    this.renderItemsGrid();
  }

  renderItemsGrid() {
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
