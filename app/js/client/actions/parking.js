import * as ParkingAPI from "../api/parking.js";
import { getWalletBalance, makePayment } from "../api/wallet.js";
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

export const setSelectedPlate = (plate) => {
  return {
    type: Actions.SET_SELECTED_PLATE,
    plate
  };
};

export const setBookingStep = (step) => {
  return {
    type: Actions.SET_BOOKING_STEP,
    step
  };
};

const initiateBooking = () => {
  return {
    type: Actions.MAKE_BOOKING
  };
};

const poivRequest = (poivData) => {
  return dispatch => {
    return ParkingAPI.makePoivRequest(poivData)
      .then((response) => {
        dispatch(setBookingStep(4));
      })
      .catch((response) => {
        //dispatch(fetchNearParkingLotFailed(response));
      });
  };
};

export const createBooking = (wayPointData, poivData) => {
  return dispatch => {
    dispatch(initiateBooking());
    return ParkingAPI.parkingWayPointUpdate(wayPointData)
      .then((response) => {
        dispatch(poivRequest(poivData));
      })
      .catch((response) => {
        //dispatch(fetchNearParkingLotFailed(response));
      });
  };
};

const initiateGetCharges = () => {
  return {
    type: Actions.INITIATE_GET_CHARGES
  };
};

const fetchChargesSuccess = (townshipCharges) => {
  return {
    type: Actions.FETCH_CHARGES_SUCCESS,
    townshipCharges
  };
};

const fetchChargesFailed = (error) => {
  return {
    type: Actions.FETCH_CHARGES_FAIL,
    error
  };
};

const getCharges = (townshipCode) => {
  return dispatch => {
    return ParkingAPI.getExtraFees(townshipCode)
      .then((response) => {
        console.log(response);
        const { data } = response;
        dispatch(fetchChargesSuccess(data.resource[0]));
      })
      .catch((response) => {
        dispatch(fetchChargesFailed());
      });
  };
};

export const getTownship = (locationCode) => {
  return dispatch => {
    dispatch(initiateGetCharges());
    return ParkingAPI.getTownshipCode(locationCode)
      .then((response) => {
        console.log(response);
        const { data } = response;
        dispatch(getCharges(data.resource[0].township_code));
      })
      .catch((response) => {
        dispatch(fetchChargesFailed());
      });
  };
};

export const setSelectedHours = (hours) => {
  return {
    type: Actions.SET_SELECTED_HOURS,
    hours
  };
};

const initiateGetWalletBalance = () => {
  return {
    type: Actions.INITIATE_GET_BALANCE
  };
};

const updateWalletBalance = (currentBal) => {
  return {
    type: Actions.SET_CURRENT_BALANCE,
    currentBal
  };
};

export const getBalance = (user_id) => {
  return dispatch => {
    dispatch(initiateGetWalletBalance());
    return getWalletBalance(user_id)
      .then((response) => {
        const { data } = response;
        dispatch(updateWalletBalance(data.resource[0].new_balance));
      })
      .catch((response) => {
        //dispatch(fetchChargesFailed());
      });
  };
};

export const setPriceToPay = (price) => {
  return {
    type: Actions.SET_PRICE_TO_PAY,
    price
  };
};

const initiatePaymentWithWallet = () => {
  return {
    type: Actions.INITIATE_PAYMENT_WITH_WALLET
  };
};

const ppPoivRequest = (poivData) => {
  return dispatch => {
    return ParkingAPI.makePoivRequest(poivData)
      .then((response) => {
        dispatch(setBookingStep(4));
      })
      .catch((response) => {
        //dispatch(fetchNearParkingLotFailed(response));
      });
  };
};

const ppWaypointUpdate = (waypointData, poivData) => {
  return dispatch => {
    return ParkingAPI.parkingWayPointUpdate(waypointData)
      .then((response) => {
        dispatch(ppPoivRequest(poivData));
      })
      .catch((response) => {
        //dispatch(fetchNearParkingLotFailed(response));
      });
  };
}

export const chargeWallet = (paymentObj, waypointData, poivData) => {
  return dispatch => {
    dispatch(initiatePaymentWithWallet());
    return makePayment(paymentObj)
      .then((response) => {
        dispatch(ppWaypointUpdate(waypointData, poivData));
      })
      .catch((response) => {
        //dispatch(fetchChargesFailed());
      });
  };
};
