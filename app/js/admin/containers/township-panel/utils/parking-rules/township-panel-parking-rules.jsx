import React from 'react'
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

class customColumnComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onClick={() => this.props.metadata.customComponentMetadata.openEditModal(this.props.rowData.id)}>
        {this.props.data}
      </div>
    );
  }
}

customColumnComponent.defaultProps = { "data": {}, "openEditModal": null};

class TownshipPanelParkingRules extends React.Component {

  constructor(props) {
    super(props);

    window.scrollTo(0, 0);

    this.state = {
      showEditModal: false,
      locationId: null
    }

    this.renderCreateModal = this.renderCreateModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleEditSuccess = this.handleEditSuccess.bind(this);
    this.tempInputsEdit = this.tempInputsEdit.bind(this);
    this.renderTable = this.renderTable.bind(this);
  }

  componentWillMount() {
    console.log(this.props.locationCode)
    this.props.fetchParkingRules(this.props.locationCode);
    this.props.fetchTownshipSchemeTypes();
    //this.props.fetchTownshipLocations(this.props.townshipCode);
  }

  componentDidUpdate() {
    if (this.props.townshipParkingRulesCreated.isLoading) {
    } else if (!this.props.townshipParkingRulesCreated.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess(){
    this.props.resetLoading();
    $('#modal-township-parking-rules').closeModal();
    $('#modal-success').openModal();
    this.props.fetchParkingRules();
  }

  handleEditSuccess() {

  }

  handleSubmit(data) {
    this.props.createParkingRules(data);
  }

  handleEditSubmit(data) {

  }

  tempInputs() {
    const {dispatch} = this.props;

    return fields.map((data) => {
      return( 
        <div className="col s6 admin-form-input">
          <div className="form-group">
            <label>{data}</label>
            <input type="text" placeholder={data} onChange={(event) => 
              dispatch(change('parking-rules', data, event.target.value))
            }/>
          </div>
        </div>
      );
    });
  }

  tempInputsEdit() {
    const {dispatch} = this.props;
    if (this.state.showEditModal) {
      $('#modal-township-parking-rules-edit').openModal();
      var fieldData = this.props.townshipParkingRulesFetched.data.resource;   
      const filteredData = fieldData.filter(createFilter(this.state.locationId.toString(), ['id']));
      return fields.map((data) => {
        return( 
          <div className="col s6 admin-form-input">
            <div className="form-group">
              <label>{data}</label>
              <input type="text" value={filteredData[0][data]} placeholder={data} onChange={(event) => 
                dispatch(change('parking-rules', data, event.target.value))
              }/>
            </div>
          </div>
        );
      });
    } 
  }

  renderCreateModal() {
    
    const {
      fields: {
        vehicle_id,
        user_name,
        date,
        location_id,
        scheme_type,
        rate,
        pay_method,
        amount,
        cashier_id,
        user_id,
      },
      resetForm,
      submitting,
      dispatch
    } = this.props

    return(
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)} style={{margin: 0}}>
        <div id="modal-township-parking-rules-create" className="modal modal-fixed-footer">
          <div className="modal-content">

            <div className="row">
              <div className="center-align">
                <h4>Create a Parking Rule</h4>
                <p className="center-align">Create a Parking Rule by filling out the fields.</p>
              </div>
            </div>

            <div className="row">

              {this.tempInputs()}

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
    );

  }

  openEditModal(locationId) {
    this.setState({showEditModal: true, locationId: locationId});
  }

  renderEditModal() {
    const {
      resetForm,
      submitting,
      dispatch
    } = this.props

    return (
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

              {this.tempInputsEdit()}

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
    );
  }

  renderTable() {
    let parkingData = this.props.townshipParkingRulesFetched.data.resource;

    var openEditModal = this.openEditModal;
    var metaDataFunction = () =>  {
      return fields.map((data) => {
        return( 
          {
            "columnName": data,
            "customComponent": customColumnComponent,
            'customComponentMetadata': {
                'openEditModal': openEditModal
            }
          }
        );
      });
    }
    var columnMeta = metaDataFunction()

    return (
      <div>
        <Griddle
          tableClassName={'table table-bordered table-striped table-hover'}
          filterClassName={''}
          useGriddleStyles={false}
          results={parkingData}
          showFilter={true}
          showSettings={true}
          settingsToggleClassName='btn btn-default'
          useCustomPagerComponent={true}
          customPagerComponent={ BootstrapPager }
          useCustomFilterComponent={true} customFilterComponent={customFilterComponent}
          useCustomFilterer={true} customFilterer={customFilterFunction}
          columnMetadata={columnMeta}
          columns={[
                    'id',  
                    'date_time', 
                    'location_code', 
                    'location_name', 
                    'time_rule', 
                    'day_rule',  
                    'max_time',  
                    'enforced',  
                    'date_special_enforce']}
        />

        <div className="divider"/> 

        <div className="center-align">

          <a
            className="modal-trigger waves-effect waves-light btn valign" 
            onClick={() => $('#modal-township-parking-rules-create').openModal()}
            style={{margin: 10}}>Add New Parking Rule</a>

        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>
          <div className="row" style={{marginTop: 40}}>
            <div className="col s12">
              <nav>
                <div className="nav-wrapper nav-admin z-depth-2">
                  <a className="brand-logo center">Parking Rules</a>
                </div>
              </nav>
               <div className="card">
                  <div className="township-userlist-container">
                    { this.props.townshipParkingRulesFetched.isLoading ? 
                      <div> </div> : this.renderTable()}
                  </div>
               </div>
            </div>
          </div>
        </Body>
        { this.props.townshipParkingRulesFetched.isLoading ? 
          <div> </div> : this.renderCreateModal()}
        { this.props.townshipParkingRulesFetched.isLoading ? 
          <div> </div> : this.renderEditModal()}

        <div id="modal-success" className="modal">
          <div className="modal-content">
            <h4>Success!</h4>
            <p>You've successfully sent the request!</p>
          </div>
          <div className="modal-footer">
            <button 
            href="#" 
            className=" modal-action modal-close waves-effect waves-green btn-flat">Close</button>
          </div>
        </div>

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
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchParkingRules,
    fetchTownshipLocations,
    resetLoading,
    fetchTownshipSchemeTypes,
    createParkingRules
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'parking-rules',
  fields
})(TownshipPanelParkingRules));
