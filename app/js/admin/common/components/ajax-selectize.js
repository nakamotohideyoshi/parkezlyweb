import React from 'react';
import axios from 'axios';
import {reset} from 'redux-form';

import * as apiTownship from '../../api/api-township.js';
import {createFilter} from 'react-search-input';
import {API_CONFIG} from '../../config/api.js';

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

export const ajaxGet = function(tableName, componentFunction) {
  AXIOS_INSTANCE.get(tableName).then((response) => {
    componentFunction(response, tableName);
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