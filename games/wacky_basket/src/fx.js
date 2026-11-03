const MAX_PARTICLES = 700;
const MAX_POPUPS = 16;

export const P_GLOW = 0;
export const P_CONFETTI = 1;
export const P_DUST = 2;

export const GLOW = {
  fire: [255, 140, 40],
  ember: [255, 220, 90],
  white: [255, 255, 255],
  coral: [255, 107, 107],
  teal: [78, 205, 196],
  gold: [255, 230, 109],
};

const CONFETTI_COLORS = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a78bfa', '#f472b6', '#60a5fa', '#ffffff'];

function makeGlowSprite([r, g, b]) {
  const size = 64;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, `rgba(255,255,255,1)`);
  grad.addColorStop(0.25, `rgba(${r},${g},${b},0.9)`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return c;
}

export function createFx() {
  const sprites = {};
  for (const [k, rgb] of Object.entries(GLOW)) sprites[k] = makeGlowSprite(rgb);

  const particles = [];
  for (let i = 0; i < MAX_PARTICLES; i++) {
    particles.push({ alive: false, type: 0, x: 0, y: 0, vx: 0, vy: 0, life: 0, max: 1, size: 1, grow: 0, gravity: 0, drag: 0, rot: 0, vr: 0, sprite: null, color: '' });
  }
  const popups = [];
  for (let i = 0; i < MAX_POPUPS; i++) {
    popups.push({ alive: false, text: '', x: 0, y: 0, life: 0, max: 1, color: '#fff', size: 40, vy: 0 });
  }

  let cursor = 0;
  const fx = {
    sprites,
    trauma: 0,
    shakeX: 0,
    shakeY: 0,
    timeScale: 1,
    slowTimer: 0,
    zoom: 0,
    zoomX: 800,
    zoomY: 450,
    flash: 0,
    time: 0,

    spawn(type, x, y, vx, vy, life, size, opts) {
      let p = null;
      for (let n = 0; n < MAX_PARTICLES; n++) {
        const cand = particles[cursor];
        cursor = (cursor + 1) % MAX_PARTICLES;
        if (!cand.alive) {
          p = cand;
          break;
        }
      }
      if (!p) {
        p = particles[cursor];
        cursor = (cursor + 1) % MAX_PARTICLES;
      }
      p.alive = true;
      p.type = type;
      p.x = x;
      p.y = y;
      p.vx = vx;
      p.vy = vy;
      p.life = p.max = life;
      p.size = size;
      p.grow = opts?.grow ?? 0;
      p.gravity = opts?.gravity ?? 0;
      p.drag = opts?.drag ?? 0;
      p.rot = Math.random() * Math.PI * 2;
      p.vr = (Math.random() - 0.5) * 14;
      p.sprite = opts?.sprite ?? null;
      p.color = opts?.color ?? '#fff';
      return p;
    },

    glow(x, y, vx, vy, life, size, key, gravity = -200, grow = 0) {
      return fx.spawn(P_GLOW, x, y, vx, vy, life, size, { sprite: sprites[key], gravity, drag: 1.5, grow });
    },

    burst(x, y, count, key, speed, life, size) {
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = speed * (0.3 + Math.random() * 0.7);
        fx.glow(x, y, Math.cos(a) * s, Math.sin(a) * s, life * (0.6 + Math.random() * 0.6), size * (0.6 + Math.random() * 0.8), key, 300);
      }
    },

    confetti(x, y, count, spread = 1) {
      for (let i = 0; i < count; i++) {
        const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.2 * spread;
        const s = 500 + Math.random() * 900;
        fx.spawn(P_CONFETTI, x, y, Math.cos(a) * s, Math.sin(a) * s, 2.2 + Math.random() * 1.5, 7 + Math.random() * 7, {
          gravity: 900,
          drag: 2.2,
          color: CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0],
        });
      }
    },

    dust(x, y, count, power = 1) {
      for (let i = 0; i < count; i++) {
        const dir = i % 2 ? 1 : -1;
        fx.spawn(P_DUST, x + dir * Math.random() * 14, y - 4, dir * (80 + Math.random() * 180) * power, -(20 + Math.random() * 80) * power, 0.4 + Math.random() * 0.35, 6 + Math.random() * 8, {
          gravity: 150,
          drag: 4,
          grow: 22,
          color: 'rgba(240, 215, 180, 1)',
        });
      }
    },

    crowdFlashes(count) {
      for (let i = 0; i < count; i++) {
        fx.glow(Math.random() * 1600, 200 + Math.random() * 360, 0, 0, 0.1 + Math.random() * 0.12, 12 + Math.random() * 14, 'white', 0);
      }
    },

    popup(text, x, y, color = '#ffe66d', size = 56, life = 1.1) {
      let p = popups.find((q) => !q.alive) || popups[0];
      p.alive = true;
      p.text = text;
      p.x = x;
      p.y = y;
      p.life = p.max = life;
      p.color = color;
      p.size = size;
      p.vy = -70;
    },

    shake(amount) {
      fx.trauma = Math.min(1, fx.trauma + amount);
    },

    slowmo(scale, duration) {
      fx.timeScale = scale;
      fx.slowTimer = duration;
    },

    punch(x, y, amount) {
      fx.zoom = Math.max(fx.zoom, amount);
      fx.zoomX = x;
      fx.zoomY = y;
    },

    clear() {
      for (const p of particles) p.alive = false;
      for (const p of popups) p.alive = false;
      fx.trauma = 0;
      fx.zoom = 0;
      fx.timeScale = 1;
      fx.slowTimer = 0;
      fx.flash = 0;
    },

    // Real-time (unscaled) update for camera effects.
    updateCamera(dt) {
      fx.time += dt;
      fx.trauma = Math.max(0, fx.trauma - dt * 1.7);
      const t = fx.trauma * fx.trauma;
      fx.shakeX = t * 22 * Math.sin(fx.time * 71.3);
      fx.shakeY = t * 18 * Math.sin(fx.time * 53.7 + 1.3);
      fx.zoom = Math.max(0, fx.zoom - dt * 0.35);
      fx.flash = Math.max(0, fx.flash - dt * 2.5);
      if (fx.slowTimer > 0) {
        fx.slowTimer -= dt;
        if (fx.slowTimer <= 0) fx.timeScale = 1;
      }
    },

    update(dt) {
      for (const p of particles) {
        if (!p.alive) continue;
        p.life -= dt;
        if (p.life <= 0) {
          p.alive = false;
          continue;
        }
        const k = Math.max(0, 1 - p.drag * dt);
        p.vx *= k;
        p.vy = p.vy * k + p.gravity * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.size += p.grow * dt;
        p.rot += p.vr * dt;
        if (p.type === P_CONFETTI && p.y > 860) {
          p.y = 860;
          p.vy = 0;
          p.vx *= 0.8;
          p.vr = 0;
        }
      }
      for (const p of popups) {
        if (!p.alive) continue;
        p.life -= dt;
        p.y += p.vy * dt;
        p.vy *= 1 - 2 * dt;
        if (p.life <= 0) p.alive = false;
      }
    },

    drawBack(ctx) {
      ctx.fillStyle = 'rgba(240, 215, 180, 1)';
      for (const p of particles) {
        if (!p.alive || p.type !== P_DUST) continue;
        ctx.globalAlpha = (p.life / p.max) * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    },

    drawFront(ctx) {
      ctx.globalCompositeOperation = 'lighter';
      for (const p of particles) {
        if (!p.alive || p.type !== P_GLOW) continue;
        const a = p.life / p.max;
        ctx.globalAlpha = a;
        const s = p.size * (0.5 + a * 0.5);
        ctx.drawImage(p.sprite, p.x - s, p.y - s, s * 2, s * 2);
      }
      ctx.globalCompositeOperation = 'source-over';
      for (const p of particles) {
        if (!p.alive || p.type !== P_CONFETTI) continue;
        ctx.globalAlpha = Math.min(1, p.life * 2);
        ctx.fillStyle = p.color;
        const w = p.size * (0.15 + Math.abs(Math.cos(p.rot)) * 0.85);
        const h = p.size * (0.35 + Math.abs(Math.sin(p.rot * 0.7)) * 0.4);
        ctx.fillRect(p.x - w / 2, p.y - h / 2, w, h);
      }
      ctx.globalAlpha = 1;
    },

    drawPopups(ctx) {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.lineJoin = 'round';
      for (const p of popups) {
        if (!p.alive) continue;
        const age = p.max - p.life;
        const pop = age < 0.15 ? 0.4 + (age / 0.15) * 0.8 : age < 0.25 ? 1.2 - ((age - 0.15) / 0.1) * 0.2 : 1;
        const a = Math.min(1, p.life / 0.3);
        ctx.globalAlpha = a;
        ctx.font = `900 ${Math.round(p.size * pop)}px "Trebuchet MS", sans-serif`;
        ctx.lineWidth = p.size * 0.16;
        ctx.strokeStyle = '#1a1a2e';
        ctx.strokeText(p.text, p.x, p.y);
        ctx.fillStyle = p.color;
        ctx.fillText(p.text, p.x, p.y);
      }
      ctx.globalAlpha = 1;
    },
  };
  return fx;
}
