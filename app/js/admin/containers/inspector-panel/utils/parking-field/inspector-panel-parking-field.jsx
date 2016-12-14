import React from 'react'
import { reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import datetime from 'node-datetime'
import {SimpleSelect} from "react-selectize"
import { browserHistory, Link } from 'react-router'

import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'
import {optionsSelectize} from '../../../../common/components/options-selectize.js'

import {fetchInspectorParkingField, createInspectorParkingField, resetLoading} from '../../../../actions/actions-inspector-panel.jsx'
import {fetchTownshipLocations} from '../../../../actions/actions-township-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

import {ajaxSelectizeGet, ajaxDelete} from '../../../../common/components/ajax-selectize.js'
import AdminSelectize from '../../../../common/components/admin-selectize.jsx'

import InspectorPanelParkingFieldForm from './inspector-panel-parking-field-form.jsx'
import _ from 'lodash';



export const fields = [ 
  'id',
  'parking_type',
  'township_code',
  'location_code',
  'entry_date_time',
  'exit_date_time',
  'expiry_time',
  'max_time',
  'user_id',
  'permit_id',
  'subscription_id',
  'plate_no',
  'pl_state',
  'lat',
  'lng',
  'address1',
  'address2',
  'city',
  'state',
  'zip',
  'country',
  'lot_row',
  'lot_number',
  'ip',
  'parking_token',
  'parking_status',
  'payment_method',
  'parking_rate',
  'parking_units',
  'parking_qty',
  'parking_subtotal',
  'wallet_trx_id',
  'tr_percent',
  'tr_fee',
  'parking_total',
  'ipn_custom',
  'ipn_txn_id',
  'ipn_payment',
  'ipn_status',
  'ipn_address',
]

class customColumnComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onClick={() => this.props.metadata.customComponentMetadata.renderEditModal(
        this.props.rowData.id, 
        this.props.rowData)}>
        {this.props.data}
      </div>
    );
  }
}

customColumnComponent.defaultProps = { "data": {}, "renderEditModal": null};

class InspectorParkingField extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showEditDuplicateButtons: false,
      parkingLocationCode: null,
      showEditModal: false,
      rowData: null,
      selectizeOptions: {}
    }

    this.renderCreateModal = this.renderCreateModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.renderEditModal = this.renderEditModal.bind(this);
  }

  componentWillMount() {
    this.props.fetchInspectorParkingField(this.props.townshipCode);
    this.props.fetchTownshipSchemeTypes();
    this.props.fetchTownshipLocations(this.props.townshipCode);

  }

  componentDidUpdate() {
    if (this.props.inspectorParkingFieldCreated.isLoading) {
    } else if (!this.props.inspectorParkingFieldCreated.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess(){
    this.props.resetLoading();
    this.props.fetchInspectorParkingField(this.props.townshipCode);
    this.setState({rowData: {}, showEditDuplicateButtons: false});
    $('#modal-Inspector-payment-create').closeModal();
  }

  handleSubmit(data) {
    this.props.createInspectorParkingField(data);
  }

  renderCreateModal() {
    return(
      <InspectorPanelParkingFieldForm 
      modalName="modal-inspector-parking-field-create" 
      modalText="Create a Parking Field" 
      submitType="CREATE"
      handleSuccess={this.handleSuccess}
      townshipCode={this.props.townshipCode}
      />
    );

  }

  renderTable() {
    //"township_code": this.props.townshipCode,
    let parkingData = this.props.inspectorParkingFieldFetched.data.resource;
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
          initialSort={'entry_date_time'}
          initialSortAscending={false}
          columns={[
            'id',
            'township_code',
            'parking_type',
            'location_code',
            'entry_date_time',
            'country',
            'city',
            'state',
            'user_id', 
            'parking_status',
            'ticket_status'
          ]}
        />

        <div className="divider"/> 

        <div className="center-align">

        <a
          className="modal-trigger waves-effect waves-light btn valign" 
          onClick={() => $('#modal-inspector-parking-field-create').openModal()}
          style={{margin: 10}}>Add New Parking Field</a>

        </div>
      </div>
    );
  }

  renderEditModal(recordId, rowData) {
    window.scrollTo(0, document.body.scrollHeight);
    this.setState({showEditDuplicateButtons: true, rowData: rowData, showEditModal: true, parkingLocationCode: recordId})
  }

  renderEditDuplicateButtons(rowData) {
    return (
      <div className="container">
        <Link
          style={{marginTop: 20}}
          to={`admin/inspector/vehicle-info/${rowData.id}`}
          className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp"
        >
          <i className="material-icons valign">directions_car</i>
          <h4> Vehicle Info - Plate No: {rowData.plate_no} </h4>
        </Link>

        <a
        style={{marginTop: 20}}
        onClick={() => {
          this.setState({showEditModal: true})
          $('#modal-inspector-parking-field-edit').openModal(); 
        window.scrollTo(0, 0);}}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">edit</i>
          <h4> Edit - Parking Field ID: {rowData.id} </h4>
        </a>

        <a
        onClick={() => {
          this.setState({showEditModal: true})
          $('#modal-inspector-parking-field-duplicate').openModal(); 
        window.scrollTo(0, 0);}}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">content_copy</i>
          <h4> Duplicate - Parking Field ID: {rowData.id} </h4>
        </a>

        <a
        onClick={() => $('#modal-delete').openModal() }
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">delete</i>
          <h4> Delete - Parking Payment ID: {rowData.id} </h4>
        </a>
      </div>
    );
  }

  render() {
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>
          <div className="row marginless-row" style={{marginTop: 40}}>
            <div className="col s12">
              <nav>
                <div className="nav-wrapper nav-admin z-depth-2">
                  <a className="brand-logo center">Parked Vehicle Fields</a>
                </div>
              </nav>
               <div className="card">
                  <div className="township-userlist-container">
                    { this.props.inspectorParkingFieldFetched.isLoading ||
                      this.props.townshipLocationsFetched.isLoading ? 
                      <div className="center-align"> <Spinner /> </div> : this.renderTable()}
                  </div>
               </div>
               {this.state.showEditDuplicateButtons ? 
                this.renderEditDuplicateButtons(this.state.rowData) : <div> </div>}
            </div>
          </div>
        </Body>
        {this.renderCreateModal()} 

        <InspectorPanelParkingFieldForm 
          initialValues={this.state.rowData} 
          handleSuccess={this.handleSuccess}
          modalName="modal-inspector-parking-field-edit" 
          modalText="Edit a Parking Field" 
          submitType="EDIT"
          initialValues={this.state.rowData} 
          rowData={this.state.rowData}
          handleSuccess={this.handleSuccess}
          townshipCode={this.props.townshipCode}
          />
        <InspectorPanelParkingFieldForm 
          initialValues={this.state.rowData} 
          handleSuccess={this.handleSuccess}
          modalName="modal-inspector-parking-field-duplicate" 
          modalText="Duplicate a Parking Field" 
          submitType="DUPLICATE"
          initialValues={this.state.rowData} 
          rowData={this.state.rowData}
          handleSuccess={this.handleSuccess}
          townshipCode={this.props.townshipCode}
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
    inspectorParkingFieldFetched: state.inspectorParkingFieldFetched,
    inspectorParkingFieldCreated: state.inspectorParkingFieldCreated,
    townshipLocationsFetched: state.townshipLocationsFetched,
    townshipSchemeTypesFetched: state.townshipSchemeTypesFetched,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchInspectorParkingField,
    fetchTownshipLocations,
    resetLoading,
    fetchTownshipSchemeTypes,
    createInspectorParkingField
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'parking-field',
  fields
})(InspectorParkingField));
