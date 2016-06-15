import { combineReducers } from 'redux';
import Location from "./location.js";

const initialState = {
  loading: false,
  markers: [],
  free : true,
  paid : true,
  managed : true
};

const Parking = (state = initialState, action) => {
  console.log(action);
  switch(action.type) {
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
  parking: Parking,
  location: Location
});

export default ParkingReducers;