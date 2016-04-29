import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, browserHistory } from "react-router";

import FindParking from "./client/components/find-parking/find-parking-root.jsx";
import SignIn from "./client/components/sign-in/sign-in-root.jsx";
import AdminLogin from "./admin/components/login/admin-login-root.jsx";


import "../css/main.scss";

ReactDOM.render((
    <Router  history={browserHistory}>
      <Route path="/" component={FindParking}/>
      <Route path="/login" component={SignIn}/>
      <Route path="/admin" component={AdminLogin}/>
    </Router>
  ), document.getElementById('app')
);
