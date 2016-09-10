import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form'
import {reset} from 'redux-form';

import {fetchTownshipFacilities, createTownshipFacilities, resetLoading} from '../../../../actions/actions-township-panel.jsx';
import SearchInput, {createFilter} from 'react-search-input';

export const fields = [ 
  'township_code',
  'location_code',
  'location_name',
  'lot_row',
  'lot_number',
  'lot_id',
  'occupied',
  'plate_no',
  'plate_state'
]

const validate = values => {
  const errors = {}
  if (!values.user_id) {
    errors.user_id = 'User ID Required'
  } else if (values.user_id.length > 15) {
    errors.user_id = 'Must be 15 characters or less'
  }
  return errors
}

class TownshipPanelFacilitiesCreate extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  componentDidUpdate() {
    console.log(this.props.townshipFacilitiesCreated)
    if (!this.props.townshipFacilitiesCreated.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess() {
    this.props.setInitialValues();
    this.props.openModal();
    this.props.resetLoading();
    this.props.createModeFalse();
    this.props.resetForm();
  }

  handleSubmit(data) {
    console.log(data)
    this.props.createTownshipFacilities(data);
  }

  render() {
    const {
      fields: {
        township_code,
        location_code,
        location_name,
        lot_row,
        lot_number,
        lot_id,
        occupied,
        plate_no,
        plate_state
      },
      resetForm,
      submitting
    } = this.props

    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)} style={{margin: 0}}>
          <div className="row"/>
          <div className="row">
            <div className="center-align">
              <h4 style={{marginTop: 0}}>Create Township Facility</h4>
              <p className="center-align">Create a township facility by changing the fields.</p>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Location Code</label>
                  <input type="text" placeholder="Location Code" {...location_code}/>
                </div>
              </div>
              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Location Name</label>
                  <input type="text" placeholder="Location Name" {...location_name}/>
                </div>
              </div>
              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Lot Row</label>
                  <input type="text" placeholder="Lot Row" {...lot_row}/>
                </div>
              </div>
              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Lot Number</label>
                  <input type="text" placeholder="Lot Number" {...lot_number}/>
                </div>
              </div>
              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Lot ID</label>
                  <input type="text" placeholder="Lot ID" {...lot_id}/>
                </div>
              </div>
              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Occupied</label>
                  <input type="text" placeholder="Occupied" {...occupied}/>
                </div>
              </div>
              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Plate No.</label>
                  <input type="text" placeholder="Plate No." {...plate_no}/>
                </div>
              </div>
              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Plate State</label>
                  <input type="text" placeholder="Plate State" {...plate_state}/>
                </div>
              </div>
            </div>
          </div>
          <div className="divider" />
          <div className="center-align">
            <a 
            className="modal-trigger waves-effect waves-light btn valign" 
            style={{margin: 10}}
            onClick={() => this.props.createModeFalse()}>Go Back to User List</a>

            <a className="waves-effect waves-light btn btn-yellow" disabled={submitting} onClick={resetForm}>Clear Values</a>

            <button 
            type="submit" 
            style={{margin: 10}}
            disabled={submitting} 
            className="waves-effect waves-light btn btn-green">Save User</button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    townshipFacilitiesFetched: state.townshipFacilitiesFetched,
    townshipFacilitiesCreated: state.townshipFacilitiesCreated
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipFacilities,
    createTownshipFacilities,
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'township-panel-facilities-create',
  fields,
  overwriteOnInitialValuesChange : true
})(TownshipPanelFacilitiesCreate));
