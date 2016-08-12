import { createStore , applyMiddleware , compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer/combineReducer.js';

const appState  = [
];
const defaultState = {
	appState
};

const store = createStore(rootReducer , defaultState , compose(
	applyMiddleware(thunk)
));

export default store;