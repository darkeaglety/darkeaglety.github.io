import Phaser from 'phaser';
import { getMapById } from '../data/maps.js';
import { TROOPS, formatTroopShopStats, getTroopSpriteKey } from '../data/troops.js';
import { getPowerUpBonuses } from '../data/powerUps.js';
import { getEnemyDef, getSplitDeathRules, formatEnemyRuntimeInspect } from '../data/enemies.js';
import { getDifficultyById, scaleEnemyStatsForDifficulty } from '../data/difficulty.js';
import { buildWaveComposition, shuffleInPlace } from '../data/waves.js';
import {
  RANGE_TILE_PIXELS,
  BETWEEN_WAVE_PAUSE_MS,
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  MIN_BUILD_DISTANCE_FROM_PATH,
  GRID_COLS,
  GRID_ROWS,
  GRID_TOP_Y,
  SHOP_ROW_FROM_BOTTOM,
  DIAMONDS_PER_10_WAVES,
  STARS_PER_WAVE_CLEARED,
  STARTING_HEARTS,
  STARTING_STARS,
  WAVE_SPAWN_GAP_MS,
} from '../constants.js';
import { buildDecorationPlacements } from '../mapDecorations.js';
import { buildPathMeta, getPointAtDistance, pointToPathDist } from '../pathUtils.js';
import { MAX_TROOP_UPGRADE_LEVEL, getEffectiveTroopStats, getSellRefundStars, getTotalStarsInvested, getUpgradeStarsCost } from '../troopUpgrade.js';
import {
  addDiamonds,
  ensureSessionDefaults,
  getDiamonds,
  getDifficultyId,
  getPowerUpLevels,
  setDifficultyId,
} from '../sessionProgress.js';

const CELL = RANGE_TILE_PIXELS;
const GRID_ORIGIN_X = DESIGN_WIDTH / 2 - (GRID_COLS * CELL) / 2 + CELL / 2;
const GRID_ORIGIN_Y = GRID_TOP_Y + CELL / 2;

const CASTLE_HALF = 48;
const REACH_EPSILON = 10;
const ATTACK_FX_DEPTH = 71;

/** @typedef {{ x: number, y: number, gridRow: number, gridCol: number, troopId: string, upgradeLevel: number, fireTime: number, marker?: Phaser.GameObjects.Image, lvlBadge?: Phaser.GameObjects.Text, auraGfx?: Phaser.GameObjects.Arc }} PlacedTroop */

/** @typedef {{ root: Phaser.GameObjects.Container, hp: number, maxHp: number, dist: number, speed: number, baseSpeed: number, hpFg: Phaser.GameObjects.Rectangle, hpBg: Phaser.GameObjects.Rectangle, enemyId: string, castleLeak: number, frostTint?: Phaser.GameObjects.Arc }} Enemy */

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    /** @type {string | null} */
    this.mapId = null;
    /** @type {import('../data/difficulty.js').DifficultyDef} */
    this.difficulty = getDifficultyById('easy');
    /** @type {Phaser.GameObjects.Text | null} */
    this.starText = null;
    /** @type {Phaser.GameObjects.Text | null} */
    this.heartsText = null;
    /** @type {Phaser.GameObjects.Text | null} */
    this.waveText = null;
    /** @type {Phaser.GameObjects.Text | null} */
    this.diamondText = null;
    /** @type {Phaser.GameObjects.Text | null} */
    this.toastText = null;
    /** @type {ReturnType<typeof getPowerUpBonuses>} */
    this.powerBonuses = getPowerUpBonuses({});
    this.heartsMax = STARTING_HEARTS;
    this.stars = STARTING_STARS;
    this.hearts = STARTING_HEARTS;
    this.gameOver = false;
    /** @type {string | null} */
    this.selectedTroopId = null;
    /** @type {(Phaser.GameObjects.Container | null)[][]} */
    this.gridCells = [];
    /** @type {Phaser.GameObjects.Container[]} */
    this.troopButtons = [];
    /** @type {Phaser.Time.TimerEvent | null} */
    this.toastTimer = null;
    /** @type {Phaser.Time.TimerEvent | null} */
    this.spawnTimer = null;

    /** @type {number} */
    this.waveIndex = 1;
    /** @type {string[]} */
    this.waveQueue = [];
    /** @type {number} */
    this.waveSpawnIdx = 0;
    /** @type {boolean} */
    this.allWaveSpawned = false;
    /** @type {boolean} */
    this.betweenWavesCooldown = false;
    /** @type {ReturnType<typeof buildPathMeta> | null} */
    this.pathMeta = null;
    /** @type {Enemy[]} */
    this.enemies = [];
    /** @type {PlacedTroop[]} */
    this.placedTroops = [];
    /** @type {Phaser.GameObjects.Container | null} */
    this.gameOverOverlay = null;
    /** @type {Phaser.GameObjects.Container | null} */
    this.defenderActionPanel = null;
    /** @type {Phaser.GameObjects.Container | null} */
    this.enemyInspectPanel = null;
    /** Increments extra tankers on every multiple-of-5 wave; doubles each multiple-of-10 wave before inject */
    this.tankerInjectMultiplier = 1;
  }

  init(data) {
    this.mapId = data?.mapId ?? null;
    if (data?.difficultyId) {
      setDifficultyId(this.registry, data.difficultyId);
    }
    this.difficulty = getDifficultyById(data?.difficultyId ?? getDifficultyId(this.registry));
    this.stars = STARTING_STARS;
    this.hearts = STARTING_HEARTS;
    this.gameOver = false;
    this.selectedTroopId = null;
    this.gridCells = [];
    this.troopButtons = [];
    this.spawnTimer?.remove(false);
    this.spawnTimer = null;
    this.toastTimer?.remove(false);
    this.toastTimer = null;
    this.pathMeta = null;
    this.enemies = [];
    this.placedTroops = [];
    this.starText = null;
    this.heartsText = null;
    this.waveText = null;
    this.diamondText = null;
    this.toastText = null;
    this.powerBonuses = getPowerUpBonuses({});
    this.heartsMax = STARTING_HEARTS;
    this.gameOverOverlay?.destroy(true);
    this.gameOverOverlay = null;
    this.defenderActionPanel?.destroy(true);
    this.defenderActionPanel = null;
    this.enemyInspectPanel?.destroy(true);
    this.enemyInspectPanel = null;
    this.waveIndex = 1;
    this.waveQueue = [];
    this.waveSpawnIdx = 0;
    this.allWaveSpawned = false;
    this.betweenWavesCooldown = false;
    this.tankerInjectMultiplier = 1;
  }

  shutdown() {
    this.spawnTimer?.remove(false);
    this.spawnTimer = null;
  }

  create() {
    ensureSessionDefaults(this.registry);
    this.powerBonuses = getPowerUpBonuses(getPowerUpLevels(this.registry));
    this.heartsMax = STARTING_HEARTS + (this.powerBonuses.castleHpBonus ?? 0);
    this.hearts = this.heartsMax;
    this.stars = STARTING_STARS;

    const map = getMapById(this.mapId);
    this.pathMeta = buildPathMeta(map.path);

    this.add.rectangle(DESIGN_WIDTH / 2, DESIGN_HEIGHT / 2, DESIGN_WIDTH, DESIGN_HEIGHT, 0x101018);

    const pathStartY = map.path[0].y;
    const pathEndY = map.path[map.path.length - 1].y;
    const gridBottom = GRID_ORIGIN_Y + (GRID_ROWS - 1) * CELL + CELL / 2;
    const fieldTop = Math.min(GRID_TOP_Y - 20, pathStartY - 48);
    const fieldBottom = Math.max(gridBottom + 32, pathEndY + 88);
    const fieldH = fieldBottom - fieldTop;
    const fieldCy = (fieldTop + fieldBottom) / 2;

    this.drawMapTerrain(map, fieldTop, fieldBottom, fieldCy, fieldH);

    this.add
      .rectangle(DESIGN_WIDTH / 2, fieldCy, DESIGN_WIDTH - 40, fieldH, map.groundTint, 0.88)
      .setStrokeStyle(4, map.id === 'space' ? 0x7c4dff : 0x000000, map.id === 'space' ? 0.35 : 0.22);

    this.scatterMapDecorations(map, fieldTop, fieldBottom);
    this.drawTrail(map);
    this.drawPathSpawnMarker(map.path[0]);

    this.add
      .text(DESIGN_WIDTH / 2, 40, map.name, {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '30px',
        color: '#ffffff',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)
      .setDepth(40);

    this.add
      .text(DESIGN_WIDTH / 2, 72, `${this.difficulty.label} — HP ×${this.difficulty.hpMult}  Speed ×${this.difficulty.speedMult}  Leak ×${this.difficulty.castleDamageMult}`, {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '16px',
        color: '#b0bec5',
      })
      .setOrigin(0.5)
      .setDepth(40);

    this.heartsText = this.add
      .text(DESIGN_WIDTH / 2, 98, this.heartsLabel(), {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '26px',
        color: '#ff8a80',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)
      .setDepth(40);

    this.starText = this.add
      .text(DESIGN_WIDTH / 2, 132, this.starsLabel(), {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '24px',
        color: '#ffe082',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)
      .setDepth(40);

    this.diamondText = this.add
      .text(DESIGN_WIDTH / 2, 164, this.diamondsLabel(), {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '20px',
        color: '#80deea',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)
      .setDepth(40);

    this.waveText = this.add
      .text(DESIGN_WIDTH - 32, 64, this.waveLabel(), {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '24px',
        color: '#b39ddb',
        fontStyle: 'bold',
      })
      .setOrigin(1, 0.5)
      .setDepth(40);

    this.add
      .text(DESIGN_WIDTH / 2, 196, 'Menu: codex & power-ups. +10 💎 every 10 waves. Tap troops to upgrade/sell.', {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '16px',
        color: '#b6b8c9',
        wordWrap: { width: DESIGN_WIDTH - 48 },
        align: 'center',
      })
      .setOrigin(0.5)
      .setDepth(40);

    this.makeBackButton();
    this.buildGrid(map.path);
    this.drawCastle(map.path[map.path.length - 1]);
    this.buildShop();
    this.refreshShopAffordability();

    this.waveIndex = 1;
    this.tankerInjectMultiplier = 1;
    this.waveQueue = this.buildWaveQueueFor(this.waveIndex);
    this.waveSpawnIdx = 0;
    this.allWaveSpawned = false;
    this.betweenWavesCooldown = false;

    this.spawnTimer = this.time.addEvent({
      delay: WAVE_SPAWN_GAP_MS,
      loop: true,
      callback: () => this.advanceWaveSpawnTick(),
      callbackScope: this,
    });
    this.advanceWaveSpawnTick();

    this.events.on(Phaser.Scenes.Events.RESUME, this.onSceneResume, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.events.off(Phaser.Scenes.Events.RESUME, this.onSceneResume, this);
      this.shutdown();
    }, this);
  }

  onSceneResume() {
    this.powerBonuses = getPowerUpBonuses(getPowerUpLevels(this.registry));
    this.refreshDiamondHud();
  }

  waveLabel() {
    return `Wave ${this.waveIndex}`;
  }

  /**
   * @param {number} waveIdx
   * @returns {string[]}
   */
  buildWaveQueueFor(waveIdx) {
    /** @type {string[]} */
    const q = [...buildWaveComposition(waveIdx)];
    if (waveIdx >= 10 && waveIdx % 10 === 0) {
      this.tankerInjectMultiplier *= 2;
    }
    if (waveIdx >= 5 && waveIdx % 5 === 0) {
      for (let i = 0; i < this.tankerInjectMultiplier; i += 1) {
        q.push('tanker');
      }
    }
    shuffleInPlace(q);
    return q;
  }

  heartsLabel() {
    return `Castle ${this.hearts}/${this.heartsMax} HP`;
  }

  starsLabel() {
    return `Stars ${this.stars}`;
  }

  diamondsLabel() {
    return `Diamonds ${getDiamonds(this.registry)}`;
  }

  refreshDiamondHud() {
    if (this.diamondText) {
      this.diamondText.setText(this.diamondsLabel());
    }
  }

  /**
   * @param {{ id: string }} map
   * @param {number} fieldTop
   * @param {number} fieldBottom
   * @param {number} fieldCy
   * @param {number} fieldH
   */
  drawMapTerrain(map, fieldTop, fieldBottom, fieldCy, fieldH) {
    if (map.id !== 'space') return;

    const gfx = this.add.graphics().setDepth(0);
    const left = 20;
    const right = DESIGN_WIDTH - 20;

    for (let i = 0; i < 140; i += 1) {
      const sx = left + ((i * 73) % (right - left));
      const sy = fieldTop + ((i * 97) % fieldH);
      const bright = i % 4 === 0;
      gfx.fillStyle(bright ? 0xffffff : 0xb39ddb, bright ? 0.55 : 0.28);
      gfx.fillCircle(sx, sy, bright ? 2 : 1);
    }

    gfx.fillStyle(0x4a148c, 0.14);
    gfx.fillEllipse(DESIGN_WIDTH / 2 - 120, fieldCy - 60, 300, 200);
    gfx.fillStyle(0x1565c0, 0.1);
    gfx.fillEllipse(DESIGN_WIDTH / 2 + 140, fieldCy + 40, 260, 160);

    gfx.lineStyle(1, 0x3949ab, 0.22);
    for (let y = fieldTop + 36; y < fieldBottom; y += 52) {
      gfx.lineBetween(left + 8, y, right - 8, y);
    }
    for (let x = 80; x < DESIGN_WIDTH; x += 96) {
      gfx.lineBetween(x, fieldTop + 12, x, fieldBottom - 12);
    }

    gfx.lineStyle(2, 0x7c4dff, 0.2);
    gfx.strokeRect(left, fieldTop + 4, right - left, fieldH - 8);
  }

  /**
   * Trees, rocks, cacti, etc. — only on open terrain (not trail or build grid).
   * @param {{ id: string, path: { x: number, y: number }[] }} map
   * @param {number} fieldTop
   * @param {number} fieldBottom
   */
  scatterMapDecorations(map, fieldTop, fieldBottom) {
    const placements = buildDecorationPlacements(map.id, fieldTop, fieldBottom, map.path);
    for (const p of placements) {
      const img = this.add
        .image(p.x, p.y, p.key)
        .setOrigin(0.5, p.originY)
        .setScale(p.scale)
        .setDepth(p.depth)
        .setFlipX(p.flipX);
      img.setAlpha(0.94);
    }
  }

  /**
   * @param {{ trailTint: number, path: { x: number, y: number }[] }} map
   */
  drawTrail(map) {
    const gfx = this.add.graphics().setDepth(2);
    const thickness = 40;
    const pts = map.path;

    if (map.id === 'space') {
      gfx.lineStyle(thickness + 18, 0x7c4dff, 0.22);
      gfx.beginPath();
      gfx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i += 1) {
        gfx.lineTo(pts[i].x, pts[i].y);
      }
      gfx.strokePath();
      gfx.lineStyle(thickness + 8, 0x18ffff, 0.3);
      gfx.beginPath();
      gfx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i += 1) {
        gfx.lineTo(pts[i].x, pts[i].y);
      }
      gfx.strokePath();
    }

    gfx.lineStyle(thickness, map.trailTint, 0.95);
    gfx.beginPath();
    gfx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i += 1) {
      gfx.lineTo(pts[i].x, pts[i].y);
    }
    gfx.strokePath();

    gfx.lineStyle(6, 0xffffff, 0.12);
    gfx.beginPath();
    gfx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i += 1) {
      gfx.lineTo(pts[i].x, pts[i].y);
    }
    gfx.strokePath();
  }

  /**
   * @param {{ x: number, y: number }} spawnPoint
   */
  drawPathSpawnMarker(spawnPoint) {
    const { x, y } = spawnPoint;
    const map = getMapById(this.mapId);
    const spawnFill = map?.id === 'space' ? 0x18ffff : 0x81c784;
    this.add.circle(x, y, 14, spawnFill, 0.55).setStrokeStyle(3, 0xffffff, 0.7).setDepth(3);
    this.add
      .text(x, y - 28, 'Spawn', {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '14px',
        color: '#e8f5e9',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)
      .setDepth(3);
  }

  /**
   * @param {{ x: number, y: number }} castlePoint
   */
  drawCastle(castlePoint) {
    const { x, y } = castlePoint;
    const c = this.add.container(x, y).setDepth(9);

    const base = this.add.rectangle(0, 12, CASTLE_HALF * 2 + 46, CASTLE_HALF * 2, 0x5c4033).setStrokeStyle(4, 0xf3e8d8, 0.95);
    const roof = this.add.triangle(0, -18, 0, -46, -40, 18, 40, 18, 0x8d6e63);
    roof.setStrokeStyle(3, 0xfbe9e7, 0.95);
    const door = this.add.rectangle(0, 42, 32, 40, 0x4e342e);
    const flag = this.add.rectangle(-26, -30, 6, 40, 0xe53935).setStrokeStyle(1, 0xffffff, 0.6);

    c.add([base, door, roof, flag]);

    this.add.circle(x, y + 72, 6, 0xf48fb1, 0.35).setDepth(9);
    this.add
      .text(x, y + 96, 'Castle', {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '16px',
        color: '#f5f5f7',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)
      .setDepth(9);
  }

  makeBackButton() {
    const padX = 28;
    const padY = 44;
    const mkBtn = (x, label, onTap) => {
      const btn = this.add.container(x, padY).setDepth(41);
      const bg = this.add.rectangle(0, 0, 132, 56, 0x3949ab, 0.95).setStrokeStyle(2, 0xffffff, 0.2);
      const t = this.add
        .text(0, 0, label, {
          fontFamily: 'system-ui,Segoe UI,sans-serif',
          fontSize: '20px',
          color: '#ffffff',
          fontStyle: 'bold',
        })
        .setOrigin(0.5);
      const hit = this.add.rectangle(0, 0, 132, 56, 0x000000, 0.001).setInteractive({ useHandCursor: true });
      hit.on('pointerup', onTap);
      btn.add([bg, t, hit]);
    };

    mkBtn(padX + 66, 'Maps', () => {
      if (this.gameOver) return;
      this.scene.start('MapSelectScene');
    });
    mkBtn(padX + 210, 'Menu', () => {
      if (this.gameOver) return;
      this.scene.pause();
      this.scene.launch('MenuScene', {
        returnScene: 'GameScene',
        returnData: { mapId: this.mapId, difficultyId: this.difficulty.id },
      });
    });
  }

  /**
   * @param {{ x: number, y: number }[]} pathPoints
   */
  buildGrid(pathPoints) {
    for (let row = 0; row < GRID_ROWS; row += 1) {
      this.gridCells[row] = [];
      for (let col = 0; col < GRID_COLS; col += 1) {
        const cx = GRID_ORIGIN_X + col * CELL;
        const cy = GRID_ORIGIN_Y + row * CELL;

        const dist = pointToPathDist(cx, cy, pathPoints);
        const buildable = dist >= MIN_BUILD_DISTANCE_FROM_PATH;

        const cell = this.add.container(cx, cy).setDepth(6);
        const base = this.add
          .rectangle(0, 0, CELL - 10, CELL - 10, 0xffffff, buildable ? 0.09 : 0.03)
          .setStrokeStyle(2, 0x000000, buildable ? 0.22 : 0.12);
        const hit = this.add.rectangle(0, 0, CELL - 4, CELL - 4, 0x000000, 0.001);

        hit.setInteractive({ useHandCursor: true });
        hit.on(
          'pointerup',
          buildable ? () => this.onCellClick(row, col) : () => this.flashToast('Too close to the trail'),
        );

        cell.add([base, hit]);
        cell.setData('occupied', false);
        cell.setData('base', base);
        cell.setData('buildable', buildable);
        this.gridCells[row][col] = cell;
      }
    }
  }

  buildShop() {
    const cols = 4;
    const panelW = 168;
    const panelH = 132;
    const gapX = 10;
    const gapY = 12;
    const rowTop = DESIGN_HEIGHT - SHOP_ROW_FROM_BOTTOM;
    const padX = 10;
    const headerH = 30;
    const top = -panelH / 2;

    const totalRowW = cols * panelW + (cols - 1) * gapX;
    const startX = DESIGN_WIDTH / 2 - totalRowW / 2 + panelW / 2;

    TROOPS.forEach((troop, i) => {
      const rowIdx = Math.floor(i / cols);
      const colIdx = i % cols;
      const x = startX + colIdx * (panelW + gapX);
      const y = rowTop + rowIdx * (panelH + gapY);

      const outer = this.add.container(x, y).setDepth(35);
      const panel = this.add.rectangle(0, 0, panelW, panelH, 0x3d3d5c, 0.95).setStrokeStyle(3, 0xffffff, 0.2);

      const headerBar = this.add.rectangle(0, top + headerH / 2 + 2, panelW - 8, headerH, 0x2a2a42, 1);

      const name = this.add
        .text(-panelW / 2 + padX, top + 7, troop.name, {
          fontFamily: 'system-ui,Segoe UI,sans-serif',
          fontSize: troop.name.length > 11 ? '13px' : '15px',
          color: '#ffffff',
          fontStyle: 'bold',
          wordWrap: { width: panelW - 58 },
          align: 'left',
        })
        .setOrigin(0, 0);

      const costPill = this.add
        .rectangle(panelW / 2 - padX - 22, top + headerH / 2 + 2, 44, 22, 0x4a3c18, 1)
        .setStrokeStyle(1, 0xffe082, 0.5);
      const cost = this.add
        .text(panelW / 2 - padX - 4, top + headerH / 2 + 2, `${troop.starCost}★`, {
          fontFamily: 'system-ui,Segoe UI,sans-serif',
          fontSize: '14px',
          color: '#ffe082',
          fontStyle: 'bold',
        })
        .setOrigin(1, 0.5);

      const statsTop = top + headerH + 8;
      const stats = this.add
        .text(-panelW / 2 + padX, statsTop, formatTroopShopStats(troop), {
          fontFamily: 'system-ui,Segoe UI,sans-serif',
          fontSize: '11px',
          color: '#d5d6e8',
          lineSpacing: 4,
          wordWrap: { width: panelW - padX * 2 - 44 },
          align: 'left',
        })
        .setOrigin(0, 0);

      const iconY = panelH / 2 - 28;
      const swatchBg = this.add
        .circle(panelW / 2 - 28, iconY, 18, troop.tint, 0.25)
        .setStrokeStyle(2, 0xffffff, 0.35);
      const swatchIcon = this.add
        .image(panelW / 2 - 28, iconY, getTroopSpriteKey(troop.id))
        .setDisplaySize(32, 32)
        .setOrigin(0.5);

      const hit = this.add.rectangle(0, 0, panelW, panelH + 6, 0x000000, 0.001).setInteractive({ useHandCursor: true });
      hit.on('pointerup', () => this.selectTroop(troop.id));

      outer.add([panel, headerBar, name, costPill, cost, stats, swatchBg, swatchIcon, hit]);
      outer.setData('troopId', troop.id);

      this.troopButtons.push(outer);
    });

    this.add
      .text(DESIGN_WIDTH / 2, rowTop - 38, 'Troops — stats show damage, range & attack speed', {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '18px',
        color: '#a8a9b8',
      })
      .setOrigin(0.5)
      .setDepth(35);
  }

  selectTroop(troopId) {
    if (this.gameOver) return;
    const troop = TROOPS.find((t) => t.id === troopId);
    if (!troop) return;

    if (this.stars < troop.starCost) {
      this.flashToast('Not enough stars');
      return;
    }

    this.selectedTroopId = troopId;
    this.refreshShopAffordability();
  }

  refreshShopAffordability() {
    this.troopButtons.forEach((row) => {
      const id = row.getData('troopId');
      const troop = TROOPS.find((t) => t.id === id);
      if (!troop) return;

      const affordable = this.stars >= troop.starCost;
      const selected = this.selectedTroopId === id;
      row.setAlpha(this.gameOver ? 0.35 : affordable ? 1 : 0.45);

      const panel = row.list[0];
      if (panel && typeof panel.setStrokeStyle === 'function') {
        if (selected) {
          panel.setStrokeStyle(4, 0xffe082, 0.95);
        } else {
          panel.setStrokeStyle(3, 0xffffff, 0.2);
        }
      }
    });
  }

  onCellClick(row, col) {
    if (this.gameOver) return;
    const cell = this.gridCells[row][col];
    if (!cell || !cell.getData('buildable')) {
      this.flashToast('Too close to the trail');
      return;
    }
    if (cell.getData('occupied')) {
      this.openDefenderActionPanel(row, col);
      return;
    }

    if (!this.selectedTroopId) {
      this.flashToast('Pick a troop first');
      return;
    }

    const troop = TROOPS.find((t) => t.id === this.selectedTroopId);
    if (!troop || this.stars < troop.starCost) {
      this.flashToast("Can't afford that troop");
      this.selectedTroopId = null;
      this.refreshShopAffordability();
      return;
    }

    this.stars -= troop.starCost;
    if (this.starText) {
      this.starText.setText(this.starsLabel());
    }

    const marker = this.add
      .image(0, 0, getTroopSpriteKey(troop.id))
      .setDisplaySize(54, 54)
      .setOrigin(0.5);
    const lvlBadge = this.add
      .text(0, 38, 'Lv 1', {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '14px',
        color: '#f5f5f9',
        fontStyle: 'bold',
        stroke: '#1a1030',
        strokeThickness: 3,
      })
      .setOrigin(0.5);

    cell.addAt(marker, 1);
    cell.addAt(lvlBadge, 2);

    cell.setData('occupied', true);
    const base = cell.getData('base');
    if (base) {
      base.setFillStyle(0xffffff, 0.04);
    }

    /** @type {PlacedTroop} */
    const placed = {
      x: cell.x,
      y: cell.y,
      gridRow: row,
      gridCol: col,
      troopId: troop.id,
      upgradeLevel: 0,
      fireTime: 0,
      marker,
      lvlBadge,
    };

    if (troop.auraSlowMult != null && troop.auraSlowMult < 1) {
      const auraTiles = troop.auraSlowRangeTiles ?? 2;
      const auraRadius = auraTiles * CELL * 0.5;
      const frostColor = troop.id === 'abominable_snowman' ? 0x81d4fa : 0xb3e5fc;
      placed.auraGfx = this.add
        .circle(cell.x, cell.y, auraRadius, frostColor, 0.08)
        .setStrokeStyle(3, frostColor, 0.4)
        .setDepth(7);
      this.tweens.add({
        targets: placed.auraGfx,
        alpha: { from: 0.32, to: 0.1 },
        scale: { from: 0.94, to: 1.06 },
        duration: 1400,
        yoyo: true,
        repeat: -1,
      });
    }

    this.placedTroops.push(placed);

    this.selectedTroopId = null;
    this.refreshShopAffordability();
    if (troop.auraSlowMult != null && troop.auraSlowMult < 1) {
      const pct = Math.round((1 - troop.auraSlowMult) * 100);
      const rng = troop.auraSlowRangeTiles ?? 2;
      this.flashToast(`${troop.name} — ${pct}% slow within ${rng} tiles`);
    } else {
      this.flashToast(`${troop.name} placed`);
    }
  }

  /**
   * @param {number} row
   * @param {number} col
   */
  tryUpgradeDefender(row, col) {
    const slot = this.placedTroops.find((s) => s.gridRow === row && s.gridCol === col);
    if (!slot) {
      this.flashToast('Tap an empty tile to deploy');
      return;
    }

    this.selectedTroopId = null;
    this.refreshShopAffordability();

    const baseTroop = TROOPS.find((t) => t.id === slot.troopId);
    if (!baseTroop) return;

    const ul = slot.upgradeLevel ?? 0;
    if (ul >= MAX_TROOP_UPGRADE_LEVEL) {
      this.flashToast('Troop is fully upgraded!');
      return;
    }

    const cost = getUpgradeStarsCost(baseTroop.starCost, ul);
    if (this.stars < cost) {
      this.flashToast(`Upgrade needs ${cost} ★ (${ul + 1} → ${ul + 2})`);
      return;
    }

    this.stars -= cost;
    if (this.starText) {
      this.starText.setText(this.starsLabel());
    }
    slot.upgradeLevel = ul + 1;

    if (slot.lvlBadge) {
      slot.lvlBadge.setText(`Lv ${slot.upgradeLevel + 1}`);
    }

    this.refreshShopAffordability();
    this.flashToast(`${baseTroop.name} tier ${slot.upgradeLevel + 1} (${cost}★)`);
  }

  closeDefenderActionPanel() {
    if (this.defenderActionPanel) {
      this.defenderActionPanel.destroy(true);
      this.defenderActionPanel = null;
    }
  }

  closeEnemyInspectPanel() {
    if (this.enemyInspectPanel) {
      this.enemyInspectPanel.destroy(true);
      this.enemyInspectPanel = null;
    }
  }

  /**
   * @param {number} row
   * @param {number} col
   */
  openDefenderActionPanel(row, col) {
    if (this.gameOver) return;

    this.selectedTroopId = null;
    this.refreshShopAffordability();
    this.closeEnemyInspectPanel();
    this.closeDefenderActionPanel();

    const slot = this.placedTroops.find((s) => s.gridRow === row && s.gridCol === col);
    if (!slot) {
      this.flashToast('Tap an empty tile to deploy');
      return;
    }

    const baseTroop = TROOPS.find((t) => t.id === slot.troopId);
    if (!baseTroop) return;

    const ul = slot.upgradeLevel ?? 0;
    const refund = getSellRefundStars(baseTroop.starCost, ul);
    const canUpgrade = ul < MAX_TROOP_UPGRADE_LEVEL;
    const nextCost = canUpgrade ? getUpgradeStarsCost(baseTroop.starCost, ul) : 0;

    const root = this.add.container(0, 0).setDepth(135);
    this.defenderActionPanel = root;

    const shade = this.add
      .rectangle(DESIGN_WIDTH / 2, DESIGN_HEIGHT / 2, DESIGN_WIDTH + 160, DESIGN_HEIGHT + 400, 0x04040a, 0.52)
      .setInteractive();
    shade.on('pointerup', () => this.closeDefenderActionPanel());

    const cx = DESIGN_WIDTH / 2;
    const cy = DESIGN_HEIGHT / 2 - 36;
    const card = this.add.rectangle(cx, cy, 438, 292, 0x252838, 0.97).setStrokeStyle(3, 0xffffff, 0.22);

    const title = this.add
      .text(cx, cy - 102, `${baseTroop.name} · Lv ${ul + 1}`, {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '28px',
        color: '#ffffff',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    const totalSpent = getTotalStarsInvested(baseTroop.starCost, ul);
    const investedLine = this.add
      .text(cx, cy - 58, `Spent ${totalSpent} ★ total · sell for ${refund} ★ (half)`, {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '17px',
        color: '#c5c6d8',
        align: 'center',
        wordWrap: { width: 400 },
      })
      .setOrigin(0.5);

    const upLabel = canUpgrade ? `Upgrade (${nextCost}★)` : 'Max tier';
    const upTint = canUpgrade ? 0x3949ab : 0x4a4a68;
    const upgradeBtn = this.makePanelTapButton(cx - 110, cy + 32, 208, 56, upLabel, upTint, () => {
      this.closeDefenderActionPanel();
      if (canUpgrade) {
        this.tryUpgradeDefender(row, col);
      } else {
        this.flashToast('Troop is fully upgraded');
      }
    });

    const sellBtn = this.makePanelTapButton(cx + 110, cy + 32, 208, 56, `Sell +${refund}★`, 0xb71c1c, () => {
      this.closeDefenderActionPanel();
      this.sellDefenderAt(row, col);
    });

    const hint = this.add
      .text(cx, cy + 102, 'Tap dim area to close', {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '15px',
        color: '#8588a0',
      })
      .setOrigin(0.5);

    root.add([shade, card, title, investedLine, upgradeBtn, sellBtn, hint]);
  }

  /**
   * @param {number} cx
   * @param {number} cy
   * @param {number} w
   * @param {number} h
   * @param {string} label
   * @param {number} fillColor
   * @param {() => void} onClick
   */
  makePanelTapButton(cx, cy, w, h, label, fillColor, onClick) {
    const btn = this.add.container(cx, cy);
    const bg = this.add.rectangle(0, 0, w, h, fillColor, 1).setStrokeStyle(2, 0xffffff, 0.28);
    const txt = this.add
      .text(0, 0, label, {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '18px',
        color: '#ffffff',
        fontStyle: 'bold',
        align: 'center',
        wordWrap: { width: w - 12 },
      })
      .setOrigin(0.5);
    const hit = this.add.rectangle(0, 0, w, h + 10, 0x000000, 0.001).setInteractive({ useHandCursor: true });
    hit.on('pointerup', (pointer) => {
      if (pointer?.event && typeof pointer.event.stopPropagation === 'function') {
        pointer.event.stopPropagation();
      }
      onClick();
    });
    btn.add([bg, txt, hit]);
    return btn;
  }

  /**
   * @param {number} row
   * @param {number} col
   */
  sellDefenderAt(row, col) {
    if (this.gameOver) return;

    const slot = this.placedTroops.find((s) => s.gridRow === row && s.gridCol === col);
    if (!slot) return;

    const baseTroop = TROOPS.find((t) => t.id === slot.troopId);
    if (!baseTroop) return;

    const refund = getSellRefundStars(baseTroop.starCost, slot.upgradeLevel ?? 0);
    const cell = this.gridCells[row][col];

    slot.marker?.destroy();
    slot.lvlBadge?.destroy();
    slot.auraGfx?.destroy();

    const idx = this.placedTroops.indexOf(slot);
    if (idx >= 0) {
      this.placedTroops.splice(idx, 1);
    }

    cell.setData('occupied', false);
    const baseRect = cell.getData('base');
    if (baseRect && typeof baseRect.setFillStyle === 'function') {
      baseRect.setFillStyle(0xffffff, 0.09);
    }

    this.stars += refund;
    if (this.starText) {
      this.starText.setText(this.starsLabel());
    }
    this.refreshShopAffordability();
    this.flashToast(`Sold · +${refund} ★`);
  }

  /** @param {Enemy} enemy */
  showEnemyInspect(enemy) {
    if (this.gameOver) return;

    this.closeEnemyInspectPanel();
    this.closeDefenderActionPanel();

    const def = getEnemyDef(enemy.enemyId);
    const name = def.displayName ?? def.id;
    const body = formatEnemyRuntimeInspect(enemy);

    const root = this.add.container(0, 0).setDepth(136);
    this.enemyInspectPanel = root;

    const shade = this.add
      .rectangle(DESIGN_WIDTH / 2, DESIGN_HEIGHT / 2, DESIGN_WIDTH + 160, DESIGN_HEIGHT + 400, 0x04040a, 0.45)
      .setInteractive();
    shade.on('pointerup', () => this.closeEnemyInspectPanel());

    const cx = DESIGN_WIDTH / 2;
    const cy = 300;
    const card = this.add.rectangle(cx, cy, 410, 246, 0x321b1b, 0.96).setStrokeStyle(3, 0xff8a80, 0.35);

    const eTitle = this.add
      .text(cx, cy - 82, name, {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '32px',
        color: '#ffccbc',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    const stats = this.add
      .text(cx, cy + 12, body, {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '17px',
        color: '#f2f2f7',
        align: 'left',
        lineSpacing: 5,
      })
      .setOrigin(0.5);

    const hint = this.add
      .text(cx, cy + 118, 'Tap outside to close', {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '15px',
        color: '#a1887f',
      })
      .setOrigin(0.5);

    root.add([shade, card, eTitle, stats, hint]);
  }

  advanceWaveSpawnTick() {
    if (this.gameOver || !this.pathMeta) return;
    if (this.betweenWavesCooldown) return;

    if (this.waveSpawnIdx >= this.waveQueue.length) {
      return;
    }

    const enemyId = this.waveQueue[this.waveSpawnIdx];
    this.waveSpawnIdx += 1;

    this.spawnEnemyOfType(enemyId);

    if (this.waveSpawnIdx >= this.waveQueue.length) {
      this.allWaveSpawned = true;
      if (this.spawnTimer) {
        this.spawnTimer.paused = true;
      }
      this.evaluateWaveProgress();
    }
  }

  /**
   * @param {string} enemyId
   * @param {number} [startDist]
   */
  spawnEnemyOfType(enemyId, startDist) {
    if (this.gameOver || !this.pathMeta) return;

    const def = getEnemyDef(enemyId);
    const scaled = scaleEnemyStatsForDifficulty(def, this.difficulty);
    const meta = this.pathMeta;
    const clampedUpper = meta.totalLength - REACH_EPSILON - 0.1;
    const raw = typeof startDist === 'number' && !Number.isNaN(startDist) ? startDist : 0;
    const distAlong = Math.max(0, Math.min(clampedUpper, raw));

    const pos = getPointAtDistance(meta, distAlong);
    const root = this.add.container(pos.x, pos.y).setDepth(8);

    const body = this.add.circle(0, 0, def.radius, def.tint).setStrokeStyle(def.strokeWidth, def.stroke, 0.95);
    const eyeScale = def.radius / 17;
    const eyeL = this.add.circle(Math.round(-6 * eyeScale), Math.round(-3 * eyeScale), Math.max(2, Math.round(3 * eyeScale)), 0x2b0b0b);
    const eyeR = this.add.circle(Math.round(6 * eyeScale), Math.round(-3 * eyeScale), Math.max(2, Math.round(3 * eyeScale)), 0x2b0b0b);

    const barW = Math.min(54, Math.round(38 + def.radius));
    const barH = 6;
    const barLift = Math.round(def.radius + 14);
    const hpBg = this.add.rectangle(0, -barLift, barW, barH, 0x000000, 0.55).setStrokeStyle(1, 0xffffff, 0.2);
    const innerW = barW - 4;
    const hpFg = this.add.rectangle(-innerW / 2, -barLift, innerW, barH - 2, 0x66bb6a).setOrigin(0, 0.5);

    root.add([body, eyeL, eyeR, hpBg, hpFg]);

    root.setRotation(pos.angle + Math.PI / 2);

    const enemy = {
      root,
      hp: scaled.hp,
      maxHp: scaled.maxHp,
      dist: distAlong,
      hpFg,
      hpBg,
      speed: scaled.speed,
      baseSpeed: scaled.speed,
      enemyId: def.id,
      castleLeak: scaled.castleLeak,
    };
    this.enemies.push(enemy);

    const hitR = def.radius + 14;
    root.setInteractive(new Phaser.Geom.Circle(0, 0, hitR), Phaser.Geom.Circle.Contains);
    root.input.cursor = 'pointer';
    root.on('pointerdown', (_pointer, _lx, _ly, event) => {
      if (event && typeof event.stopPropagation === 'function') {
        event.stopPropagation();
      }
      this.showEnemyInspect(enemy);
    });
  }

  /**
   * Bigger foes fracture into smaller tiers along the trail when killed by damage (not leaks).
   * @param {Enemy} victim
   */
  spawnSplitChildren(victim) {
    const rules = getSplitDeathRules(victim.enemyId);
    if (!rules.length) return;

    let slot = 0;
    const baseDist = victim.dist;
    for (const rule of rules) {
      for (let c = 0; c < rule.count; c += 1) {
        const jitter = -(6 + slot * 9);
        slot += 1;
        const nextDist = baseDist + jitter;
        this.spawnEnemyOfType(rule.spawnId, nextDist);
      }
    }
  }

  evaluateWaveProgress() {
    if (this.gameOver) return;
    if (!this.allWaveSpawned) return;
    if (this.betweenWavesCooldown) return;
    if (this.enemies.length > 0) return;

    this.beginWaveIntermission();
  }

  beginWaveIntermission() {
    if (this.betweenWavesCooldown) return;

    const clearedWave = this.waveIndex;
    this.betweenWavesCooldown = true;
    if (this.spawnTimer) {
      this.spawnTimer.paused = true;
    }

    const bonusStars = this.powerBonuses.bonusStarsPerWave ?? 0;
    const starsGain = STARS_PER_WAVE_CLEARED + bonusStars;
    this.stars += starsGain;
    if (this.starText) {
      this.starText.setText(this.starsLabel());
    }

    let toast = `Wave ${clearedWave} cleared — +${starsGain} ★`;
    if (clearedWave > 0 && clearedWave % 10 === 0) {
      addDiamonds(this.registry, DIAMONDS_PER_10_WAVES);
      this.refreshDiamondHud();
      toast += ` · +${DIAMONDS_PER_10_WAVES} 💎`;
    }
    this.refreshShopAffordability();
    this.flashToast(toast);

    this.time.delayedCall(BETWEEN_WAVE_PAUSE_MS, () => {
      if (!this.sys || !this.scene) return;

      this.betweenWavesCooldown = false;
      this.waveIndex += 1;
      if (this.waveText) {
        this.waveText.setText(this.waveLabel());
      }

      this.waveQueue = this.buildWaveQueueFor(this.waveIndex);
      this.waveSpawnIdx = 0;
      this.allWaveSpawned = false;

      if (this.spawnTimer) {
        this.spawnTimer.paused = false;
      }

      if (!this.gameOver) {
        this.advanceWaveSpawnTick();
      }
    });
  }

  /**
   * @param {Enemy} enemy
   * @param {number} amount
   */
  applyDamageToEnemy(enemy, amount) {
    enemy.hp -= amount;
    if (enemy.hpFg && enemy.hpBg) {
      const ratio = Math.max(0, enemy.hp / enemy.maxHp);
      const maxInner = enemy.hpBg.width - 4;
      enemy.hpFg.width = Math.max(0.0001, maxInner * ratio);
    }
    this.tweens.add({
      targets: enemy.root,
      scaleX: 1.12,
      scaleY: 1.12,
      duration: 60,
      yoyo: true,
    });
    if (enemy.hp <= 0) {
      this.spawnSplitChildren(enemy);
      this.removeEnemy(enemy);
    }
  }

  /**
   * @param {Enemy} enemy
   * @param {{ skipWaveEval?: boolean }} [opts]
   */
  removeEnemy(enemy, opts) {
    const skipWaveEval = opts?.skipWaveEval === true;
    const idx = this.enemies.indexOf(enemy);
    if (idx >= 0) {
      this.enemies.splice(idx, 1);
    }
    enemy.root.destroy(true);
    if (!skipWaveEval) {
      this.evaluateWaveProgress();
    }
  }

  /**
   * @param {Enemy} enemy
   */
  enemyReachedCastle(enemy) {
    const leak = Math.max(1, Math.floor(Number(enemy.castleLeak) || 10));
    const kind = enemy.enemyId;

    this.removeEnemy(enemy, { skipWaveEval: true });

    this.hearts -= leak;

    if (this.heartsText) {
      this.heartsText.setText(this.heartsLabel());
    }

    this.flashToast(`Castle hit: −${leak} HP (${kind})`);

    if (this.hearts <= 0) {
      this.hearts = 0;
      if (this.heartsText) {
        this.heartsText.setText(this.heartsLabel());
      }
      this.triggerGameOver();
    }

    this.evaluateWaveProgress();
  }

  triggerGameOver() {
    if (this.gameOver) return;
    this.gameOver = true;
    this.closeDefenderActionPanel();
    this.closeEnemyInspectPanel();
    this.spawnTimer?.remove(false);
    this.spawnTimer = null;
    this.selectedTroopId = null;
    this.refreshShopAffordability();

    const overlay = this.add.container(DESIGN_WIDTH / 2, DESIGN_HEIGHT / 2).setDepth(200);
    const shade = this.add.rectangle(0, 0, DESIGN_WIDTH + 80, DESIGN_HEIGHT + 160, 0x070712, 0.82).setInteractive();
    shade.on('pointerup', () => {});

    const title = this.add
      .text(0, -120, 'Defeat!', {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '52px',
        color: '#ff8a80',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    const sub = this.add
      .text(0, -40, 'The castle was overrun.\nEnemies slipped past your troops.', {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '24px',
        color: '#f1f1f6',
        align: 'center',
      })
      .setOrigin(0.5);

    const retry = this.makeOverlayButton(0, 90, 'Try again', () => {
      this.scene.start('GameScene', { mapId: this.mapId });
    });

    const mapsBtn = this.makeOverlaySecondaryButton(0, 190, 'Map list', () => {
      this.scene.start('MapSelectScene');
    });

    overlay.add([shade, title, sub, retry, mapsBtn]);
    this.gameOverOverlay = overlay;
  }

  /**
   * @param {number} ox
   * @param {number} oy
   * @param {string} label
   * @param {() => void} fn
   */
  makeOverlayButton(ox, oy, label, fn) {
    const btn = this.add.container(ox, oy);
    const bg = this.add.rectangle(0, 0, 320, 82, 0x3949ab, 1).setStrokeStyle(3, 0xffffff, 0.28);
    const text = this.add
      .text(0, 0, label, {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '28px',
        color: '#ffffff',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);
    const hit = this.add.rectangle(0, 0, 320, 92, 0x000000, 0.001).setInteractive({ useHandCursor: true });
    hit.on('pointerup', fn);
    btn.add([bg, text, hit]);
    return btn;
  }

  /**
   * @param {number} ox
   * @param {number} oy
   * @param {string} label
   * @param {() => void} fn
   */
  makeOverlaySecondaryButton(ox, oy, label, fn) {
    const btn = this.add.container(ox, oy);
    const bg = this.add.rectangle(0, 0, 320, 78, 0x2c2f45, 0.95).setStrokeStyle(3, 0xffffff, 0.18);
    const text = this.add
      .text(0, 0, label, {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '26px',
        color: '#f4f6ff',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);
    const hit = this.add.rectangle(0, 0, 320, 88, 0x000000, 0.001).setInteractive({ useHandCursor: true });
    hit.on('pointerup', fn);
    btn.add([bg, text, hit]);
    return btn;
  }

  flashToast(message) {
    if (this.toastTimer) {
      this.toastTimer.remove(false);
      this.toastTimer = null;
    }
    if (this.toastText) {
      this.toastText.destroy();
    }

    this.toastText = this.add
      .text(DESIGN_WIDTH / 2, 218, message, {
        fontFamily: 'system-ui,Segoe UI,sans-serif',
        fontSize: '22px',
        color: '#ffffff',
        backgroundColor: '#00000088',
        padding: { x: 16, y: 8 },
      })
      .setOrigin(0.5)
      .setDepth(140);

    this.toastTimer = this.time.delayedCall(1400, () => {
      if (this.toastText) {
        this.tweens.add({
          targets: this.toastText,
          alpha: 0,
          duration: 220,
          onComplete: () => {
            this.toastText?.destroy();
            this.toastText = null;
          },
        });
      }
      this.toastTimer = null;
    });
  }

  /**
   * @param {number} _time
   * @param {number} delta
   */
  update(_time, delta) {
    if (this.gameOver || !this.pathMeta) return;

    const meta = this.pathMeta;
    const dt = delta / 1000;
    for (let i = this.enemies.length - 1; i >= 0; i -= 1) {
      const enemy = this.enemies[i];
      const slowMult = this.getEnemyAuraSlowMult(enemy);
      const moveSpeed = (enemy.baseSpeed ?? enemy.speed) * slowMult;
      enemy.speed = moveSpeed;
      enemy.dist += moveSpeed * dt;

      const endDist = meta.totalLength;
      if (enemy.dist >= endDist - REACH_EPSILON) {
        this.enemyReachedCastle(enemy);
        continue;
      }

      const pos = getPointAtDistance(meta, enemy.dist);
      enemy.root.setPosition(pos.x, pos.y);
      enemy.root.setRotation(pos.angle + Math.PI / 2);
    }

    this.updateEnemyFrostVisuals();

    const now = this.time.now;
    const aliveEnemies = this.enemies;
    if (!aliveEnemies.length) return;

    for (const slot of this.placedTroops) {
      const def = getEffectiveTroopStats(slot, this.powerBonuses);
      if (!def) continue;
      if (def.damage <= 0) continue;

      if (now - slot.fireTime < def.fireCooldownMs) continue;

      const rangePx = Math.max(2, def.rangeTiles) * RANGE_TILE_PIXELS;
      const best = this.pickCombatTarget(slot, def, aliveEnemies, rangePx);

      if (!best) continue;

      slot.fireTime = now;
      const aim = this.getTroopAimPoint(def, best, slot);
      this.performTroopAttack(slot, def, best, aim.x, aim.y);
    }
  }

  /**
   * Strongest frost aura affecting this enemy (0.75 = 25% slow, 0.25 = 75% slow).
   * @param {Enemy} enemy
   */
  getEnemyAuraSlowMult(enemy) {
    let mult = 1;
    for (const slot of this.placedTroops) {
      const base = TROOPS.find((t) => t.id === slot.troopId);
      if (base?.auraSlowMult == null || base.auraSlowMult >= 1) continue;

      const auraTiles = base.auraSlowRangeTiles ?? 2;
      const auraPx = auraTiles * RANGE_TILE_PIXELS;
      const dx = enemy.root.x - slot.x;
      const dy = enemy.root.y - slot.y;
      if (dx * dx + dy * dy <= auraPx * auraPx) {
        mult = Math.min(mult, base.auraSlowMult);
      }
    }
    return mult;
  }

  updateEnemyFrostVisuals() {
    for (const enemy of this.enemies) {
      const frosted = this.getEnemyAuraSlowMult(enemy) < 1;
      if (frosted) {
        if (!enemy.frostTint) {
          enemy.frostTint = this.add
            .circle(0, 0, 6, 0xb3e5fc, 0.35)
            .setStrokeStyle(2, 0xe1f5fe, 0.5);
          enemy.root.addAt(enemy.frostTint, 0);
        }
        enemy.frostTint.setVisible(true);
      } else {
        enemy.frostTint?.setVisible(false);
      }
    }
  }

  /**
   * @param {number} sx
   * @param {number} sy
   * @param {number} tx
   * @param {number} ty
   */
  estimateArcFlightMs(sx, sy, tx, ty) {
    const dist = Math.hypot(tx - sx, ty - sy);
    const leg1 = Math.min(340, Math.max(210, dist * 0.7));
    const leg2 = Math.min(360, Math.max(220, dist * 0.55));
    return leg1 + leg2;
  }

  /**
   * @param {Enemy} enemy
   * @param {number} leadSeconds
   */
  predictEnemyPosition(enemy, leadSeconds) {
    if (!this.pathMeta) {
      return { x: enemy.root.x, y: enemy.root.y };
    }
    const futureDist = enemy.dist + enemy.speed * leadSeconds;
    const pos = getPointAtDistance(this.pathMeta, futureDist);
    return { x: pos.x, y: pos.y };
  }

  /**
   * @param {import('../data/troops.js').TroopDef} def
   * @param {Enemy} enemy
   * @param {PlacedTroop} slot
   */
  getTroopAimPoint(def, enemy, slot) {
    if (def.id !== 'mortar') {
      return { x: enemy.root.x, y: enemy.root.y };
    }
    const leadSec = this.estimateArcFlightMs(slot.x, slot.y, enemy.root.x, enemy.root.y) / 1000;
    return this.predictEnemyPosition(enemy, leadSec);
  }

  /**
   * @param {PlacedTroop} slot
   * @param {import('../data/troops.js').TroopDef} def
   * @param {Enemy[]} aliveEnemies
   * @param {number} rangePx
   * @returns {Enemy | null}
   */
  pickCombatTarget(slot, def, aliveEnemies, rangePx) {
    const rangeSq = rangePx * rangePx;

    if (def.id === 'mortar') {
      const clusterR = RANGE_TILE_PIXELS * 1.4;
      const clusterRSq = clusterR * clusterR;
      let bestEnemy = null;
      let bestScore = -Infinity;

      for (const enemy of aliveEnemies) {
        const dx = enemy.root.x - slot.x;
        const dy = enemy.root.y - slot.y;
        const dSq = dx * dx + dy * dy;
        if (dSq > rangeSq) continue;

        const aim = this.getTroopAimPoint(def, enemy, slot);
        let cluster = 0;
        for (const other of aliveEnemies) {
          const odx = other.root.x - aim.x;
          const ody = other.root.y - aim.y;
          if (odx * odx + ody * ody <= clusterRSq) {
            cluster += 1;
          }
        }

        const score = cluster * 1e6 - dSq;
        if (score > bestScore) {
          bestScore = score;
          bestEnemy = enemy;
        }
      }
      return bestEnemy;
    }

    let best = null;
    let bestDist = rangeSq;
    for (const enemy of aliveEnemies) {
      const dx = enemy.root.x - slot.x;
      const dy = enemy.root.y - slot.y;
      const dSq = dx * dx + dy * dy;
      if (dSq <= bestDist) {
        bestDist = dSq;
        best = enemy;
      }
    }
    return best;
  }

  /**
   * @param {PlacedTroop} slot
   * @param {import('../data/troops.js').TroopDef} def
   * @param {Enemy} target
   * @param {number} [aimX]
   * @param {number} [aimY]
   */
  performTroopAttack(slot, def, target, aimX, aimY) {
    const tx = aimX ?? target.root.x;
    const ty = aimY ?? target.root.y;

    if (def.id === 'mortar') {
      this.playMortarStrike(slot, def, target, tx, ty);
      return;
    }
    const splashRTiles = def.splashRadiusTiles ?? 0;
    const splashDmg = def.splashDamage ?? 0;

    if (splashRTiles > 0 && splashDmg > 0) {
      const primaryRef = target;
      this.applyDamageToEnemy(primaryRef, def.damage);
      const splashPx = splashRTiles * RANGE_TILE_PIXELS;
      const rr = splashPx * splashPx;
      const victims = [...this.enemies];
      for (const foe of victims) {
        if (foe === primaryRef) continue;
        const dx = foe.root.x - tx;
        const dy = foe.root.y - ty;
        if (dx * dx + dy * dy <= rr) {
          this.applyDamageToEnemy(foe, splashDmg);
        }
      }
    } else {
      this.applyDamageToEnemy(target, def.damage);
    }

    this.playTroopAttackFx(def, slot.x, slot.y, tx, ty);
  }

  /**
   * Mortar shells land where enemies will be; damage resolves on impact.
   * @param {PlacedTroop} slot
   * @param {import('../data/troops.js').TroopDef} def
   * @param {Enemy} primary
   * @param {number} tx
   * @param {number} ty
   */
  playMortarStrike(slot, def, primary, tx, ty) {
    this.spawnArcingPayload(slot.x, slot.y, tx, ty, 0xfff59d, 10, () => {
      this.resolveMortarImpact(def, primary, tx, ty);
    });
  }

  /**
   * @param {import('../data/troops.js').TroopDef} def
   * @param {Enemy} primary
   * @param {number} tx
   * @param {number} ty
   */
  resolveMortarImpact(def, primary, tx, ty) {
    this.spawnBurstRing(tx, ty, 0xfff176, 2.65, 480);

    const hitR = RANGE_TILE_PIXELS * 0.72;
    const hitRSq = hitR * hitR;
    let victim = null;
    let bestScore = Infinity;

    for (const foe of this.enemies) {
      if (foe.hp <= 0) continue;
      const dx = foe.root.x - tx;
      const dy = foe.root.y - ty;
      const dSq = dx * dx + dy * dy;
      if (dSq > hitRSq) continue;
      const score = dSq - (foe === primary ? hitRSq * 0.35 : 0);
      if (score < bestScore) {
        bestScore = score;
        victim = foe;
      }
    }

    if (victim) {
      this.applyDamageToEnemy(victim, def.damage);
    }
  }

  /**
   * Lightweight per-troop VFX synced to each strike.
   * @param {import('../data/troops.js').TroopDef} troop
   */
  playTroopAttackFx(troop, sx, sy, tx, ty) {
    switch (troop.id) {
      case 'archer':
        this.spawnTravelingPellet(sx, sy, tx, ty, 0xdcf5dc, 3, 38);
        break;
      case 'alien':
        this.spawnAlienTentacleStrike(sx, sy, tx, ty);
        break;
      case 'cannon':
        this.spawnTravelingPellet(sx, sy, tx, ty, 0xffcc80, 12, 240, Phaser.Math.Easing.Quartic.InOut);
        this.time.delayedCall(180, () => this.spawnBurstRing(tx, ty, 0xffab40, 1.85, 340));
        break;
      case 'sniper':
        this.spawnBeamSweep(sx, sy, tx, ty, troop.tint, 3, 420);
        break;
      case 'bomber':
        this.spawnTravelingPellet(sx, sy, tx, ty, 0xffeb3b, 9, 170, Phaser.Math.Easing.Quadratic.InOut);
        this.time.delayedCall(140, () => {
          this.spawnBurstRing(tx, ty, 0xffc107, 1.35, 240);
          this.spawnBurstRing(tx, ty, 0xff5722, 1.75, 320);
        });
        break;
      case 'mortar':
        break;
      case 'rocketeer':
        this.spawnTravelingPellet(sx, sy, tx, ty, 0xff9100, 11, 220, Phaser.Math.Easing.Cubic.In);
        this.time.delayedCall(190, () => this.spawnBurstRing(tx, ty, 0xff6d00, 2.5, 420));
        break;
      case 'ion':
        this.spawnZapArc(sx, sy, tx, ty, troop.tint);
        break;
      case 'flamethrower':
        this.spawnFlameCone(sx, sy, tx, ty, troop.tint);
        break;
      case 'snowman':
        break;
      case 'abominable_snowman':
        this.spawnTravelingPellet(sx, sy, tx, ty, 0x90caf9, 14, 280, Phaser.Math.Easing.Cubic.In);
        this.time.delayedCall(200, () => {
          this.spawnBurstRing(tx, ty, 0xb3e5fc, 2.2, 320);
          this.spawnBurstRing(tx, ty, 0x0277bd, 3.4, 400);
        });
        break;
      case 'nuker':
        this.spawnTravelingPellet(sx, sy, tx, ty, 0xeeff41, 16, 220, Phaser.Math.Easing.Quadratic.In);
        this.time.delayedCall(165, () => {
          this.spawnBurstRing(tx, ty, 0xfff176, 3.4, 280);
          this.spawnBurstRing(tx, ty, 0xff9800, 4.8, 360);
          this.spawnBurstRing(tx, ty, 0xd32f2f, 6.2, 440);
        });
        break;
      default:
        this.spawnTravelingPellet(sx, sy, tx, ty, troop.tint, 6, 160);
    }
  }

  spawnAlienTentacleStrike(sx, sy, tx, ty) {
    const ang = Math.atan2(ty - sy, tx - sx);
    const dist = Math.hypot(tx - sx, ty - sy) || 1;
    for (let t = 0; t < 4; t += 1) {
      const spread = ang + (t - 1.5) * 0.22;
      const len = dist * (0.55 + t * 0.12);
      const ex = sx + Math.cos(spread) * len;
      const ey = sy + Math.sin(spread) * len;
      const tentacle = this.add
        .rectangle(sx, sy, len, 5 + t, 0x00e676, 0.75)
        .setOrigin(0, 0.5)
        .setRotation(spread)
        .setDepth(ATTACK_FX_DEPTH);
      this.tweens.add({
        targets: tentacle,
        alpha: { from: 0.9, to: 0 },
        scaleY: { from: 0.4, to: 2.2 },
        duration: 320 + t * 40,
        ease: Phaser.Math.Easing.Quadratic.Out,
        onComplete: () => tentacle.destroy(true),
      });
    }
    this.time.delayedCall(280, () => {
      this.spawnBurstRing(tx, ty, 0x69f0ae, 2.4, 380);
      this.spawnBurstRing(tx, ty, 0x1b5e20, 3.2, 450);
    });
    this.spawnTravelingPellet(sx, sy, tx, ty, 0xa7ffeb, 8, 420, Phaser.Math.Easing.Cubic.InOut);
  }

  spawnTravelingPellet(sx, sy, tx, ty, color, radius, duration, ease) {
    const pellet = this.add.circle(sx, sy, radius, color).setStrokeStyle(2, 0xffffff, 0.35).setDepth(ATTACK_FX_DEPTH);
    this.tweens.add({
      targets: pellet,
      x: tx,
      y: ty,
      duration,
      ease: ease ?? Phaser.Math.Easing.Quadratic.Out,
      onComplete: () => pellet.destroy(true),
    });
  }

  spawnBurstRing(wx, wy, strokeColor, finalScale, durationMs) {
    const ring = this.add.circle(wx, wy, 14, strokeColor).setStrokeStyle(4, strokeColor, 0.85).setDepth(ATTACK_FX_DEPTH);
    ring.setFillStyle(0x000000, 0);
    ring.setScale(0.15, 0.15);
    this.tweens.add({
      targets: ring,
      scaleX: finalScale,
      scaleY: finalScale,
      alpha: { from: 0.9, to: 0 },
      duration: durationMs,
      ease: Phaser.Math.Easing.Quadratic.Out,
      onComplete: () => ring.destroy(true),
    });
  }

  spawnBeamSweep(sx, sy, tx, ty, tint, thicknessPx, durationMs) {
    const dx = tx - sx;
    const dy = ty - sy;
    const length = Math.hypot(dx, dy) || 1;
    const midX = sx + dx / 2;
    const midY = sy + dy / 2;
    const angle = Math.atan2(dy, dx);
    const beam = this.add
      .rectangle(midX, midY, Math.max(length, 42), thicknessPx, tint, 0.55)
      .setStrokeStyle(1, 0xffffff, 0.45)
      .setOrigin(0.5)
      .setRotation(angle)
      .setDepth(ATTACK_FX_DEPTH);
    this.tweens.add({
      targets: beam,
      alpha: { from: 0.88, to: 0 },
      scaleY: { from: 0.55, to: 2 },
      duration: durationMs,
      ease: Phaser.Math.Easing.Quartic.Out,
      onComplete: () => beam.destroy(true),
    });
  }

  spawnArcingPayload(sx, sy, tx, ty, color, radius, onImpact) {
    const pellet = this.add.circle(sx, sy, radius, color).setStrokeStyle(2, 0xffffff, 0.45).setDepth(ATTACK_FX_DEPTH);

    const dist = Math.hypot(tx - sx, ty - sy);
    const apexY = Math.min(sy, ty) - 90 - Math.min(120, dist * 0.45);
    const midX = (sx + tx) / 2;

    this.tweens.chain({
      targets: pellet,
      tweens: [
        {
          x: midX,
          y: apexY,
          duration: Math.min(340, Math.max(210, dist * 0.7)),
          ease: Phaser.Math.Easing.Sine.Out,
        },
        {
          x: tx,
          y: ty,
          duration: Math.min(360, Math.max(220, dist * 0.55)),
          ease: Phaser.Math.Easing.Quadratic.In,
          onComplete: () => {
            if (typeof onImpact === 'function') {
              onImpact();
            }
            pellet.destroy(true);
          },
        },
      ],
    });
  }

  spawnZapArc(sx, sy, tx, ty, tint) {
    const ang = Math.atan2(ty - sy, tx - sx);
    const len = Math.hypot(tx - sx, ty - sy) || 120;
    for (let o = -1; o <= 1; o += 1) {
      const jitter = ang + o * 0.07;
      const beam = this.add
        .rectangle(sx + (tx - sx) * 0.5 + Math.cos(jitter + Math.PI / 2) * 6 * o, sy + (ty - sy) * 0.5 + Math.sin(jitter + Math.PI / 2) * 6 * o, len + 34, o === 0 ? 4 : 2, tint, 0.6)
        .setOrigin(0.5)
        .setRotation(ang + o * 0.06)
        .setBlendMode(Phaser.BlendModes.ADD)
        .setDepth(ATTACK_FX_DEPTH);
      this.tweens.add({
        targets: beam,
        alpha: { from: 0.85, to: 0 },
        scaleY: { from: 1, to: 2.14 },
        duration: 260 + o * 40,
        delay: Math.max(0, o * 12),
        ease: Phaser.Math.Easing.Expo.Out,
        onComplete: () => beam.destroy(true),
      });
    }
  }

  spawnFlameCone(sx, sy, tx, ty, tint) {
    const ang = Math.atan2(ty - sy, tx - sx);
    for (let i = 0; i < 8; i += 1) {
      const spread = Phaser.Math.FloatBetween(-0.35, 0.35);
      const dist = 18 + i * 22;
      this.time.delayedCall(i * 18, () => {
        const px = sx + Math.cos(ang + spread) * dist + Phaser.Math.Between(-4, 4);
        const py = sy + Math.sin(ang + spread) * dist + Phaser.Math.Between(-5, 5);
        const puff = this.add
          .circle(px, py, Phaser.Math.Between(10, 16), tint, 0.65)
          .setBlendMode(Phaser.BlendModes.ADD)
          .setDepth(ATTACK_FX_DEPTH);
        this.tweens.add({
          targets: puff,
          alpha: { from: 0.88, to: 0 },
          scale: { from: 0.5, to: 1.4 },
          duration: Phaser.Math.Between(150, 220),
          ease: Phaser.Math.Easing.Quartic.Out,
          onComplete: () => puff.destroy(true),
        });
      });
    }
  }
}