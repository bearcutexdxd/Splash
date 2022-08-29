const { checkMovement } = require('../../check/checkMovement');

function resetCountersStop(gameStateArg, animationArg) {
  const animation = animationArg;
  const currGameState = gameStateArg;
  if (!checkMovement(gameStateArg, '1')) {
    animation.counter1 = 0;
    currGameState.player1.animation = '1';
  }
  if (!checkMovement(gameStateArg, '2')) {
    animation.counter2 = 0;
    currGameState.player2.animation = '1';
  }
  if (!checkMovement(gameStateArg, '3')) {
    animation.counter3 = 0;
    currGameState.player3.animation = '1';
  }
  if (!checkMovement(gameStateArg, '4')) {
    animation.counter4 = 0;
    currGameState.player4.animation = '1';
  }

  return { currGameState, animation };
}

module.exports = { resetCountersStop };
