/* eslint-disable no-param-reassign */
function checkIsWallHit(gameStateArg) {
  const currGameState = gameStateArg;

  currGameState.splash.forEach((el) => {
    el.pos.forEach((coords) => {
      currGameState.walls.forEach((wall) => {
        if (coords.x === wall.x && coords.y === wall.y) {
          wall.hp = 0;
        }
      });
    });
  });
  return currGameState;
}

module.exports = { checkIsWallHit };
