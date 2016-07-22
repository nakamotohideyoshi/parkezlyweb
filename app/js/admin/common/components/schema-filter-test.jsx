import React from 'react';
import axios from 'axios';
import {reset} from 'redux-form';

import * as apiTownship from '../../api/api-township.js';
import {createFilter} from 'react-search-input';

import {API_CONFIG} from '../../config/api.js';

const AXIOS_INSTANCE = axios.create(API_CONFIG);
const NAME_TO_SEARCH = 'location_type';

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