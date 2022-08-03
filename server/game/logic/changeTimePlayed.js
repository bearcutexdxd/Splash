function changeTimePlayed(gameStateArg, gameStarted) {
  const currGameState = gameStateArg;

  if (gameStarted) {
    currGameState.player1.statistics.timePlayed += 1;
    currGameState.player2.statistics.timePlayed += 1;
    currGameState.player3.statistics.timePlayed += 1;
    currGameState.player4.statistics.timePlayed += 1;
  }

  return currGameState;
}

module.exports = { changeTimePlayed };
