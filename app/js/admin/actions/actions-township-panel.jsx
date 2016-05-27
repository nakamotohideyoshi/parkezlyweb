import axios from 'axios';
import {reset} from 'redux-form';

import * as types from '../constants/actionTypes.js';
import * as apiTownship from '../api/api-township.js';
import * as apiConfig from '../config/api.js';

const AXIOS_INSTANCE = axios.create(apiConfig.API_CONFIG);

export function fetchTownshipUsers(townshipCode) {
  const URL = 'township_users?filter=township_code' + '%3D%22' + townshipCode + '%22';

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_USERS_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_USERS_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_USERS_GET_ERROR));
    })
  }
}

export function editTownshipUsers(data, id) {
  const URL = 'township_users?ids=' + id;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_USERS_PUT_REQ));
    return AXIOS_INSTANCE.put(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_USERS_PUT_SUCCESS));
      dispatch(reset('township-panel-users-edit'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_USERS_PUT_ERROR));
      console.log(response);
    })
  }
}

export function createTownshipUsers(data) {
  
  const URL = 'township_users';
  
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_USERS_POST_REQ));
    return AXIOS_INSTANCE.post(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_USERS_POST_SUCCESS));
      dispatch(reset('township-panel-users-edit'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_USERS_POST_ERROR));
    })
  }
}

export function resetLoading() {
  return {
    type: types.RESET_LOADING
  };
}