/* ==========================================================================
   MICROMISSÕES SENSORIAIS (2-4 MIN) - PIP: AVENTURAS SENSORIAIS
   Zero punição, andaime cognitivo progressivo, recompensas imediatas.
   ========================================================================== */

import { sound } from './audio.js';
import { speech } from './speech.js';
import { mascot } from './mascot.js';

export class MissionsManager {
  constructor(app) {
    this.app = app;
    this.currentMissionId = null;
    this.currentStep = 0;
    this.totalSteps = 3;
    this.attemptsOnCurrentStep = 0;

    // Estado da Missão 1
    this.selectedCrystal = null;
    this.matchedCrystals = 0;

    // Estado da Missão 2
    this.currentStarExpected = 1;

    // Estado da Missão 3
    this.wateredFlowers = 0;
  }

  startMission(missionId) {
    this.currentMissionId = missionId;
    this.currentStep = 1;
    this.attemptsOnCurrentStep = 0;

    this.app.showView('mission');
    this.app.calmMode.setMissionState(true);

    const stepDots = document.querySelectorAll('.step-dot');
    stepDots.forEach((dot, idx) => {
      dot.className = 'step-dot' + (idx === 0 ? ' active' : '');
    });

    const celebration = document.getElementById('celebrationOverlay');
    if (celebration) celebration.classList.remove('active');

    if (missionId === 1) {
      this.setupMission1();
    } else if (missionId === 2) {
      this.setupMission2();
    } else if (missionId === 3) {
      this.setupMission3();
    }
  }

  updateStep(stepNumber) {
    this.currentStep = stepNumber;
    this.attemptsOnCurrentStep = 0;
    const stepDots = document.querySelectorAll('.step-dot');
    stepDots.forEach((dot, idx) => {
      if (idx + 1 < stepNumber) {
        dot.className = 'step-dot done';
      } else if (idx + 1 === stepNumber) {
        dot.className = 'step-dot active';
      } else {
        dot.className = 'step-dot';
      }
    });
  }

  // ==========================================================================
  // MISSÃO 1: CRISTAIS DO VENTO (Organização Sensorial)
  // ==========================================================================
  setupMission1() {
    this.matchedCrystals = 0;
    this.selectedCrystal = null;

    const instructionEl = document.getElementById('missionInstruction');
    const instructionText = "Ajude o Pip a colocar cada cristal luminoso no seu pedestal mágico correspondente.";
    instructionEl.innerHTML = `
      <span>💎 ${instructionText}</span>
      <button class="btn-speak-inline" id="btnSpeakMission" title="Ouvir instrução">🔊</button>
    `;

    document.getElementById('btnSpeakMission').onclick = () => speech.speak(instructionText, true);
    speech.speak(instructionText);

    const stage = document.getElementById('missionStage');
    stage.innerHTML = `
      <div class="crystals-board">
        <!-- Pedestais Alvo -->
        <div class="crystal-targets">
          <div class="pedestal-slot" data-color="cyan" id="pedestal-cyan">
            <span class="pedestal-hint-icon">💧</span>
            <span class="pedestal-label">Orvalho</span>
          </div>
          <div class="pedestal-slot" data-color="rose" id="pedestal-rose">
            <span class="pedestal-hint-icon">🌸</span>
            <span class="pedestal-label">Pétala</span>
          </div>
          <div class="pedestal-slot" data-color="amber" id="pedestal-amber">
            <span class="pedestal-hint-icon">☀️</span>
            <span class="pedestal-label">Sol</span>
          </div>
        </div>

        <!-- Cristais para Selecionar ou Arrastar -->
        <div class="crystal-items">
          <div class="crystal-item rose" data-color="rose" tabindex="0" role="button" aria-label="Cristal Pétala Rosa">
            <span style="font-size: 32px;">🌸</span>
            <span style="font-size: 0.85rem; font-weight:600;">Pétala</span>
          </div>
          <div class="crystal-item cyan" data-color="cyan" tabindex="0" role="button" aria-label="Cristal Orvalho Celeste">
            <span style="font-size: 32px;">💧</span>
            <span style="font-size: 0.85rem; font-weight:600;">Orvalho</span>
          </div>
          <div class="crystal-item amber" data-color="amber" tabindex="0" role="button" aria-label="Cristal Luz Âmbar">
            <span style="font-size: 32px;">☀️</span>
            <span style="font-size: 0.85rem; font-weight:600;">Sol</span>
          </div>
        </div>
      </div>
    `;

    // Interações tanto por toque/clique direto quanto por drag & drop
    const crystals = stage.querySelectorAll('.crystal-item');
    const pedestals = stage.querySelectorAll('.pedestal-slot');

    crystals.forEach(c => {
      c.addEventListener('click', () => {
        crystals.forEach(other => other.style.transform = 'none');
        this.selectedCrystal = c;
        c.style.transform = 'scale(1.12)';
        sound.playPop();
      });
    });

    pedestals.forEach(p => {
      p.addEventListener('click', () => {
        if (!this.selectedCrystal) {
          // Orientação suave
          sound.playGuidance();
          return;
        }

        const crystalColor = this.selectedCrystal.getAttribute('data-color');
        const pedestalColor = p.getAttribute('data-color');

        if (crystalColor === pedestalColor) {
          // Acerto Acolhedor!
          p.classList.add('filled', 'anim-success-pulse');
          p.innerHTML = this.selectedCrystal.innerHTML;
          p.classList.remove('guidance-active');

          this.selectedCrystal.style.display = 'none';
          this.selectedCrystal = null;
          this.matchedCrystals++;

          const notes = [sound.pentatonicScale.C4, sound.pentatonicScale.E4, sound.pentatonicScale.G4];
          sound.playTone(notes[this.matchedCrystals - 1], 0.9);

          this.updateStep(this.matchedCrystals + 1);

          if (this.matchedCrystals >= 3) {
            setTimeout(() => this.celebrateMission("cloud_scarf", "Cachecol Nuvem ☁️"), 700);
          }
        } else {
          // Tentativa divergente: sem buzina ou punição!
          this.attemptsOnCurrentStep++;
          this.selectedCrystal.classList.add('anim-gentle-reset');
          sound.playTone(sound.pentatonicScale.D4, 0.4);

          setTimeout(() => {
            if (this.selectedCrystal) {
              this.selectedCrystal.classList.remove('anim-gentle-reset');
              this.selectedCrystal.style.transform = 'none';
            }
          }, 500);

          // Andaime Cognitivo: se errou duas vezes, ilumina o pedestal correto suavemente
          if (this.attemptsOnCurrentStep >= 2) {
            const correctPedestal = stage.querySelector(`.pedestal-slot[data-color="${crystalColor}"]`);
            if (correctPedestal) {
              correctPedestal.classList.add('guidance-active');
              sound.playGuidance();
            }
          }
        }
      });
    });
  }

  // ==========================================================================
  // MISSÃO 2: CAMINHO DAS ESTRELAS (Traçado de Constelação)
  // ==========================================================================
  setupMission2() {
    this.currentStarExpected = 1;

    const instructionEl = document.getElementById('missionInstruction');
    const instructionText = "Toque nas estrelinhas na ordem suave (1, 2, 3 e 4) para acordar a constelação amiga.";
    instructionEl.innerHTML = `
      <span>✨ ${instructionText}</span>
      <button class="btn-speak-inline" id="btnSpeakMission" title="Ouvir instrução">🔊</button>
    `;

    document.getElementById('btnSpeakMission').onclick = () => speech.speak(instructionText, true);
    speech.speak(instructionText);

    const stage = document.getElementById('missionStage');
    stage.innerHTML = `
      <div class="constellation-board" id="constellationBoard">
        <svg class="constellation-svg" id="constellationSvg" viewBox="0 0 520 340">
          <!-- Linhas de conexão que surgem suavemente -->
          <line id="line-1-2" stroke="#E6C86E" stroke-width="3" stroke-dasharray="6,6" opacity="0" />
          <line id="line-2-3" stroke="#E6C86E" stroke-width="3" stroke-dasharray="6,6" opacity="0" />
          <line id="line-3-4" stroke="#E6C86E" stroke-width="3" stroke-dasharray="6,6" opacity="0" />
          <line id="line-4-1" stroke="#E6C86E" stroke-width="3" stroke-dasharray="6,6" opacity="0" />
        </svg>

        <!-- 4 Estrelas em formato de golfinho/tartaruga espacial -->
        <div class="star-point" data-star="1" style="left: 20%; top: 60%;">1</div>
        <div class="star-point" data-star="2" style="left: 38%; top: 25%;">2</div>
        <div class="star-point" data-star="3" style="left: 72%; top: 35%;">3</div>
        <div class="star-point" data-star="4" style="left: 80%; top: 75%;">4</div>
      </div>
    `;

    const stars = stage.querySelectorAll('.star-point');
    const starCoords = {
      1: { x: '20%', y: '60%' },
      2: { x: '38%', y: '25%' },
      3: { x: '72%', y: '35%' },
      4: { x: '80%', y: '75%' }
    };

    const notes = [
      sound.pentatonicScale.C4,
      sound.pentatonicScale.E4,
      sound.pentatonicScale.G4,
      sound.pentatonicScale.C5
    ];

    stars.forEach(s => {
      s.addEventListener('click', () => {
        const starNum = parseInt(s.getAttribute('data-star'), 10);

        if (starNum === this.currentStarExpected) {
          s.classList.add('connected', 'anim-success-pulse');
          sound.playTone(notes[starNum - 1], 1.0);

          if (starNum > 1) {
            const prev = starNum - 1;
            const line = document.getElementById(`line-${prev}-${starNum}`);
            if (line) {
              line.setAttribute('x1', starCoords[prev].x);
              line.setAttribute('y1', starCoords[prev].y);
              line.setAttribute('x2', starCoords[starNum].x);
              line.setAttribute('y2', starCoords[starNum].y);
              line.setAttribute('opacity', '1');
            }
          }

          this.currentStarExpected++;
          this.updateStep(this.currentStarExpected);

          if (this.currentStarExpected > 4) {
            // Fecha o contorno estelar da constelação
            const closeLine = document.getElementById('line-4-1');
            if (closeLine) {
              closeLine.setAttribute('x1', starCoords[4].x);
              closeLine.setAttribute('y1', starCoords[4].y);
              closeLine.setAttribute('x2', starCoords[1].x);
              closeLine.setAttribute('y2', starCoords[1].y);
              closeLine.setAttribute('opacity', '1');
            }
            setTimeout(() => this.celebrateMission("star_glasses", "Óculos Estrela ⭐"), 800);
          }
        } else if (starNum > this.currentStarExpected) {
          // Clicou fora da sequência: sem erro punitivo
          sound.playGuidance();
          const targetStar = stage.querySelector(`.star-point[data-star="${this.currentStarExpected}"]`);
          if (targetStar) {
            targetStar.classList.add('guidance-active');
            setTimeout(() => targetStar.classList.remove('guidance-active'), 1200);
          }
        }
      });
    });
  }

  // ==========================================================================
  // MISSÃO 3: JARDIM MUSICAL (Desabrochar no Próprio Tempo)
  // ==========================================================================
  setupMission3() {
    this.wateredFlowers = 0;

    const instructionEl = document.getElementById('missionInstruction');
    const instructionText = "Toque em cada vasinho para regar as sementes e ouvir a melodia que elas guardam.";
    instructionEl.innerHTML = `
      <span>🌱 ${instructionText}</span>
      <button class="btn-speak-inline" id="btnSpeakMission" title="Ouvir instrução">🔊</button>
    `;

    document.getElementById('btnSpeakMission').onclick = () => speech.speak(instructionText, true);
    speech.speak(instructionText);

    const stage = document.getElementById('missionStage');
    stage.innerHTML = `
      <div class="musical-garden-board">
        <div class="flower-pot" data-flower="1" role="button" tabindex="0">
          <div class="sprout-container" id="sprout-1">
            <span style="font-size: 28px;">🌱</span>
          </div>
          <div class="pot-base">💧</div>
        </div>

        <div class="flower-pot" data-flower="2" role="button" tabindex="0">
          <div class="sprout-container" id="sprout-2">
            <span style="font-size: 28px;">🌱</span>
          </div>
          <div class="pot-base">💧</div>
        </div>

        <div class="flower-pot" data-flower="3" role="button" tabindex="0">
          <div class="sprout-container" id="sprout-3">
            <span style="font-size: 28px;">🌱</span>
          </div>
          <div class="pot-base">💧</div>
        </div>
      </div>
    `;

    const flowerEmojis = ['🌻', '🌺', '🪻'];
    const flowerChords = [
      [261.63, 329.63, 392.00], // Acorde C
      [293.66, 369.99, 440.00], // Acorde D
      [329.63, 415.30, 493.88]  // Acorde E
    ];

    const pots = stage.querySelectorAll('.flower-pot');
    pots.forEach((p, idx) => {
      let isGrown = false;
      p.addEventListener('click', () => {
        if (isGrown) return;
        isGrown = true;
        this.wateredFlowers++;

        const sprout = p.querySelector('.sprout-container');
        sprout.innerHTML = `<span style="font-size: 64px;" class="anim-blossom">${flowerEmojis[idx]}</span>`;
        p.querySelector('.pot-base').textContent = '✨';

        sound.playChord(flowerChords[idx]);
        this.updateStep(this.wateredFlowers + 1);

        if (this.wateredFlowers >= 3) {
          setTimeout(() => this.celebrateMission("flower_pin", "Florzinha da Sorte 🌸"), 900);
        }
      });
    });
  }

  // ==========================================================================
  // CELEBRAÇÃO ACOLHEDORA E RECOMPENSA INTRÍNSECA
  // ==========================================================================
  celebrateMission(rewardId, rewardName) {
    this.app.calmMode.setMissionState(false);
    mascot.unlockAccessory(rewardId);

    const celebration = document.getElementById('celebrationOverlay');
    if (!celebration) return;

    sound.playChord([261.63, 329.63, 392.00, 523.25, 659.25]);

    const rewardIcon = rewardId === 'cloud_scarf' ? '☁️' : rewardId === 'star_glasses' ? '⭐' : '🌸';
    document.getElementById('celebrationRewardIcon').textContent = rewardIcon;
    document.getElementById('celebrationRewardName').textContent = rewardName;

    celebration.classList.add('active');

    const phrases = [
      "Você explorou com carinho, paciência e no seu próprio ritmo!",
      "O Pip ficou muito feliz com a sua companhia aconchegante!",
      "Que lindo momento juntos! Cada passo seu foi brilhante."
    ];
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    document.getElementById('celebrationPhrase').textContent = phrase;

    speech.speak(phrase);

    document.getElementById('btnCelebrationBack').onclick = () => {
      celebration.classList.remove('active');
      this.app.showView('hub');
      mascot.render();
    };

    document.getElementById('btnCelebrationEquip').onclick = () => {
      celebration.classList.remove('active');
      mascot.equipAccessory(rewardId);
      this.app.showView('hub');
      mascot.render();
    };
  }
}
