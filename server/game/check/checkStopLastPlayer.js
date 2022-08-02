/* eslint-disable no-param-reassign */
function checkStopLastPlayer(currGameState) {
  currGameState.player1.movement = {
    down: false, up: false, left: false, right: false,
  };
  currGameState.player2.movement = {
    down: false, up: false, left: false, right: false,
  };
  currGameState.player3.movement = {
    down: false, up: false, left: false, right: false,
  };
  currGameState.player4.movement = {
    down: false, up: false, left: false, right: false,
  };
  return currGameState;
}

module.exports = {
  checkStopLastPlayer,
};
