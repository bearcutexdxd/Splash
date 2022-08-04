const statisticsReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_STAT':
      return payload;

    case 'PUT_STAT':
      return {};

    default:
      return state;
  }
};

export default statisticsReducer;
