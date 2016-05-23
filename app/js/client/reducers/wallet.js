import { combineReducers } from 'redux';

const initialState = {
  loading: false,
  transactionsList: [],
  errorMessage: ""
};

const Wallet = (state = initialState, action) => {
  console.log(action);
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
    default:
      return state;
  }
};

const WalletReducers = combineReducers({
  Wallet
});

export default WalletReducers;