import React from 'react';
import ReactDOM from "react-dom";
import { Router, Route, Link, hashHistory, browserHistory } from "react-router";

import AdminLogin from "./components/login/login-root.jsx";
import TownshipList from "./containers/township-list/township-list.jsx";
import TownshipPanelRoot from './containers/township-panel/township-panel-root.jsx';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers'; 

const createStoreWithMiddleware = applyMiddleware(ReduxThunk, ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers);

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

class TownshipPanelController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <TownshipPanelRoot />
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