import authReducer from './auth';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  auth: authReducer,
})

export default reducers;
