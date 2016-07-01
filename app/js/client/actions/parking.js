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

export const setSelectedMarker = (marker) => {
  return {
    type: Actions.SET_SELECTED_MARKER,
    marker
  };
};

export const setSelectedLocation = (location) => {
  return {
    type: Actions.SET_SELECTED_LOCATION,
    location
  }
}

const receivedParkingRules = (data) => {
  console.log(data);
  return {
    type: Actions.FETCH_PARKING_RULES_SUCCESS,
    data
  };
};

const fetchParkingRulesFailed = (error) => {
  return {
    type: Actions.FETCH_PARKING_RULES_FAIL,
    error
  };
};

export const getParkingRules = (city) => {
  return dispatch => {
    return ParkingAPI.getParkingRules(city)
      .then((response) => {
        const respArr = response.data.resource;
        const formattedArr = {};
        for (var i = 0; i < respArr.length; i++ ) {
          if(respArr[i].location_code) {
            formattedArr[respArr[i].location_code] = respArr[i];
          }
        }
        dispatch(receivedParkingRules(formattedArr));
      })
      .catch((response) => {
        dispatch(fetchParkingRulesFailed(response));
      });
  };
};

const showFreeParkingModal = (markerItem) => {
  return {
    type: Actions.SHOW_FREE_PARKING,
    markerItem
  };
};

const showPaidParkingModal = (markerItem) => {
  return {
    type: Actions.SHOW_PAID_PARKING,
    markerItem
  };
};

const showManagedParkingModal = (markerItem) => {
  return {
    type: Actions.SHOW_MANAGED_PARKING,
    markerItem
  };
};

export const setSelectedParking = (parkingType, markerItem) => {
  return dispatch => {
    switch (parkingType) {
      case "FREE":
        dispatch(showFreeParkingModal(markerItem));
        break;
      case "PAID":
        dispatch(showPaidParkingModal(markerItem));
        break;
      case "MANAGED":
        dispatch(showManagedParkingModal(markerItem));
        break;
    }
  }
};

export const hideSelectedParking = () => {
  return {
    type: Actions.HIDE_SELECTED_PARKING
  }
}

const initiateParkingLotFetch = () => {
  return {
    type: Actions.FETCH_PARKING_LOT_INITIATE
  };
};

const receivedParkingLot = (data) => {
  return {
    type: Actions.FETCH_PARKING_LOT_SUCCESS,
    data
  };
};

const fetchNearParkingLotFailed = (error) => {
  return {
    type: Actions.FETCH_PARKING_LOT_FAIL,
    error
  };
};

export const getParkingLot = (locationCode) => {
  return dispatch => {
    dispatch(initiateParkingLotFetch());
    return ParkingAPI.getParkingLot(locationCode)
      .then((response) => {
        dispatch(receivedParkingLot(response.data));
      })
      .catch((response) => {
        dispatch(fetchNearParkingLotFailed(response));
      });
  };
};

export const selectParking = (locationCode) => {
  return {
    type: Actions.SELECT_PARKING,
    location: locationCode
  };
};