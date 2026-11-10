import {
  WORLD_W,
  FLOOR_Y,
  GRAVITY,
  BALL_RADIUS,
  BALL_FLOOR_BOUNCE,
  BALL_RIM_BOUNCE,
  BALL_BOARD_BOUNCE,
  RIM_Y,
  RIM_HALF,
  RIM_POINT_R,
  BOARD_TOP,
  BOARD_BOTTOM,
  BOARD_HALF_THICK,
} from './constants.js';

// side: +1 = hoop on the right wall (attacked by player 0), -1 = left wall (attacked by player 1).
export function createHoop(side, rimScale = 1) {
  const half = RIM_HALF * rimScale;
  const center = side > 0 ? 1460 : WORLD_W - 1460;
  return {
    side,
    attacker: side > 0 ? 0 : 1,
    center,
    half,
    rimY: RIM_Y,
    front: center - side * half,
    back: center + side * half,
    boardX: center + side * (half + 16),
    boardTop: BOARD_TOP,
    boardBottom: BOARD_BOTTOM,
    rimShake: 0,
  };
}

export function createBall() {
  return {
    x: WORLD_W / 2,
    y: 500,
    px: WORLD_W / 2,
    py: 500,
    vx: 0,
    vy: 0,
    r: BALL_RADIUS,
    angle: 0,
    spin: 0,
    squash: 0,
    holder: null,
    lastShooter: -1,
    shotValue: 2,
    shotTimer: 99,
    shotFire: false,
    touchedRim: false,
    scored: false,
    missReacted: false,
    stuckTimer: 0,
    trail: new Float32Array(16),
    trailHead: 0,
    trailCount: 0,
  };
}

export function solveShot(sx, sy, tx, ty, g, flightTime) {
  const t = flightTime;
  return {
    vx: (tx - sx) / t,
    vy: (ty - sy - 0.5 * g * t * t) / t,
  };
}

export function stepFreeBall(ball, hoops, params, dt, events) {
  const g = GRAVITY * params.gravityMul;
  ball.vy += g * dt;
  ball.x += ball.vx * dt;
  ball.y += ball.vy * dt;
  ball.angle += ball.spin * dt;
  ball.shotTimer += dt;

  const r = ball.r;
  if (ball.y + r > FLOOR_Y) {
    ball.y = FLOOR_Y - r;
    if (ball.vy > 0) {
      const impact = ball.vy;
      ball.vy = -impact * params.floorBounce;
      if (Math.abs(ball.vy) < 70) ball.vy = 0;
      ball.vx *= 0.92;
      ball.spin = ball.vx / r;
      if (impact > 120) {
        ball.squash = Math.min(0.32, impact / 3200);
        events.bounce(ball, impact);
      }
    }
    if (ball.vy === 0) ball.vx *= 1 - 0.9 * dt;
  }

  if (ball.x < r) {
    ball.x = r;
    ball.vx = Math.abs(ball.vx) * 0.7;
    events.wall(ball, Math.abs(ball.vx));
  } else if (ball.x > WORLD_W - r) {
    ball.x = WORLD_W - r;
    ball.vx = -Math.abs(ball.vx) * 0.7;
    events.wall(ball, Math.abs(ball.vx));
  }

  for (const hoop of hoops) {
    collidePoint(ball, hoop.front, hoop.rimY, hoop, events);
    collidePoint(ball, hoop.back, hoop.rimY, hoop, events);
    collideBoard(ball, hoop, events);

    if (
      !ball.scored &&
      ball.vy > 0 &&
      ball.py < hoop.rimY &&
      ball.y >= hoop.rimY &&
      Math.abs(ball.x - hoop.center) < hoop.half - 3
    ) {
      ball.scored = true;
      events.score(ball, hoop);
    }
  }
  if (ball.scored && ball.y < RIM_Y - 80) ball.scored = false;

  const resting = ball.y < FLOOR_Y - r - 2 && Math.abs(ball.vx) + Math.abs(ball.vy) < 60;
  ball.stuckTimer = resting ? ball.stuckTimer + dt : 0;
  if (ball.stuckTimer > 0.9) {
    ball.stuckTimer = 0;
    ball.vx = ball.x > WORLD_W / 2 ? -320 : 320;
    ball.vy = -260;
  }
}

function collidePoint(ball, px, py, hoop, events) {
  const dx = ball.x - px;
  const dy = ball.y - py;
  const minD = ball.r + RIM_POINT_R;
  const d2 = dx * dx + dy * dy;
  if (d2 >= minD * minD || d2 === 0) return;
  const d = Math.sqrt(d2);
  const nx = dx / d;
  const ny = dy / d;
  ball.x = px + nx * minD;
  ball.y = py + ny * minD;
  const vn = ball.vx * nx + ball.vy * ny;
  if (vn < 0) {
    ball.vx -= (1 + BALL_RIM_BOUNCE) * vn * nx;
    ball.vy -= (1 + BALL_RIM_BOUNCE) * vn * ny;
    ball.vx *= 0.94;
    ball.spin = -ball.spin * 0.5 + ball.vx / ball.r;
    ball.touchedRim = true;
    hoop.rimShake = Math.min(1, hoop.rimShake + -vn / 900);
    if (-vn > 90) events.rim(ball, -vn, hoop);
  }
}

function collideBoard(ball, hoop, events) {
  const minX = hoop.boardX - BOARD_HALF_THICK;
  const maxX = hoop.boardX + BOARD_HALF_THICK;
  const cx = Math.max(minX, Math.min(ball.x, maxX));
  const cy = Math.max(hoop.boardTop, Math.min(ball.y, hoop.boardBottom));
  const dx = ball.x - cx;
  const dy = ball.y - cy;
  const d2 = dx * dx + dy * dy;
  if (d2 >= ball.r * ball.r) return;
  let nx;
  let ny;
  let d = Math.sqrt(d2);
  if (d < 0.001) {
    nx = -hoop.side;
    ny = 0;
    d = 0;
  } else {
    nx = dx / d;
    ny = dy / d;
  }
  ball.x = cx + nx * ball.r;
  ball.y = cy + ny * ball.r;
  const vn = ball.vx * nx + ball.vy * ny;
  if (vn < 0) {
    ball.vx -= (1 + BALL_BOARD_BOUNCE) * vn * nx;
    ball.vy -= (1 + BALL_BOARD_BOUNCE) * vn * ny;
    ball.touchedRim = true;
    if (-vn > 80) events.board(ball, -vn, hoop);
  }
}

export function pushTrail(ball) {
  const i = ball.trailHead * 2;
  ball.trail[i] = ball.x;
  ball.trail[i + 1] = ball.y;
  ball.trailHead = (ball.trailHead + 1) % 8;
  ball.trailCount = Math.min(8, ball.trailCount + 1);
}
