import * as types from '../constants/actionTypes.js'

const initialState = {
  isLoading: true,
  data: [],
  error: false
};

export function inspectorParkingFieldFetched(state = initialState, action) {
  switch(action.type) {
    case types.INSPECTOR_PARKING_FIELD_GET_ERROR:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.INSPECTOR_PARKING_FIELD_GET_SUCCESS:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.INSPECTOR_PARKING_FIELD_GET_REQ:
      return Object.assign({}, state, {isLoading: true, error: false });
    default:
      return state;
  }
};

export function inspectorParkingFieldEdited(state = initialState, action) {
  switch(action.type) {
    case types.INSPECTOR_PARKING_FIELD_PUT_ERROR:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.INSPECTOR_PARKING_FIELD_PUT_SUCCESS:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.INSPECTOR_PARKING_FIELD_PUT_REQ:
      return Object.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}

export function inspectorParkingFieldCreated(state = initialState, action) {
  switch(action.type) {
    case types.INSPECTOR_PARKING_FIELD_POST_ERROR:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.INSPECTOR_PARKING_FIELD_POST_SUCCESS:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.INSPECTOR_PARKING_FIELD_POST_REQ:
      return Object.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}

export function inspectorPlateFetched(state = initialState, action) {
  switch(action.type) {
    case types.INSPECTOR_PLATE_GET_ERROR:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.INSPECTOR_PLATE_GET_SUCCESS:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.INSPECTOR_PLATE_GET_REQ:
      return Object.assign({}, state, {isLoading: true, error: false });
    default:
      return state;
  }
};

export function inspectorPlateEdited(state = initialState, action) {
  switch(action.type) {
    case types.INSPECTOR_PLATE_PUT_ERROR:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.INSPECTOR_PLATE_PUT_SUCCESS:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.INSPECTOR_PLATE_PUT_REQ:
      return Object.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}

export function inspectorPlateCreated(state = initialState, action) {
  switch(action.type) {
    case types.INSPECTOR_PLATE_POST_ERROR:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.INSPECTOR_PLATE_POST_SUCCESS:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.INSPECTOR_PLATE_POST_REQ:
      return Object.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}


export function inspectorTicketFetched(state = initialState, action) {
  switch(action.type) {
    case types.INSPECTOR_TICKET_GET_ERROR:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.INSPECTOR_TICKET_GET_SUCCESS:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.INSPECTOR_TICKET_GET_REQ:
      return Object.assign({}, state, {isLoading: true, error: false });
    default:
      return state;
  }
};

export function inspectorTicketEdited(state = initialState, action) {
  switch(action.type) {
    case types.INSPECTOR_TICKET_PUT_ERROR:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.INSPECTOR_TICKET_PUT_SUCCESS:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.INSPECTOR_TICKET_PUT_REQ:
      return Object.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}

export function inspectorTicketCreated(state = initialState, action) {
  switch(action.type) {
    case types.INSPECTOR_TICKET_POST_ERROR:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
    case types.INSPECTOR_TICKET_POST_SUCCESS:
      return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
    case types.INSPECTOR_TICKET_POST_REQ:
      return Object.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}
