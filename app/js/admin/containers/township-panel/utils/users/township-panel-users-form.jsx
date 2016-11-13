import React from 'react';
import { reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import datetime from 'node-datetime'
import { browserHistory } from 'react-router'
import {createFilter} from 'react-search-input';

import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'
import {optionsSelectize} from '../../../../common/components/options-selectize.js'

import {
  fetchTownshipUsers, 
  editTownshipUsers, 
  createTownshipUsers,  
  resetLoading} from '../../../../actions/actions-township-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

import { ajaxSelectizeGet, ajaxDelete } from '../../../../common/components/ajax-selectize.js'
import AdminSelectize from '../../../../common/components/admin-selectize.jsx'
import {SimpleSelect} from "react-selectize"

export const fields = [ 
  'id',
  'user_id',
  'user_name',
  'township_name',
  'township_code',
  'profile_name',
  'status'
]

class TownshipPanelUsersForm extends React.Component {

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

    this.props.dispatch(change('township-users-form', 'township_code', this.props.townshipCode))
    this.props.dispatch(change('township-users-form', 'township_name', this.props.townshipCode))
    
  }

  componentDidMount() {
    const {
      resetForm,
      submitting,
      dispatch
    } = this.props

    $('.date_time')
    .bootstrapMaterialDatePicker({ time: true, format : 'YYYY-MM-DD HH:mm:ss' })
    .on('change', function(event) {
      dispatch(change('township-users-form', 'date_time', event.target.value)); 
    });
  }

  handleSubmit(data) {
    
    $('#' + this.props.modalName).closeModal();
    $('#modal-success').openModal();

    switch(this.props.submitType) {
      case "CREATE":
        data = _.omit(data, 'id');
        this.props.createTownshipUsers(data);
        break;
      case "EDIT":
        this.props.editTownshipUsers(data, data.id);
        break;
      case "DUPLICATE":
        data = _.omit(data, 'id');
        this.props.createTownshipUsers(data);
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
    /*
    ajaxSelectizeGet('manage_locations', 'location_code', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('scheme_type', 'scheme_type', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('payment_type', 'pay_method', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('user_vehicles', 'plate_no', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('locations_rate', 'rate', this.selectizeOptionsUpdate);
    */
    ajaxSelectizeGet('user_profile', 'user_id', this.selectizeOptionsUpdate);
    ajaxSelectizeGet('user_profile', 'user_name', this.selectizeOptionsUpdate);

  }

  componentDidUpdate() {
    if (this.props.townshipUsersCreated.isLoading) {
      } else if (!this.props.townshipUsersCreated.isLoading) {
        this.handleSuccess();
      }

    if (this.props.townshipUsersEdited.isLoading) {
      } else if (!this.props.townshipUsersEdited.isLoading) {
        this.handleSuccess();
      }

    if (this.props.townshipUsersCreated.isLoading) {
      } else if (!this.props.townshipUsersEdited.isLoading) {
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
        township_name,
        township_code, 
        user_id,
        user_name,
        profile_name,
        status
      },
      resetForm,
      submitting,
      dispatch
    } = this.props;

    const fields = [
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

                <div className="col s6 admin-form-input">
                  <div className="form-group">
                    <label>status</label>
                    <div clasName="input-field col s12">
                      <SimpleSelect 
                        options = {[{label: "ACTIVE", value: "ACTIVE"}, {label: "INACTIVE", value: "INACTIVE"}]} 
                        placeholder = "status"
                        theme = "material"
                        style={{marginTop: 5}}
                        transitionEnter = {true} 
                        onValueChange = {(value) => {
                          dispatch(change('township-users-form', 'status', value.value)); 
                        }}/>
                      </div>
                    </div>
                  </div>

                  <div className="col s6 admin-form-input">
                    <div className="form-group">
                      <label>profile_name</label>
                      <div clasName="input-field col s12">
                        <SimpleSelect 
                          options = {[
                            {label: "TwpBursar", value: "TwpBursar"}, 
                            {label: "TwpInspector", value: "TwpInspector"},
                            {label: "TwpAdmin", value: "TwpAdmin"},
                            {label: "VehicleUser", value: "VehicleUser"},
                          ]} 
                          placeholder = "profile_name"
                          theme = "material"
                          style={{marginTop: 5}}
                          transitionEnter = {true} 
                          onValueChange = {(value) => {
                            dispatch(change('township-users-form', 'profile_name', value.value)); 
                          }}/>
                      </div>
                    </div>
                  </div>
                  

                  <AdminSelectize 
                    options={this.state.selectizeOptions}
                    objectKey={'user_name'} 
                    formName={'township-users-form'} 
                    fieldName={'user_name'}
                    defaultData={this.props.rowData}
                    dispatch={dispatch} 
                  />

                  <AdminSelectize 
                    options={this.state.selectizeOptions}
                    objectKey={'user_id'} 
                    formName={'township-users-form'} 
                    fieldName={'user_id'}
                    defaultData={this.props.rowData}
                    dispatch={dispatch} 
                  />

                  {this.tempInputsEdit(this.props.initialValues)}

                  <div className="col s6 admin-form-input">
                    <div className="form-group">
                      <label htmlFor="date_time">date_time</label>
                      <input id="date_time" className="date_time" type="text"/>
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
    townshipUsersFetched: state.townshipUsersFetched,
    townshipUsersCreated: state.townshipUsersCreated,
    townshipUsersEdited: state.townshipUsersEdited,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipUsers, 
    editTownshipUsers, 
    createTownshipUsers, 
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'township-users-form',
  fields,
  overwriteOnInitialValuesChange : false
})(TownshipPanelUsersForm));