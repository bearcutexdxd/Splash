function keydownHandle(key, currGameState, playerId) {
  let currPlayer;

  switch (playerId) {
    case 1:
      currPlayer = currGameState.player1;
      break;
    case 2:
      currPlayer = currGameState.player2;
      break;
    case 3:
      currPlayer = currGameState.player3;
      break;
    case 4:
      currPlayer = currGameState.player4;
      break;
    default:
      break;
  }

  const currPlayerPos = currPlayer.pos;
  switch (key) {
    case 'w':
      currPlayerPos.y -= 1;
      break;
    case 'a':
      currPlayerPos.x -= 1;
      break;
    case 's':
      currPlayerPos.y += 1;
      break;
    case 'd':
      currPlayerPos.x += 1;
      break;
    default:
  }
  return currGameState;
}

module.exports = { keydownHandle };
