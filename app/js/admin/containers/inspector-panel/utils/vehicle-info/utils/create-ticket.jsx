import React from 'react';
import { reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import datetime from 'node-datetime'
import {SimpleSelect} from "react-selectize"
import { browserHistory } from 'react-router'
import {createFilter} from 'react-search-input';

import Body from "../../../../../../common/components/body/body.jsx";
import Spinner from '../../../../../common/components/spinner.jsx';

import {
  fetchTownshipLocations, 
  fetchHearingPlace, 
  createHearingPlace, 
  fetchViolationCode, 
  createViolationCode,
  resetLoading
} from '../../../../../actions/actions-township-panel.jsx'

import {fetchInspectorTicket, createInspectorTicket} from '../../../../../actions/actions-inspector-panel.jsx'

import { Link } from 'react-router';

export const fields = [ 
  'id',
  'town_logo', 
  'plate_no',
  'violation_fee', 
  'violation_detail',  
  'respond_date',  
  'hearing_date',  
  'hearing_location',  
  'date_ticket', 
  'plead_guilty_no_guilty',  
  'v_user_name', 
  'address', 
  'email', 
  'phone', 
  'officer_name',  
  'officer_id',  
  'user_id', 
  'ticket_no', 
  'violation_code',  
  'violation_description', 
  'violation_location',  
  'court_id',  
  'hearing_address', 
  'township_code', 
  'v_user_id', 
  'tkt_status',  
  'signature', 
  'penalty_adjustment',  
  'adjustment_reference',  
  'hearing_hour',  
  'hearing_time',  
  'am_pm', 
  'twp_payment', 
  'paid_amount', 
  'paid_date',
]

export default class CreateTicket extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hearingData: null,
      violationData: null,
      tableMenu: false,
    }
  }

  componentWillMount() {
    this.props.fetchHearingPlace();
    this.props.fetchViolationCode();
  }

  renderHearingLocation() {
    return (
      <div 
      className="card waves-effect waves-dark" 
      style={{backgroundColor: "#F6EADF", border: "2px solid black", display: "block", borderBottom: "0px"}}
      onClick={() => this.setState({tableMenu: true})}>
        <div style={{backgroundColor: "#F6EADF"}} className="township-userlist-container center-align">
          <div style={{marginTop: 20, fontSize: 50}}> Hearing Location </div>
          <h5>Location: </h5>
        </div>
       </div>
    );
  }

  renderViolationCode() {
    return (
      <div 
      className="card waves-effect waves-dark" 
      style={{backgroundColor: "#F6EADF", display: "block", border: "2px solid black"}}
      onClick={() => this.setState({tableMenu: true})}>
        <div style={{backgroundColor: "#F6EADF"}} className="township-userlist-container center-align">
          <div style={{marginTop: 20, fontSize: 50}}> Violation Type </div>
          <h5>Violation Code: {this.props.vehicleCode}</h5>
          <h5>Violation Fee: </h5>
          <h5>Description:  </h5>
        </div>
       </div>
    );
  }

  renderHearingMenu() {
    console.log(this.props.townshipHearingPlaceFetched.data.resource);
    let hearingData = this.props.townshipHearingPlaceFetched.data.resource;
    return hearingData.map((data) => {
      return (
        <div 
          className="card waves-effect waves-dark" 
          style={{backgroundColor: "#F6EADF", border: "2px solid black", display: "block", borderBottom: "0px"}}
          >
            <h5> Location: {data.hearing_location} </h5>
        </div>
      );
    });
  }

  render() {
    if (!this.state.tableMenu) {
      return (
        <div className="blue-body marginless-row" style={{backgroundColor: "#FBE6CB"}}>
          <Body showHeader={true}>
            <div className="card waves-effect waves-dark" style={{backgroundColor: "#F6EADF", border: "2px solid black", display: "block", borderBottom: "0px"}}>
              <div style={{backgroundColor: "#F6EADF"}} className="township-userlist-container center-align">
                <div style={{marginTop: 20, fontSize: 50}}> Vehicle Info. </div>
                <img src={require('../../../../../../../images/car_red@3x.png')} className="responsive-img"/>
                <h5>Plate Number - {this.props.vehicleCode}</h5>
                <h5>State - </h5>
                <h5>Row - 555 </h5>
              </div>
            </div>
            { this.props.townshipHearingPlaceFetched.isLoading ? 
              <div></div> : this.renderHearingLocation()}
            { this.props.townshipViolationCodeFetched.isLoading ? 
            <div></div> : this.renderViolationCode()}

            <div className="card waves-effect waves-light" style={{backgroundColor: "#CC0000", border: "2px solid black", display: "block", marginTop: 80}}>
              <div className="township-userlist-container center-align" style={{backgroundColor: "#CC0000"}}>
                <i style={{color: "white", fontSize: "80"}} className="material-icons valign">receipt</i>
                <h4 style={{color: "white"}}> Create Ticket </h4>
              </div>
            </div>
          </Body>
        </div>
      );
    } else if (this.state.tableMenu) {
      return (
        <div className="blue-body marginless-row" style={{backgroundColor: "#FBE6CB"}}>
          <Body showHeader={true}>
            <h3 style={{border: "2px solid black", display: "block", padding: 20, margin: 0, borderBottom: "0px", fontWeight: "bold"}}> Hearing Locations: </h3>
            {this.renderHearingMenu()} 
          </Body>
        </div>
      )
    }
    
  }
}

function mapStateToProps(state) {
  return {

    townshipHearingPlaceFetched: state.townshipHearingPlaceFetched,
    townshipHearingPlaceCreated: state.townshipHearingPlaceCreated,

    townshipViolationCodeFetched: state.townshipViolationCodeFetched,
    townshipViolationCodeCreated: state.townshipViolationCodeCreated,

    townshipLocationsFetched: state.townshipLocationsFetched,

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

    fetchTownshipLocations,

    fetchHearingPlace,
    createHearingPlace,
   
    fetchViolationCode,
    createViolationCode,

    fetchInspectorTicket, 
    createInspectorTicket,

    resetLoading,

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'map-create-ticket',
  fields
})(CreateTicket));


/*

<div className="row marginless-row" style={{marginTop: 40}}>
  <div>
    <Link to={{pathname: `/admin/inspector/vehicle-info/create-ticket/${this.props.vehicleCode}`}} 
    className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12" style={{backgroundColor: "#cc0000"}}>
      <i className="material-icons valign">receipt</i>
      <h4> Create Ticket </h4>
    </Link>
  </div>
</div>

*/