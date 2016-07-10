import React from 'react';

import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'
import { Link, browserHistory } from 'react-router'

export default class InspectorVehicleInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="marginless-row" style={{backgroundColor: "#FBE6CB"}}>
        <Body showHeader={true}>

          <div className="row marginless-row">
            <div className="center-align">
              <div className="card" 
              style={{
              backgroundColor: "#F6EADF", 
              display: "block", }}>
                  <div className="township-userlist-container" style={{backgroundColor: "#F6EADF"}}>
                    <div style={{marginTop: 20, fontSize: 50, fontWeight: "100"}}> Vehicle Info. </div>
                    
                    <img src={require('../../../../../../images/car_red@3x.png')} />

                    <div className="row" style={{marginTop: 30}}>
                  <h5 className="col s12">Plate Number - {this.props.vehicleCode}</h5>
                </div>

                <div className="row">
                  <h5 className="col s6">State - </h5>
                  <h5 className="col s6">Row - 555 </h5>
                </div>
                  </div>
              </div>
            </div>
          </div>

          <div className="card" 
          style={{
          backgroundColor: "#4C4B49", 
          display: "block", }}>
              <div className="township-userlist-container" style={{backgroundColor: "#4C4B49"}}>
                <div className="row marginless-row center-align">
                  <span className="col s12" style={{color: "white", fontSize: 50, margin: 0, fontWeight: "bold"}}> 0:0:0 </span>
                </div>
                <div className="row marginless-row center-align">
                  <span className="col s12" style={{color: "white", margin: 0}}>Hours : Minutes : Seconds </span>
                </div>
              </div>
          </div>

          <div className="card" 
          style={{
          backgroundColor: "#313131", 
          display: "block", }}>
              <div className="township-userlist-container" style={{backgroundColor: "#313131", color: "white",}}>
                <div className="row">
                  <div className="right-align">
                    <h5 className="col s6">Plate #:</h5> 
                  </div>
                  <div className="left-align">
                    <h5 className="col s6">TypeError</h5>
                  </div>
                  <div className="right-align">
                    <h5 className="col s6">Violation Fee:</h5> 
                  </div>
                  <div className="left-align">
                    <h5 className="col s6">Test</h5>
                  </div>
                  <div className="right-align">
                    <h5 className="col s6">Description:</h5>  
                  </div>
                  <div className="left-align">
                    <h5 className="col s6">Test</h5>
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
              <Link to={{pathname: `/admin/inspector/vehicle-info/create-ticket/:${this.props.vehicleCode}`}} 
              className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12" style={{backgroundColor: "#CC0000"}}>
                <i className="material-icons valign">receipt</i>
                <h4> Create Ticket </h4>
              </Link>
            </div>

            <div className="col s12 m12 l12 animated fadeInUp">
              <Link to={{pathname: `/admin/inspector/search-plate/${this.props.vehicleCode}`}} 
              className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12" style={{backgroundColor: "#FCFF00", color: "black"}}>
                <i className="material-icons valign">arrow_back</i>
                <h4> Back </h4>
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