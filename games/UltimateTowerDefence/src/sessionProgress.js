/** @typedef {Record<string, number>} PowerUpLevels */

import { DEFAULT_DIFFICULTY_ID } from './data/difficulty.js';

const REG_DIAMONDS = 'diamonds';
const REG_POWER_UPS = 'powerUpLevels';
const REG_DIFFICULTY = 'difficultyId';

/** @param {Phaser.Data.DataManager} registry */
export function ensureSessionDefaults(registry) {
  if (registry.get(REG_DIAMONDS) === undefined) {
    registry.set(REG_DIAMONDS, 0);
  }
  if (!registry.get(REG_POWER_UPS)) {
    registry.set(REG_POWER_UPS, /** @type {PowerUpLevels} */ ({}));
  }
  if (!registry.get(REG_DIFFICULTY)) {
    registry.set(REG_DIFFICULTY, DEFAULT_DIFFICULTY_ID);
  }
}

/** @param {Phaser.Data.DataManager} registry */
export function getDifficultyId(registry) {
  ensureSessionDefaults(registry);
  return String(registry.get(REG_DIFFICULTY) || DEFAULT_DIFFICULTY_ID);
}

/** @param {Phaser.Data.DataManager} registry */
export function setDifficultyId(registry, difficultyId) {
  registry.set(REG_DIFFICULTY, difficultyId);
}

/** @param {Phaser.Data.DataManager} registry */
export function getDiamonds(registry) {
  ensureSessionDefaults(registry);
  return Number(registry.get(REG_DIAMONDS)) || 0;
}

/** @param {Phaser.Data.DataManager} registry */
export function setDiamonds(registry, amount) {
  registry.set(REG_DIAMONDS, Math.max(0, Math.floor(amount)));
}

/** @param {Phaser.Data.DataManager} registry */
export function addDiamonds(registry, delta) {
  setDiamonds(registry, getDiamonds(registry) + delta);
}

/** @param {Phaser.Data.DataManager} registry */
export function getPowerUpLevels(registry) {
  ensureSessionDefaults(registry);
  return /** @type {PowerUpLevels} */ ({ ...registry.get(REG_POWER_UPS) });
}

/** @param {Phaser.Data.DataManager} registry */
export function setPowerUpLevels(registry, levels) {
  registry.set(REG_POWER_UPS, { ...levels });
}
