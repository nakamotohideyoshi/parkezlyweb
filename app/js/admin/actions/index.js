import axios from 'axios';

const BASE_URL = 'http://100.12.26.176:8006/api/v2/pzly02live7/_table/';
const APP_NAME = 'parkezly';
const API_KEY = 'dbed451c5e4e1518d301c118ffe078ca16a2c287d5efff98515b938538abb5b5';

const AXIOS_INSTANCE = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    'X-DreamFactory-Application-Name': APP_NAME, 
    'X-DreamFactory-Api-Key' : API_KEY 
  }
});

export const FETCH_TOWNSHIP_LIST = 'FETCH_TOWNSHIP_LIST';

export function fetchTownshipList(data) {

  const URL = 'townships_manager?related=*'
  const REQUEST = AXIOS_INSTANCE.get(URL);

  // console.log(REQUEST);

  return {
    type: FETCH_TOWNSHIP_LIST,
    payload: REQUEST
  };
}