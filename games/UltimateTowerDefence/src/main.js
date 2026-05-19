import Phaser from 'phaser';
import BootScene from './scenes/BootScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import MapSelectScene from './scenes/MapSelectScene.js';
import GameScene from './scenes/GameScene.js';
import MenuScene from './scenes/MenuScene.js';
import { CLIENT_DATA_REVISION, DESIGN_HEIGHT, DESIGN_WIDTH } from './constants.js';
import { TROOPS } from './data/troops.js';

const archer = TROOPS.find((t) => t.id === 'archer');
const nuker = TROOPS.find((t) => t.id === 'nuker');
console.info('[UltimateTowerDefence]', CLIENT_DATA_REVISION);
console.info(
  '[UltimateTowerDefence] troops',
  `archer=${archer?.damage}dmg/${archer?.fireCooldownMs}ms`,
  `nuker=${nuker?.damage}dmg/${nuker?.fireCooldownMs}ms`,
);

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#0f0f1a',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DESIGN_WIDTH,
    height: DESIGN_HEIGHT,
  },
  scene: [BootScene, PreloadScene, MapSelectScene, GameScene, MenuScene],
};

new Phaser.Game(config);
