import { getTroopById } from './data/troops.js';

export const MAX_TROOP_UPGRADE_LEVEL = 12;

/**
 * ★ needed to bump from upgradeLevel → upgradeLevel + 1.
 * @param {number} deployStarCost troop listing price from shop
 * @param {number} upgradeLevel current level (0 = first tier)
 */
export function getUpgradeStarsCost(deployStarCost, upgradeLevel) {
  const u = Math.max(0, Math.min(MAX_TROOP_UPGRADE_LEVEL, upgradeLevel));
  return Math.max(2, Math.ceil(deployStarCost * Math.pow(1.52, u)));
}

/** Total ★ spent to deploy and reach current upgradeLevel (0 = deploy only). */
export function getTotalStarsInvested(deployStarCost, upgradeLevel) {
  let total = deployStarCost;
  const ul = Math.max(0, Math.min(MAX_TROOP_UPGRADE_LEVEL, upgradeLevel ?? 0));
  for (let u = 0; u < ul; u += 1) {
    total += getUpgradeStarsCost(deployStarCost, u);
  }
  return total;
}

/** Refund when selling: half of total invested (rounded down). */
export function getSellRefundStars(deployStarCost, upgradeLevel) {
  return Math.floor(getTotalStarsInvested(deployStarCost, upgradeLevel) / 2);
}

/**
 * @typedef {{ troopId:string, upgradeLevel?: number }} SlotsLike */

/**
 * @param {SlotsLike} slot
 * @param {{ damageMult?: number, cooldownMult?: number }} [powerBonuses]
 * @returns {import('./data/troops.js').TroopDef}
 */
export function getEffectiveTroopStats(slot, powerBonuses = {}) {
  const lv = Math.max(0, Math.min(MAX_TROOP_UPGRADE_LEVEL, slot.upgradeLevel ?? 0));
  const base = getTroopById(slot.troopId);
  if (!base) {
    throw new Error(`Unknown troop: ${slot.troopId}`);
  }

  const dmgMult = powerBonuses.damageMult ?? 1;
  const cdMult = powerBonuses.cooldownMult ?? 1;

  const dmgBonus = Math.round(base.damage * 0.2 * lv);
  const dmg = Math.max(1, Math.round((base.damage + dmgBonus) * dmgMult));

  const cdRedPerLevel = Math.max(44, Math.floor(base.fireCooldownMs * 0.055));
  const cdRed = Math.min(950, lv * cdRedPerLevel);
  const minCooldown =
    base.fireCooldownMs <= 180 ? Math.max(48, Math.min(120, base.fireCooldownMs)) : 120;
  const cd = Math.max(minCooldown, Math.round((base.fireCooldownMs - cdRed) * cdMult));

  const rngBonus = lv >= 2 ? Math.floor((lv + 1) / 4) : 0;
  const rangeTiles = Math.max(2, base.rangeTiles + Math.min(5, rngBonus));

  /** @type {typeof base} */
  const out = {
    ...base,
    rangeTiles,
    damage: dmg,
    fireCooldownMs: cd,
    auraSlowMult: base.auraSlowMult,
    auraSlowRangeTiles: base.auraSlowRangeTiles,
  };

  const sd = base.splashDamage;
  const sr = base.splashRadiusTiles;
  if (sd != null && sr != null && sr > 0 && sd > 0) {
    const bonusSplash = lv >= 1 ? Math.max(1, Math.floor(sd * 0.12 * lv)) : 0;
    out.splashDamage = Math.max(1, Math.round((sd + bonusSplash) * dmgMult));
    const rBonus = lv >= 3 ? Math.min(4, Math.floor(lv / 3)) : 0;
    out.splashRadiusTiles = sr + rBonus;
  }

  return out;
}
