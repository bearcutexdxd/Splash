function setPlayerWin(gameStateArg, alivePlayer) {
  const currGameState = gameStateArg;

  if (alivePlayer === 1) {
    currGameState.player1.statistics.wins += 1;
  }
  if (alivePlayer === 2) {
    currGameState.player2.statistics.wins += 1;
  }
  if (alivePlayer === 3) {
    currGameState.player3.statistics.wins += 1;
  }
  if (alivePlayer === 4) {
    currGameState.player4.statistics.wins += 1;
  }

  return currGameState;
}

module.exports = {
  setPlayerWin,
};
