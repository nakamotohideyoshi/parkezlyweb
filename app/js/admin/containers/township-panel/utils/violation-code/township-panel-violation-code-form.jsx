import React from 'react';
import { reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import moment from 'moment'
import {SimpleSelect} from "react-selectize"
import { browserHistory } from 'react-router'
import {createFilter} from 'react-search-input';


import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'
import {optionsSelectize} from '../../../../common/components/options-selectize.js'

import {
  fetchViolationCode, 
  editViolationCode, 
  createViolationCode,  
  resetLoading} from '../../../../actions/actions-township-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

import { ajaxSelectizeGet, ajaxDelete } from '../../../../common/components/ajax-selectize.js'
import AdminSelectize from '../../../../common/components/admin-selectize.jsx'

import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";

export const fields = [ 
  'id',
  'date_time', 
  'violation_code',  
  'violation_description', 
  'violation_fee', 
  'township_code', 
  'violation_detail',  
  'section_law', 
  'section_num', 
  'state',
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

    this.props.dispatch(change('violation-code-form', 'date_time', moment().format('YYYY-MM-DD HH:mm:ss')));
  }

  handleSubmit(data) {
    
    $('#' + this.props.modalName).closeModal();
    $('#modal-success').openModal();

    switch(this.props.submitType) {
      case "CREATE":
        this.props.createViolationCode(data);
        break;
      case "EDIT":
        this.props.editViolationCode(data, data.id);
        break;
      case "DUPLICATE":
        this.props.createViolationCode(data);
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
    ajaxSelectizeGet('townships_manager', 'manager_id', this.selectizeOptionsUpdate);
  }

  componentDidUpdate() {
    if (this.props.townshipViolationCodeEdited.isLoading) {
      } else if (!this.props.townshipViolationCodeEdited.isLoading) {
        this.handleSuccess();
      }

    if (this.props.townshipViolationCodeCreated.isLoading) {
      } else if (!this.props.townshipViolationCodeEdited.isLoading) {
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
        date_time, 
        violation_code,  
        violation_description, 
        violation_fee, 
        township_code, 
        violation_detail,  
        section_law, 
        section_num, 
        state,
      },
      resetForm,
      submitting,
      dispatch
    } = this.props;

    const fields = [ 
      'id',
      'date_time', 
      'violation_code',  
      'violation_description', 
      'violation_fee', 
      'township_code', 
      'violation_detail',  
      'section_law', 
      'section_num', 
      'state',
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

    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });


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
                objectKey={'manager_id'} 
                formName={'violation-code-form'} 
                fieldName={'township_code'}
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
    townshipViolationCodeFetched: state.townshipViolationCodeFetched,
    townshipViolationCodeCreated: state.townshipViolationCodeCreated,
    townshipViolationCodeEdited: state.townshipViolationCodeEdited,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchViolationCode, 
    editViolationCode, 
    createViolationCode, 
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'violation-code-form',
  fields,
  overwriteOnInitialValuesChange : true
})(InspectorSearchTicketForm));

/*

<div className="col s6 admin-form-input">
  <div className="form-group">
    <input type="date" className="datepicker" />
  </div>
</div>

*/