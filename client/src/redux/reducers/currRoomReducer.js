const currRoomReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_CURR_ROOM':
      return payload;
    default:
      return state;
  }
};

export default currRoomReducer;
