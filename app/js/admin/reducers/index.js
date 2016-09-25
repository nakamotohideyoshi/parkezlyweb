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
  townshipPermitRequestsEdited,

  townshipParkingPermitsFetched,
  townshipParkingPermitsCreated,

  townshipPermitsListFetched,
  townshipPermitsListEdited,
  townshipPermitsListCreated,

  townshipLocationsRateFetched,
  townshipLocationsRateEdited,
  townshipLocationsRateCreated,

  townshipPermitTypesFetched,
  townshipPermitTypesEdited,
  townshipPermitTypesCreated,

  townshipViolationCodeFetched,
  townshipViolationCodeEdited,
  townshipViolationCodeCreated,

  townshipHearingPlaceFetched,
  townshipHearingPlaceEdited,
  townshipHearingPlaceCreated,

  townshipParkingRulesFetched,
  townshipParkingRulesEdited,
  townshipParkingRulesCreated
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

import {
  inspectorParkingFieldCreated,
  inspectorParkingFieldFetched,
  inspectorParkingFieldEdited,

  inspectorPlateCreated,
  inspectorPlateFetched,
  inspectorPlateEdited,

  inspectorTicketCreated,
  inspectorTicketFetched,
  inspectorTicketEdited,
} from './reducer-inspector-panel.js';

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
  townshipPermitTypesCreated: townshipPermitTypesCreated,
  townshipPermitTypesEdited: townshipPermitTypesEdited,

  townshipParkingPermitsFetched: townshipParkingPermitsFetched,
  townshipParkingPermitsCreated: townshipParkingPermitsCreated,

  townshipPermitsListFetched: townshipPermitsListFetched,
  townshipPermitsListEdited: townshipPermitsListEdited,
  townshipPermitsListCreated: townshipPermitsListCreated,

  townshipLocationsRateFetched: townshipLocationsRateFetched,
  townshipLocationsRateEdited: townshipLocationsRateEdited,
  townshipLocationsRateCreated: townshipLocationsRateCreated,

  townshipViolationCodeFetched: townshipViolationCodeFetched,
  townshipViolationCodeEdited: townshipViolationCodeEdited,
  townshipViolationCodeCreated: townshipViolationCodeCreated,

  townshipHearingPlaceFetched: townshipHearingPlaceFetched,
  townshipHearingPlaceEdited: townshipHearingPlaceEdited,
  townshipHearingPlaceCreated: townshipHearingPlaceCreated,

  townshipParkingRulesFetched: townshipParkingRulesFetched,
  townshipParkingRulesEdited: townshipParkingRulesEdited,
  townshipParkingRulesCreated: townshipParkingRulesCreated,
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

var inspectorPanelReducers = {
  inspectorParkingFieldCreated: inspectorParkingFieldCreated,
  inspectorParkingFieldFetched: inspectorParkingFieldFetched,
  inspectorParkingFieldEdited: inspectorParkingFieldEdited,

  inspectorPlateCreated: inspectorPlateCreated,
  inspectorPlateFetched: inspectorPlateFetched,
  inspectorPlateEdited: inspectorPlateEdited,

  inspectorTicketCreated: inspectorTicketCreated,
  inspectorTicketFetched: inspectorTicketFetched,
  inspectorTicketEdited: inspectorTicketEdited,
}

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
  inspectorPanelReducers,
  reduxFormReducer
);

const rootReducer = combineReducers(combinedReducerObjects);

export default rootReducer;