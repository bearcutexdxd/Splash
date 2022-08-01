const init = {
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

const gameStateReducer = (state = init, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'PUT_GAME_STATE':
      return payload;

    default:
      return state;
  }
};

export default gameStateReducer;
