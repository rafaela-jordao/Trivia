import { combineReducers } from 'redux';
import play from './play';
import token from './token';

const rootReducer = combineReducers({ play, token });
export default rootReducer;
