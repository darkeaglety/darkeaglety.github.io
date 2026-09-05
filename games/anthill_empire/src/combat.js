import * as THREE from 'three';
import {
  INVADER_ATTACK_COOLDOWN_MS,
  INVADER_DAMAGE,
  INVADER_HP,
  MAP_RADIUS,
  NEST_RADIUS,
  SOLDIER_ATTACK_COOLDOWN_MS,
  SOLDIER_RANGE,
  WAVE_CLEAR_FOOD_BASE,
  WAVE_CLEAR_FOOD_PER_WAVE,
  WAVE_INTERVAL_MS,
  WAVE_INVADER_HP_PER_WAVE,
  WAVE_START_DELAY_MS,
  stageProfile,
} from './constants.js';
import { moveToward, removeAnt, spawnInvader, syncHealthBar } from './ants.js';
import { damageNest, depositFood, soldierDamage } from './economy.js';

/**
 * @typedef {import('./ants.js').Ant} Ant
 * @typedef {import('./economy.js').Economy} Economy
 */

/**
 * @typedef {{
 *   wave: number,
 *   nextWaveAt: number,
 *   invaders: Ant[],
 *   banner: string | null,
 *   bannerUntil: number,
 * }} CombatState
 */

/** @returns {CombatState} */
export function createCombatState() {
  return {
    wave: 0,
    nextWaveAt: performance.now() + WAVE_START_DELAY_MS,
    invaders: [],
    banner: null,
    bannerUntil: 0,
  };
}

/**
 * @param {CombatState} combat
 * @param {THREE.Group} antGroup
 * @param {number} now
 * @param {(text: string) => void} showBanner
 * @param {boolean} [raidSafe]
 * @param {Economy} [eco]
 */
export function maybeSpawnWave(combat, antGroup, now, showBanner, raidSafe = false, eco = null) {
  if (raidSafe) {
    // Hold waves while the colony is away raiding.
    combat.nextWaveAt = Math.max(combat.nextWaveAt, now + 1500);
    return;
  }
  if (now < combat.nextWaveAt) return;
  if (combat.invaders.length > 0) {
    combat.nextWaveAt = now + 2000;
    return;
  }

  const profile = stageProfile(eco?.worldStage ?? 1);
  combat.wave += 1;
  const count = combat.wave;
  const hp = Math.round(
    (INVADER_HP + (combat.wave - 1) * WAVE_INVADER_HP_PER_WAVE) * profile.invaderHpMult,
  );

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const from = new THREE.Vector3(
      Math.cos(angle) * (MAP_RADIUS - 1),
      0.18,
      Math.sin(angle) * (MAP_RADIUS - 1),
    );
    combat.invaders.push(spawnInvader(antGroup, from, hp));
  }

  const label = eco?.worldStage && eco.worldStage > 1
    ? `Desert Wave ${combat.wave}`
    : `Wave ${combat.wave}`;
  showBanner(label);
  combat.banner = label;
  combat.bannerUntil = now + 2200;
  combat.nextWaveAt = now + WAVE_INTERVAL_MS * profile.waveIntervalMult;
}

/**
 * @param {CombatState} combat
 * @param {Ant[]} soldiers
 * @param {Economy} eco
 * @param {number} dt
 * @param {number} now
 * @param {() => void} onNestBreached
 * @param {boolean} [raidSafe]
 * @param {(food: number) => void} [onWaveCleared]
 */
export function updateCombat(
  combat,
  soldiers,
  eco,
  dt,
  now,
  onNestBreached,
  raidSafe = false,
  onWaveCleared = null,
) {
  const nest = new THREE.Vector3(0, 0, 0);

  // During a raid, clear invaders and skip fighting — home nest is protected.
  if (raidSafe) {
    if (combat.invaders.length > 0) {
      for (const inv of combat.invaders) removeAnt(inv);
      combat.invaders = [];
      combat.banner = 'Nest shielded — raid in progress';
      combat.bannerUntil = now + 1400;
    }
    // Non-raiding soldiers keep a light patrol near home.
    for (const soldier of soldiers) {
      if (soldier.role !== 'soldier') continue;
      if (soldier.state === 'raidOut' || soldier.state === 'raidReturn') continue;
      soldier.state = 'patrol';
      const a = now * 0.0005 + soldier.mesh.id;
      const r = NEST_RADIUS + 1.2 + (soldier.mesh.id % 3) * 0.4;
      moveToward(
        soldier.mesh,
        new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r),
        soldier.speed * 0.45,
        dt,
        0.25,
      );
    }
    return;
  }

  // Soldiers engage nearest invader
  for (const soldier of soldiers) {
    if (soldier.role !== 'soldier') continue;
    if (soldier.state === 'raidOut' || soldier.state === 'raidReturn') continue;
    soldier.attackCd = Math.max(0, soldier.attackCd - dt * 1000);

    let nearest = null;
    let nearestDist = Infinity;
    for (const inv of combat.invaders) {
      const d = soldier.mesh.position.distanceTo(inv.mesh.position);
      if (d < nearestDist) {
        nearestDist = d;
        nearest = inv;
      }
    }

    if (nearest && nearestDist <= SOLDIER_RANGE * 1.8) {
      soldier.state = 'fight';
      const arrived = moveToward(
        soldier.mesh,
        nearest.mesh.position,
        soldier.speed,
        dt,
        0.55,
      );
      if (arrived || nearestDist <= SOLDIER_RANGE) {
        if (soldier.attackCd <= 0) {
          nearest.hp -= soldierDamage(eco);
          syncHealthBar(nearest);
          soldier.attackCd = SOLDIER_ATTACK_COOLDOWN_MS;
        }
      }
    } else {
      soldier.state = 'patrol';
      const a = now * 0.0005 + soldier.mesh.id;
      const r = NEST_RADIUS + 1.2 + (soldier.mesh.id % 3) * 0.4;
      moveToward(
        soldier.mesh,
        new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r),
        soldier.speed * 0.5,
        dt,
        0.25,
      );
    }
  }

  // Invaders march / attack nest
  for (const inv of combat.invaders) {
    inv.attackCd = Math.max(0, inv.attackCd - dt * 1000);
    const dist = inv.mesh.position.distanceTo(nest);

    if (dist > NEST_RADIUS * 0.85) {
      moveToward(inv.mesh, nest, inv.speed, dt, NEST_RADIUS * 0.8);
    } else if (inv.attackCd <= 0) {
      const dmg = INVADER_DAMAGE * stageProfile(eco.worldStage ?? 1).invaderDamageMult;
      const dead = damageNest(eco, dmg);
      inv.attackCd = INVADER_ATTACK_COOLDOWN_MS;
      inv.mesh.scale.setScalar(1.15);
      setTimeout(() => inv.mesh.scale.setScalar(1.05), 80);
      if (dead) onNestBreached();
    }
  }

  // Remove dead invaders
  const remaining = [];
  for (const inv of combat.invaders) {
    if (inv.hp <= 0) {
      removeAnt(inv);
    } else {
      remaining.push(inv);
    }
  }

  if (combat.invaders.length > 0 && remaining.length === 0) {
    eco.wavesSurvived += 1;
    const food = WAVE_CLEAR_FOOD_BASE + combat.wave * WAVE_CLEAR_FOOD_PER_WAVE;
    depositFood(eco, food);
    combat.banner = `Wave cleared! +${food} food`;
    combat.bannerUntil = now + 1800;
    onWaveCleared?.(food);
  }
  combat.invaders = remaining;
}

/**
 * Hard game over when nest HP hits zero.
 * @param {CombatState} combat
 * @param {Economy} eco
 */
export function handleNestBreach(combat, eco) {
  eco.gameOver = true;
  eco.nestHp = 0;
  for (const inv of combat.invaders) removeAnt(inv);
  combat.invaders = [];
  return 'Game Over — your nest was destroyed.';
}
