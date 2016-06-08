import React from 'react';
import { reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import datetime from 'node-datetime'
import {SimpleSelect} from 'react-selectize'

import {
  fetchTownshipParkingPermits,
  fetchTownshipUsers,
  fetchTownshipPermitTypes,
  createTownshipParkingPermits,
  fetchTownshipFacilities,
  fetchTownshipPermitsList,
  resetLoading} from '../../../../../actions/actions-township-panel.jsx'

import {fetchTownshipSchemeTypes} from '../../../../../actions/actions-township-common.jsx'

import Spinner from '../../../../../common/components/spinner.jsx'

export const fields = [ 
'township_code',
'township_name',
'permit_type',
'permit_name',
'covered_locations',
'cost',
'year',
'location_address',
'active',
'scheme_type']

class ParkingPermits extends React.Component {

  constructor(props) {
    super(props);

    this.renderCreateModal = this.renderCreateModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  componentWillMount() {
    this.props.fetchTownshipParkingPermits();
    this.props.fetchTownshipPermitTypes();
    this.props.fetchTownshipSchemeTypes();
    this.props.fetchTownshipFacilities(this.props.townshipCode);
    this.props.fetchTownshipPermitsList();
    this.props.dispatch(change('parking-permits', 'township_code', this.props.townshipCode));
    this.props.dispatch(change('parking-permits', 'township_name', this.props.townshipCode));

    var dt = datetime.create();
    var formattedDate = dt.format('m-d-Y H:M:S');
    this.props.dispatch(change('parking-permits', 'year', formattedDate));
  }

  componentDidUpdate() {
    if (this.props.townshipParkingPermitsCreated.isLoading) {
    } else if (!this.props.townshipParkingPermitsCreated.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess(){
    this.props.resetLoading();
    $('#modal-parking-permit-create').closeModal();
    this.props.fetchTownshipParkingPermits();
  }

  handleSubmit(data) {
    this.props.createTownshipParkingPermits(data);
  }


  renderCreateModal() {
    const {
      fields: {
        township_code,
        township_name,
        permit_type,
        permit_name,
        covered_locations,
        cost,
        year,
        location_address,
        active,
        scheme_type
      },
      resetForm,
      submitting,
      dispatch
    } = this.props

    var optionsPermitTypes = this.props.townshipPermitTypesFetched.data.resource.map(function(data){
        return {id: data.id, label: data.permit_type, value: data.permit_type}
    });

    var optionsSchemeTypes = this.props.townshipSchemeTypesFetched.data.resource.map(function(data){
        return {id: data.id, label: data.scheme_type, value: data.scheme_type}
    });

    var optionsPermitsList = this.props.townshipPermitsListFetched.data.resource.map(function(data){
        return {id: data.id, label: data.permit_name, value: data.permit_name}
    });

    var optionsLocationName = this.props.townshipFacilitiesFetched.data.resource.map(function(data){
      return {id: data.id, label: data.location_name, value: data.location_name}
    }); 

    var optionsActive = [{label: 'YES', value: 'YES'}, {label: 'NO', value: 'NO'}];

    return(
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <div id="modal-parking-permit-create" className="modal modal-fixed-footer">
          <div className="modal-content">

            <div className="row">
              <div className="center-align">
                <h4>Create a Township Permit</h4>
                <p className="center-align">Create a parking permit by filling out the fields.</p>
              </div>
            </div>

            <div className="row">
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
                  <label>Permit Name</label>
                  <div clasName="input-field col s12">
                    <SimpleSelect 
                    options = {optionsPermitsList} 
                    placeholder = "Permit Name" 
                    theme = "material" 
                    style={{marginTop: 5}}
                    onValueChange = {(value) => {
                      dispatch(change('parking-permits', 'permit_name', value.value)); 
                    }}></SimpleSelect>
                  </div>
                </div>
              </div>
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
                      dispatch(change('parking-permits', 'scheme_type', value.value)); 
                    }}></SimpleSelect>
                  </div>
                </div>
              </div>
              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Covered Locations</label>
                  <div clasName="input-field col s12">
                    <SimpleSelect 
                    options = {optionsLocationName} 
                    placeholder = "Select Covered Locations" 
                    theme = "material" 
                    style={{marginTop: 5}}
                    onValueChange = {(value) => {
                      dispatch(change('parking-permits', 'covered_locations', value.value)); 
                    }}></SimpleSelect>
                  </div>
                </div>
              </div>

              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Active</label>
                  <div clasName="input-field col s12">
                    <SimpleSelect 
                    options = {optionsActive} 
                    placeholder = "Active" 
                    theme = "material" 
                    style={{marginTop: 5}}
                    onValueChange = {(value) => {
                      dispatch(change('parking-permits', 'active', value.value)); 
                    }}></SimpleSelect>
                  </div>
                </div>
              </div>
              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Cost</label>
                  <div className="row marginless-row">
                    <div className="col s1 left-align">
                      <p>$</p>
                    </div>
                    <div className="col s11">
                      <input style={{maxWidth: 250, minWidth: 250}} 
                      id="icon_telephone" type="number" step="any" placeholder="Cost" onChange={(value) => {
                        dispatch(change('parking-permits', 'cost', '$' + value.target.value.toString())); }}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Location Address</label>
                  <input type="text" placeholder="Location Address" {...location_address}/>
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
              <th data-field="price">Scheme Type</th>
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
      <div className="col s12" style={{marginTop: 40, marginBottom: 40}}>
        <nav>
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
              onClick={() => $('#modal-parking-permit-create').openModal()}
              style={{margin: 10}}>Add New Parking Permit</a>
          </div>
           {this.props.townshipPermitTypesFetched.isLoading ||
            this.props.townshipSchemeTypesFetched.isLoading || 
            this.props.townshipFacilitiesFetched.isLoading ||
            this.props.townshipPermitsListFetched.isLoading ? 
            <div> </div> : this.renderCreateModal()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    townshipParkingPermitsFetched: state.townshipParkingPermitsFetched,
    townshipUsersFetched: state.townshipUsersFetched,
    townshipPermitTypesFetched: state.townshipPermitTypesFetched,
    townshipSchemeTypesFetched: state.townshipSchemeTypesFetched,
    townshipParkingPermitsCreated: state.townshipParkingPermitsCreated,
    townshipFacilitiesFetched: state.townshipFacilitiesFetched,
    townshipPermitsListFetched: state.townshipPermitsListFetched,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipParkingPermits,
    fetchTownshipUsers,
    fetchTownshipPermitTypes,
    createTownshipParkingPermits,
    fetchTownshipSchemeTypes,
    fetchTownshipFacilities,
    fetchTownshipPermitsList,
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'parking-permits',
  fields
})(ParkingPermits));


