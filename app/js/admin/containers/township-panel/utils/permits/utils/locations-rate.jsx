import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { reduxForm, change } from 'redux-form'

import {SimpleSelect} from 'react-selectize'

import {
        fetchLocationsRateList, 
        fetchTownshipFacilities,
        fetchTownshipPermitTypes,
        createTownshipLocationsRate,
        resetLoading
      } from '../../../../../actions/actions-township-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../../actions/actions-township-common.jsx'
import {fetchTownshipList} from '../../../../../actions/actions-township.js';

import Spinner from '../../../../../common/components/spinner.jsx';
import {optionsSelectize} from '../../../../../common/components/options-selectize.js';

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

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  componentWillMount() {
    this.props.fetchLocationsRateList();
    this.props.fetchTownshipSchemeTypes();
    this.props.fetchTownshipList();
    this.props.fetchTownshipPermitTypes();
    this.props.fetchTownshipFacilities(this.props.townshipCode);
    this.props.dispatch(change('locations-rate', 'township_code', this.props.townshipCode));
  }


  componentDidUpdate() {
    if (this.props.townshipLocationsRateCreated.isLoading) {
    } else if (!this.props.townshipLocationsRateCreated.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess(){
    this.props.resetLoading();
    $('#modal-locations-rate-create').closeModal();
    this.props.fetchLocationsRateList();
  }

  handleSubmit(data) {
    this.props.createTownshipLocationsRate(data);
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

    var optionsSchemeTypes = optionsSelectize(this.props.townshipSchemeTypesFetched.data.resource, 'scheme_type');

    var optionsExactAddress = optionsSelectize(this.props.townshipListFetched.data.resource, 'address');

    var optionsTownshipName = optionsSelectize(this.props.townshipListFetched.data.resource, 'lot_manager');

    var optionsLocationCode = optionsSelectize(this.props.townshipFacilitiesFetched.data.resource, 'location_code');

    var optionsLocationName = optionsSelectize(this.props.townshipFacilitiesFetched.data.resource, 'location_name');

    var optionsPermitTypes = optionsSelectize(this.props.townshipPermitTypesFetched.data.resource, 'permit_type');

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

              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Scheme Type</label>
                  <div clasName="input-field col s12">
                    <SimpleSelect 
                    options = {optionsSchemeTypes} 
                    placeholder = "Select Scheme Type" 
                    theme = "material" 
                    style={{marginTop: 5}}
                    onValueChange = {(value) => {
                      dispatch(change('locations-rate', 'scheme_type', value.value)); 
                    }}></SimpleSelect>
                  </div>
                </div>
              </div>

              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Permit Type</label>
                  <div clasName="input-field col s12">
                    <SimpleSelect 
                    options = {optionsPermitTypes} 
                    placeholder = "Select Permit Type" 
                    theme = "material" 
                    style={{marginTop: 5}}
                    onValueChange = {(value) => {
                      dispatch(change('parking-permits', 'permit_type', value.value)); 
                    }}></SimpleSelect>
                  </div>
                </div>
              </div>

              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Location Code</label>
                  <div clasName="input-field col s12">
                    <SimpleSelect 
                    options = {optionsLocationCode} 
                    placeholder = "Select Location Code" 
                    theme = "material" 
                    style={{marginTop: 5}}
                    onValueChange = {(value) => {
                      dispatch(change('locations-rate', 'location_code', value.value)); 
                    }}></SimpleSelect>
                  </div>
                </div>
              </div>

              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Location Name</label>
                  <div clasName="input-field col s12">
                    <SimpleSelect 
                    options = {optionsLocationName} 
                    placeholder = "Select Name" 
                    theme = "material" 
                    style={{marginTop: 5}}
                    onValueChange = {(value) => {
                      dispatch(change('locations-rate', 'location_name', value.value)); 
                    }}></SimpleSelect>
                  </div>
                </div>
              </div>

              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Exact Address</label>
                  <div clasName="input-field col s12">
                    <SimpleSelect 
                    options = {optionsExactAddress} 
                    placeholder = "Select Exact Address" 
                    theme = "material" 
                    style={{marginTop: 5}}
                    onValueChange = {(value) => {
                      dispatch(change('locations-rate', 'exact_address', value.value)); 
                    }}></SimpleSelect>
                  </div>
                </div>
              </div>

              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Township Name</label>
                  <div clasName="input-field col s12">
                    <SimpleSelect 
                    options = {optionsTownshipName} 
                    placeholder = "Select Township Name" 
                    theme = "material" 
                    style={{marginTop: 5}}
                    onValueChange = {(value) => {
                      dispatch(change('locations-rate', 'township_name', value.value)); 
                    }}></SimpleSelect>
                  </div>
                </div>
              </div>

              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Max Period</label>
                  <input type="text" placeholder="Max Period" {...max_period}/>
                </div>
              </div>

              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Location ID</label>
                  <input type="text" placeholder="Location ID" {...location_id}/>
                </div>
              </div>

              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Scheme</label>
                  <input type="text" placeholder="Scheme" {...scheme}/>
                </div>
              </div>

              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Location Map (lat / long)</label>
                  <input type="text" placeholder="Location Map (lat / long)" {...location_map}/>
                </div>
              </div>

              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Rate</label>
                  <div className="row marginless-row">
                    <div className="col s1 left-align">
                      <p>$</p>
                    </div>
                    <div className="col s11">
                      <input style={{maxWidth: 250, minWidth: 250}} 
                      id="icon_telephone" type="number" step="any" placeholder="Cost" onChange={(value) => {
                        dispatch(change('locations-rate', 'rate', '$' + value.target.value.toString())); }}/>
                    </div>
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
                className="waves-effect waves-light btn">Create Location Rate</button>
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
    console.log('test')
    console.log(this.props.townshipLocationsRateCreated)
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
        { this.props.townshipSchemeTypesFetched.isLoading ||
          this.props.townshipListFetched.isLoading ||
          this.props.townshipPermitTypesFetched.isLoading ||
          this.props.townshipFacilitiesFetched.isLoading ? 
            <div> </div> : this.renderCreateModal()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    townshipLocationsRateFetched: state.townshipLocationsRateFetched,
    townshipSchemeTypesFetched: state.townshipSchemeTypesFetched,
    townshipListFetched: state.townshipListFetched,
    townshipFacilitiesFetched: state.townshipFacilitiesFetched,
    townshipPermitTypesFetched: state.townshipPermitTypesFetched,
    townshipLocationsRateCreated: state.townshipLocationsRateCreated,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchLocationsRateList,
    fetchTownshipSchemeTypes,
    fetchTownshipList,
    fetchTownshipFacilities,
    fetchTownshipPermitTypes,
    createTownshipLocationsRate,
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'locations-rate',
  fields
})(LocationsRate));


