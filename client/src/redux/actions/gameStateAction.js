import * as endPoints from '../../config/endPoints';

export const putGameStateAC = (payload) => ({ type: 'PUT_GAME_STATE', payload });

export const changeGameState = (newState) => async (dispatch) => {
  try {
    const response = await fetch(endPoints.checkAuth(), {
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(putGameStateAC(newState));
    }
  } catch (error) {
    console.log(error.message);
  }
};
