import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import townshipListFetched from './reducer-township-list.js'
import townshipCreate from './reducer-township-create.js'
import townshipListEdited from './reducer-township-edit.js';
import townshipDetails from './reducer-township-details.js';
import uploadedImage from './reducer-image-upload.js';
import townshipDetailsFetched from './reducer-details-fetch.js'

import {
  townshipUsersFetched, 
  townshipUsersEdited, 
  townshipUsersCreated, 
  townshipFacilitiesFetched,
  townshipFacilitiesEdited,
  townshipFacilitiesCreated,
} from './reducer-township-users.js';

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

  form: formReducer
});

export default rootReducer;