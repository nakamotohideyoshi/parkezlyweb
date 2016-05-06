import React from 'react';
import ReactDOM from "react-dom";
import { Router, IndexRoute, Route, Link, browserHistory } from "react-router";

import FindParking from "./components/find-parking/find-parking-root.jsx";
import SignIn from "./components/sign-in/sign-in-controller.jsx";

export default function ClientIndex() {
  return (
    <Route>
    	<Route path="/" component={SignIn}/>
      <Route path="login" component={SignIn}/>
      <Route path="find-parking" component={FindParking}/>
    </Route>
  );
}