import Phaser from 'phaser';
import { MAPS } from '../data/maps.js';
import { TROOPS, getTroopSpriteKey } from '../data/troops.js';
import { generateMapPropTextures } from '../mapPropArt.js';
import { generateAllMapThumbnails } from '../mapThumbnailArt.js';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    for (const troop of TROOPS) {
      this.load.image(
        getTroopSpriteKey(troop.id),
        `${import.meta.env.BASE_URL}troops/${troop.id}.png`,
      );
    }
  }

  create() {
    generateMapPropTextures(this);
    generateAllMapThumbnails(this, MAPS);

    this.scene.start('MapSelectScene');
  }
}
