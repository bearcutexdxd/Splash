import * as endPoints from '../../config/endPoints';
import { deleteErrorAC, setErrorAC } from './errorAction';

export const addUserAC = (payload) => ({ type: 'SET_USER', payload });
export const deleteUserAC = () => ({ type: 'DELETE_USER' });

export const signUp = (payload, navigate) => async (dispatch) => {
  // console.log('!!!!pay', payload);
  const response = await fetch(endPoints.signUp(), {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  // console.log('!!!!!', data);
  if (response.ok) {
    dispatch(addUserAC(data));
    dispatch(deleteErrorAC());
    navigate('/main');
  } else {
    dispatch(setErrorAC(data));
  }
};

export const signIn = (payload, navigate) => async (dispatch) => {
  const response = await fetch(endPoints.signIn(), {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (response.ok) {
    dispatch(addUserAC(data));
    dispatch(deleteErrorAC());
    navigate('/main');
  } else {
    dispatch(setErrorAC(data));
  }
};

export const checkAuth = () => async (dispatch) => {
  try {
    const response = await fetch(endPoints.checkAuth(), {
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(addUserAC(data));
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const signOut = (navigate) => async (dispatch) => {
  const response = await fetch(endPoints.signOut(), {
    credentials: 'include',
  });
  if (response.ok) {
    dispatch(deleteUserAC());
  }
};
