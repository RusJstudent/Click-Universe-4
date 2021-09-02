export {rewards, npcDamage, equip, shipHp};

const equip = {
    lg1: 2.5e3,
    lg2: 3e3,
    lg3: 3.7e3,
    db1: 3e3,
    db2: 8e3,
    db3: 20e3,
};

const shipHp = {
    8e3: [100e3, 'btc'],
    12e3: [400e3, 'btc'],
    20e3: [1e6, 'btc'],
    32e3: [2.5e6, 'btc'],
    48e3: [10e6, 'btc'],
    74e3: [30e3, 'plt'],
    98e3: [80e3, 'plt'],
    149e3: [200e3, 'plt'],
    216e3: [500e3, 'plt'],
    276e3: [Infinity, 'plt'],
}

const npcDamage = {
    hydro: 60,
    jenta: 250,
    mali: 800,
    plarion: 2e3,
    motron: 5.2e3,
    xeon: 9e3,
    bangoliour: 15e3,
    zavientos: 45e3,
    magmius: 120e3,
    quattroid: 400e3,
};

const rewards =  {
    hydro: {
        exp: 200,
        btc: 400,
        plt: 1,
    },
    jenta: {
        exp: 300,
        btc: 800,
        plt: 3,
    },
    mali: {
        exp: 500,
        btc: 1600,
        plt: 6,
    },
    plarion: {
        exp: 800,
        btc: 3200,
        plt: 12,
    },
    motron: {
        exp: 1400,
        btc: 7000,
        plt: 24,
    },
    xeon: {
        exp: 2300,
        btc: 15000,
        plt: 48,
    },
    bangoliour: {
        exp: 4800,
        btc: 33000,
        plt: 96,
    },
    zavientos: {
        exp: 8000,
        btc: 100000,
        plt: 240,
    },
    magmius: {
        exp: 55000,
        btc: 400000,
        plt: 1100,
    },
    quattroid: {
        exp: 310000,
        btc: 1e6,
        plt: 4000,
    }
};