import * as THREE from 'three';
import { buildCharacter, animateWalk } from './characters.js';
import { pushOut } from './collision.js';
import { ZOMBIE_TYPES } from './constants.js';

/**
 * @typedef {{
 *  kind: 'zombie', type: any, mesh: THREE.Group, ch: any, hp: number, hpMax: number,
 *  radius: number, alive: boolean, dying: number, gone: boolean, stun: number,
 *  hitT: number, kx: number, kz: number, phase: number, attackCd: number,
 *  stompT: number, lunge: number, spawnT: number, base: number, coins: number,
 * }} Zombie
 */

const DIE_TIME = 0.38;

/**
 * @param {THREE.Group} group @param {string} typeId @param {{x:number,z:number}} pos
 * @returns {Zombie}
 */
export function spawnZombie(group, typeId, pos) {
  const type = ZOMBIE_TYPES[typeId];
  const ch = buildCharacter({
    skin: type.skin,
    shirt: type.shirt,
    pants: type.pants,
    hat: type.hat,
    extra: type.extra,
    scale: type.scale,
    gait: type.gait,
    zombie: true,
  });
  ch.root.position.set(pos.x, 0, pos.z);
  ch.root.scale.setScalar(0.01);
  group.add(ch.root);
  return {
    kind: 'zombie',
    type,
    mesh: ch.root,
    ch,
    hp: type.hp,
    hpMax: type.hp,
    radius: 0.62 * type.scale,
    alive: true,
    dying: 0,
    gone: false,
    stun: 0,
    hitT: 0,
    kx: 0,
    kz: 0,
    phase: Math.random() * 10,
    attackCd: 0.5,
    stompT: Math.random() * 2,
    lunge: 0,
    spawnT: 0,
    base: type.scale,
    coins: type.coins,
    behavior: type.behavior || '',
    woke: type.behavior !== 'sleepy',
    hopT: Math.random() * 1.6,
    throwCd: 3 + Math.random() * 2,
    zzzT: Math.random() * 2,
  };
}

/**
 * Damage a zombie. Returns true if it was just defeated (poofs into confetti).
 * @param {Zombie} z
 */
export function hurtZombie(z, dmg, from, knock, stun = 0) {
  if (!z.alive) return false;
  z.hp -= dmg;
  z.hitT = 1;
  z.woke = true;
  const dx = z.mesh.position.x - from.x;
  const dz = z.mesh.position.z - from.z;
  const d = Math.hypot(dx, dz) || 1;
  const k = knock / Math.max(0.8, z.base * 0.9);
  z.kx += (dx / d) * k;
  z.kz += (dz / d) * k;
  if (stun) z.stun = Math.max(z.stun, stun);
  if (z.hp <= 0) {
    z.alive = false;
    z.dying = 0.0001;
    return true;
  }
  return false;
}

/** Poof everything instantly (used for boss transitions). */
export function poofAll(zombies) {
  for (const z of zombies) {
    if (z.alive) {
      z.alive = false;
      z.dying = 0.0001;
    }
  }
}

/**
 * @param {Zombie[]} zombies
 * @param {{x:number,z:number}} target where zombies walk to
 * @param {number} dt
 * @param {number} t
 * @param {any} map
 * @param {{ bonk: (z: Zombie) => void, stomp: (z: Zombie) => void }} cb
 */
export function updateZombies(zombies, target, dt, t, map, cb) {
  for (const z of zombies) {
    const m = z.mesh;
    if (z.gone) continue;

    if (z.dying > 0) {
      z.dying += dt;
      const p = Math.min(1, z.dying / DIE_TIME);
      m.rotation.y += 14 * dt;
      m.scale.setScalar(z.base * (1 + 0.35 * Math.sin(p * Math.PI)) * (1 - p * p));
      m.position.y = (z.behavior === 'float' ? 1.4 : 0) + Math.sin(p * Math.PI) * 1.2;
      if (p >= 1) {
        z.gone = true;
        m.parent?.remove(m);
      }
      continue;
    }

    // Pop-in.
    if (z.spawnT < 1) {
      z.spawnT = Math.min(1, z.spawnT + dt * 3);
      const s = z.spawnT;
      m.scale.setScalar(z.base * (s < 1 ? s * (1 + Math.sin(s * Math.PI) * 0.3) : 1));
      animateWalk(z.ch, t + z.phase, 0);
      continue;
    }

    z.attackCd = Math.max(0, z.attackCd - dt);
    z.stun = Math.max(0, z.stun - dt);
    z.hitT = Math.max(0, z.hitT - dt * 5);
    z.lunge = Math.max(0, z.lunge - dt * 3);

    const dx = target.x - m.position.x;
    const dz = target.z - m.position.z;
    const dist = Math.hypot(dx, dz) || 1;
    const reach = z.radius + 0.6 + 0.45;
    const slow = z.stun > 0 ? 0.2 : 1;
    let moveAmt = 0;

    // Sleepyhead snoozes until you get close.
    if (!z.woke) {
      if (dist < 7) {
        z.woke = true;
        cb.wake?.(z);
      } else {
        z.zzzT -= dt;
        if (z.zzzT <= 0) {
          z.zzzT = 2.2;
          cb.zzz?.(z);
        }
        animateWalk(z.ch, t + z.phase, 0);
        z.ch.rig.rotation.x = 0.28;
        z.ch.head.rotation.z = 0.3;
        m.scale.set(z.base * (1 + 0.22 * z.hitT), z.base * (1 - 0.25 * z.hitT), z.base * (1 + 0.22 * z.hitT));
        z.hitT = Math.max(0, z.hitT - dt * 5);
        continue;
      }
    }
    z.ch.rig.rotation.x = 0;

    let speedMul = 1;
    let holdBack = false;
    if (z.behavior === 'hop') {
      z.hopT += dt;
      const cyc = z.hopT % 1.7;
      if (cyc < 0.6) {
        speedMul = 3.0;
        m.position.y = Math.sin((cyc / 0.6) * Math.PI) * 1.4;
      } else {
        speedMul = 0.1;
        m.position.y = 0;
      }
    } else if (z.behavior === 'float') {
      m.position.y = 1.4 + Math.sin(t * 2 + z.phase) * 0.25;
      z.ch.disc.position.y = -m.position.y / z.base + 0.03;
    } else if (z.behavior === 'thrower') {
      z.throwCd -= dt;
      if (dist < 9) holdBack = true;
      if (z.throwCd <= 0 && dist < 15 && z.stun <= 0) {
        z.throwCd = 4.5;
        z.lunge = 1;
        cb.throwGoo?.(z);
      }
    }

    if (!holdBack && dist > reach * 0.8) {
      const sp = z.type.speed * slow * speedMul;
      m.position.x += (dx / dist) * sp * dt;
      m.position.z += (dz / dist) * sp * dt;
      moveAmt = slow === 1 ? 1 : 0.3;
    }
    m.position.x += z.kx * dt;
    m.position.z += z.kz * dt;
    const decay = Math.exp(-7 * dt);
    z.kx *= decay;
    z.kz *= decay;

    // Face the target (smoothed).
    const want = Math.atan2(dx, dz);
    let diff = want - m.rotation.y;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    m.rotation.y += diff * Math.min(1, dt * 10);

    // Bonk attack.
    if (dist < reach && z.attackCd <= 0 && z.stun <= 0) {
      z.attackCd = 1.1;
      z.lunge = 1;
      cb.bonk(z);
    }

    // Bruiser stomp.
    if (z.type.id === 'bruiser') {
      z.stompT += dt;
      if (z.stompT > 2.3) {
        z.stompT = 0;
        cb.stomp(z);
      }
    }

    // Animation.
    animateWalk(z.ch, t + z.phase, moveAmt);
    if (z.stun > 0) {
      z.ch.head.rotation.z = Math.sin(t * 14) * 0.35;
      z.ch.pupils[0].position.x = Math.sin(t * 12) * 0.05;
      z.ch.pupils[1].position.x = -Math.sin(t * 12) * 0.05;
    }
    z.ch.rig.position.z = z.lunge * 0.5;
    const sq = z.hitT;
    m.scale.set(z.base * (1 + 0.22 * sq), z.base * (1 - 0.25 * sq), z.base * (1 + 0.22 * sq));

    pushOut(m.position, z.radius, map.obstacles, map.bounds);
  }

  // Keep zombies from stacking on top of each other.
  for (let i = 0; i < zombies.length; i++) {
    const a = zombies[i];
    if (!a.alive || a.spawnT < 1) continue;
    for (let j = i + 1; j < zombies.length; j++) {
      const b = zombies[j];
      if (!b.alive || b.spawnT < 1) continue;
      const dx = b.mesh.position.x - a.mesh.position.x;
      const dz = b.mesh.position.z - a.mesh.position.z;
      const min = (a.radius + b.radius) * 0.9;
      const d2 = dx * dx + dz * dz;
      if (d2 < min * min && d2 > 1e-6) {
        const d = Math.sqrt(d2);
        const push = (min - d) * 0.5;
        a.mesh.position.x -= (dx / d) * push;
        a.mesh.position.z -= (dz / d) * push;
        b.mesh.position.x += (dx / d) * push;
        b.mesh.position.z += (dz / d) * push;
      }
    }
  }
}
