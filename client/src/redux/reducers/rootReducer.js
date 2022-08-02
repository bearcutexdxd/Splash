import { combineReducers } from 'redux';
import userReducer from './userReducer';
import statisticsReducer from './statisticsReducer';
import gameStateReducer from './gameStateReducer';
import roomsReducer from './roomsReducer';
import currRoomReducer from './currRoomReducer';

const rootReducer = combineReducers({
  user: userReducer,
  stats: statisticsReducer,
  gameState: gameStateReducer,
  currRoom: currRoomReducer,
  rooms: roomsReducer,
});

export default rootReducer;
