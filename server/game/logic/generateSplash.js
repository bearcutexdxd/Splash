const { v4: uuidv4 } = require('uuid');
const { resetBombsCounter } = require('./reserBombsCounter');

function generateSplash(currGameState, playerId) {
  const dyingBombs = currGameState.bombs.filter((el) => el.timer === 0);
  for (let i = 0; i < dyingBombs.length; i += 1) {
    const splash = {
      pos: [
        { x: dyingBombs[i].x, y: dyingBombs[i].y, id: uuidv4() },
        { x: dyingBombs[i].x + 1, y: dyingBombs[i].y, id: uuidv4() },
        { x: dyingBombs[i].x - 1, y: dyingBombs[i].y, id: uuidv4() },
        { x: dyingBombs[i].x, y: dyingBombs[i].y + 1, id: uuidv4() },
        { x: dyingBombs[i].x, y: dyingBombs[i].y - 1, id: uuidv4() },
      ],
      timer: 60,
      owner: playerId,
    };
    currGameState.splash.push(splash);
  }

  return currGameState;
}

function setSplash(gameStateArg, socketNumber) {
  let currGameState = gameStateArg;
  if (currGameState.bombs.length) { // generating splash
    currGameState.bombs = currGameState.bombs.map((el) => ({ ...el, timer: el.timer - 1 }));
    if (currGameState.bombs.filter((el) => el.timer === 0)) {
      currGameState = generateSplash(currGameState, socketNumber);
    }
    currGameState = resetBombsCounter(currGameState);
    currGameState.bombs = currGameState.bombs.filter((el) => el.timer !== 0);
  }

  return currGameState;
}

module.exports = { setSplash };
