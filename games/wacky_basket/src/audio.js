export function createAudio() {
  let ctx = null;
  let master = null;
  let noise = null;
  let muted = localStorage.getItem('wb-muted') === '1';
  const lastPlay = new Map();

  function ensure() {
    if (ctx) {
      if (ctx.state === 'suspended') ctx.resume();
      return true;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = muted ? 0 : 0.55;
    const comp = ctx.createDynamicsCompressor();
    master.connect(comp);
    comp.connect(ctx.destination);
    const len = ctx.sampleRate;
    noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    return true;
  }

  function throttle(key, ms) {
    const now = performance.now();
    if (now - (lastPlay.get(key) || 0) < ms) return false;
    lastPlay.set(key, now);
    return true;
  }

  function env(gainNode, t0, attack, peak, decay) {
    const g = gainNode.gain;
    g.setValueAtTime(0.0001, t0);
    g.exponentialRampToValueAtTime(Math.max(0.0002, peak), t0 + attack);
    g.exponentialRampToValueAtTime(0.0001, t0 + attack + decay);
  }

  function tone(type, f0, f1, dur, vol, delay = 0) {
    if (!ctx || muted) return;
    const t0 = ctx.currentTime + delay;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, t0);
    if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t0 + dur);
    env(g, t0, 0.005, vol, dur);
    o.connect(g);
    g.connect(master);
    o.start(t0);
    o.stop(t0 + dur + 0.05);
  }

  function hiss(filterType, freq, q, dur, vol, attack = 0.005, delay = 0, sweepTo = 0) {
    if (!ctx || muted) return;
    const t0 = ctx.currentTime + delay;
    const src = ctx.createBufferSource();
    src.buffer = noise;
    src.loop = true;
    const filt = ctx.createBiquadFilter();
    filt.type = filterType;
    filt.frequency.setValueAtTime(freq, t0);
    if (sweepTo) filt.frequency.exponentialRampToValueAtTime(sweepTo, t0 + attack + dur);
    filt.Q.value = q;
    const g = ctx.createGain();
    env(g, t0, attack, vol, dur);
    src.connect(filt);
    filt.connect(g);
    g.connect(master);
    src.start(t0, Math.random() * 0.5);
    src.stop(t0 + attack + dur + 0.05);
  }

  return {
    unlock: ensure,
    get muted() {
      return muted;
    },
    toggleMute() {
      muted = !muted;
      localStorage.setItem('wb-muted', muted ? '1' : '0');
      if (master) master.gain.value = muted ? 0 : 0.55;
      return muted;
    },
    bounce(intensity = 1) {
      if (!throttle('bounce', 40)) return;
      const v = Math.min(1, intensity);
      tone('sine', 150, 55, 0.12, 0.5 * v);
      hiss('lowpass', 400, 1, 0.05, 0.25 * v);
    },
    dribble() {
      tone('sine', 130, 60, 0.09, 0.28);
    },
    rim(intensity = 1) {
      if (!throttle('rim', 60)) return;
      const v = Math.min(1, intensity);
      tone('square', 523, 500, 0.18, 0.09 * v);
      tone('triangle', 1210, 1150, 0.28, 0.14 * v);
      tone('sine', 1890, 1850, 0.2, 0.06 * v);
    },
    board(intensity = 1) {
      if (!throttle('board', 60)) return;
      hiss('lowpass', 700, 1, 0.12, 0.4 * Math.min(1, intensity));
      tone('sine', 90, 60, 0.15, 0.3 * Math.min(1, intensity));
    },
    swish() {
      hiss('highpass', 2500, 0.8, 0.32, 0.35, 0.03, 0, 6000);
    },
    jump() {
      tone('sine', 300, 520, 0.08, 0.07);
    },
    land(v) {
      if (!throttle('land', 50)) return;
      hiss('lowpass', 300, 1, 0.08, Math.min(0.3, v / 4000));
    },
    shoot() {
      hiss('bandpass', 900, 2, 0.12, 0.15, 0.02, 0, 2400);
    },
    swipe() {
      hiss('bandpass', 1500, 3, 0.1, 0.18, 0.01, 0, 600);
    },
    steal() {
      tone('square', 880, 1320, 0.08, 0.08);
      tone('square', 1320, 1760, 0.1, 0.08, 0.07);
    },
    block() {
      tone('sawtooth', 200, 80, 0.2, 0.25);
      hiss('lowpass', 900, 1, 0.15, 0.4);
    },
    dunk() {
      tone('sine', 110, 40, 0.35, 0.7);
      hiss('lowpass', 1200, 1, 0.3, 0.5);
      tone('triangle', 900, 700, 0.4, 0.12, 0.02);
    },
    cheer(size = 1) {
      hiss('bandpass', 1100, 0.6, 1.3 * size, 0.28 * size, 0.25);
      hiss('bandpass', 2400, 1.2, 1.0 * size, 0.12 * size, 0.3);
    },
    groan() {
      hiss('bandpass', 400, 0.8, 0.8, 0.18, 0.15, 0, 250);
    },
    beep(high) {
      tone('square', high ? 1046 : 660, high ? 1046 : 660, high ? 0.45 : 0.15, 0.12);
    },
    buzzer() {
      tone('sawtooth', 220, 210, 0.9, 0.18);
      tone('square', 223, 213, 0.9, 0.1);
    },
    fire() {
      hiss('bandpass', 600, 0.6, 0.7, 0.3, 0.05, 0, 2000);
      tone('sawtooth', 160, 640, 0.5, 0.1);
    },
    click() {
      tone('triangle', 700, 900, 0.05, 0.08);
    },
  };
}
