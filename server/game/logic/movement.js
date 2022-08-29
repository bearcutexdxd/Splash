const { checkCollision } = require('../check/checkCollision');

/* eslint-disable max-len */
function movement(gameStateArg) {
  // const movementLength = 1;
  const hitboxRound = 4;
  const currGameState = gameStateArg;

  // first character
  if (currGameState.player1.movement.down) {
    if (checkCollision(currGameState, { x: currGameState.player1.pos.x, y: currGameState.player1.pos.y + currGameState.player1.speed + hitboxRound }, 1)) {
      currGameState.player1.pos = { x: currGameState.player1.pos.x, y: currGameState.player1.pos.y + currGameState.player1.speed };
    }
  }
  if (currGameState.player1.movement.up) {
    if (checkCollision(currGameState, { x: currGameState.player1.pos.x, y: currGameState.player1.pos.y - currGameState.player1.speed - hitboxRound }, 1)) {
      currGameState.player1.pos = { x: currGameState.player1.pos.x, y: currGameState.player1.pos.y - currGameState.player1.speed };
    }
  }
  if (currGameState.player1.movement.left) {
    if (checkCollision(currGameState, { x: currGameState.player1.pos.x - currGameState.player1.speed - hitboxRound, y: currGameState.player1.pos.y }, 1)) {
      currGameState.player1.pos = { x: currGameState.player1.pos.x - currGameState.player1.speed, y: currGameState.player1.pos.y };
    }
  }
  if (currGameState.player1.movement.right) {
    if (checkCollision(currGameState, { x: currGameState.player1.pos.x + currGameState.player1.speed + hitboxRound, y: currGameState.player1.pos.y }, 1)) {
      currGameState.player1.pos = { x: currGameState.player1.pos.x + currGameState.player1.speed, y: currGameState.player1.pos.y };
    }
  }

  // second character
  if (currGameState.player2.movement.down) {
    if (checkCollision(currGameState, { x: currGameState.player2.pos.x, y: currGameState.player2.pos.y + currGameState.player2.speed + hitboxRound }, 2)) {
      currGameState.player2.pos = { x: currGameState.player2.pos.x, y: currGameState.player2.pos.y + currGameState.player2.speed };
    }
  }
  if (currGameState.player2.movement.up) {
    if (checkCollision(currGameState, { x: currGameState.player2.pos.x, y: currGameState.player2.pos.y - currGameState.player2.speed - hitboxRound }, 2)) {
      currGameState.player2.pos = { x: currGameState.player2.pos.x, y: currGameState.player2.pos.y - currGameState.player2.speed };
    }
  }
  if (currGameState.player2.movement.left) {
    if (checkCollision(currGameState, { x: currGameState.player2.pos.x - currGameState.player2.speed - hitboxRound, y: currGameState.player2.pos.y }, 2)) {
      currGameState.player2.pos = { x: currGameState.player2.pos.x - currGameState.player2.speed, y: currGameState.player2.pos.y };
    }
  }
  if (currGameState.player2.movement.right) {
    if (checkCollision(currGameState, { x: currGameState.player2.pos.x + currGameState.player2.speed + hitboxRound, y: currGameState.player2.pos.y }, 2)) {
      currGameState.player2.pos = { x: currGameState.player2.pos.x + currGameState.player2.speed, y: currGameState.player2.pos.y };
    }
  }

  // third character
  if (currGameState.player3.movement.down) {
    if (checkCollision(currGameState, { x: currGameState.player3.pos.x, y: currGameState.player3.pos.y + currGameState.player3.speed + hitboxRound }, 3)) {
      currGameState.player3.pos = { x: currGameState.player3.pos.x, y: currGameState.player3.pos.y + currGameState.player3.speed };
    }
  }
  if (currGameState.player3.movement.up) {
    if (checkCollision(currGameState, { x: currGameState.player3.pos.x, y: currGameState.player3.pos.y - currGameState.player3.speed - hitboxRound }, 3)) {
      currGameState.player3.pos = { x: currGameState.player3.pos.x, y: currGameState.player3.pos.y - currGameState.player3.speed };
    }
  }
  if (currGameState.player3.movement.left) {
    if (checkCollision(currGameState, { x: currGameState.player3.pos.x - currGameState.player3.speed - hitboxRound, y: currGameState.player3.pos.y }, 3)) {
      currGameState.player3.pos = { x: currGameState.player3.pos.x - currGameState.player3.speed, y: currGameState.player3.pos.y };
    }
  }
  if (currGameState.player3.movement.right) {
    if (checkCollision(currGameState, { x: currGameState.player3.pos.x + currGameState.player3.speed + hitboxRound, y: currGameState.player3.pos.y }, 3)) {
      currGameState.player3.pos = { x: currGameState.player3.pos.x + currGameState.player3.speed, y: currGameState.player3.pos.y };
    }
  }

  // fourth character
  if (currGameState.player4.movement.down) {
    if (checkCollision(currGameState, { x: currGameState.player4.pos.x, y: currGameState.player4.pos.y + currGameState.player4.speed + hitboxRound }, 4)) {
      currGameState.player4.pos = { x: currGameState.player4.pos.x, y: currGameState.player4.pos.y + currGameState.player4.speed };
    }
  }
  if (currGameState.player4.movement.up) {
    if (checkCollision(currGameState, { x: currGameState.player4.pos.x, y: currGameState.player4.pos.y - currGameState.player4.speed - hitboxRound }, 4)) {
      currGameState.player4.pos = { x: currGameState.player4.pos.x, y: currGameState.player4.pos.y - currGameState.player4.speed };
    }
  }
  if (currGameState.player4.movement.left) {
    if (checkCollision(currGameState, { x: currGameState.player4.pos.x - currGameState.player4.speed - hitboxRound, y: currGameState.player4.pos.y }, 4)) {
      currGameState.player4.pos = { x: currGameState.player4.pos.x - currGameState.player4.speed, y: currGameState.player4.pos.y };
    }
  }
  if (currGameState.player4.movement.right) {
    if (checkCollision(currGameState, { x: currGameState.player4.pos.x + currGameState.player4.speed + hitboxRound, y: currGameState.player4.pos.y }, 4)) {
      currGameState.player4.pos = { x: currGameState.player4.pos.x + currGameState.player4.speed, y: currGameState.player4.pos.y };
    }
  }

  return currGameState;
}

module.exports = { movement };
