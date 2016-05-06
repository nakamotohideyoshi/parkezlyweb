import * as types from '../constants/actionTypes.js';
import {EDIT_TOWNSHIP} from '../actions/index.js';


const initialState = {
  isLoading: true,
  data: [],
  error: false
};

export default function townshipListEdited(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_EDIT_PUT_ERROR:
      return {isLoading: false, data: action.data, error: true};
    case types.TOWNSHIP_EDIT_PUT_SUCCESS:
      return {isLoading: false, data: action.data, error: false };
    case types.TOWNSHIP_EDIT_PUT_REQ:
      return {isLoading: true, error: false };
    default:
      return state;
  }
}