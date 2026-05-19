import Phaser from 'phaser';
import { ensureSessionDefaults } from '../sessionProgress.js';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    ensureSessionDefaults(this.registry);
    this.scene.start('PreloadScene');
  }
}
