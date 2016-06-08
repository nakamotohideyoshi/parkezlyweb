import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { reduxForm, change } from 'redux-form'

import {SimpleSelect} from 'react-selectize'

import {fetchLocationsRateList} from '../../../../../actions/actions-township-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../../actions/actions-township-common.jsx'

import Spinner from '../../../../../common/components/spinner.jsx';

export const fields = [ 
'exact_address',
'township_id',
'township_code',
'location_id',
'location_code',
'scheme',
'rate',
'location_name',
'location_map',
'max_period',
'township_name',
'scheme_type',
'permit_type']

class LocationsRate extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchLocationsRateList();
    this.props.fetchTownshipSchemeTypes();
  }


  handleSubmit(data) {

  }

  renderCreateModal() {
     const {
      fields: {
        exact_address,
        township_id,
        township_code,
        location_id,
        location_code,
        scheme,
        rate,
        location_name,
        location_map,
        max_period,
        township_name,
        scheme_type,
        permit_type,
      },
      resetForm,
      submitting,
      dispatch
    } = this.props

    var optionsSchemeTypes = this.props.townshipSchemeTypesFetched.data.resource.map(function(data){
        return {id: data.id, label: data.scheme_type, value: data.scheme_type}
    });

    return (
       <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <div id="modal-locations-rate-create" className="modal modal-fixed-footer">
          <div className="modal-content">

            <div className="row">
              <div className="center-align">
                <h4>Create a Location Rate</h4>
                <p className="center-align">Create a location rate by filling out the fields.</p>
              </div>
            </div>

            <div className="row">

              <div className="col s6">
                <div className="form-group">
                  <label>Scheme Type</label>
                  <div clasName="input-field col s12">
                    <SimpleSelect 
                    options = {optionsSchemeTypes} 
                    placeholder = "Select Scheme Type" 
                    theme = "material" 
                    style={{marginTop: 5}}
                    onValueChange = {(value) => {
                      dispatch(change('parking-permits', 'scheme_type', value.value)); 
                    }}></SimpleSelect>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="modal-footer">
            <div className="row marginless-row">
              <div className="col s8">
                <button 
                type="submit" 
                disabled={submitting} 
                className="waves-effect waves-light btn">Create Permit Type</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }

  renderPermitsData() {
    let filteredPermits = this.props.townshipLocationsRateFetched.data.resource;
    return filteredPermits.map((permit) => {
      return( 
        <tr key={permit.id}>
          <td>{permit.exact_address}</td>
          <td>{permit.township_id}</td>
          <td>{permit.township_code}</td>
          <td>{permit.location_id}</td>
          <td>{permit.location_code}</td>
          <td>{permit.scheme}</td>
          <td>{permit.rate}</td>
          <td>{permit.location_name}</td>
          <td>{permit.location_map}</td>
          <td>{permit.max_period}</td>
          <td>{permit.township_name}</td>
          <td>{permit.scheme_type}</td>
          <td>{permit.permit_type}</td>
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
              <th data-field="id">Exact Address</th>
              <th data-field="id">Township ID</th>
              <th data-field="id">Township Code </th>
              <th data-field="id">Location ID</th>
              <th data-field="id">Location Code</th>
              <th data-field="id">Scheme</th>
              <th data-field="id">Rate</th>
              <th data-field="id">Location Name</th>
              <th data-field="id">Location Map</th>
              <th data-field="id">Max Period</th>
              <th data-field="id">Township Name</th>
              <th data-field="id">Scheme Type</th>
              <th data-field="id">Permit Type</th>
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
      <div style={{marginTop: 40, marginBottom: 40}} className="col s12">
        <nav>
          <div className="nav-wrapper nav-admin z-depth-2">
            <a className="brand-logo center">Locations Rate</a>
          </div>
        </nav>
        <div className="card">
          {this.props.townshipLocationsRateFetched.isLoading ? 
              <div className="center-align"> <Spinner /> </div> : this.renderPermitsTable()}   

          <div className="divider"/> 

          <div className="center-align">
            <a
              className="modal-trigger waves-effect waves-light btn valign" 
              onClick={() => $('#modal-locations-rate-create').openModal()}
              style={{margin: 10}}>Add New Location Rate</a>
          </div>
        </div>
        {this.props.townshipSchemeTypesFetched.isLoading ? 
            <div> </div> : this.renderCreateModal()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    townshipLocationsRateFetched: state.townshipLocationsRateFetched,
    townshipSchemeTypesFetched: state.townshipSchemeTypesFetched,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchLocationsRateList,
    fetchTownshipSchemeTypes
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'parking-permits',
  fields
})(LocationsRate));


