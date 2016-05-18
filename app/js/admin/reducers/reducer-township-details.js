const initialState = {
  resetDetails: false,
  data: null,
  error: false
};

export default function townshipDetails(state = initialState, action) {
    switch(action.type) {
    case 'SEND_TOWNSHIP_DETAILS':
      return Object.assign({}, state, {resetDetails: false, data: action.data, error: false});
    default:
      return state;
    }
}