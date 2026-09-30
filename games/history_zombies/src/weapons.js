import * as THREE from 'three';
import { spawnTemp, starPop, confetti, ring, dust } from './fx.js';
import { weaponDef } from './economy.js';

/**
 * @typedef {{ mesh: THREE.Object3D, alive: boolean, radius: number }} Target
 * @typedef {{
 *  targets: () => Target[],
 *  hit: (t: any, dmg: number, from: THREE.Vector3, knock: number, opts?: { stun?: number }) => void,
 *  fxGroup: THREE.Group,
 *  projectiles: any[],
 * }} AttackCtx
 */

const std = (color, extra = {}) =>
  new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0.05, ...extra });

/** Upgrade tiers scale damage, speed and reach. */
export function weaponStats(id, level) {
  const d = weaponDef(id);
  return {
    ...d,
    dmg: d.dmg * (1 + 0.28 * level),
    cd: d.cd * (1 - 0.07 * level),
    range: d.range * (1 + 0.07 * level),
    splash: d.splash ? d.splash * (1 + 0.05 * level) : 0,
    pellets: d.pellets ? d.pellets + Math.floor(level / 2) : 0,
    chain: d.chain ? d.chain + Math.floor(level / 2) : 0,
  };
}

/** Held weapon model, pointing along +z. */
export function buildWeaponMesh(id, level = 0) {
  const g = new THREE.Group();
  const glow = level * 0.12;
  if (id === 'foam') {
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.4, 8), std(0x8b5a2b));
    handle.rotation.x = Math.PI / 2;
    handle.position.z = 0.1;
    g.add(handle);
    const guard = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.1, 0.12), std(0xffd24a));
    guard.position.z = 0.3;
    g.add(guard);
    const blade = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.11, 1.2, 4, 10),
      std(0xff6b9d, { emissive: 0xff2a70, emissiveIntensity: glow }),
    );
    blade.rotation.x = Math.PI / 2;
    blade.position.z = 1.0;
    g.add(blade);
  } else if (id === 'noodle') {
    const n = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.12, 2.0, 4, 10),
      std(0x4dd0e1, { emissive: 0x00b8d4, emissiveIntensity: glow }),
    );
    n.rotation.x = Math.PI / 2;
    n.position.z = 1.1;
    g.add(n);
    const hole = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.03, 6, 10), std(0x1a8fa0));
    hole.position.z = 2.2;
    g.add(hole);
  } else if (id === 'confetti') {
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.26, 0.9, 12), std(0xff5e8a));
    tube.rotation.x = Math.PI / 2;
    tube.position.z = 0.5;
    g.add(tube);
    const funnel = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.45, 12, 1, true), std(0xffd84a, { side: THREE.DoubleSide, emissive: 0xffaa00, emissiveIntensity: glow }));
    funnel.rotation.x = -Math.PI / 2;
    funnel.position.z = 1.15;
    g.add(funnel);
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.04, 6, 14), std(0x5ec8ff));
    band.position.z = 0.4;
    g.add(band);
  } else if (id === 'bubble') {
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 10), std(0x2bd3c6));
    body.position.z = 0.3;
    g.add(body);
    const wand = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.05, 8, 20), std(0xffffff, { emissive: 0x66ddff, emissiveIntensity: glow + 0.2 }));
    wand.position.z = 0.9;
    g.add(wand);
    const film = new THREE.Mesh(new THREE.CircleGeometry(0.34, 16), new THREE.MeshBasicMaterial({ color: 0x9be8ff, transparent: true, opacity: 0.4, side: THREE.DoubleSide }));
    film.position.z = 0.9;
    g.add(film);
  } else {
    const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 1.3, 8), std(0xc07dff));
    stick.rotation.x = Math.PI / 2;
    stick.position.z = 0.6;
    g.add(stick);
    const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.3), std(0xffe14a, { emissive: 0xffc400, emissiveIntensity: 0.6 + glow }));
    star.position.z = 1.35;
    star.scale.set(1, 1, 0.5);
    g.add(star);
  }
  g.scale.setScalar(1 + level * 0.05);
  return g;
}

const fwd = (yaw) => new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw));

/**
 * @param {any} player @param {string} id @param {number} level @param {AttackCtx} ctx
 * @returns {boolean} whether the attack fired
 */
export function attack(player, id, level, ctx) {
  if (player.attackCd > 0) return false;
  const st = weaponStats(id, level);
  player.attackCd = st.cd;
  player.swingDur = Math.min(0.32, st.cd * 0.8);
  player.swingT = player.swingDur;
  player.swingKind = st.type === 'melee' ? 'melee' : 'recoil';

  if (st.type === 'melee') melee(player, st, ctx);
  else if (st.type === 'burst') burst(player, st, ctx);
  else if (st.type === 'bubble') bubble(player, st, ctx);
  else chain(player, st, ctx);
  return true;
}

function melee(player, st, ctx) {
  const origin = player.mesh.position;
  const f = fwd(player.yaw);
  // Slash arc visual.
  const a0 = player.yaw - Math.PI / 2;
  const geo = new THREE.RingGeometry(0.7, st.range, 28, 1, a0 - st.arc, st.arc * 2);
  const mesh = new THREE.Mesh(
    geo,
    new THREE.MeshBasicMaterial({ color: st.color, transparent: true, opacity: 0.6, side: THREE.DoubleSide, depthWrite: false }),
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(origin.x, 0.2, origin.z);
  ctx.fxGroup.add(mesh);
  spawnTemp(mesh, 0.22);

  const cosArc = Math.cos(st.arc + 0.15);
  for (const t of ctx.targets()) {
    if (!t.alive) continue;
    const dx = t.mesh.position.x - origin.x;
    const dz = t.mesh.position.z - origin.z;
    const len = Math.hypot(dx, dz);
    if (len - t.radius > st.range) continue;
    const dot = len < 0.001 ? 1 : (dx * f.x + dz * f.z) / len;
    if (dot < cosArc && len > t.radius + 0.6) continue;
    ctx.hit(t, st.dmg, origin, st.knock);
  }
}

function burst(player, st, ctx) {
  const speed = 18;
  const o = player.mesh.position;
  const colors = [0xff5e8a, 0xffd84a, 0x5ec8ff, 0x7dff8a, 0xc07dff];
  for (let i = 0; i < st.pellets; i++) {
    const off = st.pellets === 1 ? 0 : (i / (st.pellets - 1) - 0.5) * st.spread;
    const yaw = player.yaw + off + (Math.random() - 0.5) * 0.08;
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.06, 0.2),
      new THREE.MeshBasicMaterial({ color: colors[i % colors.length] }),
    );
    mesh.position.set(o.x + Math.sin(yaw) * 1.3, 1.3, o.z + Math.cos(yaw) * 1.3);
    ctx.fxGroup.add(mesh);
    ctx.projectiles.push({
      kind: 'pellet',
      mesh,
      vx: Math.sin(yaw) * speed,
      vz: Math.cos(yaw) * speed,
      life: st.range / speed,
      dmg: st.dmg,
      knock: st.knock,
      spin: 20 + Math.random() * 10,
    });
  }
  confetti(new THREE.Vector3(o.x + Math.sin(player.yaw) * 1.4, 0, o.z + Math.cos(player.yaw) * 1.4), 10, 4);
}

function bubble(player, st, ctx) {
  const o = player.mesh.position;
  const speed = 9;
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 16, 14),
    new THREE.MeshStandardMaterial({
      color: 0x9be8ff,
      transparent: true,
      opacity: 0.55,
      emissive: 0x3ad0ff,
      emissiveIntensity: 0.35,
      roughness: 0.1,
    }),
  );
  mesh.position.set(o.x + Math.sin(player.yaw) * 1.3, 1.4, o.z + Math.cos(player.yaw) * 1.3);
  ctx.fxGroup.add(mesh);
  ctx.projectiles.push({
    kind: 'bubble',
    mesh,
    vx: Math.sin(player.yaw) * speed,
    vz: Math.cos(player.yaw) * speed,
    life: st.range / speed,
    dmg: st.dmg,
    knock: st.knock,
    splash: st.splash,
    stun: st.stun,
    age: 0,
  });
}

function chain(player, st, ctx) {
  const o = player.mesh.position;
  const f = fwd(player.yaw);
  const start = new THREE.Vector3(o.x + f.x * 1.2, 1.4, o.z + f.z * 1.2);
  const all = ctx.targets().filter((t) => t.alive);

  let first = null;
  let best = st.range;
  for (const t of all) {
    const dx = t.mesh.position.x - o.x;
    const dz = t.mesh.position.z - o.z;
    const d = Math.hypot(dx, dz);
    if (d - t.radius > st.range) continue;
    if ((dx * f.x + dz * f.z) / (d || 1) < 0.35) continue;
    if (d < best) {
      best = d;
      first = t;
    }
  }
  if (!first) {
    const end = start.clone().addScaledVector(f, 6);
    sparkleLine(start, end, ctx);
    return;
  }
  const hitSet = new Set([first]);
  let cur = first;
  let prev = start;
  let dmg = st.dmg;
  for (let hop = 0; hop <= st.chain; hop++) {
    const p = cur.mesh.position.clone();
    p.y = 1.3;
    sparkleLine(prev, p, ctx);
    ctx.hit(cur, dmg, o, st.knock);
    starPop(cur.mesh.position, 3);
    dmg *= 0.8;
    prev = p;
    let next = null;
    let nd = 5.5;
    for (const t of all) {
      if (hitSet.has(t) || !t.alive) continue;
      const d = t.mesh.position.distanceTo(cur.mesh.position);
      if (d < nd) {
        nd = d;
        next = t;
      }
    }
    if (!next) break;
    hitSet.add(next);
    cur = next;
  }
}

const sparkGeo = new THREE.OctahedronGeometry(0.17);
function sparkleLine(a, b, ctx) {
  const len = a.distanceTo(b);
  const n = Math.max(2, Math.floor(len / 0.6));
  for (let i = 0; i <= n; i++) {
    const m = new THREE.Mesh(sparkGeo, new THREE.MeshBasicMaterial({ color: i % 2 ? 0xffe14a : 0xffffff }));
    m.position.lerpVectors(a, b, i / n);
    m.position.x += (Math.random() - 0.5) * 0.3;
    m.position.y += (Math.random() - 0.5) * 0.3;
    m.position.z += (Math.random() - 0.5) * 0.3;
    m.rotation.set(Math.random() * 3, Math.random() * 3, 0);
    ctx.fxGroup.add(m);
    spawnTemp(m, 0.22 + i * 0.012);
  }
}

/** @param {any[]} projectiles @param {AttackCtx} ctx @param {number} dt */
export function updateProjectiles(projectiles, ctx, dt) {
  const live = [];
  for (const p of projectiles) {
    p.life -= dt;
    p.mesh.position.x += p.vx * dt;
    p.mesh.position.z += p.vz * dt;
    if (p.kind === 'pellet') {
      p.mesh.rotation.x += p.spin * dt;
      p.mesh.rotation.z += p.spin * dt;
    } else {
      p.age += dt;
      p.mesh.position.y = 1.4 + Math.sin(p.age * 6) * 0.15;
      p.mesh.scale.setScalar(1 + Math.sin(p.age * 9) * 0.06 + p.age * 0.35);
    }
    const reach = p.kind === 'bubble' ? 0.9 * p.mesh.scale.x : 0.55;
    let hitT = null;
    for (const t of ctx.targets()) {
      if (!t.alive) continue;
      const d = Math.hypot(t.mesh.position.x - p.mesh.position.x, t.mesh.position.z - p.mesh.position.z);
      if (d < t.radius + reach) {
        hitT = t;
        break;
      }
    }
    if (hitT || p.life <= 0) {
      if (p.kind === 'bubble') popBubble(p, ctx);
      else if (hitT) {
        ctx.hit(hitT, p.dmg, p.mesh.position, p.knock);
        starPop(p.mesh.position, 2);
      }
      p.mesh.parent?.remove(p.mesh);
      p.mesh.material.dispose?.();
    } else {
      live.push(p);
    }
  }
  projectiles.length = 0;
  projectiles.push(...live);
}

function popBubble(p, ctx) {
  const pos = p.mesh.position.clone();
  ring(pos, p.splash * 0.9, 0x9be8ff, 0.45);
  confetti(pos.clone().setY(0), 14, 5);
  dust(pos, 5);
  for (const t of ctx.targets()) {
    if (!t.alive) continue;
    const d = Math.hypot(t.mesh.position.x - pos.x, t.mesh.position.z - pos.z);
    if (d <= p.splash + t.radius) {
      const fall = 1 - Math.min(1, d / (p.splash + t.radius)) * 0.4;
      ctx.hit(t, p.dmg * fall, pos, p.knock, { stun: p.stun });
    }
  }
}
