function keyupHandle(key, gameState, playerId) {
  const currGameState = gameState;
  let currPlayer;

  switch (playerId) {
    case 1:
      currPlayer = currGameState?.player1;
      break;
    case 2:
      currPlayer = currGameState?.player2;
      break;
    case 3:
      currPlayer = currGameState?.player3;
      break;
    case 4:
      currPlayer = currGameState?.player4;
      break;
    default:
      break;
  }

  // const currPlayerDirection = currPlayer?.direction;
  if (currPlayer?.direction) {
    switch (key) {
      case 'w':
        currPlayer.movement.up = false;
        break;
      case 'a':
        currPlayer.movement.left = false;
        break;
      case 's':
        currPlayer.movement.down = false;
        break;
      case 'd':
        currPlayer.movement.right = false;
        break;
      default:
    }
  }

  return currGameState;
}

module.exports = { keyupHandle };
