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
  BursarPermitController,
  BursarTicketController,
  BursarWalletController,
  BursarTicketRatesController
} from './containers/bursar-panel/bursar-panel-controller.jsx'

import {
  InspectorPanelController,
  InspectorCreateTicketController,
  InspectorSearchPlateController,
  InspectorParkingFieldController,

} from './containers/inspector-panel/inspector-panel-controller.jsx'

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
        <Route path="admin/bursar/permit/:townshipCode" component={BursarPermitController} />
        <Route path="admin/bursar/ticket/:townshipCode" component={BursarTicketController} />
        <Route path="admin/bursar/wallet/:townshipCode" component={BursarWalletController} />
        <Route path="admin/bursar/ticket-rates/:townshipCode" component={BursarTicketRatesController} />

        <Route path="admin/inspector/:townshipId" component={InspectorPanelController} />
        <Route path="admin/inspector/parking-field/:townshipId" component={InspectorParkingFieldController} />
        <Route path="admin/inspector/search-plate/:townshipId" component={InspectorSearchPlateController} />
        <Route path="admin/inspector/create-ticket/:townshipId" component={InspectorCreateTicketController} />



      </div>
  );
}