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
  fetchBursarPermitPayment, 
  editBursarPermitPayment, 
  createBursarPermitPayment,  
  resetLoading} from '../../../../actions/actions-bursar-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

import {ajaxSelectizeGet, ajaxDelete} from '../../../../common/components/ajax-selectize.js'
import AdminSelectize from '../../../../common/components/admin-selectize.jsx'

export const fields = [ 
  'id',
  'date_expiry',
  'user_name',
  'permit_approved',
  'rate',
  'pay_method',
  'amount',
  'cashier_id',
  'user_id',
  'twnship_code',
  'twnshp_name',
  'permit_name',
  'permit_type',
  'scheme_type',
  'loc_code',
  'loc_name',
  'duration',
  'duration_period',
  'ip',
  'date_payment'
]

export default class BursarPanelPermitPaymentForm extends React.Component {

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
        this.props.createBursarPermitPayment(data);
        break;
      case "EDIT":
        this.props.editBursarPermitPayment(data, data.id);
        break;
      case "DUPLICATE":
        this.props.createBursarPermitPayment(data);
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
    ajaxSelectizeGet('manage_locations', 'location_code', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('scheme_type', 'scheme_type', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('payment_type', 'pay_method', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('township_users', 'user_id', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('township_users', 'user_name', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('user_vehicles', 'plate_no', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('locations_rate', 'rate', this.selectizeOptionsUpdate);
  }

  componentDidUpdate() {
    if (this.props.bursarPermitPaymentEdited.isLoading) {
      } else if (!this.props.bursarPermitPaymentEdited.isLoading) {
        this.handleSuccess();
      }

    if (this.props.bursarPermitPaymentCreated.isLoading) {
      } else if (!this.props.bursarPermitPaymentEdited.isLoading) {
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
        date_expiry,
        user_name,
        permit_approved,
        rate,
        pay_method,
        amount,
        cashier_id,
        user_id,
        twnship_code,
        twnshp_name,
        permit_name,
        permit_type,
        scheme_type,
        loc_code,
        loc_name,
        duration,
        duration_period,
        ip,
        date_payment
      },
      resetForm,
      submitting,
      dispatch
    } = this.props;

    const fields = [ 
      'id',
      'date_expiry',
      'permit_approved',
      'amount',
      'twnship_code',
      'twnshp_name',
      'permit_name',
      'permit_type',
      'scheme_type',
      'loc_code',
      'loc_name',
      'duration',
      'duration_period',
      'ip',
      'date_payment'
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
                objectKey={'pay_method'} 
                formName={'parking-payment-form'} 
                fieldName={'pay_method'}
                defaultData={this.props.rowData}
                dispatch={dispatch} 
                />

                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'location_code'} 
                formName={'parking-payment-form'} 
                fieldName={'location_code'}
                defaultData={this.props.rowData}
                dispatch={dispatch} 
                />

                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'scheme_type'} 
                formName={'parking-payment-form'} 
                fieldName={'scheme_type'}
                defaultData={this.props.rowData}
                dispatch={dispatch} 
                />

                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'pay_method'} 
                formName={'parking-payment-form'} 
                fieldName={'pay_method'}
                defaultData={this.props.rowData}
                dispatch={dispatch} 
                />

                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'user_id'} 
                formName={'parking-payment-form'} 
                fieldName={'user_id'}
                defaultData={this.props.rowData}
                dispatch={dispatch} 
                />

                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'user_name'} 
                formName={'parking-payment-form'} 
                fieldName={'user_name'}
                defaultData={this.props.rowData}
                dispatch={dispatch} 
                />

                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'plate_no'} 
                formName={'parking-payment-form'} 
                fieldName={'plate_no'}
                defaultData={this.props.rowData}
                dispatch={dispatch} 
                />

                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'rate'} 
                formName={'parking-payment-form'} 
                fieldName={'rate'}
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
    bursarPermitPaymentFetched: state.bursarPermitPaymentFetched,
    bursarPermitPaymentCreated: state.bursarPermitPaymentCreated,
    bursarPermitPaymentEdited: state.bursarPermitPaymentEdited,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchBursarPermitPayment, 
    editBursarPermitPayment, 
    createBursarPermitPayment, 
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'parking-payment-form',
  fields,
  overwriteOnInitialValuesChange : true
})(BursarPanelPermitPaymentForm));