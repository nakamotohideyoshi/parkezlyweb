import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import townshipListFetched from './reducer-township-list.js'
import townshipCreate from './reducer-township-create.js'
import townshipListEdited from './reducer-township-edit.js';
import townshipDetails from './reducer-township-details.js';
import uploadedImage from './reducer-image-upload.js';

const rootReducer = combineReducers({
  townshipListFetched: townshipListFetched,
  townshipCreate: townshipCreate,
  townshipListEdited: townshipListEdited,
  townshipDetails: townshipDetails,
  uploadedImage: uploadedImage,
  form: formReducer
});

export default rootReducer;