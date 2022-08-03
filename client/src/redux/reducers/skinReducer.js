const skinReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_SKIN':
      return payload;
    case 'ADD_SKIN':
      return [...state, payload];
    default:
      return state;
  }
};

export default skinReducer;
