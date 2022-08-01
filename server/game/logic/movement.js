const { checkCollision } = require('../check/checkCollision');

/* eslint-disable max-len */
function movement(gameStateArg) {
  const movementLength = 1;
  const currGameState = gameStateArg;

  // first character
  if (currGameState.player1.movement.down) {
    if (checkCollision(currGameState, { x: currGameState.player1.pos.x, y: currGameState.player1.pos.y + movementLength })) {
      currGameState.player1.pos = { x: currGameState.player1.pos.x, y: currGameState.player1.pos.y + movementLength };
    }
  }
  if (currGameState.player1.movement.up) {
    if (checkCollision(currGameState, { x: currGameState.player1.pos.x, y: currGameState.player1.pos.y - movementLength })) {
      currGameState.player1.pos = { x: currGameState.player1.pos.x, y: currGameState.player1.pos.y - movementLength };
    }
  }
  if (currGameState.player1.movement.left) {
    if (checkCollision(currGameState, { x: currGameState.player1.pos.x - movementLength, y: currGameState.player1.pos.y })) {
      currGameState.player1.pos = { x: currGameState.player1.pos.x - movementLength, y: currGameState.player1.pos.y };
    }
  }
  if (currGameState.player1.movement.right) {
    if (checkCollision(currGameState, { x: currGameState.player1.pos.x + movementLength, y: currGameState.player1.pos.y })) {
      currGameState.player1.pos = { x: currGameState.player1.pos.x + movementLength, y: currGameState.player1.pos.y };
    }
  }

  // second character
  if (currGameState.player2.movement.down) {
    currGameState.player2.pos = { x: currGameState.player2.pos.x, y: currGameState.player2.pos.y + movementLength };
  }
  if (currGameState.player2.movement.up) {
    currGameState.player2.pos = { x: currGameState.player2.pos.x, y: currGameState.player2.pos.y - movementLength };
  }
  if (currGameState.player2.movement.left) {
    currGameState.player2.pos = { x: currGameState.player2.pos.x - movementLength, y: currGameState.player2.pos.y };
  }
  if (currGameState.player2.movement.right) {
    currGameState.player2.pos = { x: currGameState.player2.pos.x + movementLength, y: currGameState.player2.pos.y };
  }

  // third character
  if (currGameState.player3.movement.down) {
    currGameState.player3.pos = { x: currGameState.player3.pos.x, y: currGameState.player3.pos.y + movementLength };
  }
  if (currGameState.player3.movement.up) {
    currGameState.player3.pos = { x: currGameState.player3.pos.x, y: currGameState.player3.pos.y - movementLength };
  }
  if (currGameState.player3.movement.left) {
    currGameState.player3.pos = { x: currGameState.player3.pos.x - movementLength, y: currGameState.player3.pos.y };
  }
  if (currGameState.player3.movement.right) {
    currGameState.player3.pos = { x: currGameState.player3.pos.x + movementLength, y: currGameState.player3.pos.y };
  }

  // fourth character
  if (currGameState.player4.movement.down) {
    currGameState.player4.pos = { x: currGameState.player4.pos.x, y: currGameState.player4.pos.y + movementLength };
  }
  if (currGameState.player4.movement.up) {
    currGameState.player4.pos = { x: currGameState.player4.pos.x, y: currGameState.player4.pos.y - movementLength };
  }
  if (currGameState.player4.movement.left) {
    currGameState.player4.pos = { x: currGameState.player4.pos.x - movementLength, y: currGameState.player4.pos.y };
  }
  if (currGameState.player4.movement.right) {
    currGameState.player4.pos = { x: currGameState.player4.pos.x + movementLength, y: currGameState.player4.pos.y };
  }

  return currGameState;
}

module.exports = { movement };
