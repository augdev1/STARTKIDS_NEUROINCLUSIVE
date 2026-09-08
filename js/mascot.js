/* ==========================================================================
   MASCOTE PIP & SISTEMA MULTICAMADAS DE 50+ ACESSÓRIOS
   Suporta até 5 camadas simultâneas (Aura, Roupa, Rosto, Chapéu, Amiguinho)
   ========================================================================== */

import { sound } from './audio.js';
import { ACCESSORIES_DATABASE } from './accessoriesData.js';
import { authService } from './authService.js';

export class MascotManager {
  constructor() {
    this.data = this.loadData();

    // Escuta atualizações vindas do banco de dados PostgreSQL
    window.addEventListener('starkids-progression-updated', (e) => {
      const prog = e.detail;
      if (prog) {
        this.applyProgression(prog);
      }
    });

    // Escuta evento de logout para resetar o mascote imediatamente
    window.addEventListener('starkids-user-logged-out', () => {
      this.resetToDefault();
    });
  }

  getStorageKey() {
    try {
      const user = JSON.parse(localStorage.getItem('starkids_user') || 'null');
      if (user && user.id) {
        return `pip_game_data_user_${user.id}`;
      }
    } catch (e) {}
    return 'pip_game_data_guest';
  }

  getDefaultData() {
    return {
      unlockedAccessories: ['leaf_hat', 'star_glasses', 'pet_ladybug'],
      equipped: {
        hats: 'leaf_hat',
        face: null,
        clothes: null,
        pets: null,
        auras: null
      },
      completedGamesCount: 0,
      starsCount: 3
    };
  }

  loadData() {
    const key = this.getStorageKey();
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.equipped || typeof parsed.equipped !== 'object') {
          parsed.equipped = { hats: 'leaf_hat', face: null, clothes: null, pets: null, auras: null };
        }
        return parsed;
      } catch (e) {}
    }
    return this.getDefaultData();
  }

  applyProgression(prog) {
    if (!prog) return;
    this.data = {
      unlockedAccessories: Array.isArray(prog.unlocked_accessories) 
        ? [...prog.unlocked_accessories] 
        : ['leaf_hat', 'star_glasses', 'pet_ladybug'],
      equipped: (prog.equipped_accessories && typeof prog.equipped_accessories === 'object') 
        ? { ...prog.equipped_accessories } 
        : { hats: 'leaf_hat', face: null, clothes: null, pets: null, auras: null },
      completedGamesCount: Array.isArray(prog.games_completed) ? prog.games_completed.length : 0,
      starsCount: typeof prog.stars === 'number' ? prog.stars : 3
    };
    this.saveData(false);
    this.render();
  }

  resetToDefault() {
    this.data = this.getDefaultData();
    try {
      const key = this.getStorageKey();
      localStorage.removeItem(key);
    } catch (e) {}
    this.render();
  }

  saveData(shouldSync = true) {
    try {
      const key = this.getStorageKey();
      localStorage.setItem(key, JSON.stringify(this.data));
    } catch (e) {}
    if (shouldSync && authService && typeof authService.syncProgression === 'function') {
      authService.syncProgression({
        unlockedAccessories: this.data.unlockedAccessories,
        equippedAccessories: this.data.equipped,
        stars: this.data.starsCount
      });
    }
  }

  // Desbloqueia a próxima recompensa mágica (usado no Baú)
  unlockNextReward() {
    const lockedItems = ACCESSORIES_DATABASE.filter(item => !this.data.unlockedAccessories.includes(item.id));
    if (lockedItems.length === 0) {
      // Se já desbloqueou todos os 52, retorna um item aleatório para celebrar
      const randomItem = ACCESSORIES_DATABASE[Math.floor(Math.random() * ACCESSORIES_DATABASE.length)];
      return { item: randomItem, isNew: false, totalUnlocked: ACCESSORIES_DATABASE.length };
    }

    // Pega o próximo item ou um aleatório entre os bloqueados
    const reward = lockedItems[Math.floor(Math.random() * lockedItems.length)];
    this.data.unlockedAccessories.push(reward.id);
    this.data.starsCount++;
    this.data.completedGamesCount++;
    this.saveData();

    return { item: reward, isNew: true, totalUnlocked: this.data.unlockedAccessories.length };
  }

  // Equipa ou desequipa um acessório na sua categoria
  toggleEquip(id) {
    const item = ACCESSORIES_DATABASE.find(a => a.id === id);
    if (!item) return;

    if (!this.data.unlockedAccessories.includes(id)) return;

    const cat = item.category;
    if (this.data.equipped[cat] === id) {
      this.data.equipped[cat] = null; // Desequipa
    } else {
      this.data.equipped[cat] = id; // Equipa
    }

    this.saveData();
    this.render();
  }

  isEquipped(id) {
    const item = ACCESSORIES_DATABASE.find(a => a.id === id);
    if (!item) return false;
    return this.data.equipped[item.category] === id;
  }

  isUnlocked(id) {
    return this.data.unlockedAccessories.includes(id);
  }

  // Gera o SVG multicamadas do Pip
  getSVG() {
    // 1. Acessórios equipados
    const auraId = this.data.equipped.auras;
    const hatId = this.data.equipped.hats;
    const faceId = this.data.equipped.face;
    const clothesId = this.data.equipped.clothes;
    const petId = this.data.equipped.pets;

    const auraItem = auraId ? ACCESSORIES_DATABASE.find(a => a.id === auraId) : null;
    const hatItem = hatId ? ACCESSORIES_DATABASE.find(a => a.id === hatId) : null;
    const faceItem = faceId ? ACCESSORIES_DATABASE.find(a => a.id === faceId) : null;
    const clothesItem = clothesId ? ACCESSORIES_DATABASE.find(a => a.id === clothesId) : null;
    const petItem = petId ? ACCESSORIES_DATABASE.find(a => a.id === petId) : null;

    return `
      <svg viewBox="0 0 220 220" width="100%" height="100%" class="anim-pip-breathe" style="overflow: visible; display: block;">
        <defs>
          <radialGradient id="pipGlow" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stop-color="#FFFFFF" />
            <stop offset="60%" stop-color="#EBF4F2" />
            <stop offset="100%" stop-color="#D5E8E2" />
          </radialGradient>
          <filter id="gentleShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#3D6656" flood-opacity="0.12" />
          </filter>
        </defs>

        <!-- CAMADA 1: AURA (ao redor do corpinho) -->
        ${auraItem ? auraItem.svg : ''}

        <!-- CAMADA 1.5: TECIDO DE FUNDO / CAPA (atrás do corpinho do Pip) -->
        ${clothesItem && clothesItem.svgBack ? clothesItem.svgBack : ''}

        <!-- Sombra no Chão (delimitada e suave) -->
        <ellipse cx="110" cy="200" rx="62" ry="10" fill="rgba(90, 143, 123, 0.15)" />

        <!-- CAMADA 2: CORPO DO PIP -->
        <g filter="url(#gentleShadow)">
          <path d="M110 32 C65 32 45 75 45 125 C45 175 70 195 110 195 C150 195 175 175 175 125 C175 75 155 32 110 32 Z"
                fill="url(#pipGlow)" stroke="#B3D4C9" stroke-width="2.5" />
        </g>

        <!-- Patinhas Suaves -->
        <ellipse cx="78" cy="194" rx="14" ry="9" fill="#D5E8E2" stroke="#B3D4C9" stroke-width="2" />
        <ellipse cx="142" cy="194" rx="14" ry="9" fill="#D5E8E2" stroke="#B3D4C9" stroke-width="2" />

        <!-- Braços / Asinhas Macias -->
        <ellipse cx="48" cy="132" rx="10" ry="18" transform="rotate(-15 48 132)" fill="#D5E8E2" stroke="#B3D4C9" stroke-width="2" />
        <ellipse cx="172" cy="132" rx="10" ry="18" transform="rotate(15 172 132)" fill="#D5E8E2" stroke="#B3D4C9" stroke-width="2" />

        <!-- Bochechinhas Rosadas Suaves -->
        <circle cx="70" cy="118" r="11" fill="#FCE0E5" opacity="0.8" />
        <circle cx="150" cy="118" r="11" fill="#FCE0E5" opacity="0.8" />

        <!-- Olhos Doces e Acolhedores -->
        <g class="anim-pip-eye">
          <ellipse cx="82" cy="104" rx="6.5" ry="9.5" fill="#2C3E38" />
          <circle cx="80" cy="100" r="2.5" fill="#FFFFFF" />
          
          <ellipse cx="138" cy="104" rx="6.5" ry="9.5" fill="#2C3E38" />
          <circle cx="136" cy="100" r="2.5" fill="#FFFFFF" />
        </g>

        <!-- Sorriso Calmo -->
        <path d="M102 118 Q110 126 118 118" stroke="#2C3E38" stroke-width="2.8" stroke-linecap="round" fill="none" />

        <!-- CAMADA 3: ROUPAS, GOLAS E BROCHES FRONTAIS -->
        ${clothesItem ? clothesItem.svg : ''}

        <!-- CAMADA 4: ROSTO E ÓCULOS -->
        ${faceItem ? faceItem.svg : ''}

        <!-- CAMADA 5: CHAPÉU -->
        ${hatItem ? hatItem.svg : ''}

        <!-- CAMADA 6: AMIGUINHO DE COLO / OMBRO -->
        ${petItem ? petItem.svg : ''}
      </svg>
    `;
  }

  render() {
    const containers = document.querySelectorAll('.pip-avatar-container');
    const svgHTML = this.getSVG();
    containers.forEach(c => {
      c.innerHTML = svgHTML;
      c.onclick = () => {
        sound.playChord([440, 523.25, 659.25]);
        c.classList.remove('anim-float');
        void c.offsetWidth;
        c.classList.add('anim-float');
      };
    });

    this.renderTopCollectionBadge();
  }

  renderTopCollectionBadge() {
    const unlocked = this.data.unlockedAccessories.length;
    const total = ACCESSORIES_DATABASE.length;
    const badge = document.getElementById('collectionCounterBadge');
    if (badge) {
      badge.textContent = `${unlocked} / ${total}`;
    }
    const heroCount = document.getElementById('heroProgressCount');
    if (heroCount) {
      heroCount.textContent = `${unlocked} / ${total} Coletados`;
    }
    const heroFill = document.getElementById('heroProgressFill');
    if (heroFill) {
      heroFill.style.width = `${Math.max(6, (unlocked / total) * 100)}%`;
    }
  }
}

export const mascot = new MascotManager();
