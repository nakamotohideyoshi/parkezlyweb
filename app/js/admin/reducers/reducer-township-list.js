import * as types from '../constants/actionTypes.js'

const initialState = {
  isLoading: true,
  data: [],
  error: false
};

export function townshipListFetched(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_FETCH_GET_ERROR:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_FETCH_GET_SUCCESS:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_FETCH_GET_REQ:
      return Object.assign({}, state, {isLoading: true, error: false });
    default:
      return state;
  }
};

export function townshipListEdited(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_EDIT_PUT_ERROR:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_EDIT_PUT_SUCCESS:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_EDIT_PUT_REQ:
      return Object.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}

export function townshipCreate(state = initialState, action) {
  switch(action.type) {
    case types.TOWNSHIP_CREATE_POST_ERROR:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.TOWNSHIP_CREATE_POST_SUCCESS:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.TOWNSHIP_CREATE_POST_REQ:
      return Object.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}


export function townshipDetailsFetched(state = initialState, action) {
  switch(action.type) {
    case types.DETAILS_FETCH_GET_ERROR:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.DETAILS_FETCH_GET_SUCCESS:
      console.log("TEST");
      return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.DETAILS_FETCH_GET_REQ:
      console.log("TEST");
      return Object.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}

export function uploadedImage(state = initialState, action) {
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

const initialStateDetails = {
  resetDetails: false,
  data: null,
  error: false
};

export function townshipDetails(state = initialStateDetails, action) {
    switch(action.type) {
    case 'SEND_TOWNSHIP_DETAILS':
      return Object.assign({}, state, {resetDetails: false, data: action.data, error: false});
    default:
      return state;
    }
}
