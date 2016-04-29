import React from 'react';
import ReactDOM from "react-dom";
import { Router, Route, Link, browserHistory } from "react-router";

import AdminLogin from "./components/login/admin-login-root.jsx";

class AdminIndex extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router  history={browserHistory}>
        <Route path="/admin" component={AdminLogin}/>
      </Router>
    );
  }
}

export default AdminIndex;
