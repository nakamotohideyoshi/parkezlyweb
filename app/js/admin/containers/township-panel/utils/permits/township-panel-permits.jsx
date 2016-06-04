import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Body from "../../../../../common/components/body/body.jsx"
import {fetchTownshipPermitRequests} from '../../../../actions/actions-township-panel.jsx'

import PermitTypes from './utils/permit-types.jsx'
import ParkingPermits from './utils/parking-permits.jsx'
import TownshipPermits from './utils/township-permits.jsx'
import LocationsRate from './utils/locations-rate.jsx'

export default class TownshipPanelPermits extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>
          <div style={{marginTop: 40}}>
            <div className="row marginless-row">
              <PermitTypes className="col s6"/>
              <TownshipPermits className="col s6"/>
              <ParkingPermits />
              <LocationsRate />
            </div>    
          </div>
        </Body>
      </div>
    );
  }
}
