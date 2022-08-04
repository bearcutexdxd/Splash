const errorReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_ERROR':
      return payload;
    case 'DELETE_ERROR':
      return {};
    default:
      return state;
  }
};

export default errorReducer;
