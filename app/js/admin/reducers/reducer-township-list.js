import * as types from '../constants/actionTypes.js'

const initialState = {
  isLoading: true,
  data: [],
  error: false
};

export default function townshipListFetched(state = initialState, action) {
  switch(action.type) {
    case types.RECV_ERROR:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.RECV_DATA:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.REQ_DATA:
      return Object.assign({}, state, {isLoading: true, error: false });
    default:
      return state;
  }
};
