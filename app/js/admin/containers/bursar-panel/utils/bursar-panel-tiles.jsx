import React, { Component } from 'react';
import { Link } from 'react-router'

export class BursarPanelTiles extends Component {
  render() {
    return (
      <div>
        <div className="row marginless-row">
          <div className="col s12 m12 l6 animated fadeInLeft">
            <Link to={{pathname: `/admin/bursar/parking/${this.props.townshipCode}`}} 
            className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
                <i className="material-icons valign">directions_car</i>
                <h4> Parking Payment </h4>
            </Link>
          </div>
          <div className="col s12 m12 l6 animated fadeInRight">
            <Link to={{pathname: `/admin/bursar/permit/${this.props.townshipCode}`}} 
            className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
              <i className="material-icons valign">event_note</i>
              <h4> Permit Payment </h4>
            </Link>
          </div>
        </div>
        <div className="row marginless-row">
          <div className="col s12 m12 l6 animated fadeInLeft">
            <Link to={{pathname: `/admin/bursar/ticket/${this.props.townshipCode}`}} 
            className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
              <i className="material-icons valign">receipt</i>
              <h4> Ticket Payment </h4>
            </Link>
          </div>
          <div className="col s12 m12 l6 animated fadeInRight">
            <Link to={{pathname: `/admin/bursar/wallet/${this.props.townshipCode}`}} 
            className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
              <i className="material-icons valign">account_balance_wallet</i>
              <h4> Wallet Payment </h4>
            </Link>
          </div>
          <div className="col s12 m12 l12 animated fadeInUp">
            <Link to={{pathname: `/admin/bursar/ticket-rates/${this.props.townshipCode}`}} 
            className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
              <i className="material-icons valign">monetization_on</i>
              <h4> Adjust Tickets Charges </h4>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}