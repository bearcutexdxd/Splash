/* eslint-disable no-param-reassign */
function checkRemoveDeadPlayers(currGameState) {
  if ((!currGameState.player1.isAlive)) {
    currGameState.player1.movement = {
      down: false, up: false, left: false, right: false,
    };
    currGameState.player1.pos = {
      x: 0,
      y: -50,
    };
  }
  if ((!currGameState.player2.isAlive)) {
    currGameState.player2.movement = {
      down: false, up: false, left: false, right: false,
    };
    currGameState.player2.pos = {
      x: 50,
      y: -50,
    };
  }
  if ((!currGameState.player3.isAlive)) {
    currGameState.player3.movement = {
      down: false, up: false, left: false, right: false,
    };
    currGameState.player3.pos = {
      x: 100,
      y: -50,
    };
  }
  if ((!currGameState.player4.isAlive)) {
    currGameState.player4.movement = {
      down: false, up: false, left: false, right: false,
    };
    currGameState.player4.pos = {
      x: 150,
      y: -50,
    };
  }
  return currGameState;
}

module.exports = {
  checkRemoveDeadPlayers,
};
