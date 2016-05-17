const BASE_URL = 'http://100.12.26.176:8006/api/v2/pzly02live7/_table/';
const APP_NAME = 'parkezly';
const API_KEY = 'dbed451c5e4e1518d301c118ffe078ca16a2c287d5efff98515b938538abb5b5';

export const API_CONFIG = {
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    'X-DreamFactory-Application-Name': APP_NAME, 
    'X-DreamFactory-Api-Key' : API_KEY 
  }
};