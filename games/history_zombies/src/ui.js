import { BOSS_KILLS, MAX_ARMOR, MAX_LEVEL, WEAPONS } from './constants.js';
import { armorCost, buyArmor, equip, buyWeapon, upgradeCost, upgradeWeapon, owns } from './economy.js';

const $ = (id) => document.getElementById(id);
const ICONS = { foam: '\u{1F5E1}\uFE0F', noodle: '\u{1F35C}', confetti: '\u{1F389}', bubble: '\u{1FAE7}', star: '\u{1FA84}' };

export function bindHud() {
  return {
    coins: $('stat-coins'),
    hp: $('stat-hp'),
    wave: $('stat-wave'),
    bonks: $('stat-bonks'),
    armor: $('stat-armor'),
    team: $('stat-team'),
    boss: $('boss'),
    bossName: $('boss-name'),
    bossHp: $('boss-hp').firstElementChild,
    bossCure: $('boss-cure').firstElementChild,
    toast: $('toast'),
    banner: $('banner'),
    titlecard: $('titlecard'),
    tc1: $('tc1'),
    tc2: $('tc2'),
    compass: $('compass'),
    compassArrow: $('compass-arrow'),
    compassDist: $('compass-dist'),
    hotbar: $('hotbar'),
    layer: $('hud'),
    flash: $('flash'),
    menu: $('menu-overlay'),
    shop: $('shop-overlay'),
    shopGrid: $('shop-grid'),
    shopCoins: $('shop-coins'),
    over: $('over-overlay'),
    win: $('win-overlay'),
    btnStart: $('btn-start'),
    btnReset: $('btn-reset'),
    btnShopClose: $('btn-shop-close'),
    btnRetry: $('btn-retry'),
    btnKeep: $('btn-keep'),
  };
}

let bannerTimer = 0;
let toastTimer = 0;

export function showBanner(hud, text, ms = 1800) {
  hud.banner.textContent = text;
  hud.banner.classList.add('show');
  clearTimeout(bannerTimer);
  bannerTimer = setTimeout(() => hud.banner.classList.remove('show'), ms);
}

export function showToast(hud, text, ms = 3200) {
  hud.toast.textContent = text;
  hud.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => hud.toast.classList.remove('show'), ms);
}

export function showTitleCard(hud, big, small, on) {
  hud.tc1.textContent = big;
  hud.tc2.textContent = small;
  hud.titlecard.classList.toggle('show', on);
  // restart pop animation
  hud.tc1.style.animation = 'none';
  void hud.tc1.offsetWidth;
  hud.tc1.style.animation = '';
}

export function setOverlay(el, on) {
  el.classList.toggle('show', on);
}

/** @param {any} hud @param {any} save @param {any} player @param {number} wave @param {boolean} hasGeorge */
export function refreshHud(hud, save, player, wave, hasGeorge) {
  hud.coins.textContent = String(save.coins);
  hud.hp.style.width = `${Math.max(0, (player.hp / player.hpMax) * 100)}%`;
  hud.wave.textContent = String(wave);
  hud.bonks.textContent = hasGeorge ? 'Done!' : `${Math.min(save.kills, BOSS_KILLS)}/${BOSS_KILLS}`;
  hud.armor.textContent = String(save.armor || 0);
  hud.team.textContent = hasGeorge ? 'You + George' : 'You';
}

export function setBoss(hud, on, hpPct = 1, curePct = 0, name = '') {
  hud.boss.classList.toggle('show', on);
  if (name) hud.bossName.textContent = name;
  hud.bossHp.style.width = `${Math.max(0, hpPct * 100)}%`;
  hud.bossCure.style.width = `${Math.min(100, curePct * 100)}%`;
}

/** @param {any} hud @param {any} save @param {(slot: number) => void} onPick */
export function renderHotbar(hud, save, onPick) {
  hud.hotbar.innerHTML = '';
  WEAPONS.forEach((w, i) => {
    const d = document.createElement('div');
    const has = owns(save, w.id);
    d.className = `slot${has ? '' : ' locked'}${save.current === w.id ? ' active' : ''}`;
    d.innerHTML = `<span class="key">${i + 1}</span><span class="ico">${ICONS[w.id]}</span><span>${w.name.split(' ')[0]}</span>${has ? `<span class="lv">Lv ${save.owned[w.id]}</span>` : ''}`;
    d.addEventListener('click', () => onPick(i));
    hud.hotbar.appendChild(d);
  });
  const shop = document.createElement('button');
  shop.type = 'button';
  shop.id = 'btn-shop';
  shop.className = 'big blue';
  shop.textContent = 'Workshop (B)';
  shop.addEventListener('click', () => onPick(-1));
  hud.hotbar.appendChild(shop);
}

/** @param {any} hud @param {any} save @param {() => void} changed */
export function renderShop(hud, save, changed) {
  hud.shopCoins.textContent = String(save.coins);
  hud.shopGrid.innerHTML = '';
  {
    const lvl = save.armor || 0;
    const el = document.createElement('div');
    el.className = 'item';
    const pips = Array.from({ length: MAX_ARMOR }, (_, i) => `<i class="${i < lvl ? 'on' : ''}"></i>`).join('');
    el.innerHTML = `<h3><span>\u{1F6E1}\uFE0F Shiny Armor</span><span>Lv ${lvl}</span></h3><p>Take less damage and get extra hearts. Each level adds a new piece!</p><div class="pips">${pips}</div>`;
    const row = document.createElement('div');
    row.className = 'row';
    const b = document.createElement('button');
    b.className = 'big';
    if (lvl >= MAX_ARMOR) {
      b.textContent = 'Maxed!';
      b.disabled = true;
    } else {
      const c = armorCost(save);
      b.textContent = `Upgrade (${c})`;
      b.disabled = save.coins < c;
      b.addEventListener('click', () => {
        if (buyArmor(save)) changed();
      });
    }
    row.appendChild(b);
    el.appendChild(row);
    hud.shopGrid.appendChild(el);
  }
  for (const w of WEAPONS) {
    const has = owns(save, w.id);
    const lvl = save.owned[w.id] ?? 0;
    const el = document.createElement('div');
    el.className = `item${save.current === w.id ? ' cur' : ''}`;
    const pips = Array.from({ length: MAX_LEVEL }, (_, i) => `<i class="${has && i < lvl ? 'on' : ''}"></i>`).join('');
    el.innerHTML = `<h3><span>${ICONS[w.id]} ${w.name}</span><span>${has ? `Lv ${lvl}` : ''}</span></h3><p>${w.desc}</p><div class="pips">${pips}</div>`;
    const row = document.createElement('div');
    row.className = 'row';
    if (!has) {
      const b = document.createElement('button');
      b.className = 'big green';
      b.textContent = `Buy (${w.cost})`;
      b.disabled = save.coins < w.cost;
      b.addEventListener('click', () => {
        if (buyWeapon(save, w.id)) changed();
      });
      row.appendChild(b);
    } else {
      const eq = document.createElement('button');
      eq.className = 'big blue';
      eq.textContent = save.current === w.id ? 'Equipped' : 'Equip';
      eq.disabled = save.current === w.id;
      eq.addEventListener('click', () => {
        if (equip(save, w.id)) changed();
      });
      row.appendChild(eq);
      const up = document.createElement('button');
      up.className = 'big';
      if (lvl >= MAX_LEVEL) {
        up.textContent = 'Maxed!';
        up.disabled = true;
      } else {
        const c = upgradeCost(save, w.id);
        up.textContent = `Upgrade (${c})`;
        up.disabled = save.coins < c;
        up.addEventListener('click', () => {
          if (upgradeWeapon(save, w.id)) changed();
        });
      }
      row.appendChild(up);
    }
    el.appendChild(row);
    hud.shopGrid.appendChild(el);
  }
}
