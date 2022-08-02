import { combineReducers } from 'redux';
import userReducer from './userReducer';
import statisticsReducer from './statisticsReducer';
import gameStateReducer from './gameStateReducer';
import roomsReducer from './roomsReducer';
import currentRoomReducer from './currentRoomReducer';

const rootReducer = combineReducers({
  user: userReducer,
  stats: statisticsReducer,
  gameState: gameStateReducer,
  rooms: roomsReducer,
  currentRoom: currentRoomReducer,
});

export default rootReducer;
