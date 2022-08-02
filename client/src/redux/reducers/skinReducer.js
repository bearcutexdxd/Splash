const skinReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_SKIN':
      return payload;
    default:
      return state;
  }
};

export default skinReducer;
