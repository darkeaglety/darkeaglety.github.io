import {
  nestUpgradeCost,
  soldierCost,
  soldierDamage,
  workerCost,
} from './economy.js';
import { MAX_NEST_LEVEL, SHOP_MAX_SPECIAL_PER_TYPE } from './constants.js';
import { canBuySpecialAnt, specialAntCost } from './shop.js';

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
 *   stage: HTMLElement,
 *   hp: HTMLElement,
 *   wave: HTMLElement,
 *   tip: HTMLElement,
 *   banner: HTMLElement,
 *   passwordBar: HTMLElement,
 *   passwordInput: HTMLInputElement,
 *   btnPassword: HTMLButtonElement,
 *   btnWorker: HTMLButtonElement,
 *   btnSoldier: HTMLButtonElement,
 *   btnUpgrade: HTMLButtonElement,
 *   btnShop: HTMLButtonElement,
 *   raidPartyCount: HTMLElement,
 *   btnRaidMinus: HTMLButtonElement,
 *   btnRaidPlus: HTMLButtonElement,
 *   fruitOverlay: HTMLElement,
 *   fruitDesc: HTMLElement,
 *   btnEatFruit: HTMLButtonElement,
 *   btnFortifyNest: HTMLButtonElement,
 *   stageOverlay: HTMLElement,
 *   stageTitle: HTMLElement,
 *   stageDesc: HTMLElement,
 *   btnStageContinue: HTMLButtonElement,
 *   shopOverlay: HTMLElement,
 *   btnBuyWizard: HTMLButtonElement,
 *   btnBuyCharger: HTMLButtonElement,
 *   btnShopClose: HTMLButtonElement,
 *   winOverlay: HTMLElement,
 *   btnContinue: HTMLButtonElement,
 *   btnMinigames: HTMLButtonElement,
 *   minigamesOverlay: HTMLElement,
 *   tttStatus: HTMLElement,
 *   tttBoard: HTMLElement,
 *   btnTttReset: HTMLButtonElement,
 *   btnMinigamesBack: HTMLButtonElement,
 *   btnMinigamesRestart: HTMLButtonElement,
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
    stage: document.getElementById('stat-stage'),
    hp: document.getElementById('stat-hp'),
    wave: document.getElementById('stat-wave'),
    tip: document.getElementById('tip'),
    banner: document.getElementById('wave-banner'),
    passwordBar: document.getElementById('password-bar'),
    passwordInput: /** @type {HTMLInputElement} */ (document.getElementById('password-input')),
    btnPassword: /** @type {HTMLButtonElement} */ (document.getElementById('btn-password')),
    btnWorker: /** @type {HTMLButtonElement} */ (document.getElementById('btn-worker')),
    btnSoldier: /** @type {HTMLButtonElement} */ (document.getElementById('btn-soldier')),
    btnUpgrade: /** @type {HTMLButtonElement} */ (document.getElementById('btn-upgrade')),
    btnShop: /** @type {HTMLButtonElement} */ (document.getElementById('btn-shop')),
    raidPartyCount: document.getElementById('raid-party-count'),
    btnRaidMinus: /** @type {HTMLButtonElement} */ (document.getElementById('btn-raid-minus')),
    btnRaidPlus: /** @type {HTMLButtonElement} */ (document.getElementById('btn-raid-plus')),
    fruitOverlay: document.getElementById('fruit-overlay'),
    fruitDesc: document.getElementById('fruit-desc'),
    btnEatFruit: /** @type {HTMLButtonElement} */ (document.getElementById('btn-eat-fruit')),
    btnFortifyNest: /** @type {HTMLButtonElement} */ (document.getElementById('btn-fortify-nest')),
    stageOverlay: document.getElementById('stage-overlay'),
    stageTitle: document.getElementById('stage-title'),
    stageDesc: document.getElementById('stage-desc'),
    btnStageContinue: /** @type {HTMLButtonElement} */ (document.getElementById('btn-stage-continue')),
    shopOverlay: document.getElementById('shop-overlay'),
    btnBuyWizard: /** @type {HTMLButtonElement} */ (document.getElementById('btn-buy-wizard')),
    btnBuyCharger: /** @type {HTMLButtonElement} */ (document.getElementById('btn-buy-charger')),
    btnShopClose: /** @type {HTMLButtonElement} */ (document.getElementById('btn-shop-close')),
    winOverlay: document.getElementById('win-overlay'),
    btnContinue: /** @type {HTMLButtonElement} */ (document.getElementById('btn-continue')),
    btnMinigames: /** @type {HTMLButtonElement} */ (document.getElementById('btn-minigames')),
    minigamesOverlay: document.getElementById('minigames-overlay'),
    tttStatus: document.getElementById('ttt-status'),
    tttBoard: document.getElementById('ttt-board'),
    btnTttReset: /** @type {HTMLButtonElement} */ (document.getElementById('btn-ttt-reset')),
    btnMinigamesBack: /** @type {HTMLButtonElement} */ (document.getElementById('btn-minigames-back')),
    btnMinigamesRestart: /** @type {HTMLButtonElement} */ (
      document.getElementById('btn-minigames-restart')
    ),
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
  hud.stage.textContent = String(eco.worldStage ?? 1);
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

  hud.btnShop.disabled = false;
  hud.btnShop.textContent = 'Ant Shop';

  // Password teleport is meadow-only (stage 1).
  hud.passwordBar.classList.toggle('show', (eco.worldStage ?? 1) === 1);

  refreshShop(hud, eco);
}

/**
 * @param {Hud} hud
 * @param {Economy} eco
 */
export function refreshShop(hud, eco) {
  const wCost = specialAntCost(eco, 'wizard');
  const cCost = specialAntCost(eco, 'charger');
  hud.btnBuyWizard.textContent =
    eco.wizards >= SHOP_MAX_SPECIAL_PER_TYPE
      ? `Wizard Ant (max ${SHOP_MAX_SPECIAL_PER_TYPE})`
      : `Buy Wizard (${wCost}) — owned ${eco.wizards}`;
  hud.btnBuyCharger.textContent =
    eco.chargers >= SHOP_MAX_SPECIAL_PER_TYPE
      ? `Charger Ant (max ${SHOP_MAX_SPECIAL_PER_TYPE})`
      : `Buy Charger (${cCost}) — owned ${eco.chargers}`;
  hud.btnBuyWizard.disabled = !canBuySpecialAnt(eco, 'wizard');
  hud.btnBuyCharger.disabled = !canBuySpecialAnt(eco, 'charger');
}

/**
 * @param {Hud} hud
 * @param {boolean} show
 */
export function setShopVisible(hud, show) {
  hud.shopOverlay.classList.toggle('show', show);
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
 * @param {{ title?: string, desc?: string, button?: string }} [copy]
 */
export function setStageVisible(hud, show, copy = {}) {
  hud.stageOverlay.classList.toggle('show', show);
  if (copy.title) hud.stageTitle.textContent = copy.title;
  if (copy.desc) hud.stageDesc.textContent = copy.desc;
  if (copy.button) hud.btnStageContinue.textContent = copy.button;
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
export function setMinigamesVisible(hud, show) {
  hud.minigamesOverlay.classList.toggle('show', show);
}

/**
 * @param {Hud} hud
 * @param {import('./minigames.js').TicTacToeState} state
 */
export function renderTicTacToe(hud, state) {
  const cells = hud.tttBoard.querySelectorAll('.ttt-cell');
  cells.forEach((cell, i) => {
    const mark = state.board[i];
    const btn = /** @type {HTMLButtonElement} */ (cell);
    btn.textContent = mark;
    btn.classList.toggle('mark-o', mark === 'O');
    btn.classList.toggle('mark-x', mark === 'X');
    btn.disabled = Boolean(mark) || Boolean(state.winner);
  });
  hud.tttStatus.textContent = (() => {
    if (state.winner === 'draw') return 'Draw! Tap reset for another round.';
    if (state.winner === 'O') return 'O wins!';
    if (state.winner === 'X') return 'X wins!';
    return `Next: ${state.nextMark}`;
  })();
}

/**
 * @param {Hud} hud
 * @param {boolean} show
 */
export function setGameOverVisible(hud, show) {
  hud.gameOverOverlay.classList.toggle('show', show);
}
