import {
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  GRID_COLS,
  GRID_ROWS,
  GRID_TOP_Y,
  RANGE_TILE_PIXELS,
  SHOP_ROW_FROM_BOTTOM,
} from './constants.js';
import { pointToPathDist } from './pathUtils.js';

const CELL = RANGE_TILE_PIXELS;
const GRID_ORIGIN_X = DESIGN_WIDTH / 2 - (GRID_COLS * CELL) / 2 + CELL / 2;
const GRID_ORIGIN_Y = GRID_TOP_Y + CELL / 2;

/** Keep props off the trail (wider margin than build tiles). */
const MIN_PROP_DISTANCE_FROM_PATH = 52;

/** Min gap between prop centers. */
const MIN_PROP_SPACING = 34;

/**
 * @typedef {{
 *   key: string,
 *   weight: number,
 *   originY?: number,
 *   scaleMin?: number,
 *   scaleMax?: number,
 * }} PropKind
 */

/** @type {Record<string, PropKind[]>} */
export const MAP_PROP_KINDS = {
  meadow: [
    { key: 'prop_meadow_tree', weight: 4, originY: 1, scaleMin: 0.9, scaleMax: 1.25 },
    { key: 'prop_meadow_bush', weight: 5, originY: 1, scaleMin: 0.85, scaleMax: 1.15 },
    { key: 'prop_meadow_rock', weight: 3, originY: 1, scaleMin: 0.8, scaleMax: 1.1 },
    { key: 'prop_meadow_flower', weight: 4, originY: 1, scaleMin: 0.9, scaleMax: 1.2 },
  ],
  desert: [
    { key: 'prop_desert_cactus', weight: 5, originY: 1, scaleMin: 0.9, scaleMax: 1.2 },
    { key: 'prop_desert_bush', weight: 3, originY: 1, scaleMin: 0.85, scaleMax: 1.1 },
    { key: 'prop_desert_rock', weight: 4, originY: 1, scaleMin: 0.85, scaleMax: 1.15 },
    { key: 'prop_desert_skull', weight: 2, originY: 1, scaleMin: 0.75, scaleMax: 1 },
  ],
  ice: [
    { key: 'prop_ice_spike', weight: 5, originY: 1, scaleMin: 0.85, scaleMax: 1.2 },
    { key: 'prop_ice_crystal', weight: 4, originY: 1, scaleMin: 0.9, scaleMax: 1.25 },
    { key: 'prop_ice_mound', weight: 3, originY: 1, scaleMin: 0.8, scaleMax: 1.05 },
    { key: 'prop_ice_rock', weight: 3, originY: 1, scaleMin: 0.85, scaleMax: 1.1 },
  ],
  space: [
    { key: 'prop_space_asteroid', weight: 5, originY: 1, scaleMin: 0.85, scaleMax: 1.2 },
    { key: 'prop_space_crate', weight: 4, originY: 1, scaleMin: 0.8, scaleMax: 1.1 },
    { key: 'prop_space_antenna', weight: 3, originY: 1, scaleMin: 0.9, scaleMax: 1.15 },
    { key: 'prop_space_crystal', weight: 4, originY: 1, scaleMin: 0.85, scaleMax: 1.25 },
    { key: 'prop_space_satellite', weight: 3, originY: 1, scaleMin: 0.8, scaleMax: 1.05 },
  ],
};

/**
 * @typedef {{
 *   x: number,
 *   y: number,
 *   key: string,
 *   scale: number,
 *   originY: number,
 *   depth: number,
 *   flipX: boolean,
 * }} DecorationPlacement
 */

/**
 * @param {string} seed
 */
function hashSeed(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * @param {number} seed
 */
function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * @param {() => number} rng
 * @param {PropKind[]} kinds
 */
function pickPropKind(rng, kinds) {
  const total = kinds.reduce((s, k) => s + k.weight, 0);
  let roll = rng() * total;
  for (const k of kinds) {
    roll -= k.weight;
    if (roll <= 0) return k;
  }
  return kinds[kinds.length - 1];
}

/**
 * @param {number} x
 * @param {number} y
 */
function isInBuildGrid(x, y) {
  const pad = 10;
  const left = GRID_ORIGIN_X - CELL / 2 - pad;
  const right = GRID_ORIGIN_X + (GRID_COLS - 0.5) * CELL + pad;
  const top = GRID_ORIGIN_Y - CELL / 2 - pad;
  const bottom = GRID_ORIGIN_Y + (GRID_ROWS - 0.5) * CELL + pad;
  return x >= left && x <= right && y >= top && y <= bottom;
}

/**
 * @param {number} x
 * @param {number} y
 */
function isInShopZone(x, y) {
  return y >= DESIGN_HEIGHT - SHOP_ROW_FROM_BOTTOM - 60;
}

/**
 * @param {number} x
 * @param {number} y
 */
function isNearCastle(x, y) {
  const cx = 450;
  const cy = 1040;
  return (x - cx) ** 2 + (y - cy) ** 2 < 95 ** 2;
}

/**
 * @param {number} x
 * @param {number} y
 * @param {DecorationPlacement[]} placed
 */
function tooCloseToOthers(x, y, placed) {
  for (const p of placed) {
    const dx = p.x - x;
    const dy = p.y - y;
    if (dx * dx + dy * dy < MIN_PROP_SPACING * MIN_PROP_SPACING) {
      return true;
    }
  }
  return false;
}

/**
 * @param {string} mapId
 * @param {number} fieldTop
 * @param {number} fieldBottom
 * @param {{ x: number, y: number }[]} pathPoints
 * @returns {DecorationPlacement[]}
 */
export function buildDecorationPlacements(mapId, fieldTop, fieldBottom, pathPoints) {
  const kinds = MAP_PROP_KINDS[mapId] ?? MAP_PROP_KINDS.meadow;
  const rng = mulberry32(hashSeed(`decor:${mapId}`));
  /** @type {DecorationPlacement[]} */
  const placed = [];

  const sidePad = 28;
  const topPad = 18;
  const bottomPad = 22;
  const maxAttempts = 200;
  const targetCount = 38;

  for (let attempt = 0; attempt < maxAttempts && placed.length < targetCount; attempt += 1) {
    const x = sidePad + rng() * (DESIGN_WIDTH - sidePad * 2);
    const y = fieldTop + topPad + rng() * (fieldBottom - fieldTop - topPad - bottomPad);

    if (isInBuildGrid(x, y)) continue;
    if (isInShopZone(x, y)) continue;
    if (isNearCastle(x, y)) continue;
    if (pointToPathDist(x, y, pathPoints) < MIN_PROP_DISTANCE_FROM_PATH) continue;
    if (tooCloseToOthers(x, y, placed)) continue;

    const kind = pickPropKind(rng, kinds);
    const scale =
      (kind.scaleMin ?? 0.85) + rng() * ((kind.scaleMax ?? 1.1) - (kind.scaleMin ?? 0.85));

    placed.push({
      x,
      y,
      key: kind.key,
      scale,
      originY: kind.originY ?? 1,
      depth: 1,
      flipX: rng() > 0.5,
    });
  }

  return placed;
}
