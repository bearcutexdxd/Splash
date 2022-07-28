const globalGameState = {};
const socketRooms = [];

function initialGameState() {
  return {
    player: {
      pos: {
        x: 0,
        y: 0,
      },
    },
    gridsize: 20,
  };
}

module.exports = { initialGameState, globalGameState, socketRooms };
