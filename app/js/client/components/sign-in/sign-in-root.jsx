import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import cookie from 'react-cookie';

import Body from "../../../common/components/body/body.jsx";
import GrayButton from "../../../common/components/button/gray-button.jsx";
import EmailField from "../../../common/components/fields/email-field.jsx";
import PasswordField from "../../../common/components/fields/password-field.jsx";
import { getUser, checkUser } from "../../actions/user.js";
import * as Texts from "./constants/texts.js";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.loginUser = this.loginUser.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    const { userId, sessionId, sessionToken } = nextProps.user;

    if(userId) {
      cookie.save('userId', userId, { path: '/' });
      cookie.save('sessionId', sessionId, { path: '/' });
      cookie.save('sessionToken', sessionToken, { path: '/' });
    }
  }

  validateUser() {
    this.refs["email-address"].invalidate();
    this.refs["user-password"].invalidate();
    const isEmailValid = this.refs["email-address"].validate();
    const isPasswordValid = this.refs["user-password"].validate();
    if (isEmailValid && isPasswordValid) {
      return true;
    }
  }

  loginUser() {
    const { dispatch } = this.props;
    if(this.validateUser()) {
      const email = this.refs["email-address"].getValue();
      const password = this.refs["user-password"].getValue();
      const userInfo = {
        email : email,
        password: password
      };
      dispatch(getUser(userInfo));
    }
  }

  registerUser() {
    const { dispatch } = this.props;
    if(this.validateUser()) {
      const email = this.refs["email-address"].getValue();
      const password = this.refs["user-password"].getValue();
      const userInfo = {
        email : email,
        password: password
      };
      dispatch(checkUser(userInfo));
    }
  }

  renderNotice() {
    const {
      mode,
      userId,
      errorCode,
      errorMessage,
      loading,
      subErrorMessage
    } = this.props.user;

    const validClassNames = classNames({
      "alert": true,
      "alert-info": loading,
      "alert-success": !!userId,
      "alert-danger": !!errorCode
    });
    let displayMsg = "";
    if(loading) {
      displayMsg = mode == "LOGIN" ? Texts.SigningIn : Texts.Registering;
    } else if(userId) {
      displayMsg = mode == "LOGIN" ? Texts.SignInSuccess : Texts.RegistrationSuccess;
    } else if(errorCode) {
      displayMsg = errorMessage;
      subErrorMessage ? displayMsg += " : " + subErrorMessage : null;
    }

    return displayMsg ? (
      <div className={validClassNames}>
        {displayMsg}
      </div>
    ) : null;
  }

  renderForgotPasswordLink() {
    return (
      <div className="forgot-password">
        <a href="#">Forgot Your Password?</a>
      </div>
    );
  }

  renderButtons() {
    return (
      <div className="row sign-in-actions">
        <div className="col s6">
          <GrayButton onClick={this.registerUser}>
            REGISTER
          </GrayButton>
        </div>
        <div className="col s6">
          <GrayButton onClick={this.loginUser}>
            LOGIN
          </GrayButton>
        </div>
      </div>
    );
  }

  renderSkipLink() {
    return (
      <div className="skip-link">
        <a href="#">SKIP THIS</a>
      </div>
    );
  }

  renderSignInForm() {
    return (
      <div>
        <h1 className="welcome">Welcome</h1>
        <form className="form-signin">
          <EmailField ref="email-address" placeholder="EMAIL ADDRESS"/>
          <PasswordField ref="user-password" placeholder="PASSWORD"/>
        </form>
      </div>
    );
  }

  renderSignInContent() {
    const notice = this.renderNotice();
    const signInForm = this.renderSignInForm();
    const forgotLink = this.renderForgotPasswordLink();
    const btns = this.renderButtons();
    const skipLink = this.renderSkipLink();
    return (
      <div className="sign-in-content">
        {notice}
        {signInForm}
        {forgotLink}
        {btns}
        {skipLink}
      </div>
    );
  }

  render() {
    const { loading } = this.props.user;
    const signInForm = this.renderSignInContent();
    return (
      <Body showHeader={true} loading={loading}>
        <div className="sign-in-root">
          {signInForm}
        </div>
        <div className="blur">
          <img src="//c5.staticflickr.com/6/5590/15029804212_0d5c15bc16_z.jpg" className="bg"/>
        </div>
      </Body>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    user: state.User
  };
};

export default connect(MapStateToProps)(SignIn);