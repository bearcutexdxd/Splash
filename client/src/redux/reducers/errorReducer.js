const errorReducer = (state = { error: ' ' }, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_ERROR':
      return payload;
    case 'DELETE_ERROR':
      return { error: ' ' };
    default:
      return state;
  }
};

export default errorReducer;
