import { combineReducers } from 'redux';
import userReducer from '../modules/User/redux/userReducer';

export const rootReducer = combineReducers({
  user: userReducer
});