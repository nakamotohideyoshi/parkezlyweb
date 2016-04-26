import React, { Component, PropTypes } from "react";
import Body from "../common/body/body.jsx"

class SignIn extends Component {
  constructor(props) {
    super(props);
  }

  renderForgotPasswordLink() {
    return (
      <div>
        <a href="#">Forgot Your Password?</a>
      </div>
    );
  }

  renderButtons() {
    return (
      <div>
        <a href="#" className="btn">REGISTER</a>
        <a href="#" className="btn">LOGIN</a>
      </div>
    );
  }

  renderSignInForm() {
    const forgotLink = this.renderForgotPasswordLink();
    const btns = this.renderButtons();
    return (
      <div className="sign-in-form">
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
        {forgotLink}
        {btns}
      </div>
    );
  }

  render() {
    const signInForm = this.renderSignInForm();
    return (
      <Body showHeader={true}>
        {signInForm}
      </Body>
    );
  }
}

export default SignIn;
