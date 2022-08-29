/* eslint-disable no-param-reassign */
function checkAlivePlayer(currGameState) {
  if (currGameState.player1.isAlive) return 1;
  if (currGameState.player2.isAlive) return 2;
  if (currGameState.player3.isAlive) return 3;
  if (currGameState.player4.isAlive) return 4;
  return false;
}

module.exports = {
  checkAlivePlayer,
};
