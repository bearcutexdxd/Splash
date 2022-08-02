/* eslint-disable no-param-reassign */
function wallAnimation(gameStateArg) {
  const currGameState = gameStateArg;
  currGameState.walls.forEach((el) => {
    if (el.hp === 0) {
      el.timer -= 1;
    }
  });
  return currGameState;
}
module.exports = { wallAnimation };
