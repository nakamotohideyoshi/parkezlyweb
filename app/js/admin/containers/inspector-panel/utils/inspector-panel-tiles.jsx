import React, { Component } from 'react';
import { Link } from 'react-router'

export class InspectorPanelTiles extends Component {
  render() {
    return (
      <div>
        <div className="row marginless-row">
          <div className="col s12 m12 l6 animated fadeInLeft">
            <Link to={{pathname: `/admin/inspector/parking-field/${this.props.townshipCode}`}} 
            className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
                <i className="material-icons valign">local_parking</i>
                <h4> Parking Field View </h4>
            </Link>
          </div>
          <div className="col s12 m12 l6 animated fadeInRight">
            <Link to={{pathname: `/admin/inspector/search-plate/${this.props.townshipCode}`}} 
            className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
              <i className="material-icons valign">search</i>
              <h4> Search Plate Number </h4>
            </Link>
          </div>
        </div>
        <div className="row marginless-row">
          <div className="col s12 m12 l12 animated fadeInUp">
            <Link to={{pathname: `/admin/inspector/create-ticket/${this.props.townshipCode}`}} 
            className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
              <i className="material-icons valign">receipt</i>
              <h4> Create Ticket </h4>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}