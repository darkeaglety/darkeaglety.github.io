import { WORLD_W, THREE_PT_DIST, STEAL_RANGE, PLAYER_MIN_X, PLAYER_MAX_X } from './constants.js';

export const DIFFICULTY_LEVELS = { easy: 0.15, medium: 0.5, hard: 0.85 };

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

// A CPU player that only "presses buttons" on a normal InputState, so it plays by the same rules as a human.
// `level` 0..1 scales reaction time, shot selection, defense, and aim.
export function createAI(level) {
  const L = clamp(level, 0, 1);
  const lerp = (a, b) => a + (b - a) * L;
  const cfg = {
    reaction: lerp(0.45, 0.08),
    shotThreshold: lerp(0.18, 0.42),
    patience: lerp(1.0, 2.0),
    driveChance: lerp(0.25, 0.6),
    stealRate: lerp(0.4, 3.2),
    blockRate: lerp(0.08, 0.85),
    crossRate: lerp(0.25, 1.3),
    guardDist: lerp(150, 125),
    reboundLead: lerp(0.05, 0.3),
    speedMul: lerp(0.78, 1.08),
    aimMul: lerp(1.5, 0.8),
  };

  const s = {
    lastHolder: undefined,
    possessionTime: 0,
    targetX: 0,
    perceivedX: WORLD_W / 2,
    shotWatch: false,
    contestTimer: -1,
    jumpCooldown: 0,
  };

  function newPossession(me) {
    s.possessionTime = 0;
    const hoop = me.hoop;
    const drive = Math.random() < cfg.driveChance;
    const range = drive ? 60 + Math.random() * 120 : 250 + Math.random() * (THREE_PT_DIST + 260 - 250);
    s.targetX = clamp(hoop.center - hoop.side * range, PLAYER_MIN_X + 20, PLAYER_MAX_X - 20);
  }

  function shotQuality(me, opp) {
    const hoop = me.hoop;
    const dist = Math.abs(me.x - hoop.center);
    let q = 1 - dist / 1150;
    if (dist > THREE_PT_DIST) q *= 1.25;
    const between = (opp.x - me.x) * hoop.side > -30;
    const dx = Math.abs(opp.x - me.x);
    if (between && dx < 150) q *= !opp.grounded ? 0.3 : dx < 110 ? 0.55 : 0.8;
    return q;
  }

  function offense(game, me, opp, inp, dt) {
    const hoop = me.hoop;
    s.possessionTime += dt;
    const dist = Math.abs(me.x - hoop.center);
    let target = s.targetX;

    const oppInLane = (opp.x - me.x) * hoop.side > 0 && Math.abs(opp.x - me.x) < 120;
    if (oppInLane && me.grounded && me.crossCd <= 0 && Math.random() < cfg.crossRate * dt) inp.downPressed = true;

    if (me.grounded && !me.shotQueued) {
      const q = shotQuality(me, opp);
      const atSpot = Math.abs(me.x - target) < 45;
      const nearRim = dist < 210 && !oppInLane;
      const forced = s.possessionTime > cfg.patience * 1.6;
      if (nearRim || forced || (atSpot && q >= cfg.shotThreshold) || (s.possessionTime > cfg.patience && q >= cfg.shotThreshold * 0.6)) {
        inp.shootPressed = true;
      } else if (atSpot && s.possessionTime > 0.8) {
        // Spot was covered: pick a new one rather than standing still.
        newPossession(me);
      }
    }
    if (me.shotQueued) target = hoop.center;
    steer(me, inp, target);
  }

  function defense(game, me, opp, inp, dt) {
    const ball = game.ball;
    s.perceivedX += (opp.x - s.perceivedX) * Math.min(1, dt / cfg.reaction);
    const gx = s.perceivedX + opp.hoop.side * cfg.guardDist;
    steer(me, inp, gx);

    if (Math.abs(ball.x - me.x) < STEAL_RANGE - 8 && me.stealCd <= 0 && me.grounded && Math.random() < cfg.stealRate * dt) {
      inp.stealDir = ball.x >= me.x ? 1 : -1;
    }

    const shooting = opp.shotQueued || (!opp.grounded && opp.vy < 0);
    if (shooting && !s.shotWatch) {
      s.shotWatch = true;
      s.contestTimer = Math.random() < cfg.blockRate && Math.abs(opp.x - me.x) < 190 ? cfg.reaction * 0.6 : -1;
    }
    if (!shooting && opp.grounded) s.shotWatch = false;
  }

  function looseBall(game, me, opp, inp) {
    const ball = game.ball;
    const lead = ball.vy < 0 ? cfg.reboundLead * 1.5 : cfg.reboundLead;
    const target = clamp(ball.x + ball.vx * lead, PLAYER_MIN_X, PLAYER_MAX_X);
    steer(me, inp, target);
    const dx = Math.abs(ball.x - me.x);
    const above = me.y - ball.y;
    if (me.grounded && s.jumpCooldown <= 0 && dx < 80 && above > 190 && above < 470 && ball.vy > -200) {
      inp.jumpPressed = true;
      s.jumpCooldown = 0.6;
    }
  }

  function steer(me, inp, target) {
    inp.right = target > me.x + 16;
    inp.left = target < me.x - 16;
  }

  return {
    cfg,
    level: L,
    reset() {
      s.lastHolder = undefined;
      s.shotWatch = false;
      s.contestTimer = -1;
    },
    update(game, me, opp, inp, dt) {
      const ball = game.ball;
      s.jumpCooldown -= dt;
      if (ball.holder !== s.lastHolder) {
        s.lastHolder = ball.holder;
        if (ball.holder === me) newPossession(me);
        s.perceivedX = opp.x;
      }

      if (s.contestTimer >= 0) {
        s.contestTimer -= dt;
        if (s.contestTimer < 0 && me.grounded) inp.jumpPressed = true;
      }

      if (ball.holder === me) offense(game, me, opp, inp, dt);
      else if (ball.holder === opp) defense(game, me, opp, inp, dt);
      else looseBall(game, me, opp, inp);
    },
  };
}
