import React from 'react'
import { Provider } from 'react-redux'
import InspectorPanelRoot from './inspector-panel-root.jsx'
import store from '../../store/store.js'
import InspectorCreateTicket from './utils/create-ticket/inspector-panel-create-ticket.jsx'
import InspectorParkingField from './utils/parking-field/inspector-panel-parking-field.jsx'
import InspectorSearchPlate from './utils/search-plate/inspector-panel-search-plate.jsx'

export class InspectorPanelController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <InspectorPanelRoot townshipId={this.props.params.townshipId} />
      </Provider>
    );
  }
}

export class InspectorCreateTicketController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <InspectorCreateTicket townshipId={this.props.params.townshipId} />
      </Provider>
    );
  }
}

export class InspectorParkingFieldController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <InspectorParkingField townshipId={this.props.params.townshipId} />
      </Provider>
    );
  }
}

export class InspectorSearchPlateController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <InspectorSearchPlate townshipId={this.props.params.townshipId} />
      </Provider>
    );
  }
}



