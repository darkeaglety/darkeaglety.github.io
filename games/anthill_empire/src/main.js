import * as THREE from 'three';
import {
  RAID_PICK_PX,
  RIVAL_NEST_CAPTURE_FOOD_BONUS,
  RIVAL_NEST_COUNT,
  MINIGAME_PASSWORD,
  WAVE_START_DELAY_MS,
} from './constants.js';
import {
  assignScoutsToPile,
  createColonyAntVisuals,
  removeAnt,
  spawnFoodPiles,
  spawnScoutVisual,
  spawnSoldierVisual,
  billboardHealthBars,
  updateFoodPiles,
  updateScouts,
} from './ants.js';
import {
  createCombatState,
  handleNestBreach,
  maybeSpawnWave,
  updateCombat,
} from './combat.js';
import {
  applyFruitChoice,
  createEconomy,
  idleWorkers,
  resetColonyForDesert,
  tryHatchSoldier,
  tryHatchWorker,
  tryUpgradeNest,
} from './economy.js';
import {
  beginRaid,
  allRivalDefenders,
  billboardRivalNestBars,
  clearRivalNests,
  createRaidState,
  idleRaidSoldiers,
  pickRivalNestAtScreen,
  spawnRivalNests,
  updateRaid,
  updateRivalNests,
} from './raids.js';
import {
  clearSpecialAnts,
  syncSpecialAntVisuals,
  tryBuySpecialAnt,
  updateSpecialAnts,
} from './shop.js';
import {
  createTicTacToe,
  playTicTacToeMove,
  resetTicTacToe,
} from './minigames.js';
import { attachOrbit, applyDesertTheme, createWorld, setNestLevelVisual } from './scene.js';
import {
  bindHud,
  hideTip,
  refreshHud,
  refreshRaidParty,
  renderTicTacToe,
  setBanner,
  setFruitChoiceVisible,
  setGameOverVisible,
  setMinigamesVisible,
  setShopVisible,
  setStageVisible,
  setTip,
  setWinVisible,
} from './ui.js';

const host = document.getElementById('canvas-host');
const world = createWorld(host);
const orbit = attachOrbit(host, world.camera);

const eco = createEconomy();
const combat = createCombatState();
const raid = createRaidState();
const hud = bindHud();

/** @type {number[]} */
const fruitQueue = [];
let fruitChoiceOpen = false;

const foodPiles = spawnFoodPiles(world.foodGroup);
/** @type {import('./raids.js').RivalNest[]} */
let rivalNests = spawnRivalNests(world.scene, world.antGroup, RIVAL_NEST_COUNT, eco);
const scouts = createColonyAntVisuals(world.antGroup, eco.workers);
/** @type {import('./ants.js').Ant[]} */
const soldiers = [];
/** @type {import('./ants.js').Ant[]} */
const specialAnts = [];
for (let i = 0; i < eco.soldiers; i++) {
  soldiers.push(spawnSoldierVisual(world.antGroup));
}

let shopOpen = false;
let minigamesOpen = false;
const ttt = createTicTacToe();

setNestLevelVisual(world.nest, eco.nestLevel);
/** How many idle soldiers to send on the next nest raid. */
let raidPartySize = 1;

function syncHud() {
  refreshHud(hud, eco, combat.wave);
  const idle = idleRaidSoldiers(soldiers);
  const maxParty = Math.max(idle, eco.soldiers);
  if (maxParty <= 0) {
    raidPartySize = 0;
  } else {
    raidPartySize = Math.min(Math.max(1, raidPartySize || 1), maxParty);
  }
  refreshRaidParty(hud, raidPartySize, maxParty);
}

syncHud();

hud.btnRaidMinus.addEventListener('click', () => {
  if (raidPartySize <= 1) return;
  raidPartySize -= 1;
  syncHud();
});

hud.btnRaidPlus.addEventListener('click', () => {
  const maxParty = Math.max(idleRaidSoldiers(soldiers), eco.soldiers);
  if (raidPartySize >= maxParty) return;
  raidPartySize += 1;
  syncHud();
});

let tipHidden = false;
const hideTipSoon = () => {
  if (tipHidden) return;
  tipHidden = true;
  setTimeout(() => hideTip(hud), 9000);
};
hideTipSoon();

function showNextFruitChoice() {
  if (fruitChoiceOpen || fruitQueue.length === 0) return;
  fruitChoiceOpen = true;
  const amount = fruitQueue[0];
  setFruitChoiceVisible(hud, true, amount);
}

/**
 * @param {'eat' | 'fortify'} choice
 */
function resolveFruitChoice(choice) {
  if (!fruitChoiceOpen || fruitQueue.length === 0) return;
  const amount = fruitQueue.shift();
  const msg = applyFruitChoice(eco, amount, choice);
  fruitChoiceOpen = false;
  setFruitChoiceVisible(hud, false);
  setTip(hud, msg);
  tipHidden = false;
  hideTipSoon();
  syncHud();
  showNextFruitChoice();
}

hud.btnEatFruit.addEventListener('click', () => resolveFruitChoice('eat'));
hud.btnFortifyNest.addEventListener('click', () => resolveFruitChoice('fortify'));

hud.btnWorker.addEventListener('click', () => {
  if (eco.gameOver) return;
  if (!tryHatchWorker(eco)) return;
  scouts.push(spawnScoutVisual(world.antGroup));
  syncHud();
});

hud.btnSoldier.addEventListener('click', () => {
  if (eco.gameOver) return;
  if (!tryHatchSoldier(eco)) return;
  soldiers.push(spawnSoldierVisual(world.antGroup));
  syncHud();
});

hud.btnUpgrade.addEventListener('click', () => {
  if (eco.gameOver) return;
  if (!tryUpgradeNest(eco)) return;
  setNestLevelVisual(world.nest, eco.nestLevel);
  checkWin();
  syncHud();
});

hud.btnContinue.addEventListener('click', () => {
  setWinVisible(hud, false);
});

function openMinigameLounge() {
  setWinVisible(hud, false);
  setShopVisible(hud, false);
  shopOpen = false;
  minigamesOpen = true;
  resetTicTacToe(ttt);
  renderTicTacToe(hud, ttt);
  setMinigamesVisible(hud, true);
}

function tryPasswordTeleport() {
  if ((eco.worldStage ?? 1) !== 1) return;
  const typed = hud.passwordInput.value.trim().toLowerCase().replace(/\s+/g, '');
  if (typed !== MINIGAME_PASSWORD) {
    setTip(hud, 'Wrong password.');
    tipHidden = false;
    hideTipSoon();
    return;
  }
  hud.passwordInput.value = '';
  setTip(hud, 'Password accepted — jumping to the victory lounge!');
  tipHidden = false;
  hideTipSoon();
  openMinigameLounge();
}

hud.btnPassword.addEventListener('click', () => {
  tryPasswordTeleport();
});

hud.passwordInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    tryPasswordTeleport();
  }
});

// Don't let typing in the password field start map drags.
hud.passwordInput.addEventListener('pointerdown', (event) => {
  event.stopPropagation();
});

hud.btnMinigames.addEventListener('click', () => {
  openMinigameLounge();
});

hud.tttBoard.addEventListener('click', (event) => {
  const target = /** @type {HTMLElement} */ (event.target);
  const cell = target.closest('.ttt-cell');
  if (!cell) return;
  const index = Number(cell.getAttribute('data-cell'));
  if (!Number.isFinite(index)) return;
  if (!playTicTacToeMove(ttt, index)) return;
  renderTicTacToe(hud, ttt);
});

hud.btnTttReset.addEventListener('click', () => {
  resetTicTacToe(ttt);
  renderTicTacToe(hud, ttt);
});

hud.btnMinigamesBack.addEventListener('click', () => {
  minigamesOpen = false;
  setMinigamesVisible(hud, false);
});

hud.btnMinigamesRestart.addEventListener('click', () => {
  window.location.reload();
});

hud.btnStageContinue.addEventListener('click', () => {
  setStageVisible(hud, false);
  enterDesertLevel();
});

hud.btnRestart.addEventListener('click', () => {
  window.location.reload();
});

hud.btnShop.addEventListener('click', () => {
  shopOpen = true;
  setShopVisible(hud, true);
  refreshHud(hud, eco, combat.wave);
});

hud.btnShopClose.addEventListener('click', () => {
  shopOpen = false;
  setShopVisible(hud, false);
});

hud.btnBuyWizard.addEventListener('click', () => {
  if (!tryBuySpecialAnt(eco, 'wizard')) return;
  syncSpecialAntVisuals(world.antGroup, specialAnts, eco);
  setTip(hud, 'Wizard ant joined! It will pelt invaders with fruit seeds.');
  tipHidden = false;
  hideTipSoon();
  syncHud();
});

hud.btnBuyCharger.addEventListener('click', () => {
  if (!tryBuySpecialAnt(eco, 'charger')) return;
  syncSpecialAntVisuals(world.antGroup, specialAnts, eco);
  setTip(hud, 'Charger ant joined! A fast heavy hitter for your nest guard.');
  tipHidden = false;
  hideTipSoon();
  syncHud();
});

function resetColonyVisuals() {
  for (const ant of scouts) removeAnt(ant);
  scouts.length = 0;
  for (const ant of soldiers) removeAnt(ant);
  soldiers.length = 0;
  clearSpecialAnts(specialAnts, eco);
  fruitQueue.length = 0;
  fruitChoiceOpen = false;
  setFruitChoiceVisible(hud, false);
}

function respawnStartingColony() {
  scouts.push(...createColonyAntVisuals(world.antGroup, eco.workers));
  for (let i = 0; i < eco.soldiers; i++) {
    soldiers.push(spawnSoldierVisual(world.antGroup));
  }
  syncSpecialAntVisuals(world.antGroup, specialAnts, eco);
  setNestLevelVisual(world.nest, eco.nestLevel);
  raidPartySize = 1;
}

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const projected = new THREE.Vector3();
let pointerDown = null;

/** Max screen-pixel distance from a fruit center to count as a click. */
const FOOD_PICK_PX = 56;

/**
 * @param {number} clientX
 * @param {number} clientY
 * @returns {import('./ants.js').FoodPile | null}
 */
function pickFoodAtScreen(clientX, clientY) {
  const rect = world.renderer.domElement.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return null;

  let best = null;
  let bestDist = FOOD_PICK_PX;

  for (const pile of foodPiles) {
    if (!pile.alive || !pile.mesh.visible) continue;
    projected.copy(pile.mesh.position).project(world.camera);
    if (projected.z < -1 || projected.z > 1) continue;

    const sx = (projected.x * 0.5 + 0.5) * rect.width + rect.left;
    const sy = (-projected.y * 0.5 + 0.5) * rect.height + rect.top;
    const d = Math.hypot(clientX - sx, clientY - sy);
    if (d < bestDist) {
      bestDist = d;
      best = pile;
    }
  }

  if (best) return best;

  pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, world.camera);

  const alive = foodPiles.filter((p) => p.alive);
  const targets = alive.flatMap((p) => [p.mesh, p.hit]);
  const hits = raycaster.intersectObjects(targets, false);
  if (hits.length) {
    const idx = hits[0].object.userData.foodIndex;
    return foodPiles[idx] ?? null;
  }

  const groundHits = raycaster.intersectObject(world.ground, false);
  if (!groundHits.length) return null;
  const point = groundHits[0].point;
  let near = null;
  let nearDist = 3.5;
  for (const candidate of alive) {
    const d = Math.hypot(
      point.x - candidate.mesh.position.x,
      point.z - candidate.mesh.position.z,
    );
    if (d < nearDist) {
      nearDist = d;
      near = candidate;
    }
  }
  return near;
}

host.addEventListener('pointerdown', (event) => {
  const canvas = world.renderer.domElement;
  if (event.target !== host && event.target !== canvas) return;
  pointerDown = { x: event.clientX, y: event.clientY };
});

/**
 * @param {PointerEvent} event
 */
function onPointerUp(event) {
  if (eco.gameOver || shopOpen) return;
  if (fruitChoiceOpen) {
    setTip(hud, 'Choose eat or fortify first — then send another worker.');
    tipHidden = false;
    hideTipSoon();
    return;
  }
  if (!pointerDown) return;
  const start = pointerDown;
  pointerDown = null;

  if (orbit.wasOrbiting()) return;
  const drag = Math.hypot(event.clientX - start.x, event.clientY - start.y);
  if (drag > orbit.ORBIT_THRESHOLD) return;

  const rect = world.renderer.domElement.getBoundingClientRect();

  const rival = pickRivalNestAtScreen(
    rivalNests,
    event.clientX,
    event.clientY,
    world.camera,
    rect,
    RAID_PICK_PX,
  );
  if (rival) {
    if (raid.active) {
      setTip(hud, 'A raid is already underway — wait for your soldiers to return.');
      tipHidden = false;
      hideTipSoon();
      return;
    }
    if (combat.invaders.length > 0) {
      setTip(hud, 'Hold the nest! You can’t raid while an enemy wave is attacking.');
      tipHidden = false;
      hideTipSoon();
      return;
    }
    if (idleRaidSoldiers(soldiers) <= 0) {
      setTip(hud, 'Hatch soldiers first, then tap an orange rival nest to raid it.');
      tipHidden = false;
      hideTipSoon();
      return;
    }
    const party = Math.max(1, raidPartySize || 1);
    const sent = beginRaid(raid, rival, soldiers, party, eco, world.antGroup);
    if (sent > 0) {
      setTip(
        hud,
        `Raid launched with ${sent} soldier${sent > 1 ? 's' : ''}! Defeat the nest guards, then steal food. Your home nest is safe until they return.`,
      );
      setBanner(hud, 'Raid!', true);
      tipHidden = false;
      hideTipSoon();
      syncHud();
    }
    return;
  }

  const pile = pickFoodAtScreen(event.clientX, event.clientY);
  if (!pile?.alive) return;

  const available = idleWorkers(eco);
  if (available <= 0) {
    setTip(hud, 'All workers are busy — hatch more or wait for one to return.');
    tipHidden = false;
    hideTipSoon();
    return;
  }

  const sent = assignScoutsToPile(scouts, pile, 1, (n) => {
    eco.scoutsBusy += n;
  });
  if (sent > 0) {
    setTip(hud, 'Worker sent — they’ll bring the fruit back for you to decide.');
    tipHidden = false;
    hideTipSoon();
    syncHud();
  }
}

host.addEventListener('pointerup', onPointerUp);
host.addEventListener('pointercancel', () => {
  pointerDown = null;
});

function checkWin() {
  if (eco.won) return;
  // Beat the game by conquering every desert nest.
  if (
    eco.worldStage >= 2 &&
    rivalNests.length > 0 &&
    rivalNests.every((n) => n.owned)
  ) {
    eco.won = true;
    setBanner(hud, 'Victory!', true);
    setWinVisible(hud, true);
  }
}

/**
 * @param {import('./raids.js').RivalNest[]} nests
 */
function allNestsOwned(nests) {
  return nests.length > 0 && nests.every((n) => n.owned);
}

let last = performance.now();
let stageOfferOpen = false;

function offerDesertLevel() {
  if (eco.worldStage >= 2 || stageOfferOpen) return;
  stageOfferOpen = true;
  setStageVisible(hud, true, {
    title: 'Level 2 — Desert Front',
    desc: 'Every meadow nest is yours. The desert resets your colony — food, army, and nest level start fresh. Keep using the Ant Shop for special fighters!',
    button: 'Enter the Desert',
  });
  setBanner(hud, 'Stage Clear!', true);
}

function enterDesertLevel() {
  if (eco.worldStage >= 2) return;
  stageOfferOpen = false;

  // Abort any mid-raid so soldiers return home cleanly.
  if (raid.active) {
    for (const soldier of raid.raiders) {
      if (soldier.state === 'raidOut' || soldier.state === 'raidReturn') {
        soldier.state = 'patrol';
        soldier.carry = 0;
      }
    }
    raid.active = false;
    raid.nest = null;
    raid.raiders = [];
  }

  for (const inv of combat.invaders) removeAnt(inv);
  combat.invaders = [];
  combat.wave = 0;
  combat.nextWaveAt = performance.now() + WAVE_START_DELAY_MS;
  combat.banner = null;

  clearRivalNests(rivalNests, world.scene);
  resetColonyForDesert(eco);
  resetColonyVisuals();
  applyDesertTheme(world);
  rivalNests = spawnRivalNests(world.scene, world.antGroup, RIVAL_NEST_COUNT, eco);
  respawnStartingColony();

  setBanner(hud, 'Desert Front!', true);
  setTip(
    hud,
    'Fresh start in the desert! Hatch up, open the Ant Shop, and conquer every dune nest to win.',
  );
  tipHidden = false;
  hideTipSoon();
  syncHud();
}

function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;

  if (eco.gameOver || stageOfferOpen || minigamesOpen) {
    world.renderer.render(world.scene, world.camera);
    requestAnimationFrame(frame);
    return;
  }

  // Pause the colony while the victory card is up.
  if (hud.winOverlay.classList.contains('show')) {
    world.renderer.render(world.scene, world.camera);
    requestAnimationFrame(frame);
    return;
  }

  const raidSafe = raid.active;

  updateFoodPiles(foodPiles, now);
  updateRivalNests(rivalNests, world.antGroup, now, dt, raid.nest?.id ?? null, eco);

  updateScouts(
    scouts,
    eco.nestLevel,
    dt,
    (amount) => {
      fruitQueue.push(Math.max(1, Math.floor(amount)));
      showNextFruitChoice();
      syncHud();
    },
    (n) => {
      eco.scoutsBusy = Math.max(0, eco.scoutsBusy + n);
      syncHud();
    },
    now,
  );

  const raidTip = updateRaid(
    raid,
    eco,
    dt,
    now,
    (loot) => {
      fruitQueue.push(Math.max(1, Math.floor(loot)));
      showNextFruitChoice();
      setTip(hud, `Soldiers stole ${loot} food from a rival nest!`);
      tipHidden = false;
      hideTipSoon();
      syncHud();
    },
    (dead) => {
      const idx = soldiers.indexOf(dead);
      if (idx >= 0) soldiers.splice(idx, 1);
      eco.soldiers = Math.max(0, eco.soldiers - 1);
      syncHud();
    },
    (nest) => {
      setBanner(hud, 'Nest Captured!', true);
      setTip(
        hud,
        `You took over a rival nest! +${RIVAL_NEST_CAPTURE_FOOD_BONUS} food now, plus ongoing tribute.`,
      );
      tipHidden = false;
      hideTipSoon();
      syncHud();
      if (allNestsOwned(rivalNests)) {
        if (eco.worldStage < 2) {
          offerDesertLevel();
        } else {
          checkWin();
        }
      }
    },
    world.antGroup,
  );
  if (raidTip) {
    setTip(hud, raidTip);
    tipHidden = false;
    hideTipSoon();
  }

  maybeSpawnWave(
    combat,
    world.antGroup,
    now,
    (text) => {
      setBanner(hud, text, true);
    },
    raidSafe,
    eco,
  );

  updateCombat(
    combat,
    soldiers,
    eco,
    dt,
    now,
    () => {
      const msg = handleNestBreach(combat, eco);
      setTip(hud, msg);
      tipHidden = false;
      setBanner(hud, 'Game Over', true);
      setGameOverVisible(hud, true);
      syncHud();
    },
    raidSafe,
    (food) => {
      setTip(hud, `Wave cleared! The colony claimed ${food} food from the fallen invaders.`);
      tipHidden = false;
      hideTipSoon();
      syncHud();
    },
  );

  updateSpecialAnts(combat, specialAnts, eco, world.antGroup, dt, now, raidSafe);

  billboardHealthBars(
    [...combat.invaders, ...soldiers, ...specialAnts, ...allRivalDefenders(rivalNests)],
    world.camera,
  );
  billboardRivalNestBars(rivalNests, world.camera);

  if (combat.banner && now < combat.bannerUntil) {
    setBanner(hud, combat.banner, true);
  } else if (combat.banner && now >= combat.bannerUntil) {
    combat.banner = null;
    setBanner(hud, '', false);
  }

  const hpRatio = eco.nestHp / eco.nestHpMax;
  world.nestGlow.material.opacity = raidSafe
    ? 0.35 + Math.sin(now * 0.008) * 0.1
    : 0.1 + 0.2 * hpRatio;
  world.nestGlow.material.color.setHex(raidSafe ? 0x66ddff : 0xffc857);

  checkWin();
  syncHud();

  world.renderer.render(world.scene, world.camera);
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

console.info('[Anthill Empire] ready — raids enabled');
