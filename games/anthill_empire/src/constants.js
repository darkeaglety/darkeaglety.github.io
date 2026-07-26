/** World size (ground half-extent roughly ±MAP_RADIUS). */
export const MAP_RADIUS = 24;

/** Nest mound radius — invaders damage nest when inside this. */
export const NEST_RADIUS = 2.2;

export const STARTING_FOOD = 25;
export const STARTING_WORKERS = 4;
export const STARTING_SOLDIERS = 1;
export const STARTING_NEST_LEVEL = 1;
export const STARTING_NEST_HP = 100;

/** Hatch costs start cheap; nest level adds only a tiny bump. */
export const WORKER_COST_BASE = 4;
export const WORKER_COST_PER_NEST_LEVEL = 1;
export const SOLDIER_COST_BASE = 7;
export const SOLDIER_COST_PER_NEST_LEVEL = 1;

export const NEST_UPGRADE_BASE_COST = 40;
export const NEST_UPGRADE_COST_SCALE = 1.65;

export const MAX_NEST_LEVEL = 5;
export const WIN_NEST_LEVEL = 3;
export const WIN_WAVES_SURVIVED = 3;

export const FOOD_PILE_COUNT = 7;
export const FOOD_PILE_MIN_R = 6;
export const FOOD_PILE_MAX_R = 14;
export const FOOD_PILE_AMOUNT_MIN = 8;
export const FOOD_PILE_AMOUNT_MAX = 18;
/** Fully eaten fruit piles respawn after 1 minute 30 seconds. */
export const FOOD_RESPAWN_MS = 90_000;

export const SCOUT_SPEED = 4.2;
export const SOLDIER_SPEED = 3.6;
export const INVADER_SPEED = 1.9;

export const SCOUT_CARRY = 3;
export const GATHER_RATE_PER_NEST_LEVEL = 0.35;

/** Soldier damage bonus per fruit unit when player chooses "Eat fruit". */
export const FRUIT_SOLDIER_DAMAGE_PER = 0.6;
/** Nest HP (current + max) gained per fruit unit when player chooses "Fortify nest". */
export const FRUIT_NEST_HP_PER = 4;

export const SOLDIER_RANGE = 3.5;
export const SOLDIER_DAMAGE = 8;
export const SOLDIER_ATTACK_COOLDOWN_MS = 450;
export const PLAYER_SOLDIER_HP = 45;

export const INVADER_HP = 14;
export const INVADER_DAMAGE = 3;
export const INVADER_ATTACK_COOLDOWN_MS = 850;

export const WAVE_START_DELAY_MS = 14000;
export const WAVE_INTERVAL_MS = 24000;
/** Wave N always spawns exactly N invaders (wave 1 = 1 ant). */
export const WAVE_INVADER_HP_PER_WAVE = 2;

/** Rival nests you can raid for stolen food. */
export const RIVAL_NEST_COUNT = 3;
export const RIVAL_NEST_RADIUS = 1.55;
export const RAID_STEAL_FOOD_MIN = 10;
export const RAID_STEAL_FOOD_MAX = 20;
export const RIVAL_NEST_RESPAWN_MS = 28000;
export const RAID_SOLDIER_SPEED = 4.4;
export const RAID_PICK_PX = 64;
export const RIVAL_DEFENDERS_PER_NEST = 2;
export const RIVAL_DEFENDER_HP = 26;
export const RIVAL_DEFENDER_DAMAGE = 5;
export const RIVAL_DEFENDER_SPEED = 3.4;
export const RIVAL_DEFENDER_RANGE = 3.2;
export const RIVAL_DEFENDER_ATTACK_COOLDOWN_MS = 520;
/** How quickly rival nests scale with colony power (nest level, soldiers, atk). */
export const RAID_SCALE_PER_POWER = 0.11;
export const RAID_MAX_DEFENDERS = 6;
/** Rival nest structure HP — intentionally tanky so takeovers are rare. */
export const RIVAL_NEST_HP_BASE = 680;
export const RIVAL_NEST_HP_PER_POWER = 95;
/** Soldiers deal a solid chunk of attack as siege damage to nest walls. */
export const RIVAL_NEST_SIEGE_DAMAGE_MULT = 0.5;
/** Enemy nest HP regenerated per second when not under siege (very slow). */
export const RIVAL_NEST_REGEN_PER_SEC = 0.35;
export const RIVAL_NEST_CAPTURE_FOOD_BONUS = 55;
export const CAPTURED_NEST_FOOD_TICK_MS = 9000;
export const CAPTURED_NEST_FOOD_PER_TICK = 4;

export const CAMERA_DISTANCE = 34;
export const CAMERA_HEIGHT = 26;
export const CAMERA_LOOK_Y = 0.4;
export const CAMERA_PAN_SPEED = 0.045;
export const CAMERA_MIN_PITCH = 0.35;
export const CAMERA_MAX_PITCH = 1.15;
