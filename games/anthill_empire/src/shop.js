import * as THREE from 'three';
import {
  NEST_RADIUS,
  SHOP_CHARGER_COST,
  SHOP_CHARGER_DAMAGE,
  SHOP_CHARGER_HP,
  SHOP_CHARGER_SPEED,
  SHOP_MAX_SPECIAL_PER_TYPE,
  SHOP_WIZARD_COOLDOWN_MS,
  SHOP_WIZARD_COST,
  SHOP_WIZARD_HP,
  SHOP_WIZARD_RANGE,
  SOLDIER_ATTACK_COOLDOWN_MS,
  SOLDIER_RANGE,
  WIZARD_SEED_DAMAGE,
  WIZARD_SEED_LIFETIME_MS,
  WIZARD_SEED_SPEED,
} from './constants.js';
import {
  createHealthBar,
  moveToward,
  removeAnt,
  spawnChargerAnt,
  spawnWizardAnt,
  syncHealthBar,
} from './ants.js';

/**
 * @typedef {import('./ants.js').Ant} Ant
 * @typedef {import('./economy.js').Economy} Economy
 * @typedef {import('./combat.js').CombatState} CombatState
 *
 * @typedef {{
 *   mesh: THREE.Mesh,
 *   vx: number,
 *   vz: number,
 *   damage: number,
 *   bornAt: number,
 *   ownerId: number,
 * }} FruitSeed
 */

/** @type {FruitSeed[]} */
const seeds = [];

/** @type {readonly { id: 'wizard' | 'charger', name: string, cost: number, desc: string }[]} */
export const SHOP_CATALOG = [
  {
    id: 'wizard',
    name: 'Wizard Ant',
    cost: SHOP_WIZARD_COST,
    desc: 'Shoots fruit seeds at invaders from range.',
  },
  {
    id: 'charger',
    name: 'Charger Ant',
    cost: SHOP_CHARGER_COST,
    desc: 'Heavy melee fighter — fast, tough, hits hard.',
  },
];

/**
 * @param {Economy} eco
 * @param {'wizard' | 'charger'} type
 */
export function specialAntCost(type) {
  return type === 'wizard' ? SHOP_WIZARD_COST : SHOP_CHARGER_COST;
}

/**
 * @param {Economy} eco
 * @param {'wizard' | 'charger'} type
 */
export function canBuySpecialAnt(eco, type) {
  const count = type === 'wizard' ? eco.wizards : eco.chargers;
  if (count >= SHOP_MAX_SPECIAL_PER_TYPE) return false;
  return eco.food >= specialAntCost(eco, type);
}

/**
 * @param {Economy} eco
 * @param {'wizard' | 'charger'} type
 * @returns {boolean}
 */
export function tryBuySpecialAnt(eco, type) {
  if (!canBuySpecialAnt(eco, type)) return false;
  eco.food -= specialAntCost(eco, type);
  if (type === 'wizard') eco.wizards += 1;
  else eco.chargers += 1;
  return true;
}

/**
 * @param {THREE.Group} antGroup
 * @param {Ant[]} specialAnts
 * @param {Economy} eco
 */
export function syncSpecialAntVisuals(antGroup, specialAnts, eco) {
  while (specialAnts.length > eco.wizards + eco.chargers) {
    const dead = specialAnts.pop();
    if (dead) removeAnt(dead);
  }

  let wizards = specialAnts.filter((a) => a.role === 'wizard').length;
  let chargers = specialAnts.filter((a) => a.role === 'charger').length;

  while (wizards < eco.wizards) {
    specialAnts.push(spawnWizardAnt(antGroup));
    wizards += 1;
  }
  while (chargers < eco.chargers) {
    specialAnts.push(spawnChargerAnt(antGroup));
    chargers += 1;
  }
}

/**
 * @param {Ant[]} specialAnts
 * @param {Economy} eco
 */
export function clearSpecialAnts(specialAnts, eco) {
  for (const ant of specialAnts) removeAnt(ant);
  specialAnts.length = 0;
  eco.wizards = 0;
  eco.chargers = 0;
  for (const seed of seeds) seed.mesh.parent?.remove(seed.mesh);
  seeds.length = 0;
}

/**
 * @param {THREE.Group} antGroup
 * @param {THREE.Vector3} from
 * @param {THREE.Vector3} to
 * @param {number} damage
 * @param {number} now
 * @param {number} ownerId
 */
function fireFruitSeed(antGroup, from, to, damage, now, ownerId) {
  const dx = to.x - from.x;
  const dz = to.z - from.z;
  const dist = Math.hypot(dx, dz) || 1;
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 8, 8),
    new THREE.MeshStandardMaterial({
      color: 0xc4a035,
      emissive: 0x664400,
      emissiveIntensity: 0.35,
      roughness: 0.45,
    }),
  );
  mesh.position.set(from.x, 0.35, from.z);
  mesh.castShadow = true;
  antGroup.add(mesh);
  seeds.push({
    mesh,
    vx: (dx / dist) * WIZARD_SEED_SPEED,
    vz: (dz / dist) * WIZARD_SEED_SPEED,
    damage,
    bornAt: now,
    ownerId,
  });
}

/**
 * @param {CombatState} combat
 * @param {Ant[]} specialAnts
 * @param {Economy} eco
 * @param {THREE.Group} antGroup
 * @param {number} dt
 * @param {number} now
 * @param {boolean} raidSafe
 */
export function updateSpecialAnts(
  combat,
  specialAnts,
  eco,
  antGroup,
  dt,
  now,
  raidSafe,
) {
  if (raidSafe) {
    for (const ant of specialAnts) {
      if (ant.role === 'wizard' || ant.role === 'charger') {
        ant.state = 'patrol';
        const a = now * 0.0005 + ant.mesh.id;
        const r = NEST_RADIUS + 1.4 + (ant.mesh.id % 3) * 0.35;
        moveToward(
          ant.mesh,
          new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r),
          ant.speed * 0.45,
          dt,
          0.25,
        );
      }
    }
    return;
  }

  for (const ant of specialAnts) {
    if (ant.hp <= 0) continue;
    ant.attackCd = Math.max(0, ant.attackCd - dt * 1000);

    if (ant.role === 'wizard') {
      let nearest = null;
      let nearestDist = Infinity;
      for (const inv of combat.invaders) {
        const d = ant.mesh.position.distanceTo(inv.mesh.position);
        if (d < nearestDist) {
          nearestDist = d;
          nearest = inv;
        }
      }

      if (nearest && nearestDist <= SHOP_WIZARD_RANGE) {
        ant.state = 'fight';
        moveToward(ant.mesh, nearest.mesh.position, ant.speed * 0.35, dt, SHOP_WIZARD_RANGE * 0.7);
        if (ant.attackCd <= 0 && nearestDist <= SHOP_WIZARD_RANGE) {
          fireFruitSeed(
            antGroup,
            ant.mesh.position,
            nearest.mesh.position,
            WIZARD_SEED_DAMAGE,
            now,
            ant.mesh.id,
          );
          ant.attackCd = SHOP_WIZARD_COOLDOWN_MS;
        }
      } else {
        ant.state = 'patrol';
        const a = now * 0.00045 + ant.mesh.id;
        const r = NEST_RADIUS + 1.1;
        moveToward(
          ant.mesh,
          new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r),
          ant.speed * 0.5,
          dt,
          0.25,
        );
      }
      continue;
    }

    if (ant.role === 'charger') {
      let nearest = null;
      let nearestDist = Infinity;
      for (const inv of combat.invaders) {
        const d = ant.mesh.position.distanceTo(inv.mesh.position);
        if (d < nearestDist) {
          nearestDist = d;
          nearest = inv;
        }
      }

      if (nearest && nearestDist <= SOLDIER_RANGE * 2) {
        ant.state = 'fight';
        moveToward(ant.mesh, nearest.mesh.position, ant.speed, dt, 0.5);
        if (nearestDist <= SOLDIER_RANGE && ant.attackCd <= 0) {
          nearest.hp -= ant.attackDamage ?? SHOP_CHARGER_DAMAGE;
          syncHealthBar(nearest);
          ant.attackCd = SOLDIER_ATTACK_COOLDOWN_MS * 0.85;
        }
      } else {
        ant.state = 'patrol';
        const a = now * 0.0006 + ant.mesh.id;
        moveToward(
          ant.mesh,
          new THREE.Vector3(Math.cos(a) * (NEST_RADIUS + 1.5), 0, Math.sin(a) * (NEST_RADIUS + 1.5)),
          ant.speed * 0.55,
          dt,
          0.25,
        );
      }
    }
  }

  // Dead special ants
  const alive = [];
  for (const ant of specialAnts) {
    if (ant.hp <= 0) {
      removeAnt(ant);
      if (ant.role === 'wizard') eco.wizards = Math.max(0, eco.wizards - 1);
      if (ant.role === 'charger') eco.chargers = Math.max(0, eco.chargers - 1);
    } else {
      alive.push(ant);
    }
  }
  specialAnts.length = 0;
  specialAnts.push(...alive);

  updateFruitSeeds(combat, antGroup, dt, now);
}

/**
 * @param {CombatState} combat
 * @param {THREE.Group} antGroup
 * @param {number} dt
 * @param {number} now
 */
function updateFruitSeeds(combat, antGroup, dt, now) {
  const live = [];
  for (const seed of seeds) {
    if (now - seed.bornAt > WIZARD_SEED_LIFETIME_MS) {
      antGroup.remove(seed.mesh);
      continue;
    }

    seed.mesh.position.x += seed.vx * dt;
    seed.mesh.position.z += seed.vz * dt;
    seed.mesh.rotation.y += dt * 8;

    let hit = false;
    for (const inv of combat.invaders) {
      const d = seed.mesh.position.distanceTo(inv.mesh.position);
      if (d < 0.55) {
        inv.hp -= seed.damage;
        syncHealthBar(inv);
        hit = true;
        break;
      }
    }

    antGroup.remove(seed.mesh);
    if (!hit) live.push(seed);
  }
  seeds.length = 0;
  seeds.push(...live);
}

/** @param {Ant[]} specialAnts */
export function allSpecialAnts(specialAnts) {
  return specialAnts;
}
