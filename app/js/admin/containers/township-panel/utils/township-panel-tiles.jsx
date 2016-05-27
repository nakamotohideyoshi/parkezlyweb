import React from 'react';
import { Link } from 'react-router';

export default class TownshipPanelTiles extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="animated fadeInUp">
        <div className="row center-align marginless-row" style={{marginTop: 30}}>
            <Link 
              to={{pathname: `/admin/township/users/${this.props.townshipCode}`}} 
              className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l5 offset-l1">
              <i className="material-icons valign" >person</i>
              <h4> User List </h4>
            </Link>
            <a className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l5 offset-l1">
              <i className="material-icons valign">place</i>
              <h4> Facilities List </h4>
            </a>
        </div>
        <div className="row center-align marginless-row" style={{marginTop: 30}}>
            <a className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l5 offset-l1">
              <i className="material-icons valign">event_note</i>
              <h4> Permit List </h4>
            </a>
            <a className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l5 offset-l1">
              <i className="material-icons valign">event_available</i>
              <h4> Permit Request List </h4>
            </a>
        </div>
      </div>
    );
  }
}
