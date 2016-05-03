import React, { Component, PropTypes } from "react";
import classNames from "classnames";

import * as Texts from "../../constants/texts.js"

class PasswordField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorType: null
    };
  }

  getValue() {
    console.log(this.refs.password.value);
    return this.refs.password.value;
  }

  validate() {
    const password = this.getValue();

    if(!password) {
      this.setState({
        hasError: true,
        errorType: "EMPTY"
      });
      return;
    }
    return true;
  }

  invalidate() {
    this.setState({
      hasError: false,
      errorType: null
    });
  }

  render() {
    const { placeholder, className, ...otherProps } = this.props;
    const { hasError, errorType } = this.state;
    const parentClassNames = classNames({
      "has-danger" : this.state.hasError
      },
      className
    );
    let errorText = "";
    if(hasError) {
      errorText = Texts.EmptyPassword;
    }

    return (
      <div className={parentClassNames}>
        <input
          type="password"
          ref="password"
          className="form-control"
          placeholder={placeholder}
          {...otherProps}/>
        <div className="error-msg">
          {errorText}
        </div>
       </div>
    );
  }
}

PasswordField.PropTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string
};

export default PasswordField;