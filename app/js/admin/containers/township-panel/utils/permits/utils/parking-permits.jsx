import React from 'react';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchTownshipParkingPermits} from '../../../../../actions/actions-township-panel.jsx'

import Spinner from '../../../../../common/components/spinner.jsx';

class ParkingPermits extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchTownshipParkingPermits();
  }

  renderPermitsData() {
    let filteredPermits = this.props.townshipParkingPermitsFetched.data.resource;
    return filteredPermits.map((permit) => {
      return( 
        <tr key={permit.id}>
          <td>{permit.township_code}</td>
          <td>{permit.township_name}</td>
          <td>{permit.permit_type}</td>
          <td>{permit.permit_name}</td>
          <td>{permit.covered_locations}</td>
          <td>{permit.cost}</td>
          <td>{permit.year}</td>
          <td>{permit.location_address}</td>
          <td>{permit.active}</td>
          <td>{permit.scheme_type}</td>
        </tr>
      );
    });
  }

  renderPermitsTable() {
    return (
      <div className="township-userlist-container">
        <table className="highlight">
          <thead>
            <tr>
              <th data-field="id">Township Code</th>
              <th data-field="name">Township Name</th>
              <th data-field="price">Permit Type</th>
              <th data-field="price">Permit Name</th>
              <th data-field="price">Covered Locations</th>
              <th data-field="price">Cost</th>
              <th data-field="price">Year</th>
              <th data-field="price">Location Address</th>
              <th data-field="price">Active</th>
              <th data-field="price">Schema Type</th>
            </tr>
          </thead>
          <tbody>
            {this.renderPermitsData()}
          </tbody>
        </table>
      </div>
    ); 
  }

  render() {
    return (
      <div className="col s12">
        <nav style={{marginTop: 40}}>
          <div className="nav-wrapper nav-admin z-depth-2">
            <a className="brand-logo center">Parking Permits</a>
          </div>
        </nav>
        <div className="card">
          {this.props.townshipParkingPermitsFetched.isLoading ? 
              <div className="center-align"> <Spinner /> </div> : this.renderPermitsTable()}   

          <div className="divider"/> 

          <div className="center-align">
            <a
              className="modal-trigger waves-effect waves-light btn valign" 
              style={{margin: 10}}>Add New Parking Permit</a>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    townshipParkingPermitsFetched: state.townshipParkingPermitsFetched
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipParkingPermits
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkingPermits);
