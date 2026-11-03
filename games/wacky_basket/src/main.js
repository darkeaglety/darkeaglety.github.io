import {
  WORLD_W,
  WORLD_H,
  FLOOR_Y,
  SIM_DT,
  MAX_DPR,
  WIN_SCORE,
  GRAVITY,
  BALL_FLOOR_BOUNCE,
  THREE_PT_DIST,
  PLAYER_HALF_W,
  STEAL_CHANCE,
  BLOCK_CHANCE,
  ON_FIRE_STREAK,
  TEAMS,
  WACKY_MOMENTS,
  NORMAL_MOMENT,
} from './constants.js';
import { createInputState, clearEdges } from './input/state.js';
import { attachKeyboard } from './input/keyboard.js';
import { attachTouch } from './input/touch.js';
import { createHoop, createBall, solveShot, stepFreeBall, pushTrail } from './physics.js';
import { createPlayer, placePlayer, stepPlayer, heldBallPosition } from './player.js';
import { animate, drawStickman } from './stickman.js';
import { buildCourtCache, createNet, stepNet, drawNet, drawRim } from './court.js';
import { createFx } from './fx.js';
import { createAudio } from './audio.js';
import { createUI } from './ui.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d', { alpha: false });
const audio = createAudio();
const fx = createFx();
const inputs = [createInputState(), createInputState()];
const demoInputs = [createInputState(), createInputState()];
const touch = attachTouch(document.getElementById('touch-root'), inputs);

const titleEl = document.getElementById('title');
const TITLE_COLORS = ['#ff6b6b', '#ffe66d', '#4ecdc4', '#a78bfa', '#f472b6'];
'WACKY BASKET'.split('').forEach((ch, i) => {
  const s = document.createElement('span');
  s.textContent = ch === ' ' ? '\u00a0' : ch;
  s.style.color = TITLE_COLORS[i % TITLE_COLORS.length];
  s.style.animationDelay = `${-i * 0.12}s`;
  titleEl.appendChild(s);
});

const game = {
  state: 'menu',
  demo: true,
  paused: false,
  settings: null,
  moment: NORMAL_MOMENT,
  params: null,
  hoops: [],
  nets: [],
  ball: createBall(),
  players: [],
  scores: [0, 0],
  scorePulse: [0, 0],
  stateTimer: 0,
  controlsLive: false,
  allowPickup: true,
  nextPossession: 0,
  countdownStep: 0,
  countdownStart: 0,
  winner: -1,
  time: 0,
  stepCount: 0,
  demoRange: [400, 400],
};

const view = { dpr: 1, cw: 0, ch: 0, scale: 1, ox: 0, oy: 0, court: null, ballSprite: null, ballSpriteR: 0 };
// Dynamic resolution: slow devices (fill-rate bound) drop the backing-store size until frames are smooth.
const quality = { scale: 1, slowTime: 0, pending: null, locked: false };
let showFps = false;
let fpsAvg = 60;

const ui = createUI({
  onPlay(settings) {
    audio.unlock();
    audio.click();
    game.settings = settings;
    ui.hideMenu();
    startMatch();
  },
  onResume() {
    audio.click();
    setPaused(false);
  },
  onRestart() {
    audio.click();
    ui.hideGameOver();
    setPaused(false);
    startMatch();
  },
  onMenu() {
    audio.click();
    setPaused(false);
    goToMenu();
  },
  onPauseToggle() {
    audio.click();
    setPaused(!game.paused);
  },
  onMute() {
    audio.unlock();
    return audio.toggleMute();
  },
  onClick() {
    audio.unlock();
    audio.click();
  },
});
ui.setMuted(audio.muted);

attachKeyboard(inputs, {
  onPause() {
    if (!game.demo && game.state !== 'over') setPaused(!game.paused);
  },
  onToggleFps() {
    showFps = !showFps;
  },
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden && !game.demo && game.state !== 'over') setPaused(true);
});

function setPaused(v) {
  game.paused = v;
  ui.showPause(v);
}

// ---------------------------------------------------------------- setup

function makeParams(moment) {
  return {
    gravityMul: moment.gravityMul ?? 1,
    floorBounce: moment.floorBounce ?? BALL_FLOOR_BOUNCE,
    headScale: moment.headScale ?? 1,
    speedMul: moment.speedMul ?? 1,
    jumpMul: moment.jumpMul ?? 1,
    rimScale: moment.rimScale ?? 1,
  };
}

function setupWorld(moment) {
  game.moment = moment;
  game.params = makeParams(moment);
  game.hoops = [createHoop(1, game.params.rimScale), createHoop(-1, game.params.rimScale)];
  game.nets = game.hoops.map(createNet);
  game.players = [createPlayer(0, game.hoops[0]), createPlayer(1, game.hoops[1])];
  game.ball = createBall();
  game.scores = [0, 0];
  game.scorePulse = [0, 0];
  game.winner = -1;
  fx.clear();
  rebuildCourt();
}

function startMatch() {
  game.demo = false;
  const s = game.settings;
  const moment = s.wacky ? WACKY_MOMENTS[(Math.random() * WACKY_MOMENTS.length) | 0] : NORMAL_MOMENT;
  setupWorld(moment);
  touch.setVisible(s.mode === 'touch');
  touch.setTableMode(s.mode === 'touch' && s.table);
  resize();
  startTipoff();
}

function goToMenu() {
  ui.hideGameOver();
  touch.setVisible(false);
  ui.showMenu();
  game.demo = true;
  setupWorld(NORMAL_MOMENT);
  setupPossession(0);
  if (view.cw) resize();
}

function startTipoff() {
  const [p0, p1] = game.players;
  placePlayer(p0, 690);
  placePlayer(p1, 910);
  const ball = game.ball;
  ball.holder = null;
  ball.frozen = true;
  ball.x = ball.px = WORLD_W / 2;
  ball.y = ball.py = 560;
  ball.vx = ball.vy = 0;
  ball.lastShooter = -1;
  ball.shotTimer = 99;
  ball.scored = false;
  game.state = 'countdown';
  game.stateTimer = 0;
  game.countdownStep = 0;
  game.countdownStart = game.moment.label ? 1.7 : 0.3;
  game.controlsLive = false;
  game.allowPickup = true;
  if (game.moment.label) {
    fx.popup(game.moment.label, WORLD_W / 2, 300, '#ffe66d', 72, 1.8);
    audio.fire();
  }
}

function setupPossession(idx) {
  const off = game.players[idx];
  const def = game.players[1 - idx];
  const side = off.hoop.side;
  placePlayer(off, side > 0 ? 330 : WORLD_W - 330);
  placePlayer(def, off.x + side * 300);
  const ball = game.ball;
  ball.holder = off;
  ball.frozen = false;
  ball.lastShooter = -1;
  ball.shotTimer = 99;
  ball.scored = false;
  ball.dunk = false;
  ball.shotFire = false;
  ball.trailCount = 0;
  heldBallPosition(off, ball, ball);
  ball.px = ball.x;
  ball.py = ball.y;
  game.state = 'ready';
  game.stateTimer = 0;
  game.controlsLive = false;
  game.allowPickup = true;
  game.demoRange[idx] = 150 + Math.random() * 620;
  if (!game.demo) fx.popup(`${TEAMS[idx].name.toUpperCase()} BALL`, off.x, 360, TEAMS[idx].color, 36, 0.9);
}

// ---------------------------------------------------------------- view

function resize() {
  view.dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR) * quality.scale;
  view.cw = Math.round(window.innerWidth * view.dpr);
  view.ch = Math.round(window.innerHeight * view.dpr);
  canvas.width = view.cw;
  canvas.height = view.ch;
  // Keep the floor line above the on-screen controls so feet and hoops stay visible.
  const reserve = touch.bottomReserve() * view.dpr * 0.85;
  view.scale = Math.min(view.cw / WORLD_W, view.ch / WORLD_H, reserve > 0 ? (view.ch - reserve) / FLOOR_Y : Infinity);
  view.ox = (view.cw - WORLD_W * view.scale) / 2;
  view.oy = reserve > 0 ? Math.max(0, (view.ch - reserve - FLOOR_Y * view.scale) / 2) : (view.ch - WORLD_H * view.scale) / 2;
  rebuildCourt();
}

function rebuildCourt() {
  if (!game.hoops.length) return;
  view.court = buildCourtCache(view.scale, game.hoops);
  view.ballSprite = makeBallSprite(game.ball.r, view.scale);
  view.ballSpriteR = game.ball.r;
}

function makeBallSprite(r, scale) {
  const pad = 3;
  const size = Math.ceil((r + pad) * 2 * scale);
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  g.scale(size / ((r + pad) * 2), size / ((r + pad) * 2));
  g.translate(r + pad, r + pad);
  const grad = g.createRadialGradient(-r * 0.35, -r * 0.4, r * 0.1, 0, 0, r);
  grad.addColorStop(0, '#ffc27a');
  grad.addColorStop(0.55, '#f2791f');
  grad.addColorStop(1, '#a84508');
  g.fillStyle = grad;
  g.beginPath();
  g.arc(0, 0, r, 0, Math.PI * 2);
  g.fill();
  g.save();
  g.clip();
  g.strokeStyle = '#3d1a03';
  g.lineWidth = 2.2;
  g.beginPath();
  g.moveTo(-r, 0);
  g.lineTo(r, 0);
  g.moveTo(0, -r);
  g.lineTo(0, r);
  g.moveTo(-r * 0.62, -r);
  g.quadraticCurveTo(-r * 0.15, 0, -r * 0.62, r);
  g.moveTo(r * 0.62, -r);
  g.quadraticCurveTo(r * 0.15, 0, r * 0.62, r);
  g.stroke();
  g.restore();
  g.strokeStyle = '#2a1102';
  g.lineWidth = 2.5;
  g.beginPath();
  g.arc(0, 0, r, 0, Math.PI * 2);
  g.stroke();
  return c;
}

window.addEventListener('resize', resize);

// ---------------------------------------------------------------- rules

function gauss() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

game.releaseShot = (p) => {
  const ball = game.ball;
  const hoop = p.hoop;
  const opp = game.players[1 - p.idx];
  const dist = Math.abs(p.x - hoop.center);
  const value = dist > THREE_PT_DIST ? 3 : 2;

  let sigma = 10 + dist * 0.1;
  sigma *= 1 + Math.abs(p.vx) / 1400;
  const oppDx = Math.abs(opp.x - p.x);
  const oppBetween = (opp.x - p.x) * hoop.side > -30;
  if (oppDx < 150 && oppBetween) sigma *= !opp.grounded ? 2.1 : oppDx < 110 ? 1.45 : 1.15;
  if (p.onFire) sigma *= 0.4;

  const sx = ball.x;
  const sy = ball.y;
  const tx = hoop.center + gauss() * sigma;
  const g = GRAVITY * game.params.gravityMul;
  const T = (0.45 + dist * 0.0005) / Math.sqrt(game.params.gravityMul);
  const v = solveShot(sx, sy, tx, hoop.rimY, g, T);

  ball.holder = null;
  ball.vx = v.vx;
  ball.vy = v.vy;
  ball.spin = -p.facing * 14;
  ball.lastShooter = p.idx;
  ball.shotValue = value;
  ball.shotTimer = 0;
  ball.touchedRim = false;
  ball.scored = false;
  ball.dunk = false;
  ball.shotFire = p.onFire;
  ball.shotDist = dist;
  ball.blockChecked = false;
  p.shotQueued = false;
  p.shootAnim = 0.5;
  p.noPickup = 0.35;
  audio.shoot();
  if (p.onFire) fx.burst(sx, sy, 14, 'fire', 300, 0.5, 26);
};

game.dunk = (p) => {
  const ball = game.ball;
  const hoop = p.hoop;
  ball.holder = null;
  ball.x = hoop.center;
  ball.y = hoop.rimY - 36;
  ball.px = ball.x;
  ball.py = ball.y - 6;
  ball.vx = 0;
  ball.vy = 950;
  ball.spin = p.facing * 8;
  ball.lastShooter = p.idx;
  ball.shotValue = 2;
  ball.shotTimer = 0;
  ball.touchedRim = true;
  ball.scored = false;
  ball.dunk = true;
  ball.shotFire = p.onFire;
  p.shotQueued = false;
  p.hangTimer = 0.45;
  p.hangX = hoop.center - hoop.side * 24;
  p.hangY = hoop.rimY + 214;
  p.vx = 0;
  p.vy = 0;
  p.noPickup = 0.6;
  hoop.rimShake = 1;
  fx.shake(0.6);
  fx.punch(hoop.center, hoop.rimY, 0.12);
  fx.burst(hoop.center, hoop.rimY, 26, p.onFire ? 'fire' : 'gold', 700, 0.5, 26);
  fx.popup('DUNK!', hoop.center - hoop.side * 140, hoop.rimY - 90, '#ff6b35', 80, 1.2);
  audio.dunk();
};

game.events = {
  bounce(ball, impact) {
    audio.bounce(impact / 1400);
    if (impact > 700) fx.dust(ball.x, FLOOR_Y, 3, 0.5);
  },
  wall(ball, v) {
    if (v > 150) audio.board(v / 1500);
  },
  rim(ball, v, hoop) {
    audio.rim(v / 900);
    if (v > 400) fx.burst(ball.x, hoop.rimY, 5, 'ember', 250, 0.25, 12);
  },
  board(ball, v) {
    audio.board(v / 1200);
  },
  score: onScore,
  jump(p) {
    audio.jump();
    fx.dust(p.x, FLOOR_Y, 4, 0.7);
  },
  land(p, vy) {
    if (vy > 500) {
      fx.dust(p.x, FLOOR_Y, 6, vy / 1300);
      audio.land(vy);
    }
  },
  dribble() {
    audio.dribble();
  },
  crossover(p) {
    audio.swipe();
    const def = game.players[1 - p.idx];
    if (def.grounded && Math.abs(def.x - p.x) < 170 && def.stumble <= 0) {
      def.stumble = 0.7;
      fx.popup('ANKLES!', def.x, FLOOR_Y - 270, '#a78bfa', 44, 0.9);
      fx.shake(0.12);
    }
  },
  swipe() {
    audio.swipe();
  },
};

function onScore(ball, hoop) {
  if (game.state !== 'play') return;
  const scorer = game.players[hoop.attacker];
  const other = game.players[1 - hoop.attacker];
  const value = ball.lastShooter === hoop.attacker ? ball.shotValue : 2;
  const swish = !ball.touchedRim;
  const big = ball.dunk || value === 3;

  fx.confetti(hoop.center, hoop.rimY + 40, big ? 70 : 40, 0.8);
  fx.crowdFlashes(big ? 40 : 22);
  fx.shake(ball.dunk ? 0.35 : 0.2);
  fx.flash = big ? 0.25 : 0.12;
  audio.cheer(big ? 1.2 : 0.9);
  if (swish) audio.swish();

  const px = hoop.center - hoop.side * 120;
  fx.popup(`+${value}`, px, hoop.rimY - 40, value === 3 ? '#ffe66d' : '#ffffff', 64, 1.1);
  if (swish && !ball.dunk) fx.popup('SWISH!', px, hoop.rimY - 120, '#4ecdc4', 50, 1.2);
  if (value === 3 && ball.shotDist > 820) fx.popup('FROM DOWNTOWN!', WORLD_W / 2, 250, '#ffe66d', 54, 1.4);

  if (game.demo) {
    game.state = 'scored';
    game.stateTimer = 0;
    game.allowPickup = false;
    game.nextPossession = 1 - hoop.attacker;
    return;
  }

  game.scores[hoop.attacker] += value;
  game.scorePulse[hoop.attacker] = 1;

  scorer.streak += 1;
  other.streak = 0;
  if (other.onFire) {
    other.onFire = false;
    fx.popup('FIRE OUT', other.x, FLOOR_Y - 280, '#9ca3af', 34, 1);
  }
  if (!scorer.onFire && scorer.streak >= ON_FIRE_STREAK) {
    scorer.onFire = true;
    fx.popup("HE'S ON FIRE!", WORLD_W / 2, 300, '#ff8c2a', 70, 1.6);
    fx.burst(scorer.x, scorer.y - 120, 40, 'fire', 600, 0.7, 30);
    audio.fire();
  }

  scorer.mood = 'celebrate';
  other.mood = 'play';
  game.controlsLive = false;
  game.allowPickup = false;
  game.stateTimer = 0;
  game.nextPossession = 1 - hoop.attacker;

  if (game.scores[hoop.attacker] >= WIN_SCORE) {
    game.state = 'won';
    game.winner = hoop.attacker;
    other.mood = 'sad';
    fx.slowmo(0.25, 1.2);
    fx.punch(hoop.center, hoop.rimY + 60, 0.35);
    fx.confetti(WORLD_W / 2, FLOOR_Y, 120, 1.4);
    fx.popup('GAME!', WORLD_W / 2, 330, TEAMS[hoop.attacker].color, 110, 2.4);
    audio.buzzer();
    audio.cheer(1.6);
  } else {
    game.state = 'scored';
  }
}

function resolveSteals() {
  const ball = game.ball;
  for (const d of game.players) {
    const holder = ball.holder;
    if (d.stealTimer <= 0 || d.stealResolved || !holder || holder === d) continue;
    const hx = d.x + d.facing * 62;
    const hy = d.y - 60;
    const dx = ball.x - hx;
    const dy = ball.y - hy;
    if (dx * dx + dy * dy > 75 * 75) continue;
    d.stealResolved = true;
    let chance = STEAL_CHANCE;
    if (holder.crossTimer > 0) chance = 0;
    if (holder.onFire) chance *= 0.6;
    if (!holder.grounded) chance *= 0.5;
    if (Math.random() < chance) {
      ball.holder = null;
      ball.vx = -d.facing * 200 + d.vx * 0.3;
      ball.vy = -480;
      ball.spin = 20;
      ball.lastShooter = -1;
      ball.shotTimer = 99;
      holder.noPickup = 0.55;
      holder.shotQueued = false;
      d.noPickup = 0.08;
      fx.popup('STOLEN!', d.x, d.y - 260, '#ffe66d', 46, 0.9);
      fx.burst(ball.x, ball.y, 12, 'gold', 400, 0.4, 16);
      fx.shake(0.15);
      audio.steal();
    } else {
      d.stumble = 0.45;
      fx.popup('WHIFF!', d.x, d.y - 250, '#cbd5e1', 32, 0.7);
    }
  }
}

function resolveBlocks() {
  const ball = game.ball;
  if (ball.holder || ball.dunk || ball.blockChecked || ball.shotTimer > 0.5) return;
  for (const d of game.players) {
    if (d.grounded || ball.lastShooter !== 1 - d.idx) continue;
    const hx = d.x + d.facing * 10;
    const hy = d.y - 215;
    const dx = ball.x - hx;
    const dy = ball.y - hy;
    if (dx * dx + dy * dy > 52 * 52) continue;
    ball.blockChecked = true;
    if (Math.random() > BLOCK_CHANCE) return;
    const shooterHoop = game.players[ball.lastShooter].hoop;
    ball.vx = -shooterHoop.side * (380 + Math.random() * 240);
    ball.vy = -150 + Math.random() * 300;
    ball.spin = 25;
    ball.lastShooter = -1;
    ball.shotTimer = 99;
    d.noPickup = 0.15;
    fx.popup('BLOCKED!', d.x, d.y - 300, '#ff6b6b', 58, 1);
    fx.burst(ball.x, ball.y, 18, 'white', 500, 0.35, 18);
    fx.shake(0.35);
    audio.block();
    return;
  }
}

function resolvePickups() {
  const ball = game.ball;
  if (ball.holder || !game.allowPickup || ball.frozen) return;
  const order = game.stepCount & 1 ? [1, 0] : [0, 1];
  for (const i of order) {
    const p = game.players[i];
    if (p.noPickup > 0 || p.hangTimer > 0) continue;
    if (ball.shotTimer < 0.25 && ball.lastShooter !== -1) continue;
    const reachTop = p.grounded ? 200 : 245;
    if (Math.abs(ball.x - p.x) < 56 && ball.y > p.y - reachTop && ball.y < p.y + 10) {
      const wasShot = ball.lastShooter !== -1 && ball.touchedRim && !ball.scored;
      ball.holder = p;
      ball.frozen = false;
      ball.scored = false;
      ball.dunk = false;
      ball.shotFire = false;
      ball.trailCount = 0;
      p.dribblePhase = 0.1;
      if (wasShot && !game.demo) fx.popup('REBOUND!', p.x, p.y - 260, '#ffffff', 30, 0.7);
      audio.dribble();
      return;
    }
  }
}

function separatePlayers() {
  const [a, b] = game.players;
  const dx = b.x - a.x;
  const minD = PLAYER_HALF_W * 2;
  // Soft push so a defender slows a drive without making it impossible to blow past.
  if (Math.abs(dx) < minD && Math.abs(a.y - b.y) < 120) {
    const push = (minD - Math.abs(dx)) * 0.08 * (dx >= 0 ? 1 : -1);
    a.x -= push;
    b.x += push;
  }
}

function demoAI(i, inp) {
  const p = game.players[i];
  const o = game.players[1 - i];
  const ball = game.ball;
  let target = p.x;
  if (ball.holder === p) {
    target = p.hoop.center - p.hoop.side * game.demoRange[i];
    if (Math.abs(p.x - target) < 40 && p.grounded && Math.random() < 0.06) inp.shootPressed = true;
    if (Math.abs(o.x - p.x) < 120 && Math.random() < 0.004) inp.downPressed = true;
  } else if (ball.holder === o) {
    target = o.x + o.hoop.side * 110;
    if (Math.abs(p.x - o.x) < 120 && Math.random() < 0.008) inp.downPressed = true;
  } else {
    target = ball.x;
    if (ball.y < p.y - 200 && Math.abs(ball.x - p.x) < 90 && p.grounded && ball.vy > 0) inp.jumpPressed = true;
    if (ball.lastShooter === o.idx && ball.shotTimer < 0.12 && Math.abs(p.x - o.x) < 160 && p.grounded) inp.jumpPressed = true;
  }
  inp.right = target > p.x + 18;
  inp.left = target < p.x - 18;
}

// ---------------------------------------------------------------- simulation

function step(dt) {
  game.time += dt;
  game.stepCount++;
  const ball = game.ball;
  for (const p of game.players) {
    p.px = p.x;
    p.py = p.y;
  }
  ball.px = ball.x;
  ball.py = ball.y;

  if (game.state === 'countdown') {
    game.stateTimer += dt;
    const t = game.stateTimer - game.countdownStart;
    const stepIdx = t < 0 ? -1 : Math.floor(t / 0.6);
    if (stepIdx >= 0 && stepIdx > game.countdownStep - 1 && game.countdownStep < 4) {
      game.countdownStep++;
      if (game.countdownStep <= 3) {
        fx.popup(String(4 - game.countdownStep), WORLD_W / 2, 420, '#ffffff', 120, 0.55);
        audio.beep(false);
      } else {
        fx.popup('TIP OFF!', WORLD_W / 2, 420, '#ffe66d', 90, 0.9);
        audio.beep(true);
        ball.frozen = false;
        ball.vy = -1150 * Math.sqrt(game.params.gravityMul);
        game.state = 'play';
        game.controlsLive = true;
      }
    }
  } else if (game.state === 'ready') {
    game.stateTimer += dt;
    if (game.stateTimer > 0.6) {
      game.state = 'play';
      game.controlsLive = true;
    }
  }
  if (game.demo && game.state === 'play') game.controlsLive = true;

  for (const p of game.players) {
    const inp = game.demo ? demoInputs[p.idx] : inputs[p.idx];
    if (game.demo) demoAI(p.idx, inp);
    stepPlayer(p, inp, game, dt);
  }
  for (const s of inputs) clearEdges(s);
  for (const s of demoInputs) clearEdges(s);
  separatePlayers();

  if (ball.holder) {
    heldBallPosition(ball.holder, ball, ball);
    ball.vx = ball.holder.vx;
    ball.vy = ball.holder.vy;
    ball.angle += (ball.holder.vx / ball.r) * dt;
    ball.shotTimer = 99;
  } else if (!ball.frozen) {
    stepFreeBall(ball, game.hoops, game.params, dt, game.events);
  }
  ball.squash = Math.max(0, ball.squash - dt * 4);

  if (game.controlsLive) {
    resolveSteals();
    resolveBlocks();
  }
  resolvePickups();

  for (let i = 0; i < game.nets.length; i++) {
    const hoop = game.hoops[i];
    hoop.rimShake = Math.max(0, hoop.rimShake - dt * 2.2);
    hoop.wobble = Math.sin(game.time * 45) * hoop.rimShake * 5;
    const near = stepNet(game.nets[i], ball, dt, hoop.wobble);
    if (near && !ball.holder && ball.y > hoop.rimY && Math.abs(ball.x - hoop.center) < hoop.half) {
      ball.vx *= 0.97;
      ball.vy *= 0.985;
    }
  }

  const speed2 = ball.vx * ball.vx + ball.vy * ball.vy;
  if (!ball.holder && (game.stepCount & 1) === 0) {
    if (speed2 > 550 * 550) pushTrail(ball);
    else ball.trailCount = Math.max(0, ball.trailCount - 1);
  }

  for (const p of game.players) {
    if (!p.onFire) continue;
    if (Math.random() < 0.6) {
      fx.glow(p.anim.head.x + (Math.random() - 0.5) * 20, p.anim.head.y - 8, (Math.random() - 0.5) * 60, -120 - Math.random() * 120, 0.45, 16 + Math.random() * 10, 'fire', -300);
    }
    if (Math.random() < 0.35) {
      const h = Math.random() < 0.5 ? p.anim.handF : p.anim.handB;
      fx.glow(h.x, h.y, 0, -80, 0.3, 12, 'ember', -200);
    }
  }
  const fireBall = (ball.holder && ball.holder.onFire) || (!ball.holder && ball.shotFire && ball.shotTimer < 3);
  if (fireBall && Math.random() < 0.8) {
    fx.glow(ball.x + (Math.random() - 0.5) * 16, ball.y + (Math.random() - 0.5) * 16, -ball.vx * 0.1, -ball.vy * 0.1 - 60, 0.4, 20 + Math.random() * 10, 'fire', -250);
  }

  game.scorePulse[0] = Math.max(0, game.scorePulse[0] - dt * 2.5);
  game.scorePulse[1] = Math.max(0, game.scorePulse[1] - dt * 2.5);
  fx.update(dt);
}

function updateStates(realDt) {
  if (game.state === 'scored') {
    game.stateTimer += realDt;
    if (game.stateTimer > (game.demo ? 1.3 : 1.6)) setupPossession(game.nextPossession);
  } else if (game.state === 'won') {
    game.stateTimer += realDt;
    if (game.stateTimer > 2.8) {
      game.state = 'over';
      touch.setVisible(false);
      ui.showGameOver(TEAMS[game.winner], game.scores);
    }
  }
  if (game.demo && game.state === 'play' && !game.ball.holder && game.ball.shotTimer > 6 && game.ball.y > FLOOR_Y - 40) {
    setupPossession(game.stepCount & 1);
  }
}

// ---------------------------------------------------------------- render

const ballPos = { x: 0, y: 0 };

function render(alpha, realDt) {
  const { scale, ox, oy } = view;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = '#0d0820';
  ctx.fillRect(0, 0, view.cw, view.ch);

  const z = 1 + fx.zoom;
  const s = scale * z;
  const ex = ox + scale * (fx.zoomX * (1 - z) + fx.shakeX);
  const ey = oy + scale * (fx.zoomY * (1 - z) + fx.shakeY);
  ctx.setTransform(s, 0, 0, s, ex, ey);

  ctx.drawImage(view.court, 0, 0, WORLD_W, WORLD_H);

  const ball = game.ball;
  ballPos.x = ball.px + (ball.x - ball.px) * alpha;
  ballPos.y = ball.py + (ball.y - ball.py) * alpha;

  const t = fx.time;
  for (const p of game.players) {
    const rx = p.px + (p.x - p.px) * alpha;
    const ry = p.py + (p.y - p.py) * alpha;
    animate(p, game, rx, ry, ballPos.x, ballPos.y, game.paused ? 0 : realDt, t);
  }

  // Floor reflection
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, FLOOR_Y, WORLD_W, WORLD_H - FLOOR_Y);
  ctx.clip();
  ctx.translate(0, FLOOR_Y * 2);
  ctx.scale(1, -1);
  ctx.globalAlpha = 0.16;
  for (const p of game.players) drawStickman(ctx, p, TEAMS[p.idx], t, true);
  drawBall(ballPos.x, ballPos.y, false);
  ctx.restore();

  // Shadows
  ctx.fillStyle = 'rgba(40, 18, 5, 0.35)';
  ctx.beginPath();
  for (const p of game.players) {
    const h = Math.max(0.35, 1 - (FLOOR_Y - p.y) / 500);
    ctx.moveTo(p.x + 40 * h, FLOOR_Y + 4);
    ctx.ellipse(p.x, FLOOR_Y + 4, 40 * h, 9 * h, 0, 0, Math.PI * 2);
  }
  const bh = Math.max(0.2, 1 - (FLOOR_Y - ballPos.y) / 600);
  ctx.moveTo(ballPos.x + 24 * bh, FLOOR_Y + 3);
  ctx.ellipse(ballPos.x, FLOOR_Y + 3, 24 * bh, 6 * bh, 0, 0, Math.PI * 2);
  ctx.fill();

  fx.drawBack(ctx);

  for (let i = 0; i < game.hoops.length; i++) {
    const hoop = game.hoops[i];
    drawRim(ctx, hoop, hoop.wobble || 0, game.players[hoop.attacker]?.onFire);
  }

  const holder = ball.holder;
  for (const p of game.players) if (p !== holder) drawStickman(ctx, p, TEAMS[p.idx], t, false);
  if (holder) drawStickman(ctx, holder, TEAMS[holder.idx], t, false);

  drawBallTrail(ball);
  drawBall(ballPos.x, ballPos.y, true);

  for (const net of game.nets) drawNet(ctx, net);
  for (const hoop of game.hoops) {
    ctx.fillStyle = '#ff6b35';
    ctx.beginPath();
    ctx.arc(hoop.front, hoop.rimY + (hoop.wobble || 0), 5, 0, Math.PI * 2);
    ctx.fill();
  }

  fx.drawFront(ctx);
  drawIndicators(t);
  fx.drawPopups(ctx);
  if (!game.demo) drawScoreboard(t);

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  if (fx.flash > 0) {
    ctx.fillStyle = `rgba(255, 250, 220, ${fx.flash * 0.6})`;
    ctx.fillRect(0, 0, view.cw, view.ch);
  }
  if (showFps) {
    ctx.fillStyle = '#ffe66d';
    ctx.font = `${14 * view.dpr}px monospace`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`${fpsAvg.toFixed(0)} fps`, 8 * view.dpr, view.ch - 22 * view.dpr);
  }
}

function drawBall(x, y, front) {
  const ball = game.ball;
  const r = ball.r;
  const sq = ball.squash;
  ctx.save();
  ctx.translate(x, y + sq * r);
  ctx.scale(1 + sq, 1 - sq);
  ctx.translate(0, -sq * r);
  ctx.rotate(ball.angle);
  const R = r + 3;
  ctx.drawImage(view.ballSprite, -R, -R, R * 2, R * 2);
  ctx.restore();
  if (front && ball.shotFire && !ball.holder) {
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 0.55;
    const gs = r * 2.6;
    ctx.drawImage(fx.sprites.fire, x - gs, y - gs, gs * 2, gs * 2);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }
}

function drawBallTrail(ball) {
  const n = ball.trailCount;
  if (n < 2) return;
  ctx.fillStyle = ball.shotFire ? '#ff8c2a' : '#ffb366';
  for (let k = 0; k < n; k++) {
    const idx = ((ball.trailHead - 1 - k + 16) % 8) * 2;
    ctx.globalAlpha = 0.28 * (1 - k / n);
    ctx.beginPath();
    ctx.arc(ball.trail[idx], ball.trail[idx + 1], ball.r * (1 - k / (n + 2)), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawIndicators(t) {
  if (game.demo) return;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '900 16px "Trebuchet MS", sans-serif';
  for (const p of game.players) {
    const a = p.anim;
    const x = a.head.x;
    const y = a.head.y - a.headR - 26 + Math.sin(t * 5 + p.idx) * 3;
    ctx.fillStyle = TEAMS[p.idx].color;
    ctx.beginPath();
    ctx.moveTo(x - 9, y + 6);
    ctx.lineTo(x + 9, y + 6);
    ctx.lineTo(x, y + 16);
    ctx.closePath();
    ctx.fill();
    ctx.fillText(`P${p.idx + 1}`, x, y - 6);
  }
}

function drawScoreboard(t) {
  const cx = WORLD_W / 2;
  const top = 18;
  ctx.fillStyle = 'rgba(8, 5, 20, 0.85)';
  ctx.strokeStyle = 'rgba(255, 230, 109, 0.55)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(cx - 220, top, 440, 92, 18);
  else ctx.rect(cx - 220, top, 440, 92);
  ctx.fill();
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '800 15px "Trebuchet MS", sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.fillText(`FIRST TO ${WIN_SCORE}`, cx, top + 64);
  ctx.fillStyle = '#ffe66d';
  ctx.font = '900 26px "Trebuchet MS", sans-serif';
  ctx.fillText('VS', cx, top + 36);

  for (let i = 0; i < 2; i++) {
    const team = TEAMS[i];
    const x = cx + (i === 0 ? -130 : 130);
    const pulse = game.scorePulse[i];
    ctx.font = '800 14px "Trebuchet MS", sans-serif';
    ctx.fillStyle = team.light;
    ctx.fillText(team.name.toUpperCase(), x, top + 17);
    const size = Math.round(50 * (1 + pulse * 0.6));
    ctx.font = `900 ${size}px "Trebuchet MS", sans-serif`;
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#0b0718';
    ctx.strokeText(String(game.scores[i]), x, top + 56);
    ctx.fillStyle = pulse > 0 ? '#ffffff' : team.color;
    ctx.fillText(String(game.scores[i]), x, top + 56);
    if (game.players[i].onFire) {
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 0.6 + Math.sin(t * 12) * 0.2;
      ctx.drawImage(fx.sprites.fire, x - 55, top + 15, 110, 80);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    }
  }

  if (game.moment.label) {
    ctx.font = '900 18px "Trebuchet MS", sans-serif';
    ctx.fillStyle = '#ffe66d';
    ctx.fillText(game.moment.label, cx, top + 112);
  }
}

// ---------------------------------------------------------------- loop

let last = performance.now();
let acc = 0;

// Each downgrade must actually raise the frame rate; if it doesn't (vsync-capped or throttled
// display), revert and stop adapting so the picture isn't blurred for nothing.
function adaptQuality(dt) {
  if (quality.locked || document.hidden || dt <= 0) return;
  const pending = quality.pending;
  if (pending) {
    pending.t += dt;
    if (pending.t < 2.5) return;
    quality.pending = null;
    if (fpsAvg < pending.fpsBefore * 1.12) {
      quality.scale = pending.prevScale;
      quality.locked = true;
      resize();
    }
    return;
  }
  quality.slowTime = fpsAvg < 48 ? quality.slowTime + dt : 0;
  if (quality.slowTime > 2 && quality.scale > 0.5) {
    quality.pending = { prevScale: quality.scale, fpsBefore: fpsAvg, t: 0 };
    quality.scale = Math.max(0.5, quality.scale * 0.75);
    quality.slowTime = 0;
    resize();
  }
}

function frame(now) {
  const realDt = Math.min(0.05, (now - last) / 1000);
  last = now;
  if (realDt > 0) fpsAvg += (1 / realDt - fpsAvg) * 0.05;
  adaptQuality(realDt);

  if (!game.paused) {
    fx.updateCamera(realDt);
    acc += realDt * fx.timeScale;
    let n = 0;
    while (acc >= SIM_DT && n < 12) {
      step(SIM_DT);
      acc -= SIM_DT;
      n++;
    }
    if (n === 12) acc = 0;
    updateStates(realDt);
  }
  render(acc / SIM_DT, realDt);
  requestAnimationFrame(frame);
}

goToMenu();
resize();
requestAnimationFrame(frame);

if (import.meta.env.DEV) window.__wb = { game, step, inputs, fx };
