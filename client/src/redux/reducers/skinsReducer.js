export const skinReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_SKINS':
      return payload;
    default:
      return state;
  }
};

export const userSkinsReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_USER_SKINS':
      return payload;
    default:
      return state;
  }
};
