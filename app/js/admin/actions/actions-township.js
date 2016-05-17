import axios from 'axios';
import {reset} from 'redux-form';

import * as types from '../constants/actionTypes.js';
import * as apiTownship from '../api/api-township.js';

import _ from 'lodash';


const BASE_URL = 'http://100.12.26.176:8006/api/v2/pzly02live7/_table/';
const APP_NAME = 'parkezly';
const API_KEY = 'dbed451c5e4e1518d301c118ffe078ca16a2c287d5efff98515b938538abb5b5';

const AXIOS_INSTANCE = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    'X-DreamFactory-Application-Name': APP_NAME, 
    'X-DreamFactory-Api-Key' : API_KEY 
  }
});

export function fetchTownshipList(id) {

  const URL = 'townships_manager'

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_FETCH_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_FETCH_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_FETCH_GET_ERROR));
    })
  }
}

export function fetchTownshipDetails(id) {

  const URL = 'townships_manager'

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.DETAILS_FETCH_GET_REQ));
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.DETAILS_FETCH_GET_SUCCESS));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.DETAILS_FETCH_GET_ERROR));
    })
  }
}

export function submitNewTownship(data) {
  
  const URL = 'townships_manager';
  
  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_CREATE_POST_REQ));
    return AXIOS_INSTANCE.post(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_CREATE_POST_SUCCESS));
      dispatch(reset('township-create'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_CREATE_POST_ERROR));
    })
  }
}


export function editTownship(data, id) {
  const URL = 'townships_manager?ids=' + id;

  return function(dispatch) {
    dispatch(apiTownship.requestData(types.TOWNSHIP_EDIT_PUT_REQ));
    return AXIOS_INSTANCE.put(URL, data)
    .then(function(response) {
      dispatch(apiTownship.receiveData(response.data, types.TOWNSHIP_EDIT_PUT_SUCCESS));
      dispatch(reset('township-details'));
    })
    .catch(function(response){
      dispatch(apiTownship.receiveError(response.data, types.TOWNSHIP_EDIT_PUT_ERROR));
      console.log(response);
    })
  }
}

export function resetLoading() {
  return {
    type: types.RESET_LOADING
  };
}

export function updateTownshipDetails(data) {
  return {
    type: 'SEND_TOWNSHIP_DETAILS',
    data: data
  };
}

export function resetTownshipDetails(data) {
  return {
    type: 'RESET_TOWNSHIP_DETAILS',
    data: data
  };
}

export function uploadImage(finalResult) {

    return function(dispatch) {

      dispatch(apiTownship.requestData(types.UPLOAD_TOWNSHIP_IMAGE_REQ));

      return axios.post('/admin/s3', {croppedImage: finalResult})
      .then(function(response) {
        dispatch(apiTownship.receiveData(response, types.UPLOAD_TOWNSHIP_IMAGE_SUCCESS));
        console.log("Success:")
        console.log(response)
      })
      .catch(function(response){
        dispatch(apiTownship.receiveError(response, types.UPLOAD_TOWNSHIP_IMAGE_ERROR));
        console.log(response);
      })
    }
}
