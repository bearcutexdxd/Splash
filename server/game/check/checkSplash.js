const { checkIsPlayerHit } = require('./checkIsPlayerHit');
const { checkIsWallHit } = require('./checkIsWallHit');

function checkSplash(gameStateArg) {
  let currGameState = gameStateArg;
  if (currGameState.splash.length) {
    currGameState = checkIsPlayerHit(currGameState);
    currGameState = checkIsWallHit(currGameState);
    currGameState.splash = currGameState.splash.map((el) => ({ ...el, timer: el.timer - 1 }));
    currGameState.splash = currGameState.splash.filter((el) => el.timer !== 0);
  }

  return currGameState;
}

module.exports = { checkSplash };
