import React from 'react';

import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'
import { Link } from 'react-router'


export default class InspectorVehicleInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>

          <div className="row marginless-row" style={{marginTop: 40}}>
            <div className="col s12 center-align">
              <nav>
                <div className="nav-wrapper nav-admin z-depth-2">
                  <a className="brand-logo center">Vehicle Info</a>
                </div>
              </nav>
               <div className="card" style={{backgroundColor: "#F6EADF"}}>
                  <div className="township-userlist-container">
                    <div style={{marginTop: 20, fontSize: 50}}> Vehicle Info. </div>
                    
                    <img src={require('../../../../../../images/car_red@3x.png')} />

                    <h5>Plate Number - {this.props.vehicleCode}</h5>
                    <h5>State - </h5>
                    <h5>Row - 555 </h5>
                  </div>
               </div>
            </div>
          </div>

          <div className="row marginless-row" style={{marginTop: 40}}>
            <div className="col s12 m12 l12 animated fadeInUp">
              <Link to={{pathname: `/admin/inspector/search-plate/${this.props.vehicleCode}`}} 
              className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12" style={{backgroundColor: "#0d53cf"}}>
                <i className="material-icons valign">search</i>
                <h4> Find this Vehicle </h4>
              </Link>
            </div>
            <div className="col s12 m12 l12 animated fadeInUp">
              <Link to={{pathname: `/admin/inspector/vehicle-info/create-ticket/${this.props.vehicleCode}`}} 
              className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12" style={{backgroundColor: "#cc0000"}}>
                <i className="material-icons valign">receipt</i>
                <h4> Create Ticket </h4>
              </Link>
            </div>
          </div>

        </Body>
      </div>
    );
  }
}













/*
<div className="center-align"> 
  <div className="card" style={{backgroundColor: "#F6EADF"}}>
    <div> Vehicle Info. </div>
    <h3>Plate Number - {this.props.vehicleCode}</h3>
    <img src={require('../../../../../../images/car_red@3x.png')} />
  </div>
</div>
*/