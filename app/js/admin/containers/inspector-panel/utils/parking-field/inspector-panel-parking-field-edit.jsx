import React from 'react';
import { reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import datetime from 'node-datetime'
import {SimpleSelect} from "react-selectize"
import { browserHistory } from 'react-router'
import {createFilter} from 'react-search-input';

import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'
import {optionsSelectize} from '../../../../common/components/options-selectize.js'

import {
  fetchInspectorParkingField, 
  editInspectorParkingField, 
  createInspectorParkingField, 
  fetchTownshipLocations, 
  resetLoading} from '../../../../actions/actions-inspector-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

export const fields = [   
  'id',  
  'expiry_time', 
  'user_id', 
  'user_name', 
  'location_address',  
  'google_map',  
  'parking_scheme',  
  'rate',  
  'payment_method',  
  'location_name', 
  'vehicle_image', 
  'township_code', 
  'scheme_type', 
  'my_permit', 
  'my_wallet', 
  'payment', 
  'ipn_txn_id',  
  'pay_method',  
  'ipn_payment', 
  'ipn_status',  
  'parking_status',  
  'entry_time',  
  'exit_time', 
  'ip',  
  'upark', 
  'lot_row', 
  'lot_number',  
  'my_timer1', 
  'qrcode',  
  'change_defaults', 
  'township_rules',  
  'pl_state',  
  'token',
]

export default class InspectorPanelParkingFieldEdit extends React.Component {

  constructor(props) {
    super(props);

    this.tempInputsEdit = this.tempInputsEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleDuplicateSubmit = this.handleDuplicateSubmit.bind(this);
  }

  handleSubmit(data) {
    console.log(data.id)
    this.props.editInspectorParkingField(data, data.id);
  }

  handleDuplicateSubmit(data) {
    this.props.createInspectorParkingField(data);
  }

  componentDidUpdate() {
    if (this.props.inspectorParkingFieldEdited.isLoading) {
      } else if (!this.props.inspectorParkingFieldEdited.isLoading) {
        this.handleSuccess();
      }

    if (this.props.inspectorParkingFieldCreated.isLoading) {
      } else if (!this.props.inspectorParkingFieldEdited.isLoading) {
        this.handleSuccess();
      }
  };

  handleSuccess(){
    this.props.resetLoading();
    $('#modal-inspector-parking-field-duplicate').closeModal();
    $('#modal-inspector-parking-field-edit').closeModal();
    $('#modal-success').openModal();
    this.props.handleSuccess();
  }

  tempInputsEdit(initialValues) {
     const {
      fields: {  
        id,  
        expiry_time, 
        user_id, 
        user_name, 
        location_address,  
        google_map,  
        parking_scheme,  
        rate,  
        payment_method,  
        location_name, 
        vehicle_image, 
        township_code, 
        scheme_type, 
        my_permit, 
        my_wallet, 
        payment, 
        ipn_txn_id,  
        pay_method,  
        ipn_payment, 
        ipn_status,  
        parking_status,  
        entry_time,  
        exit_time, 
        ip,  
        upark, 
        lot_row, 
        lot_number,  
        my_timer1, 
        qrcode,  
        change_defaults, 
        township_rules,  
        pl_state,  
        token,
      },
      resetForm,
      submitting,
      dispatch
    } = this.props;

    
    return fields.map((data) => {
      return( 
        <div className="col s6 admin-form-input">
          <div className="form-group">
            <label>{data}</label>
            <input type="text" placeholder={data} {...this.props.fields[data]}/>
          </div>
        </div>
      );
    }); 
  }

  tempInputsDuplicate(initialValues) {
     const {
      fields: {  
        id,  
        expiry_time, 
        user_id, 
        user_name, 
        location_address,  
        google_map,  
        parking_scheme,  
        rate,  
        payment_method,  
        location_name, 
        vehicle_image, 
        township_code, 
        scheme_type, 
        my_permit, 
        my_wallet, 
        payment, 
        ipn_txn_id,  
        pay_method,  
        ipn_payment, 
        ipn_status,  
        parking_status,  
        entry_time,  
        exit_time, 
        ip,  
        upark, 
        lot_row, 
        lot_number,  
        my_timer1, 
        qrcode,  
        change_defaults, 
        township_rules,  
        pl_state,  
        token,
      },
      resetForm,
      submitting,
      dispatch
    } = this.props;

    
    return fields.map((data) => {
      return( 
        <div className="col s6 admin-form-input">
          <div className="form-group">
            <label>{data}</label>
            <input type="text" placeholder={data} {...this.props.fields[data]}/>
          </div>
        </div>
      );
    }); 
  }

  render() {
    const {
      resetForm,
      submitting,
      dispatch
    } = this.props
    // onSubmit={this.props.handleSubmit(this.handleSubmit)}
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)} style={{margin: 0}}>
          <div id="modal-inspector-parking-field-edit" className="modal modal-fixed-footer">
            <div className="modal-content">

              <div className="row">
                <div className="center-align">
                  <h4>Edit a Parking Field</h4>
                  <p className="center-align">Edit a Parking Field by filling out the fields.</p>
                </div>
              </div>

              <div className="row">

                {this.tempInputsEdit(this.props.initialValues)}

              </div>
            </div>
            

            <div className="modal-footer">
              <div className="row marginless-row">
                <div className="col s12 center-align">
                  <button 
                  type="submit" 
                  disabled={submitting} 
                  className="waves-effect waves-light btn">Edit Parking Field</button>
                </div>
              </div>
            </div>
          </div>
        </form>

        <form onSubmit={this.props.handleSubmit(this.handleDuplicateSubmit)} style={{margin: 0}}>
          <div id="modal-inspector-parking-field-duplicate" className="modal modal-fixed-footer">
            <div className="modal-content">

              <div className="row">
                <div className="center-align">
                  <h4>Duplicate a Parking Field</h4>
                  <p className="center-align">Duplicate a Parking Field by filling out the fields.</p>
                </div>
              </div>

              <div className="row">
                {this.tempInputsDuplicate(this.props.initialValues)}
              </div>
            </div>
            

            <div className="modal-footer">
              <div className="row marginless-row">
                <div className="col s12 center-align">
                  <button fetchTownshipFacilitie
                  type="submit" 
                  disabled={submitting} 
                  className="waves-effect waves-light btn">Duplicate Parking Field</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    inspectorParkingFieldFetched: state.inspectorParkingFieldFetched,
    inspectorParkingFieldCreated: state.inspectorParkingFieldCreated,
    townshipLocationsFetched: state.townshipLocationsFetched,
    townshipSchemeTypesFetched: state.townshipSchemeTypesFetched,
    inspectorParkingFieldEdited: state.inspectorParkingFieldEdited,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchInspectorParkingField,
    editInspectorParkingField,
    fetchTownshipLocations,
    resetLoading,
    fetchTownshipSchemeTypes,
    createInspectorParkingField
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'parking-field-edit',
  fields,
  overwriteOnInitialValuesChange : true
})(InspectorPanelParkingFieldEdit));