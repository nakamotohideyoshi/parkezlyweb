export default function townshipDetails(state = null, action) {
    switch(action.type) {
    case 'SEND_TOWNSHIP_DETAILS':
      return action.payload;
    }
    return state;
}