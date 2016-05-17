export default function townshipTest(state = null, action) {
  switch(action.type) {
    case 'TEST_TOWNSHIP_DETAILS':
      return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
    default:
      return state;
  }
};
