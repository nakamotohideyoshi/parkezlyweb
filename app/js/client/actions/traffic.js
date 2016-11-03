import * as PlacesAPI from "../api/traffic.js";
import {
  FETCH_PLACES_INITIATE,
  FETCH_PLACES_SUCCESS,
  FETCH_PLACES_FAIL,
  FETCH_LOCATION_DETAILS_INITIATE,
  FETCH_LOCATION_DETAILS_SUCCESS,
  FETCH_LOCATION_DETAILS_FAIL,
  SET_TRAFFIC_ORIGIN,
  SET_TRAFFIC_DESTINATION,
  SET_TRAFFIC_RESULT
} from "../constants/actions.js";

const initiatePlacesFetch = () => {
  return {
    type: FETCH_PLACES_INITIATE
  };
};

const receivedPlaces = (data) => {
  return {
    type: FETCH_PLACES_SUCCESS,
    data
  };
};

const fetchPlacesFailed = () => {
  return {
    type: FETCH_PLACES_FAIL
  };
};

export const getPlaces = (lat, lon) => {
  return dispatch => {
    dispatch(initiatePlacesFetch());
    return PlacesAPI.getPlaces(lat, lon)
      .then((response) => {
        const { status, data } = response;
        if (status == 200) {
          const { results } = data;
          dispatch(receivedPlaces(results));
        }
      })
      .catch((response) => {
        dispatch(fetchPlacesFailed());
      });
  };
};

const initiateLocationFetch = () => {
  return {
    type: FETCH_LOCATION_DETAILS_INITIATE
  };
};

const receivedLocation = (data) => {
  return {
    type: FETCH_LOCATION_DETAILS_SUCCESS,
    data
  };
};

const fetchLocationFailed = () => {
  return {
    type: FETCH_LOCATION_DETAILS_FAIL
  };
};

export const getLocationDetails = (lat, lon) => {
  return dispatch => {
    dispatch(initiateLocationFetch());
    return PlacesAPI.getLocationDetails(lat, lon)
      .then((response) => {
        const { status, data } = response;
        if ( status == 200 ) {
          dispatch(receivedLocation(data.results[0].formatted_address));
        }
      })
      .catch((response) => {
        dispatch(fetchLocationFailed());
      });
  };
};

export const setTrafficOrigin = (data) => {
  return {
    type: SET_TRAFFIC_ORIGIN,
    data
  }
}

export const setTrafficDestination = (data) => {
  return {
    type: SET_TRAFFIC_DESTINATION,
    data
  }
}

export const setTrafficResult = (data) => {
  return {
    type: SET_TRAFFIC_RESULT,
    data
  }
}