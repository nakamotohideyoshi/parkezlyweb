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

import { ajaxSelectizeGet, ajaxDelete, ajaxGet} from '../../../../common/components/ajax-selectize.js'
import AdminSelectize from '../../../../common/components/admin-selectize.jsx'
import {SimpleSelect} from "react-selectize"
import moment from 'moment'

export const fields = [ 
  'id',
	'date_time',
  'user_id',
  'user_name',
  'township_name',
  'township_code',
  'profile_name',
  'status',
  'email'
]

class TownshipPanelUsersForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showEditDuplicateButtons: false,
      parkingLocationCode: null,
      showEditModal: false,
      selectizeOptions: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.selectizeOptionsUpdate = this.selectizeOptionsUpdate.bind(this);
  }

  handleSubmit(data) {
    console.log(data);
    $('#' + this.props.modalName).closeModal();
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
    this.props.dispatch(change('township-users-form', 'township_code', this.props.townshipCode));
    this.props.dispatch(change('township-users-form', 'township_name', this.props.townshipCode));
    this.props.dispatch(change('township-users-form', 'date_time', moment().format('YYYY-MM-DD HH:mm:ss')));
    ajaxSelectizeGet(`user_profile`, 'user_id', this.selectizeOptionsUpdate);
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

  render() {
    const {
      resetForm,
      submitting,
      dispatch
    } = this.props
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)} style={{margin: 0}}>
          <div id={this.props.modalName} className="modal modal-fixed-footer managed-parking-modal">
						<nav>
							<div className="nav-wrapper nav-admin">
								<a className="brand-logo center">{this.props.modalText}</a>
								<i 
								className="material-icons right right-align clickable" 
								style={{marginRight: 15, lineHeight: "55px"}}
								onClick={() => {
									$('#' + this.props.modalName).closeModal();
								}}>close</i>
							</div>
						</nav>
            <div className="modal-content">
              <div className="row">
                <div className="center-align">
								  <p className="center-align">{this.props.modalText} by filling out the fields.</p>
                </div>
              </div>

              <div className="row">
								<AdminSelectize 
                  staticOptions={false}
									options={this.state.selectizeOptions}
									objectKey={'user_id'} 
                  fieldName={'User ID'}
									formName={'township-users-form'} 
									fieldData={this.props.fields}
									dispatch={dispatch} 
									dispatchFunction={(value) => {
										ajaxGet(`user_profile/${value.value}?id_field=user_id`, (userProfile) => {
											dispatch(change('township-users-form', 'user_name', userProfile.data.user_name)); 
											dispatch(change('township-users-form', 'email', userProfile.data.email)); 
										});
									}}
								/>
                <AdminSelectize 
                  staticOptions={true}
									options={[
                    {label: "VehicleUser", value: "VehicleUser"},
                    {label: "ApiAdmin", value: "ApiAdmin"},
                    {label: "TwpAdmin", value: "TwpAdmin"},
                    {label: "TwpBursar", value: "TwpBursar"}, 
                    {label: "TwpInspector", value: "TwpInspector"},			
                  ]}
									objectKey={'profile_name'} 
                  fieldName={'Profile Name'}
									formName={'township-users-form'} 
									fieldData={this.props.fields}
									dispatch={dispatch}
								/>
                <AdminSelectize 
                  staticOptions={true}
									options = {[{label: "ACTIVE", value: "ACTIVE"}, {label: "INACTIVE", value: "INACTIVE"}]} 
									objectKey={'status'} 
                  fieldName={'Status'}
									formName={'township-users-form'} 
									fieldData={this.props.fields}
									dispatch={dispatch}
								/>
              </div>
            </div>
            

            <div className="modal-footer">
              <div className="row marginless-row">
                <div className="col s12 center-align">
                  <button 
                  type="submit" 
                  disabled={submitting} 
                  className="waves-effect waves-light btn blue-btn-admin">{this.props.modalText}</button>
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
  fields
})(TownshipPanelUsersForm));