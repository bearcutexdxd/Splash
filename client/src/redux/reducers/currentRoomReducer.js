const currentRoomReducer = (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_CURRENTROOM':
      return payload;
    default:
      return state;
  }
};

export default currentRoomReducer;
