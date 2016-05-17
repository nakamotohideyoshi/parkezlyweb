import React from 'react';
import { Provider } from 'react-redux';
import TownshipPanelRoot from './township-panel-root.jsx';
import store from '../../store/store.js';

export default class TownshipPanelController extends React.Component {
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