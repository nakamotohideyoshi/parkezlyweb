import React from 'react';
import { Provider } from 'react-redux';
import TownshipPanelRoot from './township-panel-root.jsx';
import TownshipPanelUsers from './utils/users/township-panel-users.jsx'
import TownshipPanelFacilities from './utils/facilities/township-panel-facilities.jsx'
import TownshipPanelPermits from './utils/permits/township-panel-permits.jsx'
import TownshipPanelPermitRequests from './utils/permit-requests/township-panel-permit-requests.jsx'
import store from '../../store/store.js';

export class TownshipPanelController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <TownshipPanelRoot townshipId={this.props.params.townshipId} />
      </Provider>
    );
  }
}

export class TownshipUsersController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <TownshipPanelUsers townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class TownshipFacilitiesController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <TownshipPanelFacilities townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class TownshipPermitsController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <TownshipPanelPermits townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}

export class TownshipPermitRequestsController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <TownshipPanelPermitRequests townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}