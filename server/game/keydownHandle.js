const { generateBomb } = require('./logic/generateBomb');

function keydownHandle(key, gameState, playerId) {
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

  if (currPlayer?.direction) {
    switch (key) {
      case 'w':
        currPlayer.direction = 'up';
        currPlayer.movement.up = true;
        currPlayer.animation = '1';
        break;
      case 'a':
        currPlayer.direction = 'left';
        currPlayer.movement.left = true;
        currPlayer.animation = '1';
        break;
      case 's':
        currPlayer.direction = 'down';
        currPlayer.movement.down = true;
        currPlayer.animation = '1';
        break;
      case 'd':
        currPlayer.direction = 'right';
        currPlayer.movement.right = true;
        currPlayer.animation = '1';
        break;
      case 'e':
        return generateBomb(currGameState, currPlayer, playerId);

      default:
    }
  }

  return currGameState;
}

module.exports = { keydownHandle };
