import * as THREE from 'three';

const COLORS = [0xff5e8a, 0xffd84a, 0x5ec8ff, 0x7dff8a, 0xc07dff, 0xff9a3c];
const confettiMats = COLORS.map((c) => new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide }));
const confettiGeo = new THREE.PlaneGeometry(0.24, 0.15);
const starGeo = new THREE.OctahedronGeometry(0.16);
const starMat = new THREE.MeshBasicMaterial({ color: 0xffe14a });
const dustGeo = new THREE.SphereGeometry(0.2, 6, 6);
const ringGeo = new THREE.RingGeometry(0.88, 1, 40);

/** Shared juice state. */
export const fx = {
  shake: 0,
  freeze: 0,
  /** @type {THREE.Group | null} */
  group: null,
  /** @type {THREE.PerspectiveCamera | null} */
  camera: null,
  /** @type {HTMLElement | null} */
  layer: null,
  /** @type {HTMLElement | null} */
  flashEl: null,
  /** @type {any[]} */
  parts: [],
};

const MAX_PARTS = 420;
const v = new THREE.Vector3();

/** @param {{ fxGroup: THREE.Group, camera: THREE.PerspectiveCamera }} world */
export function initFx(world, layer, flashEl) {
  fx.group = world.fxGroup;
  fx.camera = world.camera;
  fx.layer = layer;
  fx.flashEl = flashEl;
}

function addPart(p) {
  if (fx.parts.length >= MAX_PARTS) {
    const old = fx.parts.shift();
    old.mesh.parent?.remove(old.mesh);
    if (old.ownMat) old.mesh.material.dispose();
  }
  fx.group.add(p.mesh);
  fx.parts.push(p);
}

/** @param {THREE.Vector3} pos */
export function confetti(pos, count = 18, speed = 6) {
  for (let i = 0; i < count; i++) {
    const mesh = new THREE.Mesh(confettiGeo, confettiMats[i % confettiMats.length]);
    mesh.position.set(pos.x, (pos.y || 0) + 1.2, pos.z);
    const a = Math.random() * Math.PI * 2;
    const s = (0.4 + Math.random()) * speed;
    addPart({
      mesh,
      vx: Math.cos(a) * s,
      vy: 3 + Math.random() * 5,
      vz: Math.sin(a) * s,
      life: 0.9 + Math.random() * 0.6,
      max: 1.5,
      grav: 11,
      spin: (Math.random() - 0.5) * 18,
      shrink: true,
    });
  }
}

/** @param {THREE.Vector3} pos */
export function starPop(pos, count = 5) {
  for (let i = 0; i < count; i++) {
    const mesh = new THREE.Mesh(starGeo, starMat);
    mesh.position.set(pos.x, (pos.y || 0) + 1.5, pos.z);
    const a = (i / count) * Math.PI * 2 + Math.random();
    addPart({
      mesh,
      vx: Math.cos(a) * 4,
      vy: 2 + Math.random() * 3,
      vz: Math.sin(a) * 4,
      life: 0.45,
      max: 0.45,
      grav: 6,
      spin: 10,
      shrink: true,
    });
  }
}

/** @param {THREE.Vector3} pos */
export function dust(pos, count = 8) {
  const mat = new THREE.MeshBasicMaterial({ color: 0xf3ead2, transparent: true, opacity: 0.7 });
  for (let i = 0; i < count; i++) {
    const mesh = new THREE.Mesh(dustGeo, mat);
    mesh.position.set(pos.x, 0.2, pos.z);
    const a = Math.random() * Math.PI * 2;
    addPart({
      mesh,
      vx: Math.cos(a) * 3.2,
      vy: 1 + Math.random(),
      vz: Math.sin(a) * 3.2,
      life: 0.6,
      max: 0.6,
      grav: 0,
      spin: 0,
      shrink: true,
    });
  }
}

/** Expanding flat ring (shockwave / sparkle ring). */
export function ring(pos, radius, color = 0xffffff, life = 0.5) {
  const mat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.85,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(ringGeo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(pos.x, 0.12, pos.z);
  mesh.scale.setScalar(0.1);
  addPart({ mesh, life, max: life, grow: radius, fade: true, ownMat: true });
}

/** Temporary object that fades out (slash arcs, sparkle trails). */
export function spawnTemp(mesh, life = 0.2, shrink = false) {
  addPart({ mesh, life, max: life, fade: !shrink, shrink, ownMat: !shrink });
}

export function addShake(a) {
  fx.shake = Math.max(fx.shake, a);
}

export function hitStop(ms) {
  fx.freeze = Math.max(fx.freeze, ms / 1000);
}

/** Comic-style floating text at a world position. */
export function floatText(pos, text, color = '#fff') {
  if (!fx.layer || !fx.camera) return;
  v.set(pos.x, (pos.y || 0) + 2.6, pos.z).project(fx.camera);
  if (v.z > 1) return;
  const x = (v.x * 0.5 + 0.5) * fx.layer.clientWidth;
  const y = (-v.y * 0.5 + 0.5) * fx.layer.clientHeight;
  const el = document.createElement('div');
  el.className = 'ftext';
  el.textContent = text;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.color = color;
  el.style.setProperty('--tilt', `${(Math.random() - 0.5) * 24}deg`);
  fx.layer.appendChild(el);
  setTimeout(() => el.remove(), 800);
}

export function flash(color = '#ffffff', ms = 150) {
  const el = fx.flashEl;
  if (!el) return;
  el.style.background = color;
  el.style.transition = 'none';
  el.style.opacity = '0.75';
  requestAnimationFrame(() => {
    el.style.transition = `opacity ${ms}ms ease-out`;
    el.style.opacity = '0';
  });
}

/** @param {number} dt real (unfrozen) delta */
export function updateFx(dt) {
  fx.shake = Math.max(0, fx.shake - dt * 1.4);
  const next = [];
  for (const p of fx.parts) {
    p.life -= dt;
    if (p.life <= 0) {
      p.mesh.parent?.remove(p.mesh);
      if (p.ownMat) p.mesh.material.dispose();
      continue;
    }
    const k = p.life / p.max;
    if (p.vx !== undefined) {
      p.mesh.position.x += p.vx * dt;
      p.mesh.position.y += p.vy * dt;
      p.mesh.position.z += p.vz * dt;
      p.vy -= p.grav * dt;
      if (p.mesh.position.y < 0.05) {
        p.mesh.position.y = 0.05;
        p.vy = 0;
        p.vx *= 0.9;
        p.vz *= 0.9;
      }
      p.mesh.rotation.x += p.spin * dt;
      p.mesh.rotation.z += p.spin * 0.7 * dt;
    }
    if (p.grow) p.mesh.scale.setScalar(0.1 + p.grow * (1 - k));
    if (p.fade) p.mesh.material.opacity = k * 0.85;
    else if (p.shrink) p.mesh.scale.setScalar(Math.max(0.01, Math.min(1, k * 2)) * (p.grow ? 1 : 1));
    next.push(p);
  }
  fx.parts = next;
}
