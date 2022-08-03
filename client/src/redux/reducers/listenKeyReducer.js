import { SET_LISTENKEY } from '../types';

const listenKeyReducer = (state = false, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LISTENKEY:
      return payload;
    default:
      return state;
  }
};

export default listenKeyReducer;
