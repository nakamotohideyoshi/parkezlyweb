import React from 'react';
import axios from 'axios';
import {reset} from 'redux-form';

import * as apiTownship from '../../api/api-township.js';
import {createFilter} from 'react-search-input';

const BASE_URL = 'http://100.12.26.176:8006/api/v2/pzly03live7/';
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

const AXIOS_INSTANCE = axios.create(API_CONFIG);
const NAME_TO_SEARCH = 'max_time';

export const SchemaFilterTest = function() {
  // Testing multiple concurrent AXIOS Requests
  /*
  const getLocationLot = AXIOS_INSTANCE.get('_table/location_lot')
  const getTownships = AXIOS_INSTANCE.get('_table/townships_manager')
  axios.all([getLocationLot, getTownships]).then((response) => {
    console.log(response);
  })
  */


  AXIOS_INSTANCE.get('_table').then(function(response) {
    console.log("- Tables containing: " + NAME_TO_SEARCH + " -")
    response.data.resource.map((data) => {
      AXIOS_INSTANCE.get('_schema/' + data.name).then((response) => {
        //console.log(response.data.field);
        response.data.field.map((data) => {
          if(data.name == NAME_TO_SEARCH) {
            console.log(response.data.label);
          }
        })
      })
    })
  })
};