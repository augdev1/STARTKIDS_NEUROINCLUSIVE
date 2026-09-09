/* ==========================================================================
   LOCUÇÃO ACESSÍVEL E ACOLHEDORA (WEB SPEECH API) - STARKIDS
   Voz feminina angelical, calma, doce e não-robótica para crianças neurodivergentes.
   Prioriza vozes neurais e naturais (Francisca, Thalita, Luciana, Google PT-BR).
   ========================================================================== */

class SpeechEngine {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.isNarratorEnabled = false; // Começa desativada para não assustar com som surpresa
    this.voice = null;
    this.initVoices();
  }

  initVoices() {
    if (!this.synth) return;

    const loadVoices = () => {
      const voices = this.synth.getVoices();
      if (!voices || voices.length === 0) return;

      this.voice = this.findBestAngelicVoice(voices);
      if (this.voice) {
        console.log(`✨ [StartKids Voz Angelical] Selecionada com sucesso: "${this.voice.name}" (${this.voice.lang})`);
      }
    };

    loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
  }

  /**
   * Algoritmo de seleção que prioriza vozes femininas naturais,
   * doces e afetuosas, eliminando vozes metálicas ou masculinas graves.
   */
  findBestAngelicVoice(voices) {
    const ptVoices = voices.filter(v => {
      const lang = (v.lang || '').toLowerCase();
      return lang === 'pt-br' || lang.startsWith('pt');
    });

    if (ptVoices.length === 0) {
      // Se não achar português, tenta qualquer voz feminina natural
      return voices.find(v => /natural|female/i.test(v.name)) || voices[0] || null;
    }

    // Critérios em ordem de doçura, calor humano e naturalidade
    const angelicPreferences = [
      // 1. Vozes Neurais / Naturais de Estúdio (Edge / Windows 11) - Ultra Realistas e Angelicais
      v => /francisca.*natural/i.test(v.name),
      v => /thalita.*natural/i.test(v.name),
      v => /francisca/i.test(v.name) && /online/i.test(v.name),
      v => /thalita/i.test(v.name) && /online/i.test(v.name),

      // 2. Vozes Naturais Apple / iOS / Safari (Siri Luciana / Joana)
      v => /luciana/i.test(v.name),
      v => /joana/i.test(v.name),

      // 3. Voz Neural do Google (Chrome e Android)
      v => /google\s+português\s+do\s+brasil/i.test(v.name),
      v => /google/i.test(v.name) && /pt-br/i.test(v.name),

      // 4. Vozes femininas conhecidas por serem afetuosas
      v => /maria.*natural/i.test(v.name),
      v => /helena/i.test(v.name),
      v => /fernanda/i.test(v.name),
      v => /leticia|letícia/i.test(v.name),
      v => /camila/i.test(v.name),
      v => /vitoria|vitória/i.test(v.name),
      v => /maria/i.test(v.name) && !/daniel/i.test(v.name),
      v => /female|mulher|feminina/i.test(v.name),

      // 5. Qualquer voz em pt-BR que NÃO seja masculina identificada (evita Daniel, Felipe, etc)
      v => !/daniel|felipe|antonio|antônio|ricardo|male|man|homem/i.test(v.name) && (v.lang || '').toLowerCase().includes('br'),
      v => !/daniel|felipe|antonio|antônio|ricardo|male|man|homem/i.test(v.name),

      // 6. Fallback padrão pt-BR
      v => (v.lang || '').toLowerCase() === 'pt-br'
    ];

    for (const matchFn of angelicPreferences) {
      const found = ptVoices.find(matchFn);
      if (found) return found;
    }

    return ptVoices[0] || null;
  }

  /**
   * Executa a fala com voz angelical.
   * Suporta:
   * - speak(text)
   * - speak(text, force)
   * - speak(text, force, onEndCallback)
   * - speak(text, { force, onEnd, delayAfterEnd })
   */
  speak(text, forceOrOptions = false, onEndCallback = null) {
    if (!this.synth) {
      if (typeof forceOrOptions === 'function') forceOrOptions();
      if (typeof onEndCallback === 'function') onEndCallback();
      return;
    }

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
      // Se não estiver com narrador ativado e não for forçado, executa callback sem atrasar
      executeCallback();
      return;
    }

    // Se a voz ainda não foi carregada, tenta recarregar
    if (!this.voice) {
      this.initVoices();
    }

    // Limpa timeout e fala anterior para evitar sobreposição
    if (this._fallbackTimer) {
      clearTimeout(this._fallbackTimer);
      this._fallbackTimer = null;
    }
    this.synth.cancel();

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

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'pt-BR';
    if (this.voice) {
      utterance.voice = this.voice;
    }

    // Parâmetros acústicos calibrados para um tom angelical, afetuoso e seguro:
    utterance.rate = 0.88;  // Ritmo calmo e compassado (como uma professora contando história)
    utterance.pitch = 1.15; // Timbre meigo, suave e acolhedor (livre do tom grave/metálico)
    utterance.volume = 0.95; // Volume confortável sem picos sonoros

    let hasEnded = false;
    const handleEnd = () => {
      if (hasEnded) return;
      hasEnded = true;
      if (this._fallbackTimer) {
        clearTimeout(this._fallbackTimer);
        this._fallbackTimer = null;
      }
      this.currentUtterance = null;
      executeCallback();
    };

    utterance.onend = () => {
      handleEnd();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis aviso/erro:', e);
      handleEnd();
    };

    // Prevenção contra garbage collection do Chromium
    this.currentUtterance = utterance;

    // Fallback de segurança: calcula duração estimada da fala + margem de segurança
    // Média de ~10 caracteres por segundo em rate 0.88
    const estimatedDurationMs = Math.max(2500, (cleanText.length / 8) * 1000 + 1500);
    this._fallbackTimer = setTimeout(() => {
      if (!hasEnded) {
        handleEnd();
      }
    }, estimatedDurationMs);

    this.synth.speak(utterance);
  }

  stop() {
    if (this._fallbackTimer) {
      clearTimeout(this._fallbackTimer);
      this._fallbackTimer = null;
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
