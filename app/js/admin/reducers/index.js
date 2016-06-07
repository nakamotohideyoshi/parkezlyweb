import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import {
  townshipListFetched, 
  townshipCreate, 
  townshipListEdited,
  townshipDetailsFetched, 
  uploadedImage,
  townshipDetails} from './reducer-township-list.js';

import {
  townshipUsersFetched, 
  townshipUsersEdited, 
  townshipUsersCreated, 
  townshipFacilitiesFetched,
  townshipFacilitiesEdited,
  townshipFacilitiesCreated,
  townshipPermitRequestsFetched,
  townshipPermitTypesFetched,

  townshipParkingPermitsFetched,
  townshipParkingPermitsCreated,

  townshipPermitsListFetched,
  townshipPermitsListCreated,

  townshipLocationsRateFetched,
  townshipPermitTypesCreated,
} from './reducer-township-panel.js';

import {townshipSchemeTypesFetched} from './reducer-township-common.js';

// Super Admin Panel

var townshipReducers = { 
  townshipListFetched: townshipListFetched,
  townshipCreate: townshipCreate,
  townshipListEdited: townshipListEdited,
  townshipDetails: townshipDetails,
  townshipDetailsFetched: townshipDetailsFetched,
  uploadedImage: uploadedImage,
};

// Township Panel

var townshipPanelReducers = { 
  townshipUsersFetched: townshipUsersFetched,
  townshipUsersEdited: townshipUsersEdited,
  townshipUsersCreated: townshipUsersCreated,

  townshipFacilitiesFetched: townshipFacilitiesFetched,
  townshipFacilitiesEdited: townshipFacilitiesEdited,
  townshipFacilitiesCreated: townshipFacilitiesCreated,

  townshipPermitRequestsFetched: townshipPermitRequestsFetched,
  townshipPermitTypesFetched: townshipPermitTypesFetched,

  townshipParkingPermitsFetched: townshipParkingPermitsFetched,
  townshipParkingPermitsCreated: townshipParkingPermitsCreated,

  townshipPermitsListFetched: townshipPermitsListFetched,
  townshipPermitsListCreated: townshipPermitsListCreated,

  townshipLocationsRateFetched: townshipLocationsRateFetched,
  townshipPermitTypesCreated: townshipPermitTypesCreated
};

// Common / Shared between township stuff.

var townshipCommonReducers = { 
  townshipSchemeTypesFetched: townshipSchemeTypesFetched
};

var reduxFormReducer = { 
  form: formReducer 
};

var combinedReducerObjects = Object.assign(
  townshipReducers, 
  townshipPanelReducers, 
  townshipCommonReducers,
  reduxFormReducer
);

const rootReducer = combineReducers(combinedReducerObjects);

export default rootReducer;