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
  fetchInspectorTicket, 
  editInspectorTicket, 
  createInspectorTicket,  
  resetLoading} from '../../../../actions/actions-inspector-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

import { ajaxSelectizeGet, ajaxDelete } from '../../../../common/components/ajax-selectize.js'
import AdminSelectize from '../../../../common/components/admin-selectize.jsx'

export const fields = [ 
  'id',
  'town_logo', 
  'plate_no',
  'violation_fee', 
  'violation_detail',  
  'respond_date',  
  'hearing_date',  
  'hearing_location',  
  'date_ticket', 
  'plead_guilty_no_guilty',  
  'v_user_name', 
  'address', 
  'email', 
  'phone', 
  'officer_name',  
  'officer_id',  
  'user_id', 
  'ticket_no', 
  'violation_code',  
  'violation_description', 
  'violation_location',  
  'court_id',  
  'hearing_address', 
  'township_code', 
  'v_user_id', 
  'tkt_status',  
  'signature', 
  'penalty_adjustment',  
  'adjustment_reference',  
  'hearing_hour',  
  'hearing_time',  
  'am_pm', 
  'twp_payment', 
  'paid_amount', 
  'paid_date',
]

export default class InspectorSearchTicketForm extends React.Component {

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
        this.props.createInspectorTicket(data);
        break;
      case "EDIT":
        this.props.editInspectorTicket(data, data.id);
        break;
      case "DUPLICATE":
        this.props.createInspectorTicket(data);
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
    ajaxSelectizeGet('township_users', 'user_id', this.selectizeOptionsUpdate);
  }

  componentDidUpdate() {
    if (this.props.inspectorTicketEdited.isLoading) {
      } else if (!this.props.inspectorTicketEdited.isLoading) {
        this.handleSuccess();
      }

    if (this.props.inspectorTicketCreated.isLoading) {
      } else if (!this.props.inspectorTicketEdited.isLoading) {
        this.handleSuccess();
      }
  };

  componentDidMount() {
    const {
      resetForm,
      submitting,
      dispatch
    } = this.props

    $('.paid_date')
    .bootstrapMaterialDatePicker({ time: true, format : 'YYYY-MM-DD HH:mm:ss' })
    .on('change', function(event) {
      dispatch(change('parking-rules-form', 'paid_date', event.target.value)); 
    });
  }

  handleSuccess(){
    this.props.resetLoading();
    this.props.handleSuccess();
  }

  tempInputsEdit(initialValues) {
     const {
      fields: {  
        id,
        town_logo, 
        plate_no,
        violation_fee, 
        violation_detail,  
        respond_date,  
        hearing_date,  
        hearing_location,  
        date_ticket, 
        plead_guilty_no_guilty,  
        v_user_name, 
        address, 
        email, 
        phone, 
        officer_name,  
        officer_id,  
        user_id, 
        ticket_no, 
        violation_code,  
        violation_description, 
        violation_location,  
        court_id,  
        hearing_address, 
        township_code, 
        v_user_id, 
        tkt_status,  
        signature, 
        penalty_adjustment,  
        adjustment_reference,  
        hearing_hour,  
        hearing_time,  
        am_pm, 
        twp_payment, 
        paid_amount, 
        paid_date,
      },
      resetForm,
      submitting,
      dispatch
    } = this.props;

    const fields = [ 
      'town_logo', 
      'plate_no',
      'violation_fee', 
      'violation_detail',  
      'respond_date',  
      'hearing_date',  
      'hearing_location',  
      'date_ticket', 
      'plead_guilty_no_guilty',  
      'v_user_name', 
      'address', 
      'email', 
      'phone', 
      'officer_name',  
      'officer_id',  
      'user_id', 
      'ticket_no', 
      'violation_code',  
      'violation_description', 
      'violation_location',  
      'court_id',  
      'hearing_address', 
      'township_code', 
      'v_user_id', 
      'tkt_status',  
      'signature', 
      'penalty_adjustment',  
      'adjustment_reference',  
      'hearing_hour',  
      'hearing_time',  
      'am_pm', 
      'twp_payment', 
      'paid_amount', 
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
                objectKey={'user_id'} 
                formName={'search-plate-form'} 
                fieldName={'user_id'}
                defaultData={this.props.rowData}
                dispatch={dispatch} 
                />
                
                {this.tempInputsEdit(this.props.initialValues)}

                <div className="col s6 admin-form-input">
                  <div className="form-group">
                    <label htmlFor="paid_date">paid_date</label>
                    <input id="paid_date" className="paid_date" type="text"/>
                  </div>
                </div>

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
    inspectorTicketFetched: state.inspectorTicketFetched,
    inspectorTicketCreated: state.inspectorTicketCreated,
    inspectorTicketEdited: state.inspectorTicketEdited,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchInspectorTicket, 
    editInspectorTicket, 
    createInspectorTicket, 
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'create-ticket-form',
  fields,
  overwriteOnInitialValuesChange : true
})(InspectorSearchTicketForm));