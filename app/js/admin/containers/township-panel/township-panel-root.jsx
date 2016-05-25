import React from 'react';
import Body from "../../../common/components/body/body.jsx";
import TownshipDetails from './utils/township-panel-details.jsx';
import TownshipPanelTiles from './utils/township-panel-tiles.jsx';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

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

    this.renderDetailsFlag = this.renderDetailsFlag.bind(this);
  }
  componentWillMount() {
    //this.props.fetchTownshipDetails(this.props.townshipId);
    this.props.fetchTownshipList();
  }

  renderDetailsFlag() {
    if(filteredTownship === null || filteredTownship === undefined) {
      return (
        <div className="center-align" style={{marginTop: 40}}>
          <div className="card">
            <div className="preloader-wrapper big active">
              <div className="spinner-layer spinner-green-only">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div><div className="gap-patch">
                  <div className="circle"></div>
                </div><div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
          <TownshipDetails 
          townshipId={this.props.townshipId} 
          townshipData={filteredTownship[0]}
          initialValues={filteredTownship[0]} />
        );
    }

    
  }

  render() {

    if(!this.props.townshipListFetched.isLoading) {
      townshipObjects = this.props.townshipListFetched.data.resource;
      filteredTownship = _.filter(townshipObjects, { 'id':  parseInt(this.props.townshipId)})
    }

    return (
      <div className="blue-body marginless-row">
        <nav className="tab-bar">
          <div className="nav-wrapper">
            <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul className="left hide-on-med-and-down">
              <li>
                <a href="/admin/township/1" className="waves-effect waves-light tab-bar-link">
                <i className="material-icons left tab-bar-icons">home</i>Township Editor</a>
              </li>
              <li>
                <a href="/admin/township/1" className="waves-effect waves-light tab-bar-link">
                <i className="material-icons left tab-bar-icons">person</i>User List</a>
              </li>
              <li>
                <a href="/admin/township/1" className="waves-effect waves-light tab-bar-link">
                <i className="material-icons left tab-bar-icons">place</i>Facilities List</a>
              </li>
              <li>
                <a href="/admin/township/1" className="waves-effect waves-light tab-bar-link">
                <i className="material-icons left tab-bar-icons">event_note</i>Permit List</a>
              </li>
              <li>
                <a href="/admin/township/1" className="waves-effect waves-light tab-bar-link">
                <i className="material-icons left tab-bar-icons">event_available</i>Permit Request List</a>
              </li>
              <li>
                <a href="/admin/township/1" className="waves-effect waves-light tab-bar-link">
                <i className="material-icons left tab-bar-icons">&#xE90D;</i>Inspector Panel</a>
              </li>
              <li>
                <a href="/admin/township/1" className="waves-effect waves-light tab-bar-link">
                <i className="material-icons left tab-bar-icons">&#xE227;</i>Bursar Panel</a>
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
        <Body showHeader={true}>
          <div className="container">
            ID: {this.props.townshipId}
            {this.renderDetailsFlag()}
            <TownshipPanelTiles />
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