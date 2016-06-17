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
  fetchParkingRules, 
  editParkingRules, 
  createParkingRules, 
  fetchTownshipLocations, 
  resetLoading} from '../../../../actions/actions-township-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

export const fields = [   
  'id',
  'date_time', 
  'location_code', 
  'location_name', 
  'time_rule', 
  'day_rule',  
  'max_time',  
  'enforced',  
  'date_special_enforce',  
  'custom_notice', 
  'active',
  'date',  
  'city',  
  'state', 
  'pricing', 
  'pricing_duration', 
  'zip_code',  
  'start_time',  
  'end_time',  
  'this_day',  
  'parking_times', 
  'no_parking_times',  
  'start_end_rule',  
  'this_hour', 
  'max_hours', 
  'start_hour',  
  'end_hour',
]

export default class TownshipPanelParkingRulesEdit extends React.Component {

  constructor(props) {
    super(props);

    this.tempInputsEdit = this.tempInputsEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleDuplicateSubmit = this.handleDuplicateSubmit.bind(this);
  }

  handleSubmit(data) {
    this.props.editParkingRules(data, data.id);
  }

  handleDuplicateSubmit(data) {
    this.props.createParkingRules(data);
  }

  componentDidUpdate() {
    if (this.props.townshipParkingRulesEdited.isLoading) {
      } else if (!this.props.townshipParkingRulesEdited.isLoading) {
        this.handleSuccess();
      }

    if (this.props.townshipParkingRulesCreated.isLoading) {
      } else if (!this.props.townshipParkingRulesEdited.isLoading) {
        this.handleSuccess();
      }
  };

  handleSuccess(){
    this.props.resetLoading();
    $('#modal-township-facilities-edit').closeModal();
    $('#modal-township-facilities-duplicate').closeModal();
    $('#modal-success').openModal();
    this.props.handleSuccess();
  }

  tempInputsEdit(initialValues) {
     const {
      fields: {  
        id,
        date_time, 
        location_code, 
        location_name, 
        time_rule, 
        day_rule,  
        max_time,  
        enforced,  
        date_special_enforce,  
        custom_notice, 
        active,
        date,  
        city,  
        state, 
        pricing, 
        pricing_duration, 
        zip_code,  
        start_time,  
        end_time,  
        this_day,  
        parking_times, 
        no_parking_times,  
        start_end_rule,  
        this_hour, 
        max_hours, 
        start_hour,  
        end_hour,
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
        date_time, 
        location_code, 
        location_name, 
        time_rule, 
        day_rule,  
        max_time,  
        enforced,  
        date_special_enforce,  
        custom_notice, 
        active,
        date,  
        city,  
        state, 
        pricing, 
        pricing_duration, 
        zip_code,  
        start_time,  
        end_time,  
        this_day,  
        parking_times, 
        no_parking_times,  
        start_end_rule,  
        this_hour, 
        max_hours, 
        start_hour,  
        end_hour,
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
          <div id="modal-township-parking-rules-edit" className="modal modal-fixed-footer">
            <div className="modal-content">

              <div className="row">
                <div className="center-align">
                  <h4>Edit a Parking Rule</h4>
                  <p className="center-align">Edit a Parking Rule by filling out the fields.</p>
                </div>
              </div>

              <div className="row">

                {this.tempInputsEdit(this.props.initialValues)}

              </div>
            </div>
            

            <div className="modal-footer">
              <div className="row marginless-row">
                <div className="col s12 center-align">
                  <button fetchTownshipFacilitie
                  type="submit" 
                  disabled={submitting} 
                  className="waves-effect waves-light btn">Edit Parking Rule</button>
                </div>
              </div>
            </div>
          </div>
        </form>

        <form onSubmit={this.props.handleSubmit(this.handleDuplicateSubmit)} style={{margin: 0}}>
          <div id="modal-township-parking-rules-duplicate" className="modal modal-fixed-footer">
            <div className="modal-content">

              <div className="row">
                <div className="center-align">
                  <h4>Duplicate a Parking Rule</h4>
                  <p className="center-align">Duplicate a Parking Rule by filling out the fields.</p>
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
                  className="waves-effect waves-light btn">Duplicate Parking Rule</button>
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
    townshipParkingRulesFetched: state.townshipParkingRulesFetched,
    townshipParkingRulesCreated: state.townshipParkingRulesCreated,
    townshipLocationsFetched: state.townshipLocationsFetched,
    townshipSchemeTypesFetched: state.townshipSchemeTypesFetched,
    townshipParkingRulesEdited: state.townshipParkingRulesEdited,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchParkingRules,
    editParkingRules,
    fetchTownshipLocations,
    resetLoading,
    fetchTownshipSchemeTypes,
    createParkingRules
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'parking-rules-edit',
  fields,
  overwriteOnInitialValuesChange : true
})(TownshipPanelParkingRulesEdit));