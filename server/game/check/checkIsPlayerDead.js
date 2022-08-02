/* eslint-disable no-param-reassign */
function checkIsPlayerDead(currGameState, io, roomId) {
  if (!(currGameState.player1.hp) && currGameState.player1.isAlive) {
    io.sockets.in(roomId).emit('lose', currGameState, 1);
    currGameState.player1.isAlive = false;
  }
  if (!(currGameState.player2.hp) && currGameState.player2.isAlive) {
    io.sockets.in(roomId).emit('lose', currGameState, 2);
    currGameState.player2.isAlive = false;
  }
  if (!(currGameState.player3.hp) && currGameState.player3.isAlive) {
    io.sockets.in(roomId).emit('lose', currGameState, 3);
    currGameState.player3.isAlive = false;
  }
  if (!(currGameState.player4.hp) && currGameState.player4.isAlive) {
    io.sockets.in(roomId).emit('lose', currGameState, 4);
    currGameState.player4.isAlive = false;
  }
  return currGameState;
}

module.exports = {
  checkIsPlayerDead,
};
