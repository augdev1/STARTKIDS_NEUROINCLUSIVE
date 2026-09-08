/* ==========================================================================
   MODO CALMA & DETECTOR GENTIL DE FRUSTRAÇÃO - PIP
   Detecção de sobrecarga sem julgamento + respiração guiada diafragmática.
   ========================================================================== */

import { sound } from './audio.js';
import { speech } from './speech.js';

export class CalmModeManager {
  constructor() {
    this.modal = null;
    this.toast = null;
    this.bubbleCore = null;
    this.instructionText = null;

    this.isOpen = false;
    this.breathingInterval = null;
    this.breathingStep = 0; // 0: Inhale (4s), 1: Hold (2s), 2: Exhale (4s)

    // Detecção de Frustração (Rage Clicks)
    this.clickHistory = [];
    this.lastInteractionTime = Date.now();
    this.inactivityTimer = null;
    this.isMissionActive = false;

    this.initListeners();
  }

  initElements() {
    this.modal = document.getElementById('calmModal');
    this.toast = document.getElementById('gentleToast');
    this.bubbleCore = document.querySelector('.breathing-bubble-core');
    this.instructionText = document.querySelector('.breathing-instruction-text');

    const exitBtn = document.getElementById('btnExitCalm');
    if (exitBtn) {
      exitBtn.addEventListener('click', () => this.close());
    }

    const toastYes = document.getElementById('btnToastCalmYes');
    const toastNo = document.getElementById('btnToastCalmNo');
    if (toastYes) {
      toastYes.addEventListener('click', () => {
        this.hideToast();
        this.open();
      });
    }
    if (toastNo) {
      toastNo.addEventListener('click', () => {
        this.hideToast();
      });
    }
  }

  initListeners() {
    // Escuta cliques para detectar hesitação ou cliques frenéticos repetitivos
    window.addEventListener('pointerdown', (e) => {
      this.lastInteractionTime = Date.now();
      if (!this.isMissionActive || this.isOpen) return;

      const now = Date.now();
      this.clickHistory.push({ x: e.clientX, y: e.clientY, time: now });

      // Mantém apenas os cliques dos últimos 2 segundos
      this.clickHistory = this.clickHistory.filter(c => now - c.time <= 2000);

      // Se houver 6 ou mais cliques rápidos e próximos
      if (this.clickHistory.length >= 6) {
        const first = this.clickHistory[0];
        const last = this.clickHistory[this.clickHistory.length - 1];
        const dist = Math.hypot(last.x - first.x, last.y - first.y);

        if (dist < 140) { // Cliques concentrados no mesmo ponto
          this.triggerGentlePrompt("O Pip notou muitos toques rápidos. Quer relaxar um pouquinho?");
          this.clickHistory = [];
        }
      }
    });

    // Verificador periódico de inatividade gentil (a cada 15s)
    setInterval(() => {
      if (!this.isMissionActive || this.isOpen) return;
      const inactiveSeconds = (Date.now() - this.lastInteractionTime) / 1000;
      if (inactiveSeconds > 45) {
        this.triggerGentlePrompt("Sem pressa! Quer fazer uma pausa suave para respirar?");
        this.lastInteractionTime = Date.now();
      }
    }, 15000);
  }

  setMissionState(active) {
    this.isMissionActive = active;
    this.lastInteractionTime = Date.now();
    this.clickHistory = [];
  }

  triggerGentlePrompt(message) {
    if (this.isOpen) return;
    const textEl = document.getElementById('toastPromptText');
    if (textEl) textEl.textContent = message;
    if (this.toast) {
      this.toast.classList.add('active');
      sound.playGuidance();
    }
  }

  hideToast() {
    if (this.toast) {
      this.toast.classList.remove('active');
    }
  }

  open() {
    this.isOpen = true;
    this.hideToast();
    if (this.modal) {
      this.modal.classList.add('active');
    }
    sound.startBreezeAmbient();
    this.startBreathingCycle();
  }

  close() {
    this.isOpen = false;
    if (this.modal) {
      this.modal.classList.remove('active');
    }
    sound.stopBreezeAmbient();
    this.stopBreathingCycle();
    this.lastInteractionTime = Date.now();
  }

  startBreathingCycle() {
    this.stopBreathingCycle();

    const phases = [
      { text: 'Inspire a brisa bem devagar...', duration: 4000, scale: 1.55, icon: '🌸' },
      { text: 'Segure o ar com carinho...', duration: 2000, scale: 1.55, icon: '✨' },
      { text: 'Solte o ar como uma pluma...', duration: 4000, scale: 1.0, icon: '🍃' }
    ];

    let currentPhaseIdx = 0;

    const runPhase = () => {
      if (!this.isOpen) return;
      const phase = phases[currentPhaseIdx];

      if (this.instructionText) {
        this.instructionText.textContent = phase.text;
      }
      if (this.bubbleCore) {
        this.bubbleCore.style.transition = `transform ${phase.duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        this.bubbleCore.style.transform = `scale(${phase.scale})`;
        this.bubbleCore.textContent = phase.icon;
      }

      // Som suave sutil na virada do ciclo
      if (currentPhaseIdx === 0) {
        sound.playTone(329.63, 1.5, 'sine');
      }

      speech.speak(phase.text);

      this.breathingInterval = setTimeout(() => {
        currentPhaseIdx = (currentPhaseIdx + 1) % phases.length;
        runPhase();
      }, phase.duration);
    };

    runPhase();
  }

  stopBreathingCycle() {
    if (this.breathingInterval) {
      clearTimeout(this.breathingInterval);
      this.breathingInterval = null;
    }
    speech.stop();
  }
}

export const calmMode = new CalmModeManager();
