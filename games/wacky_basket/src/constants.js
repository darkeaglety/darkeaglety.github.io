export const WORLD_W = 1600;
export const WORLD_H = 900;
export const FLOOR_Y = 780;

export const SIM_HZ = 120;
export const SIM_DT = 1 / SIM_HZ;
export const MAX_DPR = 2;

export const WIN_SCORE = 11;

export const GRAVITY = 2600;
export const PLAYER_GRAVITY = 3000;

export const BALL_RADIUS = 22;
export const BALL_FLOOR_BOUNCE = 0.72;
export const BALL_RIM_BOUNCE = 0.5;
export const BALL_BOARD_BOUNCE = 0.62;

export const RIM_Y = 420;
export const RIM_HALF = 45;
export const RIM_POINT_R = 5;
export const BOARD_TOP = 300;
export const BOARD_BOTTOM = 455;
export const BOARD_HALF_THICK = 6;
export const THREE_PT_DIST = 560;

export const PLAYER_MIN_X = 40;
export const PLAYER_MAX_X = WORLD_W - 40;
export const PLAYER_SPEED = 560;
export const PLAYER_SPEED_BALL = 500;
export const PLAYER_ACCEL = 4200;
export const PLAYER_AIR_ACCEL = 1900;
export const PLAYER_FRICTION = 5200;
export const JUMP_VELOCITY = 1250;
export const PLAYER_HALF_W = 26;

export const DOUBLE_TAP_MS = 250;

export const STEAL_COOLDOWN = 0.6;
export const STEAL_LUNGE_TIME = 0.22;
export const STEAL_CHANCE = 0.45;
export const STEAL_RANGE = 95;
export const BLOCK_CHANCE = 0.5;
export const CROSSOVER_TIME = 0.4;
export const CROSSOVER_COOLDOWN = 1.0;

export const ON_FIRE_STREAK = 3;

export const TEAMS = [
  { name: 'Coral', color: '#ff6b6b', dark: '#b8343f', light: '#ffb3a8', glow: [255, 107, 107] },
  { name: 'Teal', color: '#4ecdc4', dark: '#1f8c86', light: '#b2f5ef', glow: [78, 205, 196] },
];

export const WACKY_MOMENTS = [
  { id: 'lowgrav', label: 'LOW GRAVITY!', gravityMul: 0.55 },
  { id: 'bouncy', label: 'BOUNCY FLOOR!', floorBounce: 0.93, jumpMul: 1.12 },
  { id: 'bighead', label: 'BIG HEAD MODE!', headScale: 2.1 },
  { id: 'turbo', label: 'TURBO SNEAKERS!', speedMul: 1.45 },
  { id: 'megahoop', label: 'MEGA HOOPS!', rimScale: 1.45 },
];

export const NORMAL_MOMENT = { id: 'normal', label: '' };
