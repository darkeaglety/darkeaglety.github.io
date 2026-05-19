/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   starCost: number,
 *   tint: number,
 *   rangeTiles: number,
 *   damage: number,
 *   fireCooldownMs: number,
 *   splashDamage?: number,
 *   splashRadiusTiles?: number,
 *   auraSlowMult?: number,
 *   auraSlowRangeTiles?: number,
 * }} TroopDef
 */

/** Texture key (`PreloadScene` loads `troops/{id}.png` from public/). */
export function getTroopSpriteKey(id) {
  return `troop_${id}`;
}

/** @type {TroopDef[]} */
export const TROOPS = [
  { id: 'archer', name: 'Archer', starCost: 1, tint: 0x8bc34a, rangeTiles: 4, damage: 2, fireCooldownMs: 190 },
  {
    id: 'alien',
    name: 'Alien',
    starCost: 2,
    tint: 0x69f0ae,
    rangeTiles: 4,
    damage: 150,
    fireCooldownMs: 7000,
  },
  {
    id: 'snowman',
    name: 'Snowman',
    starCost: 3,
    tint: 0xe3f2fd,
    rangeTiles: 2,
    damage: 0,
    fireCooldownMs: 1,
    auraSlowMult: 0.75,
    auraSlowRangeTiles: 2,
  },
  { id: 'cannon', name: 'Cannon', starCost: 4, tint: 0xffab91, rangeTiles: 2, damage: 20, fireCooldownMs: 900 },
  { id: 'sniper', name: 'Sniper', starCost: 4, tint: 0xce93d8, rangeTiles: 6, damage: 45, fireCooldownMs: 2000 },
  {
    id: 'bomber',
    name: 'Bomber',
    starCost: 5,
    tint: 0xffd54f,
    rangeTiles: 2,
    damage: 22,
    splashDamage: 18,
    splashRadiusTiles: 1,
    fireCooldownMs: 2300,
  },
  { id: 'mortar', name: 'Mortar', starCost: 6, tint: 0xfff59d, rangeTiles: 8, damage: 32, fireCooldownMs: 1150 },
  { id: 'rocketeer', name: 'Rocketeer', starCost: 7, tint: 0xffa726, rangeTiles: 4, damage: 58, fireCooldownMs: 1400 },
  { id: 'ion', name: 'Ion Coil', starCost: 8, tint: 0xb2ff59, rangeTiles: 5, damage: 40, fireCooldownMs: 520 },
  {
    id: 'flamethrower',
    name: 'Flamethrower',
    starCost: 9,
    tint: 0xff5722,
    rangeTiles: 2,
    damage: 13,
    fireCooldownMs: 155,
  },
  {
    id: 'abominable_snowman',
    name: 'Abominable Snowman',
    starCost: 20,
    tint: 0x90caf9,
    rangeTiles: 2,
    damage: 90,
    fireCooldownMs: 2000,
    auraSlowMult: 0.25,
    auraSlowRangeTiles: 2,
  },
  {
    id: 'nuker',
    name: 'Nuker',
    starCost: 15,
    tint: 0xc6ff00,
    rangeTiles: 10,
    damage: 200,
    splashDamage: 78,
    splashRadiusTiles: 5,
    fireCooldownMs: 3000,
  },
];

export function getTroopById(id) {
  return TROOPS.find((t) => t.id === id);
}

/**
 * @param {TroopDef} troop
 */
function formatAuraSlowLines(troop) {
  const pct = Math.round((1 - (troop.auraSlowMult ?? 1)) * 100);
  const rng = troop.auraSlowRangeTiles ?? 2;
  return { pct, rng };
}

/**
 * Compact stats for shop — ranges are tiles (matching build-cell width).
 */
export function formatTroopCombatStats(troop) {
  if (troop.auraSlowMult != null && troop.auraSlowMult < 1 && troop.damage <= 0) {
    const { pct, rng } = formatAuraSlowLines(troop);
    return `Slow ${pct}% within ${rng}t\nAura — no damage\nRNG ${rng} tiles (aura)`;
  }
  let dmgLine = `DMG ${troop.damage}`;
  const splashTiles = troop.splashRadiusTiles;
  if (
    splashTiles != null &&
    splashTiles > 0 &&
    troop.splashDamage != null &&
    troop.splashDamage > 0
  ) {
    dmgLine += ` (+${troop.splashDamage} AoE · ${splashTiles}t)`;
  }
  const mainDps =
    troop.fireCooldownMs > 0 ? Math.round(((troop.damage * 1000) / troop.fireCooldownMs) * 10) / 10 : 0;
  let lines = `${dmgLine}\nRNG ${Math.max(2, Math.round(troop.rangeTiles))} tiles · CD ${troop.fireCooldownMs}ms\n≈ ${mainDps} main-DPS`;
  if (troop.auraSlowMult != null && troop.auraSlowMult < 1) {
    const { pct, rng } = formatAuraSlowLines(troop);
    lines += `\nSlow ${pct}% · ${rng}t aura`;
  }
  return lines;
}

/** Short fixed 3-line block for troop shop cards (avoids DPS hidden by star cost). */
export function formatTroopShopStats(troop) {
  if (troop.auraSlowMult != null && troop.auraSlowMult < 1 && troop.damage <= 0) {
    const { pct, rng } = formatAuraSlowLines(troop);
    return `Slow ${pct}% · ${rng}t\nAura — no damage\nRNG ${rng}t`;
  }
  let dmgLine = `DMG ${troop.damage}`;
  const splashTiles = troop.splashRadiusTiles;
  if (
    splashTiles != null &&
    splashTiles > 0 &&
    troop.splashDamage != null &&
    troop.splashDamage > 0
  ) {
    dmgLine += `  AoE ${troop.splashDamage}/${splashTiles}t`;
  }
  const dps =
    troop.fireCooldownMs > 0 ? Math.round(((troop.damage * 1000) / troop.fireCooldownMs) * 10) / 10 : 0;
  let block = `${dmgLine}\nRNG ${Math.max(2, Math.round(troop.rangeTiles))}t · CD ${troop.fireCooldownMs}ms\nDPS ${dps}`;
  if (troop.auraSlowMult != null && troop.auraSlowMult < 1) {
    const { pct, rng } = formatAuraSlowLines(troop);
    block = `Slow ${pct}% · ${rng}t\n${block}`;
  }
  return block;
}
