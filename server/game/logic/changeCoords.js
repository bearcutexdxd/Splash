function changeCoordsStart(gameStateArg, gameStarted) {
  const currGameState = gameStateArg;
  const value = 10;

  // currGameState.player1.pos.x += value;
  currGameState.player1.pos.y += value;

  // currGameState.player2.pos.x += value;
  currGameState.player2.pos.y += value;

  // currGameState.player3.pos.x += value;
  currGameState.player3.pos.y += value;

  // currGameState.player4.pos.x += value;
  currGameState.player4.pos.y += value;

  if (gameStarted) {
    currGameState.gameTimer += 1;
  }

  return currGameState;
}

function changeCoordsFinish(gameStateArg) {
  const currGameState = gameStateArg;
  const value = 10;

  // currGameState.player1.pos.x -= value;
  currGameState.player1.pos.y -= value;

  // currGameState.player2.pos.x -= value;
  currGameState.player2.pos.y -= value;

  // currGameState.player3.pos.x -= value;
  currGameState.player3.pos.y -= value;

  // currGameState.player4.pos.x -= value;
  currGameState.player4.pos.y -= value;

  return currGameState;
}

module.exports = { changeCoordsStart, changeCoordsFinish };
