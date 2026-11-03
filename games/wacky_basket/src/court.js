import { WORLD_W, WORLD_H, FLOOR_Y, THREE_PT_DIST, TEAMS } from './constants.js';

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildCourtCache(scale, hoops) {
  const c = document.createElement('canvas');
  c.width = Math.ceil(WORLD_W * scale);
  c.height = Math.ceil(WORLD_H * scale);
  const g = c.getContext('2d');
  g.scale(scale, scale);
  const rand = mulberry32(1337);

  const wall = g.createLinearGradient(0, 0, 0, FLOOR_Y);
  wall.addColorStop(0, '#0d0820');
  wall.addColorStop(0.45, '#22144a');
  wall.addColorStop(1, '#16213e');
  g.fillStyle = wall;
  g.fillRect(0, 0, WORLD_W, FLOOR_Y);

  // Roof truss
  g.strokeStyle = 'rgba(120, 110, 180, 0.18)';
  g.lineWidth = 3;
  g.beginPath();
  for (let x = -40; x < WORLD_W + 80; x += 80) {
    g.moveTo(x, 20);
    g.lineTo(x + 40, 70);
    g.lineTo(x + 80, 20);
  }
  g.moveTo(0, 20);
  g.lineTo(WORLD_W, 20);
  g.moveTo(0, 70);
  g.lineTo(WORLD_W, 70);
  g.stroke();

  // Bleachers and crowd
  const crowdColors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a78bfa', '#f472b6', '#60a5fa', '#fb923c', '#e5e7eb'];
  for (let row = 0; row < 7; row++) {
    const y = 210 + row * 54;
    const shade = 18 + row * 5;
    g.fillStyle = `rgb(${shade}, ${shade - 4}, ${shade + 22})`;
    g.fillRect(0, y + 22, WORLD_W, 32);
    const offset = row % 2 ? 0 : 22;
    for (let x = offset - 10; x < WORLD_W + 20; x += 44) {
      if (rand() < 0.12) continue;
      const px = x + (rand() - 0.5) * 12;
      const col = crowdColors[(rand() * crowdColors.length) | 0];
      const alpha = 0.35 + row * 0.06;
      g.globalAlpha = alpha;
      g.fillStyle = col;
      g.beginPath();
      g.ellipse(px, y + 24, 15, 20, 0, Math.PI, 0);
      g.fill();
      g.fillStyle = '#f1d3b3';
      g.globalAlpha = alpha * 0.9;
      g.beginPath();
      g.arc(px, y - 2, 9, 0, Math.PI * 2);
      g.fill();
      if (rand() < 0.18) {
        g.strokeStyle = col;
        g.lineWidth = 5;
        g.lineCap = 'round';
        g.beginPath();
        g.moveTo(px - 10, y + 14);
        g.lineTo(px - 16, y - 18);
        g.moveTo(px + 10, y + 14);
        g.lineTo(px + 16, y - 18);
        g.stroke();
      }
    }
  }
  g.globalAlpha = 1;

  // Haze over crowd so players pop
  const haze = g.createLinearGradient(0, 150, 0, 620);
  haze.addColorStop(0, 'rgba(13, 8, 32, 0.65)');
  haze.addColorStop(1, 'rgba(22, 33, 62, 0.25)');
  g.fillStyle = haze;
  g.fillRect(0, 150, WORLD_W, 480);

  // LED ad board
  const ledY = 612;
  const led = g.createLinearGradient(0, ledY, WORLD_W, ledY);
  led.addColorStop(0, '#2b0f3d');
  led.addColorStop(0.5, '#401a5c');
  led.addColorStop(1, '#2b0f3d');
  g.fillStyle = '#0a0614';
  g.fillRect(0, ledY - 6, WORLD_W, 70);
  g.fillStyle = led;
  g.fillRect(0, ledY, WORLD_W, 58);
  g.font = '900 34px "Trebuchet MS", sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  const words = ['WACKY BASKET', 'TYGAMES', 'DUNK CITY', 'WACKY BASKET', 'SWISH!'];
  words.forEach((w, i) => {
    g.fillStyle = i % 2 ? '#4ecdc4' : '#ffe66d';
    g.fillText(w, 160 + i * 320, ledY + 30);
  });
  g.fillStyle = 'rgba(255,255,255,0.06)';
  for (let y = ledY; y < ledY + 58; y += 4) g.fillRect(0, y, WORLD_W, 1);

  g.fillStyle = '#0c0a18';
  g.fillRect(0, ledY + 58, WORLD_W, FLOOR_Y - ledY - 58);

  // Spotlight cones
  g.globalCompositeOperation = 'lighter';
  for (const sx of [320, 800, 1280]) {
    const cone = g.createLinearGradient(sx, 0, sx, FLOOR_Y);
    cone.addColorStop(0, 'rgba(255, 246, 200, 0.16)');
    cone.addColorStop(1, 'rgba(255, 246, 200, 0.02)');
    g.fillStyle = cone;
    g.beginPath();
    g.moveTo(sx - 30, 0);
    g.lineTo(sx + 30, 0);
    g.lineTo(sx + 260, FLOOR_Y);
    g.lineTo(sx - 260, FLOOR_Y);
    g.closePath();
    g.fill();
  }
  g.globalCompositeOperation = 'source-over';

  // Floor
  const floor = g.createLinearGradient(0, FLOOR_Y, 0, WORLD_H);
  floor.addColorStop(0, '#f0b878');
  floor.addColorStop(0.35, '#d99a5b');
  floor.addColorStop(1, '#8a5530');
  g.fillStyle = floor;
  g.fillRect(0, FLOOR_Y, WORLD_W, WORLD_H - FLOOR_Y);
  g.strokeStyle = 'rgba(90, 50, 20, 0.22)';
  g.lineWidth = 1.5;
  g.beginPath();
  for (let y = FLOOR_Y + 12, step = 12; y < WORLD_H; y += step, step *= 1.18) {
    g.moveTo(0, y);
    g.lineTo(WORLD_W, y);
  }
  for (let i = 0; i < 160; i++) {
    const y = FLOOR_Y + 4 + rand() * (WORLD_H - FLOOR_Y);
    const x = rand() * WORLD_W;
    g.moveTo(x, y);
    g.lineTo(x, y + 8 + (y - FLOOR_Y) * 0.08);
  }
  g.stroke();

  // Court paint
  for (const hoop of hoops) {
    const team = TEAMS[hoop.attacker === 0 ? 1 : 0];
    const baseX = hoop.side > 0 ? WORLD_W : 0;
    const keyX = hoop.center - hoop.side * 260;
    g.fillStyle = team.color;
    g.globalAlpha = 0.28;
    g.beginPath();
    g.moveTo(baseX, FLOOR_Y + 8);
    g.lineTo(keyX, FLOOR_Y + 8);
    g.lineTo(keyX - hoop.side * 40, WORLD_H - 20);
    g.lineTo(baseX, WORLD_H - 20);
    g.closePath();
    g.fill();
    g.globalAlpha = 1;

    const tx = hoop.center - hoop.side * THREE_PT_DIST;
    g.strokeStyle = 'rgba(255,255,255,0.85)';
    g.lineWidth = 4;
    g.beginPath();
    g.ellipse(hoop.center, FLOOR_Y + 50, THREE_PT_DIST, 36, 0, hoop.side > 0 ? Math.PI * 0.5 : -Math.PI * 0.5, hoop.side > 0 ? Math.PI * 1.5 : Math.PI * 0.5);
    g.stroke();
    g.fillStyle = 'rgba(255,255,255,0.9)';
    g.font = '900 22px "Trebuchet MS", sans-serif';
    g.fillText('3', tx - hoop.side * 26, FLOOR_Y + 40);
  }

  g.strokeStyle = 'rgba(255,255,255,0.85)';
  g.lineWidth = 4;
  g.beginPath();
  g.moveTo(WORLD_W / 2, FLOOR_Y + 6);
  g.lineTo(WORLD_W / 2, WORLD_H - 18);
  g.stroke();
  g.beginPath();
  g.ellipse(WORLD_W / 2, FLOOR_Y + 52, 120, 30, 0, 0, Math.PI * 2);
  g.stroke();
  g.fillStyle = 'rgba(255, 230, 109, 0.35)';
  g.fill();
  g.fillStyle = 'rgba(60, 25, 5, 0.55)';
  g.font = '900 30px "Trebuchet MS", sans-serif';
  g.fillText('WB', WORLD_W / 2, FLOOR_Y + 54);

  // Stanchions and backboards
  for (const hoop of hoops) {
    const poleX = hoop.boardX + hoop.side * 46;
    g.fillStyle = '#2d3142';
    g.fillRect(poleX - 9, 250, 18, FLOOR_Y - 250);
    g.fillStyle = '#3d4258';
    g.fillRect(poleX - 9, 250, 6, FLOOR_Y - 250);
    g.fillStyle = TEAMS[hoop.attacker === 0 ? 1 : 0].dark;
    g.fillRect(poleX - 14, FLOOR_Y - 170, 28, 170);
    g.fillStyle = '#1b1e2b';
    g.fillRect(Math.min(poleX, hoop.boardX), 330, Math.abs(poleX - hoop.boardX), 12);
    g.fillRect(Math.min(poleX, hoop.boardX), 400, Math.abs(poleX - hoop.boardX), 10);

    const bx = hoop.boardX - 7;
    const glass = g.createLinearGradient(bx, 0, bx + 14, 0);
    glass.addColorStop(0, 'rgba(200, 235, 255, 0.85)');
    glass.addColorStop(1, 'rgba(140, 190, 230, 0.6)');
    g.fillStyle = glass;
    g.fillRect(bx, hoop.boardTop, 14, hoop.boardBottom - hoop.boardTop);
    g.fillStyle = '#ffffff';
    g.fillRect(bx, hoop.boardTop, 14, 4);
    g.fillStyle = '#ff6b35';
    g.fillRect(bx, hoop.rimY - 56, 14, 56);
    g.fillStyle = TEAMS[hoop.attacker === 0 ? 1 : 0].color;
    g.fillRect(bx - 2, hoop.boardBottom - 8, 18, 14);
    // Rim bracket
    g.fillStyle = '#c8461d';
    g.fillRect(Math.min(hoop.back, hoop.boardX), hoop.rimY - 2, Math.abs(hoop.boardX - hoop.back), 7);
  }

  return c;
}

const NET_COLS = 5;
const NET_ROWS = 5;

export function createNet(hoop) {
  const n = NET_COLS * NET_ROWS;
  const net = {
    hoop,
    x: new Float32Array(n),
    y: new Float32Array(n),
    ox: new Float32Array(n),
    oy: new Float32Array(n),
    links: [],
  };
  const width = hoop.back - hoop.front;
  for (let r = 0; r < NET_ROWS; r++) {
    const shrink = 1 - (r / (NET_ROWS - 1)) * 0.42;
    for (let c = 0; c < NET_COLS; c++) {
      const i = r * NET_COLS + c;
      const t = c / (NET_COLS - 1) - 0.5;
      net.x[i] = net.ox[i] = hoop.center + t * width * shrink;
      net.y[i] = net.oy[i] = hoop.rimY + r * 15;
    }
  }
  const link = (a, b) => {
    const dx = net.x[a] - net.x[b];
    const dy = net.y[a] - net.y[b];
    net.links.push(a, b, Math.sqrt(dx * dx + dy * dy));
  };
  for (let r = 0; r < NET_ROWS - 1; r++) {
    for (let c = 0; c < NET_COLS; c++) {
      const i = r * NET_COLS + c;
      if (c < NET_COLS - 1) link(i, i + NET_COLS + 1);
      if (c > 0) link(i, i + NET_COLS - 1);
      link(i, i + NET_COLS);
    }
  }
  for (let r = 1; r < NET_ROWS; r++) {
    for (let c = 0; c < NET_COLS - 1; c++) {
      const i = r * NET_COLS + c;
      link(i, i + 1);
    }
  }
  net.links = Float32Array.from(net.links);
  return net;
}

export function stepNet(net, ball, dt, wobble) {
  const { x, y, ox, oy, hoop } = net;
  const g = 900 * dt * dt;
  for (let i = NET_COLS; i < x.length; i++) {
    const vx = (x[i] - ox[i]) * 0.94;
    const vy = (y[i] - oy[i]) * 0.94;
    ox[i] = x[i];
    oy[i] = y[i];
    x[i] += vx;
    y[i] += vy + g;
  }
  const width = hoop.back - hoop.front;
  for (let c = 0; c < NET_COLS; c++) {
    x[c] = hoop.center + (c / (NET_COLS - 1) - 0.5) * width;
    y[c] = hoop.rimY + wobble;
  }

  const br = ball.r + 3;
  const near = Math.abs(ball.x - hoop.center) < hoop.half + ball.r + 10 && ball.y > hoop.rimY - ball.r - 10 && ball.y < hoop.rimY + 110;
  const links = net.links;
  for (let iter = 0; iter < 3; iter++) {
    for (let k = 0; k < links.length; k += 3) {
      const a = links[k];
      const b = links[k + 1];
      const rest = links[k + 2];
      const dx = x[b] - x[a];
      const dy = y[b] - y[a];
      const d = Math.sqrt(dx * dx + dy * dy) || 0.0001;
      const diff = (d - rest) / d;
      const pinA = a < NET_COLS;
      const pinB = b < NET_COLS;
      if (pinA && pinB) continue;
      const wA = pinA ? 0 : pinB ? 1 : 0.5;
      const wB = pinB ? 0 : pinA ? 1 : 0.5;
      x[a] += dx * diff * wA;
      y[a] += dy * diff * wA;
      x[b] -= dx * diff * wB;
      y[b] -= dy * diff * wB;
    }
    if (near) {
      for (let i = NET_COLS; i < x.length; i++) {
        const dx = x[i] - ball.x;
        const dy = y[i] - ball.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < br * br && d2 > 0.0001) {
          const d = Math.sqrt(d2);
          x[i] = ball.x + (dx / d) * br;
          y[i] = ball.y + (dy / d) * br;
        }
      }
    }
  }
  return near;
}

export function drawNet(ctx, net) {
  const { x, y, links } = net;
  ctx.strokeStyle = 'rgba(255,255,255,0.9)';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  for (let k = 0; k < links.length; k += 3) {
    const a = links[k];
    const b = links[k + 1];
    ctx.moveTo(x[a], y[a]);
    ctx.lineTo(x[b], y[b]);
  }
  ctx.stroke();
}

export function drawRim(ctx, hoop, wobble, onFire) {
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#7a2408';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(hoop.front, hoop.rimY + wobble);
  ctx.lineTo(hoop.back, hoop.rimY + wobble * 0.3);
  ctx.stroke();
  ctx.strokeStyle = onFire ? '#ffd23f' : '#ff6b35';
  ctx.lineWidth = 6;
  ctx.stroke();
}
