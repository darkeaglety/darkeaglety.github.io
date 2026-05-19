import Phaser from 'phaser';
import { MAPS } from '../data/maps.js';
import { DIFFICULTIES } from '../data/difficulty.js';
import { CLIENT_DATA_REVISION, DESIGN_HEIGHT, DESIGN_WIDTH } from '../constants.js';
import { TROOPS } from '../data/troops.js';
import { ensureSessionDefaults, getDiamonds, getDifficultyId, setDifficultyId } from '../sessionProgress.js';

/** Layout in design pixels (900×1600). */
const MAP_CARD_W = DESIGN_WIDTH - 80;
const MAP_CARD_H = 132;
const DIFFICULTY_PANEL_TOP = 118;
const DIFFICULTY_PANEL_H = 198;
const MAP_LIST_TOP = DIFFICULTY_PANEL_TOP + DIFFICULTY_PANEL_H + 24;

/**
 * @param {MapSelectScene} scene
 * @param {import('../data/maps.js').MapDef} map
 * @param {number} centerY
 */
function makeCard(scene, map, centerY) {
  const container = scene.add.container(DESIGN_WIDTH / 2, centerY).setDepth(5);

  const panel = scene.add
    .rectangle(0, 0, MAP_CARD_W, MAP_CARD_H, 0x2a2a40, 0.95)
    .setStrokeStyle(3, 0xffffff, 0.15);
  const thumb = scene.add
    .image(-MAP_CARD_W / 2 + 24 + 118, 0, map.thumbnailKey)
    .setOrigin(0.5)
    .setDisplaySize(212, 118);
  const title = scene.add
    .text(MAP_CARD_W / 2 - 28, -MAP_CARD_H / 2 + 22, map.name, {
      fontFamily: 'system-ui,Segoe UI,sans-serif',
      fontSize: '28px',
      color: '#f5f5f7',
      fontStyle: 'bold',
    })
    .setOrigin(1, 0);

  const hit = scene.add.rectangle(0, 0, MAP_CARD_W, MAP_CARD_H, 0x000000, 0.001);
  hit.setInteractive({ useHandCursor: true });
  hit.on('pointerover', () => panel.setStrokeStyle(4, 0xb39ddb, 0.7));
  hit.on('pointerout', () => panel.setStrokeStyle(3, 0xffffff, 0.15));
  hit.on('pointerup', () => {
    scene.scene.start('GameScene', {
      mapId: map.id,
      difficultyId: scene.selectedDifficultyId,
    });
  });

  container.add([panel, thumb, title, hit]);
  return container;
}

export default class MapSelectScene extends Phaser.Scene {
  constructor() {
    super('MapSelectScene');
    this.selectedDifficultyId = 'easy';
    /** @type {Phaser.GameObjects.Container | null} */
    this.difficultyPanel = null;
    /** @type {Phaser.GameObjects.Container[]} */
    this.mapCards = [];
  }

  create() {
    ensureSessionDefaults(this.registry);
    this.selectedDifficultyId = getDifficultyId(this.registry);

    this.add.rectangle(DESIGN_WIDTH / 2, DESIGN_HEIGHT / 2, DESIGN_WIDTH, DESIGN_HEIGHT, 0x151525);

    this.add
      .text(DESIGN_WIDTH / 2, 52, 'Choose a map', {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '38px',
        color: '#ffffff',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)
      .setDepth(20);

    this.add
      .text(DESIGN_WIDTH / 2, 92, `Diamonds ${getDiamonds(this.registry)}  ·  Codex in Menu`, {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '18px',
        color: '#80deea',
      })
      .setOrigin(0.5)
      .setDepth(20);

    this.makeMenuButton();
    this.buildDifficultyPanel();
    this.buildMapList();
    this.showBuildStamp();
  }

  buildDifficultyPanel() {
    this.difficultyPanel?.destroy(true);
    this.difficultyPanel = this.add.container(0, 0).setDepth(30);

    const panelCy = DIFFICULTY_PANEL_TOP + DIFFICULTY_PANEL_H / 2;
    const bg = this.add
      .rectangle(DESIGN_WIDTH / 2, panelCy, DESIGN_WIDTH - 48, DIFFICULTY_PANEL_H, 0x1c1c2e, 0.98)
      .setStrokeStyle(2, 0xffffff, 0.14);
    const heading = this.add
      .text(DESIGN_WIDTH / 2, DIFFICULTY_PANEL_TOP + 22, 'Difficulty', {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '22px',
        color: '#e8e8f0',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    this.difficultyPanel.add([bg, heading]);

    const btnW = 158;
    const btnH = 44;
    const btnGap = 6;
    const row1 = DIFFICULTIES.slice(0, 3);
    const row2 = DIFFICULTIES.slice(3);
    const row1W = row1.length * btnW + (row1.length - 1) * btnGap;
    const row2W = row2.length * btnW + (row2.length - 1) * btnGap;

    const placeRow = (diffs, centerY, rowW) => {
      let x = DESIGN_WIDTH / 2 - rowW / 2 + btnW / 2;
      diffs.forEach((diff) => {
        const active = diff.id === this.selectedDifficultyId;
        const c = this.add.container(x, centerY);
        const rect = this.add
          .rectangle(0, 0, btnW, btnH, active ? diff.tint : 0x2e2e44, active ? 0.95 : 0.88)
          .setStrokeStyle(2, 0xffffff, active ? 0.5 : 0.12);
        const label = this.add
          .text(0, 0, diff.label, {
            fontFamily: 'system-ui,Segoe UI,sans-serif',
            fontSize: diff.label.length > 7 ? '14px' : '16px',
            color: '#ffffff',
            fontStyle: 'bold',
          })
          .setOrigin(0.5);
        const hit = this.add.rectangle(0, 0, btnW, btnH, 0x000000, 0.001).setInteractive({ useHandCursor: true });
        hit.on('pointerup', () => {
          if (this.selectedDifficultyId === diff.id) return;
          this.selectedDifficultyId = diff.id;
          setDifficultyId(this.registry, diff.id);
          this.buildDifficultyPanel();
        });
        c.add([rect, label, hit]);
        this.difficultyPanel.add(c);
        x += btnW + btnGap;
      });
    };

    placeRow(row1, DIFFICULTY_PANEL_TOP + 68, row1W);
    placeRow(row2, DIFFICULTY_PANEL_TOP + 118, row2W);

    const selected = DIFFICULTIES.find((d) => d.id === this.selectedDifficultyId) ?? DIFFICULTIES[0];
    const hint = this.add
      .text(
        DESIGN_WIDTH / 2,
        DIFFICULTY_PANEL_TOP + DIFFICULTY_PANEL_H - 18,
        `${selected.description}  ·  HP ×${selected.hpMult}  Speed ×${selected.speedMult}  Leak ×${selected.castleDamageMult}`,
        {
          fontFamily: 'system-ui,Segoe UI,sans-serif',
          fontSize: '14px',
          color: '#a8a9bc',
          wordWrap: { width: DESIGN_WIDTH - 72 },
          align: 'center',
        },
      )
      .setOrigin(0.5, 1);
    this.difficultyPanel.add(hint);

    this.add
      .text(DESIGN_WIDTH / 2, MAP_LIST_TOP - 14, 'Maps', {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '20px',
        color: '#8e8e9e',
        fontStyle: 'bold',
      })
      .setOrigin(0.5, 1)
      .setDepth(25);
  }

  buildMapList() {
    this.mapCards.forEach((c) => c.destroy(true));
    this.mapCards = [];

    const bottomPad = 44;
    const available = DESIGN_HEIGHT - MAP_LIST_TOP - bottomPad;
    const gap = Math.max(
      10,
      Math.floor((available - MAPS.length * MAP_CARD_H) / Math.max(1, MAPS.length - 1)),
    );

    let centerY = MAP_LIST_TOP + MAP_CARD_H / 2;
    MAPS.forEach((map) => {
      this.mapCards.push(makeCard(this, map, centerY));
      centerY += MAP_CARD_H + gap;
    });
  }

  showBuildStamp() {
    const archer = TROOPS.find((t) => t.id === 'archer');
    const nuker = TROOPS.find((t) => t.id === 'nuker');
    this.add
      .text(
        DESIGN_WIDTH / 2,
        DESIGN_HEIGHT - 22,
        `${CLIENT_DATA_REVISION} · Archer ${archer?.damage} dmg · Nuker ${nuker?.damage} dmg / ${nuker?.fireCooldownMs}ms`,
        {
          fontFamily: 'system-ui,Segoe UI,sans-serif',
          fontSize: '12px',
          color: '#6a6a7a',
        },
      )
      .setOrigin(0.5)
      .setDepth(20);
  }

  makeMenuButton() {
    const c = this.add.container(DESIGN_WIDTH - 120, 52).setDepth(40);
    const bg = this.add.rectangle(0, 0, 168, 52, 0x5c6bc0, 0.95).setStrokeStyle(2, 0xffffff, 0.2);
    const label = this.add
      .text(0, 0, 'Menu', {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '22px',
        color: '#ffffff',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);
    const hit = this.add.rectangle(0, 0, 168, 52, 0x000000, 0.001).setInteractive({ useHandCursor: true });
    hit.on('pointerup', () => {
      this.scene.start('MenuScene', { returnScene: 'MapSelectScene' });
    });
    c.add([bg, label, hit]);
  }
}
