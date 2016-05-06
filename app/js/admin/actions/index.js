import axios from 'axios';
import * as types from '../constants/actionTypes.js';
import * as townshipSubmit from '../api/township-submit.js';
import * as townshipEdit from '../api/township-edit.js'

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

export function fetchTownshipList() {
  const URL = 'townships_manager'
  const REQUEST = AXIOS_INSTANCE.get(URL);

  return function(dispatch) {
    dispatch(townshipSubmit.requestData());
    return AXIOS_INSTANCE.get(URL)
    .then(function(response) {
      dispatch(townshipSubmit.receiveData(response.data));
    })
    .catch(function(response){
      dispatch(townshipSubmit.receiveError(response.data));
      dispatch(townshipSubmit.pushState(null,'/error'));
    })
  }
}

export function submitNewTownship(data) {

  const URL = 'townships_manager'
  const REQUEST = AXIOS_INSTANCE.post(URL, data);

  return {
    type: types.SUBMIT_NEW_TOWNSHIP,
    payload: "Test"
  };
}

export function editTownship(data, id) {
  
  const URL = 'townships_manager?ids=' + id
  const REQUEST = AXIOS_INSTANCE.put(URL, data);

  return function(dispatch) {
    dispatch(townshipEdit.requestData());
    return AXIOS_INSTANCE.put(URL, data)
    .then(function(response) {
      dispatch(townshipEdit.receiveData(response.data));
    })
    .catch(function(response){
      dispatch(townshipEdit.receiveError(response.data));
      dispatch(townshipEdit.pushState(null,'/error'));
    })
  }
}

export function updateTownshipDetails(data) {
  return {
    type: 'SEND_TOWNSHIP_DETAILS',
    payload: data
  };
}

