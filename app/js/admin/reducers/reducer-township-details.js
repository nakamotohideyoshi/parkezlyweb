const initialState = {
  resetDetails: false,
  data: null,
  error: false
};

export default function townshipDetails(state = initialState, action) {
    switch(action.type) {
    case 'SEND_TOWNSHIP_DETAILS':
      console.log("Here we go")
      console.log(action.data);
      return Object.assign({}, state, {resetDetails: false, data: action.data, error: false});
    case 'RESET_TOWNSHIP_DETAILS':
      return Object.assign({}, state, {resetDetails: true, data: action.data, error: false});
    default:
      return state;
    }
}