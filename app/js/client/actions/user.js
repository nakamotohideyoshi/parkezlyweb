import * as AuthAPI from "../api/user.js"
import * as Actions from "../constants/actions.js";
import { GenericError } from "../constants/texts.js";

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
        const data = response.data;
        dispatch(userAuthenticated({
          userId: data.id,
          sessionId: data.session_id,
          sessionToken: data.session_token
        }));
      })
      .catch((response) => {
        let errorCode = "503";
        let errorMessage = GenericError;
        let subErrorMessage = "";
        if (response && response.data) {
          const { error } = response.data;
          if (error) {
            const { error } = data;
            errorCode = error.code;
            errorMessage = error.message;
          }
        }
        dispatch(authenticationFailed({
          errorCode: errorCode,
          errorMessage: errorMessage
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

export const completeRegistration = (userInfo) => {
  return dispatch => {
    dispatch(initiateRegistration());
    return AuthAPI.registerUser(userInfo)
      .then((response) => {
        const userId = response.data.resource[0].id;
        dispatch(registrationSucceded(userId));
      })
      .catch((response) => {
        dispatch(registrationFailed());
      });
  }
};

const saveUserInfo = (userInfo) => {
  return {
    type: Actions.SAVE_USER_INFO,
    userInfo
  };
};

export const checkUser = (userInfo) => {
  return dispatch => {
    dispatch(initiateRegistration());
    return AuthAPI.checkUser(userInfo)
      .then((response) => {
        //dispatch(registerUser(userInfo));
        dispatch(saveUserInfo(userInfo));
      })
      .catch((response) => {
        let errorCode = "503";
        let errorMessage = GenericError;
        let subErrorMessage = "";
        if (response && response.data) {
          const { error } = response.data;
          if (error) {
            errorCode = error.code;
            errorMessage = error.message;
            subErrorMessage += error.context.email ?  error.context.email[0] : "";
            subErrorMessage += error.context.password ? error.context.password[0] : "";
          }
        }
        
        dispatch(registrationFailed({
          errorCode: errorCode,
          errorMessage: errorMessage,
          subErrorMessage: subErrorMessage
        }));
      });
  }
};

export const registerValidationFail = (status) => {
  return {
    type: Actions.REGISTER_VALIDATION_FAILED,
    status
  };
};