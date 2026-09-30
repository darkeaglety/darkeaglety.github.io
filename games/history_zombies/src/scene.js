import * as THREE from 'three';

/**
 * @typedef {{
 *  scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer,
 *  entities: THREE.Group, fxGroup: THREE.Group,
 *  cam: { focus: THREE.Vector3, zoom: number, zoomTarget: number, offset: THREE.Vector3 },
 * }} World
 */

/** @param {HTMLElement} host @returns {World} */
export function createWorld(host) {
  const scene = new THREE.Scene();
  const sky = new THREE.Color(0x9fd8ff);
  scene.background = sky;
  scene.fog = new THREE.Fog(sky, 110, 260);

  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 400);

  const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  host.appendChild(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x8fbf7a, 1.0));
  scene.add(new THREE.AmbientLight(0xffffff, 0.35));
  const sun = new THREE.DirectionalLight(0xfff3d6, 1.5);
  sun.position.set(24, 46, 30);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  const sc = sun.shadow.camera;
  sc.left = -30;
  sc.right = 30;
  sc.top = 30;
  sc.bottom = -30;
  sc.near = 1;
  sc.far = 140;
  sun.shadow.bias = -0.0006;
  scene.add(sun);
  scene.add(sun.target);

  const entities = new THREE.Group();
  scene.add(entities);
  const fxGroup = new THREE.Group();
  scene.add(fxGroup);

  const cam = {
    focus: new THREE.Vector3(0, 0, 16),
    zoom: 1,
    zoomTarget: 1,
    yaw: 0,
    userZoom: 1,
    offset: new THREE.Vector3(0, 27, 10),
  };

  function resize() {
    const w = host.clientWidth || window.innerWidth;
    const h = host.clientHeight || window.innerHeight;
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  resize();
  window.addEventListener('resize', resize);

  return { scene, camera, renderer, entities, fxGroup, cam, sun };
}

const tmp = new THREE.Vector3();
const UP = new THREE.Vector3(0, 1, 0);

/**
 * @param {World} world
 * @param {THREE.Vector3} focusTarget where the camera wants to look
 * @param {number} dt
 * @param {number} shake screen shake amount
 * @param {number} follow follow speed
 */
export function updateCamera(world, focusTarget, dt, shake, follow = 5) {
  const { cam, camera } = world;
  const k = Math.min(1, dt * follow);
  cam.focus.lerp(focusTarget, k);
  cam.zoom += (cam.zoomTarget - cam.zoom) * Math.min(1, dt * 3);
  tmp.copy(cam.offset).applyAxisAngle(UP, cam.yaw).multiplyScalar(cam.zoom * cam.userZoom).add(cam.focus);
  world.sun.position.set(cam.focus.x + 24, 46, cam.focus.z + 30);
  world.sun.target.position.set(cam.focus.x, 0, cam.focus.z);
  if (shake > 0.001) {
    tmp.x += (Math.random() - 0.5) * shake * 2;
    tmp.y += (Math.random() - 0.5) * shake * 2;
    tmp.z += (Math.random() - 0.5) * shake * 2;
  }
  camera.position.copy(tmp);
  camera.lookAt(cam.focus.x, 1, cam.focus.z);
}
