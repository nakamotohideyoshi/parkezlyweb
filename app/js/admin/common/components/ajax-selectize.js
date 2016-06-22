import React from 'react';
import axios from 'axios';
import {reset} from 'redux-form';

import * as apiTownship from '../../api/api-township.js';
import {createFilter} from 'react-search-input';

const BASE_URL = 'http://100.12.26.176:8006/api/v2/pzly03live7/_table/';
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

export const ajaxSelectizeGet = function(tableName, dataField, componentFunction) {
  AXIOS_INSTANCE.get(tableName).then((response) => {
    var optionsArray = []
    response.data.resource.map(function(data){
      if (data[dataField] === null || data[dataField] === undefined) {
        optionsArray.push({id: data.id, label: 'n/a - submitted blank', value: 'n/a - submitted blank'});
      } else if (typeof data[dataField] !== 'string') {
        optionsArray.push({id: data.id, label: data[dataField].toString(), value: data[dataField].toString()});
      } else {
        optionsArray.push({id: data.id, label: data[dataField], value: data[dataField]});
      }
    });

    componentFunction(optionsArray, dataField);
  })
};

export const ajaxDelete = function(tableName, id, componentFunction) {

  var fullUrl = tableName + '?ids=' + id;
  AXIOS_INSTANCE.delete(fullUrl).then((response) => {

    componentFunction(id, tableName);

  })

};

/*

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

*/