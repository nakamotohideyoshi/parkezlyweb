import { combineReducers } from 'redux';

const initialState = {
  loading: false,
  lat: 40.7128,
  lng: -73.935242,
  markers: [],
  free : true,
  paid : true,
  managed : true
};

const Parking = (state = initialState, action) => {
  switch(action.type) {
    case "UPDATE_GEOLOCATION":
      return {
        ...state,
        lat: action.position.lat,
        lng: action.position.lng
      }
    case "FETCH_PARKING_INITIATE":
      return {
        ...state,
        loading : true
      };
    case "FETCH_PARKING_SUCCESS":
      return {
        ...state,
        loading : false,
        markers: action.data
      }
    case "FETCH_PARKING_FAIL":
      return {
        ...state,
        loading: false
      }
    case "TOGGLE_FREE_PARKING":
      return {
        ...state,
        free: action.val
      }
    case "TOGGLE_PAID_PARKING":
      return {
        ...state,
        paid: action.val
      }
    case "TOGGLE_MANAGED_PARKING":
      return {
        ...state,
        managed: action.val
      }
    default:
      return state;
  }
};

const ParkingReducers = combineReducers({
  Parking
});

export default ParkingReducers;