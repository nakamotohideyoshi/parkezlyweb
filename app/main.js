import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, browserHistory } from "react-router";

import FindParking from "./components/find-parking/find-parking-root.jsx";
import "./css/main.css";

ReactDOM.render((
    <Router  history={browserHistory}>
      <Route path="/" component={FindParking}/>
    </Router>
  ), document.getElementById('app')
);
