const { checkCollision } = require('../check/checkCollision');

/* eslint-disable max-len */
function movement(gameStateArg) {
  const movementLength = 1;
  const hitboxRound = 4;
  const currGameState = gameStateArg;

  // first character
  if (currGameState.player1.movement.down) {
    if (checkCollision(currGameState, { x: currGameState.player1.pos.x, y: currGameState.player1.pos.y + movementLength + hitboxRound }, 1)) {
      currGameState.player1.pos = { x: currGameState.player1.pos.x, y: currGameState.player1.pos.y + movementLength };
    }
  }
  if (currGameState.player1.movement.up) {
    if (checkCollision(currGameState, { x: currGameState.player1.pos.x, y: currGameState.player1.pos.y - movementLength - hitboxRound }, 1)) {
      currGameState.player1.pos = { x: currGameState.player1.pos.x, y: currGameState.player1.pos.y - movementLength };
    }
  }
  if (currGameState.player1.movement.left) {
    if (checkCollision(currGameState, { x: currGameState.player1.pos.x - movementLength - hitboxRound, y: currGameState.player1.pos.y }, 1)) {
      currGameState.player1.pos = { x: currGameState.player1.pos.x - movementLength, y: currGameState.player1.pos.y };
    }
  }
  if (currGameState.player1.movement.right) {
    if (checkCollision(currGameState, { x: currGameState.player1.pos.x + movementLength + hitboxRound, y: currGameState.player1.pos.y }, 1)) {
      currGameState.player1.pos = { x: currGameState.player1.pos.x + movementLength, y: currGameState.player1.pos.y };
    }
  }

  // second character
  if (currGameState.player2.movement.down) {
    if (checkCollision(currGameState, { x: currGameState.player2.pos.x, y: currGameState.player2.pos.y + movementLength + hitboxRound }, 2)) {
      currGameState.player2.pos = { x: currGameState.player2.pos.x, y: currGameState.player2.pos.y + movementLength };
    }
  }
  if (currGameState.player2.movement.up) {
    if (checkCollision(currGameState, { x: currGameState.player2.pos.x, y: currGameState.player2.pos.y - movementLength - hitboxRound }, 2)) {
      currGameState.player2.pos = { x: currGameState.player2.pos.x, y: currGameState.player2.pos.y - movementLength };
    }
  }
  if (currGameState.player2.movement.left) {
    if (checkCollision(currGameState, { x: currGameState.player2.pos.x - movementLength - hitboxRound, y: currGameState.player2.pos.y }, 2)) {
      currGameState.player2.pos = { x: currGameState.player2.pos.x - movementLength, y: currGameState.player2.pos.y };
    }
  }
  if (currGameState.player2.movement.right) {
    if (checkCollision(currGameState, { x: currGameState.player2.pos.x + movementLength + hitboxRound, y: currGameState.player2.pos.y }, 2)) {
      currGameState.player2.pos = { x: currGameState.player2.pos.x + movementLength, y: currGameState.player2.pos.y };
    }
  }

  // third character
  if (currGameState.player3.movement.down) {
    if (checkCollision(currGameState, { x: currGameState.player3.pos.x, y: currGameState.player3.pos.y + movementLength + hitboxRound }, 3)) {
      currGameState.player3.pos = { x: currGameState.player3.pos.x, y: currGameState.player3.pos.y + movementLength };
    }
  }
  if (currGameState.player3.movement.up) {
    if (checkCollision(currGameState, { x: currGameState.player3.pos.x, y: currGameState.player3.pos.y - movementLength - hitboxRound }, 3)) {
      currGameState.player3.pos = { x: currGameState.player3.pos.x, y: currGameState.player3.pos.y - movementLength };
    }
  }
  if (currGameState.player3.movement.left) {
    if (checkCollision(currGameState, { x: currGameState.player3.pos.x - movementLength - hitboxRound, y: currGameState.player3.pos.y }, 3)) {
      currGameState.player3.pos = { x: currGameState.player3.pos.x - movementLength, y: currGameState.player3.pos.y };
    }
  }
  if (currGameState.player3.movement.right) {
    if (checkCollision(currGameState, { x: currGameState.player3.pos.x + movementLength + hitboxRound, y: currGameState.player3.pos.y }, 3)) {
      currGameState.player3.pos = { x: currGameState.player3.pos.x + movementLength, y: currGameState.player3.pos.y };
    }
  }

  // fourth character
  if (currGameState.player4.movement.down) {
    if (checkCollision(currGameState, { x: currGameState.player4.pos.x, y: currGameState.player4.pos.y + movementLength + hitboxRound }, 4)) {
      currGameState.player4.pos = { x: currGameState.player4.pos.x, y: currGameState.player4.pos.y + movementLength };
    }
  }
  if (currGameState.player4.movement.up) {
    if (checkCollision(currGameState, { x: currGameState.player4.pos.x, y: currGameState.player4.pos.y - movementLength - hitboxRound }, 4)) {
      currGameState.player4.pos = { x: currGameState.player4.pos.x, y: currGameState.player4.pos.y - movementLength };
    }
  }
  if (currGameState.player4.movement.left) {
    if (checkCollision(currGameState, { x: currGameState.player4.pos.x - movementLength - hitboxRound, y: currGameState.player4.pos.y }, 4)) {
      currGameState.player4.pos = { x: currGameState.player4.pos.x - movementLength, y: currGameState.player4.pos.y };
    }
  }
  if (currGameState.player4.movement.right) {
    if (checkCollision(currGameState, { x: currGameState.player4.pos.x + movementLength + hitboxRound, y: currGameState.player4.pos.y }, 4)) {
      currGameState.player4.pos = { x: currGameState.player4.pos.x + movementLength, y: currGameState.player4.pos.y };
    }
  }

  return currGameState;
}

module.exports = { movement };
