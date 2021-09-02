export {buyItem, sellItem, upgradeShip, setUpgradeButton};

function calcEquipItems(user, type) {
    const equip = user.equip;
    const sameType = [];

    for (let item in equip) {
        if (item.startsWith(type)) {
            sameType.push(equip[item]);
        }
    }
    
    return sameType.reduce( (acc, cur) => acc + cur, 0);
}

function buyItem(user, equip, button, sound) {
    const itemName = button.dataset.name;
    const itemType = itemName.slice(0, 2);

    const typeQuantity = calcEquipItems(user, itemType);
    const currency = button.dataset.btc ? 'btc' : 'plt';
    const requiredAmount = button.dataset[currency];
    const currentAmount = currency === 'btc' ? user.btc : user.plt;

    if (typeQuantity >= 20) {
        alert(`${itemType.startsWith('lg') ? 'Guns' : 'Shields'} limit reached`);
        return;
    }

    if (currentAmount < requiredAmount) {
        alert(`Not enough ${currency}`);
        return;
    }

    sound.currentTime = 0;
    sound.play();

    user[currency] -= requiredAmount;

    if (itemType === 'lg') user.damage += equip[itemName];
    if (itemType === 'db') user.maxSh += equip[itemName];

    user.equip[itemName]++;

    return true;
}

function sellItem(user, equip, button, sound) {
    const itemName = button.dataset.name;
    const itemType = itemName.slice(0, 2);

    if (user.equip[itemName] === 0) {
        alert(`You have no ${itemName}`);
        return;
    }

    sound.currentTime = 0;
    sound.play();

    if (itemType === 'lg') user.damage -= equip[itemName];
    if (itemType === 'db') user.maxSh -= equip[itemName];

    user.equip[itemName]--;

    return true;
}

function upgradeShip(user, shipHp, button, sound) {
    let ships = Object.entries(shipHp);
    let ship = ships.find( ship => ship[0] == user.maxHp );
    let idx = ships.findIndex( ship => ship[0] == user.maxHp );

    let requiredAmount = ship[1][0];
    let currency = ship[1][1];

    if (user[currency] < requiredAmount) {
        alert(`Not enough ${currency}`);
        return;
    }

    sound.currentTime = 0;
    sound.play();

    user[currency] -= requiredAmount;
    user.maxHp = +ships[idx + 1][0];

    setUpgradeButton(user, shipHp, button);

    return true;
}

function setUpgradeButton(user, shipHp, button) {
    let ships = Object.entries(shipHp);
    let idx = ships.findIndex( ship => ship[0] == user.maxHp );

    let currency = ships[idx][1][1];

    let nextValue = ships[idx][1][0];
    let suffix = 'k';
    if (nextValue >= 1e6) {
        suffix = 'm';
        nextValue /= 1000;
    }

    button.textContent = nextValue / 1000 + suffix + " " + currency;
    if (nextValue === Infinity) button.hidden = true;
}