import * as types from '../constants/actionTypes.js';

const initialState = {
  isLoading: true,
  data: [],
  error: false
};

export default function townshipListEdited(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_EDIT_PUT_ERROR:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_EDIT_PUT_SUCCESS:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_EDIT_PUT_REQ:
      return Object.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}