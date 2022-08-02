/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
function checkSolidBomb(gameStateArg) {
  const currGameState = gameStateArg;

  function mathRound(coord) {
    return Math.round(coord / currGameState.gridsize);
  }

  currGameState.bombs.forEach((el) => {
    if (!(el.x === mathRound(currGameState.player1.pos.x) && el.y === mathRound(currGameState.player1.pos.y)) && el.owner === 1) {
      el.isSolid = true;
    }

    if (!(el.x === mathRound(currGameState.player2.pos.x) && el.y === mathRound(currGameState.player2.pos.y)) && el.owner === 2) {
      el.isSolid = true;
    }

    if (!(el.x === mathRound(currGameState.player3.pos.x) && el.y === mathRound(currGameState.player3.pos.y)) && el.owner === 3) {
      el.isSolid = true;
    }

    if (!(el.x === mathRound(currGameState.player4.pos.x) && el.y === mathRound(currGameState.player4.pos.y)) && el.owner === 4) {
      el.isSolid = true;
    }
  });

  return currGameState;
}

module.exports = { checkSolidBomb };
