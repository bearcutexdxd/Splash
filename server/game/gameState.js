const globalGameState = {};
const socketRooms = [];

function initialGameState() {
  return {
    player1: {
      pos: {
        x: 0,
        y: 0,
      },
    },
    player2: {
      pos: {
        x: 19,
        y: 0,
      },
    },
    player3: {
      pos: {
        x: 0,
        y: 19,
      },
    },
    player4: {
      pos: {
        x: 19,
        y: 19,
      },
    },
    gridsize: 20,
  };
}

module.exports = { initialGameState, globalGameState, socketRooms };
