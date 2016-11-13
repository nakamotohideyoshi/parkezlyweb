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

import { ajaxSelectizeGet, ajaxDelete, ajaxGet } from '../../../../common/components/ajax-selectize.js'
import AdminSelectize from '../../../../common/components/admin-selectize.jsx'

import axios from 'axios'
import _ from 'lodash'

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

class InspectorSearchTicketForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showEditDuplicateButtons: false,
      parkingLocationCode: null,
      showEditModal: false,
      rowData: null,
      selectizeOptions: {},
      violationData: null,
      hearingData: null,
      userData: null,
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
        //data = _.omit(data, 'id');
        this.props.createInspectorTicket(data);
        axios.post('/api/notify-parking-ticket', data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((response) => {
          console.log(response.data);
        })
        break;
      case "EDIT":
        this.props.editInspectorTicket(data, data.id);
        break;
      case "DUPLICATE":
        //data = _.omit(data, 'id');
        this.props.createInspectorTicket(data);
        axios.post('/api/notify-parking-ticket', data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((response) => {
          console.log(response.data);
        })
        break;
      default:
        console.log("No valid submit type was provided.");
        break;
    }
  }


  selectizeOptionsUpdate(valueName, keyName) {
    var optionsDataObject = {[keyName]: valueName};
    Object.assign(this.state.selectizeOptions, optionsDataObject);
    this.forceUpdate();
  }

  componentWillMount() {
    ajaxGet('user_profile', (table) => {
      console.log(table.data.resource)
      this.setState({userData: table.data.resource});
    });
    ajaxGet(`violation_code?filter=(township_code=${this.props.townshipCode})`, (table) => {
      console.log(table.data.resource)
      this.setState({violationData: table.data.resource});
    });
    ajaxGet(`hearing_place_info?filter=(township_code=${this.props.townshipCode})`, (table) => {
      console.log(table.data.resource)
      this.setState({hearingData: table.data.resource});
    });
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

    let hearingData;
    let violationData;
    let userData;

    if(this.state.hearingData != null) {
      hearingData = this.state.hearingData.map((data)=> {
          return {label: _.truncate(data.hearing_location, {'length': 20}), value: data};
      })
    }

    if(this.state.violationData != null) {
      violationData = this.state.violationData.map((data)=> {
          return {label: data.violation_code, value: data};
      })
    }

    if(this.state.userData != null) {
      userData = this.state.userData.map((data)=> {
          console.log(data)
          return {label: String(data.user_id), value: data};
      })
    }
   
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
                { this.state.violationData === null ? 
                <div> Loading... </div>
                :
                <div className="col s6 admin-form-input">
                  <div className="form-group">
                    <label>Violation Code</label>
                    <div clasName="input-field col s12">
                      <SimpleSelect 
                        options = {violationData} 
                        placeholder = "Violation Code"
                        theme = "material"
                        style={{marginTop: 5}}
                        transitionEnter = {true} 
                        createFromSearch={function(options, search){
                            // only create an option from search if the length of the search string is > 0 and
                            // it does no match the label property of an existing option
                            if (search.length == 0 || (options.map(function(option){
                                return option.label;
                            })).indexOf(search) > -1)
                                return null;
                            else
                                return {label: search, value: search};
                        }}
                        onValueChange = {(value) => {
                          let violationObject = value.value
                          if (!!value && !!value.newOption) {
                              self.state.options.unshift({label: value.label, value: value.value});
                              self.setState({options: self.state.options});
                          }
                          dispatch(change('create-ticket-form', 'violation_code', violationObject.violation_code)); 
                          dispatch(change('create-ticket-form', 'violation_fee', violationObject.violation_fee)); 
                          dispatch(change('create-ticket-form', 'violation_detail', violationObject.violation_detail)); 
                          dispatch(change('create-ticket-form', 'violation_description', violationObject.violation_description)); 
                        }}/>
                    </div>
                  </div>
                </div>
                }
                { this.state.hearingData === null ? 
                <div> Loading... </div>
                :
                <div className="col s6 admin-form-input">
                  <div className="form-group">
                    <label>Hearing Location</label>
                    <div clasName="input-field col s12">
                      <SimpleSelect 
                        options = {hearingData} 
                        placeholder = "Violation Code"
                        theme = "material"
                        style={{marginTop: 5}}
                        transitionEnter = {true} 
                        createFromSearch={function(options, search){
                            // only create an option from search if the length of the search string is > 0 and
                            // it does no match the label property of an existing option
                            if (search.length == 0 || (options.map(function(option){
                                return option.label;
                            })).indexOf(search) > -1)
                                return null;
                            else
                                return {label: search, value: search};
                        }}
                        onValueChange = {(value) => {
                          if (!!value && !!value.newOption) {
                              self.state.options.unshift({label: value.label, value: value.value});
                              self.setState({options: self.state.options});
                          }
                          let hearingObject = value.value
                          dispatch(change('create-ticket-form', 'hearing_location', hearingObject.hearing_location)); 
                          dispatch(change('create-ticket-form', 'court_id', hearingObject.court_id)); 
                          dispatch(change('create-ticket-form', 'hearing_address', hearingObject.hearing_address)); 
                        }}/>
                    </div>
                  </div>
                </div>
                }

                { this.state.userData === null ? 
                <div> Loading... </div>
                :
                <div className="col s6 admin-form-input">
                  <div className="form-group">
                    <label>User Profile</label>
                    <div clasName="input-field col s12">
                      <SimpleSelect 
                        options = {userData} 
                        placeholder = "Violation Code"
                        theme = "material"
                        style={{marginTop: 5}}
                        transitionEnter = {true} 
                        onValueChange = {(value) => {
                          let userObject = value.value
                          dispatch(change('create-ticket-form', 'address', userObject.address)); 
                          dispatch(change('create-ticket-form', 'phone', userObject.phone)); 
                          dispatch(change('create-ticket-form', 'user_address', userObject.user_address)); 
                        }}/>
                    </div>
                  </div>
                </div>
                }
                
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