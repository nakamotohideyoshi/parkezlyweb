import React from 'react';

export default class TownshipTiles extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="row center-align">
          <div className="col-md-1"/>
          <div className="col-md-4">
            <a className="waves-effect waves-light btn-large admin-tile valign-wrapper">
              <i className="material-icons valign">&#xE7F1;</i>
              <h4> Township Panel </h4>
            </a>
          </div>
          <div className="col-md-1">
          </div>
          <div className="col-md-4">
            <a className="waves-effect waves-light btn-large admin-tile valign-wrapper">
              <i className="material-icons valign">&#xE90D;</i>
              <h4> Bursar Panel </h4>
            </a>
          </div>
          <div className="col-md-2"/>
        </div>
        <div className="row center-align">
          <div className="col-md-1"/>
          <div className="col-md-4">
            <a className="waves-effect waves-light btn-large admin-tile valign-wrapper">
              <i className="material-icons valign">&#xE227;</i>
              <h4> Bursar Panel </h4>
            </a>
          </div>
          <div className="col-md-1">
          </div>
          <div className="col-md-4">
            <a className="waves-effect waves-light btn-large admin-tile valign-wrapper">
              <i className="material-icons valign">&#xE8B8;</i>
              <h4> Settings </h4>
            </a>
          </div>
          <div className="col-md-2"/>
        </div>
      </div>
    );
  }
}