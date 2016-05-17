import React from 'react';
import ReactDOM from "react-dom";
import { Router, Route, Link, hashHistory, browserHistory } from "react-router";

import AdminLogin from "./components/login/login-root.jsx";
import TownshipList from "./containers/township-list/township-list.jsx";
import TownshipPanelController from "./containers/township-panel/township-panel-controller.jsx"

// Redux
import { Provider } from 'react-redux';
import store from './store/store.js'

class TownshipListController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <TownshipList />
      </Provider>
    );
  }
}

export default function AdminIndex() {
  return (
      <div>
        <Route path="admin" component={TownshipListController}>
          <Route path="township" component={TownshipPanelController}/>
        </Route>
        <Route path="admin/township/:townshipId" component={TownshipPanelController}/>
      </div>
  );
}