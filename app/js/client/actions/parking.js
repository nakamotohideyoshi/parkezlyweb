import * as ParkingAPI from "../api/parking.js"
import * as Actions from "../constants/actions.js";
import { GenericError } from "../constants/texts.js";


const initiateParkingFetch = () => {
  return {
    type: Actions.FETCH_PARKING_INITIATE
  };
};

const receivedNearbyParking = (data) => {
  return {
    type: Actions.FETCH_PARKING_SUCCESS,
    data
  };
};

const fetchNearbyParkingFailed = (error) => {
  return {
    type: Actions.FETCH_PARKING_FAIL,
    error
  };
};

export const getNearbyParking = (position) => {
  return dispatch => {
    dispatch(initiateParkingFetch());
    return ParkingAPI.getNearByParking(position)
      .then((response) => {
        dispatch(receivedNearbyParking(response.data));
      })
      .catch((response) => {
        dispatch(fetchNearbyParkingFailed(response));
      });
  };
};

export const updateGeolocation = (position) => {
  return {
    type: Actions.UPDATE_GEOLOCATION,
    position
  };
};

const toggleFreeParking = (val) => {
  return {
    type: Actions.TOGGLE_FREE_PARKING,
    val
  };
};

const togglePaidParking = (val) => {
  return {
    type: Actions.TOGGLE_PAID_PARKING,
    val
  };
};

const toggleManagedParking = (val) => {
  return {
    type: Actions.TOGGLE_MANAGED_PARKING,
    val
  };
};

export const setParkingType = (type, val) => {
  return dispatch => {
    switch (type) {
      case "free":
        dispatch(toggleFreeParking(val));
        break;
      case "paid":
        dispatch(togglePaidParking(val));
        break;
      case "managed":
        dispatch(toggleManagedParking(val));
        break;
    }
  }
};

export const setParkingOptions = (status) => {
  return {
    type: Actions.SET_PARKING_OPTIONS,
    status
  };
};

export const setOtherLocations = (status) => {
  return {
    type: Actions.SET_OTHER_LOCATIONS,
    status
  };
};