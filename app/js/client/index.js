import React from 'react';
import ReactDOM from "react-dom";
import { Router, IndexRoute, Route, Link, browserHistory } from "react-router";

import ParkingController from "./components/find-parking/find-parking-controller.jsx";
import SignInController from "./components/sign-in/sign-in-controller.jsx";
import NewVehicleController from "./components/my-vehicles/my-vehicles-controller.jsx";
import EditVehicleController from "./components/my-vehicles/edit-vehicle-controller.jsx";
import VehicleListController from "./components/my-vehicles/my-vehicles-list-controller.jsx";
import MyPermitsController from "./components/my-permits/my-permits-controller.jsx";
import MyTicketsController from "./components/my-tickets/my-tickets-controller.jsx";


export default function ClientIndex() {
  return (
    <div>
      <Route path="/" component={SignInController}/>
      <Route path="login" component={SignInController}/>
      <Route path="find-parking" component={ParkingController}/>
      <Route path="new-vehicle" component={NewVehicleController}/>
      <Route path="edit-vehicle" component={EditVehicleController}/>
      <Route path="edit-vehicle/:vehicleId" component={EditVehicleController}/>
      <Route path="my-permits" component={MyPermitsController}/>
      <Route path="my-tickets" component={MyTicketsController}/>
    </div>
  );
}