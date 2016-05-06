export default function townshipCreate(state = [], action) {
    switch(action.type) {
    case 'SEND_TOWNSHIP_DETAILS':
      return action.payload;
    }
    return state;
}