/* ==========================================================================
   5 JOGOS EDUCATIVOS COM APRENDIZADO REAL - PIP: AVENTURAS SENSORIAIS
   1. O Espelho das Emoções (Socioemocional & Empatia)
   2. Construtor de Palavrinhas (Consciência Fonológica)
   3. Balança das Quantidades (Matemática Concreta)
   4. O Trem dos Padrões (Funções Executivas & Lógica)
   5. A Rotina Encantada (Planejamento & Autonomia)
   ========================================================================== */

import { sound } from './audio.js';
import { speech } from './speech.js';
import { mascot } from './mascot.js';

// ============================================================================
// BANCO EXPANDIDO DE REPERTÓRIO PEDAGÓGICO ACOLHEDOR
// Garante variedade dinâmica a cada partida para a criança não ver sempre o mesmo conteúdo
// ============================================================================
export const GAME_POOLS = {
  // Jogo 1: O Espelho das Emoções
  1: [
    {
      scenario: "O Pip ganhou um lindo girassol do seu amiguinho no bosque! Como o Pip está se sentindo?",
      icon: "🌻",
      vectorKey: "SUNFLOWER",
      correctId: "happy",
      correctLabel: "Alegre e Contente",
      options: [
        { id: "calm", emoji: "😌", label: "Sonolento" },
        { id: "happy", emoji: "😊", label: "Alegre e Contente" },
        { id: "scared", emoji: "🥺", label: "Assustado" }
      ],
      feedback: "Isso mesmo! Ganhar um presente com carinho nos enche de alegria!"
    },
    {
      scenario: "Ouviu-se um trovão forte na chuvinha! O Pip precisa de um abraço. Como ele está se sentindo?",
      icon: "⛈️",
      vectorKey: "STORM",
      correctId: "scared",
      correctLabel: "Assustado",
      options: [
        { id: "scared", emoji: "🥺", label: "Assustado" },
        { id: "happy", emoji: "😄", label: "Rindo" },
        { id: "proud", emoji: "😎", label: "Corajoso" }
      ],
      feedback: "Muito bem! Barulhos altos podem dar susto, e um abraço aconchegante sempre ajuda!"
    },
    {
      scenario: "O Pip deitou na relva fofinha ouvindo o riacho correr calmo. Como ele está se sentindo?",
      icon: "🍃",
      vectorKey: "BREEZE",
      correctId: "calm",
      correctLabel: "Tranquilo e em Paz",
      options: [
        { id: "angry", emoji: "😠", label: "Bravo" },
        { id: "scared", emoji: "😰", label: "Com Medo" },
        { id: "calm", emoji: "😌", label: "Tranquilo e em Paz" }
      ],
      feedback: "Exatamente! Respirar o ar puro e descansar a mente traz tranquilidade profunda."
    },
    {
      scenario: "O Pip montou uma torre mágica bem alta com blocos de montar sem derrubar! Como o Pip está se sentindo?",
      icon: "🏰",
      vectorKey: "CASTLE",
      correctId: "proud",
      correctLabel: "Orgulhoso e Feliz",
      options: [
        { id: "proud", emoji: "⭐", label: "Orgulhoso e Feliz" },
        { id: "sad", emoji: "😢", label: "Triste" },
        { id: "scared", emoji: "😨", label: "Com Medo" }
      ],
      feedback: "Sensacional! Realizar uma construção bonita com paciência nos dá muito orgulho!"
    },
    {
      scenario: "Uma borboleta azul brilhante pousou de mansinho na mãozinha do Pip! Como o Pip está se sentindo?",
      icon: "🦋",
      vectorKey: "BUTTERFLY",
      correctId: "curious",
      correctLabel: "Curioso e Encantado",
      options: [
        { id: "angry", emoji: "😠", label: "Bravo" },
        { id: "curious", emoji: "🤩", label: "Curioso e Encantado" },
        { id: "sleepy", emoji: "🥱", label: "Com Sono" }
      ],
      feedback: "Que lindo! A magia da natureza nos deixa cheios de encanto e curiosidade!"
    },
    {
      scenario: "O copinho de água virou e molhou a pintura que o Pip fez com carinho. Como o Pip está se sentindo?",
      icon: "💧",
      vectorKey: "DROP",
      correctId: "sad",
      correctLabel: "Triste e Chateado",
      options: [
        { id: "happy", emoji: "😄", label: "Divertido" },
        { id: "sad", emoji: "🥺", label: "Triste e Chateado" },
        { id: "calm", emoji: "😌", label: "Calmo" }
      ],
      feedback: "É normal ficar chateado quando algo dá errado. Vamos respirar fundo e recomeçar com calma!"
    },
    {
      scenario: "O coelhinho amigo chamou o Pip para brincar de bola no gramado! Como o Pip está se sentindo?",
      icon: "🐰",
      vectorKey: "RABBIT",
      correctId: "happy",
      correctLabel: "Muito Animado",
      options: [
        { id: "happy", emoji: "🥳", label: "Muito Animado" },
        { id: "scared", emoji: "😨", label: "Assustado" },
        { id: "angry", emoji: "😡", label: "Zangado" }
      ],
      feedback: "Maravilha! Brincar com amigos queridos enche o nosso dia de sorrisos!"
    },
    {
      scenario: "A noite suave chegou no bosque e o Pip vestiu o pijama quentinho. Como ele está se sentindo?",
      icon: "🌙",
      vectorKey: "MOON",
      correctId: "sleepy",
      correctLabel: "Aconchegado e Sonolento",
      options: [
        { id: "sleepy", emoji: "😴", label: "Aconchegado e Sonolento" },
        { id: "angry", emoji: "😠", label: "Com Raiva" },
        { id: "proud", emoji: "😎", label: "Corajoso" }
      ],
      feedback: "Que gostoso! Um repouso suave recarrega nossas energias para um novo dia de descobertas."
    }
  ],

  // Jogo 2: Construtor de Palavrinhas (palavras acessíveis de 3 a 4 letras)
  2: [
    { word: "SOL", icon: "☀️", hint: "Brilha quente no céu azul" },
    { word: "LUA", icon: "🌙", hint: "Ilumina a nossa noite de descanso" },
    { word: "MEL", icon: "🍯", hint: "Docinho feito pelas abelhas amigas" },
    { word: "RIO", icon: "🌊", hint: "Água fresca que corre entre as pedrinhas" },
    { word: "CEU", icon: "☁️", hint: "Onde as nuvens fofinhas passeiam" },
    { word: "MAR", icon: "🏖️", hint: "Ondas calmas na beirinha da praia" },
    { word: "PAO", icon: "🥖", hint: "Quentinho e gostoso no lanche da tarde" },
    { word: "FLOR", icon: "🌸", hint: "Espalha perfume suave no jardim" },
    { word: "CASA", icon: "🏡", hint: "Nosso cantinho de amor e proteção" },
    { word: "GATO", icon: "🐱", hint: "Amiguinho peludo que ronrona com carinho" },
    { word: "BOLA", icon: "⚽", hint: "Redondinha para brincar no gramado" },
    { word: "URSO", icon: "🧸", hint: "Fofinho que dá abraços apertadinhos" },
    { word: "BOLO", icon: "🎂", hint: "Doce festivo com velinhas coloridas" },
    { word: "PEIXE", icon: "🐟", hint: "Nada leve e livre na água cristalina" },
    { word: "MACA", icon: "🍎", hint: "Frutinha vermelhinha, crocante e saudável" }
  ],

  // Jogo 3: Balança das Quantidades (Frutas e numerais de 1 a 5)
  3: [
    { target: 2, icon: "🍎", vectorKey: "APPLE", name: "maçãs" },
    { target: 4, icon: "🍓", vectorKey: "STRAWBERRY", name: "morangos" },
    { target: 3, icon: "🍐", vectorKey: "PEAR", name: "peras" },
    { target: 5, icon: "🍌", vectorKey: "BANANA", name: "bananas" },
    { target: 2, icon: "🍊", vectorKey: "ORANGE", name: "laranjas" },
    { target: 4, icon: "🍇", vectorKey: "GRAPES", name: "uvas" },
    { target: 3, icon: "🍒", vectorKey: "CHERRY", name: "cerejas" },
    { target: 1, icon: "🍉", vectorKey: "WATERMELON", name: "melancia" },
    { target: 5, icon: "🍑", vectorKey: "PEACH", name: "pêssegos" }
  ],

  // Jogo 4: O Trem dos Padrões (Sequenciamento lógico claro)
  4: [
    {
      sequence: ["🟡", "🟣", "🟡"],
      correct: "🟣",
      options: ["🟣", "🟢", "🟡"],
      explanation: "Amarelo, Roxo, Amarelo... o próximo é Roxo!"
    },
    {
      sequence: ["🌸", "⭐", "🌸"],
      correct: "⭐",
      options: ["🍃", "⭐", "🌸"],
      explanation: "Flor, Estrela, Flor... o próximo é Estrela!"
    },
    {
      sequence: ["🍎", "🍎", "🍐"],
      correct: "🍐",
      options: ["🍎", "🍐", "🍊"],
      explanation: "Duas maçãs e duas peras completam o trem!"
    },
    {
      sequence: ["💖", "⭐", "💖"],
      correct: "⭐",
      options: ["⭐", "💖", "🌙"],
      explanation: "Coração, Estrela, Coração... o próximo é Estrela!"
    },
    {
      sequence: ["🔵", "🟢", "🔵"],
      correct: "🟢",
      options: ["🟢", "🔵", "🟡"],
      explanation: "Azul, Verde, Azul... o próximo é Verde!"
    },
    {
      sequence: ["☀️", "🌙", "☀️"],
      correct: "🌙",
      options: ["🌙", "☀️", "⭐"],
      explanation: "Sol, Lua, Sol... o próximo é Lua!"
    },
    {
      sequence: ["🍃", "🌸", "🍃"],
      correct: "🌸",
      options: ["🌸", "🍃", "🍄"],
      explanation: "Folha, Flor, Folha... o próximo é Flor!"
    },
    {
      sequence: ["🔴", "🔷", "🔴"],
      correct: "🔷",
      options: ["🔷", "🔴", "⭐"],
      explanation: "Círculo, Diamante, Círculo... o próximo é Diamante!"
    },
    {
      sequence: ["🐱", "🐶", "🐱"],
      correct: "🐶",
      options: ["🐶", "🐱", "🐰"],
      explanation: "Gatinho, Cachorrinho, Gatinho... o próximo é Cachorrinho!"
    }
  ],

  // Jogo 5: A Rotina Encantada (Sequências de 3 passos do cotidiano)
  5: [
    {
      theme: "Manhã Aconchegante do Pip",
      steps: [
        { id: 1, text: "Acordar e bocejar com a luz do sol", icon: "🌅" },
        { id: 2, text: "Escovar os dentes e lavar o rosto", icon: "🪥" },
        { id: 3, text: "Tomar um café da manhã quentinho", icon: "🥞" }
      ]
    },
    {
      theme: "Cuidando do Jardim",
      steps: [
        { id: 1, text: "Colocar a sementinha na terra fofa", icon: "🌱" },
        { id: 2, text: "Regar com água limpinha e carinho", icon: "💧" },
        { id: 3, text: "Ver a florzinha linda desabrochar", icon: "🌻" }
      ]
    },
    {
      theme: "Hora do Descanso Suave",
      steps: [
        { id: 1, text: "Guardar os brinquedos na caixinha", icon: "🧸" },
        { id: 2, text: "Ouvir uma historinha tranquila", icon: "📖" },
        { id: 3, text: "Cobrir com a mantinha e adormecer", icon: "🌙" }
      ]
    },
    {
      theme: "Preparando a Mochila Mágica",
      steps: [
        { id: 1, text: "Separar os livrinhos coloridos", icon: "📚" },
        { id: 2, text: "Guardar a garrafinha e o lanchinho gostoso", icon: "🥪" },
        { id: 3, text: "Fechar o zíper da mochila com cuidado", icon: "🎒" }
      ]
    },
    {
      theme: "Banho Relaxante e Espumoso",
      steps: [
        { id: 1, text: "Entrar na aguinha morna e gostosa", icon: "🛁" },
        { id: 2, text: "Fazer espuminha com sabonete cheiroso", icon: "🧼" },
        { id: 3, text: "Secar o corpinho com a toalha macia", icon: "🧖" }
      ]
    },
    {
      theme: "Tarde de Brincadeiras no Bosque",
      steps: [
        { id: 1, text: "Calçar os tênis confortáveis", icon: "👟" },
        { id: 2, text: "Deslizar no escorregador colorido", icon: "🛝" },
        { id: 3, text: "Beber água fresca e descansar na sombra", icon: "🥤" }
      ]
    }
  ]
};

export class EducationalGamesManager {
  constructor(app) {
    this.app = app;
    this.currentGameId = null;
    this.currentRound = 0;
    this.totalRounds = 3;
    this.attemptsOnCurrentRound = 0;
    this.activeRounds = [];
  }

  /**
   * Sorteia aleatoriamente e sem repetição 'count' itens de um array
   */
  pickRandomSubset(array, count = 3) {
    if (!array || array.length === 0) return [];
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, Math.min(count, copy.length));
  }

  /**
   * Prepara os 3 exercícios únicos da sessão atual do jogo
   */
  prepareSessionRounds(gameId) {
    const pool = GAME_POOLS[gameId] || [];
    this.activeRounds = this.pickRandomSubset(pool, this.totalRounds);
  }

  /**
   * Salva a sessão ativa e rodada do jogo no localStorage para não perder o progresso se atualizar a página
   */
  saveActiveGameState(isChestOpen = false) {
    if (!this.currentGameId) return;
    const state = {
      gameId: this.currentGameId,
      currentRound: this.currentRound,
      totalRounds: this.totalRounds,
      activeRounds: this.activeRounds,
      attemptsOnCurrentRound: this.attemptsOnCurrentRound,
      isChestOpen: isChestOpen || (document.getElementById('treasureChestOverlay')?.classList.contains('active') || false),
      timestamp: Date.now()
    };
    try {
      localStorage.setItem('starkids_active_game_session', JSON.stringify(state));
    } catch (e) {
      console.warn('[StartKids] Falha ao persistir sessão do jogo:', e);
    }
  }

  /**
   * Limpa a sessão ativa do jogo ao voltar voluntariamente ao jardim ou concluir o baú
   */
  clearActiveGameState() {
    try {
      localStorage.removeItem('starkids_active_game_session');
    } catch (e) { }
  }

  /**
   * Restaura o jogo e a rodada exata onde a criança estava após um reload de página
   */
  restoreActiveGame() {
    try {
      const raw = localStorage.getItem('starkids_active_game_session');
      if (!raw) return false;
      const state = JSON.parse(raw);
      if (!state || !state.gameId || !state.currentRound) return false;

      this.currentGameId = state.gameId;
      this.currentRound = state.currentRound;
      this.totalRounds = state.totalRounds || 3;
      this.attemptsOnCurrentRound = state.attemptsOnCurrentRound || 0;
      this.activeRounds = (state.activeRounds && Array.isArray(state.activeRounds) && state.activeRounds.length > 0)
        ? state.activeRounds
        : this.pickRandomSubset(GAME_POOLS[this.currentGameId] || [], this.totalRounds);

      this.app.showView('game');
      this.app.calmMode.setMissionState(true);

      const stepDots = document.querySelectorAll('.game-step-dot');
      stepDots.forEach((dot, idx) => {
        if (idx + 1 < this.currentRound) {
          dot.className = 'game-step-dot done';
        } else if (idx + 1 === this.currentRound) {
          dot.className = 'game-step-dot active';
        } else {
          dot.className = 'game-step-dot';
        }
      });

      const chestOverlay = document.getElementById('treasureChestOverlay');
      if (chestOverlay) chestOverlay.classList.remove('active');

      if (state.isChestOpen || this.currentRound > this.totalRounds) {
        this.triggerChestReward();
      } else {
        this.loadRound();
      }

      console.log(`✨ [StartKids] Jogo ${this.currentGameId} restaurado com sucesso na rodada ${this.currentRound} de ${this.totalRounds}!`);
      return true;
    } catch (e) {
      console.warn('[StartKids] Erro ao restaurar jogo:', e);
      return false;
    }
  }

  startGame(gameId) {
    this.currentGameId = gameId;
    this.currentRound = 1;
    this.attemptsOnCurrentRound = 0;
    this.prepareSessionRounds(gameId);

    this.app.showView('game');
    this.app.calmMode.setMissionState(true);

    const stepDots = document.querySelectorAll('.game-step-dot');
    stepDots.forEach((dot, idx) => {
      dot.className = 'game-step-dot' + (idx === 0 ? ' active' : '');
    });

    const chestOverlay = document.getElementById('treasureChestOverlay');
    if (chestOverlay) chestOverlay.classList.remove('active');

    this.saveActiveGameState();
    this.loadRound();
  }

  updateRoundStep(step) {
    this.currentRound = step;
    this.attemptsOnCurrentRound = 0;
    const stepDots = document.querySelectorAll('.game-step-dot');
    stepDots.forEach((dot, idx) => {
      if (idx + 1 < step) {
        dot.className = 'game-step-dot done';
      } else if (idx + 1 === step) {
        dot.className = 'game-step-dot active';
      } else {
        dot.className = 'game-step-dot';
      }
    });
    this.saveActiveGameState();
  }

  loadRound() {
    if (this.currentRound > this.totalRounds) {
      this.triggerChestReward();
      return;
    }

    if (!this.activeRounds || this.activeRounds.length === 0) {
      this.prepareSessionRounds(this.currentGameId);
    }

    if (this.currentGameId === 1) this.renderEmotionsGame();
    else if (this.currentGameId === 2) this.renderPhonicsGame();
    else if (this.currentGameId === 3) this.renderMathBalanceGame();
    else if (this.currentGameId === 4) this.renderPatternsGame();
    else if (this.currentGameId === 5) this.renderRoutineGame();
  }

  // ==========================================================================
  // JOGO 1: O ESPELHO DAS EMOÇÕES (Socioemocional & Empatia)
  // ==========================================================================
  renderEmotionsGame() {
    const data = (this.activeRounds && this.activeRounds[this.currentRound - 1]) || GAME_POOLS[1][0];
    this.setGameHeader("O Espelho das Emoções", "Identifique o sentimento do amigo para fortalecer a empatia.", data.scenario);

    const stage = document.getElementById('gameActiveStage');
    stage.innerHTML = `
      <div class="emotion-game-wrapper">
        <!-- Balão Narrativo com Texto da História (Acessibilidade Visual e Auditiva) -->
        <div class="emotion-story-card" id="emotionStoryCard" role="region" aria-label="História da cena">
          <div class="emotion-story-header">
            <span class="emotion-story-badge">📖 HISTÓRIA DO PIP</span>
            <button class="btn-listen-story" id="btnListenStory" title="Ouvir a história do Pip novamente" type="button">
              <span>🔊</span>
              <span>Ouvir História</span>
            </button>
          </div>
          <p class="emotion-story-text" id="emotionStoryText">${data.scenario}</p>
          <div class="emotion-feedback-bubble" id="emotionFeedbackBubble" style="display: none;"></div>
        </div>

        <div class="emotion-scene-card anim-float">
          ${window.EmojiEnhancer?.vectors[data.vectorKey] || `<span style="font-size: 64px;">${data.icon}</span>`}
        </div>

        <div class="emotion-choices-grid">
          ${data.options.map(opt => `
            <button class="emotion-btn" data-id="${opt.id}" tabindex="0">
              <span class="emotion-btn-emoji">${opt.emoji}</span>
              <span class="emotion-btn-label">${opt.label}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    window.EmojiEnhancer?.enhance(stage);

    // Botão para repetir a narração da história
    const btnListenStory = document.getElementById('btnListenStory');
    if (btnListenStory) {
      btnListenStory.addEventListener('click', () => {
        sound.playSoftTap();
        speech.speak(data.scenario, true);
      });
    }

    const feedbackBubble = document.getElementById('emotionFeedbackBubble');
    const storyCard = document.getElementById('emotionStoryCard');

    const sceneCard = stage.querySelector('.emotion-scene-card');

    const handleEmotionChoice = (btn, id) => {
      if (id === data.correctId) {
        // Desabilita os botões para evitar toques acidentais durante a fala e a transição
        stage.querySelectorAll('.emotion-btn').forEach(b => {
          b.style.pointerEvents = 'none';
        });

        btn.classList.add('correct', 'anim-success-pulse');
        sound.playChord([329.63, 392.00, 523.25]);

        // Mostra o feedback explicativo em texto no balão
        if (feedbackBubble && storyCard) {
          storyCard.classList.add('story-success');
          feedbackBubble.style.display = 'block';
          feedbackBubble.className = 'emotion-feedback-bubble success';
          feedbackBubble.innerHTML = `
            <span class="feedback-icon">✨</span>
            <span>${data.feedback}</span>
          `;
        }

        // Fala o feedback com a voz angelical e aguarda exatamente 1 segundo após o término da fala
        speech.speak(data.feedback, {
          force: true,
          delayAfterEnd: 1000,
          onEnd: () => {
            this.updateRoundStep(this.currentRound + 1);
            this.loadRound();
          }
        });
      } else {
        this.attemptsOnCurrentRound++;
        btn.classList.add('anim-gentle-reset');
        sound.playTone(sound.pentatonicScale.D4, 0.4);
        setTimeout(() => btn.classList.remove('anim-gentle-reset'), 500);

        // Dica textual acolhedora
        if (feedbackBubble) {
          feedbackBubble.style.display = 'block';
          feedbackBubble.className = 'emotion-feedback-bubble hint';
          feedbackBubble.innerHTML = `
            <span class="feedback-icon">💭</span>
            <span>Como você se sentiria nessa situação? Dê uma olhadinha no desenho e tente novamente com calma!</span>
          `;
        }

        if (this.attemptsOnCurrentRound >= 2) {
          const correctBtn = stage.querySelector(`.emotion-btn[data-id="${data.correctId}"]`);
          if (correctBtn) correctBtn.classList.add('guidance-active');
          sound.playGuidance();
        }
      }
    };

    stage.querySelectorAll('.emotion-btn').forEach(btn => {
      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let currentPointerId = null;

      const resetBtn = () => {
        btn.classList.add('returning');
        btn.style.transform = 'translate3d(0, 0, 0)';
        setTimeout(() => {
          btn.classList.remove('is-dragging', 'returning');
          btn.style.transform = '';
        }, 260);
        if (sceneCard) sceneCard.classList.remove('drag-over');
      };

      btn.addEventListener('pointerdown', (e) => {
        isDragging = false;
        startX = e.clientX;
        startY = e.clientY;
        currentPointerId = e.pointerId;
        btn.classList.remove('returning');
        try { btn.setPointerCapture(e.pointerId); } catch (_) { }
      });

      btn.addEventListener('pointermove', (e) => {
        if (currentPointerId !== e.pointerId) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (!isDragging && Math.hypot(dx, dy) > 6) {
          isDragging = true;
          btn.classList.add('is-dragging');
        }

        if (isDragging) {
          btn.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.08)`;
          if (sceneCard) {
            const rect = sceneCard.getBoundingClientRect();
            const inside = (
              e.clientX >= rect.left - 30 &&
              e.clientX <= rect.right + 30 &&
              e.clientY >= rect.top - 30 &&
              e.clientY <= rect.bottom + 30
            );
            sceneCard.classList.toggle('drag-over', inside);
          }
        }
      });

      const handlePointerEnd = (e) => {
        if (currentPointerId !== e.pointerId) return;
        try { btn.releasePointerCapture(e.pointerId); } catch (_) { }
        currentPointerId = null;

        const id = btn.getAttribute('data-id');

        if (isDragging) {
          isDragging = false;
          let droppedOnScene = false;
          if (sceneCard) {
            const rect = sceneCard.getBoundingClientRect();
            if (
              e.clientX >= rect.left - 30 &&
              e.clientX <= rect.right + 30 &&
              e.clientY >= rect.top - 30 &&
              e.clientY <= rect.bottom + 30
            ) {
              droppedOnScene = true;
            }
            sceneCard.classList.remove('drag-over');
          }

          btn.classList.remove('is-dragging');
          btn.style.transform = '';

          if (droppedOnScene) {
            handleEmotionChoice(btn, id);
          } else {
            resetBtn();
          }
        }
      };

      btn.addEventListener('pointerup', handlePointerEnd);
      btn.addEventListener('pointercancel', (e) => {
        if (currentPointerId === e.pointerId) {
          try { btn.releasePointerCapture(e.pointerId); } catch (_) { }
          currentPointerId = null;
          isDragging = false;
          resetBtn();
        }
      });

      btn.addEventListener('click', () => {
        if (isDragging) return;
        const id = btn.getAttribute('data-id');
        handleEmotionChoice(btn, id);
      });
    });
  }

  // ==========================================================================
  // JOGO 2: CONSTRUTOR DE PALAVRINHAS (Consciência Fonológica & Leitura)
  // ==========================================================================
  renderPhonicsGame() {
    const currentWordData = (this.activeRounds && this.activeRounds[this.currentRound - 1]) || GAME_POOLS[2][0];
    const targetWord = currentWordData.word;
    const targetLetters = targetWord.split('');

    this.setGameHeader(
      "Construtor de Palavrinhas",
      "Segure a letrinha e puxe até a caixinha correspondente (ou toque nela).",
      `Vamos escrever a palavra: ${targetWord}! ${currentWordData.hint}`
    );

    // Embaralha as letras mantendo garantia de que há as letras necessárias
    const shuffled = [...targetLetters].sort(() => Math.random() - 0.5);
    let filledCount = 0;

    const stage = document.getElementById('gameActiveStage');
    stage.innerHTML = `
      <div class="phonics-game-wrapper" id="phonicsGameWrapper">
        <!-- Barra de Acomodações Sensoriais e Tipografia Acolhedora -->
        <div class="phonics-accommodations-bar" role="toolbar" aria-label="Acomodações Tipográficas e Sensoriais">
          <span class="phonics-accom-tag">✨ Lexend • Anti-Aglomeração</span>
          <button class="phonics-accom-btn" id="btnPhonicsCase" type="button" title="Alternar entre Maiúsculas e Minúsculas">
            <span>🔤</span> <span id="lblPhonicsCase">MAIÚSCULAS</span>
          </button>
          <button class="phonics-accom-btn" id="btnPhonicsSize" type="button" title="Aumentar tamanho das letrinhas">
            <span>🔍</span> <span id="lblPhonicsSize">Tamanho Normal</span>
          </button>
        </div>

        <div class="phonics-illustration anim-float">
          ${window.EmojiEnhancer?.vectors[currentWordData.word] || `<span style="font-size: 72px;">${currentWordData.icon}</span>`}
        </div>

        <!-- Caixinhas Receptoras Correspondentes -->
        <div class="phonics-slots-row" id="phonicsSlotsRow">
          ${targetLetters.map((letter, idx) => `
            <div class="phonics-slot" data-expected="${letter}" data-idx="${idx}" aria-label="Caixinha da letra ${letter}"></div>
          `).join('')}
        </div>

        <!-- Bandeja de Letrinhas Draggable & Acomodada -->
        <div class="phonics-letters-tray" id="phonicsLettersTray">
          ${shuffled.map((letter, idx) => `
            <button class="phonics-letter-tile" data-letter="${letter}" data-idx="${idx}" aria-label="Letra ${letter}">
              ${letter}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    window.EmojiEnhancer?.enhance(stage);

    const wrapper = document.getElementById('phonicsGameWrapper');
    const tiles = stage.querySelectorAll('.phonics-letter-tile');
    const slots = stage.querySelectorAll('.phonics-slot');

    // Suporte aos botões de acomodação para a criança
    const btnCase = document.getElementById('btnPhonicsCase');
    const lblCase = document.getElementById('lblPhonicsCase');
    let isLowercase = false;
    if (btnCase) {
      btnCase.addEventListener('click', () => {
        isLowercase = !isLowercase;
        wrapper.classList.toggle('mode-lowercase', isLowercase);
        lblCase.textContent = isLowercase ? 'minúsculas' : 'MAIÚSCULAS';
        btnCase.classList.toggle('active', isLowercase);
        sound.playPop();
      });
    }

    const btnSize = document.getElementById('btnPhonicsSize');
    const lblSize = document.getElementById('lblPhonicsSize');
    let isLargeSize = false;
    if (btnSize) {
      btnSize.addEventListener('click', () => {
        isLargeSize = !isLargeSize;
        wrapper.classList.toggle('mode-large-letters', isLargeSize);
        lblSize.textContent = isLargeSize ? 'Ampliado (+25%)' : 'Tamanho Normal';
        btnSize.classList.toggle('active', isLargeSize);
        sound.playPop();
      });
    }

    // Função de preenchimento com feedback acolhedor
    const handleLetterPlacement = (tile, targetSlot, letter) => {
      tile.style.display = 'none';
      targetSlot.textContent = letter;
      targetSlot.classList.remove('drag-over');
      targetSlot.classList.add('filled', 'anim-success-pulse');
      filledCount++;

      const slotIdx = parseInt(targetSlot.getAttribute('data-idx') || '0', 10);
      sound.playTone(sound.pentatonicScale.C4 + slotIdx * 60, 0.7);

      if (filledCount === targetLetters.length) {
        tiles.forEach(t => t.style.pointerEvents = 'none');
        // Fala a última letra puxada, aguarda a locutora terminar de falar a letra completamente,
        // aguarda 1 segundo de intervalo suave e sem sobreposição (delayAfterEnd: 1000), e só então entra o elogio!
        speech.speak(letter, {
          force: true,
          delayAfterEnd: 1000,
          onEnd: () => {
            sound.playChord([261.63, 329.63, 392.00, 523.25]);
            speech.speak(`Muito bem! Você escreveu ${targetWord}!`, {
              force: true,
              delayAfterEnd: 1000,
              onEnd: () => {
                this.updateRoundStep(this.currentRound + 1);
                this.loadRound();
              }
            });
          }
        });
      } else {
        speech.speak(letter);
      }
    };

    // Implementação de Arrastar com Mouse/Touch e Soltar na Caixinha Correspondente
    tiles.forEach(tile => {
      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let currentPointerId = null;

      const resetTile = () => {
        tile.classList.add('returning');
        tile.style.transform = 'translate3d(0, 0, 0)';
        setTimeout(() => {
          tile.classList.remove('is-dragging', 'returning');
          tile.style.transform = '';
        }, 260);
        slots.forEach(s => s.classList.remove('drag-over'));
      };

      tile.addEventListener('pointerdown', (e) => {
        if (tile.style.display === 'none') return;
        isDragging = false;
        startX = e.clientX;
        startY = e.clientY;
        currentPointerId = e.pointerId;
        tile.classList.remove('returning');
        try {
          tile.setPointerCapture(e.pointerId);
        } catch (_) { }
      });

      tile.addEventListener('pointermove', (e) => {
        if (currentPointerId !== e.pointerId) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (!isDragging && Math.hypot(dx, dy) > 5) {
          isDragging = true;
          tile.classList.add('is-dragging');
        }

        if (isDragging) {
          tile.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.12)`;

          // Detecção de sobreposição da caixinha receptora (hit-test)
          let hitAny = false;
          slots.forEach(slot => {
            if (slot.classList.contains('filled')) {
              slot.classList.remove('drag-over');
              return;
            }
            const rect = slot.getBoundingClientRect();
            const inside = (
              e.clientX >= rect.left - 20 &&
              e.clientX <= rect.right + 20 &&
              e.clientY >= rect.top - 20 &&
              e.clientY <= rect.bottom + 20
            );
            if (inside && !hitAny) {
              slot.classList.add('drag-over');
              hitAny = true;
            } else {
              slot.classList.remove('drag-over');
            }
          });
        }
      });

      const handlePointerEnd = (e) => {
        if (currentPointerId !== e.pointerId) return;
        try {
          tile.releasePointerCapture(e.pointerId);
        } catch (_) { }
        currentPointerId = null;

        const letter = tile.getAttribute('data-letter');

        if (isDragging) {
          isDragging = false;
          let droppedSlot = null;
          slots.forEach(slot => {
            if (slot.classList.contains('filled')) return;
            const rect = slot.getBoundingClientRect();
            if (
              e.clientX >= rect.left - 20 &&
              e.clientX <= rect.right + 20 &&
              e.clientY >= rect.top - 20 &&
              e.clientY <= rect.bottom + 20
            ) {
              droppedSlot = slot;
            }
            slot.classList.remove('drag-over');
          });

          if (droppedSlot) {
            const expected = droppedSlot.getAttribute('data-expected');
            if (expected === letter) {
              handleLetterPlacement(tile, droppedSlot, letter);
              return;
            } else {
              // Caixinha errada: feedback suave sem punição
              this.attemptsOnCurrentRound++;
              droppedSlot.classList.add('anim-gentle-reset');
              sound.playTone(sound.pentatonicScale.D4, 0.4);
              setTimeout(() => droppedSlot.classList.remove('anim-gentle-reset'), 500);
              resetTile();

              if (this.attemptsOnCurrentRound >= 2) {
                const matchingSlot = Array.from(slots).find(s => s.getAttribute('data-expected') === letter && !s.classList.contains('filled'));
                if (matchingSlot) matchingSlot.classList.add('guidance-active');
                tile.classList.add('guidance-active');
                sound.playGuidance();
              }
              return;
            }
          }

          // Soltou fora de uma caixinha: retorna suavemente à bandeja
          resetTile();
        } else {
          // Clique ou toque direto (Acessibilidade motora para crianças que preferem tocar)
          const targetSlot = Array.from(slots).find(s => s.getAttribute('data-expected') === letter && !s.classList.contains('filled'));
          if (targetSlot) {
            handleLetterPlacement(tile, targetSlot, letter);
          } else {
            tile.classList.add('anim-gentle-reset');
            sound.playTone(sound.pentatonicScale.D4, 0.4);
            setTimeout(() => tile.classList.remove('anim-gentle-reset'), 500);
          }
        }
      };

      tile.addEventListener('pointerup', handlePointerEnd);
      tile.addEventListener('pointercancel', handlePointerEnd);
    });
  }

  // ==========================================================================
  // JOGO 3: BALANÇA DAS QUANTIDADES (Matemática Concreta & Números)
  // ==========================================================================
  renderMathBalanceGame() {
    const data = (this.activeRounds && this.activeRounds[this.currentRound - 1]) || GAME_POOLS[3][0];
    let currentRightCount = 0;
    const fruitItemHtml = window.EmojiEnhancer?.vectors[data.vectorKey] || `<span class="balance-fruit">${data.icon}</span>`;

    this.setGameHeader(
      "Balança das Quantidades",
      "Coloque frutinhas no prato direito até a balança ficar perfeitamente equilibrada.",
      `Equilibre a balança com ${data.target} ${data.name}!`
    );

    const stage = document.getElementById('gameActiveStage');
    stage.innerHTML = `
      <div class="balance-game-wrapper">
        <div class="balance-scale-device" id="balanceScaleDevice">
          <!-- Braço oscilante da balança -->
          <div class="balance-beam" id="balanceBeam">
            <!-- Prato Esquerdo (Alvo) -->
            <div class="balance-pan left" id="panLeft">
              <div class="pan-contents">
                ${Array(data.target).fill(`<span class="balance-fruit">${fruitItemHtml}</span>`).join('')}
              </div>
              <div class="pan-label">${data.target}</div>
            </div>

            <!-- Prato Direito (Interativo) -->
            <div class="balance-pan right" id="panRight">
              <div class="pan-contents" id="panRightContents"></div>
              <div class="pan-label" id="panRightLabel">0</div>
            </div>
          </div>
          <div class="balance-stand"></div>
        </div>

        <!-- Controles de Colocar / Tirar Frutinhas com Arraste -->
        <div class="balance-controls">
          <div class="balance-drag-box" title="Puxe a frutinha até a balança ou toque no botão">
            <button class="balance-draggable-fruit" id="balanceDraggableFruit" type="button" aria-label="Fruta arrastável">
              ${fruitItemHtml}
            </button>
            <span class="drag-hint-text">Puxe até o prato ➔</span>
          </div>
          <button class="balance-btn add" id="btnAddFruit">
            <span>➕ Colocar ${data.icon}</span>
          </button>
          <button class="balance-btn remove" id="btnRemoveFruit">
            <span>➖ Tirar</span>
          </button>
        </div>
      </div>
    `;

    window.EmojiEnhancer?.enhance(stage);

    const beam = document.getElementById('balanceBeam');
    const panRight = document.getElementById('panRight');
    const panRightContents = document.getElementById('panRightContents');
    const panRightLabel = document.getElementById('panRightLabel');
    const dragFruit = document.getElementById('balanceDraggableFruit');

    const updateScaleTilt = () => {
      const diff = data.target - currentRightCount;
      // Inclina de acordo com a diferença (-15deg a +15deg)
      let deg = Math.max(-12, Math.min(12, diff * 4));
      beam.style.transform = `rotate(${deg}deg)`;

      panRightLabel.textContent = currentRightCount;
      panRightContents.innerHTML = Array(currentRightCount).fill(`<span class="balance-fruit">${fruitItemHtml}</span>`).join('');
      window.EmojiEnhancer?.enhance(panRightContents);

      if (currentRightCount === data.target) {
        beam.style.transform = 'rotate(0deg)';
        panRightContents.classList.add('anim-success-pulse');
        const btnAdd = document.getElementById('btnAddFruit');
        const btnRemove = document.getElementById('btnRemoveFruit');
        if (btnAdd) btnAdd.style.pointerEvents = 'none';
        if (btnRemove) btnRemove.style.pointerEvents = 'none';
        if (dragFruit) dragFruit.style.pointerEvents = 'none';

        sound.playChord([261.63, 329.63, 392.00, 523.25]);
        speech.speak(`Equilíbrio perfeito! São ${data.target} ${data.name} nos dois lados!`, {
          force: true,
          delayAfterEnd: 1000,
          onEnd: () => {
            this.updateRoundStep(this.currentRound + 1);
            this.loadRound();
          }
        });
      }
    };

    updateScaleTilt();

    const addOneFruit = () => {
      if (currentRightCount < 6) {
        currentRightCount++;
        sound.playPop();
        updateScaleTilt();
      }
    };

    if (dragFruit && panRight) {
      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let currentPointerId = null;

      const resetFruit = () => {
        dragFruit.classList.add('returning');
        dragFruit.style.transform = 'translate3d(0, 0, 0)';
        setTimeout(() => {
          dragFruit.classList.remove('is-dragging', 'returning');
          dragFruit.style.transform = '';
        }, 260);
        panRight.classList.remove('drag-over');
      };

      dragFruit.addEventListener('pointerdown', (e) => {
        isDragging = false;
        startX = e.clientX;
        startY = e.clientY;
        currentPointerId = e.pointerId;
        dragFruit.classList.remove('returning');
        try { dragFruit.setPointerCapture(e.pointerId); } catch (_) { }
      });

      dragFruit.addEventListener('pointermove', (e) => {
        if (currentPointerId !== e.pointerId) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (!isDragging && Math.hypot(dx, dy) > 6) {
          isDragging = true;
          dragFruit.classList.add('is-dragging');
        }

        if (isDragging) {
          dragFruit.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.18)`;
          const rect = panRight.getBoundingClientRect();
          const inside = (
            e.clientX >= rect.left - 25 &&
            e.clientX <= rect.right + 25 &&
            e.clientY >= rect.top - 25 &&
            e.clientY <= rect.bottom + 25
          );
          panRight.classList.toggle('drag-over', inside);
        }
      });

      const handlePointerEnd = (e) => {
        if (currentPointerId !== e.pointerId) return;
        try { dragFruit.releasePointerCapture(e.pointerId); } catch (_) { }
        currentPointerId = null;

        if (isDragging) {
          isDragging = false;
          const rect = panRight.getBoundingClientRect();
          const droppedOnPan = (
            e.clientX >= rect.left - 25 &&
            e.clientX <= rect.right + 25 &&
            e.clientY >= rect.top - 25 &&
            e.clientY <= rect.bottom + 25
          );
          panRight.classList.remove('drag-over');

          dragFruit.classList.remove('is-dragging');
          dragFruit.style.transform = '';

          if (droppedOnPan) {
            addOneFruit();
          } else {
            resetFruit();
          }
        }
      };

      dragFruit.addEventListener('pointerup', handlePointerEnd);
      dragFruit.addEventListener('pointercancel', (e) => {
        if (currentPointerId === e.pointerId) {
          try { dragFruit.releasePointerCapture(e.pointerId); } catch (_) { }
          currentPointerId = null;
          isDragging = false;
          resetFruit();
        }
      });

      dragFruit.addEventListener('click', () => {
        if (isDragging) return;
        addOneFruit();
      });
    }

    document.getElementById('btnAddFruit').onclick = () => {
      addOneFruit();
    };

    document.getElementById('btnRemoveFruit').onclick = () => {
      if (currentRightCount > 0) {
        currentRightCount--;
        sound.playPop();
        updateScaleTilt();
      }
    };
  }

  // ==========================================================================
  // JOGO 4: O TREM DOS PADRÕES (Funções Executivas & Sequenciamento Lógico)
  // ==========================================================================
  renderPatternsGame() {
    const data = (this.activeRounds && this.activeRounds[this.currentRound - 1]) || GAME_POOLS[4][0];
    this.setGameHeader(
      "O Trem dos Padrões",
      "Segure a pecinha e puxe até o vagão com interrogação (ou toque para escolher).",
      "Qual elemento vem a seguir para completar o trenzinho mágico?"
    );

    const stage = document.getElementById('gameActiveStage');
    stage.innerHTML = `
      <div class="train-game-wrapper">
        <div class="train-track">
          <!-- Locomotiva amigável -->
          <div class="train-locomotive">🚂</div>
          <!-- Vagões da Sequência -->
          ${data.sequence.map(item => `
            <div class="train-car filled">${item}</div>
          `).join('')}
          <!-- Vagão Alvo -->
          <div class="train-car target" id="trainTargetCar">❓</div>
        </div>

        <!-- Opções para Escolher / Arrastar -->
        <div class="pattern-options-row">
          ${data.options.map(opt => `
            <button class="pattern-choice-btn" data-val="${opt}" aria-label="Opção ${opt}">
              ${opt}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    window.EmojiEnhancer?.enhance(stage);

    const choiceBtns = stage.querySelectorAll('.pattern-choice-btn');
    const targetCar = document.getElementById('trainTargetCar');

    const handlePatternSelection = (btn, val) => {
      if (val === data.correct) {
        choiceBtns.forEach(b => b.style.pointerEvents = 'none');
        targetCar.textContent = val;
        window.EmojiEnhancer?.enhance(targetCar);
        targetCar.classList.remove('target', 'drag-over');
        targetCar.classList.add('filled', 'anim-success-pulse');

        sound.playChord([293.66, 369.99, 440.00]);
        speech.speak(`Muito inteligente! ${data.explanation}`, {
          force: true,
          delayAfterEnd: 1000,
          onEnd: () => {
            this.updateRoundStep(this.currentRound + 1);
            this.loadRound();
          }
        });
      } else {
        this.attemptsOnCurrentRound++;
        btn.classList.add('anim-gentle-reset');
        sound.playTone(sound.pentatonicScale.D4, 0.4);
        setTimeout(() => btn.classList.remove('anim-gentle-reset'), 500);

        if (this.attemptsOnCurrentRound >= 2) {
          const correctBtn = stage.querySelector(`.pattern-choice-btn[data-val="${data.correct}"]`);
          if (correctBtn) correctBtn.classList.add('guidance-active');
          sound.playGuidance();
        }
      }
    };

    choiceBtns.forEach(btn => {
      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let currentPointerId = null;

      const resetBtn = () => {
        btn.classList.add('returning');
        btn.style.transform = 'translate3d(0, 0, 0)';
        setTimeout(() => {
          btn.classList.remove('is-dragging', 'returning');
          btn.style.transform = '';
        }, 260);
        targetCar.classList.remove('drag-over');
      };

      btn.addEventListener('pointerdown', (e) => {
        isDragging = false;
        startX = e.clientX;
        startY = e.clientY;
        currentPointerId = e.pointerId;
        btn.classList.remove('returning');
        try { btn.setPointerCapture(e.pointerId); } catch (_) { }
      });

      btn.addEventListener('pointermove', (e) => {
        if (currentPointerId !== e.pointerId) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (!isDragging && Math.hypot(dx, dy) > 5) {
          isDragging = true;
          btn.classList.add('is-dragging');
        }

        if (isDragging) {
          btn.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.12)`;
          const rect = targetCar.getBoundingClientRect();
          const inside = (
            e.clientX >= rect.left - 25 &&
            e.clientX <= rect.right + 25 &&
            e.clientY >= rect.top - 25 &&
            e.clientY <= rect.bottom + 25
          );
          if (inside) {
            targetCar.classList.add('drag-over');
          } else {
            targetCar.classList.remove('drag-over');
          }
        }
      });

      const handlePointerEnd = (e) => {
        if (currentPointerId !== e.pointerId) return;
        try { btn.releasePointerCapture(e.pointerId); } catch (_) { }
        currentPointerId = null;

        const val = btn.getAttribute('data-val');

        if (isDragging) {
          isDragging = false;
          const rect = targetCar.getBoundingClientRect();
          const droppedInside = (
            e.clientX >= rect.left - 25 &&
            e.clientX <= rect.right + 25 &&
            e.clientY >= rect.top - 25 &&
            e.clientY <= rect.bottom + 25
          );
          targetCar.classList.remove('drag-over');

          if (droppedInside) {
            btn.classList.remove('is-dragging');
            btn.style.transform = '';
            handlePatternSelection(btn, val);
          } else {
            resetBtn();
          }
        } else {
          handlePatternSelection(btn, val);
        }
      };

      btn.addEventListener('pointerup', handlePointerEnd);
      btn.addEventListener('pointercancel', handlePointerEnd);
    });
  }

  // ==========================================================================
  // JOGO 5: A ROTINA ENCANTADA (Planejamento, Autonomia & Vida Diária)
  // ==========================================================================
  renderRoutineGame() {
    const currentRoutine = (this.activeRounds && this.activeRounds[this.currentRound - 1]) || GAME_POOLS[5][0];
    this.setGameHeader(
      "A Rotina Encantada",
      "Coloque os cartões na ordem em que as coisas acontecem no dia a dia.",
      `Vamos organizar a rotina: ${currentRoutine.theme}!`
    );

    // Embaralha os passos
    const shuffledSteps = [...currentRoutine.steps].sort(() => Math.random() - 0.5);
    let userOrder = [];

    const stage = document.getElementById('gameActiveStage');
    stage.innerHTML = `
      <div class="routine-game-wrapper">
        <!-- Linha do Tempo (1, 2, 3) -->
        <div class="routine-timeline-slots">
          <div class="routine-slot" data-step="1">
            <span class="slot-num">1º</span>
            <div class="slot-card-holder" id="routineHolder-1"></div>
          </div>
          <div class="routine-slot" data-step="2">
            <span class="slot-num">2º</span>
            <div class="slot-card-holder" id="routineHolder-2"></div>
          </div>
          <div class="routine-slot" data-step="3">
            <span class="slot-num">3º</span>
            <div class="slot-card-holder" id="routineHolder-3"></div>
          </div>
        </div>

        <!-- Cartões para Clicar e Posicionar -->
        <div class="routine-cards-pool" id="routineCardsPool">
          ${shuffledSteps.map(st => `
            <button class="routine-card-btn" data-step-id="${st.id}">
              <span class="routine-card-icon">${st.icon}</span>
              <span class="routine-card-desc">${st.text}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    window.EmojiEnhancer?.enhance(stage);

    const cards = stage.querySelectorAll('.routine-card-btn');
    const slots = stage.querySelectorAll('.routine-slot');

    const handleCardPlacement = (card, stepId) => {
      const expectedStep = userOrder.length + 1;
      if (stepId === expectedStep) {
        userOrder.push(stepId);
        card.style.display = 'none';

        const holder = document.getElementById(`routineHolder-${expectedStep}`);
        const stepData = currentRoutine.steps.find(s => s.id === stepId);
        holder.innerHTML = `
          <div class="placed-routine-card anim-success-pulse">
            <span>${stepData.icon}</span>
            <p>${stepData.text}</p>
          </div>
        `;
        window.EmojiEnhancer?.enhance(holder);

        sound.playTone(sound.pentatonicScale.C4 + expectedStep * 70, 0.8);

        if (userOrder.length === 3) {
          stage.querySelectorAll('.routine-card-btn').forEach(b => b.style.pointerEvents = 'none');
          // Fala o texto da última ação da rotina, aguarda o término completo,
          // aguarda 1 segundo de intervalo suave (delayAfterEnd: 1000) e aí entra a celebração!
          speech.speak(stepData.text, {
            force: true,
            delayAfterEnd: 1000,
            onEnd: () => {
              sound.playChord([261.63, 329.63, 392.00, 523.25]);
              speech.speak("Sensacional! Você organizou toda a rotina com perfeição!", {
                force: true,
                delayAfterEnd: 1000,
                onEnd: () => {
                  this.updateRoundStep(this.currentRound + 1);
                  this.loadRound();
                }
              });
            }
          });
        } else {
          speech.speak(stepData.text);
        }
      } else {
        this.attemptsOnCurrentRound++;
        card.classList.add('anim-gentle-reset');
        sound.playTone(sound.pentatonicScale.D4, 0.4);
        setTimeout(() => card.classList.remove('anim-gentle-reset'), 500);

        if (this.attemptsOnCurrentRound >= 2) {
          const correctCard = stage.querySelector(`.routine-card-btn[data-step-id="${expectedStep}"]`);
          if (correctCard) correctCard.classList.add('guidance-active');
          sound.playGuidance();
        }
      }
    };

    cards.forEach(card => {
      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let currentPointerId = null;

      const resetCard = () => {
        card.classList.add('returning');
        card.style.transform = 'translate3d(0, 0, 0)';
        setTimeout(() => {
          card.classList.remove('is-dragging', 'returning');
          card.style.transform = '';
        }, 260);
        slots.forEach(s => s.classList.remove('drag-over'));
      };

      card.addEventListener('pointerdown', (e) => {
        if (card.style.display === 'none') return;
        isDragging = false;
        startX = e.clientX;
        startY = e.clientY;
        currentPointerId = e.pointerId;
        card.classList.remove('returning');
        try { card.setPointerCapture(e.pointerId); } catch (_) { }
      });

      card.addEventListener('pointermove', (e) => {
        if (currentPointerId !== e.pointerId) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (!isDragging && Math.hypot(dx, dy) > 6) {
          isDragging = true;
          card.classList.add('is-dragging');
        }

        if (isDragging) {
          card.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.06)`;

          let hitAny = false;
          slots.forEach(slot => {
            const rect = slot.getBoundingClientRect();
            const inside = (
              e.clientX >= rect.left - 20 &&
              e.clientX <= rect.right + 20 &&
              e.clientY >= rect.top - 20 &&
              e.clientY <= rect.bottom + 20
            );
            if (inside && !hitAny) {
              slot.classList.add('drag-over');
              hitAny = true;
            } else {
              slot.classList.remove('drag-over');
            }
          });
        }
      });

      const handlePointerEnd = (e) => {
        if (currentPointerId !== e.pointerId) return;
        try { card.releasePointerCapture(e.pointerId); } catch (_) { }
        currentPointerId = null;

        const stepId = parseInt(card.getAttribute('data-step-id'), 10);

        if (isDragging) {
          isDragging = false;
          let droppedOnSlot = false;
          slots.forEach(slot => {
            const rect = slot.getBoundingClientRect();
            if (
              e.clientX >= rect.left - 20 &&
              e.clientX <= rect.right + 20 &&
              e.clientY >= rect.top - 20 &&
              e.clientY <= rect.bottom + 20
            ) {
              droppedOnSlot = true;
            }
            slot.classList.remove('drag-over');
          });

          card.classList.remove('is-dragging');
          card.style.transform = '';

          if (droppedOnSlot) {
            handleCardPlacement(card, stepId);
          } else {
            resetCard();
          }
        }
      };

      card.addEventListener('pointerup', handlePointerEnd);
      card.addEventListener('pointercancel', (e) => {
        if (currentPointerId === e.pointerId) {
          try { card.releasePointerCapture(e.pointerId); } catch (_) { }
          currentPointerId = null;
          isDragging = false;
          resetCard();
        }
      });

      card.addEventListener('click', () => {
        if (isDragging) return;
        const stepId = parseInt(card.getAttribute('data-step-id'), 10);
        handleCardPlacement(card, stepId);
      });
    });
  }

  // Define títulos, instruções e apoio em voz
  setGameHeader(title, subtitle, narrationText) {
    const titleEl = document.getElementById('gameActiveTitle');
    const instructionBox = document.getElementById('gameInstructionText');
    if (titleEl) titleEl.textContent = title;
    if (instructionBox) {
      instructionBox.innerHTML = `
        <span>${subtitle}</span>
        <button class="btn-speak-inline" id="btnSpeakInstruction" title="Ouvir instrução">🔊</button>
      `;
      document.getElementById('btnSpeakInstruction').onclick = () => speech.speak(narrationText, true);
    }
    speech.speak(narrationText);
  }

  // ==========================================================================
  // O BAÚ MÁGICO DE RECOMPENSAS (Desbloqueio de 1 dos 52 Acessórios)
  // ==========================================================================
  triggerChestReward() {
    this.app.calmMode.setMissionState(false);
    this.saveActiveGameState(true);
    const rewardData = mascot.unlockNextReward();
    const item = rewardData.item;

    const overlay = document.getElementById('treasureChestOverlay');
    if (!overlay) return;

    sound.playChord([261.63, 329.63, 392.00, 523.25, 659.25]);
    overlay.classList.add('active');

    // Preenche dados da recompensa
    document.getElementById('chestRewardIcon').textContent = item.icon;
    document.getElementById('chestRewardName').textContent = item.name;
    document.getElementById('chestRewardCategory').textContent = `Categoria: ${item.category.toUpperCase()}`;
    document.getElementById('chestRewardDesc').textContent = item.desc;
    document.getElementById('chestTotalUnlockedText').textContent = `${rewardData.totalUnlocked} de 52 acessórios colecionados!`;

    const praiseList = [
      "Você explorou com paciência e dedicação!",
      "Que momento especial! Você aprendeu e conquistou!",
      "O Pip adorou jogar com você e ganhou um lindo presente!"
    ];
    const praise = praiseList[Math.floor(Math.random() * praiseList.length)];
    document.getElementById('chestPraiseText').textContent = praise;
    speech.speak(`${praise} Você desbloqueou o item: ${item.name}!`);

    // Botão equipar na hora
    document.getElementById('btnChestEquipNow').onclick = () => {
      this.clearActiveGameState();
      mascot.toggleEquip(item.id);
      overlay.classList.remove('active');
      this.app.showView('hub');
      mascot.render();
    };

    // Botão ir ao camarim
    document.getElementById('btnChestGoWardrobe').onclick = () => {
      this.clearActiveGameState();
      overlay.classList.remove('active');
      this.app.showView('hub');
      mascot.render();
      this.app.wardrobe.open();
    };

    // Botão voltar ao jardim
    document.getElementById('btnChestBackHub').onclick = () => {
      this.clearActiveGameState();
      overlay.classList.remove('active');
      this.app.showView('hub');
      mascot.render();
    };
  }
}
