import * as THREE from 'three';
import { buildCharacter, animateWalk } from './characters.js';
import { buildWeaponMesh } from './weapons.js';
import { PLAYER_HP } from './constants.js';

/** @param {THREE.Group} group */
export function createPlayer(group, start) {
  const ch = buildCharacter({
    skin: 0xffd2a8,
    shirt: 0x2f80ff,
    pants: 0x3d3d6b,
    hat: 'helmet',
    extra: 'cape',
    scale: 1.15,
    gait: 11,
    cast: true,
  });
  ch.root.position.set(start.x, 0, start.z);

  // Bright ground marker so the hero is never lost in the crowd.
  const marker = new THREE.Mesh(
    new THREE.RingGeometry(0.85, 1.05, 32),
    new THREE.MeshBasicMaterial({ color: 0x2f80ff, transparent: true, opacity: 0.8, depthWrite: false, side: THREE.DoubleSide }),
  );
  marker.rotation.x = -Math.PI / 2;
  marker.position.y = 0.06;
  ch.root.add(marker);

  const pivot = new THREE.Group();
  pivot.position.set(-0.55, 1.35, 0.15);
  ch.rig.add(pivot);
  group.add(ch.root);

  return {
    ch,
    mesh: ch.root,
    pivot,
    weaponMesh: null,
    weaponId: '',
    hp: PLAYER_HP,
    hpMax: PLAYER_HP,
    yaw: 0,
    attackCd: 0,
    swingT: 0,
    swingDur: 0.2,
    swingKind: 'melee',
    invuln: 0,
    moving: 0,
    radius: 0.6,
  };
}

/** @param {any} player @param {string} id @param {number} level */
export function equipVisual(player, id, level) {
  if (player.weaponMesh) player.pivot.remove(player.weaponMesh);
  player.weaponMesh = buildWeaponMesh(id, level);
  player.pivot.add(player.weaponMesh);
  player.weaponId = id;
  player.weaponLevel = level;
}

const ease = (x) => 1 - (1 - x) * (1 - x);

/** @param {any} player @param {number} t @param {number} dt */
export function animatePlayer(player, t, dt) {
  const ch = player.ch;
  animateWalk(ch, t, player.moving);
  // Right arm holds the weapon out front.
  ch.armR.rotation.x = -1.3;
  ch.armR.rotation.z = 0;
  player.pivot.rotation.set(0, 0, 0);
  player.pivot.position.set(-0.55, 1.35, 0.15);

  if (player.swingT > 0) {
    player.swingT = Math.max(0, player.swingT - dt);
    const p = 1 - player.swingT / player.swingDur;
    if (player.swingKind === 'melee') {
      player.pivot.rotation.y = -1.1 + ease(p) * 2.7;
      ch.rig.rotation.y = (0.5 - ease(p)) * 0.5;
      ch.armR.rotation.y = player.pivot.rotation.y * 0.6;
    } else {
      player.pivot.position.z = 0.15 - Math.sin(p * Math.PI) * 0.35;
      player.pivot.rotation.x = -Math.sin(p * Math.PI) * 0.3;
    }
  } else {
    ch.rig.rotation.y = 0;
    ch.armR.rotation.y = 0;
    player.pivot.rotation.y = -0.15 + Math.sin(t * 2) * 0.03;
  }
  // Blink when just bonked.
  ch.root.visible = !(player.invuln > 0 && Math.floor(t * 20) % 2 === 0);
  // Cape flutter.
  ch.body.rotation.x = -player.moving * 0.12;
}

const ARMOR_COLORS = [0xb0bec5, 0x90caf9, 0xffd54f, 0xff8a65, 0xce93d8];

/** Shiny armor that grows with each armor level. */
export function setArmorVisual(player, level) {
  const ch = player.ch;
  for (const o of player.armorParts || []) o.parent?.remove(o);
  player.armorParts = [];
  if (level <= 0) return;
  const color = ARMOR_COLORS[Math.min(level, 5) - 1];
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.25, metalness: 0.6, emissive: color, emissiveIntensity: 0.12 });
  const add = (parent, mesh) => {
    parent.add(mesh);
    player.armorParts.push(mesh);
  };
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.41, 0.55, 12), mat);
  plate.position.y = 0.1;
  add(ch.body, plate);
  if (level >= 2) {
    for (const arm of [ch.armL, ch.armR]) {
      const pad = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), mat);
      pad.position.y = 0.02;
      add(arm, pad);
    }
  }
  if (level >= 3) {
    for (const leg of [ch.legL, ch.legR]) {
      const boot = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.17, 0.3, 10), mat);
      boot.position.y = -0.5;
      add(leg, boot);
    }
  }
  if (level >= 4) {
    const badge = new THREE.Mesh(new THREE.OctahedronGeometry(0.16), new THREE.MeshStandardMaterial({ color: 0xffe14a, emissive: 0xffc400, emissiveIntensity: 0.8 }));
    badge.position.set(0, 0.15, 0.46);
    badge.scale.z = 0.4;
    add(ch.body, badge);
  }
  if (level >= 5) {
    const ringM = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.05, 6, 20), new THREE.MeshBasicMaterial({ color: 0xffe14a }));
    ringM.rotation.x = Math.PI / 2;
    ringM.position.y = -0.3;
    add(ch.body, ringM);
  }
}
