/* eslint-disable no-param-reassign */

function checkStopGameOnLeave(roomId, currSocketRooms, currGameState) {
  let winner = false;
  const currUsersInRoom = currSocketRooms.filter((el) => el.room === roomId);
  if (currUsersInRoom.length === 1 && currGameState.intervalCounter > 1) {
    winner = true;
  }
  return winner;
}

module.exports = {
  checkStopGameOnLeave,
};
