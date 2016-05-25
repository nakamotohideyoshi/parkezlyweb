import * as LocationAPI from "../api/locations.js"
import * as Actions from "../constants/actions.js";

const initiateLocationFetch = () => {
  return {
    type: Actions.FETCH_LOCATION_INITIATE
  };
};

const receivedLocations = (data) => {
  return {
    type: Actions.FETCH_LOCATION_SUCCESS,
    data
  };
};

const fetchLocationsFailed = (error) => {
  return {
    type: Actions.FETCH_LOCATION_FAIL,
    error
  };
};

export const getLocations = (position) => {
  return dispatch => {
    dispatch(initiateLocationFetch());
    return LocationAPI.getLocations(position)
      .then((response) => {
        console.log(response);
        dispatch(receivedLocations(response.data.resource));
      })
      .catch((response) => {
        console.log(response);
        dispatch(fetchLocationsFailed(response));
      });
  };
};
