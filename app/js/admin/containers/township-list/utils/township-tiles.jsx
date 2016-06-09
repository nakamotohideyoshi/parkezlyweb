import React from 'react';
import { Link } from 'react-router'

export default class TownshipTiles extends React.Component {

  constructor(props) {
    super(props);
  }

  renderTiles(dataValid, townshipData) {
    if(dataValid) {
      return(
        <div className="animated fadeInUp container">
          <div className="row marginless-row">
            <div className="col s12 m12 l6">
              <Link to={{pathname: `/admin/township/${townshipData.id}`}} 
              className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
                  <i className="material-icons valign">&#xE7F1;</i>
                  <h4> Township Panel </h4>
              </Link>
            </div>
            <div className="col s12 m12 l6">
              <a className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
                <i className="material-icons valign">&#xE90D;</i>
                <h4> Inspector Panel </h4>
              </a>
            </div>
          </div>
          <div className="row marginless-row">
            <div className="col s12 m12 l6">
              <a className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
                <i className="material-icons valign">&#xE227;</i>
                <h4> Bursar Panel </h4>
              </a>
            </div>
            <div className="col s12 m12 l6">
              <a className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12">
                <i className="material-icons valign">&#xE8B8;</i>
                <h4> Settings </h4>
              </a>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {

    let townshipData = this.props.townshipData;
    let dataValid;

    if (townshipData.data !== null && townshipData.data !== undefined)
    {
      dataValid = true;
    } else {
      dataValid = false;
    }

    return (
      <div>
        {this.renderTiles(dataValid, townshipData.data)}
      </div>
    );
  }
}