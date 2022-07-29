import { combineReducers } from 'redux';
import userReducer from './userReducer';
import statisticsReducer from './statisticsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  stat: statisticsReducer,
});

export default rootReducer;
