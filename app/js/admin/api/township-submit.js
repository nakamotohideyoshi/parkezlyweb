import * as types from '../constants/actionTypes.js';

export function requestData() {
  return {type: types.REQ_DATA}
};

export function receiveData(json) {
  return{
    type: types.RECV_DATA,
    data: json
  }
};

export function receiveError(json) {
  return {
    type: types.RECV_ERROR,
    data: json
  }
};