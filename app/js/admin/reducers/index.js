import { combineReducers } from 'redux';

import townshipListFetched from './reducer-township-list.js'

const rootReducer = combineReducers({
  townshipListFetched: townshipListFetched
});

export default rootReducer;