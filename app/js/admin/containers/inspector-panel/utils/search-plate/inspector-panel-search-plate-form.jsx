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
  fetchInspectorPlate, 
  editInspectorPlate, 
  createInspectorPlate,  
  resetLoading} from '../../../../actions/actions-inspector-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

import { ajaxSelectizeGet, ajaxDelete } from '../../../../common/components/ajax-selectize.js'
import AdminSelectize from '../../../../common/components/admin-selectize.jsx'

export const fields = [ 
  'id',
  'parking_type',
  'township_code',
  'location_code',
  'entry_date_time',
  'exit_date_time',
  'expiry_time',
  'max_time',
  'user_id',
  'permit_id',
  'subscription_id',
  'plate_no',
  'pl_state',
  'lat',
  'lng',
  'address1',
  'address2',
  'city',
  'state',
  'zip',
  'country',
  'lot_row',
  'lot_number',
  'ip',
  'parking_token',
  'parking_status',
  'payment_method',
  'parking_rate',
  'parking_units',
  'parking_qty',
  'parking_subtotal',
  'wallet_trx_id',
  'tr_percent',
  'tr_fee',
  'parking_total',
  'ipn_custom',
  'ipn_txn_id',
  'ipn_payment',
  'ipn_status',
  'ipn_address',
]

export default class InspectorSearchPlateForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showEditDuplicateButtons: false,
      parkingLocationCode: null,
      showEditModal: false,
      rowData: null,
      selectizeOptions: {}
    }

    this.tempInputsEdit = this.tempInputsEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.selectizeOptionsUpdate = this.selectizeOptionsUpdate.bind(this);
  }

  handleSubmit(data) {
    
    $('#' + this.props.modalName).closeModal();
    $('#modal-success').openModal();

    switch(this.props.submitType) {
      case "CREATE":
        this.props.createInspectorPlate(data);
        break;
      case "EDIT":
        this.props.editInspectorPlate(data, data.id);
        break;
      case "DUPLICATE":
        this.props.createInspectorPlate(data);
        break;
      default:
        console.log("No valid submit type was provided.");
        break;
    }
  }


  selectizeOptionsUpdate(test, keyName) {
    var optionsDataObject = {[keyName]: test};
    Object.assign(this.state.selectizeOptions, optionsDataObject);
    this.forceUpdate();
  }

  componentWillMount() {
    ajaxSelectizeGet('user_vehicles', 'plate_no', this.selectizeOptionsUpdate);
  }

  componentDidUpdate() {
    if (this.props.inspectorPlateEdited.isLoading) {
      } else if (!this.props.inspectorPlateEdited.isLoading) {
        this.handleSuccess();
      }

    if (this.props.inspectorPlateCreated.isLoading) {
      } else if (!this.props.inspectorPlateEdited.isLoading) {
        this.handleSuccess();
      }
  };

  handleSuccess(){
    this.props.resetLoading();
    this.props.handleSuccess();
  }

  tempInputsEdit(initialValues) {
     const {
      fields: {  
        id,
        parking_type,
        township_code,
        location_code,
        entry_date_time,
        exit_date_time,
        expiry_time,
        max_time,
        user_id,
        permit_id,
        subscription_id,
        plate_no,
        pl_state,
        lat,
        lng,
        address1,
        address2,
        city,
        state,
        zip,
        country,
        lot_row,
        lot_number,
        ip,
        parking_token,
        parking_status,
        payment_method,
        parking_rate,
        parking_units,
        parking_qty,
        parking_subtotal,
        wallet_trx_id,
        tr_percent,
        tr_fee,
        parking_total,
        ipn_custom,
        ipn_txn_id,
        ipn_payment,
        ipn_status,
        ipn_address,
      },
      resetForm,
      submitting,
      dispatch
    } = this.props;

    /*
    const fields = [ 
      'plate_no',
    ]

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
    */
  }

  render() {

    const {
      resetForm,
      submitting,
      dispatch
    } = this.props

    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)} style={{margin: 0}}>
          <div id={this.props.modalName} className="modal modal-fixed-footer">
            <div className="modal-content">

              <div className="row">
                <div className="center-align">
                  <h4>{this.props.modalText}</h4>
                  <p className="center-align">{this.props.modalText} by filling out the fields.</p>
                </div>
              </div>

              <div className="row">

                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'plate_no'} 
                formName={'search-plate-form'} 
                fieldName={'plate_no'}
                defaultData={this.props.rowData}
                dispatch={dispatch} 
                />

                {this.tempInputsEdit(this.props.initialValues)}

              </div>
            </div>
            

            <div className="modal-footer">
              <div className="row marginless-row">
                <div className="col s12 center-align">
                  <button 
                  type="submit" 
                  disabled={submitting} 
                  className="waves-effect waves-light btn">{this.props.modalText}</button>
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
    inspectorPlateFetched: state.inspectorPlateFetched,
    inspectorPlateCreated: state.inspectorPlateCreated,
    inspectorPlateEdited: state.inspectorPlateEdited,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchInspectorPlate, 
    editInspectorPlate, 
    createInspectorPlate, 
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'search-plate-form',
  fields,
  overwriteOnInitialValuesChange : true
})(InspectorSearchPlateForm));

/*

ajaxSelectizeGet('manage_locations', 'location_code', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('scheme_type', 'scheme_type', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('payment_type', 'pay_method', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('user_profile', 'user_id', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('user_profile', 'user_name', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('user_vehicles', 'plate_no', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('locations_rate', 'rate', this.selectizeOptionsUpdate);

*/