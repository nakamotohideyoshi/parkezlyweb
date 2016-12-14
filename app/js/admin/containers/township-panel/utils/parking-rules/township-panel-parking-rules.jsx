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

import TownshipPanelParkingRulesForm from './township-panel-parking-rules-form.jsx'

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
import { Link } from 'react-router';

import {ajaxSelectizeGet, ajaxDelete} from '../../../../common/components/ajax-selectize.js'

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

class customColumnComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onClick={() => this.props.metadata.customComponentMetadata.renderEditModal(
        this.props.rowData.location_code, 
        this.props.rowData)
      }>
        {this.props.data}
      </div>
    );
  }
}

customColumnComponent.defaultProps = { "data": {}, "renderEditModal": null};

class TownshipPanelParkingRules extends React.Component {

  constructor(props) {
    super(props);

    window.scrollTo(0, 0);

    this.state = {
      showEditDuplicateButtons: false,
      locationCode: null,
      showEditModal: false,
      rowData: null,
    }

    this.renderCreateModal = this.renderCreateModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.renderEditModal = this.renderEditModal.bind(this);
  }

  componentWillMount() {
    this.props.fetchParkingRules(this.props.locationCode);
    this.props.fetchTownshipSchemeTypes();
  }

  componentDidUpdate() {
    if (this.props.townshipParkingRulesCreated.isLoading) {
    } else if (!this.props.townshipParkingRulesCreated.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess(){
    this.props.resetLoading();
    this.props.fetchParkingRules(this.props.locationCode);
    this.setState({rowData: {}, showEditDuplicateButtons: false});
    $('#modal-township-parking-rules').closeModal();
    $('#modal-success').openModal();
    window.scrollTo(0, 0);
  }

  handleSubmit(data) {
    this.props.createParkingRules(data);
  }

  tempInputs() {
    const {dispatch} = this.props;

    return fields.map((data) => {
      return( 
        <div className="col s12 admin-form-input">
          <div className="form-group">
            <div></div>
            <input type="text" placeholder={data} onChange={(event) => 
              dispatch(change('parking-rules', data, event.target.value))
            }/>
          </div>
        </div>
      );
    });
  }

  renderCreateModal() {
    
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
    } = this.props

    return(
      <TownshipPanelParkingRulesForm
        initialValues={this.state.rowData} 
        handleSuccess={this.handleSuccess}
        modalName="modal-township-parking-rules-create" 
        modalText="Create a Parking Rule" 
        submitType="CREATE"
        initialValues={this.state.rowData} 
        rowData={this.state.rowData}
        handleSuccess={this.handleSuccess}
      />
    );

  }

  openEditModal(locationId) {
    this.setState({showEditButton: true});
    window.scrollTo(0, document.body.scrollHeight);
    var fieldData = this.props.townshipParkingRulesFetched.data.resource;   
    const filteredData = fieldData.filter(createFilter(locationId.toString(), ['id']));
    this.setState({locationId: locationId, filteredData: filteredData[0]});
  }

  renderEditModal(locationCode, rowData) {
    window.scrollTo(0, document.body.scrollHeight);
    this.setState({showEditDuplicateButtons: true, rowData: rowData, showEditModal: true, locationCode: locationCode})
  }

  renderTable() {
    let parkingData = this.props.townshipParkingRulesFetched.data.resource;

    var renderEditModal = this.renderEditModal;
    var metaDataFunction = () =>  {
      return fields.map((data) => {
        return( 
          {
            "columnName": data,
            "customComponent": customColumnComponent,
            'customComponentMetadata': {
                'renderEditModal': renderEditModal
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
            onClick={() => {$('#modal-township-parking-rules-create').openModal(); window.scrollTo(0, 0);}}
            style={{margin: 10}}>Add New Parking Rule</a>

        </div>
      </div>
    );
  }

  renderEditButtons(locationId) {
    console.log(locationId)
    return (
      <div className="container">
        <a 
        onClick={() => {$('#modal-township-parking-rules-edit').openModal(); window.scrollTo(0, 0); this.setState({showEditModal: true, duplicateModal: false})}}
        style={{marginTop: 20}}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">edit</i>
          <h4> Edit Parking Rule: {locationId} </h4>
        </a>

        <a 
        onClick={() => {$('#modal-township-parking-rules-duplicate').openModal(); window.scrollTo(0, 0); this.setState({showEditModal: true, duplicateModal: true})}}
        style={{marginTop: 20 }}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">content_copy</i>
          <h4> Duplicate Parking Rule: {locationId} </h4>
        </a>

        <a
        onClick={() => $('#modal-delete').openModal() }
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">delete</i>
          <h4> Delete: {locationId} </h4>
        </a>

        <div id="modal-delete" className="modal" style={{overflowX: "hidden"}}>
          <div className="modal-content">
            <h4>Delete</h4>
            <p>Are you sure you want to delete this record?</p>
          </div>
          <div className="modal-footer">
            <div className="row marginless-row">
              <div className="col s6 left">
                <button 
                  href="#" 
                  className=" modal-action modal-close waves-effect waves-green btn-flat">Close</button>
              </div>
              <div className="col s3">
                <a className="waves-effect waves-light btn btn-red" 
                onClick={() => {
                  $('#modal-delete').closeModal()
                }}>No</a>
              </div>
              <div className="col s3">
                <a className="waves-effect waves-light btn btn-green" 
                onClick={() => {
                  $('#modal-delete').closeModal()
                  ajaxDelete('parking_rules', this.state.rowData.id, this.handleSuccess);
                  this.setState({showEditDuplicateButtons: false});
                  window.scrollTo(0, 0);
                  window.scrollTo(0, 0);
                }}>Yes</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }

  render() {
    console.log(this.props.townshipParkingRulesCreated)
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>
          <div className="row marginless-row" style={{marginTop: 40}}>
            <div className="col s12">
              <nav>
                <div className="nav-wrapper nav-admin z-depth-2">
                  <a className="brand-logo center">Parking Rules</a>
                </div>
              </nav>
               <div className="card">
                  <div className="township-userlist-container">
                    { this.props.townshipParkingRulesFetched.isLoading ? 
                      <div className="center-align"> <Spinner /> </div> : this.renderTable()}
                  </div>
               </div>

               {this.state.showEditDuplicateButtons ? 
                this.renderEditButtons(this.state.locationCode) : <div> </div>}
            </div>
          </div>
        </Body>
        {this.renderCreateModal()}
        <TownshipPanelParkingRulesForm
          modalName="modal-township-parking-rules-edit" 
          modalText="Edit a Parking Rule" 
          submitType="EDIT"
          initialValues={this.state.rowData} 
          rowData={this.state.rowData}
          handleSuccess={this.handleSuccess}
        />
        <TownshipPanelParkingRulesForm
          modalName="modal-township-parking-rules-duplicate" 
          modalText="Duplicate a Parking Rule" 
          submitType="DUPLICATE"
          initialValues={this.state.rowData} 
          rowData={this.state.rowData}
          handleSuccess={this.handleSuccess}
        />
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
