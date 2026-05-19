import Phaser from 'phaser';
import { TROOPS, formatTroopCombatStats, getTroopSpriteKey } from '../data/troops.js';
import { ENEMIES, formatEnemyCatalogLines } from '../data/enemies.js';
import { POWER_UPS, getPowerUpBonuses } from '../data/powerUps.js';
import { DESIGN_HEIGHT, DESIGN_WIDTH } from '../constants.js';
import {
  addDiamonds,
  ensureSessionDefaults,
  getDiamonds,
  getPowerUpLevels,
  setPowerUpLevels,
} from '../sessionProgress.js';

const TABS = [
  { id: 'troops', label: 'Troops' },
  { id: 'enemies', label: 'Enemies' },
  { id: 'powerups', label: 'Power-ups' },
];

const LIST_TOP = 248;
const LIST_HEIGHT = 1180;
const ROW_H = 108;

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
    /** @type {string} */
    this.returnScene = 'MapSelectScene';
    /** @type {Record<string, unknown>} */
    this.returnData = {};
    /** @type {'troops' | 'enemies' | 'powerups'} */
    this.activeTab = 'troops';
    this.scrollOffset = 0;
    /** @type {Phaser.GameObjects.Container | null} */
    this.listRoot = null;
    /** @type {Phaser.Display.Masks.GeometryMask | null} */
    this.listMask = null;
    /** @type {Phaser.GameObjects.Text | null} */
    this.diamondText = null;
    /** @type {Phaser.GameObjects.Text | null} */
    this.hintText = null;
    /** @type {Phaser.GameObjects.Container[]} */
    this.tabButtons = [];
  }

  init(data) {
    this.returnScene = data?.returnScene ?? 'MapSelectScene';
    this.returnData = data?.returnData ?? {};
    this.activeTab = data?.tab ?? 'troops';
    this.scrollOffset = 0;
    this.listRoot = null;
    this.listMask = null;
    this.diamondText = null;
    this.hintText = null;
    this.tabButtons = [];
  }

  create() {
    ensureSessionDefaults(this.registry);

    this.add.rectangle(DESIGN_WIDTH / 2, DESIGN_HEIGHT / 2, DESIGN_WIDTH, DESIGN_HEIGHT, 0x12121f);

    this.add
      .text(DESIGN_WIDTH / 2, 52, 'Codex & Shop', {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '40px',
        color: '#ffffff',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    this.diamondText = this.add
      .text(DESIGN_WIDTH / 2, 108, this.diamondLabel(), {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '28px',
        color: '#80deea',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    this.hintText = this.add
      .text(DESIGN_WIDTH / 2, 148, 'Earn 10 💎 every 10 waves survived in a run', {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '18px',
        color: '#9e9eb0',
      })
      .setOrigin(0.5);

    this.buildTabs();
    this.buildListMask();
    this.rebuildList();
    this.buildNavButtons();
    this.makeBackButton();
  }

  diamondLabel() {
    return `Diamonds ${getDiamonds(this.registry)}`;
  }

  refreshDiamondHud() {
    if (this.diamondText) {
      this.diamondText.setText(this.diamondLabel());
    }
  }

  buildTabs() {
    const tabY = 196;
    const tabW = 250;
    const gap = 14;
    const totalW = TABS.length * tabW + (TABS.length - 1) * gap;
    let x = DESIGN_WIDTH / 2 - totalW / 2 + tabW / 2;

    this.tabButtons = [];
    TABS.forEach((tab) => {
      const active = tab.id === this.activeTab;
      const c = this.add.container(x, tabY).setDepth(10);
      const bg = this.add
        .rectangle(0, 0, tabW, 52, active ? 0x5c6bc0 : 0x2e2e44, 0.98)
        .setStrokeStyle(2, active ? 0x9fa8da : 0xffffff, active ? 0.55 : 0.15);
      const label = this.add
        .text(0, 0, tab.label, {
          fontFamily: 'system-ui,Segoe UI,sans-serif',
          fontSize: '22px',
          color: '#ffffff',
          fontStyle: 'bold',
        })
        .setOrigin(0.5);
      const hit = this.add.rectangle(0, 0, tabW, 52, 0x000000, 0.001).setInteractive({ useHandCursor: true });
      hit.on('pointerup', () => {
        if (this.activeTab === tab.id) return;
        this.activeTab = /** @type {'troops' | 'enemies' | 'powerups'} */ (tab.id);
        this.scrollOffset = 0;
        this.scene.restart({
          returnScene: this.returnScene,
          returnData: this.returnData,
          tab: this.activeTab,
        });
      });
      c.add([bg, label, hit]);
      this.tabButtons.push(c);
      x += tabW + gap;
    });
  }

  buildListMask() {
    const maskGfx = this.make.graphics({ x: 0, y: 0 });
    maskGfx.fillStyle(0xffffff);
    maskGfx.fillRect(40, LIST_TOP, DESIGN_WIDTH - 80, LIST_HEIGHT);
    this.listMask = maskGfx.createGeometryMask();
  }

  rebuildList() {
    this.listRoot?.destroy(true);
    this.listRoot = this.add.container(DESIGN_WIDTH / 2, LIST_TOP);
    this.listRoot.setMask(this.listMask);

    if (this.activeTab === 'troops') {
      this.buildTroopRows();
    } else if (this.activeTab === 'enemies') {
      this.buildEnemyRows();
    } else {
      this.buildPowerUpRows();
    }

    this.applyScroll();
  }

  applyScroll() {
    if (!this.listRoot) return;
    const contentH = this.listRoot.getData('contentHeight') ?? 0;
    const maxScroll = Math.max(0, contentH - LIST_HEIGHT);
    this.scrollOffset = Phaser.Math.Clamp(this.scrollOffset, 0, maxScroll);
    this.listRoot.y = LIST_TOP - this.scrollOffset;
  }

  /**
   * @param {number} y
   * @param {string} title
   * @param {string} body
   * @param {number} tint
   * @param {string} [spriteKey]
   */
  addCatalogRow(y, title, body, tint, spriteKey) {
    const w = DESIGN_WIDTH - 88;
    const row = this.add.container(0, y);
    const panel = this.add.rectangle(0, 0, w, ROW_H - 8, 0x2a2a42, 0.96).setStrokeStyle(2, 0xffffff, 0.12);

    const swatch = this.add.circle(-w / 2 + 44, 0, 22, tint, 0.35).setStrokeStyle(2, 0xffffff, 0.3);
    row.add(panel);
    row.add(swatch);

    if (spriteKey && this.textures.exists(spriteKey)) {
      row.add(this.add.image(-w / 2 + 44, 0, spriteKey).setDisplaySize(38, 38).setOrigin(0.5));
    } else {
      row.add(this.add.circle(-w / 2 + 44, 0, 14, tint, 1));
    }

    row.add(
      this.add
        .text(-w / 2 + 88, -ROW_H / 2 + 22, title, {
          fontFamily: 'system-ui,Segoe UI,sans-serif',
          fontSize: '24px',
          color: '#ffffff',
          fontStyle: 'bold',
        })
        .setOrigin(0, 0.5),
    );

    row.add(
      this.add
        .text(-w / 2 + 88, 8, body, {
          fontFamily: 'system-ui,Segoe UI,sans-serif',
          fontSize: '17px',
          color: '#c5c6d8',
          lineSpacing: 4,
        })
        .setOrigin(0, 0),
    );

    this.listRoot.add(row);
    return row;
  }

  buildTroopRows() {
    let y = ROW_H / 2;
    TROOPS.forEach((troop) => {
      const body = `Deploy ${troop.starCost} ★\n${formatTroopCombatStats(troop)}`;
      this.addCatalogRow(y, troop.name, body, troop.tint, getTroopSpriteKey(troop.id));
      y += ROW_H;
    });
    this.listRoot.setData('contentHeight', y + ROW_H / 2);
  }

  buildEnemyRows() {
    let y = ROW_H / 2;
    Object.values(ENEMIES).forEach((def) => {
      const body = `${formatEnemyCatalogLines(def)}\n(Stats scale up on higher difficulties)`;
      this.addCatalogRow(y, def.displayName, body, def.tint);
      y += ROW_H;
    });
    this.listRoot.setData('contentHeight', y + ROW_H / 2);
  }

  buildPowerUpRows() {
    const levels = getPowerUpLevels(this.registry);
    const bonuses = getPowerUpBonuses(levels);
    let y = ROW_H / 2;

    POWER_UPS.forEach((pu) => {
      const lv = levels[pu.id] ?? 0;
      const w = DESIGN_WIDTH - 88;
      const row = this.add.container(0, y);
      const panel = this.add.rectangle(0, 0, w, ROW_H - 8, 0x2a2a42, 0.96).setStrokeStyle(2, 0xffffff, 0.12);

      const title = `${pu.name}  Lv ${lv}/${pu.maxLevel}`;
      const effectLine = this.describePowerUpEffect(pu.id, bonuses);
      const costLine =
        lv >= pu.maxLevel ? 'MAX LEVEL' : `Buy: ${pu.diamondCost} 💎`;

      row.add(panel);
      row.add(
        this.add
          .text(-w / 2 + 20, -28, title, {
            fontFamily: 'system-ui,Segoe UI,sans-serif',
            fontSize: '24px',
            color: '#ffffff',
            fontStyle: 'bold',
          })
          .setOrigin(0, 0.5),
      );
      row.add(
        this.add
          .text(-w / 2 + 20, 4, pu.description, {
            fontFamily: 'system-ui,Segoe UI,sans-serif',
            fontSize: '17px',
            color: '#b0b2c4',
          })
          .setOrigin(0, 0),
      );
      row.add(
        this.add
          .text(-w / 2 + 20, 44, effectLine, {
            fontFamily: 'system-ui,Segoe UI,sans-serif',
            fontSize: '16px',
            color: '#80cbc4',
          })
          .setOrigin(0, 0),
      );

      if (lv < pu.maxLevel) {
        const btnX = w / 2 - 100;
        const btnBg = this.add.rectangle(btnX, 8, 168, 52, 0x00897b, 0.95).setStrokeStyle(2, 0xffffff, 0.2);
        const btnLabel = this.add
          .text(btnX, 8, costLine, {
            fontFamily: 'system-ui,Segoe UI,sans-serif',
            fontSize: '18px',
            color: '#ffffff',
            fontStyle: 'bold',
          })
          .setOrigin(0.5);
        const hit = this.add.rectangle(btnX, 8, 168, 52, 0x000000, 0.001).setInteractive({ useHandCursor: true });
        const affordable = getDiamonds(this.registry) >= pu.diamondCost;
        if (!affordable) {
          btnBg.setFillStyle(0x424242, 0.95);
          btnLabel.setColor('#9e9e9e');
        }
        hit.on('pointerup', () => this.tryBuyPowerUp(pu.id));
        row.add([btnBg, btnLabel, hit]);
      } else {
        row.add(
          this.add
            .text(w / 2 - 20, 8, 'MAX', {
              fontFamily: 'system-ui,Segoe UI,sans-serif',
              fontSize: '22px',
              color: '#ffd54f',
              fontStyle: 'bold',
            })
            .setOrigin(1, 0.5),
        );
      }

      this.listRoot.add(row);
      y += ROW_H;
    });
    this.listRoot.setData('contentHeight', y + ROW_H / 2);
  }

  /**
   * @param {string} id
   * @param {ReturnType<typeof getPowerUpBonuses>} bonuses
   */
  describePowerUpEffect(id, bonuses) {
    switch (id) {
      case 'damage':
        return `Active: ×${bonuses.damageMult.toFixed(2)} damage`;
      case 'fire_rate':
        return `Active: ×${bonuses.cooldownMult.toFixed(2)} cooldown`;
      case 'castle_wall':
        return `Active: +${bonuses.castleHpBonus} castle HP at run start`;
      case 'wave_stars':
        return `Active: +${bonuses.bonusStarsPerWave} ★ per wave cleared`;
      default:
        return '';
    }
  }

  /**
   * @param {string} powerUpId
   */
  tryBuyPowerUp(powerUpId) {
    const pu = POWER_UPS.find((p) => p.id === powerUpId);
    if (!pu) return;

    const levels = getPowerUpLevels(this.registry);
    const lv = levels[pu.id] ?? 0;
    if (lv >= pu.maxLevel) return;
    if (getDiamonds(this.registry) < pu.diamondCost) {
      this.flashToast('Not enough diamonds');
      return;
    }

    addDiamonds(this.registry, -pu.diamondCost);
    levels[pu.id] = lv + 1;
    setPowerUpLevels(this.registry, levels);
    this.refreshDiamondHud();
    this.flashToast(`${pu.name} upgraded to Lv ${lv + 1}`);
    this.rebuildList();
  }

  buildNavButtons() {
    const scrollStep = ROW_H * 2;
    const makeBtn = (x, label, delta) => {
      const c = this.add.container(x, LIST_TOP + LIST_HEIGHT + 36).setDepth(12);
      const bg = this.add.rectangle(0, 0, 120, 48, 0x3949ab, 0.95).setStrokeStyle(2, 0xffffff, 0.2);
      const t = this.add
        .text(0, 0, label, {
          fontFamily: 'system-ui,Segoe UI,sans-serif',
          fontSize: '20px',
          color: '#fff',
          fontStyle: 'bold',
        })
        .setOrigin(0.5);
      const hit = this.add.rectangle(0, 0, 120, 48, 0x000000, 0.001).setInteractive({ useHandCursor: true });
      hit.on('pointerup', () => {
        this.scrollOffset += delta;
        this.applyScroll();
      });
      c.add([bg, t, hit]);
    };

    makeBtn(DESIGN_WIDTH / 2 - 80, '▲', -scrollStep);
    makeBtn(DESIGN_WIDTH / 2 + 80, '▼', scrollStep);

    this.input.on('wheel', (_pointer, _go, _dx, deltaY) => {
      this.scrollOffset += deltaY > 0 ? 80 : -80;
      this.applyScroll();
    });
  }

  makeBackButton() {
    const c = this.add.container(100, DESIGN_HEIGHT - 56).setDepth(20);
    const bg = this.add.rectangle(0, 0, 168, 64, 0x3949ab, 0.95).setStrokeStyle(2, 0xffffff, 0.2);
    const label = this.add
      .text(0, 0, 'Back', {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '24px',
        color: '#ffffff',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);
    const hit = this.add.rectangle(0, 0, 168, 64, 0x000000, 0.001).setInteractive({ useHandCursor: true });
    hit.on('pointerup', () => {
      if (this.returnScene === 'GameScene' && this.scene.isPaused('GameScene')) {
        this.scene.stop();
        this.scene.resume('GameScene');
        return;
      }
      this.scene.start(this.returnScene, this.returnData);
    });
    c.add([bg, label, hit]);
  }

  /**
   * @param {string} msg
   */
  flashToast(msg) {
    const t = this.add
      .text(DESIGN_WIDTH / 2, DESIGN_HEIGHT - 120, msg, {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '22px',
        color: '#ffffff',
        backgroundColor: '#000000aa',
        padding: { x: 16, y: 10 },
      })
      .setOrigin(0.5)
      .setDepth(50);
    this.time.delayedCall(1400, () => t.destroy());
  }
}
