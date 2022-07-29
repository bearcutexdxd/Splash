const userReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_USER':
      return payload;

    case 'DELETE_USER':
      return {};

    default:
      return state;
  }
};

export default userReducer;
