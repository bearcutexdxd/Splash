/* eslint-disable max-len */
const { checkMovement } = require('../../check/checkMovement');

function setAnimation(gameStateArg, animationArg, animationFrame) {
  const animation = animationArg;
  const currGameState = gameStateArg;
  if (animation.counter1 <= animationFrame && checkMovement(currGameState, '1')) {
    if (animation.counter1 <= animationFrame / 4) {
      currGameState.player1.animation = '1';
    } else if (animation.counter1 > animationFrame / 4 && animation.counter1 <= animationFrame / 2) {
      currGameState.player1.animation = '2';
    } else if (animation.counter1 > animationFrame / 2 && animation.counter1 <= (animationFrame * 3) / 4) {
      currGameState.player1.animation = '3';
    } else if (animation.counter1 > (animationFrame * 3) / 4) {
      currGameState.player1.animation = '4';
    }
    animation.counter1 += 1;
  }

  if (animation.counter2 <= animationFrame && checkMovement(currGameState, '2')) {
    if (animation.counter2 <= animationFrame / 4) {
      currGameState.player2.animation = '1';
    } else if (animation.counter2 > animationFrame / 4 && animation.counter2 <= animationFrame / 2) {
      currGameState.player2.animation = '2';
    } else if (animation.counter2 > animationFrame / 2 && animation.counter2 <= (animationFrame * 3) / 4) {
      currGameState.player2.animation = '3';
    } else if (animation.counter2 > (animationFrame * 3) / 4) {
      currGameState.player2.animation = '4';
    }
    animation.counter2 += 1;
  }

  if (animation.counter3 <= animationFrame && checkMovement(currGameState, '3')) {
    if (animation.counter3 <= animationFrame / 4) {
      currGameState.player3.animation = '1';
    } else if (animation.counter3 > animationFrame / 4 && animation.counter3 <= animationFrame / 2) {
      currGameState.player3.animation = '2';
    } else if (animation.counter3 > animationFrame / 2 && animation.counter3 <= (animationFrame * 3) / 4) {
      currGameState.player3.animation = '3';
    } else if (animation.counter3 > (animationFrame * 3) / 4) {
      currGameState.player3.animation = '4';
    }
    animation.counter3 += 1;
  }

  if (animation.counter4 <= animationFrame && checkMovement(currGameState, '4')) {
    if (animation.counter4 <= animationFrame / 4) {
      currGameState.player4.animation = '1';
    } else if (animation.counter4 > animationFrame / 4 && animation.counter4 <= animationFrame / 2) {
      currGameState.player4.animation = '2';
    } else if (animation.counter4 > animationFrame / 2 && animation.counter4 <= (animationFrame * 3) / 4) {
      currGameState.player4.animation = '3';
    } else if (animation.counter4 > (animationFrame * 3) / 4) {
      currGameState.player4.animation = '4';
    }
    animation.counter4 += 1;
  }

  return { currGameState, animation };
}

module.exports = { setAnimation };
