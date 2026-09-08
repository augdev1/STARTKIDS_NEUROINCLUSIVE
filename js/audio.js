/* ==========================================================================
   WEB AUDIO API HARMÔNICA - PIP: AVENTURAS SENSORIAIS
   Sintetizador pentatônico aveludado e relaxante.
   Sem bipes estridentes, sem dependências externas, zero ruído de corte.
   ========================================================================== */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.sfxGain = null;
    this.ambientGain = null;
    
    this.isMuted = false;
    this.isAmbientPlaying = false;
    this.ambientNodes = null;

    // Frequências da Escala Pentatônica Maior (Dó Maior - sons aconchegantes)
    this.pentatonicScale = {
      C4: 261.63,
      D4: 293.66,
      E4: 329.63,
      G4: 392.00,
      A4: 440.00,
      C5: 523.25,
      D5: 587.33,
      E5: 659.25,
      G5: 783.99,
      A5: 880.00
    };
  }

  // Inicializa o AudioContext no primeiro toque/clique do usuário
  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // SFX Gain
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      // Ambient Gain
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

    } catch (e) {
      console.warn("Web Audio API não suportada ou bloqueada:", e);
    }
  }

  ensureContext() {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Toca uma nota suave de carrilhão/marimba (senóide pura + envelope ADSR macio)
  playTone(freq = 440, duration = 0.8, type = 'sine') {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    // Envelope Aveludado (Ataque 20ms, Decaimento Exponencial)
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.4, now + 0.03);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(noteGain);
    noteGain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  // Acorde harmônico pentatônico para celebração ou acerto
  playChord(frequencies = [261.63, 329.63, 392.00, 523.25]) {
    if (this.isMuted) return;
    frequencies.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 1.2, 'sine');
      }, idx * 120); // Efeito arpejo suave
    });
  }

  // Som suave de clique acolhedor
  playPop() {
    if (this.isMuted) return;
    this.playTone(this.pentatonicScale.G4, 0.25, 'sine');
  }

  // Toque suave em botões e controles (neurodivergent-friendly)
  playSoftTap() {
    if (this.isMuted) return;
    this.playTone(this.pentatonicScale.C5, 0.15, 'sine');
  }

  // Som suave de boing / atenção amigável (sem punição ou tom estridente)
  playBoing() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      // Pitch wobble suave e alegre
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(196, now + 0.22);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.3, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch (e) {
      console.warn('Erro ao tocar playBoing:', e);
    }
  }

  // Celebração de conquista / entrada triunfal acolhedora
  playTriumph() {
    if (this.isMuted) return;
    // Acorde pentatônico ascendente alegre e brilhante
    this.playChord([
      this.pentatonicScale.C4,
      this.pentatonicScale.E4,
      this.pentatonicScale.G4,
      this.pentatonicScale.C5,
      this.pentatonicScale.E5
    ]);
  }

  // Som para dica / auxílio
  playGuidance() {
    if (this.isMuted) return;
    this.playTone(this.pentatonicScale.E4, 0.5, 'sine');
  }

  // Trilha de Brisa Suave e Mar Serena para o Modo Calma
  startBreezeAmbient() {
    if (this.isMuted || this.isAmbientPlaying) return;
    this.ensureContext();
    if (!this.ctx) return;

    // Síntese de brisa suave usando ruído branco filtrado com passa-baixa modulado
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filtro Passa-Baixa Macio (corta frequências agudas)
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);

    // LFO para oscilar a brisa suavemente como o movimento de respiração (10s)
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.1, this.ctx.currentTime); // 1 ciclo a cada 10s
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(140, this.ctx.currentTime);
    lfo.connect(filter.frequency);

    whiteNoise.connect(filter);
    filter.connect(this.ambientGain);

    whiteNoise.start();
    lfo.start();

    this.ambientNodes = { whiteNoise, filter, lfo };
    this.isAmbientPlaying = true;
  }

  stopBreezeAmbient() {
    if (this.ambientNodes) {
      try {
        this.ambientNodes.whiteNoise.stop();
        this.ambientNodes.lfo.stop();
        this.ambientNodes.whiteNoise.disconnect();
        this.ambientNodes.lfo.disconnect();
      } catch (e) {}
      this.ambientNodes = null;
    }
    this.isAmbientPlaying = false;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(
        this.isMuted ? 0 : 0.7,
        this.ctx.currentTime
      );
    }
    if (this.isMuted && this.isAmbientPlaying) {
      this.stopBreezeAmbient();
    }
    return this.isMuted;
  }
}

export const sound = new SoundEngine();
