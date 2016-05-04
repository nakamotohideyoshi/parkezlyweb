import React from 'react';
import ReactDOM from "react-dom";
import { Router, IndexRoute, Route, Link, browserHistory } from "react-router";

import FindParking from "./components/find-parking/find-parking-root.jsx";
import SignIn from "./components/sign-in/sign-in-root.jsx";

export default function ClientIndex() {
    return (
        <Route path="/" component={FindParking}>
          /* Index path. Render children in FindParking by 
              adding this.props.children to render method of root route. */
          <IndexRoute component={FindParking}/>

          <Route path="login" component={SignIn}/>

          //Error path.
          <Route path="*" component={FindParking}/>
        </Route>
    );
}
