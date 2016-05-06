import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, hashHistory, browserHistory } from "react-router";

import ClientIndex from './client/index.js';
import AdminIndex from './admin/index.js';

import "../css/main.scss";

require('script-loader!jquery/dist/jquery.js');
require('script-loader!hammerjs/hammer.js');
require('script-loader!materialize-css/dist/js/materialize.js');
require('file?name=[name].[ext]!../index.html');

ReactDOM.render((
    <Router history={browserHistory}>
      {AdminIndex()}
      {ClientIndex()}
    </Router>
  ), document.getElementById('app')
);