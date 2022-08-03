import { SET_PLAYERID } from '../types';

const playerIdReducer = (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_PLAYERID:
      return payload;
    default:
      return state;
  }
};

export default playerIdReducer;
