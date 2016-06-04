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

  townshipPermitsListFetched,
  townshipPermitsListCreated,

  townshipLocationsRateFetched,
  townshipPermitTypesCreated,
} from './reducer-township-panel.js';

const rootReducer = combineReducers({
  townshipListFetched: townshipListFetched,
  townshipCreate: townshipCreate,
  townshipListEdited: townshipListEdited,
  townshipDetails: townshipDetails,
  townshipDetailsFetched: townshipDetailsFetched,
  uploadedImage: uploadedImage,

  townshipUsersFetched: townshipUsersFetched,
  townshipUsersEdited: townshipUsersEdited,
  townshipUsersCreated: townshipUsersCreated,

  townshipFacilitiesFetched: townshipFacilitiesFetched,
  townshipFacilitiesEdited: townshipFacilitiesEdited,
  townshipFacilitiesCreated: townshipFacilitiesCreated,

  townshipPermitRequestsFetched: townshipPermitRequestsFetched,
  townshipPermitTypesFetched: townshipPermitTypesFetched,
  townshipParkingPermitsFetched: townshipParkingPermitsFetched,

  townshipPermitsListFetched: townshipPermitsListFetched,
  townshipPermitsListCreated: townshipPermitsListCreated,

  townshipLocationsRateFetched: townshipLocationsRateFetched,
  townshipPermitTypesCreated: townshipPermitTypesCreated,

  form: formReducer
});

export default rootReducer;