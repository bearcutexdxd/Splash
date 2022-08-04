import * as endPoints from '../../config/endPoints';
import { checkAuth } from './userAction';

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

export const postSkinThunk = (user, skinId, price) => async (dispatch) => {
  try {
    const response = await fetch(endPoints.postSkin(), {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ id: user.id, skinId, price }),
    });
    console.log(user, skinId, price);
  } catch (error) {
    console.log(error.message);
  }
};

export const putSkinUserThunk = (user, newSkin) => async (dispatch) => {
  try {
    const response = await fetch(endPoints.putSkinUser(), {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ id: user.id, newSkin }),
    });
    if (!response.ok) throw Error('bad request');
    dispatch(checkAuth());
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
      console.log('data!!!!', data);
    }
  } catch (error) {
    console.log(error.message);
  }
};
