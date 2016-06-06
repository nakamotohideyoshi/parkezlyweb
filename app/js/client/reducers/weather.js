import { combineReducers } from 'redux';

const initialState = {
  loading: false,
  weatherData: [],
  errorMessage: ""
};

const Weather = (state = initialState, action) => {
  switch(action.type) {
    case "FETCH_TRANSACTION_INITIATE":
      return {
        ...state,
        loading: true
      }
    case "FETCH_TRANSACTION_SUCCESS":
      return {
        ...state,
        loading : false,
        transactionsList: action.data
      };
    case "FETCH_TRANSACTION_FAIL":
      return {
        ...state,
        loading : false,
        errorMessage: action.errorMessage
      }
    case "SET_ADDING_FUNDS":
      return {
        ...state,
        loading: action.status
      }
    default:
      return state;
  }
};

const WeatherReducers = combineReducers({
  Weather
});

export default WeatherReducers;