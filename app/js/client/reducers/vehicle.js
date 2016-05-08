import { combineReducers } from 'redux';

const initialState = {
  plateId: null,
  vehicleList: [],
  errorCode: null,
  errorMessage: null,
  subErrorMessage: null
};

const Vehicle = (state = {}, action) => {
  console.log(action);
  switch(action.type) {
    case "PLATE_ADDITION_INITIATE":
      return {
        loading: true
      }
    case "PLATE_ADDITION_SUCCESS":
      return {
        loading: false,
        ...action.data
      };
    case "PLATE_ADDITION_FAIL":
      return {
        loading: false,
        ...action.error
      }
    case "FETCH_VEHICLES_INITIATE":
      return {
        loading: true
      }
    case "FETCH_VEHICLES_SUCCESS":
      return {
        loading: false,
        vehicleList: action.data
      }
    case "FETCH_VEHICLES_FAIL":
      return {
        loading: false,
        ...action.error
      }
    default:
      return state;
  }
};

const VehicleReducers = combineReducers({
  Vehicle
});

export default VehicleReducers;