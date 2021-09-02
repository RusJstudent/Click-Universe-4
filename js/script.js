import newUser from './new user.js';
import {levels, ranks} from '../js/levels.js';
import {rewards, npcDamage, equip, shipHp} from './pve.js';
import {destroySound, deathSound, clickSound} from './sounds.js';
import {about, welcome, guide} from './info.js';
import {buyItem, sellItem, upgradeShip, setUpgradeButton} from './shop.js';
import {addSpaces, calcDamage, animateShip} from './functions.js';

// global event listeners
window.onerror = () => localStorage.clear();
document.body.onpointerdown = e => false;

// animation
animateShip();

// initialization
const pve = document.querySelector('.pve__enemies');
const shopItems = document.querySelector('.shop__items');
const upgradeButton = document.querySelector("[data-name='ship']");

const hpLine = document.querySelector('.ship__hp-line');
const hpValue = document.getElementById('hp_value');
const hpMax = document.getElementById('hp_max');
const shLine = document.querySelector('.ship__sh-line');
const shValue = document.getElementById('sh_value');
const shMax = document.getElementById('sh_max');
const displayDmg = document.querySelector('.ship__damage');

const exp = document.getElementById('exp');
const btc = document.getElementById('btc');
const lvl = document.getElementById('lvl');
const plt = document.getElementById('plt');

const rank = document.getElementById('ranks');
const nickname = document.querySelector('.ship__nickname');

const destroysStats = document.getElementById('info__destroys');
const aboutInfo = document.getElementById('info__about');
const howToPlay = document.getElementById('info__how');

// parameters from CSS:
const hpLineWidth = parseInt(getComputedStyle(hpLine).width);
const shLineWidth = parseInt(getComputedStyle(shLine).width);

// registration
let user;
let registered = localStorage.getItem('reg');
registered ? getUserData() : createNewUser();
displayData();

function getUserData() {
    user = JSON.parse(localStorage.getItem('user'));
}

function createNewUser() {
    user = newUser;

    alert(welcome);
    user.nickname = prompt('Enter your nickname, please', '') || 'Your nickname';

    localStorage.setItem('reg', true);
    localStorage.setItem('user', JSON.stringify(user));
}

function displayData() {
    nickname.textContent = user.nickname;
    rank.className = `rank${user.rank}`;

    setUpgradeButton(user, shipHp, upgradeButton);
    displayProfileInfo();
    updateHp();
}

// repair parameters
const repairPersentHp = 5;
const repairPersentSh = 18;
let repairHp = repairPersentHp / 100 * user.maxHp;
let repairSh = repairPersentSh / 100 * user.maxSh;

const repairTimeout = 3000;
const repairFrequency = 1200;

let repairId = setTimeout(repair, repairFrequency);

// event listeners
pve.addEventListener('click', function(e) {
    let npc = e.target.dataset.enemy;
    if (!npc) return;

    clearTimeout(repairId);
    repairId = setTimeout(repair, repairTimeout);

    const result = calcDamage(user, npcDamage[npc]);

    displayDmg.textContent = addSpaces(String(result.damage));
    displayDmg.classList.remove('ship__damage-animation');

    if (result.isDead) {
        dead();
        return;
    }

    destroySound.currentTime = 0;
    destroySound.play();

    user.destroys[npc]++;

    user.exp = +user.exp + rewards[npc].exp;
    user.btc = +user.btc + rewards[npc].btc;
    user.plt = +user.plt + rewards[npc].plt;
    user.hp = result.hp;
    user.sh = result.sh;

    updateHp();
    updateLevel();
    updateRank();
    displayProfileInfo();
    saveData();
});

pve.onkeydown = e => !e.repeat;

shopItems.addEventListener('click', function(e) {
    const button = e.target.closest('button');
    if (!button || !shopItems.contains(button)) return;

    const itemName = button.dataset.name;
    const itemType = itemName.slice(0, 2);

    if (itemName === 'ship') {
        const upgrade = upgradeShip(user, shipHp, button, clickSound)
        if (!upgrade) return;
    } else if (button.classList.contains('shop__sell')) {
        const sold = sellItem(user, equip, button, clickSound);
        if (!sold) return;
    } else {
        const bought = buyItem(user, equip, button, clickSound);
        if (!bought) return;
    }

    if (itemType === 'db' || itemName === 'ship') {
        repairHp = repairPersentHp / 100 * user.maxHp;
        repairSh = repairPersentSh / 100 * user.maxSh;
        repair();
    }

    displayProfileInfo();
    saveData();
});

destroysStats.onclick = () => alert(JSON.stringify(user.destroys, null, 2));
aboutInfo.onclick = () => alert(about);
howToPlay.onclick = () => alert(guide);

function dead() {
    localStorage.clear();

    deathSound.play();
    alert('You dead');

    location.reload();
}

function repair() {
    displayDmg.textContent = '';
    displayDmg.classList.add('ship__damage-animation');

    clearTimeout(repairId);

    if (user.hp < user.maxHp - repairHp) {
        user.hp += repairHp;
    } else {
        user.hp = user.maxHp;
    }

    if (user.sh < user.maxSh - repairSh) {
        user.sh += repairSh;
    } else {
        user.sh = user.maxSh;
    }

    if (user.hp !== user.maxHp || user.sh !== user.maxSh) {
        repairId = setTimeout(repair, repairFrequency);
    }

    updateHp();
    saveData();
}

function updateHp() {
    hpMax.textContent = user.maxHp;
    hpValue.textContent = user.hp;
    hpLine.style.width = user.hp / user.maxHp * hpLineWidth + 'px';

    shMax.textContent = user.maxSh;
    shValue.textContent = user.sh;
    shLine.style.width = user.sh / user.maxSh * shLineWidth + 'px';
}

function updateLevel() {
    let levelBefore = user.lvl;
    let levelAfter = levels.find( lvl => lvl[1] >= user.exp )[0] - 1;

    if (levelAfter > levelBefore) {
        user.lvl = levelAfter;
        lvl.textContent = levelAfter;
    }
}

function updateRank() {
    let currentRank = ranks.find( rank => rank[1] >= user.exp )[0] - 1;
    user.rank = currentRank;

    rank.className = `rank${currentRank}`;
}

function saveData() {
    localStorage.setItem('user', JSON.stringify(user));
}

function displayProfileInfo() {
    let expStr = user.exp.toString();
    exp.textContent = addSpaces(expStr);

    let btcStr = user.btc.toString();
    btc.textContent = addSpaces(btcStr);

    let pltStr = user.plt.toString();
    plt.textContent = addSpaces(pltStr);

    lvl.textContent = user.lvl;
}