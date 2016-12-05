import axios from 'axios';
import {reset} from 'redux-form';

import * as types from '../constants/actionTypes.js';
import * as apiTownship from '../api/api-township.js';
import {API_CONFIG} from '../config/api.js';

const AXIOS_INSTANCE = axios.create(API_CONFIG);


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
