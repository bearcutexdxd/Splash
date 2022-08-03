import * as endPoints from '../../config/endPoints';

export const getSkinsAC = (data) => ({ type: 'GET_SKINS', payload: data });
export const getUserSkinsAC = (data) => ({ type: 'GET_USER_SKINS', payload: data });

export const getSkinsThunk = () => async (dispatch) => {
  try {
    const response = await fetch(endPoints.getAllSkins());
    if (response.ok) {
      const data = await response.json();
      dispatch(getSkinsAC(data));
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const postSkinThunk = (user, skinId) => async (dispatch) => {
  try {
    const response = await fetch(endPoints.postSkin(), {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ id: user.id, skinId }),
    });
    console.log(user, skinId);
  } catch (error) {
    console.log(error.message);
  }
};

export const putSkinUserThunk = (id, newSkin) => async (dispatch) => {
  try {
    const response = await fetch(endPoints.postSkin(), {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ id, newSkin }),
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserSkinsThunk = (id) => async (dispatch) => {
  try {
    const response = await fetch(endPoints.getUserSkins(id));
    if (response.ok) {
      const data = await response.json();
      dispatch(getUserSkinsAC(data));
    }
  } catch (error) {
    console.log(error.message);
  }
};
