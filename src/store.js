import {
  createStore,
  applyMiddleware,
} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';


const createStoreWithMiddleware = applyMiddleware(
  thunk,
  logger
)(createStore)


export default createStoreWithMiddleware(reducers)
