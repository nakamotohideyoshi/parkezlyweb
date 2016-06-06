import * as WeatherAPI from "../api/weather.js";
import {
  FETCH_WEATHER_INITIATE,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAIL
} from "../constants/actions.js";

const initiateWeatherFetch = () => {
  return {
    type: FETCH_WEATHER_INITIATE
  };
};

const receivedWeather = (data) => {
  return {
    type: FETCH_WEATHER_SUCCESS,
    data
  };
};

const fetchWeatherFailed = (error) => {
  return {
    type: FETCH_WEATHER_FAIL,
    error
  };
};

export const getWeather = (lat, lon) => {
  return dispatch => {
    dispatch(initiateWeatherFetch());
    return WeatherAPI.getWeather(lat, lon)
      .then((response) => {
        dispatch(receivedWeather(response.data.resource));
      })
      .catch((response) => {
        dispatch(fetchWeatherFailed(response));
      });
  };
};
