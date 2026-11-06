// Web Audio API sound synthesis engine for tactile feedback, auspicious chimes, tanpura drone, and fireworks

let audioCtx: AudioContext | null = null;

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Gentle tactile switch click
export function playKeyClickSound(pitch = 850) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitch, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.035);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  } catch {
    // Audio context may not be allowed before user interaction
  }
}

// Auspicious bell/chime sound for lighting diyas or offering blessings
export function playDiyaChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Harmonic bell frequencies (D, F#, A, D octave)
    const freqs = [587.33, 739.99, 880.0, 1174.66, 1760.0];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.05 / (idx + 1), now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 1.3);
    });
  } catch {
    // Audio context handling
  }
}

// Firework audio generator
export function playFireworkSound(type: 'rocket' | 'chakri' | 'anar' | 'burst') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === 'rocket') {
      // Whistle up then pop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.35);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.36);

      // Pop burst after whistle
      setTimeout(() => playFireworkSound('burst'), 340);
    } else if (type === 'burst') {
      // Noise buffer blast
      const bufferSize = ctx.sampleRate * 0.35;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, now);
      filter.frequency.exponentialRampToValueAtTime(80, now + 0.35);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.36);
    } else if (type === 'chakri') {
      // High frequency continuous hissing spin
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(850, now);
      osc.frequency.linearRampToValueAtTime(1300, now + 0.2);
      osc.frequency.linearRampToValueAtTime(600, now + 0.5);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.52);
    } else {
      // Anar fountain sizzle
      const bufferSize = ctx.sampleRate * 0.45;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.sin(i / 100);
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2400, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.46);
    }
  } catch {
    // Audio context handling
  }
}

// Procedural Ambient Tanpura & Sitar drone generator
class AmbientDronePlayer {
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private osc3: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isRunning = false;
  private melodyTimer: ReturnType<typeof setInterval> | null = null;

  start(baseFreq = 146.83) {
    const ctx = getAudioContext();
    if (!ctx) return;
    this.stop();

    const now = ctx.currentTime;
    this.gainNode = ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.001, now);
    this.gainNode.gain.exponentialRampToValueAtTime(0.03, now + 1.5);
    this.gainNode.connect(ctx.destination);

    // Fundamental Pa (A) or Sa (D)
    this.osc1 = ctx.createOscillator();
    this.osc1.type = 'sawtooth';
    this.osc1.frequency.setValueAtTime(baseFreq, now);

    // Harmonic fifth (Pa: 3/2 * Sa)
    this.osc2 = ctx.createOscillator();
    this.osc2.type = 'sine';
    this.osc2.frequency.setValueAtTime(baseFreq * 1.5, now);

    // Octave shimmer
    this.osc3 = ctx.createOscillator();
    this.osc3.type = 'triangle';
    this.osc3.frequency.setValueAtTime(baseFreq * 2, now);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(950, now);

    this.osc1.connect(filter);
    this.osc2.connect(filter);
    this.osc3.connect(filter);
    filter.connect(this.gainNode);

    this.osc1.start();
    this.osc2.start();
    this.osc3.start();
    this.isRunning = true;

    // Gentle random classical sitar pluck notes in Raag Yaman scale
    // Sa, Re, Ga, Ma(tivra), Pa, Dha, Ni
    const yamanRatios = [1, 9/8, 5/4, 45/32, 3/2, 5/3, 15/8, 2];
    this.melodyTimer = setInterval(() => {
      if (!this.isRunning || !ctx) return;
      const noteRatio = yamanRatios[Math.floor(Math.random() * yamanRatios.length)];
      const pluckFreq = baseFreq * noteRatio * (Math.random() > 0.4 ? 2 : 1);
      
      const pluckOsc = ctx.createOscillator();
      const pluckGain = ctx.createGain();
      const t = ctx.currentTime;

      pluckOsc.type = 'triangle';
      pluckOsc.frequency.setValueAtTime(pluckFreq, t);

      pluckGain.gain.setValueAtTime(0.02, t);
      pluckGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);

      pluckOsc.connect(pluckGain);
      pluckGain.connect(ctx.destination);

      pluckOsc.start(t);
      pluckOsc.stop(t + 1.25);
    }, 1800);
  }

  stop() {
    const ctx = getAudioContext();
    if (this.melodyTimer) {
      clearInterval(this.melodyTimer);
      this.melodyTimer = null;
    }
    if (ctx && this.gainNode) {
      try {
        const now = ctx.currentTime;
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
      } catch {
        // Ignored
      }
    }
    setTimeout(() => {
      try {
        if (this.osc1) { this.osc1.stop(); this.osc1.disconnect(); this.osc1 = null; }
        if (this.osc2) { this.osc2.stop(); this.osc2.disconnect(); this.osc2 = null; }
        if (this.osc3) { this.osc3.stop(); this.osc3.disconnect(); this.osc3 = null; }
        if (this.gainNode) { this.gainNode.disconnect(); this.gainNode = null; }
      } catch {
        // Ignored
      }
    }, 550);
    this.isRunning = false;
  }

  isPlaying() {
    return this.isRunning;
  }
}

export const ambientPlayer = new AmbientDronePlayer();
