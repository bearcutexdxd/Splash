function changeTimePlayed(gameStateArg, gameStarted) {
  const currGameState = gameStateArg;

  if (gameStarted) {
    if (currGameState.player1.isAlive) {
      currGameState.player1.statistics.timePlayed += 1;
    }
    if (currGameState.player2.isAlive) {
      currGameState.player2.statistics.timePlayed += 1;
    }
    if (currGameState.player3.isAlive) {
      currGameState.player3.statistics.timePlayed += 1;
    }
    if (currGameState.player4.isAlive) {
      currGameState.player4.statistics.timePlayed += 1;
    }
  }

  return currGameState;
}

module.exports = { changeTimePlayed };
