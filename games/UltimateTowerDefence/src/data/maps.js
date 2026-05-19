/** @typedef {{ x: number, y: number }} PathPoint */

/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   thumbnailKey: string,
 *   tint: number,
 *   groundTint: number,
 *   trailTint: number,
 *   path: PathPoint[],
 * }} MapDef
 */

/** Castle goal — on the green playfield, above the shop. */
const CASTLE = { x: 450, y: 1040 };

/**
 * Straight finale: drop to the runway, move horizontally to the castle column, then enter.
 * (Avoids routing through x=115 which made right-side maps backtrack and jitter.)
 */
const RUNWAY_Y = 1000;

/** @type {PathPoint[]} */
function castleFinale(fromX) {
  return [
    { x: fromX, y: RUNWAY_Y },
    { x: CASTLE.x, y: RUNWAY_Y },
    { ...CASTLE },
  ];
}

const PATH_MEADOW = [
  { x: 450, y: 210 },
  { x: 450, y: 360 },
  { x: 115, y: 360 },
  { x: 115, y: 520 },
  { x: 785, y: 520 },
  { x: 785, y: 680 },
  { x: 175, y: 680 },
  { x: 175, y: 840 },
  { x: 785, y: 840 },
  ...castleFinale(785),
];

const PATH_DESERT = [
  { x: 450, y: 210 },
  { x: 450, y: 340 },
  { x: 760, y: 340 },
  { x: 760, y: 500 },
  { x: 140, y: 500 },
  { x: 140, y: 660 },
  { x: 760, y: 660 },
  { x: 760, y: 820 },
  { x: 140, y: 820 },
  ...castleFinale(140),
];

const PATH_ICE = [
  { x: 140, y: 230 },
  { x: 760, y: 230 },
  { x: 760, y: 390 },
  { x: 200, y: 390 },
  { x: 200, y: 550 },
  { x: 700, y: 550 },
  { x: 700, y: 710 },
  { x: 200, y: 710 },
  { x: 200, y: 870 },
  { x: 700, y: 870 },
  ...castleFinale(700),
];

const PATH_SPACE = [
  { x: 450, y: 205 },
  { x: 680, y: 205 },
  { x: 680, y: 355 },
  { x: 220, y: 355 },
  { x: 220, y: 505 },
  { x: 740, y: 505 },
  { x: 740, y: 655 },
  { x: 160, y: 655 },
  { x: 160, y: 805 },
  { x: 780, y: 805 },
  { x: 780, y: 920 },
  ...castleFinale(780),
];

/** @type {MapDef[]} */
export const MAPS = [
  {
    id: 'meadow',
    name: 'Meadow',
    thumbnailKey: 'map_thumb_meadow',
    tint: 0x4caf50,
    groundTint: 0x2e7d32,
    trailTint: 0x204c22,
    path: PATH_MEADOW,
  },
  {
    id: 'desert',
    name: 'Desert',
    thumbnailKey: 'map_thumb_desert',
    tint: 0xffb74d,
    groundTint: 0xbf6c1b,
    trailTint: 0x6d3f12,
    path: PATH_DESERT,
  },
  {
    id: 'ice',
    name: 'Ice Cave',
    thumbnailKey: 'map_thumb_ice',
    tint: 0x81d4fa,
    groundTint: 0x1565c0,
    trailTint: 0x0d3f7a,
    path: PATH_ICE,
  },
  {
    id: 'space',
    name: 'Space Station',
    thumbnailKey: 'map_thumb_space',
    tint: 0x7e57c2,
    groundTint: 0x0d1028,
    trailTint: 0x4527a0,
    path: PATH_SPACE,
  },
];

export function getMapById(id) {
  return MAPS.find((m) => m.id === id) ?? MAPS[0];
}
