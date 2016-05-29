import React from 'react';
import ReactDOM from "react-dom";
import { Router, Route, Link, hashHistory, browserHistory } from "react-router";

import AdminLogin from "./components/login/login-root.jsx";
import TownshipListController from './containers/township-list/township-list-controller.jsx';
import {TownshipPanelController, TownshipUsersController, TownshipFacilitiesController} from "./containers/township-panel/township-panel-controller.jsx"

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
      </div>
  );
}