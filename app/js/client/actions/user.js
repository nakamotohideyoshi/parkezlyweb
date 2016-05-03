import { createAction } from "redux-actions";
import * as AuthAPI from "../api/user.js"
import * as Actions from "../constants/actions.js";

//export const getUser = createAction(Actions.RECEIVE_USER, AuthAPI.authenticateUser);
//export const registerUser = createAction(Actions.REGISTER_USER, AuthAPI.registerUser);
//export const signOutUser = createAction(Actions.USER_SIGNOUT, AuthAPI.signOutUser);
const initiateSignIn = () => {
	return {
		type: Actions.AUTH_INITIATE
	};
};

const userAuthenticated = (data) => {
	return {
		type: Actions.AUTH_SUCCESS,
		data
	};
};


const authenticationFailed = (error) => {
	return {
		type: Actions.AUTH_FAIL,
		error
	};
};

export const getUser = (userInfo) => {
	return dispatch => {
		dispatch(initiateSignIn());
		return AuthAPI.authenticateUser(userInfo)
			.then((response) => {
				dispatch(userAuthenticated({
					userId: response.id,
					sessionId: response.session_id,
					sessionToken: response.session_token
				}));
	  	})
	  	.catch((response) => {
	  		console.log(response);
	  		dispatch(authenticationFailed({
	  			errorCode: response.data.error.code,
	  			errorMessage: response.data.error.message
	  		}));
	  	});
	}
};

const initiateRegistration = () => {
	return {
		type: Actions.REG_INITIATE
	};
};

const registrationSucceded = (data) => {
	return {
		type: Actions.REG_SUCCESS,
		data
	};
};

const registrationFailed = (error) => {
	return {
		type: Actions.REG_FAIL,
		error
	};
};

const registerUser = (userInfo) => {
	return dispatch => {
		dispatch(initiateRegistration());
		return AuthAPI.registerUser(userInfo)
			.then((response) => {
				const userId = response.data.resource[0].id;
				console.log(userId);
				dispatch(registrationSucceded(userId));
	  	})
	  	.catch((response) => {
	  		dispatch(registrationFailed());
	  	});
	}
};

export const checkUser = (userInfo) => {
	return dispatch => {
		dispatch(initiateRegistration());
		return AuthAPI.checkUser(userInfo)
			.then((response) => {
				dispatch(registerUser(userInfo));
	  	})
	  	.catch((response) => {
	  		const { error } = response.data;
	  		dispatch(registrationFailed({
	  			errorCode: error.code,
	  			errorMessage: error.message,
	  			subErrorMessage: error.context.email[0]
	  		}));
	  	});
	}
}