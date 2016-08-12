import appState from './flightSearch.js';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	appState
});

export default rootReducer;