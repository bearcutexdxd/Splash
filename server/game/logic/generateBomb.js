const { v4: uuidv4 } = require('uuid');

function generateBomb(currGameState, currPlayer, playerId) {
  currGameState.bombs.push({
    x: Math.round(currPlayer.pos.x / currGameState.gridsize),
    y: Math.round(currPlayer.pos.y / currGameState.gridsize),
    timer: 240,
    owner: playerId,
    id: uuidv4(),
  });
  return currGameState;
}

module.exports = { generateBomb };
