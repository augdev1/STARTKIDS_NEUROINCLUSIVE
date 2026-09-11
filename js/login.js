/* ==========================================================================
   CONTROLADOR DA PÁGINA DE LOGIN - STARKIDS
   Gerencia autenticação amigável, feedback auditivo e redirecionamento.
   ========================================================================== */

import { sound } from './audio.js';
import { speech } from './speech.js';
import { mascot } from './mascot.js';

class LoginPageController {
  constructor() {
    this.mode = 'register'; // 'register' por padrão para que o usuário comece desde a criação de conta
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      // 1. Limpa qualquer sessão ou progresso anterior do navegador para início 100% limpo
      localStorage.removeItem('starkids_token');
      localStorage.removeItem('starkids_user');
      sessionStorage.removeItem('starkids_guest_mode');
      localStorage.removeItem('pip_game_data_v2');
      localStorage.removeItem('starkids_user_accessories');
      localStorage.removeItem('starkids_equipped_accessories');
      localStorage.removeItem('starkids_games_completed');

      // 2. Renderiza o mascote Pip acolhedor
      const pipContainer = document.getElementById('loginPipAvatar');
      if (pipContainer) {
        pipContainer.innerHTML = mascot.getSVG();
      }

      this.bindEvents();

      // Primeiro clique inicializa áudio
      window.addEventListener('click', () => sound.ensureContext(), { once: true });
    });
  }

  bindEvents() {
    const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');
    const form = document.getElementById('loginForm');
    const inputUser = document.getElementById('loginUsername');
    const inputPass = document.getElementById('loginPassword');
    const btnTogglePass = document.getElementById('btnTogglePassword');
    const submitBtn = document.getElementById('btnSubmit');
    const speechBubble = document.getElementById('loginSpeechBubble');
    const feedbackArea = document.getElementById('loginFeedbackArea');
    const btnGuest = document.getElementById('btnGuestMode');

    // Botão Modo Visitante
    if (btnGuest) {
      btnGuest.addEventListener('click', () => {
        try { sound.playSoftTap(); } catch (e) {}
        sessionStorage.setItem('starkids_guest_mode', 'true');
        window.location.href = 'index.html';
      });
    }

    const userHint = document.getElementById('usernameHint');
    const passHint = document.getElementById('passwordHint');
    let blockCountdownInterval = null;

    // Função de contagem regressiva para pausa acolhedora (Rate limit de 60s)
    const startGentleBlockTimer = (seconds = 60) => {
      if (blockCountdownInterval) clearInterval(blockCountdownInterval);
      let timeLeft = seconds;

      submitBtn.disabled = true;
      inputUser.disabled = true;
      inputPass.disabled = true;

      if (speechBubble) {
        speechBubble.textContent = 'Muitas tentativas! Que tal respirar fundo um pouquinho enquanto esperamos? 🍃';
      }
      try { speech.speak('Muitas tentativas seguidas! Vamos respirar fundo por um minutinho.'); } catch (e) {}

      const renderBanner = () => {
        feedbackArea.className = 'login-feedback-area';
        feedbackArea.innerHTML = `
          <div class="login-countdown-banner">
            <span>🍃 Muitas tentativas seguidas! Vamos respirar fundo com calma:</span>
            <span class="login-countdown-timer">${timeLeft}s</span>
            <span style="font-size: 0.8rem; opacity: 0.95;">Você pode continuar jogando como Visitante logo abaixo! 🎈</span>
          </div>
        `;
      };

      renderBanner();

      blockCountdownInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
          clearInterval(blockCountdownInterval);
          blockCountdownInterval = null;
          submitBtn.disabled = false;
          inputUser.disabled = false;
          inputPass.disabled = false;
          submitBtn.textContent = this.mode === 'login' ? 'Entrar no StartKids 🚀' : 'Criar Meu Perfil Mágico ✨';
          feedbackArea.innerHTML = '';
          feedbackArea.className = 'login-feedback-area';
          if (speechBubble) {
            speechBubble.textContent = 'Prontinho, amiguinho! Pode tentar de novo agora com calma ✨';
          }
          try { sound.playPop(); speech.speak('Prontinho! Pode tentar entrar de novo com calma.'); } catch (e) {}
        } else {
          renderBanner();
        }
      }, 1000);
    };

    // Validação visual em tempo real do Nome de Usuário
    inputUser?.addEventListener('input', () => {
      const val = inputUser.value;
      if (!val) {
        if (userHint) {
          userHint.textContent = '';
          userHint.className = 'login-input-hint';
        }
        return;
      }
      const trimmed = val.trim();
      if (userHint) {
        if (trimmed.length < 3) {
          userHint.textContent = `Mínimo de 3 caracteres (faltam ${3 - trimmed.length}) ✏️`;
          userHint.className = 'login-input-hint hint-warn';
        } else if (trimmed.length > 20) {
          userHint.textContent = 'Nome um pouquinho longo (máximo 20 caracteres) 📏';
          userHint.className = 'login-input-hint hint-warn';
        } else {
          userHint.textContent = 'Nome aprovado! ✨';
          userHint.className = 'login-input-hint hint-valid';
        }
      }
    });

    // Auto-trim ao sair do campo de usuário
    inputUser?.addEventListener('blur', () => {
      inputUser.value = inputUser.value.trim();
    });

    // Validação visual em tempo real da Senha
    inputPass?.addEventListener('input', () => {
      const val = inputPass.value;
      if (!val) {
        if (passHint) {
          passHint.textContent = '';
          passHint.className = 'login-input-hint';
        }
        return;
      }
      if (passHint) {
        if (val.length < 4) {
          passHint.textContent = `Mínimo de 4 caracteres (faltam ${4 - val.length}) 🔒`;
          passHint.className = 'login-input-hint hint-warn';
        } else {
          passHint.textContent = 'Senha aprovada! Fácil de lembrar 🌟';
          passHint.className = 'login-input-hint hint-valid';
        }
      }
    });

    // Alternar Abas (Entrar vs Criar Conta)
    const setMode = (newMode) => {
      this.mode = newMode;
      try { sound.playSoftTap(); } catch (e) {}
      if (!blockCountdownInterval) {
        feedbackArea.textContent = '';
        feedbackArea.className = 'login-feedback-area';
      }

      if (newMode === 'login') {
        tabLogin?.classList.add('active');
        tabRegister?.classList.remove('active');
        submitBtn.textContent = 'Entrar no StartKids 🚀';
        if (speechBubble && !blockCountdownInterval) {
          speechBubble.textContent = 'Que bom te ver! Digite seu nome e sua senha mágica para abrir seu baú.';
        }
      } else {
        tabRegister?.classList.add('active');
        tabLogin?.classList.remove('active');
        submitBtn.textContent = 'Criar Meu Perfil Mágico ✨';
        if (speechBubble && !blockCountdownInterval) {
          speechBubble.textContent = 'Oba! Crie seu perfil mágico com seu nome e uma senha para começarmos nossa jornada!';
        }
      }
    };

    tabLogin?.addEventListener('click', () => setMode('login'));
    tabRegister?.addEventListener('click', () => setMode('register'));

    // Alternar visibilidade da senha
    btnTogglePass?.addEventListener('click', () => {
      try { sound.playSoftTap(); } catch (e) {}
      const isPassword = inputPass.type === 'password';
      inputPass.type = isPassword ? 'text' : 'password';
      btnTogglePass.textContent = isPassword ? '🙈' : '👁️';
    });

    // Submissão do Formulário com Validação Imediata e Tratamento de Rate Limit
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = inputUser.value.trim();
      const password = inputPass.value;

      // Validação Imediata
      if (!username || !password) {
        feedbackArea.textContent = 'Por favor, preencha o seu nome e sua senha!';
        feedbackArea.className = 'login-feedback-area error';
        try { sound.playBoing(); } catch (e) {}
        return;
      }

      if (username.length < 3) {
        feedbackArea.textContent = 'O seu nome precisa ter pelo menos 3 letrinhas ou números! ✏️';
        feedbackArea.className = 'login-feedback-area error';
        inputUser.focus();
        try { sound.playBoing(); } catch (e) {}
        return;
      }

      if (password.length < 4) {
        feedbackArea.textContent = 'A senha precisa ter pelo menos 4 caracteres (letras ou números)! 🔒';
        feedbackArea.className = 'login-feedback-area error';
        inputPass.focus();
        try { sound.playBoing(); } catch (e) {}
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Verificando... ⏳';

      const apiBase = window.STARKIDS_API_URL || localStorage.getItem('starkids_api_url') || '/api';
      const endpoint = this.mode === 'login' ? `${apiBase}/auth/login` : `${apiBase}/auth/register`;

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        // 429: Rate Limit / Pausa Acolhedora atingida
        if (res.status === 429 || data.isBlocked) {
          startGentleBlockTimer(data.retryAfter || 60);
          return;
        }

        if (!res.ok) {
          throw new Error(data.error || 'Não foi possível completar. Tente novamente!');
        }

        // Sucesso!
        localStorage.setItem('starkids_token', data.token);
        localStorage.setItem('starkids_user', JSON.stringify(data.user));

        if (data.progression) {
          const userKey = `pip_game_data_user_${data.user.id}`;
          const mascotData = {
            unlockedAccessories: data.progression.unlocked_accessories || ['leaf_hat', 'star_glasses', 'pet_ladybug'],
            equipped: data.progression.equipped_accessories || { hats: 'leaf_hat', face: null, clothes: null, pets: null, auras: null },
            completedGamesCount: data.progression.games_completed?.length || 0,
            starsCount: data.progression.stars || 3
          };
          localStorage.setItem(userKey, JSON.stringify(mascotData));

          if (data.progression.unlocked_accessories) {
            localStorage.setItem('starkids_user_accessories', JSON.stringify(data.progression.unlocked_accessories));
          }
          if (data.progression.equipped_accessories) {
            localStorage.setItem('starkids_equipped_accessories', JSON.stringify(data.progression.equipped_accessories));
          }
          if (data.progression.games_completed) {
            localStorage.setItem('starkids_games_completed', JSON.stringify(data.progression.games_completed));
          }
        }

        feedbackArea.textContent = data.message || 'Pronto! Entrando no StartKids...';
        feedbackArea.className = 'login-feedback-area success';
        try { sound.playTriumph(); } catch (e) {}

        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1100);

      } catch (err) {
        submitBtn.disabled = false;
        submitBtn.textContent = this.mode === 'login' ? 'Entrar no StartKids 🚀' : 'Criar Meu Perfil Mágico ✨';
        feedbackArea.textContent = err.message;
        feedbackArea.className = 'login-feedback-area error';
        try { sound.playBoing(); } catch (e) {}
      }
    });
  }
}

new LoginPageController();
