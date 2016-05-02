import {FETCH_TOWNSHIP_LIST} from '../actions/index.js';

export default function townshipListFetched(state = [], action) {
    switch(action.type) {
    case FETCH_TOWNSHIP_LIST:
      return state.concat([action.payload.data]);
    }
    return state;
}