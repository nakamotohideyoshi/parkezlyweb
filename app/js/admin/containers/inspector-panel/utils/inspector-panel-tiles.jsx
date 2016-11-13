import React, { Component } from 'react';
import { Link } from 'react-router'


export class InspectorPanelTiles extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showListView: false
    }
  }

  render() {
    return (
      <div>
        <div className="row marginless-row">
        { this.state.showListView ? 
          <div></div>
          :
          <div>
            <div className="col s12 m12 l12 animated fadeInRight">
              <Link to={{pathname: `/admin/inspector/map-view/${this.props.townshipCode}`}} 
              className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
                <i className="material-icons valign">map</i>
                <h4> Map View </h4>
              </Link>
            </div>
            <div className="col s12 m12 l12 animated fadeInLeft">
              <button onClick={() => {this.setState({showListView: true})}}
              className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
                <i className="material-icons valign">list</i>
                <h4> List View </h4>
              </button>
            </div>
          </div>
        }
        { this.state.showListView ? 
          <div>
            <div className="col s12 m12 l6 animated fadeInLeft">
              <Link to={{pathname: `/admin/inspector/parking-field/${this.props.townshipCode}`}} 
              className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
                  <i className="material-icons valign">local_parking</i>
                  <h4> Parking Field List </h4>
              </Link>
            </div>
            <div className="col s12 m12 l6 animated fadeInRight">
              <Link to={{pathname: `/admin/inspector/create-ticket/${this.props.townshipCode}`}} 
              className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
                <i className="material-icons valign">receipt</i>
                <h4> Ticket List </h4>
              </Link>
            </div>
            <div className="col s12 m12 l12 animated fadeInUp">
              <Link to={{pathname: `/admin/inspector/search-plate/${this.props.townshipCode}`}} 
              className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
                <i className="material-icons valign">search</i>
                <h4> Search Plate </h4>
              </Link>
            </div>
          </div>
          :
          <div></div>
        }  
          
        </div>  
      </div>
    );
  }
}