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
  fetchParkingRules, 
  editParkingRules, 
  createParkingRules,  
  resetLoading} from '../../../../actions/actions-township-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

import { ajaxSelectizeGet, ajaxDelete } from '../../../../common/components/ajax-selectize.js'
import AdminSelectize from '../../../../common/components/admin-selectize.jsx'
import {countries, states} from '../../../../constants/countries.js'

export const fields = [ 
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

export default class TownshipPanelParkingRulesForm extends React.Component {

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
    this.props.dispatch(change('parking-rules-form', 'date_time', moment().format('YYYY-MM-DD HH:mm:ss')));

    switch(this.props.submitType) {
      case "CREATE":
        this.props.createParkingRules(data);
        break;
      case "EDIT":
        this.props.editParkingRules(data, data.id);
        break;
      case "DUPLICATE":
        this.props.createParkingRules(data);
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
    ajaxSelectizeGet('locations_rate', 'rate', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('location_lot', 'location_code', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('location_lot', 'location_name', this.selectizeOptionsUpdate);
  }

  componentDidMount() {
    const {
      resetForm,
      submitting,
      dispatch
    } = this.props

    $('.start_time')
    .bootstrapMaterialDatePicker({ date: false, format : 'HH:mm:ss' })
    .on('change', function(event) {
      dispatch(change('parking-rules-form', 'start_time', event.target.value)); 
    });

    $('.end_time')
    .bootstrapMaterialDatePicker({ date: false, format : 'HH:mm:ss' })
    .on('change', function(event) {
      dispatch(change('parking-rules-form', 'end_time', event.target.value)); 
    });

    $('.date')
    .bootstrapMaterialDatePicker({ time: false, format : 'YYYY-MM-DD' })
    .on('change', function(event) {
      dispatch(change('parking-rules-form', 'date', event.target.value)); 
    });

    $('.date_time')
    .bootstrapMaterialDatePicker({ time: true, format : 'YYYY-MM-DD HH:mm:ss' })
    .on('change', function(event) {
      dispatch(change('parking-rules-form', 'date_time', event.target.value)); 
    });
  }

  componentDidUpdate() {
    if (this.props.townshipParkingRulesCreated.isLoading) {
      } else if (!this.props.townshipParkingRulesCreated.isLoading) {
        this.handleSuccess();
      }

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
    this.props.handleSuccess();
  }

  tempInputsEdit(initialValues) {
     const {
      fields: {  
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

    const fields = [ 
    'time_rule', 
    'day_rule',  
    'max_time',  
    'enforced',  
    'date_special_enforce',  
    'custom_notice', 
    'active',
    'date',  
    'city',   
    'pricing', 
    'pricing_duration', 
    'zip_code',   
    'this_day',  
    'parking_times', 
    'no_parking_times',  
    'start_end_rule',  
    'this_hour', 
    'max_hours', 
    'start_hour',  
    'end_hour',
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

    const countriesList = countries.map((data) => {
      return {label: data, value: data}
    })
    const statesList = states.map((data) => {
      return {label: data, value: data}
    })

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
                <div className="col s6 admin-form-input">
                  <div className="form-group">
                    <label>State</label>
                    <div clasName="input-field col s12">
                      <SimpleSelect 
                        options = {statesList} 
                        placeholder = "State"
                        theme = "material"
                        style={{marginTop: 5}}
                        transitionEnter = {true} 
                        onValueChange = {(value) => {
                          dispatch(change('parking-rules-form', 'state', value.value)); 
                        }}/>
                    </div>
                  </div>
                </div>
                
                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'manager_id'} 
                formName={'parking-rules-form'} 
                fieldName={'township_code'}
                defaultData={this.props.rowData}
                dispatch={dispatch} 
                />
                
                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'rate'} 
                formName={'parking-rules-form'} 
                fieldName={'parking_rate'}
                defaultData={this.props.rowData}
                dispatch={dispatch} 
                />

                <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'location_code'} 
                formName={'parking-rules-form'} 
                fieldName={'location_code'}
                defaultData={this.props.rowData}
                dispatch={dispatch} 
                />

                <AdminSelectize 
                  options={this.state.selectizeOptions}
                  objectKey={'location_name'} 
                  formName={'parking-rules-form'} 
                  fieldName={'location_name'}
                  defaultData={this.props.rowData}
                  dispatch={dispatch} 
                />

                <div className="col s6 admin-form-input">
                  <div className="form-group">
                    <label htmlFor="date_time">date_time</label>
                    <input id="date_time" className="date_time" type="text"/>
                  </div>
                </div>

                <div className="col s6 admin-form-input">
                  <div className="form-group">
                    <label htmlFor="date">date</label>
                    <input id="date" className="date" type="text"/>
                  </div>
                </div>

                {this.tempInputsEdit(this.props.initialValues)}

                <div className="col s6 admin-form-input">
                  <div className="form-group">
                    <label htmlFor="start_time">start_time</label>
                    <input id="start_time" className="start_time" type="text"/>
                  </div>
                </div>

                <div className="col s6 admin-form-input">
                  <div className="form-group">
                    <label htmlFor="end_time">end_time</label>
                    <input id="end_time" className="end_time" type="text"/>
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
    townshipParkingRulesFetched: state.townshipParkingRulesFetched,
    townshipParkingRulesCreated: state.townshipParkingRulesCreated,
    townshipParkingRulesEdited: state.townshipParkingRulesEdited,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchParkingRules, 
    editParkingRules, 
    createParkingRules, 
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'parking-rules-form',
  fields,
  overwriteOnInitialValuesChange : true
})(TownshipPanelParkingRulesForm));

    //this.props.dispatch(change('parking-rules-form', 'date_time', moment().format('YYYY-MM-DD HH:mm:ss')));
    //this.props.dispatch(change('parking-rules-form', 'date_time', this.props.locationCode);