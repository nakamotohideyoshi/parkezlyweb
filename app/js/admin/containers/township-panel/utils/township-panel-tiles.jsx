import React from 'react';

export default class TownshipPanelTiles extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="animated fadeInUp">
        <div className="row center-align">
          <div className="col s12 m12 l5 offset-s6">
            <a className="waves-effect waves-light btn-large admin-tile valign-wrapper">
              <i className="material-icons valign">&#xE90D;</i>
              <h4> Inspector Panel </h4>
            </a>
          </div>
          <div className="col s12 m12 l6 offset-l1">
            <a className="waves-effect waves-light btn-large admin-tile valign-wrapper">
              <i className="material-icons valign">&#xE227;</i>
              <h4> Bursar Panel </h4>
            </a>
          </div>
          <div className="col s12 m12 l6"/>
        </div>
      </div>
    );
  }
}
