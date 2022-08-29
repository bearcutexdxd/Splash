/* eslint-disable no-param-reassign */
function wallAnimation(gameStateArg) {
  const currGameState = gameStateArg;
  currGameState.walls.forEach((el) => {
    if (el.hp === 0) {
      el.wallTimer -= 1;
    }
    if (el.hp === 1 && el.invulnerability.active) {
      el.wallTimer -= 1;
    }
  });
  return currGameState;
}
module.exports = { wallAnimation };
