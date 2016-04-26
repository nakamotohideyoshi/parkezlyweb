import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, browserHistory } from "react-router";

import FindParking from "./components/find-parking/find-parking-root.jsx";
import SignIn from "./components/sign-in/sign-in-root.jsx";

import "./css/main.scss";

ReactDOM.render((
    <Router  history={browserHistory}>
      <Route path="/" component={FindParking}/>
      <Route path="/login" component={SignIn}/>
    </Router>
  ), document.getElementById('app')
);
