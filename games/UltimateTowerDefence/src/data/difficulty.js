/**
 * @typedef {{
 *   id: string,
 *   label: string,
 *   description: string,
 *   hpMult: number,
 *   speedMult: number,
 *   castleDamageMult: number,
 *   tint: number,
 * }} DifficultyDef
 */

/** @type {DifficultyDef[]} */
export const DIFFICULTIES = [
  {
    id: 'easy',
    label: 'Easy',
    description: 'Baseline — current balance',
    hpMult: 1,
    speedMult: 1,
    castleDamageMult: 1,
    tint: 0x66bb6a,
  },
  {
    id: 'normal',
    label: 'Normal',
    description: 'Tougher leaks & faster foes',
    hpMult: 1.3,
    speedMult: 1.15,
    castleDamageMult: 1.25,
    tint: 0x42a5f5,
  },
  {
    id: 'hard',
    label: 'Hard',
    description: 'Heavy HP, speed, and leak damage',
    hpMult: 1.65,
    speedMult: 1.32,
    castleDamageMult: 1.5,
    tint: 0xffa726,
  },
  {
    id: 'brutal',
    label: 'Brutal',
    description: 'Maximum pressure on your castle',
    hpMult: 2.1,
    speedMult: 1.52,
    castleDamageMult: 1.85,
    tint: 0xef5350,
  },
  {
    id: 'impossible',
    label: 'Impossible',
    description: 'Extreme HP, speed, and leak damage',
    hpMult: 2.65,
    speedMult: 1.72,
    castleDamageMult: 2.25,
    tint: 0x9c27b0,
  },
];

export const DEFAULT_DIFFICULTY_ID = 'easy';

/**
 * @param {string} [id]
 * @returns {DifficultyDef}
 */
export function getDifficultyById(id) {
  return DIFFICULTIES.find((d) => d.id === id) ?? DIFFICULTIES[0];
}

/**
 * @param {import('./enemies.js').EnemyDef} baseDef
 * @param {DifficultyDef} difficulty
 */
export function scaleEnemyStatsForDifficulty(baseDef, difficulty) {
  const hp = Math.max(1, Math.round(baseDef.hp * difficulty.hpMult));
  const speed = Math.max(1, Math.round(baseDef.speed * difficulty.speedMult));
  const castleLeak = Math.max(1, Math.round(baseDef.castleDamage * difficulty.castleDamageMult));
  return { hp, maxHp: hp, speed, castleLeak };
}
