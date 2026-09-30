import * as THREE from 'three';
import {
  MAX_ALIVE,
  PLAYER_RADIUS,
  PLAYER_SPEED,
  WAVE_PAUSE,
  WAVE_SPAWN_GAP,
  WEAPONS,
  waveList,
} from './constants.js';
import { pushOut } from './collision.js';
import { equip, loadSave, owns, resetSave, writeSave } from './economy.js';
import {
  addShake,
  confetti,
  dust,
  floatText,
  flash,
  fx,
  hitStop,
  initFx,
  ring,
  starPop,
  updateFx,
} from './fx.js';
import { buildWhiteHouse } from './maps/whiteHouse.js';
import { animatePlayer, createPlayer, equipVisual } from './player.js';
import { createWorld, updateCamera } from './scene.js';
import {
  bindHud,
  refreshHud,
  renderHotbar,
  renderShop,
  setBoss,
  setOverlay,
  showBanner,
  showTitleCard,
  showToast,
} from './ui.js';
import { attack, updateProjectiles } from './weapons.js';
import {
  bossToAlly,
  createAlly,
  createBoss,
  createTonic,
  cureMeter,
  hurtBoss,
  makePie,
  updateAlly,
  updateBoss,
  updatePies,
  updateTonic,
} from './washington.js';
import { hurtZombie, spawnZombie, updateZombies } from './zombies.js';

// ---------------------------------------------------------------- setup
const qs = new URLSearchParams(location.search);
const AUTO = qs.has('auto');
const host = document.getElementById('canvas-host');
const world = createWorld(host);
const hud = bindHud();
initFx(world, hud.layer, hud.flash);
const map = buildWhiteHouse(world.scene);
if (qs.has('reset')) resetSave();
const save = loadSave();
const player = createPlayer(world.entities, map.playerStart);
player.yaw = Math.PI;
player.mesh.rotation.y = Math.PI;

/** @type {any[]} */
let zombies = [];
const projectiles = [];
const pies = [];
const puddles = [];
/** @type {any} */
let boss = null;
/** @type {any} */
let ally = null;
/** @type {any} */
let tonic = null;

if (save.roster.george) {
  ally = createAlly(world.entities, { x: map.playerStart.x - 2.5, z: map.playerStart.z + 2 });
} else {
  boss = createBoss(world.entities, map.bossSpawn);
}

let mode = 'menu'; // menu | play | over | win
let shopOpen = false;
let cine = null;
let t = 0;
let wave = 0;
let waveActive = false;
let spawnQueue = [];
let spawnTimer = 0;
let pauseTimer = 1.2;
let saveTimer = 0;
let hintShown = false;

const keys = new Set();
const mouse = { x: 0, y: 0, down: false };
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const aimPoint = new THREE.Vector3();
const focus = new THREE.Vector3();
const WORDS = ['BONK!', 'POW!', 'BOOF!', 'WHAP!', 'BOING!', 'ZAP!', 'POOF!'];
const WORD_COLORS = ['#ffe066', '#7ee8ff', '#ff9ac0', '#9dffb0', '#ffb36b'];
const pick = (a) => a[Math.floor(Math.random() * a.length)];

function level(id = save.current) {
  return save.owned[id] ?? 0;
}

function equipCurrent() {
  equipVisual(player, save.current, level());
}

function syncUi() {
  renderHotbar(hud, save, onHotbar);
  if (shopOpen) renderShop(hud, save, () => {
    equipCurrent();
    syncUi();
  });
}

function onHotbar(i) {
  if (i === -1) return toggleShop();
  selectSlot(i);
}

function selectSlot(i) {
  const id = WEAPONS[i]?.id;
  if (!id) return;
  if (!owns(save, id)) {
    showToast(hud, 'Locked! Buy it in the Workshop (B).');
    return;
  }
  equip(save, id);
  equipCurrent();
  syncUi();
}

function toggleShop(force) {
  if (mode !== 'play' || cine) return;
  shopOpen = force !== undefined ? force : !shopOpen;
  setOverlay(hud.shop, shopOpen);
  if (shopOpen) renderShop(hud, save, () => {
    equipCurrent();
    syncUi();
  });
}

// ---------------------------------------------------------------- combat plumbing
const bossBusy = () => !!boss && boss.state !== 'sleep';
const targets = () => {
  const list = zombies.filter((z) => z.alive);
  if (boss && boss.alive) list.push(boss);
  return list;
};

function hit(tg, dmg, from, knock, opts = {}) {
  if (!tg.alive) return;
  const p = tg.mesh.position;
  if (tg.kind === 'boss') {
    const weak = hurtBoss(tg, dmg, from, knock);
    starPop(p, 4);
    floatText(p, pick(WORDS), pick(WORD_COLORS));
    addShake(0.12);
    hitStop(40);
    if (weak) bossWeakened();
    return;
  }
  const killed = hurtZombie(tg, dmg, from, knock, opts.stun || 0);
  starPop(p, killed ? 6 : 3);
  if (killed || Math.random() < 0.45) floatText(p, pick(WORDS), pick(WORD_COLORS));
  addShake(killed ? 0.14 : 0.05);
  hitStop(killed ? 75 : 30);
  if (killed) {
    confetti(p, 26, 7);
    dust(p, 4);
    save.coins += tg.coins;
    save.kills += 1;
    floatText({ x: p.x, y: 0.4, z: p.z }, `+${tg.coins}`, '#ffd24a');
  }
}

const atkCtx = { targets, hit, fxGroup: world.fxGroup, projectiles };

function bonkPlayer(dmg) {
  if (player.invuln > 0 || mode !== 'play') return;
  player.hp = Math.max(0, player.hp - dmg);
  player.invuln = 0.8;
  addShake(0.25);
  flash('#ffffff', 140);
  floatText(player.mesh.position, 'Oof!', '#ffb3c6');
  if (player.hp <= 0) {
    mode = 'over';
    writeSave(save);
    setOverlay(hud.over, true);
  }
}

const zombieCb = {
  bonk(z) {
    starPop(player.mesh.position, 3);
    bonkPlayer(z.type.damage);
  },
  stomp(z) {
    const p = z.mesh.position;
    ring(p, 5, 0xffe0b0, 0.5);
    dust(p, 8);
    const d = Math.hypot(p.x - player.mesh.position.x, p.z - player.mesh.position.z);
    addShake(Math.max(0.06, 0.3 - d * 0.015));
    if (d < 4.5) bonkPlayer(6);
  },
};

// ---------------------------------------------------------------- waves
function clearZombies() {
  for (const z of zombies) {
    if (!z.gone) {
      confetti(z.mesh.position, 8, 4);
      z.mesh.parent?.remove(z.mesh);
    }
  }
  zombies = [];
}

function startWave() {
  wave += 1;
  spawnQueue = waveList(wave);
  waveActive = true;
  spawnTimer = 0;
  showBanner(hud, `Wave ${wave}`);
  if (wave === 2 && boss && !hintShown) {
    hintShown = true;
    showToast(hud, 'Zzz... something is snoring behind the mansion. Follow the arrow!', 5000);
  }
}

function spawnOne() {
  const id = spawnQueue.shift();
  let pos = null;
  for (let i = 0; i < 6; i++) {
    const sp = pick(map.spawnPoints);
    const p = { x: sp.x + (Math.random() - 0.5) * 4, z: sp.z + (Math.random() - 0.5) * 4 };
    if (Math.hypot(p.x - player.mesh.position.x, p.z - player.mesh.position.z) > 14) {
      pos = p;
      break;
    }
  }
  if (!pos) pos = { x: map.spawnPoints[0].x, z: map.spawnPoints[0].z };
  pushOut(pos, 0.8, map.obstacles, map.bounds);
  zombies.push(spawnZombie(world.entities, id, pos));
  dust(new THREE.Vector3(pos.x, 0, pos.z), 4);
}

function updateWaves(dt) {
  if (bossBusy()) return;
  const alive = zombies.reduce((n, z) => n + (z.alive ? 1 : 0), 0);
  if (spawnQueue.length) {
    spawnTimer -= dt;
    if (spawnTimer <= 0 && alive < MAX_ALIVE) {
      spawnOne();
      spawnTimer = WAVE_SPAWN_GAP;
    }
    return;
  }
  if (alive === 0) {
    if (waveActive) {
      waveActive = false;
      pauseTimer = WAVE_PAUSE;
      const bonus = 10 + wave * 5;
      save.coins += bonus;
      showBanner(hud, `Wave ${wave} cleared! +${bonus}`);
      confetti(player.mesh.position, 40, 8);
    } else {
      pauseTimer -= dt;
      if (pauseTimer <= 0) startWave();
    }
  }
}

// ---------------------------------------------------------------- George Washington
const bossEnv = {
  player: player.mesh.position,
  map,
  wake: () => startIntro(),
  bonk: (dmg) => bonkPlayer(dmg),
  throwPie: (from, to) => pies.push(makePie(world.fxGroup, from, to)),
  summon: (center) => {
    showBanner(hud, 'Zombie pals!', 1200);
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 + Math.random();
      const pos = { x: center.x + Math.cos(a) * 4, z: center.z + Math.sin(a) * 4 };
      pushOut(pos, 0.8, map.obstacles, map.bounds);
      zombies.push(spawnZombie(world.entities, 'shambler', pos));
      confetti(new THREE.Vector3(pos.x, 0, pos.z), 6, 4);
    }
  },
  stomp: (b) => {
    const p = b.mesh.position;
    ring(p, 8, 0xffe0b0, 0.6);
    dust(p, 12);
    addShake(0.4);
    const d = Math.hypot(p.x - player.mesh.position.x, p.z - player.mesh.position.z);
    if (d < 6) bonkPlayer(10);
  },
};

function startIntro() {
  if (!boss || boss.state !== 'sleep') return;
  boss.state = 'intro';
  boss.stateT = 0;
  spawnQueue = [];
  waveActive = false;
  pauseTimer = 3;
  clearZombies();
  cine = { kind: 'intro', t: 0, dur: 3.8 };
  world.cam.zoomTarget = 0.5;
  showTitleCard(hud, 'ZOMBIE GEORGE WASHINGTON', 'The Founding Father of Funk', true);
  flash('#ffe9a8', 300);
  addShake(0.5);
}

function endIntro() {
  cine = null;
  boss.state = 'fight';
  boss.stateT = 0;
  boss.alive = true;
  world.cam.zoomTarget = 1;
  showTitleCard(hud, '', '', false);
  showBanner(hud, 'Wear him down to charge the cure meter!', 2600);
}

function bossWeakened() {
  boss.state = 'weak';
  boss.alive = false;
  boss.stateT = 0;
  clearZombies();
  pies.length = 0;
  flash('#ffffff', 250);
  addShake(0.4);
  showBanner(hud, 'George is dizzy!', 2200);
  showToast(hud, 'Grab the glowing Liberty Tonic!', 5000);
  const p = player.mesh.position;
  const a = Math.random() * Math.PI * 2;
  const pos = { x: p.x + Math.cos(a) * 9, z: p.z + Math.sin(a) * 9 };
  pushOut(pos, 1.5, map.obstacles, map.bounds);
  tonic = createTonic(world.entities, pos);
}

function startCure() {
  boss.state = 'curing';
  boss.stateT = 0;
  cine = { kind: 'cure', t: 0, dur: 3.6, fx: 0 };
  world.cam.zoomTarget = 0.55;
  showTitleCard(hud, 'CURE TIME!', 'Liberty Tonic activated', true);
  flash('#a8f0ff', 300);
}

function finishCure() {
  const pos = boss.mesh.position.clone();
  ally = bossToAlly(boss);
  boss = null;
  cine = null;
  world.cam.zoomTarget = 1;
  showTitleCard(hud, '', '', false);
  setBoss(hud, false);
  confetti(pos, 70, 10);
  ring(pos, 10, 0xffd24a, 0.8);
  flash('#ffffff', 500);
  save.roster.george = true;
  save.coins += 150;
  writeSave(save);
  mode = 'win';
  setOverlay(hud.win, true);
}

// ---------------------------------------------------------------- input
window.addEventListener('keydown', (e) => {
  if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
  keys.add(e.code);
  if (mode !== 'play') return;
  if (e.code.startsWith('Digit')) {
    const n = Number(e.code.slice(5)) - 1;
    if (n >= 0 && n < WEAPONS.length) selectSlot(n);
  }
  if (e.code === 'KeyB') toggleShop();
  if (e.code === 'Escape') toggleShop(false);
});
window.addEventListener('keyup', (e) => keys.delete(e.code));
host.addEventListener('pointermove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
host.addEventListener('pointerdown', (e) => {
  if (e.button !== 0) return;
  mouse.down = true;
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener('pointerup', () => (mouse.down = false));
window.addEventListener('blur', () => {
  keys.clear();
  mouse.down = false;
});

hud.btnStart.addEventListener('click', () => {
  mode = 'play';
  setOverlay(hud.menu, false);
  showBanner(hud, map.name, 2200);
});
hud.btnReset.addEventListener('click', () => {
  resetSave();
  location.reload();
});
hud.btnShopClose.addEventListener('click', () => toggleShop(false));
hud.btnRetry.addEventListener('click', () => location.reload());
hud.btnKeep.addEventListener('click', () => {
  mode = 'play';
  setOverlay(hud.win, false);
  pauseTimer = 2;
  showToast(hud, 'George will fight alongside you. Keep earning coins!', 4000);
});

// ---------------------------------------------------------------- update
function updateAim() {
  const rect = world.renderer.domElement.getBoundingClientRect();
  if (rect.width <= 0) return;
  pointer.x = ((mouse.x - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((mouse.y - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, world.camera);
  if (raycaster.ray.intersectPlane(groundPlane, aimPoint)) {
    const dx = aimPoint.x - player.mesh.position.x;
    const dz = aimPoint.z - player.mesh.position.z;
    if (Math.hypot(dx, dz) > 0.3) {
      player.yaw = Math.atan2(dx, dz);
      player.mesh.rotation.y = player.yaw;
    }
  }
}

/** Test-only autopilot (?auto): chases tonic, George, or the nearest foe and swings. */
function autopilot() {
  const p = player.mesh.position;
  let goal = null;
  let stop = 1.8;
  if (tonic) goal = tonic;
  else if (boss && boss.state === 'weak' && boss.hasTonic) goal = boss.mesh.position;
  else {
    let best = 1e9;
    for (const tg of targets()) {
      const d = Math.hypot(tg.mesh.position.x - p.x, tg.mesh.position.z - p.z);
      if (d < best) {
        best = d;
        goal = tg.mesh.position;
      }
    }
    stop = 2.2;
    if (goal) {
      player.yaw = Math.atan2(goal.x - p.x, goal.z - p.z);
      player.mesh.rotation.y = player.yaw;
      mouse.down = true;
    }
  }
  if (!goal) return { x: 0, z: 0 };
  const dx = goal.x - p.x;
  const dz = goal.z - p.z;
  const d = Math.hypot(dx, dz);
  return d > stop ? { x: dx, z: dz } : { x: 0, z: 0 };
}

function updatePlayer(dt) {
  player.attackCd = Math.max(0, player.attackCd - dt);
  player.invuln = Math.max(0, player.invuln - dt);
  if (!AUTO) updateAim();

  let x = 0;
  let z = 0;
  if (AUTO) ({ x, z } = autopilot());
  if (keys.has('KeyW') || keys.has('ArrowUp')) z -= 1;
  if (keys.has('KeyS') || keys.has('ArrowDown')) z += 1;
  if (keys.has('KeyA') || keys.has('ArrowLeft')) x -= 1;
  if (keys.has('KeyD') || keys.has('ArrowRight')) x += 1;
  const len = Math.hypot(x, z);
  const p = player.mesh.position;
  const inGoo = puddles.some((pd) => Math.hypot(pd.x - p.x, pd.z - p.z) < pd.r);
  if (len > 0) {
    const sp = PLAYER_SPEED * (inGoo ? 0.5 : 1);
    p.x += (x / len) * sp * dt;
    p.z += (z / len) * sp * dt;
  }
  player.moving += ((len > 0 ? 1 : 0) - player.moving) * Math.min(1, dt * 12);
  pushOut(p, PLAYER_RADIUS, map.obstacles, map.bounds);

  if ((mouse.down || keys.has('Space')) && player.attackCd <= 0) {
    attack(player, save.current, level(), atkCtx);
  }
  animatePlayer(player, t, dt);
}

function updateGame(dt) {
  updatePlayer(dt);

  updateZombies(zombies, player.mesh.position, dt, t, map, zombieCb);
  zombies = zombies.filter((z) => !z.gone);
  updateProjectiles(projectiles, atkCtx, dt);

  if (boss) {
    updateBoss(boss, dt, t, bossEnv);
    if (boss.state === 'sleep') {
      boss.zzzT += 0; // zzz handled below
      if (Math.floor(t * 0.7) !== Math.floor((t - dt) * 0.7)) floatText(boss.mesh.position, 'Zzz...', '#ffffff');
    }
    if (boss.state === 'fight' || boss.state === 'weak') {
      setBoss(hud, true, boss.hp / boss.hpMax, cureMeter(boss), map.bossName);
    }
  }

  const landed = updatePies(pies, dt, world.fxGroup, puddles);
  for (const l of landed) {
    ring({ x: l.x, z: l.z }, 3, 0x7f9bff, 0.4);
    dust(new THREE.Vector3(l.x, 0, l.z), 6);
    addShake(0.08);
  }

  if (tonic) {
    updateTonic(tonic, t);
    const d = Math.hypot(tonic.x - player.mesh.position.x, tonic.z - player.mesh.position.z);
    if (d < 1.8) {
      world.entities.remove(tonic.mesh);
      tonic = null;
      boss.hasTonic = true;
      confetti(player.mesh.position, 30, 7);
      flash('#a8f0ff', 200);
      showBanner(hud, 'Got the Liberty Tonic!', 1800);
      showToast(hud, 'Bring it to George!', 4000);
    }
  }
  if (boss && boss.state === 'weak' && boss.hasTonic) {
    const d = Math.hypot(boss.mesh.position.x - player.mesh.position.x, boss.mesh.position.z - player.mesh.position.z);
    if (d < 4.5) startCure();
  }

  if (ally) {
    updateAlly(ally, player.mesh.position, targets(), dt, t, {
      map,
      hit,
      ring: (p, r, c) => ring(p, r, c, 0.45),
      shake: addShake,
    });
  }

  updateWaves(dt);

  saveTimer += dt;
  if (saveTimer > 2.5) {
    saveTimer = 0;
    writeSave(save);
  }
}

function updateCine(dt) {
  cine.t += dt;
  player.attackCd = 0;
  player.moving *= 0.8;
  animatePlayer(player, t, dt);
  if (cine.kind === 'intro') {
    updateBoss(boss, dt, t, bossEnv);
    if (Math.floor(cine.t * 3) !== Math.floor((cine.t - dt) * 3) && cine.t > 1.2) {
      addShake(0.2);
      dust(boss.mesh.position, 5);
    }
    if (cine.t >= cine.dur) endIntro();
  } else {
    updateBoss(boss, dt, t, bossEnv);
    cine.fx -= dt;
    if (cine.fx <= 0) {
      cine.fx = 0.28;
      ring(boss.mesh.position, 4 + cine.t * 2, pick([0xffd24a, 0x7ee8ff, 0xff9ac0, 0x9dffb0]), 0.6);
      confetti(boss.mesh.position, 14, 7);
      starPop(boss.mesh.position, 5);
    }
    if (cine.t >= cine.dur) finishCure();
  }
}

// ---------------------------------------------------------------- compass
const projV = new THREE.Vector3();
function updateCompass() {
  let target = null;
  if (mode === 'play' && !cine) {
    if (boss && boss.state === 'sleep' && wave >= 2) target = boss.mesh.position;
    else if (boss && boss.state === 'weak') target = tonic ? { x: tonic.x, z: tonic.z } : boss.mesh.position;
  }
  if (!target) {
    hud.compass.classList.remove('show');
    return;
  }
  projV.set(target.x, 1, target.z).project(world.camera);
  const onScreen = projV.z < 1 && Math.abs(projV.x) < 0.88 && Math.abs(projV.y) < 0.8;
  if (onScreen) {
    hud.compass.classList.remove('show');
    return;
  }
  const w = hud.layer.clientWidth;
  const h = hud.layer.clientHeight;
  let dx = projV.x * (w / 2);
  let dy = -projV.y * (h / 2);
  if (projV.z > 1) {
    dx = -dx;
    dy = -dy;
  }
  const dl = Math.hypot(dx, dy) || 1;
  const r = Math.min(w, h) * 0.34;
  hud.compass.style.left = `${w / 2 + (dx / dl) * r}px`;
  hud.compass.style.top = `${h / 2 + (dy / dl) * r}px`;
  hud.compassArrow.style.transform = `rotate(${Math.atan2(dx, -dy)}rad)`;
  const dist = Math.hypot(target.x - player.mesh.position.x, target.z - player.mesh.position.z);
  hud.compassDist.textContent = `${Math.round(dist)} m`;
  hud.compass.classList.add('show');
}

// ---------------------------------------------------------------- main loop
const DEBUG = qs.has('debug') || qs.has('boss') || qs.has('auto');
let last = performance.now();
function frame(ms) {
  requestAnimationFrame(frame);
  const real = Math.min(0.05, (ms - last) / 1000);
  last = ms;
  let dt = real;
  if (fx.freeze > 0) {
    fx.freeze -= real;
    dt = real * 0.06;
  }
  updateFx(real);
  t += dt;

  if (mode === 'play' && !shopOpen) {
    if (cine) updateCine(dt);
    else updateGame(dt);
  } else if (mode === 'menu') {
    animatePlayer(player, t, dt);
  }
  map.update(player.mesh.position, real, t);

  if (cine && boss) focus.set(boss.mesh.position.x, 0, boss.mesh.position.z);
  else focus.set(player.mesh.position.x, 0, player.mesh.position.z);
  updateCamera(world, focus, real, fx.shake, cine ? 3 : 5);

  refreshHud(hud, save, player, wave, !!ally);
  updateCompass();
  if (DEBUG) {
    const p = player.mesh.position;
    document.title = `${mode} ${cine ? cine.kind + cine.t.toFixed(1) : '-'} p(${p.x.toFixed(1)},${p.z.toFixed(1)}) f(${world.cam.focus.x.toFixed(1)},${world.cam.focus.z.toFixed(1)}) z${world.cam.zoom.toFixed(2)} boss:${boss ? boss.state : '-'} n${zombies.length}`;
  }
  world.renderer.render(world.scene, world.camera);
}

equipCurrent();
syncUi();
// Start the camera right on the hero.
world.cam.focus.set(player.mesh.position.x, 0, player.mesh.position.z);
requestAnimationFrame(frame);
console.info('[History Zombies] ready');

// Handy test links: ?boss jumps next to George, ?boss=weak also makes him nearly cured.
if (qs.has('auto')) {
  mode = 'play';
  setOverlay(hud.menu, false);
}
if (qs.has('boss') && boss) {
  player.mesh.position.set(map.bossSpawn.x + 10, 0, map.bossSpawn.z);
  world.cam.focus.set(player.mesh.position.x, 0, player.mesh.position.z);
  if (qs.get('boss') === 'weak') boss.hp = 8;
  save.coins = Math.max(save.coins, 500);
  mode = 'play';
  setOverlay(hud.menu, false);
}

// Debug hook for testing.
window.__hz = { save, player, world, get boss() { return boss; }, get zombies() { return zombies; }, get wave() { return wave; } };
