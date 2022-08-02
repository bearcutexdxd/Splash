/* eslint-disable max-len */
const { v4: uuidv4 } = require('uuid');

function generateBomb(gameStateArg, currPlayer, playerId) {
  const currGameState = gameStateArg;
  const timer = 120;

  const x = Math.round(currPlayer.pos.x / currGameState.gridsize);
  const y = Math.round((currPlayer.pos.y) / currGameState.gridsize);

  const x1 = Math.round(currGameState.player1.pos.x / currGameState.gridsize);
  const y1 = Math.round((currGameState.player1.pos.y) / currGameState.gridsize);

  const x2 = Math.round(currGameState.player2.pos.x / currGameState.gridsize);
  const y2 = Math.round((currGameState.player2.pos.y) / currGameState.gridsize);

  const x3 = Math.round(currGameState.player3.pos.x / currGameState.gridsize);
  const y3 = Math.round((currGameState.player3.pos.y) / currGameState.gridsize);

  const x4 = Math.round(currGameState.player4.pos.x / currGameState.gridsize);
  const y4 = Math.round((currGameState.player4.pos.y) / currGameState.gridsize);

  if (playerId === 1) {
    if (!(x2 === x && y2 === y) && !(x3 === x && y3 === y) && !(x4 === x && y4 === y)) {
      if (currGameState.player1.bombsCounter < currGameState.player1.maxBombs) {
        currGameState.bombs.push({
          x,
          y,
          timer,
          owner: playerId,
          isSolid: false,
          id: uuidv4(),
        });
        currGameState.player1.bombsCounter += 1;
      }
    }
  }

  if (playerId === 2) {
    if (!(x1 === x && y1 === y) && !(x3 === x && y3 === y) && !(x4 === x && y4 === y)) {
      if (currGameState.player2.bombsCounter < currGameState.player2.maxBombs) {
        currGameState.bombs.push({
          x,
          y,
          timer,
          owner: playerId,
          isSolid: false,
          id: uuidv4(),
        });
        currGameState.player2.bombsCounter += 1;
      }
    }
  }

  if (playerId === 3) {
    if (!(x2 === x && y2 === y) && !(x1 === x && y1 === y) && !(x4 === x && y4 === y)) {
      if (currGameState.player3.bombsCounter < currGameState.player3.maxBombs) {
        currGameState.bombs.push({
          x,
          y,
          timer,
          owner: playerId,
          isSolid: false,
          id: uuidv4(),
        });
        currGameState.player3.bombsCounter += 1;
      }
    }
  }

  if (playerId === 4) {
    if (!(x2 === x && y2 === y) && !(x3 === x && y3 === y) && !(x1 === x && y1 === y)) {
      if (currGameState.player4.bombsCounter < currGameState.player4.maxBombs) {
        currGameState.bombs.push({
          x,
          y,
          timer,
          owner: playerId,
          isSolid: false,
          id: uuidv4(),
        });
        currGameState.player4.bombsCounter += 1;
      }
    }
  }

  return currGameState;
}

module.exports = { generateBomb };
