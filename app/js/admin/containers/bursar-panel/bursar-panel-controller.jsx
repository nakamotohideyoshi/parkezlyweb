import React from 'react'
import { Provider } from 'react-redux'
import BursarPanelRoot from './bursar-panel-root.jsx'
import BursarPanelParkingPayment from './utils/parking-payment/bursar-panel-parking-payment.jsx'
import store from '../../store/store.js'

export class BursarPanelController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <BursarPanelRoot townshipId={this.props.params.townshipId} />
      </Provider>
    );
  }
}

export class BursarParkingController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <BursarPanelParkingPayment townshipCode={this.props.params.townshipCode} />
      </Provider>
    );
  }
}