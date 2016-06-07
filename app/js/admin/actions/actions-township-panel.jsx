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


export function fetchTownshipFacilities(townshipCode) {
  const URL = 'location_lot?filter=township_code' + '%3D%22' + townshipCode + '%22';

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_FACILITIES_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_FACILITIES_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_FACILITIES_GET_ERROR));
    })
  }
}

export function editTownshipFacilities(data, id) {
  const URL = 'location_lot?ids=' + id;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_FACILITIES_PUT_REQ));
    return AXIOS_INSTANCE.put(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_FACILITIES_PUT_SUCCESS));
      dispatch(reset('township-panel-facilities-edit'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_FACILITIES_PUT_ERROR));
      console.log(response);
    })
  }
}

export function createTownshipFacilities(data) {
  
  const URL = 'location_lot';
  
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_FACILITIES_POST_REQ));
    return AXIOS_INSTANCE.post(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_FACILITIES_POST_SUCCESS));
      dispatch(reset('township-panel-users-edit'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_FACILITIES_POST_ERROR));
    })
  }
}

export function fetchTownshipPermitRequests(townshipCode) {
  const URL = 'permit_subscription?filter=township_code' + '%3D%22' + townshipCode + '%22';

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_PERMIT_REQUESTS_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_PERMIT_REQUESTS_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_PERMIT_REQUESTS_GET_ERROR));
    })
  }
}

export function fetchTownshipPermitTypes(townshipCode) {
  const URL = 'permit_type';

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_PERMIT_TYPES_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_PERMIT_TYPES_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_PERMIT_TYPES_GET_ERROR));
    })
  }
}

export function createTownshipPermitTypes(data) {
  
  const URL = 'permit_type';
  
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_PERMIT_TYPES_POST_REQ));
    return AXIOS_INSTANCE.post(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_PERMIT_TYPES_POST_SUCCESS));
      dispatch(reset('permit-types'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_PERMIT_TYPES_POST_ERROR));
    })
  }
}

export function fetchTownshipParkingPermits(townshipCode) {
  const URL = 'parking_permits';

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_PARKING_PERMITS_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_PARKING_PERMITS_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_PARKING_PERMITS_GET_ERROR));
    })
  }
}

export function createTownshipParkingPermits(data) {
  
  const URL = 'parking_permits';
  
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_PARKING_PERMITS_POST_REQ));
    return AXIOS_INSTANCE.post(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_PARKING_PERMITS_POST_SUCCESS));
      dispatch(reset('parking_permits'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_PARKING_PERMITS_POST_ERROR));
    })
  }
}

export function fetchTownshipPermitsList(townshipCode) {
  const URL = 'township_permits';

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_PERMITS_LIST_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_PERMITS_LIST_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_PERMITS_LIST_GET_ERROR));
    })
  }
}

export function createTownshipPermitsList(data) {
  
  const URL = 'township_permits';
  
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_PERMITS_LIST_POST_REQ));
    return AXIOS_INSTANCE.post(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_PERMITS_LIST_POST_SUCCESS));
      dispatch(reset('township-permits'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_PERMITS_LIST_POST_ERROR));
    })
  }
}

export function fetchLocationsRateList(townshipCode) {
  const URL = 'locations_rate';

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_LOCATIONS_RATE_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_LOCATIONS_RATE_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_LOCATIONS_RATE_GET_ERROR));
      console.log(response);
    })
  }
}

export function resetLoading() {
  return {
    type: types.RESET_LOADING
  };
}