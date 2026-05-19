
const TW = 280;
const TH = 160;
const PAD = 12;
const INNER_L = PAD;
const INNER_T = 22;
const INNER_W = TW - PAD * 2;
const INNER_H = TH - INNER_T - 14;

/**
 * @param {import('./data/maps.js').MapDef} map
 */
function computePathBounds(map) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const p of map.path) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  }
  const padX = 40;
  const padY = 36;
  return {
    minX: minX - padX,
    maxX: maxX + padX,
    minY: minY - padY,
    maxY: maxY + padY,
    left: INNER_L,
    top: INNER_T,
    width: INNER_W,
    height: INNER_H,
  };
}

/**
 * @param {number} x
 * @param {number} y
 * @param {ReturnType<typeof computePathBounds>} b
 */
function toThumb(x, y, b) {
  const tx = b.left + ((x - b.minX) / (b.maxX - b.minX)) * b.width;
  const ty = b.top + ((y - b.minY) / (b.maxY - b.minY)) * b.height;
  return { x: tx, y: ty };
}

/**
 * @param {() => number} rng
 */
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * @param {Phaser.GameObjects.Graphics} g
 * @param {import('./data/maps.js').MapDef} map
 * @param {ReturnType<typeof computePathBounds>} bounds
 * @param {() => number} rng
 */
function scatterThumbDecor(g, map, bounds, rng) {
  const count = 22;
  for (let i = 0; i < count; i += 1) {
    const x = bounds.left + 8 + rng() * (bounds.width - 16);
    const y = bounds.top + 8 + rng() * (bounds.height - 16);

    switch (map.id) {
      case 'meadow': {
        const r = 4 + rng() * 8;
        g.fillStyle(rng() > 0.5 ? 0x2e7d32 : 0x388e3c, 0.75);
        g.fillCircle(x, y, r);
        g.fillStyle(0x4e342e, 1);
        g.fillRect(x - 1, y + r - 2, 3, 5);
        break;
      }
      case 'desert': {
        if (rng() > 0.55) {
          g.fillStyle(0x33691e, 0.9);
          g.fillRoundedRect(x - 3, y - 6, 6, 14, 2);
          g.fillRoundedRect(x - 8, y, 5, 10, 2);
          g.fillRoundedRect(x + 4, y + 2, 5, 8, 2);
        } else {
          g.fillStyle(0x8d6e63, 0.85);
          g.fillEllipse(x, y, 10 + rng() * 8, 6 + rng() * 4);
        }
        break;
      }
      case 'ice': {
        g.fillStyle(0xb3e5fc, 0.85);
        g.fillTriangle(x, y - 8, x - 6, y + 6, x + 6, y + 6);
        if (rng() > 0.6) {
          g.fillStyle(0x4fc3f7, 0.7);
          g.fillTriangle(x + 4, y - 6, x, y + 4, x + 8, y + 4);
        }
        break;
      }
      case 'space': {
        if (rng() > 0.5) {
          g.fillStyle(0x5d4037, 0.9);
          g.fillEllipse(x, y, 8 + rng() * 6, 6 + rng() * 4);
        } else {
          g.fillStyle(0x546e7a, 0.85);
          g.fillRoundedRect(x - 6, y - 4, 12, 8, 2);
          g.lineStyle(1, 0x00e5ff, 0.6);
          g.strokeRoundedRect(x - 5, y - 3, 10, 6, 1);
        }
        break;
      }
      default:
        break;
    }
  }
}

/**
 * @param {Phaser.GameObjects.Graphics} g
 * @param {import('./data/maps.js').MapDef} map
 */
function drawThumbBackground(g, map) {
  g.fillStyle(0x12121c, 1);
  g.fillRoundedRect(0, 0, TW, TH, 12);

  g.fillStyle(map.groundTint, 1);
  g.fillRoundedRect(INNER_L, INNER_T, INNER_W, INNER_H, 8);

  const rng = mulberry32(map.path.length * 997 + map.groundTint);

  if (map.id === 'meadow') {
    g.fillStyle(0x1b5e20, 0.35);
    g.fillEllipse(INNER_L + 60, INNER_T + 40, 90, 50);
    g.fillEllipse(INNER_L + INNER_W - 50, INNER_T + INNER_H - 45, 80, 45);
    for (let i = 0; i < 16; i += 1) {
      g.fillStyle(0x66bb6a, 0.25);
      g.fillCircle(INNER_L + rng() * INNER_W, INNER_T + rng() * INNER_H, 12 + rng() * 18);
    }
  } else if (map.id === 'desert') {
    g.fillStyle(0xd7a86a, 0.4);
    g.fillEllipse(INNER_L + INNER_W * 0.35, INNER_T + INNER_H * 0.7, INNER_W * 0.5, 28);
    g.fillStyle(0x8d6e63, 0.25);
    g.fillEllipse(INNER_L + INNER_W * 0.7, INNER_T + 30, 70, 22);
    for (let i = 0; i < 10; i += 1) {
      g.fillStyle(0xe0c080, 0.2);
      g.fillEllipse(INNER_L + rng() * INNER_W, INNER_T + rng() * INNER_H, 20, 8);
    }
  } else if (map.id === 'ice') {
    g.fillStyle(0x0d47a1, 0.45);
    g.fillRect(INNER_L, INNER_T, INNER_W, INNER_H);
    g.fillStyle(0xffffff, 0.12);
    for (let i = 0; i < 14; i += 1) {
      const sx = INNER_L + rng() * INNER_W;
      const sy = INNER_T + rng() * INNER_H;
      g.fillCircle(sx, sy, 1 + rng() * 2);
    }
    g.fillStyle(0x4fc3f7, 0.15);
    g.fillEllipse(INNER_L + INNER_W / 2, INNER_T + INNER_H / 2, INNER_W * 0.7, INNER_H * 0.5);
  } else if (map.id === 'space') {
    g.fillStyle(0x050510, 1);
    g.fillRoundedRect(INNER_L, INNER_T, INNER_W, INNER_H, 8);
    for (let i = 0; i < 55; i += 1) {
      g.fillStyle(i % 4 === 0 ? 0xffffff : 0xb39ddb, 0.2 + (i % 6) * 0.08);
      g.fillCircle(INNER_L + rng() * INNER_W, INNER_T + rng() * INNER_H, i % 5 === 0 ? 2 : 1);
    }
    g.lineStyle(1, 0x3949ab, 0.2);
    for (let y = INNER_T + 14; y < INNER_T + INNER_H; y += 18) {
      g.lineBetween(INNER_L + 6, y, INNER_L + INNER_W - 6, y);
    }
    for (let x = INNER_L + 20; x < INNER_L + INNER_W; x += 28) {
      g.lineBetween(x, INNER_T + 8, x, INNER_T + INNER_H - 8);
    }
    g.fillStyle(0x4a148c, 0.18);
    g.fillEllipse(INNER_L + 70, INNER_T + 50, 100, 60);
    g.fillStyle(0x1565c0, 0.12);
    g.fillEllipse(INNER_L + INNER_W - 60, INNER_T + INNER_H - 40, 90, 50);
  }
}

/**
 * @param {Phaser.GameObjects.Graphics} g
 * @param {import('./data/maps.js').MapDef} map
 * @param {ReturnType<typeof computePathBounds>} bounds
 */
function drawThumbPath(g, map, bounds) {
  const pts = map.path.map((p) => toThumb(p.x, p.y, bounds));

  if (map.id === 'space') {
    g.lineStyle(20, 0x7c4dff, 0.22);
    g.beginPath();
    g.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i += 1) g.lineTo(pts[i].x, pts[i].y);
    g.strokePath();
    g.lineStyle(12, 0x18ffff, 0.28);
    g.beginPath();
    g.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i += 1) g.lineTo(pts[i].x, pts[i].y);
    g.strokePath();
  } else {
    g.lineStyle(16, map.trailTint, 0.35);
    g.beginPath();
    g.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i += 1) g.lineTo(pts[i].x, pts[i].y);
    g.strokePath();
  }

  g.lineStyle(10, map.trailTint, 0.95);
  g.beginPath();
  g.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i += 1) g.lineTo(pts[i].x, pts[i].y);
  g.strokePath();

  g.lineStyle(2, 0xffffff, 0.2);
  g.beginPath();
  g.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i += 1) g.lineTo(pts[i].x, pts[i].y);
  g.strokePath();
}

/**
 * @param {Phaser.GameObjects.Graphics} g
 * @param {import('./data/maps.js').MapDef} map
 * @param {ReturnType<typeof computePathBounds>} bounds
 */
function drawThumbMarkers(g, map, bounds) {
  const spawn = toThumb(map.path[0].x, map.path[0].y, bounds);
  const end = map.path[map.path.length - 1];
  const castle = toThumb(end.x, end.y, bounds);

  const spawnColor = map.id === 'space' ? 0x18ffff : 0x81c784;
  g.fillStyle(spawnColor, 0.9);
  g.fillCircle(spawn.x, spawn.y, 5);
  g.lineStyle(2, 0xffffff, 0.7);
  g.strokeCircle(spawn.x, spawn.y, 5);

  g.fillStyle(0x78909c, 1);
  g.fillRoundedRect(castle.x - 7, castle.y - 6, 14, 12, 2);
  g.fillStyle(0xb0bec5, 1);
  g.fillTriangle(castle.x, castle.y - 12, castle.x - 9, castle.y - 4, castle.x + 9, castle.y - 4);
  g.fillStyle(0xff5252, 0.85);
  g.fillRect(castle.x - 2, castle.y - 2, 4, 5);
}

/**
 * @param {Phaser.GameObjects.Graphics} g
 */
function drawThumbFrame(g) {
  g.lineStyle(3, 0xffffff, 0.28);
  g.strokeRoundedRect(1, 1, TW - 2, TH - 2, 11);
  g.lineStyle(1, 0x000000, 0.35);
  g.strokeRoundedRect(0.5, 0.5, TW - 1, TH - 1, 12);
}

/**
 * @param {Phaser.Scene} scene
 * @param {import('./data/maps.js').MapDef} map
 */
export function generateMapThumbnail(scene, map) {
  if (scene.textures.exists(map.thumbnailKey)) {
    scene.textures.remove(map.thumbnailKey);
  }

  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  const bounds = computePathBounds(map);
  const rng = mulberry32(map.id.length * 131 + map.path.length * 17);

  drawThumbBackground(g, map);
  scatterThumbDecor(g, map, bounds, rng);
  drawThumbPath(g, map, bounds);
  drawThumbMarkers(g, map, bounds);
  drawThumbFrame(g);

  g.generateTexture(map.thumbnailKey, TW, TH);
  g.destroy();
}

/**
 * @param {Phaser.Scene} scene
 * @param {import('./data/maps.js').MapDef[]} maps
 */
export function generateAllMapThumbnails(scene, maps) {
  for (const map of maps) {
    generateMapThumbnail(scene, map);
  }
}
