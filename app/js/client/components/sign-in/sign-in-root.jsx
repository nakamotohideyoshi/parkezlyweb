import React, { Component, PropTypes } from "react";
import Body from "../../common/components/body/body.jsx"

class SignIn extends Component {
  constructor(props) {
    super(props);
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
        <div className="col-xs-6">
          <a href="#" className="btn">REGISTER</a>
        </div>
        <div className="col-xs-6">
          <a href="#" className="btn">LOGIN</a>
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
          <div>
            <input
              type="email"
              ref="email-address"
              className="form-control"
              placeholder="EMAIL ADDRESS"/>
          </div>
          <div>
            <input
              type="password"
              ref="password"
              className="form-control"
              placeholder="PASSWORD"/>
          </div>
        </form>
      </div>
    );
  }

  renderSignInContent() {
    const signInForm = this.renderSignInForm();
    const forgotLink = this.renderForgotPasswordLink();
    const btns = this.renderButtons();
    const skipLink = this.renderSkipLink();
    return (
      <div className="sign-in-content">
        {signInForm}
        {forgotLink}
        {btns}
        {skipLink}
      </div>
    );
  }

  render() {
    const signInForm = this.renderSignInContent();
    return (
      <Body showHeader={true}>
        <div className="sign-in-root">
          {signInForm}
        </div>
      </Body>
    );
  }
}

export default SignIn;
