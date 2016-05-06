import {SUBMIT_NEW_TOWNSHIP} from '../actions/index.js';

export default function townshipCreate(state = [], action) {
    switch(action.type) {
    case SUBMIT_NEW_TOWNSHIP:
      return action.payload;
    }
    return state;
}