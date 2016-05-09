import React from 'react';

export default class TownshipTiles extends React.Component {

  constructor(props) {
    super(props);
  }

  renderTiles(dataValid) {
    if(dataValid) {
      return(
        <div className="animated fadeInUp">
          <div className="row center-align">
            <div className="col s12 m12 l6 offset-s1">
              <a className="waves-effect waves-light btn-large admin-tile valign-wrapper">
                <i className="material-icons valign">&#xE7F1;</i>
                <h4> Township Panel </h4>
              </a>
            </div>
            <div className="col s12 m12 l6 offset-s1">
              <a className="waves-effect waves-light btn-large admin-tile valign-wrapper">
                <i className="material-icons valign">&#xE90D;</i>
                <h4> Bursar Panel </h4>
              </a>
            </div>
            <div className="col s12 m12 l6"/>
          </div>
          <div className="row center-align marginless-row">
            <div className="col s12 m12 l6 offset-s1">
              <a className="waves-effect waves-light btn-large admin-tile valign-wrapper">
                <i className="material-icons valign">&#xE227;</i>
                <h4> Bursar Panel </h4>
              </a>
            </div>
            <div className="col s12 m12 l6 offset-s1">
              <a className="waves-effect waves-light btn-large admin-tile valign-wrapper">
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

    if (townshipData !== null && townshipData !== undefined)
    {
      dataValid = true;
    } else {
      dataValid = false;
    }

    return (
      <div>
      {this.renderTiles(dataValid, townshipData)}
      </div>
    );
  }
}