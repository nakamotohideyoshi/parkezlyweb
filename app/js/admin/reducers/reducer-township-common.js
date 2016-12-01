import * as types from '../constants/actionTypes.js'
import _ from 'lodash';

const initialState = {
  isLoading: true,
  data: [],
  error: false
};

export function townshipSchemeTypesFetched(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_SCHEME_TYPES_GET_ERROR:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_SCHEME_TYPES_GET_SUCCESS:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_SCHEME_TYPES_GET_REQ:
      return _.assign({}, state, {isLoading: true, error: false });
    default:
      return state;
  }
};
