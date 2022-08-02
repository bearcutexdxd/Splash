/* eslint-disable max-len */
const { v4: uuidv4 } = require('uuid');

const globalGameState = {};
const socketRooms = [];
const rooms = {};
function initialGameState() {
  return {
    player1: {
      direction: 'down',
      animation: '1',
      movement: {
        down: false, up: false, left: false, right: false,
      },
      pos: {
        x: 0,
        y: 0,
      },
      hp: 1,
    },
    player2: {
      direction: 'down',
      animation: '1',
      movement: {
        down: false, up: false, left: false, right: false,
      },
      pos: {
        x: 384,
        y: 0,
      },
      hp: 1,
    },
    player3: {
      direction: 'down',
      animation: '1',
      movement: {
        down: false, up: false, left: false, right: false,
      },
      pos: {
        x: 0,
        y: 384,
      },
      hp: 1,
    },
    player4: {
      direction: 'down',
      animation: '1',
      movement: {
        down: false, up: false, left: false, right: false,
      },
      pos: {
        x: 384,
        y: 384,
      },
      hp: 1,
    },
    bombs: [],
    splash: [],
    walls: [{ x: 5, y: 5, id: uuidv4() }, { x: 7, y: 7, id: uuidv4() }, { x: 3, y: 3, id: uuidv4() }, { x: 4, y: 4, id: uuidv4() }],
    gridsize: 32,
  };
}

function findRoomGameState(roomId) {
  let currGameState;

  Object.keys(globalGameState).forEach((el) => {
    if (el === roomId) {
      currGameState = globalGameState[el];
    }
  });

  return currGameState;
}

module.exports = {
  initialGameState, globalGameState, rooms, socketRooms, findRoomGameState,
};
