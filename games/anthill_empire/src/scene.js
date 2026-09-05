import * as THREE from 'three';
import {
  CAMERA_DISTANCE,
  CAMERA_HEIGHT,
  CAMERA_LOOK_Y,
  CAMERA_MAX_PITCH,
  CAMERA_MAX_ZOOM,
  CAMERA_MIN_PITCH,
  CAMERA_MIN_ZOOM,
  CAMERA_PAN_SPEED,
  CAMERA_ZOOM_SPEED,
  MAP_RADIUS,
  NEST_RADIUS,
} from './constants.js';

/**
 * @typedef {{
 *   scene: THREE.Scene,
 *   camera: THREE.PerspectiveCamera,
 *   renderer: THREE.WebGLRenderer,
 *   nest: THREE.Group,
 *   nestGlow: THREE.Mesh,
 *   foodGroup: THREE.Group,
 *   antGroup: THREE.Group,
 *   ground: THREE.Mesh,
 *   dirt: THREE.Mesh,
 *   hemi: THREE.HemisphereLight,
 *   sun: THREE.DirectionalLight,
 *   propsGroup: THREE.Group,
 * }} World
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

  const propsGroup = new THREE.Group();
  scene.add(propsGroup);
  fillMeadowProps(propsGroup);

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

  return {
    scene,
    camera,
    renderer,
    nest,
    nestGlow,
    foodGroup,
    antGroup,
    ground,
    dirt,
    hemi,
    sun,
    propsGroup,
  };
}

function buildNest() {
  const nest = new THREE.Group();
  nest.name = 'nest';

  const mound = new THREE.Mesh(
    new THREE.ConeGeometry(NEST_RADIUS, 2.4, 18),
    new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.95 }),
  );
  mound.name = 'mound';
  mound.position.y = 1.15;
  mound.castShadow = true;
  mound.receiveShadow = true;
  nest.add(mound);

  const lip = new THREE.Mesh(
    new THREE.TorusGeometry(NEST_RADIUS * 0.55, 0.18, 8, 20),
    new THREE.MeshStandardMaterial({ color: 0x6e4420, roughness: 1 }),
  );
  lip.name = 'lip';
  lip.rotation.x = Math.PI / 2;
  lip.position.y = 0.2;
  nest.add(lip);

  const hole = new THREE.Mesh(
    new THREE.CircleGeometry(0.55, 16),
    new THREE.MeshBasicMaterial({ color: 0x1a120a }),
  );
  hole.name = 'hole';
  hole.rotation.x = -Math.PI / 2;
  hole.position.y = 2.05;
  nest.add(hole);

  return nest;
}

/** @param {THREE.Group} group */
function fillMeadowProps(group) {
  while (group.children.length) {
    group.remove(group.children[0]);
  }
  const rockMat = new THREE.MeshStandardMaterial({ color: 0x7a7a72, roughness: 1 });
  const grassMat = new THREE.MeshStandardMaterial({ color: 0x3f8f45, roughness: 0.8 });
  for (const [x, z] of PROP_POSITIONS) {
    const rock = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.45 + Math.random() * 0.35, 0),
      rockMat,
    );
    rock.position.set(x, 0.35, z);
    rock.rotation.set(Math.random(), Math.random(), Math.random());
    rock.castShadow = true;
    group.add(rock);

    const blade = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.7, 5), grassMat);
    blade.position.set(x + 0.6, 0.35, z + 0.4);
    blade.castShadow = true;
    group.add(blade);
  }
}

/** @param {THREE.Group} group */
function fillDesertProps(group) {
  while (group.children.length) {
    group.remove(group.children[0]);
  }
  const rockMat = new THREE.MeshStandardMaterial({ color: 0xb0a090, roughness: 1 });
  const cactusMat = new THREE.MeshStandardMaterial({ color: 0x5a7a3a, roughness: 0.85 });
  const duneMat = new THREE.MeshStandardMaterial({ color: 0xc4a574, roughness: 1 });

  for (const [x, z] of PROP_POSITIONS) {
    const rock = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.4 + Math.random() * 0.4, 0),
      rockMat,
    );
    rock.position.set(x, 0.32, z);
    rock.rotation.set(Math.random(), Math.random(), Math.random());
    rock.castShadow = true;
    group.add(rock);

    // Simple cactus: trunk + one arm.
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 1.1, 6), cactusMat);
    trunk.position.set(x + 0.55, 0.55, z + 0.35);
    trunk.castShadow = true;
    group.add(trunk);

    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.45, 6), cactusMat);
    arm.position.set(x + 0.72, 0.75, z + 0.35);
    arm.rotation.z = Math.PI / 2.4;
    arm.castShadow = true;
    group.add(arm);

    const dune = new THREE.Mesh(new THREE.SphereGeometry(0.55, 8, 6), duneMat);
    dune.scale.set(1.4, 0.35, 1);
    dune.position.set(x - 0.8, 0.12, z - 0.5);
    dune.castShadow = true;
    group.add(dune);
  }
}

const PROP_POSITIONS = [
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

/**
 * Retheme the world into a hotter desert biome for Level 2.
 * @param {World} world
 */
export function applyDesertTheme(world) {
  world.scene.background = new THREE.Color(0xd4b896);
  world.scene.fog = new THREE.Fog(0xd4b896, 28, 58);

  world.hemi.color.setHex(0xffe8c8);
  world.hemi.groundColor.setHex(0x8a6a3a);
  world.sun.color.setHex(0xffd9a0);
  world.sun.intensity = 1.2;

  /** @type {THREE.MeshStandardMaterial} */ (world.ground.material).color.setHex(0xc4a574);
  /** @type {THREE.MeshStandardMaterial} */ (world.ground.material).roughness = 0.95;
  /** @type {THREE.MeshStandardMaterial} */ (world.dirt.material).color.setHex(0xa67c52);

  world.nest.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh) || !obj.material || !('color' in obj.material)) return;
    const mat = /** @type {THREE.MeshStandardMaterial} */ (obj.material);
    if (obj.name === 'mound') mat.color.setHex(0xc9a66b);
    else if (obj.name === 'lip') mat.color.setHex(0x9a7340);
  });

  /** @type {THREE.MeshBasicMaterial} */ (world.nestGlow.material).color.setHex(0xffb347);

  fillDesertProps(world.propsGroup);
  document.body.classList.add('biome-desert');
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
  /** @type {Map<number, { x: number, y: number }>} */
  const pointers = new Map();
  let pinchStartDist = 0;
  let pinchStartZoom = distance;

  const canvas = () => host.querySelector('canvas');

  function clampZoom(value) {
    return Math.min(CAMERA_MAX_ZOOM, Math.max(CAMERA_MIN_ZOOM, value));
  }

  function applyCamera() {
    pitch = Math.min(CAMERA_MAX_PITCH, Math.max(CAMERA_MIN_PITCH, pitch));
    distance = clampZoom(distance);
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
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) {
      const pts = [...pointers.values()];
      pinchStartDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      pinchStartZoom = distance;
      dragging = false;
      orbiting = true;
      return;
    }
    dragging = true;
    orbiting = false;
    startX = lastX = e.clientX;
    startY = lastY = e.clientY;
    el?.setPointerCapture?.(e.pointerId);
  });

  host.addEventListener('pointermove', (e) => {
    if (pointers.has(e.pointerId)) {
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    }

    if (pointers.size >= 2) {
      const pts = [...pointers.values()];
      const pinchDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      if (pinchStartDist > 8) {
        distance = clampZoom(pinchStartZoom * (pinchStartDist / pinchDist));
        applyCamera();
      }
      return;
    }

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

  const endDrag = (e) => {
    if (e?.pointerId != null) pointers.delete(e.pointerId);
    else pointers.clear();
    if (pointers.size < 2) pinchStartDist = 0;
    dragging = pointers.size === 1;
    if (!dragging) orbiting = orbiting && pointers.size > 0;
  };
  host.addEventListener('pointerup', endDrag);
  host.addEventListener('pointercancel', endDrag);

  host.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      const factor = Math.exp(e.deltaY * CAMERA_ZOOM_SPEED);
      distance = clampZoom(distance * factor);
      applyCamera();
    },
    { passive: false },
  );

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
