/* eslint-disable no-param-reassign */

function checkWinnerInStarted(roomId, currSocketRooms) {
  let winner = false;
  const currUsersInRoom = currSocketRooms.filter((el) => el.room === roomId);
  if (currUsersInRoom.length === 1) {
    winner = currUsersInRoom[0].playerId;
  }
  return winner;
}

module.exports = {
  checkWinnerInStarted,
};
