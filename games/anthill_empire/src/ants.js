import * as THREE from 'three';
import {
  FOOD_PILE_AMOUNT_MAX,
  FOOD_PILE_AMOUNT_MIN,
  FOOD_PILE_COUNT,
  FOOD_PILE_MAX_R,
  FOOD_PILE_MIN_R,
  FOOD_RESPAWN_MS,
  INVADER_SPEED,
  NEST_RADIUS,
  PLAYER_SOLDIER_HP,
  RIVAL_DEFENDER_HP,
  RIVAL_DEFENDER_SPEED,
  RIVAL_NEST_RADIUS,
  SCOUT_SPEED,
  SOLDIER_SPEED,
} from './constants.js';
import { scoutCarryAmount } from './economy.js';

/**
 * @typedef {'idle' | 'toFood' | 'toNest'} ScoutState
 * @typedef {{
 *   mesh: THREE.Group,
 *   role: 'scout' | 'soldier' | 'invader' | 'defender',
 *   state: ScoutState | 'patrol' | 'fight' | 'march' | 'raidOut' | 'raidReturn' | 'defend',
 *   homeNestId?: number,
 *   targetFood: FoodPile | null,
 *   hp: number,
 *   maxHp: number,
 *   speed: number,
 *   attackCd: number,
 *   carry: number,
 *   hpBar?: THREE.Group,
 *   hpFill?: THREE.Mesh,
 *   homeNestId?: number,
 *   attackDamage?: number,
 * }} Ant
 *
 * @typedef {{
 *   mesh: THREE.Mesh,
 *   hit: THREE.Mesh,
 *   amount: number,
 *   maxAmount: number,
 *   alive: boolean,
 *   respawnAt: number,
 * }} FoodPile
 */

/**
 * @param {number} color
 * @param {number} scale
 */
function makeAntMesh(color, scale = 1) {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.7 });
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 10), mat);
  body.scale.set(1.1, 0.75, 1.6);
  body.castShadow = true;
  g.add(body);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), mat);
  head.position.set(0, 0.02, 0.28);
  head.castShadow = true;
  g.add(head);

  const abdomen = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), mat);
  abdomen.position.set(0, 0.02, -0.28);
  abdomen.scale.set(1, 0.85, 1.2);
  abdomen.castShadow = true;
  g.add(abdomen);

  g.scale.setScalar(scale);
  g.position.y = 0.16 * scale;
  return g;
}

const HP_BAR_WIDTH = 0.72;

/**
 * @param {number} [width]
 * @returns {{ bar: THREE.Group, fill: THREE.Mesh }}
 */
export function createHealthBar(width = HP_BAR_WIDTH) {
  const bar = new THREE.Group();
  bar.name = 'hpBar';

  const bg = new THREE.Mesh(
    new THREE.PlaneGeometry(width, 0.1),
    new THREE.MeshBasicMaterial({
      color: 0x1a120a,
      depthTest: false,
      transparent: true,
      opacity: 0.85,
    }),
  );
  bg.renderOrder = 10;
  bar.add(bg);

  const fill = new THREE.Mesh(
    new THREE.PlaneGeometry(width - 0.06, 0.06),
    new THREE.MeshBasicMaterial({
      color: 0x4caf50,
      depthTest: false,
      transparent: true,
      opacity: 0.95,
    }),
  );
  fill.position.z = 0.01;
  fill.renderOrder = 11;
  fill.name = 'hpFill';
  bar.add(fill);

  return { bar, fill };
}

/** @returns {{ bar: THREE.Group, fill: THREE.Mesh }} */
function makeHealthBar() {
  return createHealthBar(HP_BAR_WIDTH);
}

/**
 * @param {{ hp: number, maxHp: number, hpFill?: THREE.Mesh, hpBar?: THREE.Group, role?: string }} target
 * @param {number} [barWidth]
 */
export function syncHealthBar(target, barWidth = HP_BAR_WIDTH) {
  if (!target.hpFill || !target.hpBar) return;
  const ratio = Math.max(0, Math.min(1, target.hp / Math.max(1, target.maxHp)));
  target.hpFill.scale.x = Math.max(0.001, ratio);
  target.hpFill.position.x = -((barWidth - 0.06) * (1 - ratio)) / 2;

  const mat = /** @type {THREE.MeshBasicMaterial} */ (target.hpFill.material);
  if (ratio > 0.55) mat.color.setHex(0x4caf50);
  else if (ratio > 0.3) mat.color.setHex(0xe6b422);
  else mat.color.setHex(0xd32f2f);

  if (target.role === 'nest') {
    target.hpBar.visible = target.hp > 0;
    return;
  }

  target.hpBar.visible =
    target.hp > 0 &&
    (target.role === 'invader' ||
      target.role === 'defender' ||
      target.role === 'soldier');
}

/**
 * Keep bars above invaders and facing the camera.
 * @param {Ant[]} ants
 * @param {THREE.Camera} camera
 */
export function billboardHealthBars(ants, camera) {
  for (const ant of ants) {
    if (!ant.hpBar || !ant.hpBar.visible) continue;
    ant.hpBar.position.set(
      ant.mesh.position.x,
      ant.mesh.position.y + 0.55,
      ant.mesh.position.z,
    );
    ant.hpBar.quaternion.copy(camera.quaternion);
  }
}

/**
 * @param {THREE.Group} foodGroup
 * @returns {FoodPile[]}
 */
export function spawnFoodPiles(foodGroup) {
  /** @type {FoodPile[]} */
  const piles = [];
  for (let i = 0; i < FOOD_PILE_COUNT; i++) {
    const angle = (i / FOOD_PILE_COUNT) * Math.PI * 2 + Math.random() * 0.3;
    const r = FOOD_PILE_MIN_R + Math.random() * (FOOD_PILE_MAX_R - FOOD_PILE_MIN_R);
    const amount =
      FOOD_PILE_AMOUNT_MIN +
      Math.floor(Math.random() * (FOOD_PILE_AMOUNT_MAX - FOOD_PILE_AMOUNT_MIN + 1));

    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.75, 14, 14),
      new THREE.MeshStandardMaterial({
        color: 0xd4a017,
        emissive: 0x886600,
        emissiveIntensity: 0.55,
        roughness: 0.55,
      }),
    );
    mesh.position.set(Math.cos(angle) * r, 0.4, Math.sin(angle) * r);
    mesh.castShadow = true;
    mesh.userData.foodIndex = i;

    // Large invisible hit target — screen picking is primary; this helps raycasts too.
    const hit = new THREE.Mesh(
      new THREE.SphereGeometry(1.6, 8, 8),
      new THREE.MeshBasicMaterial({ visible: false }),
    );
    hit.userData.foodIndex = i;
    mesh.add(hit);

    foodGroup.add(mesh);

    piles.push({
      mesh,
      hit,
      amount,
      maxAmount: amount,
      alive: true,
      respawnAt: 0,
    });
  }
  return piles;
}

/**
 * @param {FoodPile[]} piles
 * @param {number} now
 */
export function updateFoodPiles(piles, now) {
  for (const pile of piles) {
    if (!pile.alive && now >= pile.respawnAt) {
      pile.amount = pile.maxAmount;
      pile.alive = true;
      pile.mesh.visible = true;
      pile.mesh.scale.setScalar(1);
    }
    if (pile.alive) {
      const t = performance.now() * 0.003;
      pile.mesh.position.y = 0.4 + Math.sin(t + pile.mesh.position.x) * 0.05;
      const s = 0.75 + 0.35 * (pile.amount / pile.maxAmount);
      pile.mesh.scale.setScalar(s);
    }
  }
}

/**
 * @param {THREE.Group} antGroup
 * @param {number} count
 * @returns {Ant[]}
 */
export function createColonyAntVisuals(antGroup, count) {
  /** @type {Ant[]} */
  const ants = [];
  for (let i = 0; i < count; i++) {
    const mesh = makeAntMesh(0x2b1a0e, 0.9);
    const a = Math.random() * Math.PI * 2;
    const r = NEST_RADIUS * 0.8 + Math.random() * 1.2;
    mesh.position.set(Math.cos(a) * r, mesh.position.y, Math.sin(a) * r);
    antGroup.add(mesh);
    ants.push({
      mesh,
      role: 'scout',
      state: 'idle',
      targetFood: null,
      hp: 1,
      maxHp: 1,
      speed: SCOUT_SPEED,
      attackCd: 0,
      carry: 0,
    });
  }
  return ants;
}

/**
 * @param {THREE.Group} antGroup
 * @returns {Ant}
 */
export function spawnScoutVisual(antGroup) {
  const mesh = makeAntMesh(0x2b1a0e, 0.9);
  mesh.position.set(0, mesh.position.y, NEST_RADIUS * 0.7);
  antGroup.add(mesh);
  return {
    mesh,
    role: 'scout',
    state: 'idle',
    targetFood: null,
    hp: 1,
    maxHp: 1,
    speed: SCOUT_SPEED,
    attackCd: 0,
    carry: 0,
  };
}

/**
 * @param {THREE.Group} antGroup
 * @returns {Ant}
 */
export function spawnSoldierVisual(antGroup) {
  const mesh = makeAntMesh(0x4a2c0a, 1.15);
  const a = Math.random() * Math.PI * 2;
  mesh.position.set(
    Math.cos(a) * (NEST_RADIUS + 0.5),
    mesh.position.y,
    Math.sin(a) * (NEST_RADIUS + 0.5),
  );
  const { bar, fill } = makeHealthBar();
  antGroup.add(mesh);
  antGroup.add(bar);
  /** @type {Ant} */
  const ant = {
    mesh,
    role: 'soldier',
    state: 'patrol',
    targetFood: null,
    hp: PLAYER_SOLDIER_HP,
    maxHp: PLAYER_SOLDIER_HP,
    speed: SOLDIER_SPEED,
    attackCd: 0,
    carry: 0,
    hpBar: bar,
    hpFill: fill,
  };
  syncHealthBar(ant);
  return ant;
}

/**
 * Rival nest guard that fights raiding soldiers.
 * @param {THREE.Group} antGroup
 * @param {THREE.Vector3} nestPos
 * @param {number} nestId
 * @param {{ hp?: number, damage?: number }} [opts]
 * @returns {Ant}
 */
export function spawnRivalDefender(antGroup, nestPos, nestId, opts = {}) {
  const hp = opts.hp ?? RIVAL_DEFENDER_HP;
  const damage = opts.damage ?? 7;
  const mesh = makeAntMesh(0x9a3412, 1.1);
  const a = Math.random() * Math.PI * 2;
  const r = RIVAL_NEST_RADIUS + 0.35 + Math.random() * 0.5;
  mesh.position.set(
    nestPos.x + Math.cos(a) * r,
    0.18,
    nestPos.z + Math.sin(a) * r,
  );
  const { bar, fill } = makeHealthBar();
  antGroup.add(mesh);
  antGroup.add(bar);
  /** @type {Ant} */
  const ant = {
    mesh,
    role: 'defender',
    state: 'defend',
    targetFood: null,
    hp,
    maxHp: hp,
    speed: RIVAL_DEFENDER_SPEED,
    attackCd: 0,
    carry: 0,
    hpBar: bar,
    hpFill: fill,
    homeNestId: nestId,
    attackDamage: damage,
  };
  syncHealthBar(ant);
  return ant;
}

/**
 * @param {THREE.Group} antGroup
 * @param {THREE.Vector3} from
 * @param {number} hp
 * @returns {Ant}
 */
export function spawnInvader(antGroup, from, hp) {
  const mesh = makeAntMesh(0x8b1e1e, 1.05);
  mesh.position.copy(from);
  mesh.position.y = mesh.position.y || 0.18;
  const { bar, fill } = makeHealthBar();
  bar.position.copy(mesh.position);
  bar.position.y += 0.55;
  antGroup.add(mesh);
  antGroup.add(bar);
  /** @type {Ant} */
  const ant = {
    mesh,
    role: 'invader',
    state: 'march',
    targetFood: null,
    hp,
    maxHp: hp,
    speed: INVADER_SPEED,
    attackCd: 0,
    carry: 0,
    hpBar: bar,
    hpFill: fill,
  };
  syncHealthBar(ant);
  return ant;
}

/**
 * @param {THREE.Object3D} mesh
 * @param {THREE.Vector3} target
 * @param {number} speed
 * @param {number} dt
 * @param {number} arriveDist
 */
export function moveToward(mesh, target, speed, dt, arriveDist = 0.35) {
  const pos = mesh.position;
  const dx = target.x - pos.x;
  const dz = target.z - pos.z;
  const dist = Math.hypot(dx, dz);
  if (dist <= arriveDist) return true;
  const step = Math.min(dist, speed * dt);
  pos.x += (dx / dist) * step;
  pos.z += (dz / dist) * step;
  mesh.rotation.y = Math.atan2(dx, dz);
  // Tiny bob
  mesh.position.y = 0.16 + Math.sin(performance.now() * 0.02 + pos.x) * 0.03;
  return false;
}

/**
 * Assign idle scouts to a food pile.
 * @param {Ant[]} scouts
 * @param {FoodPile} pile
 * @param {number} maxAssign
 * @param {(n: number) => void} onBusyDelta
 */
export function assignScoutsToPile(scouts, pile, maxAssign, onBusyDelta) {
  if (!pile.alive) return 0;
  let assigned = 0;
  for (const ant of scouts) {
    if (assigned >= maxAssign) break;
    if (ant.role !== 'scout' || ant.state !== 'idle') continue;
    ant.state = 'toFood';
    ant.targetFood = pile;
    assigned += 1;
  }
  if (assigned > 0) onBusyDelta(assigned);
  return assigned;
}

/**
 * @param {Ant[]} scouts
 * @param {number} nestLevel
 * @param {number} dt
 * @param {(amount: number) => void} onDeposit
 * @param {(n: number) => void} onBusyDelta
 * @param {number} now
 */
export function updateScouts(scouts, nestLevel, dt, onDeposit, onBusyDelta, now) {
  const nestTarget = new THREE.Vector3(0, 0, 0);
  const carry = scoutCarryAmount(nestLevel);

  for (const ant of scouts) {
    if (ant.role !== 'scout') continue;

    if (ant.state === 'idle') {
      // Idle mill near nest
      const a = performance.now() * 0.0004 + ant.mesh.id;
      const r = NEST_RADIUS * 0.9 + (ant.mesh.id % 5) * 0.15;
      const tx = Math.cos(a) * r;
      const tz = Math.sin(a) * r;
      moveToward(ant.mesh, new THREE.Vector3(tx, 0, tz), ant.speed * 0.35, dt, 0.2);
      continue;
    }

    if (ant.state === 'toFood' && ant.targetFood) {
      const pile = ant.targetFood;
      if (!pile.alive) {
        ant.state = 'toNest';
        ant.targetFood = null;
        continue;
      }
      const arrived = moveToward(ant.mesh, pile.mesh.position, ant.speed, dt, 0.5);
      if (arrived) {
        const take = Math.min(carry, pile.amount);
        pile.amount -= take;
        ant.carry = take;
        if (pile.amount <= 0) {
          pile.alive = false;
          pile.mesh.visible = false;
          pile.respawnAt = now + FOOD_RESPAWN_MS;
        }
        ant.state = 'toNest';
        ant.targetFood = null;
      }
      continue;
    }

    if (ant.state === 'toNest') {
      const arrived = moveToward(ant.mesh, nestTarget, ant.speed, dt, NEST_RADIUS * 0.55);
      if (arrived) {
        if (ant.carry > 0) {
          onDeposit(ant.carry);
          ant.carry = 0;
        }
        ant.state = 'idle';
        onBusyDelta(-1);
      }
    }
  }
}

/**
 * @param {Ant} ant
 */
export function removeAnt(ant) {
  const disposeObject = (root) => {
    root.parent?.remove(root);
    root.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry?.dispose();
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material?.dispose?.();
      }
    });
  };
  disposeObject(ant.mesh);
  if (ant.hpBar) disposeObject(ant.hpBar);
}
