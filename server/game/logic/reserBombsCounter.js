function resetBombsCounter(gameStateArg) {
  const currGameState = gameStateArg;

  currGameState.bombs.forEach((el) => {
    if (el.timer === 0) {
      if (el.owner === 1) {
        currGameState.player1.bombsCounter -= 1;
      }
      if (el.owner === 2) {
        currGameState.player2.bombsCounter -= 1;
      }
      if (el.owner === 3) {
        currGameState.player3.bombsCounter -= 1;
      }
      if (el.owner === 4) {
        currGameState.player4.bombsCounter -= 1;
      }
    }
  });

  return currGameState;
}

module.exports = { resetBombsCounter };
