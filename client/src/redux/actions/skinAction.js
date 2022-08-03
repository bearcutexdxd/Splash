import * as endPoints from '../../config/endPoints';

export const getSkinAC = (data) => ({ type: 'GET_SKIN', payload: data });

export const getSkinThunk = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3030/shop');
    if (response.ok) {
      const data = await response.json();
      dispatch(getSkinAC(data));
    }
  } catch (error) {
    console.log(error.message);
  }
};
