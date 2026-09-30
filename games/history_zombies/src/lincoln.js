import * as THREE from 'three';
import { buildCharacter, animateWalk, makeStovepipe } from './characters.js';
import { pushOut } from './collision.js';

/**
 * Zombie Abe Lincoln: tall, dignified, and he attacks by throwing his top hat
 * like a boomerang. States: intro -> fight -> leaving
 * @param {THREE.Group} group @param {{x:number,z:number}} pos
 */
export function createAbe(group, pos) {
  const ch = buildCharacter({
    skin: 0xa6dc8a,
    shirt: 0x1b1b24,
    pants: 0x1b1b24,
    hat: ['stovepipe', 'beard'],
    extra: 'tie',
    scale: 2.15,
    gait: 4,
    zombie: true,
    cast: true,
  });
  ch.root.position.set(pos.x, 0, pos.z);
  group.add(ch.root);
  const hatMesh = ch.head.getObjectByName('stovepipe');
  return {
    kind: 'boss',
    id: 'abe',
    mesh: ch.root,
    ch,
    hatMesh,
    hasHat: true,
    hp: 700,
    hpMax: 700,
    radius: 1.3,
    alive: false,
    state: 'intro',
    stateT: 0,
    hitT: 0,
    hatCd: 2,
    summonCd: 12,
    lunge: 0,
    base: 2.15,
  };
}

/**
 * @param {any} a @param {number} dt @param {number} t
 * @param {{ player: {x:number,z:number}, map: any, summon: (c: THREE.Vector3) => void, throwHat: (a: any, spread: number, primary: boolean) => void }} env
 * @returns {boolean} true when Abe is completely finished (remove him)
 */
export function updateAbe(a, dt, t, env) {
  const m = a.mesh;
  a.stateT += dt;
  a.hitT = Math.max(0, a.hitT - dt * 5);
  a.lunge = Math.max(0, a.lunge - dt * 2.5);
  const dx = env.player.x - m.position.x;
  const dz = env.player.z - m.position.z;
  const dist = Math.hypot(dx, dz) || 1;
  const face = () => {
    const want = Math.atan2(dx, dz);
    const diff = Math.atan2(Math.sin(want - m.rotation.y), Math.cos(want - m.rotation.y));
    m.rotation.y += diff * Math.min(1, dt * 6);
  };

  if (a.state === 'intro') {
    face();
    animateWalk(a.ch, t, 0);
    // Dramatic hat tip.
    const s = Math.min(1, a.stateT / 1.4);
    a.ch.armR.rotation.x = -2.6 * s;
    a.ch.head.rotation.x = 0.25 * Math.sin(s * Math.PI);
    if (a.hatMesh) a.hatMesh.position.y = 0.4 + Math.sin(s * Math.PI) * 0.3;
    return false;
  }

  if (a.state === 'fight') {
    if (a.hatMesh) a.hatMesh.position.y = 0.4;
    const phase2 = a.hp < a.hpMax * 0.5;
    face();
    a.hatCd -= dt;
    a.summonCd -= dt;
    // Keeps a comfortable throwing distance.
    let move = 0;
    const speed = phase2 ? 3.6 : 2.8;
    if (dist > 10) {
      m.position.x += (dx / dist) * speed * dt;
      m.position.z += (dz / dist) * speed * dt;
      move = 1;
    } else if (dist < 5.5) {
      m.position.x -= (dx / dist) * speed * 0.9 * dt;
      m.position.z -= (dz / dist) * speed * 0.9 * dt;
      move = 0.7;
    }
    if (a.hatCd <= 0 && a.hasHat) {
      a.hatCd = phase2 ? 2.4 : 3.6;
      a.lunge = 1;
      a.hasHat = false;
      if (a.hatMesh) a.hatMesh.visible = false;
      env.throwHat(a, 0, true);
      if (phase2) {
        env.throwHat(a, 0.42, false);
        env.throwHat(a, -0.42, false);
      }
    }
    if (a.summonCd <= 0) {
      a.summonCd = phase2 ? 11 : 16;
      env.summon(m.position);
    }
    animateWalk(a.ch, t, move);
    // Throwing arm.
    if (a.lunge > 0) a.ch.armR.rotation.x = -1.2 - a.lunge * 1.6;
    a.ch.rig.position.z = a.lunge * 0.5;
    const sq = a.hitT;
    m.scale.set(a.base * (1 + 0.1 * sq), a.base * (1 - 0.14 * sq), a.base * (1 + 0.1 * sq));
    pushOut(m.position, a.radius, env.map.obstacles, env.map.bounds);
    return false;
  }

  if (a.state === 'leaving') {
    // Tips his hat, bounces happily, and shrinks away in a sparkle.
    const p = Math.min(1, a.stateT / 2.2);
    if (a.hatMesh) {
      a.hatMesh.visible = true;
      a.hatMesh.position.y = 0.4 + Math.abs(Math.sin(a.stateT * 8)) * 0.4 * (1 - p);
    }
    a.ch.skinMat.color.lerp(new THREE.Color(0xffd2a8), Math.min(1, dt * 2.5));
    animateWalk(a.ch, t, 0);
    a.ch.armR.rotation.x = -2.6;
    m.position.y = Math.abs(Math.sin(a.stateT * 6)) * 0.9;
    m.rotation.y += dt * (2 + p * 14);
    m.scale.setScalar(a.base * (p < 0.7 ? 1 : 1 - (p - 0.7) / 0.3));
    if (p >= 1) {
      m.parent?.remove(m);
      return true;
    }
  }
  return false;
}

// ---------------------------------------------------------------- flying hats

/**
 * A stovepipe hat boomerang. Flies toward where the player was, then homes back.
 * @param {THREE.Group} group @param {any} owner @param {{x:number,z:number}} target
 */
export function makeHat(group, owner, target, spread, primary) {
  const mesh = makeStovepipe();
  mesh.position.set(owner.mesh.position.x, 3.6, owner.mesh.position.z);
  mesh.scale.setScalar(owner.base * 0.65);
  group.add(mesh);
  const ang = Math.atan2(target.x - owner.mesh.position.x, target.z - owner.mesh.position.z) + spread;
  const dist = Math.hypot(target.x - owner.mesh.position.x, target.z - owner.mesh.position.z);
  return {
    mesh,
    owner,
    primary,
    vx: Math.sin(ang) * 17,
    vz: Math.cos(ang) * 17,
    out: true,
    travel: 0,
    maxTravel: Math.min(24, dist + 7),
    hit: false,
    y: 3.6,
  };
}

/**
 * @param {any[]} hats @param {number} dt
 * @param {{ player: {x:number,z:number}, bonk: (dmg: number) => void, sparkle: (p: THREE.Vector3) => void }} env
 */
export function updateHats(hats, dt, env) {
  const live = [];
  for (const h of hats) {
    const p = h.mesh.position;
    if (h.out) {
      p.x += h.vx * dt;
      p.z += h.vz * dt;
      h.travel += 17 * dt;
      if (h.travel >= h.maxTravel) {
        h.out = false;
        h.hit = false;
      }
    } else {
      const o = h.owner.mesh.position;
      const dx = o.x - p.x;
      const dz = o.z - p.z;
      const d = Math.hypot(dx, dz) || 1;
      p.x += (dx / d) * 21 * dt;
      p.z += (dz / d) * 21 * dt;
      if (d < 1.6) {
        h.mesh.parent?.remove(h.mesh);
        if (h.primary) {
          h.owner.hasHat = true;
          if (h.owner.hatMesh) h.owner.hatMesh.visible = true;
          h.owner.hatCd = Math.max(h.owner.hatCd, 1.2);
        }
        continue;
      }
    }
    // Flying height eases from throw height down to the hero's chest level.
    p.y = h.y = 1.5 + Math.sin(h.travel * 0.4) * 0.15 + (h.out ? Math.max(0, 2 - h.travel * 0.3) : 0);
    h.mesh.rotation.y += dt * 20;
    h.mesh.rotation.x = 0.15;
    // Hits the hero if they are in the way (once per leg).
    if (!h.hit) {
      const d = Math.hypot(env.player.x - p.x, env.player.z - p.z);
      if (d < 1.2) {
        h.hit = true;
        env.bonk(12);
        env.sparkle(p);
      }
    }
    live.push(h);
  }
  hats.length = 0;
  hats.push(...live);
}
