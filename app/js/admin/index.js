import React from 'react';
import ReactDOM from "react-dom";
import { Router, Route, Link, hashHistory, browserHistory } from "react-router";

import AdminLogin from "./components/login/login-root.jsx";
import TownshipList from "./containers/township-list/township-list.jsx";

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers'; 

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

export default function AdminIndex() {
  console.log("test");
  return (
    <Provider store={createStoreWithMiddleware(reducers)}>
      <Route path="/admin" component={TownshipList}/>
    </Provider>
  );
}