import { combineReducers } from 'redux';
import postReducer from './post';

// This is just for the test, usualy, combineReducers is used for multiple reducers
const rootReducer = combineReducers({
    postReducer
});

export default rootReducer;