import * as endPoints from '../../config/endPoints';

export const getCurrRoomAC = (payload) => ({ type: 'GET_CURR_ROOM', payload });
export const getRoomsAC = (payload) => ({ type: 'GET_ROOMS', payload });

export const getCurrRoom = () => async (dispatch) => {
  const response = await fetch(endPoints.getCurrRoom());

  if (response.ok) {
    const data = await response.json();
    dispatch(getCurrRoomAC(data));
  }
};

export const getRooms = () => async (dispatch) => {
  const response = await fetch(endPoints.getRooms());

  if (response.ok) {
    const data = await response.json();
    dispatch(getRoomsAC(data));
  }
};
