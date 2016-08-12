import { createStore , applyMiddleware } from 'redux';
import thunk from 'react-thunk';

import rootReducer from './reducer/combineReducer.js';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default function configureStore (initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}