/* ==========================================================================
   APLICAÇÃO PRINCIPAL - PIP: AVENTURAS SENSORIAIS
   Orquestração geral: 5 Jogos Educativos, Camarim de 52 Acessórios, Modo Calma.
   ========================================================================== */

import { sound } from './audio.js';
import { speech } from './speech.js';
import { mascot } from './mascot.js';
import { calmMode } from './calmMode.js';
import { wardrobe } from './wardrobe.js';
import { authService } from './authService.js';
import { EducationalGamesManager } from './educationalGames.js';

class App {
  constructor() {
    this.games = new EducationalGamesManager(this);
    this.calmMode = calmMode;
    this.mascot = mascot;
    this.wardrobe = wardrobe;
    this.auth = authService;

    this.pipPhrases = [
      "Olá, amiguinho! O que vamos aprender hoje?",
      "Aqui não temos pressa. O seu tempo é perfeito!",
      "Vamos abrir novos acessórios no Camarim?",
      "Se cansar, respire uma brisa comigo!",
      "Que alegria brincar e aprender com você!"
    ];

    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.calmMode.initElements();
      this.mascot.render();
      this.wardrobe.init();
      this.auth.init();
      this.bindControls();
      this.bindGamesList();
      this.initMascotPhrases();
      this.restoreAppState();
      window.EmojiEnhancer?.enhance(document.body);

      // Escuta atualizações de progressão sincronizadas do banco PostgreSQL
      window.addEventListener('starkids-progression-updated', () => {
        if (this.wardrobe && typeof this.wardrobe.render === 'function') {
          this.wardrobe.render();
        }
        if (this.mascot && typeof this.mascot.render === 'function') {
          this.mascot.render();
        }
      });

      // Escuta evento de logout para redirecionar à página de login com dados limpos
      window.addEventListener('starkids-user-logged-out', () => {
        if (this.wardrobe && typeof this.wardrobe.render === 'function') {
          this.wardrobe.render();
        }
        if (this.mascot && typeof this.mascot.render === 'function') {
          this.mascot.render();
        }
      });

      // Primeiro clique inicializa o contexto de áudio
      window.addEventListener('click', () => sound.ensureContext(), { once: true });
      window.addEventListener('touchstart', () => sound.ensureContext(), { once: true });
    });
  }

  bindControls() {
    // 1. Alternador de Som / Efeitos Pentatônicos
    const btnSound = document.getElementById('btnToggleSound');
    if (btnSound) {
      btnSound.addEventListener('click', () => {
        const isMuted = sound.toggleMute();
        btnSound.innerHTML = isMuted ? '<span>🔇</span><span>Sem Som</span>' : '<span>🔔</span><span>Sons Suaves</span>';
        btnSound.classList.toggle('active', !isMuted);
      });
    }

    // 2. Alternador de Narração em Voz Alta
    const btnSpeech = document.getElementById('btnToggleSpeech');
    if (btnSpeech) {
      btnSpeech.addEventListener('click', () => {
        const isEnabled = speech.toggleNarrator();
        btnSpeech.classList.toggle('active', isEnabled);
        btnSpeech.innerHTML = isEnabled ? '<span>🗣️</span><span>Voz Ligada</span>' : '<span>🔈</span><span>Voz Guia</span>';
        if (isEnabled) {
          speech.speak("Voz guia ativada! Sempre que quiser, tocarei as instruções em voz alta para você.", true);
        }
      });
    }

    // 3. Redução de Movimento
    const btnMotion = document.getElementById('btnToggleMotion');
    if (btnMotion) {
      btnMotion.addEventListener('click', () => {
        const isReduced = document.body.classList.toggle('reduced-motion');
        try {
          localStorage.setItem('starkids_reduced_motion', isReduced ? 'true' : 'false');
        } catch (_) {}
        btnMotion.classList.toggle('active', isReduced);
        btnMotion.innerHTML = isReduced ? '<span>⏸️</span><span>Sem Movimento</span>' : '<span>🌀</span><span>Movimento Suave</span>';
      });
    }

    // 4. Modo Alto Contraste Acolhedor
    const btnContrast = document.getElementById('btnToggleContrast');
    if (btnContrast) {
      btnContrast.addEventListener('click', () => {
        const isHigh = document.body.classList.toggle('high-contrast');
        try {
          localStorage.setItem('starkids_high_contrast', isHigh ? 'true' : 'false');
        } catch (_) {}
        btnContrast.classList.toggle('active', isHigh);
      });
    }

    // 5. Botão de Respiração / Modo Calma
    const btnCalm = document.getElementById('btnTriggerCalm');
    if (btnCalm) {
      btnCalm.addEventListener('click', () => {
        this.calmMode.open();
      });
    }

    // 6. Botão de Abrir Camarim pelo Banner Hero
    const btnHeroWardrobe = document.getElementById('btnOpenWardrobeFromHero');
    if (btnHeroWardrobe) {
      btnHeroWardrobe.addEventListener('click', () => {
        this.wardrobe.open();
      });
    }

    // 7. Voltar ao Jardim / Hub
    const btnBack = document.getElementById('btnBackToHub');
    if (btnBack) {
      btnBack.addEventListener('click', () => {
        speech.stop();
        this.games.clearActiveGameState();
        this.showView('hub');
        this.calmMode.setMissionState(false);
        sound.playPop();
      });
    }

    const brandSection = document.querySelector('.brand-section');
    if (brandSection) {
      brandSection.addEventListener('click', () => {
        speech.stop();
        this.games.clearActiveGameState();
        this.showView('hub');
        this.calmMode.setMissionState(false);
        sound.playPop();
      });
    }
  }

  bindGamesList() {
    const gameCards = document.querySelectorAll('.game-hub-card');
    gameCards.forEach(card => {
      card.addEventListener('click', () => {
        speech.stop();
        const gameId = parseInt(card.getAttribute('data-game-id'), 10);
        sound.playChord([261.63, 329.63, 392.00]);
        this.games.startGame(gameId);
      });
    });
  }

  initMascotPhrases() {
    const bubbleText = document.getElementById('pipGreetingText');
    const btnSpeakBubble = document.getElementById('btnSpeakBubble');

    let currentPhraseIndex = 0;
    const updatePhrase = () => {
      if (!bubbleText) return;
      const text = this.pipPhrases[currentPhraseIndex];
      bubbleText.textContent = text;
    };

    updatePhrase();

    if (btnSpeakBubble) {
      btnSpeakBubble.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = bubbleText.textContent;
        speech.speak(text, true);
      });
    }

    const bubbleContainer = document.querySelector('.pip-speech-bubble');
    if (bubbleContainer) {
      bubbleContainer.addEventListener('click', () => {
        currentPhraseIndex = (currentPhraseIndex + 1) % this.pipPhrases.length;
        updatePhrase();
        sound.playPop();
      });
    }
  }

  /**
   * Restaura preferências sensoriais de acessibilidade do HUD
   */
  restoreAccessibilitySettings() {
    // 1. Som
    const btnSound = document.getElementById('btnToggleSound');
    if (btnSound) {
      const isMuted = sound.isMuted;
      btnSound.innerHTML = isMuted ? '<span>🔇</span><span>Sem Som</span>' : '<span>🔔</span><span>Sons Suaves</span>';
      btnSound.classList.toggle('active', !isMuted);
    }

    // 2. Voz Guia
    const btnSpeech = document.getElementById('btnToggleSpeech');
    if (btnSpeech) {
      const isSpeech = speech.isNarratorEnabled;
      btnSpeech.classList.toggle('active', isSpeech);
      btnSpeech.innerHTML = isSpeech ? '<span>🗣️</span><span>Voz Ligada</span>' : '<span>🔈</span><span>Voz Guia</span>';
    }

    // 3. Movimento
    const isMotionReduced = localStorage.getItem('starkids_reduced_motion') === 'true';
    if (isMotionReduced) {
      document.body.classList.add('reduced-motion');
    }
    const btnMotion = document.getElementById('btnToggleMotion');
    if (btnMotion) {
      btnMotion.classList.toggle('active', isMotionReduced);
      btnMotion.innerHTML = isMotionReduced ? '<span>⏸️</span><span>Sem Movimento</span>' : '<span>🌀</span><span>Movimento Suave</span>';
    }

    // 4. Alto Contraste
    const isContrastHigh = localStorage.getItem('starkids_high_contrast') === 'true';
    if (isContrastHigh) {
      document.body.classList.add('high-contrast');
    }
    const btnContrast = document.getElementById('btnToggleContrast');
    if (btnContrast) {
      btnContrast.classList.toggle('active', isContrastHigh);
    }
  }

  /**
   * Restaura o estado da aplicação (tela do jogo, rodada, camarim ou modo calma)
   */
  restoreAppState() {
    this.restoreAccessibilitySettings();

    const activeView = localStorage.getItem('starkids_active_view') || 'hub';
    const hasActiveSession = !!localStorage.getItem('starkids_active_game_session');

    if (activeView === 'game' && hasActiveSession) {
      const restored = this.games.restoreActiveGame();
      if (!restored) {
        this.showView('hub');
      }
    } else {
      this.showView('hub');

      // Se o camarim ou o modo calma estavam abertos antes do reload
      if (localStorage.getItem('starkids_wardrobe_open') === 'true') {
        const savedCat = localStorage.getItem('starkids_wardrobe_cat') || 'all';
        this.wardrobe.open(savedCat);
      } else if (localStorage.getItem('starkids_calm_open') === 'true') {
        this.calmMode.open();
      }
    }
  }

  showView(viewName, options = {}) {
    // Interrompe imediatamente qualquer locução anterior ao trocar de tela
    speech.stop();

    document.querySelectorAll('.view-section').forEach(view => {
      view.classList.remove('active');
    });

    const target = document.getElementById(`view-${viewName}`);
    if (target) {
      target.classList.add('active');
      window.EmojiEnhancer?.enhance(target);
    }

    if (!options.skipSave) {
      try {
        localStorage.setItem('starkids_active_view', viewName);
      } catch (_) {}
    }

    if (viewName === 'hub') {
      this.mascot.render();
    }
  }
}

const app = new App();
export default app;
