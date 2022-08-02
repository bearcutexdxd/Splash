const { v4: uuidv4 } = require('uuid');

function getRandomBonus() {
  const buffs = ['speed', 'life', 'largerBomb'];
  return buffs[Math.round(Math.random(buffs.length) - 0.5)];
}

function generateBonus(gameStateArg) {
  const currGameState = gameStateArg;

  currGameState.walls.forEach((el) => {
    if (el.timer === 0) {
      if ((Math.round(Math.random(10) - 0.5)) === 0) {
        currGameState.bonuses.push({
          x: el.x, y: el.y, id: uuidv4(), bonus: getRandomBonus(),
        });
      }
    }
  });
  return currGameState;
}

module.exports = { generateBonus };
