import React from 'react';
import Body from "../../../common/components/body/body.jsx";

export default class TownshipPanelRoot extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="blue-body marginless-row">
        <nav className="tab-bar">
          <div className="nav-wrapper">
            <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul className="left hide-on-med-and-down">
              <li>
                <a href="/admin/township/51" className="waves-effect waves-light" style={{height: 30}}>
                <i className="material-icons left tab-bar-icons">home</i>Township Editor</a>
              </li>
              <li>
                <a href="/admin/township/51" className="waves-effect waves-light" style={{height: 30}}>
                <i className="material-icons left tab-bar-icons">person</i>Userlist</a>
              </li>
              <li>
                <a href="/admin/township/51" className="waves-effect waves-light" style={{height: 30}}>
                <i className="material-icons left tab-bar-icons">place</i>Facilities List</a>
              </li>
              <li>
                <a href="/admin/township/51" className="waves-effect waves-light" style={{height: 30}}>
                <i className="material-icons left tab-bar-icons">event_note</i>Permit List</a>
              </li>
              <li>
                <a href="/admin/township/51" className="waves-effect waves-light" style={{height: 30}}>
                <i className="material-icons left tab-bar-icons">event_available</i>Permit Request List</a>
              </li>
            </ul>

            <ul className="side-nav" id="mobile-demo">
              <li><a href="sass.html">Sass</a></li>
              <li><a href="badges.html">Components</a></li>
              <li><a href="collapsible.html">Javascript</a></li>
              <li><a href="mobile.html">Mobile</a></li>
            </ul>
          </div>
        </nav>
        <Body showHeader={true} style={{marginBottom: 0}}>
          <div className="content-container">
            <div> ID: {this.props.params.townshipId}</div>
          </div>
        </Body>
      </div>
    );
  }
}
