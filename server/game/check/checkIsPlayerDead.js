/* eslint-disable no-param-reassign */
function checkIsPlayerDead(currGameState, io, roomId) {
  // player 1

  if (!(currGameState.player1.hp) && currGameState.player1.isAlive) {
    io.sockets.in(roomId).emit('lose', currGameState, 1);
    currGameState.player1.statistics.deaths += 1;

    if (currGameState.player1.lastDamageFrom === 2) {
      currGameState.player2.statistics.kills += 1;
    }
    if (currGameState.player1.lastDamageFrom === 3) {
      currGameState.player3.statistics.kills += 1;
    }
    if (currGameState.player1.lastDamageFrom === 4) {
      currGameState.player4.statistics.kills += 1;
    }

    currGameState.player1.isAlive = false;
  }

  // player 2

  if (!(currGameState.player2.hp) && currGameState.player2.isAlive) {
    io.sockets.in(roomId).emit('lose', currGameState, 2);
    currGameState.player2.statistics.deaths += 1;

    if (currGameState.player2.lastDamageFrom === 1) {
      currGameState.player1.statistics.kills += 1;
    }
    if (currGameState.player2.lastDamageFrom === 3) {
      currGameState.player3.statistics.kills += 1;
    }
    if (currGameState.player2.lastDamageFrom === 4) {
      currGameState.player4.statistics.kills += 1;
    }

    currGameState.player2.isAlive = false;
  }

  // player 3

  if (!(currGameState.player3.hp) && currGameState.player3.isAlive) {
    io.sockets.in(roomId).emit('lose', currGameState, 3);
    currGameState.player3.statistics.deaths += 1;

    if (currGameState.player3.lastDamageFrom === 1) {
      currGameState.player1.statistics.kills += 1;
    }
    if (currGameState.player3.lastDamageFrom === 2) {
      currGameState.player2.statistics.kills += 1;
    }
    if (currGameState.player3.lastDamageFrom === 4) {
      currGameState.player4.statistics.kills += 1;
    }

    currGameState.player3.isAlive = false;
  }

  // player 4

  if (!(currGameState.player4.hp) && currGameState.player4.isAlive) {
    io.sockets.in(roomId).emit('lose', currGameState, 4);
    currGameState.player4.statistics.deaths += 1;

    if (currGameState.player4.lastDamageFrom === 1) {
      currGameState.player1.statistics.kills += 1;
    }
    if (currGameState.player4.lastDamageFrom === 2) {
      currGameState.player2.statistics.kills += 1;
    }
    if (currGameState.player4.lastDamageFrom === 3) {
      currGameState.player3.statistics.kills += 1;
    }

    currGameState.player4.isAlive = false;
  }
  return currGameState;
}

module.exports = {
  checkIsPlayerDead,
};
