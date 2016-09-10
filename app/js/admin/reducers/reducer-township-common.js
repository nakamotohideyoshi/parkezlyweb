import * as types from '../constants/actionTypes.js'

const initialState = {
  isLoading: true,
  data: [],
  error: false
};

export function townshipSchemeTypesFetched(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_SCHEME_TYPES_GET_ERROR:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_SCHEME_TYPES_GET_SUCCESS:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_SCHEME_TYPES_GET_REQ:
      return Object.assign({}, state, {isLoading: true, error: false });
    default:
      return state;
  }
};
