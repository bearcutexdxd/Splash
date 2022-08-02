/* eslint-disable no-param-reassign */
function checkStopGame(currGameState) {
  let counter = 0;
  if (!(currGameState.player1.isAlive)) counter += 1;
  if (!(currGameState.player2.isAlive)) counter += 1;
  if (!(currGameState.player3.isAlive)) counter += 1;
  if (!(currGameState.player4.isAlive)) counter += 1;
  if (counter === 3) return true;
  return false;
}

module.exports = {
  checkStopGame,
};
