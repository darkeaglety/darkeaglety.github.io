import { PLAYER_SPEED, STEAL_LUNGE_TIME } from './constants.js';

const THIGH = 46;
const SHIN = 46;
const UPPER_ARM = 34;
const FOREARM = 36;
const TORSO = 60;
const HEAD_R = 17;

const OUTLINE = '#141022';
const LIMB = '#f6f1e7';
const LIMB_BACK = '#c9c1b3';

function pt() {
  return { x: 0, y: 0 };
}

export function createAnim() {
  return {
    init: false,
    hip: pt(),
    neck: pt(),
    shoulder: pt(),
    head: pt(),
    headR: HEAD_R,
    kneeF: pt(),
    footF: pt(),
    kneeB: pt(),
    footB: pt(),
    elbowF: pt(),
    handF: pt(),
    elbowB: pt(),
    handB: pt(),
    tF: pt(),
    tB: pt(),
    lean: 0,
    headOX: 0,
    headOY: 0,
    headVX: 0,
    headVY: 0,
    flick: 0,
    face: 0,
  };
}

const tmp = pt();

// 2-bone IK. Picks the bend that maximizes the preference vector (prefX, prefY).
function solveIK(ax, ay, tx, ty, l1, l2, prefX, prefY, joint, end) {
  let dx = tx - ax;
  let dy = ty - ay;
  let d = Math.sqrt(dx * dx + dy * dy);
  const maxD = l1 + l2 - 0.01;
  if (d > maxD) {
    dx *= maxD / d;
    dy *= maxD / d;
    d = maxD;
  }
  if (d < 1) d = 1;
  end.x = ax + dx;
  end.y = ay + dy;
  const base = Math.atan2(dy, dx);
  const cosA = Math.max(-1, Math.min(1, (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d)));
  const a = Math.acos(cosA);
  const x1 = ax + Math.cos(base + a) * l1;
  const y1 = ay + Math.sin(base + a) * l1;
  const x2 = ax + Math.cos(base - a) * l1;
  const y2 = ay + Math.sin(base - a) * l1;
  const s1 = (x1 - ax) * prefX + (y1 - ay) * prefY;
  const s2 = (x2 - ax) * prefX + (y2 - ay) * prefY;
  if (s1 >= s2) {
    joint.x = x1;
    joint.y = y1;
  } else {
    joint.x = x2;
    joint.y = y2;
  }
}

function setT(o, x, y) {
  o.x = x;
  o.y = y;
}

// Builds the pose for this frame from interpolated position (rx, ry) and ball position (bx, by).
export function animate(p, game, rx, ry, bx, by, dt, t) {
  const a = p.anim;
  const f = p.facing;
  const ball = game.ball;
  const hasBall = ball.holder === p;
  const opp = game.players[1 - p.idx];
  const oppHasBall = ball.holder === opp;
  const speedN = Math.min(1, Math.abs(p.vx) / PLAYER_SPEED);
  const moveDir = p.vx === 0 ? f : Math.sign(p.vx);
  const hanging = p.hangTimer > 0;
  const grounded = p.grounded && !hanging;
  const headScale = game.params.headScale;

  let bodyY = ry;
  if (p.mood === 'celebrate' && grounded) bodyY -= Math.abs(Math.sin(t * 9)) * 26;
  const defStance = grounded && oppHasBall && speedN < 0.6 && p.stealTimer <= 0;

  let hipDrop = p.squash * 26;
  if (p.mood === 'sad') hipDrop += 10;
  if (defStance) hipDrop += 12;
  const bob = grounded ? -Math.abs(Math.sin(p.runPhase)) * 7 * speedN : 0;

  // Torso lean, spring-smoothed
  let leanT = (p.vx / PLAYER_SPEED) * 0.17;
  if (p.stealTimer > 0) leanT += f * 0.55 * (p.stealTimer / STEAL_LUNGE_TIME);
  if (p.mood === 'sad') leanT += f * 0.45;
  if (p.stumble > 0) leanT += Math.sin(t * 22) * 0.35;
  if (defStance) leanT += f * 0.18;
  if (hanging) leanT = -f * 0.12;
  if (p.shootAnim > 0) leanT -= f * 0.08;
  const k = 1 - Math.exp(-dt * 14);
  if (!a.init) a.lean = leanT;
  a.lean += (leanT - a.lean) * k;
  const sl = Math.sin(a.lean);
  const cl = Math.cos(a.lean);

  setT(a.hip, rx, bodyY - 88 + hipDrop + bob);
  setT(a.neck, a.hip.x + sl * TORSO, a.hip.y - cl * TORSO);
  setT(a.shoulder, a.neck.x - sl * 6, a.neck.y + cl * 6);

  // Floppy head on a spring
  const hTX = -p.vx * 0.012;
  const hTY = p.vy * 0.006;
  a.headVX += ((hTX - a.headOX) * 260 - a.headVX * 16) * dt;
  a.headVY += ((hTY - a.headOY) * 260 - a.headVY * 16) * dt;
  a.headOX += a.headVX * dt;
  a.headOY += a.headVY * dt;
  const hr = HEAD_R * headScale;
  a.headR = hr;
  let hx = a.neck.x + sl * (hr + 4) + a.headOX;
  let hy = a.neck.y - cl * (hr + 4) + a.headOY;
  if (p.mood === 'sad') {
    hx += f * 8;
    hy += 7;
  }
  setT(a.head, hx, hy);

  // Legs
  const tF = a.tF;
  const tB = a.tB;
  if (hanging) {
    setT(tF, rx + Math.sin(t * 7) * 12 + f * 6, ry - 4);
    setT(tB, rx + Math.sin(t * 7 + 0.6) * 12 - f * 6, ry);
  } else if (grounded) {
    const stride = 32 * speedN;
    const lift = 26 * speedN;
    const wide = defStance ? 24 : 13;
    setT(tF, rx + f * wide * (1 - speedN) + moveDir * Math.cos(p.runPhase) * stride, ry - Math.max(0, Math.sin(p.runPhase)) * lift);
    setT(tB, rx - f * (wide - 4) * (1 - speedN) + moveDir * Math.cos(p.runPhase + Math.PI) * stride, ry - Math.max(0, Math.sin(p.runPhase + Math.PI)) * lift);
    if (p.mood === 'celebrate') {
      tF.y = Math.min(tF.y, bodyY);
      tB.y = Math.min(tB.y, bodyY);
    }
  } else {
    const tuck = p.vy < 0 ? 1 : Math.max(0, 1 - p.vy / 900);
    setT(tF, rx + f * 18, ry - 6 - 38 * tuck);
    setT(tB, rx - f * 14, ry - 2 - 16 * tuck);
  }
  solveIK(a.hip.x, a.hip.y, tF.x, tF.y, THIGH, SHIN, f, 0, a.kneeF, a.footF);
  solveIK(a.hip.x, a.hip.y, tB.x, tB.y, THIGH, SHIN, f, 0, a.kneeB, a.footB);

  // Arms
  const sx = a.shoulder.x;
  const sy = a.shoulder.y;
  let gripK = 18;
  let elbowPref = -f;
  let fX;
  let fY;
  let bX;
  let bY;
  if (hanging) {
    fX = p.hangX + p.hoop.side * 24 + 6;
    fY = p.hoop.rimY;
    bX = fX - 12;
    bY = fY;
    gripK = 40;
    elbowPref = f;
  } else if (hasBall && p.shotQueued) {
    fX = bx + f * ball.r * 0.5;
    fY = by + ball.r * 0.7;
    bX = bx - f * ball.r * 0.8;
    bY = by + ball.r * 0.1;
    gripK = 45;
    elbowPref = f;
  } else if (hasBall && !grounded) {
    fX = bx + f * ball.r * 0.6;
    fY = by - ball.r * 0.5;
    bX = bx - f * ball.r * 0.9;
    bY = by + ball.r * 0.2;
    gripK = 45;
  } else if (hasBall) {
    fX = bx;
    fY = Math.min(by - ball.r, sy + 64);
    bX = sx + f * 36;
    bY = sy + 34;
    gripK = 70;
  } else if (p.shootAnim > 0) {
    fX = sx + f * 48;
    fY = sy - 50;
    bX = sx + f * 38;
    bY = sy - 56;
    elbowPref = f;
  } else if (p.blockRaise > 0 || (!grounded && (oppHasBall || ball.shotTimer < 0.8))) {
    fX = sx + f * 16 + Math.sin(t * 20) * 4;
    fY = sy - 68;
    bX = sx + f * 2;
    bY = sy - 66;
    elbowPref = f;
  } else if (p.stealTimer > 0) {
    fX = sx + f * 70;
    fY = sy + 34;
    bX = sx - f * 32;
    bY = sy + 26;
    gripK = 40;
  } else if (p.mood === 'celebrate') {
    fX = sx + f * 30 + Math.sin(t * 14) * 16;
    fY = sy - 62;
    bX = sx - f * 28 - Math.sin(t * 14) * 16;
    bY = sy - 62;
    elbowPref = 0;
  } else if (p.mood === 'sad') {
    fX = sx + f * 12;
    fY = sy + 68;
    bX = sx + f * 4;
    bY = sy + 68;
  } else if (defStance) {
    fX = sx + f * 54;
    fY = sy + 16 + Math.sin(t * 7) * 12;
    bX = sx - f * 36;
    bY = sy - 8 + Math.cos(t * 7) * 12;
  } else if (!grounded) {
    fX = sx + f * 34;
    fY = sy - 28 + Math.sin(t * 18) * 14;
    bX = sx - f * 32;
    bY = sy - 18 + Math.cos(t * 18) * 14;
  } else {
    fX = sx + f * 6 + moveDir * Math.cos(p.runPhase + Math.PI) * 30 * speedN;
    fY = sy + 62 - speedN * 10;
    bX = sx - f * 6 + moveDir * Math.cos(p.runPhase) * 30 * speedN;
    bY = sy + 62 - speedN * 10;
  }

  if (!a.init) {
    setT(a.handF, fX, fY);
    setT(a.handB, bX, bY);
    a.init = true;
  }
  const kh = 1 - Math.exp(-dt * gripK);
  setT(tmp, a.handF.x + (fX - a.handF.x) * kh, a.handF.y + (fY - a.handF.y) * kh);
  solveIK(sx, sy, tmp.x, tmp.y, UPPER_ARM, FOREARM, elbowPref * 0.8, 1, a.elbowF, a.handF);
  setT(tmp, a.handB.x + (bX - a.handB.x) * kh, a.handB.y + (bY - a.handB.y) * kh);
  solveIK(sx, sy, tmp.x, tmp.y, UPPER_ARM, FOREARM, elbowPref * 0.8, 1, a.elbowB, a.handB);

  a.flick = p.shootAnim;
  a.face = p.mood === 'celebrate' ? 1 : p.mood === 'sad' ? -1 : 0;
}

function seg(ctx, a, b) {
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
}

export function drawStickman(ctx, p, team, t, simple) {
  const a = p.anim;
  const f = p.facing;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Outline pass
  ctx.strokeStyle = OUTLINE;
  ctx.lineWidth = 15;
  ctx.beginPath();
  seg(ctx, a.shoulder, a.elbowB);
  seg(ctx, a.elbowB, a.handB);
  seg(ctx, a.hip, a.kneeB);
  seg(ctx, a.kneeB, a.footB);
  seg(ctx, a.hip, a.kneeF);
  seg(ctx, a.kneeF, a.footF);
  seg(ctx, a.shoulder, a.elbowF);
  seg(ctx, a.elbowF, a.handF);
  ctx.stroke();
  ctx.lineWidth = 26;
  ctx.beginPath();
  seg(ctx, a.hip, a.neck);
  ctx.stroke();

  // Back limbs
  ctx.strokeStyle = LIMB_BACK;
  ctx.lineWidth = 9;
  ctx.beginPath();
  seg(ctx, a.shoulder, a.elbowB);
  seg(ctx, a.elbowB, a.handB);
  seg(ctx, a.hip, a.kneeB);
  seg(ctx, a.kneeB, a.footB);
  ctx.stroke();

  ctx.strokeStyle = LIMB;
  ctx.beginPath();
  seg(ctx, a.hip, a.kneeF);
  seg(ctx, a.kneeF, a.footF);
  ctx.stroke();

  // Jersey and shorts
  ctx.strokeStyle = team.color;
  ctx.lineWidth = 20;
  ctx.beginPath();
  seg(ctx, a.hip, a.neck);
  ctx.stroke();
  ctx.strokeStyle = team.dark;
  ctx.lineWidth = 15;
  ctx.beginPath();
  ctx.moveTo(a.hip.x, a.hip.y);
  ctx.lineTo(a.hip.x + (a.kneeF.x - a.hip.x) * 0.45, a.hip.y + (a.kneeF.y - a.hip.y) * 0.45);
  ctx.moveTo(a.hip.x, a.hip.y);
  ctx.lineTo(a.hip.x + (a.kneeB.x - a.hip.x) * 0.45, a.hip.y + (a.kneeB.y - a.hip.y) * 0.45);
  ctx.stroke();

  if (!simple) {
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 15px "Trebuchet MS", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(p.idx + 1), (a.hip.x + a.neck.x) / 2, (a.hip.y + a.neck.y) / 2 + 2);
  }

  // Front arm
  ctx.strokeStyle = LIMB;
  ctx.lineWidth = 9;
  ctx.beginPath();
  seg(ctx, a.shoulder, a.elbowF);
  seg(ctx, a.elbowF, a.handF);
  if (a.flick > 0) {
    const fl = Math.min(1, a.flick * 3);
    ctx.moveTo(a.handF.x, a.handF.y);
    ctx.lineTo(a.handF.x + f * 10, a.handF.y + 4 + fl * 8);
  }
  ctx.stroke();

  // Shoes
  ctx.fillStyle = team.dark;
  ctx.strokeStyle = OUTLINE;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(a.footF.x + f * 5, a.footF.y - 3, 11, 6, 0, 0, Math.PI * 2);
  ctx.moveTo(a.footB.x + f * 5 + 11, a.footB.y - 3);
  ctx.ellipse(a.footB.x + f * 5, a.footB.y - 3, 11, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Head
  const hr = a.headR;
  const hx = a.head.x;
  const hy = a.head.y;
  ctx.fillStyle = LIMB;
  ctx.strokeStyle = OUTLINE;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(hx, hy, hr, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Headband with flapping tail
  const bandY = hy - hr * 0.42;
  const c = hr * 0.9;
  ctx.strokeStyle = team.color;
  ctx.lineCap = 'butt';
  ctx.lineWidth = hr * 0.34;
  ctx.beginPath();
  ctx.moveTo(hx - c, bandY);
  ctx.lineTo(hx + c, bandY);
  ctx.stroke();
  ctx.lineCap = 'round';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(hx - f * c, bandY);
  const flap = Math.sin(t * 13 + p.idx) * 5;
  ctx.quadraticCurveTo(hx - f * (c + 10), bandY + 2 + flap, hx - f * (c + 20), bandY + 8 - flap);
  ctx.stroke();

  if (simple) return;

  // Face
  ctx.fillStyle = OUTLINE;
  ctx.beginPath();
  ctx.arc(hx + f * hr * 0.42, hy - hr * 0.02, Math.max(2.4, hr * 0.13), 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = OUTLINE;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  const mx = hx + f * hr * 0.4;
  const my = hy + hr * 0.42;
  if (a.face > 0) {
    ctx.arc(mx, my - hr * 0.1, hr * 0.22, 0, Math.PI);
    ctx.fillStyle = '#7a1b2a';
    ctx.fill();
  } else if (a.face < 0) {
    ctx.arc(mx, my + hr * 0.15, hr * 0.2, Math.PI * 1.15, Math.PI * 1.85);
  } else {
    ctx.moveTo(mx - hr * 0.18, my);
    ctx.lineTo(mx + hr * 0.18, my - f * hr * 0.05);
  }
  ctx.stroke();
}
