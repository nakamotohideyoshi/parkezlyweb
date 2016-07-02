import { combineReducers } from 'redux';
import Location from "./location.js";
import Vehicle from "./vehicle.js";
import { GenericError } from "../constants/texts.js";

const initialState = {
  loading: false,
  markers: [],
  free: true,
  paid: true,
  managed: true,
  showParkingOptions: false,
  showOtherLocations: false,
  selectedMarker: null,
  selectedLocation: null,
  parkingRules: null,
  errorMessage: null,
  showFreeParkingModal: false,
  showPaidParkingModal: false,
  showManagedParkingModal: false,
  selectedMarkerItem: null,
  managedParkingLoading: false,
  lotsData: null,
  selectedParkingCode: null,
  bookingStep: 0,
  selectedPlate: null,
  error: null
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
    case "SET_PARKING_OPTIONS":
      return {
        ...state,
        showParkingOptions: action.status
      }
    case "SET_OTHER_LOCATIONS":
      return {
        ...state,
        showOtherLocations: action.status
      }
    case "SET_SELECTED_MARKER":
      return {
        ...state,
        selectedMarker: action.marker
      }
    case "SET_SELECTED_LOCATION":
      return {
        ...state,
        selectedLocation: action.location
      }
    case "FETCH_PARKING_RULES_SUCCESS":
      return {
        ...state,
        parkingRules: action.data
      }
    case "FETCH_PARKING_RULES_FAIL":
      return {
        ...state,
        errorMessage: GenericError
      }
    case "SHOW_FREE_PARKING":
      return {
        ...state,
        showFreeParkingModal: true,
        showPaidParkingModal: false,
        showManagedParkingModal: false,
        bookingStep: 1,
        selectedMarkerItem: action.markerItem
      }
    case "SHOW_PAID_PARKING":
      return {
        ...state,
        showFreeParkingModal: false,
        showPaidParkingModal: true,
        showManagedParkingModal: false,
        bookingStep: 1,
        selectedMarkerItem: action.markerItem
      }
    case "SHOW_MANAGED_PARKING":
      return {
        ...state,
        showFreeParkingModal: false,
        showPaidParkingModal: false,
        showManagedParkingModal: true,
        bookingStep: 1,
        selectedMarkerItem: action.markerItem
      }
    case "HIDE_SELECTED_PARKING":
      return {
        ...state,
        showFreeParkingModal: false,
        showPaidParkingModal: false,
        showManagedParkingModal: false,
        selectedParkingCode: null,
        selectedMarkerItem: null,
        bookingStep: 0,
        selectedPlate: null
      }
    case "FETCH_PARKING_LOT_INITIATE":
      return {
        ...state,
        managedParkingLoading : true
      };
    case "FETCH_PARKING_LOT_SUCCESS":
      return {
        ...state,
        managedParkingLoading : false,
        lotsData: action.data
      }
    case "FETCH_PARKING_LOT_FAIL":
      return {
        ...state,
        managedParkingLoading: false,
        error: action.error
      }
    case "SELECT_PARKING":
      return {
        ...state,
        selectedParkingCode: action.location,
        bookingStep: 2
      }
    case "SET_SELECTED_PLATE":
      return {
        ...state,
        selectedPlate: action.plate,
        bookingStep: 3
      }
    default:
      return state;
  }
};

const ParkingReducers = combineReducers({
  parking: Parking,
  location: Location,
  vehicle: Vehicle
});

export default ParkingReducers;