import * as THREE from 'three';
import {
  ABE_KILLS,
  BOSS_KILLS,
  MAX_ALIVE,
  PLAYER_HP,
  PLAYER_RADIUS,
  PLAYER_SPEED,
  WAVE_PAUSE,
  WAVE_SPAWN_GAP,
  WEAPONS,
  ZOMBIE_TYPES,
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
import { animatePlayer, createPlayer, equipVisual, setArmorVisual } from './player.js';
import { createWorld, updateCamera } from './scene.js';
import {
  bindHud,
  refreshHud,
  renderCatalog,
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
import { createAbe, makeHat, updateAbe, updateHats } from './lincoln.js';

// ---------------------------------------------------------------- setup
const host = document.getElementById('canvas-host');
const world = createWorld(host);
const hud = bindHud();
initFx(world, hud.layer, hud.flash);
const map = buildWhiteHouse(world.scene);
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
let catalogOpen = false;
/** @type {any} */
let abe = null;
const hats = [];
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
let camSpin = 0;
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

function applyArmor() {
  const lvl = save.armor || 0;
  const prevMax = player.hpMax;
  player.hpMax = PLAYER_HP + lvl * 10;
  player.hp = Math.min(player.hpMax, player.hp + (player.hpMax - prevMax));
  setArmorVisual(player, lvl);
}

function equipCurrent() {
  equipVisual(player, save.current, level());
  if ((save.armor || 0) !== player.armorLevel) {
    player.armorLevel = save.armor || 0;
    applyArmor();
  }
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
  if (i === -2) return toggleCatalog();
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

function toggleCatalog(force) {
  if (mode !== 'play' || cine || shopOpen) return;
  catalogOpen = force !== undefined ? force : !catalogOpen;
  setOverlay(hud.catalog, catalogOpen);
  if (catalogOpen) renderCatalog(hud, save);
}

function markSeen(id, name) {
  if (save.seen[id]) return;
  save.seen[id] = true;
  writeSave(save);
  showToast(hud, `New zombie in the Catalog: ${name}! (press C)`, 3500);
}

function toggleShop(force) {
  if (mode !== 'play' || cine || catalogOpen) return;
  shopOpen = force !== undefined ? force : !shopOpen;
  setOverlay(hud.shop, shopOpen);
  if (shopOpen) renderShop(hud, save, () => {
    equipCurrent();
    syncUi();
  });
}

// ---------------------------------------------------------------- combat plumbing
const georgeBusy = () => !!boss && boss.state !== 'sleep';
const bossBusy = () => georgeBusy() || !!abe;
let targetCache = null;
const targets = () => {
  if (targetCache) return targetCache;
  const list = zombies.filter((z) => z.alive);
  if (boss && boss.alive) list.push(boss);
  if (abe && abe.alive) list.push(abe);
  targetCache = list;
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
    if (weak) {
      if (tg === abe) abeDefeated();
      else bossWeakened();
    }
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
    if (boss && boss.state === 'sleep' && save.kills === BOSS_KILLS) {
      showBanner(hud, '35 bonks! Something is snoring...', 3000);
      showToast(hud, 'Follow the arrow to the sleepy zombie behind the mansion!', 6000);
    }
    floatText({ x: p.x, y: 0.4, z: p.z }, `+${tg.coins}`, '#ffd24a');
  }
}

const atkCtx = { targets, hit, fxGroup: world.fxGroup, projectiles };

function bonkPlayer(dmg) {
  if (player.invuln > 0 || mode !== 'play') return;
  const reduced = Math.max(1, Math.round(dmg * (1 - 0.1 * (save.armor || 0))));
  player.hp = Math.max(0, player.hp - reduced);
  player.invuln = 0.8;
  addShake(0.25);
  flash('#ffffff', 140);
  floatText(player.mesh.position, 'Oof!', '#ffb3c6');
  if (player.hp <= 0) {
    mode = 'over';
    save.coins = 0;
    save.kills = 0;
    writeSave(save);
    setOverlay(hud.over, true);
  }
}

const zombieCb = {
  zzz(z) {
    if (Math.hypot(z.mesh.position.x - player.mesh.position.x, z.mesh.position.z - player.mesh.position.z) < 26) {
      floatText(z.mesh.position, 'Zzz...', '#ffffff');
    }
  },
  wake(z) {
    floatText(z.mesh.position, 'Huh?!', '#ffe066');
    addShake(0.05);
  },
  throwGoo(z) {
    const from = z.mesh.position.clone();
    from.y = 2.6;
    pies.push(makePie(world.fxGroup, from, player.mesh.position));
  },
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
  markSeen(id, ZOMBIE_TYPES[id].name);
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
  wake: () => {
    if (save.kills >= BOSS_KILLS && !abe) startIntro();
  },
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
  markSeen('george', 'Zombie George Washington');
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


// ---------------------------------------------------------------- Abe Lincoln
const abeEnv = {
  player: player.mesh.position,
  map,
  summon: (center) => {
    showBanner(hud, 'Abe calls for backup!', 1200);
    for (let i = 0; i < 2; i++) {
      const a = Math.random() * Math.PI * 2;
      const pos = { x: center.x + Math.cos(a) * 5, z: center.z + Math.sin(a) * 5 };
      pushOut(pos, 0.8, map.obstacles, map.bounds);
      zombies.push(spawnZombie(world.entities, 'agent', pos));
      confetti(new THREE.Vector3(pos.x, 0, pos.z), 6, 4);
    }
    markSeen('agent', ZOMBIE_TYPES.agent.name);
  },
  throwHat: (a, spread, primary) => {
    hats.push(makeHat(world.fxGroup, a, player.mesh.position, spread, primary));
    if (primary) floatText(a.mesh.position, 'HAT TOSS!', '#ffe066');
  },
};

const hatEnv = {
  player: player.mesh.position,
  bonk: (dmg) => bonkPlayer(dmg),
  sparkle: (p) => starPop(p, 5),
};

function startAbe() {
  let best = map.spawnPoints[0];
  let bd = -1;
  for (const sp of map.spawnPoints) {
    const d = Math.hypot(sp.x - player.mesh.position.x, sp.z - player.mesh.position.z);
    if (d > bd && d < 40) {
      bd = d;
      best = sp;
    }
  }
  const pos = { x: best.x * 0.7, z: best.z * 0.7 };
  pushOut(pos, 1.5, map.obstacles, map.bounds);
  abe = createAbe(world.entities, pos);
  markSeen('abe', 'Zombie Abe Lincoln');
  spawnQueue = [];
  waveActive = false;
  pauseTimer = 3;
  clearZombies();
  cine = { kind: 'abe', t: 0, dur: 3.6 };
  world.cam.zoomTarget = 0.5;
  showTitleCard(hud, 'ZOMBIE ABE LINCOLN', 'Four score and seven bonks ago...', true);
  flash('#ffe9a8', 300);
  addShake(0.4);
}

function endAbeIntro() {
  cine = null;
  abe.state = 'fight';
  abe.stateT = 0;
  abe.alive = true;
  world.cam.zoomTarget = 1;
  showTitleCard(hud, '', '', false);
  showBanner(hud, 'Dodge the flying hat!', 2400);
}

function abeDefeated() {
  abe.alive = false;
  abe.state = 'leaving';
  abe.stateT = 0;
  clearZombies();
  for (const h of hats) h.mesh.parent?.remove(h.mesh);
  hats.length = 0;
  setBoss(hud, false);
  flash('#ffffff', 300);
  addShake(0.4);
  confetti(abe.mesh.position, 60, 9);
  ring(abe.mesh.position, 9, 0xffd24a, 0.8);
  save.coins += 250;
  save.roster.abe = true;
  writeSave(save);
  showBanner(hud, 'Abe Lincoln is cured!', 2600);
  showToast(hud, 'Abe tips his hat and heads home. +250 coins!', 5000);
  pauseTimer = 4;
}

// ---------------------------------------------------------------- input
window.addEventListener('keydown', (e) => {
  if (e.code === 'KeyQ') camSpin = -1;
  if (e.code === 'KeyE') camSpin = 1;
  if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
  keys.add(e.code);
  if (mode !== 'play') return;
  if (e.code.startsWith('Digit')) {
    const n = Number(e.code.slice(5)) - 1;
    if (n >= 0 && n < WEAPONS.length) selectSlot(n);
  }
  if (e.code === 'KeyB') toggleShop();
  if (e.code === 'KeyC') toggleCatalog();
  if (e.code === 'Escape') {
    toggleShop(false);
    toggleCatalog(false);
  }
});
window.addEventListener('keyup', (e) => {
  keys.delete(e.code);
  if (e.code === 'KeyQ' && camSpin < 0) camSpin = 0;
  if (e.code === 'KeyE' && camSpin > 0) camSpin = 0;
});
host.addEventListener('contextmenu', (e) => e.preventDefault());
host.addEventListener('wheel', (e) => {
  e.preventDefault();
  world.cam.userZoom = Math.max(0.55, Math.min(1.7, world.cam.userZoom * (1 + Math.sign(e.deltaY) * 0.08)));
}, { passive: false });
let dragging = false;
let dragX = 0;
window.addEventListener('pointermove', (e) => {
  if (!dragging) return;
  world.cam.yaw -= (e.clientX - dragX) * 0.008;
  dragX = e.clientX;
});
host.addEventListener('pointerdown', (e) => {
  if (e.button === 2) {
    dragging = true;
    dragX = e.clientX;
  }
});
window.addEventListener('pointerup', (e) => {
  if (e.button === 2) dragging = false;
});
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
hud.btnCatalogClose.addEventListener('click', () => toggleCatalog(false));
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

function updatePlayer(dt) {
  player.attackCd = Math.max(0, player.attackCd - dt);
  player.invuln = Math.max(0, player.invuln - dt);
  updateAim();

  let x = 0;
  let z = 0;
  if (keys.has('KeyW') || keys.has('ArrowUp')) z -= 1;
  if (keys.has('KeyS') || keys.has('ArrowDown')) z += 1;
  if (keys.has('KeyA') || keys.has('ArrowLeft')) x -= 1;
  if (keys.has('KeyD') || keys.has('ArrowRight')) x += 1;
  {
    const c = Math.cos(world.cam.yaw);
    const sn = Math.sin(world.cam.yaw);
    const rx = x * c + z * sn;
    const rz = -x * sn + z * c;
    x = rx;
    z = rz;
  }
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
  targetCache = null;
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

  if (abe) {
    if (updateAbe(abe, dt, t, abeEnv)) {
      abe = null;
    } else if (abe.state === 'fight') {
      setBoss(hud, true, abe.hp / abe.hpMax, 1 - abe.hp / abe.hpMax, 'Zombie Abe Lincoln');
    }
  }
  updateHats(hats, dt, hatEnv);
  if (!abe && !save.roster.abe && save.kills >= ABE_KILLS && !georgeBusy() && !cine) startAbe();

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
  targetCache = null;
  cine.t += dt;
  player.attackCd = 0;
  player.moving *= 0.8;
  animatePlayer(player, t, dt);
  if (cine.kind === 'abe') {
    updateAbe(abe, dt, t, abeEnv);
    if (Math.floor(cine.t * 3) !== Math.floor((cine.t - dt) * 3) && cine.t > 1.4) {
      addShake(0.15);
      starPop(abe.mesh.position, 3);
    }
    if (cine.t >= cine.dur) endAbeIntro();
  } else if (cine.kind === 'intro') {
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
    if (boss && boss.state === 'sleep' && save.kills >= BOSS_KILLS) target = boss.mesh.position;
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
  world.cam.yaw += camSpin * real * 1.8;
  t += dt;

  if (mode === 'play' && !shopOpen && !catalogOpen) {
    if (cine) updateCine(dt);
    else updateGame(dt);
  } else if (mode === 'menu') {
    animatePlayer(player, t, dt);
  }
  map.update(player.mesh.position, real, t);

  const cineTarget = cine ? (cine.kind === 'abe' ? abe : boss) : null;
  if (cineTarget) focus.set(cineTarget.mesh.position.x, 0, cineTarget.mesh.position.z);
  else focus.set(player.mesh.position.x, 0, player.mesh.position.z);
  updateCamera(world, focus, real, fx.shake, cine ? 3 : 5);

  refreshHud(hud, save, player, wave, !!ally);
  updateCompass();
  world.renderer.render(world.scene, world.camera);
}

equipCurrent();
syncUi();
// Start the camera right on the hero.
world.cam.focus.set(player.mesh.position.x, 0, player.mesh.position.z);
requestAnimationFrame(frame);
console.info('[History Zombies] ready');

