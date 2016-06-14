import axios from 'axios';
import {reset} from 'redux-form';

import * as types from '../constants/actionTypes.js';
import * as apiTownship from '../api/api-township.js';
import * as apiConfig from '../config/api.js';

const AXIOS_INSTANCE = axios.create(apiConfig.API_CONFIG);


export function fetchTownshipSchemeTypes(townshipCode) {
  const URL = 'scheme_type';

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_SCHEME_TYPES_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_SCHEME_TYPES_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_SCHEME_TYPES_GET_ERROR));
    })
  }
}

/*


function apiAction(type, apiCall) {
  return dispatch => {
    dispatch(apiTownship.requestData(type.start);
    return apiCall(AXIOS_INSTANCE)
      .then(res => dispatch(apiTownship.receiveData(res.data, type.success))
      .catch(res => apiTownship.receiveError(res.data, type.error))
  }
}

export function fetchWhatever(townshipCode) {
  const URL = 'whatever_table?filter=township_code' + '%3D%22' + townshipCode + '%22';
  return apiAction(types.WHATEVER_USERS_GET, api => api.get(URL));
}

export function editWhatever(data, id) {
  const URL = 'whatever_table?ids=' + id;
  return apiAction(types.WHATEVER_USERS_PUT, api => api.put(URL, data));
}

export function createWhatever(data) {  
  const URL = 'whatever_table';
  return apiAction(types.WHATEVER_USERS_POST, api => api.post(URL, data));
}


const initialState = {
  isLoading: true,
  data: [],
  error: false
};

function handleAction(state, action, type) {
  switch(action.type) {
    case type.error:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
    case type.success:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
    case type.start:
      return Object.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}

export function WhateverFetched(state = initialState, action) {
  return handleAction(state, action, types.WHATEVER_GET);
};

export function WhateverEdited(state = initialState, action) {
  return handleAction(state, action, types.WHATEVER_PUT);
}

export function WhateverCreated(state = initialState, action) {
  return handleAction(state, action, types.WHATEVER_POST);
}

*/