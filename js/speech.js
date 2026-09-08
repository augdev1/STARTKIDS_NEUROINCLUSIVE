/* ==========================================================================
   LOCUÇÃO ACESSÍVEL (WEB SPEECH API) - PIP: AVENTURAS SENSORIAIS
   Leitura de instruções com voz amigável em ritmo calmo e cadenciado.
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
      // Procura voz nativa em Português (Brasil)
      this.voice = voices.find(v => v.lang === 'pt-BR' || v.lang.startsWith('pt')) || null;
    };

    loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
  }

  speak(text, force = false) {
    if (!this.synth) return;
    if (!this.isNarratorEnabled && !force) return;

    // Cancela qualquer fala anterior para evitar sobreposição caótica
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    if (this.voice) utterance.voice = this.voice;
    utterance.rate = 0.9; // Levemente mais lento para absorção cognitiva amigável
    utterance.pitch = 1.05; // Tom caloroso e afetuoso

    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  toggleNarrator() {
    this.isNarratorEnabled = !this.isNarratorEnabled;
    if (!this.isNarratorEnabled) {
      this.stop();
    }
    return this.isNarratorEnabled;
  }
}

export const speech = new SpeechEngine();
