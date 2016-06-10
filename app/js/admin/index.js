import React from 'react';
import ReactDOM from "react-dom";
import { Router, Route, Link, hashHistory, browserHistory } from "react-router";

import AdminLogin from "./components/login/login-root.jsx";
import TownshipListController from './containers/township-list/township-list-controller.jsx';

import {
  TownshipPanelController, 
  TownshipUsersController, 
  TownshipFacilitiesController, 
  TownshipPermitsController, 
  TownshipPermitRequestsController
} from "./containers/township-panel/township-panel-controller.jsx"

import {
  BursarPanelController,
  BursarParkingController,
} from './containers/bursar-panel/bursar-panel-controller.jsx'

// Redux
import { Provider } from 'react-redux';
import store from './store/store.js'

export default function AdminIndex() {
  return (
      <div>
        <Route path="admin" component={TownshipListController}/>

        <Route path="admin/township/:townshipId" component={TownshipPanelController}/>
        <Route path="admin/township/users/:townshipCode" component={TownshipUsersController}/>
        <Route path="admin/township/facilities/:townshipCode" component={TownshipFacilitiesController}/>
        <Route path="admin/township/permit/:townshipCode" component={TownshipPermitsController}/>
        <Route path="admin/township/permit-requests/:townshipCode" component={TownshipPermitRequestsController}/>

        <Route path="admin/bursar/:townshipId" component={BursarPanelController} />
        <Route path="admin/bursar/parking/:townshipCode" component={BursarParkingController} />
        <Route path="admin/bursar/permit/:townshipCode" component={BursarPanelController} />
        <Route path="admin/bursar/ticket/:townshipCode" component={BursarPanelController} />
        <Route path="admin/bursar/wallet/:townshipCode" component={BursarPanelController} />
        <Route path="admin/bursar/ticket-rates/:townshipCode" component={BursarPanelController} />
      </div>
  );
}