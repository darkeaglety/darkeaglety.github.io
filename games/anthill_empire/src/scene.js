import * as THREE from 'three';
import {
  CAMERA_DISTANCE,
  CAMERA_HEIGHT,
  CAMERA_LOOK_Y,
  CAMERA_MAX_PITCH,
  CAMERA_MIN_PITCH,
  CAMERA_PAN_SPEED,
  MAP_RADIUS,
  NEST_RADIUS,
} from './constants.js';

/**
 * @typedef {{ scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, nest: THREE.Group, nestGlow: THREE.Mesh, foodGroup: THREE.Group, antGroup: THREE.Group, ground: THREE.Mesh }} World
 */

/**
 * @param {HTMLElement} host
 * @returns {World}
 */
export function createWorld(host) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87b58a);
  scene.fog = new THREE.Fog(0x87b58a, 36, 70);

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 160);
  camera.position.set(0, CAMERA_HEIGHT, CAMERA_DISTANCE);
  camera.lookAt(0, CAMERA_LOOK_Y, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  host.appendChild(renderer.domElement);

  const hemi = new THREE.HemisphereLight(0xfff2c8, 0x3a5a32, 0.95);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight(0xfff0d0, 1.05);
  sun.position.set(14, 26, 10);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.near = 2;
  sun.shadow.camera.far = 80;
  sun.shadow.camera.left = -30;
  sun.shadow.camera.right = 30;
  sun.shadow.camera.top = 30;
  sun.shadow.camera.bottom = -30;
  scene.add(sun);

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(MAP_RADIUS + 2, 56),
    new THREE.MeshStandardMaterial({ color: 0x5c8f4a, roughness: 0.85, metalness: 0.05 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const dirt = new THREE.Mesh(
    new THREE.RingGeometry(NEST_RADIUS * 0.6, NEST_RADIUS * 2.4, 32),
    new THREE.MeshStandardMaterial({ color: 0x6b4a2a, roughness: 1 }),
  );
  dirt.rotation.x = -Math.PI / 2;
  dirt.position.y = 0.02;
  scene.add(dirt);

  const nest = buildNest();
  scene.add(nest);

  const nestGlow = new THREE.Mesh(
    new THREE.CircleGeometry(NEST_RADIUS * 1.15, 24),
    new THREE.MeshBasicMaterial({
      color: 0xffc857,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
    }),
  );
  nestGlow.rotation.x = -Math.PI / 2;
  nestGlow.position.y = 0.03;
  scene.add(nestGlow);

  addProps(scene);

  const foodGroup = new THREE.Group();
  scene.add(foodGroup);

  const antGroup = new THREE.Group();
  scene.add(antGroup);

  function resize() {
    const w = host.clientWidth || window.innerWidth;
    const h = host.clientHeight || window.innerHeight;
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }

  resize();
  window.addEventListener('resize', resize);

  return { scene, camera, renderer, nest, nestGlow, foodGroup, antGroup, ground };
}

function buildNest() {
  const nest = new THREE.Group();
  nest.name = 'nest';

  const mound = new THREE.Mesh(
    new THREE.ConeGeometry(NEST_RADIUS, 2.4, 18),
    new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.95 }),
  );
  mound.position.y = 1.15;
  mound.castShadow = true;
  mound.receiveShadow = true;
  nest.add(mound);

  const lip = new THREE.Mesh(
    new THREE.TorusGeometry(NEST_RADIUS * 0.55, 0.18, 8, 20),
    new THREE.MeshStandardMaterial({ color: 0x6e4420, roughness: 1 }),
  );
  lip.rotation.x = Math.PI / 2;
  lip.position.y = 0.2;
  nest.add(lip);

  const hole = new THREE.Mesh(
    new THREE.CircleGeometry(0.55, 16),
    new THREE.MeshBasicMaterial({ color: 0x1a120a }),
  );
  hole.rotation.x = -Math.PI / 2;
  hole.position.y = 2.05;
  nest.add(hole);

  return nest;
}

/** @param {THREE.Scene} scene */
function addProps(scene) {
  const rockMat = new THREE.MeshStandardMaterial({ color: 0x7a7a72, roughness: 1 });
  const grassMat = new THREE.MeshStandardMaterial({ color: 0x3f8f45, roughness: 0.8 });

  const positions = [
    [8, 6],
    [-10, 4],
    [5, -11],
    [-7, -8],
    [12, -3],
    [-4, 12],
    [16, 10],
    [-15, -9],
    [14, -14],
    [-12, 15],
  ];

  for (const [x, z] of positions) {
    const rock = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.45 + Math.random() * 0.35, 0),
      rockMat,
    );
    rock.position.set(x, 0.35, z);
    rock.rotation.set(Math.random(), Math.random(), Math.random());
    rock.castShadow = true;
    scene.add(rock);

    const blade = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.7, 5), grassMat);
    blade.position.set(x + 0.6, 0.35, z + 0.4);
    blade.castShadow = true;
    scene.add(blade);
  }
}

/**
 * Orbit + pan camera. Drag to look around the larger map.
 * @param {HTMLElement} host
 * @param {THREE.PerspectiveCamera} camera
 */
export function attachOrbit(host, camera) {
  let dragging = false;
  let orbiting = false;
  let lastX = 0;
  let lastY = 0;
  let startX = 0;
  let startY = 0;
  let yaw = Math.atan2(camera.position.x, camera.position.z);
  let pitch = Math.atan2(
    camera.position.y,
    Math.hypot(camera.position.x, camera.position.z),
  );
  let distance = Math.hypot(camera.position.x, camera.position.y, camera.position.z);
  const focus = new THREE.Vector3(0, CAMERA_LOOK_Y, 0);
  const ORBIT_THRESHOLD = 8;
  const panLimit = MAP_RADIUS - 4;

  const canvas = () => host.querySelector('canvas');

  function applyCamera() {
    pitch = Math.min(CAMERA_MAX_PITCH, Math.max(CAMERA_MIN_PITCH, pitch));
    const cosP = Math.cos(pitch);
    camera.position.set(
      focus.x + Math.sin(yaw) * distance * cosP,
      focus.y + Math.sin(pitch) * distance,
      focus.z + Math.cos(yaw) * distance * cosP,
    );
    camera.lookAt(focus);
  }

  applyCamera();

  host.addEventListener('pointerdown', (e) => {
    const el = canvas();
    if (e.target !== host && e.target !== el) return;
    dragging = true;
    orbiting = false;
    startX = lastX = e.clientX;
    startY = lastY = e.clientY;
    el?.setPointerCapture?.(e.pointerId);
  });

  host.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dist = Math.hypot(e.clientX - startX, e.clientY - startY);
    if (!orbiting && dist >= ORBIT_THRESHOLD) {
      orbiting = true;
    }
    if (!orbiting) return;

    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;

    // Horizontal drag orbits; vertical drag tilts the view.
    yaw -= dx * 0.005;
    pitch += dy * 0.0035;

    // Also pan the focus so you can look around the bigger map.
    const rightX = Math.cos(yaw);
    const rightZ = -Math.sin(yaw);
    const forwardX = -Math.sin(yaw);
    const forwardZ = -Math.cos(yaw);
    focus.x += (-rightX * dx + forwardX * dy) * CAMERA_PAN_SPEED;
    focus.z += (-rightZ * dx + forwardZ * dy) * CAMERA_PAN_SPEED;
    focus.x = Math.min(panLimit, Math.max(-panLimit, focus.x));
    focus.z = Math.min(panLimit, Math.max(-panLimit, focus.z));
    focus.y = CAMERA_LOOK_Y;

    applyCamera();
  });

  const endDrag = () => {
    dragging = false;
  };
  host.addEventListener('pointerup', endDrag);
  host.addEventListener('pointercancel', endDrag);

  return {
    wasOrbiting: () => orbiting,
    ORBIT_THRESHOLD,
    focus,
  };
}

/**
 * @param {THREE.Group} nest
 * @param {number} level
 */
export function setNestLevelVisual(nest, level) {
  const scale = 1 + (level - 1) * 0.12;
  nest.scale.setScalar(scale);
}
