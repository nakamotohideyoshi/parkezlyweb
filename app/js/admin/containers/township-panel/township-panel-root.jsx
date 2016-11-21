import React from 'react';
import Body from "../../../common/components/body/body.jsx";
import Spinner from '../../common/components/spinner.jsx';
import TownshipDetails from './utils/township-panel-details.jsx';
import TownshipPanelTiles from './utils/township-panel-tiles.jsx';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router';
import {SimpleSelect} from 'react-selectize';

import {
  editTownship, 
  fetchTownshipList, 
  updateTownshipDetails, 
  resetLoading,
  resetTownshipDetails,
  fetchTownshipDetails
} from '../../actions/actions-township.js';


let townshipObjects;
let filteredTownship;

class TownshipPanelRoot extends React.Component {
  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
    this.state = {
      townshipCode: null
    }
    this.renderDetailsFlag = this.renderDetailsFlag.bind(this);
  }
  
  componentWillMount() {
    this.props.fetchTownshipList();
  }

  renderDetailsFlag() {
    if(filteredTownship === null || filteredTownship === undefined) {
      return (
        <div className="center-align" style={{marginTop: 40}}>
          <div className="card">
            <div className="center-align"> <Spinner /> </div> 
          </div>
        </div>
      );
    }
    else {
      return (
          <div>
            <TownshipDetails 
              townshipId={this.props.townshipCode} 
              townshipData={filteredTownship[0]}
              initialValues={filteredTownship[0]} 
            />
            <TownshipPanelTiles townshipId={this.props.townshipCode} townshipCode={filteredTownship[0].manager_id}/>
          </div>
        );
    }

    
  }

  render() {
    if(!this.props.townshipListFetched.isLoading) {
      townshipObjects = this.props.townshipListFetched.data.resource;
      filteredTownship = _.filter(townshipObjects, { 'id':  parseInt(this.props.townshipCode)})
    }

    return (
      <div className="blue-body marginless-row">
        <nav className="tab-bar">
          {filteredTownship !== undefined ? 
          <div className="nav-wrapper">
            <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul className="left hide-on-med-and-down">
              <li>
                <a href="/admin/township/1" className="waves-effect waves-light tab-bar-link">
                <i className="material-icons left tab-bar-icons">home</i>Township Editor</a>
              </li>
              <li>
                <Link to={{pathname: `/admin/township/users/${filteredTownship[0].manager_id}`}} 
                className="waves-effect waves-light tab-bar-link">
                <i className="material-icons left tab-bar-icons">person</i>User List</Link>
              </li>
              <li>
                <Link to={{pathname: `/admin/township/facilities/${filteredTownship[0].manager_id}`}} 
                className="waves-effect waves-light tab-bar-link">
                <i className="material-icons left tab-bar-icons">place</i>Facilities List</Link>
              </li>
              <li>
                <Link to={{pathname: `/admin/township/permit/${filteredTownship[0].manager_id}`}} 
                className="waves-effect waves-light tab-bar-link">
                <i className="material-icons left tab-bar-icons">event_note</i>Permit List</Link>
              </li>
              <li>
                <Link to={{pathname: `/admin/township/permit-requests/${filteredTownship[0].manager_id}`}} 
                className="waves-effect waves-light tab-bar-link">
                <i className="material-icons left tab-bar-icons">event_available</i>Permit Request List</Link>
              </li>
              <li>
                <Link to={{pathname: `/admin/inspector/${filteredTownship[0].id}`}} 
                className="waves-effect waves-light tab-bar-link">
                <i className="material-icons left tab-bar-icons">&#xE90D;</i>Inspector Panel</Link>
              </li>
              <li>
                <Link to={{pathname: `/admin/bursar/${filteredTownship[0].id}`}} 
                className="waves-effect waves-light tab-bar-link">
                <i className="material-icons left tab-bar-icons">&#xE227;</i>Bursar Panel</Link>
              </li>
            </ul>

            <ul className="side-nav" id="mobile-demo">
              <li><a href="sass.html">Sass</a></li>
              <li><a href="badges.html">Components</a></li>
              <li><a href="collapsible.html">Javascript</a></li>
              <li><a href="mobile.html">Mobile</a></li>
            </ul>
          </div> : console.log("Loading Tabs...")}     
        </nav>
        <Body showHeader={true}>
          <div className="container">
            ID: {this.props.townshipCode}
            {this.renderDetailsFlag()}
          </div>

        </Body>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    townshipListFetched: state.townshipListFetched,
    townshipDetailsFetched: state.townshipDetailsFetched,
    townshipListEdited: state.townshipListEdited,
    townshipDetails: state.townshipDetails
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipList,
    fetchTownshipDetails,
    updateTownshipDetails
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TownshipPanelRoot);