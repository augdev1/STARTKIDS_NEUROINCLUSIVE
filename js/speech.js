/* ==========================================================================
   LOCUÇÃO ACESSÍVEL E ACOLHEDORA (WEB SPEECH API) - STARKIDS
   Voz feminina angelical, calma, doce e não-robótica para crianças neurodivergentes.
   Prioriza vozes neurais e naturais (Francisca, Thalita, Luciana, Google PT-BR).
   ========================================================================== */

class SpeechEngine {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.isNarratorEnabled = localStorage.getItem('starkids_speech_enabled') === 'true';
    this.voice = null;
    this.currentAudio = null;
    this.currentUtterance = null;
    this._fallbackTimer = null;
    this._activePlayId = 0;
    this.initVoices();
  }

  initVoices() {
    if (!this.synth) return;

    const loadVoices = () => {
      const voices = this.synth.getVoices();
      if (!voices || voices.length === 0) return;

      this.voice = this.findBestAngelicVoice(voices);
      if (this.voice) {
        console.log(`✨ [StartKids Voz Angelical] Fallback nativo selecionado: "${this.voice.name}" (${this.voice.lang})`);
      }
    };

    loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
  }

  /**
   * Algoritmo de seleção que prioriza vozes femininas naturais e de rede (network/neural),
   * doces e afetuosas, eliminando vozes metálicas, comprimidas locais ou masculinas graves.
   */
  findBestAngelicVoice(voices) {
    const ptVoices = voices.filter(v => {
      const lang = (v.lang || '').toLowerCase();
      return lang === 'pt-br' || lang.startsWith('pt');
    });

    if (ptVoices.length === 0) {
      return voices.find(v => /natural|female|network/i.test(v.name)) || voices[0] || null;
    }

    // Critérios em ordem de doçura, calor humano e qualidade neural de rede
    const angelicPreferences = [
      // 1. Vozes Neurais de Estúdio (Microsoft Edge / Windows 11) - Ultra Realistas
      v => /francisca.*natural/i.test(v.name),
      v => /thalita.*natural/i.test(v.name),
      v => /francisca/i.test(v.name) && /online/i.test(v.name),
      v => /thalita/i.test(v.name) && /online/i.test(v.name),

      // 2. Vozes Neurais de Rede do Google (Android & Chrome - Alta Qualidade Humana)
      v => /pt-br-x-.*network/i.test(v.name) && /afs|afz|yft|sfb|female/i.test(v.name),
      v => /network/i.test(v.name) && !/male|homem|local/i.test(v.name),
      v => /google\s+português\s+do\s+brasil/i.test(v.name) && !/local/i.test(v.name),

      // 3. Vozes Naturais Apple / iOS / Safari (Siri Luciana / Joana)
      v => /luciana/i.test(v.name),
      v => /joana/i.test(v.name),

      // 4. Vozes femininas conhecidas por serem afetuosas
      v => /maria.*natural/i.test(v.name),
      v => /helena/i.test(v.name),
      v => /fernanda/i.test(v.name),
      v => /leticia|letícia/i.test(v.name),
      v => /camila/i.test(v.name),
      v => /vitoria|vitória/i.test(v.name),
      v => /female|mulher|feminina/i.test(v.name) && !/local/i.test(v.name),

      // 5. Qualquer voz feminina que NÃO seja local mecânica nem masculina
      v => !/daniel|felipe|antonio|antônio|ricardo|male|man|homem|pico|espeak/i.test(v.name) && !v.name.includes('-local'),

      // 6. Fallback padrão pt-BR não masculino
      v => !/daniel|felipe|antonio|antônio|ricardo|male|man|homem/i.test(v.name),
      v => (v.lang || '').toLowerCase() === 'pt-br'
    ];

    for (const matchFn of angelicPreferences) {
      const found = ptVoices.find(matchFn);
      if (found) return found;
    }

    return ptVoices[0] || null;
  }

  /**
   * Executa a fala com voz angelical humanizada.
   * Utiliza como canal principal a síntese neural de estúdio (/api/tts),
   * garantindo voz 100% doce e humana em qualquer celular (Android, iOS) e PC.
   * Mantém fallback automático para Web Speech API caso offline.
   */
  speak(text, forceOrOptions = false, onEndCallback = null) {
    let force = false;
    let onEnd = null;
    let delayAfterEnd = 0;

    if (typeof forceOrOptions === 'boolean') {
      force = forceOrOptions;
      if (typeof onEndCallback === 'function') {
        onEnd = onEndCallback;
      }
    } else if (typeof forceOrOptions === 'function') {
      force = false;
      onEnd = forceOrOptions;
    } else if (typeof forceOrOptions === 'object' && forceOrOptions !== null) {
      force = !!forceOrOptions.force;
      onEnd = forceOrOptions.onEnd || onEndCallback || null;
      delayAfterEnd = Number(forceOrOptions.delayAfterEnd) || 0;
    }

    const executeCallback = () => {
      if (typeof onEnd === 'function') {
        if (delayAfterEnd > 0) {
          setTimeout(() => {
            try { onEnd(); } catch (e) { console.error('Erro no callback de fala:', e); }
          }, delayAfterEnd);
        } else {
          try { onEnd(); } catch (e) { console.error('Erro no callback de fala:', e); }
        }
      }
    };

    if (!this.isNarratorEnabled && !force) {
      executeCallback();
      return;
    }

    // Interrompe imediatamente qualquer áudio em reprodução anterior
    this.stop();

    // Sanitiza o texto para entonação calma e sem gritos
    const cleanText = (text || '')
      .replace(/!{2,}/g, '.')
      .replace(/\?{2,}/g, '?')
      .replace(/\*/g, '')
      .trim();

    if (!cleanText) {
      executeCallback();
      return;
    }

    const playId = ++this._activePlayId;
    let hasFinished = false;

    const finishPlay = () => {
      if (hasFinished || this._activePlayId !== playId) return;
      hasFinished = true;
      if (this._fallbackTimer) {
        clearTimeout(this._fallbackTimer);
        this._fallbackTimer = null;
      }
      this.currentAudio = null;
      this.currentUtterance = null;
      executeCallback();
    };

    // Fallback nativo via Web Speech API caso ocorra falha de rede
    const fallbackToSpeechSynthesis = () => {
      if (hasFinished || this._activePlayId !== playId) return;
      if (!this.synth) {
        finishPlay();
        return;
      }

      if (!this.voice) {
        this.initVoices();
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'pt-BR';
      if (this.voice) {
        utterance.voice = this.voice;
      }

      // Parâmetros acústicos suaves para reduzir qualquer aspereza no mobile
      utterance.rate = 0.90;
      utterance.pitch = 1.05;
      utterance.volume = 0.95;

      utterance.onend = () => finishPlay();
      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis aviso/erro:', e);
        finishPlay();
      };

      this.currentUtterance = utterance;

      const estimatedMs = Math.max(2500, (cleanText.length / 8) * 1000 + 1500);
      this._fallbackTimer = setTimeout(() => {
        finishPlay();
      }, estimatedMs);

      try {
        this.synth.speak(utterance);
      } catch (_) {
        finishPlay();
      }
    };

    // 1. Canal Primário: Áudio Neural de Estúdio da Francisca (/api/tts)
    try {
      const apiBase = window.STARKIDS_API_URL || localStorage.getItem('starkids_api_url') || '';
      const ttsUrl = `${apiBase}/api/tts?text=${encodeURIComponent(cleanText)}`;
      const audio = new Audio(ttsUrl);
      this.currentAudio = audio;

      let hasStarted = false;
      audio.onplay = () => {
        hasStarted = true;
      };

      audio.onended = () => {
        finishPlay();
      };

      audio.onerror = () => {
        if (!hasStarted) {
          fallbackToSpeechSynthesis();
        } else {
          finishPlay();
        }
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // Em caso de política de autoplay ou erro de rede, usa o fallback nativo
          fallbackToSpeechSynthesis();
        });
      }
    } catch (e) {
      fallbackToSpeechSynthesis();
    }
  }

  stop() {
    this._activePlayId++;
    if (this._fallbackTimer) {
      clearTimeout(this._fallbackTimer);
      this._fallbackTimer = null;
    }
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        this.currentAudio.onended = null;
        this.currentAudio.onerror = null;
      } catch (_) {}
      this.currentAudio = null;
    }
    if (this.currentUtterance) {
      this.currentUtterance.onend = null;
      this.currentUtterance.onerror = null;
      this.currentUtterance = null;
    }
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (_) {}
    }
  }

  toggleNarrator() {
    this.isNarratorEnabled = !this.isNarratorEnabled;
    try {
      localStorage.setItem('starkids_speech_enabled', this.isNarratorEnabled ? 'true' : 'false');
    } catch (_) {}
    if (!this.isNarratorEnabled) {
      this.stop();
    }
    return this.isNarratorEnabled;
  }

  /**
   * Permite consultar qual voz está sendo utilizada no momento
   */
  getCurrentVoiceName() {
    return this.voice ? `${this.voice.name} (${this.voice.lang})` : 'Voz padrão do navegador';
  }
}

export const speech = new SpeechEngine();
