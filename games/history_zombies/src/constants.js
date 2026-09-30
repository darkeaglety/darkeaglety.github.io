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
 *  id: string, name: string, icon: string, scale: number, hp: number, speed: number,
 *  damage: number, coins: number, skin: number, shirt: number, pants: number,
 *  hat?: string | string[], extra?: string, gait: number, behavior?: string,
 *  wave: number, desc: string, tip: string
 * }} ZombieType
 */
export const ZOMBIE_TYPES = {
  shambler: {
    id: 'shambler', name: 'Shambler', icon: '\u{1F9DF}', scale: 1.0, hp: 40, speed: 2.7, damage: 6, coins: 5, wave: 1,
    skin: 0x8fdc7a, shirt: 0xb56cd6, pants: 0x4b5d8f, gait: 6,
    desc: 'The classic lawn wanderer. Groans a lot, walks like his shoes are on the wrong feet.',
    tip: 'Slow and simple. Perfect for practicing your swings.',
  },
  wiggler: {
    id: 'wiggler', name: 'Wiggler', icon: '\u{1F41B}', scale: 0.62, hp: 12, speed: 6.6, damage: 3, coins: 6, wave: 3,
    skin: 0xc6f06a, shirt: 0xff8fb1, pants: 0x4b5d8f, gait: 16,
    desc: 'A teeny tiny zombie who is very, very wiggly. Zooms around in circles.',
    tip: 'Barely any health, but they come in packs. Use wide swings.',
  },
  sprinter: {
    id: 'sprinter', name: 'Sprinter', icon: '\u{1F3C3}', scale: 0.9, hp: 26, speed: 5.6, damage: 5, coins: 8, wave: 2,
    skin: 0xb6ea5d, shirt: 0xff8a3c, pants: 0x2e7d6b, gait: 12,
    desc: 'Trained for the zombie 100-yard dash. Arms flailing, no brakes.',
    tip: 'Fast but fragile. One good bonk stops him.',
  },
  tourist: {
    id: 'tourist', name: 'Tourist', icon: '\u{1F4F8}', scale: 1.0, hp: 36, speed: 3.5, damage: 5, coins: 7, wave: 2,
    skin: 0xa5e07f, shirt: 0xff5fa2, pants: 0xe8dcae, gait: 8, hat: 'sunhat', extra: 'camera',
    desc: 'Came to see the White House and got zombified. Still wants a selfie.',
    tip: 'Medium speed. Cheap coins if you are in a hurry.',
  },
  cone: {
    id: 'cone', name: 'Cone-Head', icon: '\u{1F6A7}', scale: 1.05, hp: 75, speed: 2.5, damage: 7, coins: 11, wave: 3,
    skin: 0x9ade86, shirt: 0xf2d64b, pants: 0x555577, gait: 6, hat: 'cone',
    desc: 'Found a traffic cone and refuses to take it off. Very proud of it.',
    tip: 'Twice as sturdy as a Shambler. Keep swinging.',
  },
  reporter: {
    id: 'reporter', name: 'Reporter', icon: '\u{1F3A4}', scale: 1.0, hp: 34, speed: 4.6, damage: 5, coins: 9, wave: 3,
    skin: 0x9fe07f, shirt: 0xff4f6d, pants: 0x24304d, gait: 10, extra: 'mic',
    desc: 'Sprints at you shouting "any comment?" Has never once waited for an answer.',
    tip: 'Speedy, so hit him before he gets close.',
  },
  gardener: {
    id: 'gardener', name: 'Gardener', icon: '\u{1F33B}', scale: 1.05, hp: 55, speed: 2.8, damage: 6, coins: 9, wave: 3,
    skin: 0x96de78, shirt: 0x4caf50, pants: 0x8d6e63, gait: 6, hat: 'strawhat',
    desc: 'Tends the rose garden. Upset that you keep stomping on the flowers.',
    tip: 'A bit tougher than average. Nothing tricky.',
  },
  intern: {
    id: 'intern', name: 'Intern', icon: '\u{1F4CB}', scale: 0.95, hp: 30, speed: 4.3, damage: 5, coins: 8, wave: 4,
    skin: 0x93d98f, shirt: 0xeeeeee, pants: 0x2a2f45, gait: 9, extra: 'tie',
    desc: 'Very eager and very unpaid. Runs everywhere because he is late for a meeting.',
    tip: 'Fast and fragile.',
  },
  chef: {
    id: 'chef', name: 'Chef', icon: '\u{1F468}\u200D\u{1F373}', scale: 1.1, hp: 65, speed: 3.0, damage: 7, coins: 10, wave: 4,
    skin: 0xa5e07f, shirt: 0xffffff, pants: 0x3a3f5c, gait: 7, hat: 'chefhat',
    desc: 'The White House kitchen is closed and he is NOT happy about it. Big hat, bigger attitude.',
    tip: 'Steady and sturdy. His tall hat makes him easy to spot.',
  },
  jumper: {
    id: 'jumper', name: 'Bouncer', icon: '\u{1F998}', scale: 1.0, hp: 42, speed: 2.4, damage: 7, coins: 12, wave: 5,
    skin: 0xb0e860, shirt: 0xff9800, pants: 0x2e3f7a, gait: 8, hat: 'headband', behavior: 'hop',
    desc: 'Cannot stop bouncing. Walks a little, then boing! Leaps a long way at once.',
    tip: 'Watch the pattern: he zooms during a hop, then pauses. Hit him when he lands.',
  },
  sleepy: {
    id: 'sleepy', name: 'Sleepyhead', icon: '\u{1F634}', scale: 1.05, hp: 70, speed: 2.6, damage: 8, coins: 12, wave: 5,
    skin: 0x9be08a, shirt: 0xb39ddb, pants: 0x7e57c2, gait: 6, hat: 'nightcap', behavior: 'sleepy',
    desc: 'Fell asleep standing up on the lawn. Wakes up grumpy if you get close.',
    tip: 'Sneak up and bonk him while he snoozes, or stay away and let him sleep.',
  },
  pietosser: {
    id: 'pietosser', name: 'Goo Tosser', icon: '\u{1FAD0}', scale: 1.0, hp: 45, speed: 2.0, damage: 5, coins: 14, wave: 6,
    skin: 0x9de07a, shirt: 0x3f51b5, pants: 0x283593, gait: 6, hat: 'cap', behavior: 'thrower',
    desc: 'Lobs blueberry goo from a distance. It is harmless but very sticky.',
    tip: 'Goo puddles slow you down. Rush him or dodge around the puddles.',
  },
  balloon: {
    id: 'balloon', name: 'Balloon Buddy', icon: '\u{1F388}', scale: 0.95, hp: 22, speed: 2.2, damage: 4, coins: 12, wave: 7,
    skin: 0xa9e88a, shirt: 0xffd54f, pants: 0xe57373, gait: 5, hat: 'balloon', behavior: 'float',
    desc: 'Floats along holding a big pink balloon. Nobody knows why he is so happy.',
    tip: 'Barely any health and pays well. Pop him!',
  },
  bruiser: {
    id: 'bruiser', name: 'Bruiser', icon: '\u{1F4AA}', scale: 1.55, hp: 150, speed: 1.9, damage: 12, coins: 22, wave: 4,
    skin: 0x6fd2a0, shirt: 0x3b9ac9, pants: 0x35406b, gait: 4,
    desc: 'Huge and slow. Every stomp shakes the ground and makes dust clouds.',
    tip: 'Keep your distance when he stomps, then swarm him with big hits.',
  },
  agent: {
    id: 'agent', name: 'Suit Agent', icon: '\u{1F576}\uFE0F', scale: 1.15, hp: 95, speed: 3.3, damage: 9, coins: 16, wave: 8,
    skin: 0x8fdc86, shirt: 0x15151c, pants: 0x15151c, gait: 8, hat: 'shades', extra: 'tie',
    desc: 'Wears sunglasses day and night. Talks into his sleeve. Cool under pressure.',
    tip: 'Fast AND tough. Save your best gear for him.',
  },
};

/** Boss zombies that show up in the catalog too. */
export const SPECIAL_ZOMBIES = [
  {
    id: 'george', name: 'Zombie George Washington', icon: '\u{1F451}',
    hint: 'Bonk 35 zombies, then find him snoring behind the mansion.',
    desc: 'The Founding Father of Funk. Throws blueberry pies, stomps, and calls his zombie pals. Deep down he is a big softie.',
    tip: 'Wear him down to fill the cure meter, then bring him the glowing Liberty Tonic.',
    hp: 450,
  },
  {
    id: 'abe', name: 'Zombie Abe Lincoln', icon: '\u{1F3A9}',
    hint: 'Bonk 100 zombies and he will stride onto the lawn.',
    desc: 'Tall, dignified, and extremely good at throwing his stovepipe hat. It flies out like a boomerang and comes right back!',
    tip: 'Dodge sideways when the hat leaves his head. While it is away he is hatless and slow to throw again.',
    hp: 700,
  },
];

export const ABE_KILLS = 100;

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
  if (w >= 3) add('reporter', Math.floor(w / 3));
  if (w >= 3) add('gardener', Math.floor(w / 3));
  if (w >= 3) add('wiggler', 2 + Math.floor(w / 2));
  if (w >= 4) add('intern', Math.max(1, w - 3));
  if (w >= 4) add('chef', Math.floor((w - 2) / 2));
  if (w >= 4) add('bruiser', Math.floor((w - 2) / 3));
  if (w >= 5) add('jumper', Math.floor((w - 3) / 2));
  if (w >= 5) add('sleepy', Math.floor((w - 3) / 2));
  if (w >= 6) add('pietosser', Math.floor((w - 4) / 2));
  if (w >= 7) add('balloon', Math.floor((w - 5) / 2));
  if (w >= 8) add('agent', Math.floor((w - 6) / 2));
  // Shuffle so types are mixed up.
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list.slice(0, 36);
}
