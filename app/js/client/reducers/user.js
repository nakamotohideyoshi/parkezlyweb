import { combineReducers } from 'redux';

const initialState = {
	mode: null,
	userId: null,
	sessionId: null,
	sessionToken: null,
	errorCode: null,
	errorMessage: null,
	subErrorMessage: null
};

const User = (state = initialState, action) => {
	console.log(action);
	switch(action.type) {
		case "AUTH_INITIATE":
			return {
				mode: "LOGIN",
				loading: true
			}
		case "AUTH_SUCCESS":
			return {
				mode: "LOGIN",
				loading : false,
				...action.data
			};
		case "AUTH_FAIL":
			return {
				mode: "LOGIN",
				loading : false,
				...action.error
			}
		case "REG_INITIATE":
			return {
				mode: "REGISTER",
				loading: true
			}
		case "REG_SUCCESS":
			return {
				mode: "REGISTER",
				loading : false,
				userId: action.data
			};
		case "REG_FAIL":
			return {
				mode: "REGISTER",
				loading : false,
				...action.error
			}
		default:
			return state;
	}
};

const UserReducers = combineReducers({
	User
});

export default UserReducers;