import { combineReducers } from 'redux';
import api from './api';
import search from './search';

export default combineReducers({
    api,
    search
});
