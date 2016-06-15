import { SET_CURRENT_LOCATION, SET_INITIAL_LOCATION } from "../constants/actions.js";

export const setPosition = (lat, lon) => {
  return {
    type: SET_CURRENT_LOCATION,
    location: {
      lat: lat,
      lon: lon
    }
  };
};

export const setInitialPosition = (lat, lon) => {
  return {
    type: SET_INITIAL_LOCATION,
    location: {
      lat: lat,
      lon: lon
    }
  };
};
