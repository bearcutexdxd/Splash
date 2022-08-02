const { currRoom } = require('../../app');
const socketRooms = require('../../game/gameState');

const usersGet = async (req, res) => {
  console.log('roms!!!!!', currRoom);
  const roomUsers = socketRooms.filter((el) => el.room === currRoom);
  res.json(roomUsers);
};

module.exports = {
  usersGet,
};
