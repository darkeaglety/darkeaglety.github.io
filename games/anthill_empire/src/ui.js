import {
  nestUpgradeCost,
  soldierCost,
  soldierDamage,
  workerCost,
} from './economy.js';
import { MAX_NEST_LEVEL } from './constants.js';

/**
 * @typedef {import('./economy.js').Economy} Economy
 */

/**
 * @typedef {{
 *   food: HTMLElement,
 *   workers: HTMLElement,
 *   soldiers: HTMLElement,
 *   atk: HTMLElement,
 *   nest: HTMLElement,
 *   hp: HTMLElement,
 *   wave: HTMLElement,
 *   tip: HTMLElement,
 *   banner: HTMLElement,
 *   btnWorker: HTMLButtonElement,
 *   btnSoldier: HTMLButtonElement,
 *   btnUpgrade: HTMLButtonElement,
 *   raidPartyCount: HTMLElement,
 *   btnRaidMinus: HTMLButtonElement,
 *   btnRaidPlus: HTMLButtonElement,
 *   fruitOverlay: HTMLElement,
 *   fruitDesc: HTMLElement,
 *   btnEatFruit: HTMLButtonElement,
 *   btnFortifyNest: HTMLButtonElement,
 *   winOverlay: HTMLElement,
 *   btnContinue: HTMLButtonElement,
 *   gameOverOverlay: HTMLElement,
 *   btnRestart: HTMLButtonElement,
 * }} Hud
 */

/** @returns {Hud} */
export function bindHud() {
  return {
    food: document.getElementById('stat-food'),
    workers: document.getElementById('stat-workers'),
    soldiers: document.getElementById('stat-soldiers'),
    atk: document.getElementById('stat-atk'),
    nest: document.getElementById('stat-nest'),
    hp: document.getElementById('stat-hp'),
    wave: document.getElementById('stat-wave'),
    tip: document.getElementById('tip'),
    banner: document.getElementById('wave-banner'),
    btnWorker: /** @type {HTMLButtonElement} */ (document.getElementById('btn-worker')),
    btnSoldier: /** @type {HTMLButtonElement} */ (document.getElementById('btn-soldier')),
    btnUpgrade: /** @type {HTMLButtonElement} */ (document.getElementById('btn-upgrade')),
    raidPartyCount: document.getElementById('raid-party-count'),
    btnRaidMinus: /** @type {HTMLButtonElement} */ (document.getElementById('btn-raid-minus')),
    btnRaidPlus: /** @type {HTMLButtonElement} */ (document.getElementById('btn-raid-plus')),
    fruitOverlay: document.getElementById('fruit-overlay'),
    fruitDesc: document.getElementById('fruit-desc'),
    btnEatFruit: /** @type {HTMLButtonElement} */ (document.getElementById('btn-eat-fruit')),
    btnFortifyNest: /** @type {HTMLButtonElement} */ (document.getElementById('btn-fortify-nest')),
    winOverlay: document.getElementById('win-overlay'),
    btnContinue: /** @type {HTMLButtonElement} */ (document.getElementById('btn-continue')),
    gameOverOverlay: document.getElementById('gameover-overlay'),
    btnRestart: /** @type {HTMLButtonElement} */ (document.getElementById('btn-restart')),
  };
}

/**
 * @param {Hud} hud
 * @param {Economy} eco
 * @param {number} wave
 */
export function refreshHud(hud, eco, wave) {
  hud.food.textContent = String(Math.floor(eco.food));
  hud.workers.textContent = `${eco.workers - eco.scoutsBusy}/${eco.workers}`;
  hud.soldiers.textContent = String(eco.soldiers);
  hud.atk.textContent = soldierDamage(eco).toFixed(1).replace(/\.0$/, '');
  hud.nest.textContent = String(eco.nestLevel);
  hud.hp.textContent = `${Math.ceil(eco.nestHp)}/${eco.nestHpMax}`;
  hud.wave.textContent = String(wave);

  const wCost = workerCost(eco);
  const sCost = soldierCost(eco);
  const uCost = nestUpgradeCost(eco);

  hud.btnWorker.textContent = `Hatch Worker (${wCost})`;
  hud.btnSoldier.textContent = `Hatch Soldier (${sCost})`;
  hud.btnUpgrade.textContent =
    eco.nestLevel >= MAX_NEST_LEVEL ? 'Nest Maxed' : `Upgrade Nest (${uCost})`;

  hud.btnWorker.disabled = eco.food < wCost;
  hud.btnSoldier.disabled = eco.food < sCost;
  hud.btnUpgrade.disabled =
    eco.nestLevel >= MAX_NEST_LEVEL || eco.food < uCost;
}

/**
 * Keep raid party size controls in sync with idle soldiers.
 * @param {Hud} hud
 * @param {number} partySize
 * @param {number} idleSoldiers
 */
export function refreshRaidParty(hud, partySize, idleSoldiers) {
  const max = Math.max(0, idleSoldiers);
  const size = max <= 0 ? 0 : Math.min(Math.max(1, partySize), max);
  hud.raidPartyCount.textContent = String(size);
  hud.btnRaidMinus.disabled = size <= 1 || max <= 0;
  hud.btnRaidPlus.disabled = size >= max || max <= 0;
}

/**
 * @param {Hud} hud
 * @param {string | null} text
 * @param {boolean} show
 */
export function setBanner(hud, text, show) {
  hud.banner.textContent = text || '';
  hud.banner.classList.toggle('show', Boolean(show && text));
}

/**
 * @param {Hud} hud
 * @param {string} text
 */
export function setTip(hud, text) {
  hud.tip.textContent = text;
  hud.tip.classList.remove('hidden');
}

/** @param {Hud} hud */
export function hideTip(hud) {
  hud.tip.classList.add('hidden');
}

/**
 * @param {Hud} hud
 * @param {boolean} show
 * @param {number} [amount]
 */
export function setFruitChoiceVisible(hud, show, amount = 0) {
  hud.fruitOverlay.classList.toggle('show', show);
  if (show) {
    hud.fruitDesc.textContent = `A worker brought back ${amount} fruit. Eat it to strengthen soldiers, or fortify the nest’s HP. (Food stockpile also gains ${amount}.)`;
  }
}

/**
 * @param {Hud} hud
 * @param {boolean} show
 */
export function setWinVisible(hud, show) {
  hud.winOverlay.classList.toggle('show', show);
}

/**
 * @param {Hud} hud
 * @param {boolean} show
 */
export function setGameOverVisible(hud, show) {
  hud.gameOverOverlay.classList.toggle('show', show);
}
