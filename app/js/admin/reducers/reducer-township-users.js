import * as types from '../constants/actionTypes.js'

const initialState = {
  isLoading: true,
  data: [],
  error: false
};

export function townshipUsersFetched(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_USERS_GET_ERROR:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_USERS_GET_SUCCESS:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_USERS_GET_REQ:
      return Object.assign({}, state, {isLoading: true, error: false });
    default:
      return state;
  }
};

export function townshipUsersEdited(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_USERS_PUT_ERROR:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_USERS_PUT_SUCCESS:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_USERS_PUT_REQ:
      return Object.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}

export function townshipUsersCreated(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_USERS_POST_ERROR:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_USERS_POST_SUCCESS:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_USERS_POST_REQ:
      return Object.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}