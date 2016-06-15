const initialState = {
  lat: null,
  lon: null
};

const Location = (state = initialState, action) => {
  console.log(action);
  switch(action.type) {
    case "SET_CURRENT_LOCATION":
      return {
        lat: action.location.lat,
        lon: action.location.lon
      }
    default:
      return state;
  }
};

export default Location;