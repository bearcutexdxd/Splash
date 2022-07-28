function createGameState() {
  return {
    player: {
      pos: {
        x: 10,
        y: 10,
      },
    },
    gridsize: 20,
  };
}

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

module.exports = { createGameState, initialGameState };
