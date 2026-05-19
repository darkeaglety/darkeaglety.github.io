/**
 * @typedef {{ spawnId: string, count: number }} SplitDeathRule */
/**
 * @typedef {{
 *   id: string,
 *   displayName: string,
 *   hp: number,
 *   speed: number,
 *   tint: number,
 *   stroke: number,
 *   strokeWidth: number,
 *   radius: number,
 *   castleDamage: number,
 *   splitDeath?: SplitDeathRule[],
 * }} EnemyDef */

/** @type {Record<string, EnemyDef>} */
export const ENEMIES = {
  grunt: {
    id: 'grunt',
    displayName: 'Grunt',
    hp: 34,
    speed: 96,
    tint: 0xe53935,
    stroke: 0xffcdd2,
    strokeWidth: 3,
    radius: 17,
    castleDamage: 10,
    splitDeath: undefined,
  },
  runner: {
    id: 'runner',
    displayName: 'Runner',
    hp: 24,
    speed: 152,
    tint: 0xff7043,
    stroke: 0xffe0b2,
    strokeWidth: 3,
    radius: 15,
    castleDamage: 10,
    splitDeath: [{ spawnId: 'grunt', count: 2 }],
  },
  brute: {
    id: 'brute',
    displayName: 'Brute',
    hp: 98,
    speed: 70,
    tint: 0x7b1fa2,
    stroke: 0xe1bee7,
    strokeWidth: 4,
    radius: 23,
    castleDamage: 20,
    splitDeath: [{ spawnId: 'runner', count: 2 }],
  },
  tanker: {
    id: 'tanker',
    displayName: 'Tanker',
    hp: 350,
    speed: 64,
    tint: 0x455a64,
    stroke: 0xb0bec5,
    strokeWidth: 5,
    radius: 26,
    castleDamage: 30,
    splitDeath: [{ spawnId: 'brute', count: 2 }],
  },
  dreadnought: {
    id: 'dreadnought',
    displayName: 'Dreadnought',
    hp: 620,
    speed: 56,
    tint: 0x1b2a38,
    stroke: 0xff6e40,
    strokeWidth: 6,
    radius: 31,
    castleDamage: 45,
    splitDeath: [{ spawnId: 'tanker', count: 2 }],
  },
  wraith: {
    id: 'wraith',
    displayName: 'Wraith',
    hp: 58,
    speed: 124,
    tint: 0x5e35b1,
    stroke: 0xd1c4e9,
    strokeWidth: 3,
    radius: 17,
    castleDamage: 10,
    splitDeath: [{ spawnId: 'runner', count: 2 }],
  },
  speedster: {
    id: 'speedster',
    displayName: 'Speedster',
    hp: 500,
    speed: 400,
    tint: 0x00e5ff,
    stroke: 0xffffff,
    strokeWidth: 3,
    radius: 16,
    castleDamage: 15,
    splitDeath: undefined,
  },
};

/**
 * @param {string} id
 * @returns {EnemyDef}
 */
export function getEnemyDef(id) {
  return ENEMIES[id] ?? ENEMIES.grunt;
}

/**
 * @param {string} enemyId
 * @returns {SplitDeathRule[]}
 */
export function getSplitDeathRules(enemyId) {
  const def = getEnemyDef(enemyId);
  return def.splitDeath ?? [];
}

/**
 * Multiline summary for UI when inspecting a live enemy.
 * @param {EnemyDef} def
 * @param {number} currentHp
 */
/** Static catalog lines for menu (full HP). */
export function formatEnemyCatalogLines(def) {
  const lines = [`HP ${def.hp}`, `Speed ${def.speed}`, `Leak ${def.castleDamage} HP`];
  const rules = def.splitDeath ?? [];
  if (rules.length) {
    const parts = rules.map((r) => `${r.count}× ${getEnemyDef(r.spawnId).displayName ?? r.spawnId}`);
    lines.push(`Splits → ${parts.join(', ')}`);
  }
  return lines.join('\n');
}

/**
 * @param {{ hp: number, maxHp: number, speed: number, castleLeak: number, enemyId: string }} enemy
 */
export function formatEnemyRuntimeInspect(enemy) {
  const def = getEnemyDef(enemy.enemyId);
  const hpShown = Math.max(0, Math.ceil(enemy.hp));
  const lines = [
    `HP: ${hpShown} / ${enemy.maxHp}`,
    `Speed: ${enemy.speed} (path units/s)`,
    `Castle leak: ${enemy.castleLeak} HP`,
  ];
  const rules = def.splitDeath ?? [];
  if (rules.length) {
    const parts = rules.map((r) => `${r.count}× ${getEnemyDef(r.spawnId).displayName ?? r.spawnId}`);
    lines.push(`On death spills: ${parts.join(', ')}`);
  } else {
    lines.push('On death: —');
  }
  return lines.join('\n');
}

export function formatEnemyInspectLines(def, currentHp) {
  const hpShown = Math.max(0, Math.ceil(currentHp));
  const lines = [
    `HP: ${hpShown} / ${def.hp}`,
    `Speed: ${def.speed} (path units/s)`,
    `Castle leak: ${def.castleDamage} HP`,
  ];
  const rules = def.splitDeath ?? [];
  if (rules.length) {
    const parts = rules.map((r) => `${r.count}× ${getEnemyDef(r.spawnId).displayName ?? r.spawnId}`);
    lines.push(`On death spills: ${parts.join(', ')}`);
  } else {
    lines.push('On death: —');
  }
  return lines.join('\n');
}
