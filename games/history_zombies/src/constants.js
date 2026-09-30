export const SAVE_KEY = 'history_zombies_save_v1';

export const PLAYER_HP = 100;
export const PLAYER_SPEED = 9.5;
export const PLAYER_RADIUS = 0.6;
export const MAX_LEVEL = 5;
export const BOSS_KILLS = 35;
export const MAX_ARMOR = 5;

/**
 * Kid-friendly gear only: foam, noodles, confetti, bubbles and sparkles.
 * type: melee | burst | bubble | chain
 */
export const WEAPONS = [
  {
    id: 'foam',
    name: 'Foam Sword',
    desc: 'Big squishy swings. Boop!',
    type: 'melee',
    cost: 0,
    upgradeBase: 30,
    dmg: 20,
    cd: 0.38,
    range: 3.0,
    arc: 0.85,
    knock: 5,
    color: 0xff6b9d,
  },
  {
    id: 'noodle',
    name: 'Pool Noodle',
    desc: 'Wide sweeping whacks that send zombies flying.',
    type: 'melee',
    cost: 60,
    upgradeBase: 45,
    dmg: 15,
    cd: 0.55,
    range: 4.0,
    arc: 1.35,
    knock: 9,
    color: 0x4dd0e1,
  },
  {
    id: 'confetti',
    name: 'Confetti Cannon',
    desc: 'Party pop! Blasts a spray of confetti.',
    type: 'burst',
    cost: 120,
    upgradeBase: 60,
    dmg: 9,
    cd: 0.65,
    range: 12,
    pellets: 7,
    spread: 0.75,
    knock: 3,
    color: 0xffd84a,
  },
  {
    id: 'bubble',
    name: 'Bubble Blaster',
    desc: 'Giant bubbles that pop and make zombies dizzy.',
    type: 'bubble',
    cost: 200,
    upgradeBase: 80,
    dmg: 28,
    cd: 0.95,
    range: 14,
    splash: 3.3,
    stun: 2.2,
    knock: 4,
    color: 0x7ee8ff,
  },
  {
    id: 'star',
    name: 'Star Wand',
    desc: 'Sparkles jump from zombie to zombie.',
    type: 'chain',
    cost: 300,
    upgradeBase: 110,
    dmg: 24,
    cd: 0.8,
    range: 13,
    chain: 3,
    knock: 3,
    color: 0xffe14a,
  },
];

/**
 * @typedef {{
 *  id: string, name: string, scale: number, hp: number, speed: number,
 *  damage: number, coins: number, skin: number, shirt: number, pants: number,
 *  hat?: string, extra?: string, gait: number
 * }} ZombieType
 */
export const ZOMBIE_TYPES = {
  shambler: {
    id: 'shambler', name: 'Shambler', scale: 1.0, hp: 40, speed: 2.7, damage: 6, coins: 5,
    skin: 0x8fdc7a, shirt: 0xb56cd6, pants: 0x4b5d8f, gait: 6,
  },
  sprinter: {
    id: 'sprinter', name: 'Sprinter', scale: 0.9, hp: 26, speed: 5.6, damage: 5, coins: 8,
    skin: 0xb6ea5d, shirt: 0xff8a3c, pants: 0x2e7d6b, gait: 12,
  },
  bruiser: {
    id: 'bruiser', name: 'Bruiser', scale: 1.55, hp: 150, speed: 1.9, damage: 12, coins: 22,
    skin: 0x6fd2a0, shirt: 0x3b9ac9, pants: 0x35406b, gait: 4,
  },
  cone: {
    id: 'cone', name: 'Cone-Head', scale: 1.05, hp: 75, speed: 2.5, damage: 7, coins: 11,
    skin: 0x9ade86, shirt: 0xf2d64b, pants: 0x555577, gait: 6, hat: 'cone',
  },
  tourist: {
    id: 'tourist', name: 'Tourist', scale: 1.0, hp: 36, speed: 3.5, damage: 5, coins: 7,
    skin: 0xa5e07f, shirt: 0xff5fa2, pants: 0xe8dcae, gait: 8, hat: 'sunhat', extra: 'camera',
  },
  intern: {
    id: 'intern', name: 'Intern', scale: 0.95, hp: 30, speed: 4.3, damage: 5, coins: 8,
    skin: 0x93d98f, shirt: 0xeeeeee, pants: 0x2a2f45, gait: 9, extra: 'tie',
  },
};

export const WAVE_PAUSE = 4;
export const WAVE_SPAWN_GAP = 0.32;
export const MAX_ALIVE = 16;

/** @param {number} w */
export function waveList(w) {
  /** @type {string[]} */
  const list = [];
  const add = (id, n) => {
    for (let i = 0; i < n; i++) list.push(id);
  };
  add('shambler', 3 + w);
  if (w >= 2) add('sprinter', Math.floor(w / 2) + 1);
  if (w >= 2) add('tourist', Math.floor(w / 2));
  if (w >= 3) add('cone', Math.floor((w - 1) / 2));
  if (w >= 4) add('intern', w - 2);
  if (w >= 4) add('bruiser', Math.floor((w - 2) / 2));
  return list.slice(0, MAX_ALIVE + 6);
}
