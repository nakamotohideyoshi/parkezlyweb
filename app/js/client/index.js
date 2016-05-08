import React from 'react';
import ReactDOM from "react-dom";
import { Router, IndexRoute, Route, Link, browserHistory } from "react-router";

import FindParking from "./components/find-parking/find-parking-root.jsx";
import SignInController from "./components/sign-in/sign-in-controller.jsx";
import NewVehicleController from "./components/my-vehicles/my-vehicles-controller.jsx";
import VehicleListController from "./components/my-vehicles/my-vehicles-list-controller.jsx";

export default function ClientIndex() {
  return (
    <Route>
      <Route path="/" component={SignInController}/>
      <Route path="login" component={SignInController}/>
      <Route path="find-parking" component={FindParking}/>
      <Route path="new-vehicle" component={NewVehicleController}/>
      <Route path="my-vehicles" component={VehicleListController}/>
    </Route>
  );
}