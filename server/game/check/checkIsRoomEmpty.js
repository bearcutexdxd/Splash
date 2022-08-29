/* eslint-disable no-param-reassign */
let { socketRooms } = require('../gameState');
const { globalGameState } = require('../gameState');

function checkIsRoomEmpty(roomId, socket) {
  // deleting user from the rooms and users
  socketRooms = socketRooms.filter((el) => !(el[socket.id]));
  console.log(socketRooms, '\n NEW ROOMS');

  // deleting room game state
  const currUsersInRoom = socketRooms.filter((el) => el.room === roomId);
  if (currUsersInRoom.length === 0) {
    delete globalGameState[roomId];
    console.log(globalGameState, '\n NEW GLOBAL GAMESTATE');
  }

  return socketRooms;
}

module.exports = {
  checkIsRoomEmpty,
};
