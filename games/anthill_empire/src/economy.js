import {
  FRUIT_NEST_HP_PER,
  FRUIT_SOLDIER_DAMAGE_PER,
  GATHER_RATE_PER_NEST_LEVEL,
  MAX_NEST_LEVEL,
  NEST_UPGRADE_BASE_COST,
  NEST_UPGRADE_COST_SCALE,
  SOLDIER_COST_BASE,
  SOLDIER_COST_PER_NEST_LEVEL,
  SOLDIER_DAMAGE,
  STARTING_FOOD,
  STARTING_NEST_HP,
  STARTING_NEST_LEVEL,
  STARTING_SOLDIERS,
  STARTING_WORKERS,
  DESERT_START_FOOD,
  WORKER_COST_BASE,
  WORKER_COST_PER_NEST_LEVEL,
} from './constants.js';

/**
 * @typedef {{
 *   food: number,
 *   workers: number,
 *   soldiers: number,
 *   nestLevel: number,
 *   nestHp: number,
 *   nestHpMax: number,
 *   scoutsBusy: number,
 *   wavesSurvived: number,
 *   won: boolean,
 *   gameOver: boolean,
 *   soldierBonusDamage: number,
 *   worldStage: number,
 *   wizards: number,
 *   chargers: number,
 * }} Economy
 */

/** @returns {Economy} */
export function createEconomy() {
  return {
    food: STARTING_FOOD,
    workers: STARTING_WORKERS,
    soldiers: STARTING_SOLDIERS,
    nestLevel: STARTING_NEST_LEVEL,
    nestHp: STARTING_NEST_HP,
    nestHpMax: STARTING_NEST_HP,
    scoutsBusy: 0,
    wavesSurvived: 0,
    won: false,
    gameOver: false,
    soldierBonusDamage: 0,
    worldStage: 1,
    wizards: 0,
    chargers: 0,
  };
}

/**
 * Reset colony progress for a fresh desert run (keeps worldStage = 2).
 * @param {Economy} eco
 */
export function resetColonyForDesert(eco) {
  eco.food = DESERT_START_FOOD;
  eco.workers = STARTING_WORKERS;
  eco.soldiers = STARTING_SOLDIERS;
  eco.nestLevel = STARTING_NEST_LEVEL;
  eco.nestHp = STARTING_NEST_HP;
  eco.nestHpMax = STARTING_NEST_HP;
  eco.scoutsBusy = 0;
  eco.wavesSurvived = 0;
  eco.soldierBonusDamage = 0;
  eco.wizards = 0;
  eco.chargers = 0;
  eco.won = false;
  eco.gameOver = false;
  eco.worldStage = 2;
}

/** @param {Economy} eco */
export function idleWorkers(eco) {
  return Math.max(0, eco.workers - eco.scoutsBusy);
}

/** @param {Economy} eco */
export function workerCost(eco) {
  return WORKER_COST_BASE + (eco.nestLevel - 1) * WORKER_COST_PER_NEST_LEVEL;
}

/** @param {Economy} eco */
export function soldierCost(eco) {
  return SOLDIER_COST_BASE + (eco.nestLevel - 1) * SOLDIER_COST_PER_NEST_LEVEL;
}

/** @param {Economy} eco */
export function nestUpgradeCost(eco) {
  return Math.floor(
    NEST_UPGRADE_BASE_COST * NEST_UPGRADE_COST_SCALE ** (eco.nestLevel - 1),
  );
}

/** Food carried per trip scales slightly with nest level. */
export function scoutCarryAmount(nestLevel) {
  return 3 + Math.floor((nestLevel - 1) * GATHER_RATE_PER_NEST_LEVEL * 4);
}

/** @param {Economy} eco */
export function tryHatchWorker(eco) {
  const cost = workerCost(eco);
  if (eco.food < cost) return false;
  eco.food -= cost;
  eco.workers += 1;
  return true;
}

/** @param {Economy} eco */
export function tryHatchSoldier(eco) {
  const cost = soldierCost(eco);
  if (eco.food < cost) return false;
  eco.food -= cost;
  eco.soldiers += 1;
  return true;
}

/** @param {Economy} eco */
export function tryUpgradeNest(eco) {
  if (eco.nestLevel >= MAX_NEST_LEVEL) return false;
  const cost = nestUpgradeCost(eco);
  if (eco.food < cost) return false;
  eco.food -= cost;
  eco.nestLevel += 1;
  // Add level HP on top of any fortify bonuses already applied.
  eco.nestHpMax += 25;
  eco.nestHp = Math.min(eco.nestHpMax, eco.nestHp + 20);
  return true;
}

/**
 * @param {Economy} eco
 * @param {number} amount
 */
export function depositFood(eco, amount) {
  eco.food += amount;
}

/** @param {Economy} eco */
export function soldierDamage(eco) {
  return SOLDIER_DAMAGE + eco.soldierBonusDamage;
}

/**
 * Spend a returned fruit haul: eat for stronger soldiers, or fortify nest HP.
 * Food stockpile still gains the haul so hatching stays viable.
 * @param {Economy} eco
 * @param {number} amount
 * @param {'eat' | 'fortify'} choice
 * @returns {string} short result tip
 */
export function applyFruitChoice(eco, amount, choice) {
  const haul = Math.max(1, Math.floor(amount));
  depositFood(eco, haul);

  if (choice === 'eat') {
    const gain = Math.round(haul * FRUIT_SOLDIER_DAMAGE_PER * 10) / 10;
    eco.soldierBonusDamage = Math.round((eco.soldierBonusDamage + gain) * 10) / 10;
    return `Colony ate the fruit! Soldiers now deal ${soldierDamage(eco).toFixed(1)} damage.`;
  }

  const hpGain = Math.max(1, Math.floor(haul * FRUIT_NEST_HP_PER));
  eco.nestHpMax += hpGain;
  eco.nestHp = Math.min(eco.nestHpMax, eco.nestHp + hpGain);
  return `Nest fortified! +${hpGain} HP (${Math.ceil(eco.nestHp)}/${eco.nestHpMax}).`;
}

/**
 * @param {Economy} eco
 * @param {number} damage
 */
export function damageNest(eco, damage) {
  eco.nestHp = Math.max(0, eco.nestHp - damage);
  return eco.nestHp <= 0;
}

/** Soft fail repair — unused after hard game-over, kept for tooling. */
export function tryRepairNest(eco) {
  const cost = 15;
  if (eco.food < cost) {
    eco.food = 0;
  } else {
    eco.food -= cost;
  }
  eco.nestHp = Math.floor(eco.nestHpMax * 0.6);
  return true;
}

/**
 * Colony "power" used to scale rival nest difficulty as you grow.
 * @param {Economy} eco
 */
export function colonyPower(eco) {
  return (
    eco.nestLevel +
    eco.soldiers * 0.4 +
    eco.soldierBonusDamage * 0.22 +
    Math.max(0, eco.wavesSurvived) * 0.15
  );
}
