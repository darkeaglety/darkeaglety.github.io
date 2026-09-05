import * as THREE from 'three';
import {
  CAPTURED_NEST_FOOD_PER_TICK,
  CAPTURED_NEST_FOOD_TICK_MS,
  MAP_RADIUS,
  RAID_MAX_DEFENDERS,
  RAID_SCALE_PER_POWER,
  RAID_SOLDIER_SPEED,
  RAID_STEAL_FOOD_MAX,
  RAID_STEAL_FOOD_MIN,
  RIVAL_DEFENDER_ATTACK_COOLDOWN_MS,
  RIVAL_DEFENDER_DAMAGE,
  RIVAL_DEFENDER_HP,
  RIVAL_DEFENDER_RANGE,
  RIVAL_DEFENDER_SPAWN_INTERVAL_MS,
  RIVAL_DEFENDERS_PER_NEST,
  RIVAL_NEST_CAPTURE_FOOD_BONUS,
  RIVAL_NEST_HP_BASE,
  RIVAL_NEST_HP_PER_POWER,
  RIVAL_NEST_RADIUS,
  RIVAL_NEST_REGEN_PER_SEC,
  RIVAL_NEST_RESPAWN_MS,
  RIVAL_NEST_SIEGE_DAMAGE_MULT,
  SOLDIER_ATTACK_COOLDOWN_MS,
  SOLDIER_RANGE,
  stageProfile,
} from './constants.js';
import {
  createHealthBar,
  moveToward,
  removeAnt,
  spawnRivalDefender,
  syncHealthBar,
} from './ants.js';
import { colonyPower, depositFood, soldierDamage } from './economy.js';

/**
 * @typedef {import('./ants.js').Ant} Ant
 * @typedef {import('./economy.js').Economy} Economy
 *
 * @typedef {{
 *   id: number,
 *   mesh: THREE.Group,
 *   marker: THREE.Mesh,
 *   position: THREE.Vector3,
 *   foodStock: number,
 *   depletedUntil: number,
 *   defenders: Ant[],
 *   hp: number,
 *   maxHp: number,
 *   hpBar: THREE.Group,
 *   hpFill: THREE.Mesh,
 *   owned: boolean,
 *   reinforced: boolean,
 *   nextTributeAt: number,
 *   nextDefenderSpawnAt: number,
 *   role: 'nest',
 * }} RivalNest
 *
 * @typedef {{
 *   active: boolean,
 *   nest: RivalNest | null,
 *   raiders: Ant[],
 * }} RaidState
 */

/** @returns {RaidState} */
export function createRaidState() {
  return {
    active: false,
    nest: null,
    raiders: [],
  };
}

/**
 * Place rival nests around the outer ring of the map.
 * @param {THREE.Scene} scene
 * @param {THREE.Group} antGroup
 * @param {number} count
 * @param {Economy} [eco]
 * @returns {RivalNest[]}
 */
export function spawnRivalNests(scene, antGroup, count, eco) {
  /** @type {RivalNest[]} */
  const nests = [];
  const ring = MAP_RADIUS - 3.2;
  const diff = eco
    ? raidDifficulty(eco)
    : {
        defenderCount: RIVAL_DEFENDERS_PER_NEST,
        defenderHp: RIVAL_DEFENDER_HP,
        defenderDamage: RIVAL_DEFENDER_DAMAGE,
        nestHp: RIVAL_NEST_HP_BASE,
      };
  const desert = (eco?.worldStage ?? 1) >= 2;

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + 0.35;
    const x = Math.cos(angle) * ring;
    const z = Math.sin(angle) * ring;
    const position = new THREE.Vector3(x, 0, z);
    const mesh = buildRivalNestMesh(desert);
    mesh.position.copy(position);
    mesh.userData.rivalNestId = i;
    scene.add(mesh);

    const marker = new THREE.Mesh(
      new THREE.RingGeometry(RIVAL_NEST_RADIUS * 0.9, RIVAL_NEST_RADIUS * 1.35, 24),
      new THREE.MeshBasicMaterial({
        color: desert ? 0xd4783a : 0xc45c26,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      }),
    );
    marker.rotation.x = -Math.PI / 2;
    marker.position.set(x, 0.04, z);
    marker.userData.rivalNestId = i;
    scene.add(marker);

    const { bar, fill } = createHealthBar(1.35);
    bar.position.set(x, 2.35, z);
    scene.add(bar);

    /** @type {Ant[]} */
    const defenders = [];
    for (let d = 0; d < diff.defenderCount; d++) {
      defenders.push(
        spawnRivalDefender(antGroup, position, i, {
          hp: diff.defenderHp,
          damage: diff.defenderDamage,
        }),
      );
    }

    /** @type {RivalNest} */
    const nest = {
      id: i,
      mesh,
      marker,
      position,
      foodStock: randomRaidLoot(),
      depletedUntil: 0,
      defenders,
      hp: diff.nestHp,
      maxHp: diff.nestHp,
      hpBar: bar,
      hpFill: fill,
      owned: false,
      reinforced: false,
      nextTributeAt: 0,
      nextDefenderSpawnAt: 0,
      role: 'nest',
    };
    syncHealthBar(nest, 1.35);
    nests.push(nest);
  }
  return nests;
}

function buildRivalNestMesh(desert = false) {
  const nest = new THREE.Group();
  nest.name = 'rivalNest';

  const mound = new THREE.Mesh(
    new THREE.ConeGeometry(RIVAL_NEST_RADIUS, 1.7, 14),
    new THREE.MeshStandardMaterial({
      color: desert ? 0xa67c52 : 0x5c2a1a,
      roughness: 0.95,
    }),
  );
  mound.position.y = 0.85;
  mound.castShadow = true;
  mound.receiveShadow = true;
  nest.add(mound);

  const lip = new THREE.Mesh(
    new THREE.TorusGeometry(RIVAL_NEST_RADIUS * 0.45, 0.14, 8, 16),
    new THREE.MeshStandardMaterial({
      color: desert ? 0x7a5230 : 0x3a1810,
      roughness: 1,
    }),
  );
  lip.rotation.x = Math.PI / 2;
  lip.position.y = 0.15;
  nest.add(lip);

  const hole = new THREE.Mesh(
    new THREE.CircleGeometry(0.4, 14),
    new THREE.MeshBasicMaterial({ color: 0x0a0604 }),
  );
  hole.rotation.x = -Math.PI / 2;
  hole.position.y = 1.55;
  nest.add(hole);

  return nest;
}

/**
 * Remove all rival nest visuals and defenders from the scene.
 * @param {RivalNest[]} nests
 * @param {THREE.Scene} scene
 */
export function clearRivalNests(nests, scene) {
  for (const nest of nests) {
    for (const def of nest.defenders) removeAnt(def);
    nest.defenders = [];
    scene.remove(nest.mesh);
    scene.remove(nest.marker);
    if (nest.hpBar) scene.remove(nest.hpBar);
  }
  nests.length = 0;
}

function randomRaidLoot() {
  return (
    RAID_STEAL_FOOD_MIN +
    Math.floor(Math.random() * (RAID_STEAL_FOOD_MAX - RAID_STEAL_FOOD_MIN + 1))
  );
}

/**
 * Rival difficulty scales with colony power (nest level, soldiers, atk).
 * @param {Economy} eco
 */
export function raidDifficulty(eco) {
  const power = Math.max(1, colonyPower(eco));
  const profile = stageProfile(eco.worldStage ?? 1);
  const scale = 1 + (power - 1) * RAID_SCALE_PER_POWER;
  return {
    power,
    scale,
    defenderCount: Math.min(
      RAID_MAX_DEFENDERS + profile.maxDefendersBonus,
      RIVAL_DEFENDERS_PER_NEST +
        profile.defendersBonus +
        Math.floor((power - 1) * 0.55),
    ),
    defenderHp: Math.round(RIVAL_DEFENDER_HP * scale * profile.defenderHpMult),
    defenderDamage:
      Math.round(
        RIVAL_DEFENDER_DAMAGE * (1 + (power - 1) * 0.1) * profile.defenderDamageMult * 10,
      ) / 10,
    nestHp: Math.round(
      (RIVAL_NEST_HP_BASE + (power - 1) * RIVAL_NEST_HP_PER_POWER) * profile.nestHpMult,
    ),
  };
}

/**
 * @param {RivalNest} nest
 * @param {THREE.Group} antGroup
 * @param {Economy} eco
 * @param {{ maxSpawn?: number }} [opts]
 */
function refillDefenders(nest, antGroup, eco, opts = {}) {
  const diff = raidDifficulty(eco);
  const maxSpawn = opts.maxSpawn ?? Infinity;
  let spawned = 0;
  while (nest.defenders.length < diff.defenderCount && spawned < maxSpawn) {
    nest.defenders.push(
      spawnRivalDefender(antGroup, nest.position, nest.id, {
        hp: diff.defenderHp,
        damage: diff.defenderDamage,
      }),
    );
    spawned += 1;
  }
  // Beef up survivors if the colony got stronger since last fight.
  for (const def of nest.defenders) {
    if (def.maxHp < diff.defenderHp) {
      const ratio = def.hp / Math.max(1, def.maxHp);
      def.maxHp = diff.defenderHp;
      def.hp = Math.max(1, Math.round(def.maxHp * ratio));
      def.attackDamage = diff.defenderDamage;
      syncHealthBar(def);
    } else {
      def.attackDamage = diff.defenderDamage;
    }
  }
}

/**
 * During a raid, spawn at most one replacement defender every few seconds.
 * @param {RivalNest} nest
 * @param {THREE.Group} antGroup
 * @param {Economy} eco
 * @param {number} now
 */
function trySpawnDefenderThrottled(nest, antGroup, eco, now) {
  const diff = raidDifficulty(eco);
  // Keep existing guards scaled, but do not refill the whole nest instantly.
  refillDefenders(nest, antGroup, eco, { maxSpawn: 0 });
  if (nest.defenders.length >= diff.defenderCount) return;
  if (now < nest.nextDefenderSpawnAt) return;
  refillDefenders(nest, antGroup, eco, { maxSpawn: 1 });
  nest.nextDefenderSpawnAt = now + RIVAL_DEFENDER_SPAWN_INTERVAL_MS;
}

/**
 * @param {RivalNest[]} nests
 * @param {THREE.Group} antGroup
 * @param {number} now
 * @param {number} dt
 * @param {number | null} raidingNestId
 * @param {Economy} eco
 */
export function updateRivalNests(nests, antGroup, now, dt, raidingNestId, eco) {
  for (const nest of nests) {
    if (nest.owned) {
      /** @type {THREE.MeshBasicMaterial} */ (nest.marker.material).color.setHex(0x6fbf73);
      /** @type {THREE.MeshBasicMaterial} */ (nest.marker.material).opacity =
        0.45 + Math.sin(now * 0.003 + nest.id) * 0.1;
      nest.hpBar.visible = false;
      if (now >= nest.nextTributeAt) {
        depositFood(eco, CAPTURED_NEST_FOOD_PER_TICK);
        nest.nextTributeAt = now + CAPTURED_NEST_FOOD_TICK_MS;
      }
      continue;
    }

    const ready = nest.hp > 0;
    /** @type {THREE.MeshBasicMaterial} */ (nest.marker.material).opacity = ready
      ? 0.55 + Math.sin(now * 0.004 + nest.id) * 0.12
      : 0.18;
    nest.mesh.scale.setScalar(ready ? 1 : 0.82);

    if (nest.foodStock <= 0 && now >= nest.depletedUntil) {
      nest.foodStock = randomRaidLoot();
      refillDefenders(nest, antGroup, eco);
    } else if (ready) {
      if (raidingNestId === nest.id) {
        // Don't instantly replace every kill — drip new guards in slowly.
        trySpawnDefenderThrottled(nest, antGroup, eco, now);
      } else {
        refillDefenders(nest, antGroup, eco);
      }
    }

    // Creep HP back very slowly when the nest is not under active siege.
    if (ready && raidingNestId !== nest.id && nest.hp < nest.maxHp) {
      nest.hp = Math.min(nest.maxHp, nest.hp + RIVAL_NEST_REGEN_PER_SEC * dt);
    }

    syncHealthBar(nest, 1.35);

    if (raidingNestId === nest.id) continue;

    for (const def of nest.defenders) {
      if (def.hp <= 0) continue;
      def.state = 'defend';
      const a = now * 0.00055 + def.mesh.id;
      const r = RIVAL_NEST_RADIUS + 0.5 + (def.mesh.id % 3) * 0.25;
      moveToward(
        def.mesh,
        new THREE.Vector3(
          nest.position.x + Math.cos(a) * r,
          0,
          nest.position.z + Math.sin(a) * r,
        ),
        def.speed * 0.4,
        dt,
        0.3,
      );
    }
  }
}

/**
 * @param {RivalNest[]} nests
 * @param {number} clientX
 * @param {number} clientY
 * @param {THREE.Camera} camera
 * @param {DOMRect} rect
 * @param {number} maxPx
 * @returns {RivalNest | null}
 */
export function pickRivalNestAtScreen(nests, clientX, clientY, camera, rect, maxPx) {
  const projected = new THREE.Vector3();
  let best = null;
  let bestDist = maxPx;

  for (const nest of nests) {
    if (nest.owned || nest.hp <= 0) continue;
    projected.copy(nest.position).setY(0.9).project(camera);
    if (projected.z < -1 || projected.z > 1) continue;
    const sx = (projected.x * 0.5 + 0.5) * rect.width + rect.left;
    const sy = (-projected.y * 0.5 + 0.5) * rect.height + rect.top;
    const d = Math.hypot(clientX - sx, clientY - sy);
    if (d < bestDist) {
      bestDist = d;
      best = nest;
    }
  }
  return best;
}

/**
 * Start a raid with available patrol soldiers.
 * @param {RaidState} raid
 * @param {RivalNest} nest
 * @param {Ant[]} soldiers
 * @param {number} maxRaiders
 * @returns {number} soldiers sent
 */
/**
 * Start a raid with available patrol soldiers.
 * @param {RaidState} raid
 * @param {RivalNest} nest
 * @param {Ant[]} soldiers
 * @param {number} maxRaiders
 * @param {Economy | null} eco
 * @param {THREE.Group | null} antGroup
 * @returns {number} soldiers sent
 */
export function beginRaid(raid, nest, soldiers, maxRaiders = 2, eco = null, antGroup = null) {
  if (raid.active) return 0;
  if (nest.owned || nest.hp <= 0) return 0;

  if (eco && antGroup) {
    refillDefenders(nest, antGroup, eco);
    // First replacement after a kill waits a full interval.
    nest.nextDefenderSpawnAt = performance.now() + RIVAL_DEFENDER_SPAWN_INTERVAL_MS;
    const diff = raidDifficulty(eco);
    if (nest.maxHp < diff.nestHp) {
      const ratio = nest.hp / Math.max(1, nest.maxHp);
      nest.maxHp = diff.nestHp;
      nest.hp = Math.max(1, Math.round(nest.maxHp * ratio));
      syncHealthBar(nest, 1.35);
    }
  }

  const raiders = [];
  const cap = Math.max(1, Math.floor(maxRaiders));
  for (const soldier of soldiers) {
    if (raiders.length >= cap) break;
    if (soldier.role !== 'soldier') continue;
    if (soldier.state === 'raidOut' || soldier.state === 'raidReturn') continue;
    if (soldier.hp <= 0) continue;
    soldier.state = 'raidOut';
    soldier.targetFood = null;
    soldier.carry = 0;
    raiders.push(soldier);
  }
  if (!raiders.length) return 0;

  raid.active = true;
  raid.nest = nest;
  raid.raiders = raiders;
  return raiders.length;
}

/**
 * @param {RaidState} raid
 * @param {Economy} eco
 * @param {number} dt
 * @param {number} now
 * @param {(loot: number) => void} onLootReturned
 * @param {(dead: Ant) => void} onRaiderKilled
 * @param {(nest: RivalNest) => void} [onNestCaptured]
 * @param {THREE.Group | null} [antGroup]
 * @returns {string | null}
 */
export function updateRaid(
  raid,
  eco,
  dt,
  now,
  onLootReturned,
  onRaiderKilled,
  onNestCaptured = () => {},
  antGroup = null,
) {
  if (!raid.active || !raid.nest) return null;

  const nest = raid.nest;
  const target = nest.position;
  let tip = null;

  // Defenders fight nearby raiders
  for (const def of nest.defenders) {
    if (def.hp <= 0) continue;
    def.attackCd = Math.max(0, def.attackCd - dt * 1000);

    let nearest = null;
    let nearestDist = Infinity;
    for (const raider of raid.raiders) {
      if (raider.hp <= 0) continue;
      const d = def.mesh.position.distanceTo(raider.mesh.position);
      if (d < nearestDist) {
        nearestDist = d;
        nearest = raider;
      }
    }

    if (nearest && nearestDist <= RIVAL_DEFENDER_RANGE * 1.7) {
      def.state = 'fight';
      moveToward(def.mesh, nearest.mesh.position, def.speed, dt, 0.5);
      if (nearestDist <= RIVAL_DEFENDER_RANGE && def.attackCd <= 0) {
        nearest.hp -= def.attackDamage ?? RIVAL_DEFENDER_DAMAGE;
        syncHealthBar(nearest);
        def.attackCd = RIVAL_DEFENDER_ATTACK_COOLDOWN_MS;
      }
    } else {
      def.state = 'defend';
    }
  }

  // Raiders: fight defenders, then siege the nest hole / steal food
  for (const soldier of raid.raiders) {
    if (soldier.hp <= 0) continue;
    soldier.attackCd = Math.max(0, soldier.attackCd - dt * 1000);

    const livingDefs = nest.defenders.filter((d) => d.hp > 0);
    let nearestDef = null;
    let nearestDefDist = Infinity;
    for (const def of livingDefs) {
      const d = soldier.mesh.position.distanceTo(def.mesh.position);
      if (d < nearestDefDist) {
        nearestDefDist = d;
        nearestDef = def;
      }
    }

    if (soldier.state === 'raidOut') {
      if (nearestDef && nearestDefDist <= SOLDIER_RANGE * 1.8) {
        moveToward(soldier.mesh, nearestDef.mesh.position, RAID_SOLDIER_SPEED, dt, 0.5);
        if (nearestDefDist <= SOLDIER_RANGE && soldier.attackCd <= 0) {
          nearestDef.hp -= soldierDamage(eco);
          syncHealthBar(nearestDef);
          soldier.attackCd = SOLDIER_ATTACK_COOLDOWN_MS;
        }
      } else {
        const arrived = moveToward(
          soldier.mesh,
          target,
          RAID_SOLDIER_SPEED,
          dt,
          RIVAL_NEST_RADIUS * 0.7,
        );
        if (arrived && livingDefs.length === 0) {
          // Steal remaining food once, then keep sieging the hole.
          if (nest.foodStock > 0 && soldier.carry <= 0) {
            const take = Math.max(
              1,
              Math.floor(nest.foodStock / Math.max(1, raid.raiders.filter((r) => r.hp > 0).length)),
            );
            const loot = Math.min(nest.foodStock, take);
            nest.foodStock -= loot;
            soldier.carry = loot;
          }

          if (soldier.attackCd <= 0 && nest.hp > 0) {
            const dmg = Math.max(1, soldierDamage(eco) * RIVAL_NEST_SIEGE_DAMAGE_MULT);
            nest.hp = Math.max(0, nest.hp - dmg);
            syncHealthBar(nest, 1.35);
            soldier.attackCd = SOLDIER_ATTACK_COOLDOWN_MS * 1.35;
            soldier.carry = soldier.carry || 0;
            // @ts-ignore — temporary siege counter on ant
            soldier.siegeHits = (soldier.siegeHits || 0) + 1;

            if (!nest.reinforced && nest.hp <= nest.maxHp * 0.5 && antGroup) {
              nest.reinforced = true;
              const diff = raidDifficulty(eco);
              for (let i = 0; i < 2; i++) {
                nest.defenders.push(
                  spawnRivalDefender(antGroup, nest.position, nest.id, {
                    hp: Math.round(diff.defenderHp * 1.15),
                    damage: diff.defenderDamage * 1.1,
                  }),
                );
              }
              tip = 'The rival nest called reinforcements! Keep sieging!';
            }
          }

          // @ts-ignore
          const hits = soldier.siegeHits || 0;
          if (nest.hp <= 0) {
            captureRivalNest(nest, eco, now);
            onNestCaptured(nest);
            if (soldier.carry > 0) {
              onLootReturned(soldier.carry);
              soldier.carry = 0;
            }
            // @ts-ignore
            soldier.siegeHits = 0;
            soldier.state = 'raidReturn';
            tip = 'Nest conquered! It now tributes food to your colony.';
          } else if (hits >= 8) {
            // Chip damage over many raids — takeovers stay rare and hard.
            // @ts-ignore
            soldier.siegeHits = 0;
            soldier.state = 'raidReturn';
          }
        }
      }
    } else if (soldier.state === 'raidReturn') {
      if (nearestDef && nearestDefDist <= SOLDIER_RANGE * 1.4) {
        moveToward(soldier.mesh, nearestDef.mesh.position, RAID_SOLDIER_SPEED, dt, 0.5);
        if (nearestDefDist <= SOLDIER_RANGE && soldier.attackCd <= 0) {
          nearestDef.hp -= soldierDamage(eco);
          syncHealthBar(nearestDef);
          soldier.attackCd = SOLDIER_ATTACK_COOLDOWN_MS;
        }
      } else {
        const home = new THREE.Vector3(0, 0, 0);
        const arrived = moveToward(soldier.mesh, home, RAID_SOLDIER_SPEED, dt, 1.2);
        if (arrived) {
          if (soldier.carry > 0) {
            onLootReturned(soldier.carry);
            soldier.carry = 0;
          }
          soldier.state = 'patrol';
        }
      }
    }
  }

  // Remove dead defenders
  const aliveDefs = [];
  for (const def of nest.defenders) {
    if (def.hp <= 0) removeAnt(def);
    else aliveDefs.push(def);
  }
  nest.defenders = aliveDefs;

  // Remove dead raiders
  const aliveRaiders = [];
  for (const raider of raid.raiders) {
    if (raider.hp <= 0) {
      removeAnt(raider);
      onRaiderKilled(raider);
    } else {
      aliveRaiders.push(raider);
    }
  }
  raid.raiders = aliveRaiders;

  if (nest.owned) {
    for (const soldier of raid.raiders) {
      if (soldier.state === 'raidOut') soldier.state = 'raidReturn';
    }
  }

  if (raid.raiders.length === 0) {
    raid.active = false;
    raid.nest = null;
    tip = tip || 'Raid failed — your soldiers were defeated. Waves can hit your nest again.';
    return tip;
  }

  const stillOut = raid.raiders.some(
    (s) => s.state === 'raidOut' || s.state === 'raidReturn',
  );
  if (!stillOut) {
    if (!nest.owned && nest.foodStock <= 0) {
      nest.depletedUntil = now + RIVAL_NEST_RESPAWN_MS;
    }
    raid.active = false;
    raid.nest = null;
    raid.raiders = [];
    tip =
      tip ||
      (nest.owned
        ? 'Raid complete — nest secured for your colony!'
        : 'Raid complete! Keep hammering nest HP on future raids to take it over.');
  }
  return tip;
}

/**
 * @param {RivalNest} nest
 * @param {Economy} eco
 * @param {number} now
 */
function captureRivalNest(nest, eco, now) {
  nest.owned = true;
  nest.hp = 0;
  nest.foodStock = 0;
  nest.hpBar.visible = false;
  for (const def of nest.defenders) removeAnt(def);
  nest.defenders = [];
  depositFood(eco, RIVAL_NEST_CAPTURE_FOOD_BONUS);
  nest.nextTributeAt = now + CAPTURED_NEST_FOOD_TICK_MS;

  nest.mesh.traverse((obj) => {
    if (obj instanceof THREE.Mesh && obj.material && 'color' in obj.material) {
      const mat = /** @type {THREE.MeshStandardMaterial} */ (obj.material);
      if (mat.color) mat.color.setHex(0x6b8f3a);
    }
  });
  /** @type {THREE.MeshBasicMaterial} */ (nest.marker.material).color.setHex(0x6fbf73);
}

/**
 * Keep nest HP bars facing the camera.
 * @param {RivalNest[]} nests
 * @param {THREE.Camera} camera
 */
export function billboardRivalNestBars(nests, camera) {
  for (const nest of nests) {
    if (nest.owned || !nest.hpBar?.visible) continue;
    nest.hpBar.position.set(nest.position.x, 2.35, nest.position.z);
    nest.hpBar.quaternion.copy(camera.quaternion);
  }
}

/** @param {RivalNest[]} nests */
export function allRivalDefenders(nests) {
  return nests.flatMap((n) => n.defenders);
}

/** @param {Ant[]} soldiers */
export function idleRaidSoldiers(soldiers) {
  return soldiers.filter(
    (s) =>
      s.role === 'soldier' &&
      s.hp > 0 &&
      s.state !== 'raidOut' &&
      s.state !== 'raidReturn',
  ).length;
}
