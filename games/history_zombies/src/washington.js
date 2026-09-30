import * as THREE from 'three';
import { buildCharacter, animateWalk } from './characters.js';
import { pushOut } from './collision.js';

const std = (color, extra = {}) =>
  new THREE.MeshStandardMaterial({ color, roughness: 0.5, ...extra });

const GEORGE = {
  shirt: 0x1f4fb8,
  pants: 0xf3ead2,
  hat: ['wig', 'tricorn'],
  extra: 'coat',
};
const ZOMBIE_GREEN = new THREE.Color(0x9be08a);
const PEACH = new THREE.Color(0xffd2a8);

/**
 * Zombie George Washington: oversized, goofy, and secretly a big softie.
 * States: sleep -> intro -> fight -> weak -> curing -> ally
 * @param {THREE.Group} group @param {{x:number,z:number}} pos
 */
export function createBoss(group, pos) {
  const ch = buildCharacter({ skin: 0x9be08a, ...GEORGE, scale: 2.0, gait: 4, zombie: true });
  ch.root.position.set(pos.x, 0, pos.z);
  ch.root.rotation.y = 0;
  group.add(ch.root);
  return {
    kind: 'boss',
    mesh: ch.root,
    ch,
    hp: 450,
    hpMax: 450,
    radius: 1.35,
    alive: false, // targetable only during the fight
    state: 'sleep',
    hitT: 0,
    attackCd: 1.5,
    pieCd: 3,
    summonCd: 9,
    stompCd: 4,
    lunge: 0,
    stateT: 0,
    zzzT: 0,
    hasTonic: false,
    base: 2.0,
  };
}

/** Cure meter 0..1 mirrors lost HP. */
export const cureMeter = (b) => 1 - b.hp / b.hpMax;

/**
 * @param {any} b @param {number} dmg @param {THREE.Vector3} from
 */
export function hurtBoss(b, dmg, from, knock) {
  if (b.state !== 'fight') return false;
  b.hp = Math.max(0, b.hp - dmg);
  b.hitT = 1;
  const dx = b.mesh.position.x - from.x;
  const dz = b.mesh.position.z - from.z;
  const d = Math.hypot(dx, dz) || 1;
  b.mesh.position.x += (dx / d) * knock * 0.05;
  b.mesh.position.z += (dz / d) * knock * 0.05;
  return b.hp <= 0;
}

/**
 * @param {any} b @param {number} dt @param {number} t
 * @param {{
 *  player: {x:number,z:number}, map: any,
 *  bonk: (dmg: number) => void, throwPie: (from: THREE.Vector3, to: {x:number,z:number}) => void,
 *  summon: (center: THREE.Vector3) => void, stomp: (b: any) => void, wake: () => void
 * }} env
 */
export function updateBoss(b, dt, t, env) {
  const m = b.mesh;
  b.stateT += dt;
  b.hitT = Math.max(0, b.hitT - dt * 5);
  b.lunge = Math.max(0, b.lunge - dt * 3);
  const dx = env.player.x - m.position.x;
  const dz = env.player.z - m.position.z;
  const dist = Math.hypot(dx, dz) || 1;

  if (b.state === 'sleep') {
    // Snoozing behind the mansion, face-down-ish and snoring.
    animateWalk(b.ch, t, 0);
    b.ch.rig.rotation.x = 0.35 + Math.sin(t * 1.5) * 0.04;
    b.ch.armL.rotation.x = 0.4;
    b.ch.armR.rotation.x = 0.4;
    b.ch.head.rotation.z = 0.35;
    b.ch.pupils.forEach((p) => (p.position.y = -0.03));
    b.zzzT += dt;
    if (dist < 13) env.wake();
    return;
  }

  b.ch.rig.rotation.x = 0;
  b.ch.pupils.forEach((p) => (p.position.y = 0));
  if (b.state === 'intro') {
    animateWalk(b.ch, t, 0);
    m.rotation.y += (Math.atan2(dx, dz) - m.rotation.y) * Math.min(1, dt * 4);
    // Big stretch and roar.
    const s = Math.min(1, b.stateT / 1.2);
    b.ch.armL.rotation.x = -1.35 - s * 1.2;
    b.ch.armR.rotation.x = -1.35 - s * 1.2;
    b.ch.head.rotation.x = -0.3 * s;
    return;
  }

  if (b.state === 'fight') {
    const phase2 = b.hp < b.hpMax * 0.5;
    b.attackCd -= dt;
    b.pieCd -= dt;
    b.summonCd -= dt;
    b.stompCd -= dt;
    const want = Math.atan2(dx, dz);
    let diff = Math.atan2(Math.sin(want - m.rotation.y), Math.cos(want - m.rotation.y));
    m.rotation.y += diff * Math.min(1, dt * 6);

    const speed = phase2 ? 3.4 : 2.4;
    const reach = b.radius + 1.1;
    let move = 0;
    if (dist > reach * 0.85) {
      m.position.x += (dx / dist) * speed * dt;
      m.position.z += (dz / dist) * speed * dt;
      move = 1;
    }
    if (dist < reach && b.attackCd <= 0) {
      b.attackCd = phase2 ? 1.0 : 1.4;
      b.lunge = 1;
      env.bonk(14);
    }
    if (b.pieCd <= 0 && dist > 4.5) {
      b.pieCd = phase2 ? 2.2 : 3.4;
      b.lunge = 0.8;
      const from = m.position.clone();
      from.y = 3.5;
      env.throwPie(from, env.player);
    }
    if (b.summonCd <= 0) {
      b.summonCd = phase2 ? 8 : 12;
      env.summon(m.position);
    }
    if (b.stompCd <= 0) {
      b.stompCd = 3.5;
      env.stomp(b);
    }
    animateWalk(b.ch, t, move);
    b.ch.rig.position.z = b.lunge * 0.7;
    const sq = b.hitT;
    m.scale.set(b.base * (1 + 0.12 * sq), b.base * (1 - 0.15 * sq), b.base * (1 + 0.12 * sq));
    pushOut(m.position, b.radius, env.map.obstacles, env.map.bounds);
    return;
  }

  if (b.state === 'weak') {
    // Dizzy and sitting on the lawn waiting for a cure.
    animateWalk(b.ch, t, 0);
    b.ch.rig.position.y = -0.55;
    b.ch.legL.rotation.x = -1.4;
    b.ch.legR.rotation.x = -1.4;
    b.ch.armL.rotation.x = 0.2;
    b.ch.armR.rotation.x = 0.2;
    b.ch.head.rotation.z = Math.sin(t * 3) * 0.3;
    b.ch.head.rotation.x = 0.25;
    b.ch.pupils[0].position.x = Math.sin(t * 8) * 0.05;
    b.ch.pupils[1].position.x = -Math.sin(t * 8) * 0.05;
    m.scale.setScalar(b.base);
    return;
  }

  if (b.state === 'curing') {
    // Spin and bounce, fading from zombie green to healthy peach.
    const p = Math.min(1, b.stateT / 3);
    m.rotation.y += dt * (4 + p * 16);
    m.position.y = Math.abs(Math.sin(b.stateT * 5)) * 1.2 * p;
    b.ch.skinMat.color.copy(ZOMBIE_GREEN).lerp(PEACH, p);
    animateWalk(b.ch, t, 0);
    b.ch.armL.rotation.x = -2.6;
    b.ch.armR.rotation.x = -2.6;
    const s = b.base * (1 + Math.sin(p * Math.PI) * 0.25);
    m.scale.setScalar(s);
  }
}

// ---------------- Pies and puddles ----------------

const pieGeo = new THREE.SphereGeometry(0.55, 12, 10);
const pieMat = new THREE.MeshStandardMaterial({ color: 0x4a6fe8, roughness: 0.4, emissive: 0x1a2a88, emissiveIntensity: 0.4 });

/** Blueberry pies (harmless goo that slows you down). */
export function makePie(group, from, to) {
  const mesh = new THREE.Mesh(pieGeo, pieMat);
  mesh.position.copy(from);
  group.add(mesh);
  const dist = Math.hypot(to.x - from.x, to.z - from.z);
  return { mesh, from: from.clone(), to: { x: to.x, z: to.z }, t: 0, dur: 0.5 + dist / 22 };
}

/**
 * @returns {{x:number,z:number}[]} landing spots this frame
 */
export function updatePies(pies, dt, group, puddles) {
  const live = [];
  const landed = [];
  for (const p of pies) {
    p.t += dt;
    const k = Math.min(1, p.t / p.dur);
    p.mesh.position.x = p.from.x + (p.to.x - p.from.x) * k;
    p.mesh.position.z = p.from.z + (p.to.z - p.from.z) * k;
    p.mesh.position.y = p.from.y * (1 - k) + Math.sin(k * Math.PI) * 5 + 0.4;
    p.mesh.rotation.x += dt * 8;
    if (k >= 1) {
      p.mesh.parent?.remove(p.mesh);
      const pud = new THREE.Mesh(
        new THREE.CircleGeometry(2.3, 24),
        new THREE.MeshBasicMaterial({ color: 0x5b7dff, transparent: true, opacity: 0.55, depthWrite: false }),
      );
      pud.rotation.x = -Math.PI / 2;
      pud.position.set(p.to.x, 0.07, p.to.z);
      group.add(pud);
      puddles.push({ mesh: pud, x: p.to.x, z: p.to.z, r: 2.3, life: 6 });
      landed.push(p.to);
    } else {
      live.push(p);
    }
  }
  pies.length = 0;
  pies.push(...live);

  for (let i = puddles.length - 1; i >= 0; i--) {
    const pd = puddles[i];
    pd.life -= dt;
    pd.mesh.material.opacity = Math.min(0.55, pd.life * 0.4);
    if (pd.life <= 0) {
      pd.mesh.parent?.remove(pd.mesh);
      pd.mesh.material.dispose();
      puddles.splice(i, 1);
    }
  }
  return landed;
}

// ---------------- Liberty Tonic ----------------

export function createTonic(group, pos) {
  const g = new THREE.Group();
  const bottle = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 0.8, 12), std(0x6ee7ff, { transparent: true, opacity: 0.8, emissive: 0x2299cc, emissiveIntensity: 0.7 }));
  bottle.position.y = 0.4;
  g.add(bottle);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.2, 0.35, 10), std(0x6ee7ff, { transparent: true, opacity: 0.8, emissive: 0x2299cc }));
  neck.position.y = 0.95;
  g.add(neck);
  const cork = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.15, 8), std(0xb98850));
  cork.position.y = 1.2;
  g.add(cork);
  const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.22), std(0xffe14a, { emissive: 0xffc400, emissiveIntensity: 0.9 }));
  star.position.y = 0.45;
  star.scale.z = 0.4;
  g.add(star);
  const beacon = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.5, 14, 12, 1, true),
    new THREE.MeshBasicMaterial({ color: 0x8be9ff, transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false }),
  );
  beacon.position.y = 7;
  g.add(beacon);
  g.position.set(pos.x, 0, pos.z);
  group.add(g);
  return { mesh: g, star, x: pos.x, z: pos.z };
}

export function updateTonic(tn, t) {
  tn.mesh.position.y = 0.4 + Math.sin(t * 3) * 0.15;
  tn.mesh.rotation.y = t * 1.6;
  tn.star.rotation.z = t * 3;
}

// ---------------- Ally George ----------------

/** Convert the boss into a friendly ally in place (keeps its mesh, becomes peach). */
export function bossToAlly(b) {
  b.ch.skinMat.color.copy(PEACH);
  b.ch.zombie = false;
  b.ch.mouth.scale.set(1, 0.5, 1);
  b.ch.rig.position.y = 0;
  b.ch.rig.rotation.set(0, 0, 0);
  b.mesh.position.y = 0;
  b.mesh.scale.setScalar(1.4);
  const ally = makeAllyState(b.ch, b.mesh, 1.4);
  return ally;
}

/** Fresh ally George (already cured, from a saved roster). */
export function createAlly(group, pos) {
  const ch = buildCharacter({ skin: 0xffd2a8, ...GEORGE, scale: 1.4, gait: 9 });
  ch.root.position.set(pos.x, 0, pos.z);
  group.add(ch.root);
  return makeAllyState(ch, ch.root, 1.4);
}

function makeAllyState(ch, mesh, scale) {
  // Flag on a pole for waving at zombies.
  const pivot = new THREE.Group();
  pivot.position.set(-0.55, 1.4, 0.2);
  ch.rig.add(pivot);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.2, 6), std(0xd9d9d9));
  pole.rotation.x = Math.PI / 2;
  pole.position.z = 0.9;
  pivot.add(pole);
  const flag = new THREE.Group();
  [0xd33b3b, 0xffffff, 0xd33b3b].forEach((c, i) => {
    const s = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.2, 0.7), std(c));
    s.position.set(0, -i * 0.2, 0);
    flag.add(s);
  });
  flag.position.set(0, 0.2, 1.75);
  pivot.add(flag);
  return {
    kind: 'ally',
    name: 'George',
    mesh,
    ch,
    pivot,
    scale,
    attackCd: 1,
    swingT: 0,
    hitDone: false,
    radius: 0.8,
  };
}

/**
 * @param {any} a @param {{x:number,z:number}} player
 * @param {any[]} targets @param {number} dt @param {number} t
 * @param {{ map: any, hit: (t: any, dmg: number, from: THREE.Vector3, knock: number) => void, ring: (p: any, r: number) => void, shake: (n: number) => void }} env
 */
export function updateAlly(a, player, targets, dt, t, env) {
  const m = a.mesh;
  a.attackCd -= dt;
  m.rotation.x = 0;

  // Nearest enemy within 11.
  let foe = null;
  let best = 11;
  for (const z of targets) {
    if (!z.alive) continue;
    const d = Math.hypot(z.mesh.position.x - m.position.x, z.mesh.position.z - m.position.z);
    if (d < best) {
      best = d;
      foe = z;
    }
  }
  let goal = null;
  let stopAt = 3.4;
  if (foe) {
    goal = foe.mesh.position;
    stopAt = 2.2 + foe.radius;
  } else {
    goal = { x: player.x - 2.4, z: player.z + 1.8 };
  }
  const dx = goal.x - m.position.x;
  const dz = goal.z - m.position.z;
  const dist = Math.hypot(dx, dz) || 1;
  let move = 0;
  const stopDist = foe ? stopAt : 1.2;
  if (dist > stopDist) {
    const speed = foe ? 7 : dist > 8 ? 12 : 8;
    m.position.x += (dx / dist) * speed * dt;
    m.position.z += (dz / dist) * speed * dt;
    move = 1;
  }
  if (foe || dist > 1.5) {
    const want = Math.atan2(dx, dz);
    const diff = Math.atan2(Math.sin(want - m.rotation.y), Math.cos(want - m.rotation.y));
    m.rotation.y += diff * Math.min(1, dt * 10);
  }
  pushOut(m.position, a.radius, env.map.obstacles, env.map.bounds);

  // Flag wave AoE.
  if (foe && best <= stopAt + 1.2 && a.attackCd <= 0) {
    a.attackCd = 1.5;
    a.swingT = 0.4;
    a.hitDone = false;
  }
  animateWalk(a.ch, t, move);
  a.ch.armR.rotation.x = -1.3;
  a.pivot.rotation.set(0, -0.1, 0);
  if (a.swingT > 0) {
    a.swingT -= dt;
    const p = 1 - Math.max(0, a.swingT) / 0.4;
    a.pivot.rotation.y = -1.4 + p * 3.2;
    if (!a.hitDone && p > 0.4) {
      a.hitDone = true;
      const origin = m.position.clone();
      env.ring(origin, 4, 0xffd24a);
      env.shake(0.08);
      for (const z of targets) {
        if (!z.alive) continue;
        const d = Math.hypot(z.mesh.position.x - origin.x, z.mesh.position.z - origin.z);
        if (d < 4 + z.radius) env.hit(z, 26, origin, 8);
      }
    }
  }
}
