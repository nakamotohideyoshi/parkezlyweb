import * as types from '../constants/actionTypes.js';

export function requestData() {
  return {type: types.TOWNSHIP_EDIT_PUT_REQ}
};

export function receiveData(json) {
  return{
    type: types.TOWNSHIP_EDIT_PUT_SUCCESS,
    data: json
  }
};

export function receiveError(json) {
  return {
    type: types.TOWNSHIP_EDIT_PUT_ERROR,
    data: json
  }
};