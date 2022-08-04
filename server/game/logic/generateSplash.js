const { v4: uuidv4 } = require('uuid');
const { resetBombsCounter } = require('./reserBombsCounter');

function generateSplash(currGameState) {
  const dyingBombs = currGameState.bombs.filter((el) => el.timer === 0);
  for (let i = 0; i < dyingBombs.length; i += 1) {
    if (dyingBombs[i].strength === 1) {
      const splash = {
        pos: [
          { x: dyingBombs[i].x, y: dyingBombs[i].y, id: uuidv4() },
          { x: dyingBombs[i].x + 1, y: dyingBombs[i].y, id: uuidv4() },
          { x: dyingBombs[i].x - 1, y: dyingBombs[i].y, id: uuidv4() },
          { x: dyingBombs[i].x, y: dyingBombs[i].y + 1, id: uuidv4() },
          { x: dyingBombs[i].x, y: dyingBombs[i].y - 1, id: uuidv4() },
        ],
        timer: 30,
        owner: dyingBombs[i].owner,
      };
      currGameState.splash.push(splash);
    }
    if (dyingBombs[i].strength === 2) {
      const splash = {
        pos: [
          { x: dyingBombs[i].x, y: dyingBombs[i].y, id: uuidv4() },
          { x: dyingBombs[i].x + 1, y: dyingBombs[i].y, id: uuidv4() },
          { x: dyingBombs[i].x - 1, y: dyingBombs[i].y, id: uuidv4() },
          { x: dyingBombs[i].x + 2, y: dyingBombs[i].y, id: uuidv4() },
          { x: dyingBombs[i].x - 2, y: dyingBombs[i].y, id: uuidv4() },
          { x: dyingBombs[i].x, y: dyingBombs[i].y + 1, id: uuidv4() },
          { x: dyingBombs[i].x, y: dyingBombs[i].y - 1, id: uuidv4() },
          { x: dyingBombs[i].x, y: dyingBombs[i].y + 2, id: uuidv4() },
          { x: dyingBombs[i].x, y: dyingBombs[i].y - 2, id: uuidv4() },
        ],
        timer: 30,
        owner: dyingBombs[i].owner,
      };
      currGameState.walls.forEach((el) => {
        if (el.x === dyingBombs[i].x - 1 && el.y === dyingBombs[i].y) {
          splash.pos = splash.pos.filter((el2) => el2.x !== dyingBombs[i].x - 2);
        }
        if (el.x === dyingBombs[i].x + 1 && el.y === dyingBombs[i].y) {
          splash.pos = splash.pos.filter((el2) => el2.x !== dyingBombs[i].x + 2);
        }
        if (el.x === dyingBombs[i].x && el.y === dyingBombs[i].y + 1) {
          splash.pos = splash.pos.filter((el2) => el2.y !== dyingBombs[i].y + 2);
        }
        if (el.x === dyingBombs[i].x && el.y === dyingBombs[i].y - 1) {
          splash.pos = splash.pos.filter((el2) => el2.y !== dyingBombs[i].y - 2);
        }
      });
      currGameState.splash.push(splash);
    }
  }

  return currGameState;
}

function setSplash(gameStateArg) {
  let currGameState = gameStateArg;
  if (currGameState.bombs.length) { // generating splash
    currGameState.bombs = currGameState.bombs.map((el) => ({ ...el, timer: el.timer - 1 }));
    if (currGameState.bombs.filter((el) => el.timer === 0)) {
      currGameState = generateSplash(currGameState);
    }
    currGameState = resetBombsCounter(currGameState);
    currGameState.bombs = currGameState.bombs.filter((el) => el.timer !== 0);
  }

  return currGameState;
}

module.exports = { setSplash };
