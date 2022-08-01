/* eslint-disable default-param-last */
import { SET_GAMESTATE } from '../types';

const { v4: uuidv4 } = require('uuid');

const initialState = {
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

const gameStateReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_GAMESTATE:
      return payload;
    default:
      return state;
  }
};

export default gameStateReducer;
