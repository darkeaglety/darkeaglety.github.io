/**
 * Procedural map decoration textures (trees, rocks, cacti, ice, etc.).
 * Generated at preload so no external art files are required.
 */

/**
 * @param {Phaser.Scene} scene
 * @param {string} key
 * @param {number} w
 * @param {number} h
 * @param {(g: Phaser.GameObjects.Graphics) => void} draw
 */
function makePropTexture(scene, key, w, h, draw) {
  if (scene.textures.exists(key)) return;
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  draw(g);
  g.generateTexture(key, w, h);
  g.destroy();
}

/**
 * @param {Phaser.Scene} scene
 */
export function generateMapPropTextures(scene) {
  // Meadow
  makePropTexture(scene, 'prop_meadow_tree', 56, 72, (g) => {
    g.fillStyle(0x4e342e, 1);
    g.fillRoundedRect(22, 38, 12, 30, 4);
    g.fillStyle(0x2e7d32, 1);
    g.fillCircle(28, 28, 22);
    g.fillStyle(0x43a047, 1);
    g.fillCircle(18, 32, 14);
    g.fillCircle(38, 30, 16);
    g.fillStyle(0x66bb6a, 0.85);
    g.fillCircle(28, 20, 12);
  });

  makePropTexture(scene, 'prop_meadow_bush', 44, 32, (g) => {
    g.fillStyle(0x1b5e20, 1);
    g.fillEllipse(22, 22, 38, 22);
    g.fillStyle(0x388e3c, 1);
    g.fillEllipse(14, 20, 22, 16);
    g.fillEllipse(30, 18, 20, 14);
  });

  makePropTexture(scene, 'prop_meadow_rock', 40, 28, (g) => {
    g.fillStyle(0x616161, 1);
    g.fillEllipse(20, 18, 34, 22);
    g.fillStyle(0x9e9e9e, 0.7);
    g.fillEllipse(14, 14, 14, 10);
  });

  makePropTexture(scene, 'prop_meadow_flower', 36, 36, (g) => {
    g.fillStyle(0x558b2f, 1);
    g.fillRect(16, 18, 4, 14);
    g.fillStyle(0xffee58, 1);
    g.fillCircle(18, 12, 7);
    g.fillStyle(0xf48fb1, 1);
    g.fillCircle(10, 16, 5);
    g.fillCircle(26, 16, 5);
    g.fillCircle(18, 22, 5);
  });

  // Desert
  makePropTexture(scene, 'prop_desert_cactus', 40, 64, (g) => {
    g.fillStyle(0x33691e, 1);
    g.fillRoundedRect(16, 20, 10, 40, 4);
    g.fillRoundedRect(6, 28, 10, 22, 4);
    g.fillRoundedRect(26, 32, 10, 18, 4);
    g.fillStyle(0x689f38, 0.5);
    g.fillCircle(21, 18, 6);
  });

  makePropTexture(scene, 'prop_desert_bush', 38, 26, (g) => {
    g.fillStyle(0x8d6e63, 1);
    g.fillEllipse(19, 16, 32, 16);
    g.fillStyle(0xa1887f, 0.8);
    g.fillEllipse(12, 14, 14, 10);
  });

  makePropTexture(scene, 'prop_desert_rock', 48, 32, (g) => {
    g.fillStyle(0x8d6e63, 1);
    g.fillEllipse(24, 18, 40, 24);
    g.fillStyle(0xbcaaa4, 0.65);
    g.fillEllipse(16, 14, 16, 12);
  });

  makePropTexture(scene, 'prop_desert_skull', 32, 28, (g) => {
    g.fillStyle(0xe0e0e0, 1);
    g.fillEllipse(16, 14, 22, 18);
    g.fillStyle(0x5d4037, 1);
    g.fillCircle(11, 14, 3);
    g.fillCircle(21, 14, 3);
    g.fillEllipse(16, 20, 8, 4);
  });

  // Ice
  makePropTexture(scene, 'prop_ice_spike', 36, 56, (g) => {
    g.fillStyle(0xb3e5fc, 0.95);
    g.fillTriangle(18, 4, 8, 52, 28, 52);
    g.fillStyle(0xe1f5fe, 0.9);
    g.fillTriangle(18, 4, 14, 52, 24, 48);
    g.fillStyle(0xffffff, 0.45);
    g.fillTriangle(18, 8, 16, 40, 20, 36);
  });

  makePropTexture(scene, 'prop_ice_crystal', 44, 48, (g) => {
    g.fillStyle(0x4fc3f7, 0.85);
    g.fillTriangle(22, 6, 10, 42, 22, 42);
    g.fillTriangle(22, 6, 34, 42, 22, 42);
    g.fillStyle(0xe1f5fe, 0.7);
    g.fillTriangle(22, 10, 16, 38, 22, 38);
  });

  makePropTexture(scene, 'prop_ice_mound', 52, 30, (g) => {
    g.fillStyle(0xeceff1, 1);
    g.fillEllipse(26, 18, 48, 22);
    g.fillStyle(0xffffff, 0.75);
    g.fillEllipse(18, 14, 20, 12);
  });

  makePropTexture(scene, 'prop_ice_rock', 42, 30, (g) => {
    g.fillStyle(0x546e7a, 1);
    g.fillEllipse(21, 16, 36, 22);
    g.fillStyle(0x90a4ae, 0.8);
    g.fillEllipse(14, 12, 14, 10);
    g.fillStyle(0xe3f2fd, 0.35);
    g.fillEllipse(26, 14, 12, 8);
  });

  // Space
  makePropTexture(scene, 'prop_space_asteroid', 44, 40, (g) => {
    g.fillStyle(0x5d4037, 1);
    g.fillEllipse(22, 22, 38, 32);
    g.fillStyle(0x8d6e63, 0.85);
    g.fillEllipse(16, 16, 16, 12);
    g.fillStyle(0x3e2723, 0.6);
    g.fillCircle(28, 26, 6);
  });

  makePropTexture(scene, 'prop_space_crate', 40, 36, (g) => {
    g.fillStyle(0x546e7a, 1);
    g.fillRoundedRect(6, 10, 28, 22, 3);
    g.fillStyle(0x78909c, 1);
    g.fillRect(6, 10, 28, 6);
    g.lineStyle(2, 0x00e5ff, 0.7);
    g.strokeRoundedRect(8, 12, 24, 18, 2);
  });

  makePropTexture(scene, 'prop_space_antenna', 36, 56, (g) => {
    g.fillStyle(0x90a4ae, 1);
    g.fillRect(16, 24, 4, 28);
    g.fillStyle(0x00e5ff, 0.9);
    g.fillCircle(18, 14, 8);
    g.lineStyle(2, 0x00e5ff, 0.5);
    g.lineBetween(6, 20, 30, 20);
    g.lineBetween(10, 28, 26, 28);
  });

  makePropTexture(scene, 'prop_space_crystal', 40, 48, (g) => {
    g.fillStyle(0x7c4dff, 0.9);
    g.fillTriangle(20, 6, 8, 42, 20, 42);
    g.fillTriangle(20, 6, 32, 42, 20, 42);
    g.fillStyle(0x18ffff, 0.55);
    g.fillTriangle(20, 10, 14, 38, 20, 38);
  });

  makePropTexture(scene, 'prop_space_satellite', 48, 44, (g) => {
    g.fillStyle(0xb0bec5, 1);
    g.fillRoundedRect(18, 16, 12, 20, 3);
    g.fillStyle(0x37474f, 1);
    g.fillRect(4, 20, 12, 8);
    g.fillRect(32, 20, 12, 8);
    g.fillStyle(0x00e5ff, 0.8);
    g.fillCircle(24, 14, 4);
  });
}
