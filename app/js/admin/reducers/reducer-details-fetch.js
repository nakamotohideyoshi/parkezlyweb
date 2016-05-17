import * as types from '../constants/actionTypes.js';

const initialState = {
  isLoading: true,
  data: [],
  error: false
};

export default function townshipListFetched(state = initialState, action) {
  switch(action.type) {
    case types.DETAILS_FETCH_GET_ERROR:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.DETAILS_FETCH_GET_SUCCESS:
      console.log("TEST");
      return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.DETAILS_FETCH_GET_REQ:
      console.log("TEST");
      return Object.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}