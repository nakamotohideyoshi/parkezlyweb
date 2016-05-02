import axios from 'axios';

const API_KEY = 'dbed451c5e4e1518d301c118ffe078ca16a2c287d5efff98515b938538abb5b5';
const ROOT_URL = 'http://100.12.26.176:8006/api/v2/pzly02live7/_table/townships_manager?related=*';

export const FETCH_TOWNSHIP_LIST = 'FETCH_TOWNSHIP_LIST';

export function fetchTownshipList(data) {

  const url = ROOT_URL + '&api_key=' + API_KEY;
  const request = axios.get(url);
  console.log(request);

  return {
    type: FETCH_TOWNSHIP_LIST,
    payload: request
  };
}