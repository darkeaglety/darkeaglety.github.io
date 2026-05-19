/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   description: string,
 *   diamondCost: number,
 *   maxLevel: number,
 * }} PowerUpDef
 */

/** @type {PowerUpDef[]} */
export const POWER_UPS = [
  {
    id: 'damage',
    name: 'Sharpened Rounds',
    description: '+10% troop damage per level',
    diamondCost: 6,
    maxLevel: 10,
  },
  {
    id: 'fire_rate',
    name: 'Rapid Reload',
    description: '-7% attack cooldown per level',
    diamondCost: 6,
    maxLevel: 8,
  },
  {
    id: 'castle_wall',
    name: 'Castle Reinforcement',
    description: '+25 castle max HP per level',
    diamondCost: 20,
    maxLevel: 6,
  },
  {
    id: 'wave_stars',
    name: 'Star Salvage',
    description: '+1 bonus ★ when clearing a wave',
    diamondCost: 8,
    maxLevel: 5,
  },
];

/**
 * @param {Record<string, number>} levels
 */
export function getPowerUpBonuses(levels) {
  const lv = levels ?? {};
  const damageLv = lv.damage ?? 0;
  const fireLv = lv.fire_rate ?? 0;
  const wallLv = lv.castle_wall ?? 0;
  const starLv = lv.wave_stars ?? 0;

  return {
    damageMult: 1 + 0.1 * damageLv,
    cooldownMult: Math.max(0.45, 1 - 0.07 * fireLv),
    castleHpBonus: 25 * wallLv,
    bonusStarsPerWave: starLv,
  };
}

/**
 * @param {string} id
 */
export function getPowerUpById(id) {
  return POWER_UPS.find((p) => p.id === id);
}
