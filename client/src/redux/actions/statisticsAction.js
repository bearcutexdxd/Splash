import * as endPoints from '../../config/endPoints';

export const getStatsAC = (payload) => ({ type: 'GET_STAT', payload });

export const getStats = (id) => async (dispatch) => {
  try {
    const response = await fetch(endPoints.getStats(id), {
      credentials: 'include',
    });
    console.log('!!!!! pull', id);
    if (response.ok) {
      const data = await response.json();
      dispatch(getStatsAC(data));
    }
  } catch (error) {
    console.log(error.message);
  }
};
