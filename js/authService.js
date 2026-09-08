/* ==========================================================================
   SERVIÇO DE AUTENTICAÇÃO E PERSISTÊNCIA - STARKIDS
   Login descomplicado, seguro e acolhedor para crianças neurodivergentes.
   Salva e sincroniza 52 acessórios e progresso no PostgreSQL via REST API.
   ========================================================================== */

import { sound } from './audio.js';
import { speech } from './speech.js';

class AuthService {
  constructor() {
    this.token = localStorage.getItem('starkids_token') || null;
    this.user = JSON.parse(localStorage.getItem('starkids_user') || 'null');
    this.apiBase = window.STARKIDS_API_URL || localStorage.getItem('starkids_api_url') || '/api';
    this.syncTimeout = null;
  }

  init() {
    this.bindModalElements();
    this.updateUIProfile();
    
    // Se estiver logado, sincroniza com o banco de dados na inicialização
    if (this.isLoggedIn()) {
      this.fetchProgressionFromServer();
    }
  }

  isLoggedIn() {
    return !!this.token && !!this.user;
  }

  getUser() {
    return this.user;
  }

  /**
   * Registro descomplicado
   */
  async register(username, password) {
    try {
      const res = await fetch(`${this.apiBase}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Não conseguimos criar a conta.');
      }

      this.setSession(data.token, data.user);
      this.applyServerProgression(data.progression);
      try { sound.playTriumph(); } catch (e) {}
      return { success: true, message: data.message };
    } catch (err) {
      try { sound.playBoing(); } catch (e) {}
      return { success: false, error: err.message };
    }
  }

  /**
   * Login amigável
   */
  async login(username, password) {
    try {
      const res = await fetch(`${this.apiBase}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Nome ou senha incorretos.');
      }

      this.setSession(data.token, data.user);
      this.applyServerProgression(data.progression);
      try { sound.playTriumph(); } catch (e) {}
      return { success: true, message: data.message };
    } catch (err) {
      try { sound.playBoing(); } catch (e) {}
      return { success: false, error: err.message };
    }
  }

  /**
   * Logout seguro
   */
  logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('starkids_token');
    localStorage.removeItem('starkids_user');
    sessionStorage.removeItem('starkids_guest_mode');
    localStorage.removeItem('starkids_user_accessories');
    localStorage.removeItem('starkids_equipped_accessories');
    localStorage.removeItem('starkids_games_completed');
    localStorage.removeItem('pip_game_data_v2');
    localStorage.removeItem('pip_game_data_guest');

    window.dispatchEvent(new CustomEvent('starkids-user-logged-out'));
    this.updateUIProfile();
    try { sound.playSoftTap(); } catch (e) {}
    speech.speak('Você saiu da sua conta. Seus dados estão seguros no nosso baú mágico!');
  }

  setSession(token, user) {
    this.token = token;
    this.user = user;
    localStorage.setItem('starkids_token', token);
    localStorage.setItem('starkids_user', JSON.stringify(user));
    this.updateUIProfile();
  }

  /**
   * Busca a progressão atualizada do PostgreSQL
   */
  async fetchProgressionFromServer() {
    if (!this.isLoggedIn()) return;
    try {
      const res = await fetch(`${this.apiBase}/progression`, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.progression) {
          this.applyServerProgression(data.progression);
        }
      }
    } catch (e) {
      console.warn('Executando em modo local (banco offline ou rede lenta):', e.message);
    }
  }

  /**
   * Aplica a progressão vinda do banco no estado da aplicação e no localStorage
   */
  applyServerProgression(prog) {
    if (!prog) return;

    if (prog.unlocked_accessories) {
      localStorage.setItem('starkids_user_accessories', JSON.stringify(prog.unlocked_accessories));
    }
    if (prog.equipped_accessories) {
      localStorage.setItem('starkids_equipped_accessories', JSON.stringify(prog.equipped_accessories));
    }
    if (prog.games_completed) {
      localStorage.setItem('starkids_games_completed', JSON.stringify(prog.games_completed));
    }

    // Dispara evento para atualizar a interface do guarda-roupa e balão de fala
    window.dispatchEvent(new CustomEvent('starkids-progression-updated', { detail: prog }));
  }

  /**
   * Sincroniza dados com o PostgreSQL (com debounce suave para não sobrecarregar)
   */
  syncProgression(payload = null) {
    if (!this.isLoggedIn()) return;

    clearTimeout(this.syncTimeout);
    this.syncTimeout = setTimeout(async () => {
      try {
        const unlockedAccessories = payload?.unlockedAccessories || 
          JSON.parse(localStorage.getItem('starkids_user_accessories') || '["leaf_hat", "star_glasses", "pet_ladybug"]');
        
        const equippedAccessories = payload?.equippedAccessories || 
          JSON.parse(localStorage.getItem('starkids_equipped_accessories') || '{}');

        const gamesCompleted = payload?.gamesCompleted || 
          JSON.parse(localStorage.getItem('starkids_games_completed') || '[]');

        const stars = unlockedAccessories.length * 5;

        await fetch(`${this.apiBase}/progression`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`
          },
          body: JSON.stringify({
            unlockedAccessories,
            equippedAccessories,
            gamesCompleted,
            stars
          })
        });

        console.log('☁️ Progresso sincronizado com o banco PostgreSQL.');
      } catch (err) {
        console.warn('Aviso ao sincronizar com o PostgreSQL:', err.message);
      }
    }, 600);
  }

  /**
   * Vincula elementos do modal de Login / Cadastro
   */
  bindModalElements() {
    const modal = document.getElementById('loginModal');
    const btnOpenAuth = document.getElementById('btnOpenAuth');
    const btnCloseModal = document.getElementById('btnCloseAuthModal');
    const authForm = document.getElementById('authForm');
    const tabLogin = document.getElementById('tabAuthLogin');
    const tabRegister = document.getElementById('tabAuthRegister');
    const authFeedback = document.getElementById('authFeedback');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const inputUser = document.getElementById('authUsername');
    const inputPass = document.getElementById('authPassword');

    // Abrir Página de Login ou Gerenciar Sessão
    if (btnOpenAuth) {
      btnOpenAuth.addEventListener('click', () => {
        if (this.isLoggedIn()) {
          if (confirm(`Olá ${this.user.username}! Seus acessórios estão salvos.\n\nDeseja sair da sua conta para entrar com outro usuário?`)) {
            this.logout();
            window.location.href = 'login.html';
          }
        } else {
          try { sound.playSoftTap(); } catch (e) {}
          window.location.href = 'login.html';
        }
      });
    }

    if (!modal) return;

    let currentMode = 'login'; // 'login' ou 'register'

    const switchMode = (mode) => {
      currentMode = mode;
      try { sound.playSoftTap(); } catch (e) {}
      authFeedback.textContent = '';
      authFeedback.className = 'auth-feedback-msg';

      if (mode === 'login') {
        tabLogin?.classList.add('active');
        tabRegister?.classList.remove('active');
        authSubmitBtn.textContent = 'Entrar no StartKids 🚀';
      } else {
        tabRegister?.classList.add('active');
        tabLogin?.classList.remove('active');
        authSubmitBtn.textContent = 'Criar Meu Perfil Mágico ✨';
      }
    };

    tabLogin?.addEventListener('click', () => switchMode('login'));
    tabRegister?.addEventListener('click', () => switchMode('register'));

    // Fechar Modal
    const closeModal = () => {
      modal.classList.remove('active');
      authFeedback.textContent = '';
      try { sound.playSoftTap(); } catch (e) {}
    };

    btnCloseModal?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // Submissão do Formulário
    authForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = inputUser.value.trim();
      const password = inputPass.value;

      if (!username || !password) {
        authFeedback.textContent = 'Por favor, preencha o seu nome e sua senha!';
        authFeedback.className = 'auth-feedback-msg error';
        try { sound.playBoing(); } catch (e) {}
        return;
      }

      authSubmitBtn.disabled = true;
      authSubmitBtn.textContent = 'Verificando... ⏳';

      let result;
      if (currentMode === 'login') {
        result = await this.login(username, password);
      } else {
        result = await this.register(username, password);
      }

      authSubmitBtn.disabled = false;
      authSubmitBtn.textContent = currentMode === 'login' ? 'Entrar no StartKids 🚀' : 'Criar Meu Perfil Mágico ✨';

      if (result.success) {
        authFeedback.textContent = result.message;
        authFeedback.className = 'auth-feedback-msg success';
        setTimeout(() => {
          closeModal();
          inputUser.value = '';
          inputPass.value = '';
        }, 1200);
      } else {
        authFeedback.textContent = result.error;
        authFeedback.className = 'auth-feedback-msg error';
      }
    });
  }

  /**
   * Atualiza a barra superior (HUD) com o nome do usuário logado
   */
  updateUIProfile() {
    const btnOpenAuth = document.getElementById('btnOpenAuth');
    if (!btnOpenAuth) return;

    if (this.isLoggedIn()) {
      btnOpenAuth.innerHTML = `
        <span class="hud-emoji">⭐</span>
        <span class="auth-username-label">${this.user.username}</span>
      `;
      btnOpenAuth.classList.add('user-logged-in');
      btnOpenAuth.title = `Conectado como ${this.user.username} (Toque para sair)`;
    } else {
      btnOpenAuth.innerHTML = `
        <span class="hud-emoji">🔑</span>
        <span>Entrar</span>
      `;
      btnOpenAuth.classList.remove('user-logged-in');
      btnOpenAuth.title = 'Entrar ou criar conta para salvar seus acessórios';
    }
  }
}

export const authService = new AuthService();
