import {
  FLOOR_Y,
  PLAYER_GRAVITY,
  PLAYER_SPEED,
  PLAYER_SPEED_BALL,
  PLAYER_ACCEL,
  PLAYER_AIR_ACCEL,
  PLAYER_FRICTION,
  PLAYER_MIN_X,
  PLAYER_MAX_X,
  JUMP_VELOCITY,
  STEAL_COOLDOWN,
  STEAL_LUNGE_TIME,
  STEAL_RANGE,
  CROSSOVER_TIME,
  CROSSOVER_COOLDOWN,
} from './constants.js';
import { createAnim } from './stickman.js';

export function createPlayer(idx, hoop) {
  return {
    idx,
    hoop,
    x: 0,
    y: FLOOR_Y,
    px: 0,
    py: FLOOR_Y,
    vx: 0,
    vy: 0,
    grounded: true,
    facing: idx === 0 ? 1 : -1,
    shotQueued: false,
    shootAnim: 0,
    blockRaise: 0,
    stealTimer: 0,
    stealCd: 0,
    stealResolved: false,
    stumble: 0,
    crossTimer: 0,
    crossCd: 0,
    crossDir: 1,
    hangTimer: 0,
    hangX: 0,
    hangY: 0,
    noPickup: 0,
    runPhase: 0,
    dribblePhase: 0,
    squash: 0,
    mood: 'play',
    streak: 0,
    onFire: false,
    speedMul: 1,
    aimMul: 1,
    anim: createAnim(),
  };
}

export function placePlayer(p, x) {
  p.x = p.px = x;
  p.y = p.py = FLOOR_Y;
  p.vx = p.vy = 0;
  p.grounded = true;
  p.shotQueued = false;
  p.shootAnim = 0;
  p.blockRaise = 0;
  p.stealTimer = 0;
  p.stumble = 0;
  p.crossTimer = 0;
  p.hangTimer = 0;
  p.noPickup = 0;
  p.squash = 0;
  p.mood = 'play';
  p.facing = p.hoop.center > x ? 1 : -1;
}

// Advances one fixed step. `game` supplies the ball, opponent, params, and event hooks.
export function stepPlayer(p, input, game, dt) {
  const { ball, params, events } = game;
  const hasBall = ball.holder === p;
  const locked = !game.controlsLive;

  p.shootAnim = Math.max(0, p.shootAnim - dt);
  p.blockRaise = Math.max(0, p.blockRaise - dt);
  p.stealTimer = Math.max(0, p.stealTimer - dt);
  p.stealCd = Math.max(0, p.stealCd - dt);
  p.stumble = Math.max(0, p.stumble - dt);
  p.crossTimer = Math.max(0, p.crossTimer - dt);
  p.crossCd = Math.max(0, p.crossCd - dt);
  p.noPickup = Math.max(0, p.noPickup - dt);
  p.squash = Math.max(0, p.squash - dt * 4.5);

  if (p.hangTimer > 0) {
    p.hangTimer -= dt;
    p.x = p.hangX;
    p.y = p.hangY;
    p.vx = 0;
    p.vy = 0;
    if (p.hangTimer <= 0) p.vy = 120;
    return;
  }

  const dir = locked ? 0 : (input.right ? 1 : 0) - (input.left ? 1 : 0);
  let max = (hasBall ? PLAYER_SPEED_BALL : PLAYER_SPEED) * params.speedMul * p.speedMul;
  if (p.stumble > 0) max *= 0.3;

  if (p.crossTimer > 0) {
    p.vx = p.crossDir * max * 1.4;
  } else if (p.stealTimer > 0) {
    p.vx = p.facing * 760 * (p.stealTimer / STEAL_LUNGE_TIME);
  } else if (dir !== 0) {
    const accel = p.grounded ? PLAYER_ACCEL : PLAYER_AIR_ACCEL;
    p.vx += dir * accel * dt;
    if (p.vx > max) p.vx = max;
    else if (p.vx < -max) p.vx = -max;
  } else if (p.grounded) {
    const f = PLAYER_FRICTION * dt;
    p.vx = Math.abs(p.vx) <= f ? 0 : p.vx - Math.sign(p.vx) * f;
  }

  if (!locked) {
    if (input.jumpPressed && p.grounded) jump(p, params, events);
    if (input.shootPressed) {
      if (p.grounded) jump(p, params, events);
      if (hasBall) p.shotQueued = true;
      else p.blockRaise = 0.55;
    }
    if (input.downPressed && p.grounded && hasBall && p.crossCd <= 0) {
      p.crossTimer = CROSSOVER_TIME;
      p.crossCd = CROSSOVER_COOLDOWN;
      p.crossDir = dir !== 0 ? dir : p.facing;
      events.crossover(p);
    }
    const toBall = ball.x >= p.x ? 1 : -1;
    const stealDir = input.stealToBall ? toBall : input.stealDir;
    const holder = ball.holder;
    if (
      stealDir !== 0 &&
      holder &&
      holder !== p &&
      p.grounded &&
      p.stealCd <= 0 &&
      stealDir === toBall &&
      Math.abs(ball.x - p.x) < STEAL_RANGE
    ) {
      p.facing = stealDir;
      p.stealTimer = STEAL_LUNGE_TIME;
      p.stealCd = STEAL_COOLDOWN;
      p.stealResolved = false;
      events.swipe(p);
    }
  }

  p.vy += PLAYER_GRAVITY * params.gravityMul * dt;
  p.x += p.vx * dt;
  p.y += p.vy * dt;

  if (p.y >= FLOOR_Y) {
    if (!p.grounded) {
      p.squash = Math.min(1, p.vy / 1500);
      events.land(p, p.vy);
    }
    p.y = FLOOR_Y;
    p.vy = 0;
    p.grounded = true;
    if (!hasBall) p.shotQueued = false;
  }
  if (p.x < PLAYER_MIN_X) {
    p.x = PLAYER_MIN_X;
    p.vx = 0;
  } else if (p.x > PLAYER_MAX_X) {
    p.x = PLAYER_MAX_X;
    p.vx = 0;
  }

  if (hasBall && p.shotQueued && !locked) {
    const hoop = p.hoop;
    const nearRim = Math.abs(p.x - hoop.center) < 150 && p.y - 215 < hoop.rimY + 30 && !p.grounded;
    if (nearRim) game.dunk(p);
    else if (!p.grounded && p.vy >= -140) game.releaseShot(p);
    else if (p.grounded) game.releaseShot(p);
  }

  if (p.crossTimer <= 0) {
    if (ball.holder === p) {
      if (dir !== 0) p.facing = dir;
      else if (p.grounded && Math.abs(p.vx) < 40) p.facing = p.hoop.center > p.x ? 1 : -1;
    } else if (p.stealTimer <= 0 && Math.abs(ball.x - p.x) > 10) {
      p.facing = ball.x > p.x ? 1 : -1;
    }
  }

  if (p.grounded) p.runPhase += Math.abs(p.vx) * dt * 0.028;

  if (ball.holder === p) {
    const period = 0.46 - Math.min(1, Math.abs(p.vx) / PLAYER_SPEED) * 0.12;
    const before = p.dribblePhase;
    p.dribblePhase = (p.dribblePhase + dt / period) % 1;
    if (p.grounded && !p.shotQueued && before < 0.5 && p.dribblePhase >= 0.5) events.dribble(p);
  }
}

function jump(p, params, events) {
  p.vy = -JUMP_VELOCITY * params.jumpMul;
  p.grounded = false;
  events.jump(p);
}

export function heldBallPosition(p, ball, out) {
  const f = p.facing;
  const r = ball.r;
  if (p.shotQueued) {
    out.x = p.x + f * 10;
    out.y = p.y - 214;
  } else if (!p.grounded) {
    out.x = p.x + f * 26;
    out.y = p.y - 128;
  } else if (p.crossTimer > 0) {
    const t = 1 - p.crossTimer / CROSSOVER_TIME;
    out.x = p.x + f * 34 * Math.cos(t * Math.PI * 2);
    out.y = FLOOR_Y - r - 6 - 46 * Math.abs(Math.cos(t * Math.PI * 2));
  } else {
    const handY = p.y - 80;
    const floorY = FLOOR_Y - r;
    const s = Math.sin(p.dribblePhase * Math.PI);
    out.x = p.x + f * 32 + p.vx * 0.025;
    out.y = handY + r + (floorY - handY - r) * s;
  }
  return out;
}
