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

  townshipLocationsFetched,
  townshipLocationsEdited,
  townshipLocationsCreated,

  townshipPermitRequestsFetched,
  townshipPermitTypesFetched,

  townshipParkingPermitsFetched,
  townshipPermitRequestsEdited,
  
  townshipParkingPermitsCreated,

  townshipPermitsListFetched,
  townshipPermitsListCreated,

  townshipLocationsRateFetched,
  townshipLocationsRateCreated,

  townshipPermitTypesCreated,
} from './reducer-township-panel.js';

import {townshipSchemeTypesFetched} from './reducer-township-common.js';

import {
  bursarParkingPaymentCreated,
  bursarParkingPaymentFetched,
  bursarParkingPaymentEdited,

  bursarPermitPaymentCreated,
  bursarPermitPaymentEdited,
  bursarPermitPaymentFetched,

  bursarTicketPaymentCreated,
  bursarTicketPaymentEdited,
  bursarTicketPaymentFetched,

  bursarWalletPaymentCreated,
  bursarWalletPaymentEdited,
  bursarWalletPaymentFetched,

  bursarTicketRatesCreated,
  bursarTicketRatesEdited,
  bursarTicketRatesFetched,
} from './reducer-bursar-panel.js';

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

  townshipLocationsFetched: townshipLocationsFetched,
  townshipLocationsEdited: townshipLocationsEdited,
  townshipLocationsCreated: townshipLocationsCreated,

  townshipPermitRequestsFetched: townshipPermitRequestsFetched,
  townshipPermitRequestsEdited: townshipPermitRequestsEdited,

  townshipPermitTypesFetched: townshipPermitTypesFetched,

  townshipParkingPermitsFetched: townshipParkingPermitsFetched,
  townshipParkingPermitsCreated: townshipParkingPermitsCreated,

  townshipPermitsListFetched: townshipPermitsListFetched,
  townshipPermitsListCreated: townshipPermitsListCreated,

  townshipLocationsRateFetched: townshipLocationsRateFetched,
  townshipLocationsRateCreated: townshipLocationsRateCreated,
  
  townshipPermitTypesCreated: townshipPermitTypesCreated
};

var bursarPanelReducers = { 
  bursarParkingPaymentCreated: bursarParkingPaymentCreated,
  bursarParkingPaymentFetched: bursarParkingPaymentFetched,
  bursarParkingPaymentEdited: bursarParkingPaymentEdited,

  bursarPermitPaymentCreated: bursarPermitPaymentCreated,
  bursarPermitPaymentEdited: bursarPermitPaymentEdited,
  bursarPermitPaymentFetched: bursarPermitPaymentFetched,

  bursarTicketPaymentCreated: bursarTicketPaymentCreated,
  bursarTicketPaymentEdited: bursarTicketPaymentEdited,
  bursarTicketPaymentFetched: bursarTicketPaymentFetched,

  bursarWalletPaymentCreated: bursarWalletPaymentCreated,
  bursarWalletPaymentEdited: bursarWalletPaymentEdited,
  bursarWalletPaymentFetched: bursarWalletPaymentFetched,
  
  bursarTicketRatesCreated: bursarTicketRatesCreated,
  bursarTicketRatesEdited: bursarTicketRatesEdited,
  bursarTicketRatesFetched: bursarTicketRatesFetched,
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
  bursarPanelReducers,
  reduxFormReducer
);

const rootReducer = combineReducers(combinedReducerObjects);

export default rootReducer;