import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form'
import {reset} from 'redux-form';

import {fetchTownshipUsers, editTownshipFacilities, resetLoading} from '../../../../actions/actions-township-panel.jsx';
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
    errors.user_id = 'Required'
  } else if (values.user_id.length > 15) {
    errors.user_id = 'Must be 15 characters or less'
  }
  return errors
}

class TownshipPanelFacilitiesEdit extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  componentDidUpdate() {
    if (!this.props.townshipFacilitiesEdited.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess() {
    this.props.setInitialValues();
    this.props.openModal();
    this.props.resetLoading();
    this.props.editModeFalse();
    this.props.resetForm();
  }

  handleSubmit(data) {
    this.props.editTownshipFacilities(data, this.props.facilityId);
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
              <h4 style={{marginTop: 0}}>Edit Township Facility</h4>
              <p className="center-align">Edit a township facility by changing the fields.</p>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col s6">
                <div className="form-group">
                  <label>Location Code</label>
                  <input type="text" placeholder="Location Code" {...location_code}/>
                </div>
              </div>
              <div className="col s6">
                <div className="form-group">
                  <label>Location Name</label>
                  <input type="text" placeholder="Location Name" {...location_name}/>
                </div>
              </div>
              <div className="col s6">
                <div className="form-group">
                  <label>Lot Row</label>
                  <input type="text" placeholder="Lot Row" {...lot_row}/>
                </div>
              </div>
              <div className="col s6">
                <div className="form-group">
                  <label>Lot Number</label>
                  <input type="text" placeholder="Lot Number" {...lot_number}/>
                </div>
              </div>
              <div className="col s6">
                <div className="form-group">
                  <label>Lot ID</label>
                  <input type="text" placeholder="Lot ID" {...lot_id}/>
                </div>
              </div>
              <div className="col s6">
                <div className="form-group">
                  <label>Occupied</label>
                  <input type="text" placeholder="Occupied" {...occupied}/>
                </div>
              </div>
              <div className="col s6">
                <div className="form-group">
                  <label>Plate No.</label>
                  <input type="text" placeholder="Plate No." {...plate_no}/>
                </div>
              </div>
              <div className="col s6">
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
            onClick={() => this.props.editModeFalse()}>Go Back to Facilities List</a>

            <button 
            type="submit" 
            style={{margin: 10}}
            disabled={submitting} 
            className="waves-effect waves-light btn btn-green">Save Facility</button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    townshipFacilitiesFetched: state.townshipFacilitiesFetched,
    townshipFacilitiesEdited: state.townshipFacilitiesEdited,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipUsers,
    editTownshipFacilities,
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'township-panel-users-edit',
  fields,
  overwriteOnInitialValuesChange : true
})(TownshipPanelFacilitiesEdit));