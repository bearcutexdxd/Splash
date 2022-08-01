import * as endPoints from '../../config/endPoints';

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
    navigate('/');
  } else {
    // console.log(data);
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
    navigate('/');
  } else {
    // console.log(data);
  }
};

export const checkAuth = () => async (dispatch) => {
  const response = await fetch(endPoints.checkAuth(), {
    credentials: 'include',
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(addUserAC(data));
  }
};

export const signOut = (navigate) => async (dispatch) => {
  const response = await fetch(endPoints.signOut(), {
    credentials: 'include',
  });
  if (response.ok) {
    dispatch(deleteUserAC());
    navigate('/');
  }
};
