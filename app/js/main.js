import React from "react";
import ReactDOM from "react-dom";

import ClientIndex from './client/index.js';
import AdminIndex from './admin/index.js';

import "../css/main.scss";

ReactDOM.render((
    <div>
      <ClientIndex />
      <AdminIndex />
    </div>
  ), document.getElementById('app')
);
