export const STARTING_STARS = 3;
export const STARTING_HEARTS = 100;

/** Log this in DevTools console if tweaks feel stale (cache/build mismatch). */
export const CLIENT_DATA_REVISION = 'utd:r27-path-finale';

/** Diamonds awarded when clearing wave 10, 20, 30… */
export const DIAMONDS_PER_10_WAVES = 10;

/** Stars granted after fully clearing each wave */
export const STARS_PER_WAVE_CLEARED = 5;

/** Delay between spawning individual enemies inside the same wave */
export const WAVE_SPAWN_GAP_MS = 620;

/** Short pause between waves once the battlefield is cleared */
export const BETWEEN_WAVE_PAUSE_MS = 2200;

/**
 * Tile centers closer than this to the path centerline cannot be built on.
 * Kept tight (~trail half-width + margin) so pockets between zigzag legs stay buildable.
 */
export const MIN_BUILD_DISTANCE_FROM_PATH = 34;

export const DESIGN_WIDTH = 900;
export const DESIGN_HEIGHT = 1600;

/** Troop placement grid (each cell is one RANGE_TILE_PIXELS square). */
export const GRID_COLS = 8;
export const GRID_ROWS = 6;

/** Vertical layout (scaled with canvas). */
export const GRID_TOP_Y = 400;
export const SHOP_ROW_FROM_BOTTOM = 425;

/** Matches build-grid cell size — troop ranges are authored in tiles and converted with this factor */
export const RANGE_TILE_PIXELS = 96;
