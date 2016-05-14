import * as types from '../constants/actionTypes.js';

const initialState = {
  isLoading: true,
  data: [],
  error: false
};

export default function uploadedImage(state = initialState, action) {
  switch(action.type) {
    case types.UPLOAD_TOWNSHIP_IMAGE_ERROR:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.UPLOAD_TOWNSHIP_IMAGE_SUCCESS:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.UPLOAD_TOWNSHIP_IMAGE_REQ:
      return Object.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}