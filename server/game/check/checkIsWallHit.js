/* eslint-disable no-param-reassign */
function checkIsWallHit(gameStateArg) {
  const currGameState = gameStateArg;

  currGameState.splash.forEach((el) => {
    el.pos.forEach((coords) => {
      currGameState.walls.forEach((wall) => {
        if (coords.x === wall.x && coords.y === wall.y && wall.hp !== 'infinity' && wall.invulnerability.active === false) {
          wall.invulnerability.active = true;
          wall.hp -= 1;
        }
      });
    });
  });
  return currGameState;
}

module.exports = { checkIsWallHit };
