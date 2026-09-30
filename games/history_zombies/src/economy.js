import { MAX_ARMOR, MAX_LEVEL, SAVE_KEY, WEAPONS } from './constants.js';

/**
 * @typedef {{
 *  coins: number,
 *  owned: Record<string, number>,
 *  current: string,
 *  roster: Record<string, boolean>,
 *  kills: number,
 * }} Save
 */

/** @returns {Save} */
function fresh() {
  return { coins: 0, owned: { foam: 0 }, current: 'foam', roster: {}, kills: 0, armor: 0, seen: {} };
}

/** @returns {Save} */
export function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return fresh();
    const s = { ...fresh(), ...JSON.parse(raw) };
    if (!s.seen) s.seen = {};
    if (!s.owned || typeof s.owned.foam !== 'number') s.owned = { foam: 0, ...(s.owned || {}) };
    return s;
  } catch {
    return fresh();
  }
}

/** @param {Save} s */
export function writeSave(s) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(s));
  } catch {
    /* private mode etc. */
  }
}

export function resetSave() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    /* ignore */
  }
}

export const weaponDef = (id) => WEAPONS.find((w) => w.id === id) || WEAPONS[0];

/** @param {Save} s @param {string} id */
export const owns = (s, id) => typeof s.owned[id] === 'number';

/** @param {Save} s @param {string} id */
export function upgradeCost(s, id) {
  const lvl = s.owned[id] ?? 0;
  return weaponDef(id).upgradeBase * (lvl + 1);
}

/** @param {Save} s @param {string} id */
export function buyWeapon(s, id) {
  const def = weaponDef(id);
  if (owns(s, id) || s.coins < def.cost) return false;
  s.coins -= def.cost;
  s.owned[id] = 0;
  s.current = id;
  writeSave(s);
  return true;
}

/** @param {Save} s @param {string} id */
export function upgradeWeapon(s, id) {
  if (!owns(s, id)) return false;
  const lvl = s.owned[id];
  if (lvl >= MAX_LEVEL) return false;
  const cost = upgradeCost(s, id);
  if (s.coins < cost) return false;
  s.coins -= cost;
  s.owned[id] = lvl + 1;
  writeSave(s);
  return true;
}

/** @param {Save} s @param {string} id */
export function equip(s, id) {
  if (!owns(s, id)) return false;
  s.current = id;
  writeSave(s);
  return true;
}

/** @param {Save} s */
export const armorCost = (s) => 50 * ((s.armor || 0) + 1);

/** @param {Save} s */
export function buyArmor(s) {
  const lvl = s.armor || 0;
  if (lvl >= MAX_ARMOR) return false;
  const c = armorCost(s);
  if (s.coins < c) return false;
  s.coins -= c;
  s.armor = lvl + 1;
  writeSave(s);
  return true;
}
