import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Body from "../../../../../common/components/body/body.jsx"
import {fetchTownshipPermitRequests} from '../../../../actions/actions-township-panel.jsx'

import PermitTypes from './utils/permit-types.jsx'
import ParkingPermits from './utils/parking-permits.jsx'
import TownshipPermits from './utils/township-permits.jsx'
import LocationsRate from './utils/locations-rate.jsx'

import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

export default class TownshipPanelPermits extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>
          <div  style={{marginTop: 40}}>
            <div className="row marginless-row">
              <Tabs onSelect={this.handleSelect} selectedIndex={0} className="col s12">
                <TabList>
                  <Tab>Township</Tab>
                  <Tab>Parking</Tab>
                  <Tab>Location</Tab>
                </TabList>
                <TabPanel>
                  <div className="row marginless-row">
                    <PermitTypes className="col s6" townshipCode={this.props.townshipCode} />
                    <TownshipPermits className="col s6" townshipCode={this.props.townshipCode} />
                  </div>            
                </TabPanel>
                <TabPanel>
                  <div className="row marginless-row">
                    <ParkingPermits townshipCode={this.props.townshipCode} />
                  </div>
                </TabPanel>
                <TabPanel>
                  <LocationsRate townshipCode={this.props.townshipCode} />
                </TabPanel>
              </Tabs>          
            </div>
          </div>
        </Body>
      </div>
    );
  }
}
