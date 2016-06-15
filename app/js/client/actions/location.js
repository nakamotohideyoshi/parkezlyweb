import { SET_CURRENT_LOCATION } from "../constants/actions.js";;

export const setPosition = (lat, lon) => {
  return {
    type: SET_CURRENT_LOCATION,
    location: {
      lat: lat,
      lon: lon
    }
  };
};
