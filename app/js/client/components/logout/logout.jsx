import React, { Component, PropTypes } from "react";
import cookie from "react-cookie";
import Body from "../../../common/components/body/body.jsx";

class Logout extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    cookie.remove('userId', { path: '/' });
    cookie.remove('sessionId', { path: '/' });
    cookie.remove('sessionToken', { path: '/' });
    cookie.remove('role', { path: '/' });
    cookie.remove('roleId', { path: '/' });
    cookie.remove('townshipCode', { path: '/' });

    window.location = "/";
  }

  render() {
    return authStatus ? (
      <Body showHeader={false} loading={true}>
      </Body>
    ) : null;
  }
}

export default Logout;