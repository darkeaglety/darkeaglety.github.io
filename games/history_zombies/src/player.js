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
