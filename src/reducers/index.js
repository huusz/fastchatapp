import authReducer from './auth';
import databaseReducer from './database';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  auth: authReducer,
  database: databaseReducer,
})

export default reducers;
