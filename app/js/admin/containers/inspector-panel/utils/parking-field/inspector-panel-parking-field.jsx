import React from 'react'
import { reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import datetime from 'node-datetime'
import {SimpleSelect} from "react-selectize"

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

import InspectorPanelParkingFieldEdit from './inspector-panel-parking-field-edit.jsx'

export const fields = [ 
  'id',  
  'expiry_time', 
  'user_id', 
  'user_name', 
  'location_address',  
  'google_map',  
  'parking_scheme',  
  'rate',  
  'payment_method',  
  'location_name', 
  'vehicle_image', 
  'township_code', 
  'scheme_type', 
  'my_permit', 
  'my_wallet', 
  'payment', 
  'ipn_txn_id',  
  'pay_method',  
  'ipn_payment', 
  'ipn_status',  
  'parking_status',  
  'entry_time',  
  'exit_time', 
  'ip',  
  'upark', 
  'lot_row', 
  'lot_number',  
  'my_timer1', 
  'qrcode',  
  'change_defaults', 
  'township_rules',  
  'pl_state',  
  'token',
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
    this.props.fetchInspectorParkingField();
    this.props.fetchTownshipSchemeTypes();
    this.props.fetchTownshipLocations(this.props.townshipCode);
    ajaxSelectizeGet('payment_type', 'pay_method', this.selectizeOptionsUpdate);
  }

  componentDidUpdate() {
    if (this.props.inspectorParkingFieldCreated.isLoading) {
    } else if (!this.props.inspectorParkingFieldCreated.isLoading) {
      this.handleSuccess();
    }
  };

  selectizeOptionsUpdate(test, keyName) {
    var optionsDataObject = {[keyName]: test};
    Object.assign(this.state.selectizeOptions, optionsDataObject);
    //console.log(this.state.selectizeOptions)
    this.forceUpdate();
  }

  handleSuccess(){
    this.props.resetLoading();
    $('#modal-Inspector-payment-create').closeModal();
    this.props.fetchInspectorParkingField();
  }

  handleSubmit(data) {
    this.props.createInspectorParkingField(data);
  }

  tempInputs() {
    const {dispatch} = this.props;

    return fields.map((data) => {
      return( 
        <div className="col s6 admin-form-input">
          <div className="form-group">
            <label>{data}</label>
            <input type="text" placeholder={data} onChange={(event) => 
              dispatch(change('parking-field', data, event.target.value))
            }/>
          </div>
        </div>
      );
    });
  }

  renderCreateModal() {
    
    const {
      fields: {
        id,  
        expiry_time, 
        user_id, 
        user_name, 
        location_address,  
        google_map,  
        parking_scheme,  
        rate,  
        payment_method,  
        location_name, 
        vehicle_image, 
        township_code, 
        scheme_type, 
        my_permit, 
        my_wallet, 
        payment, 
        ipn_txn_id,  
        pay_method,  
        ipn_payment, 
        ipn_status,  
        parking_status,  
        entry_time,  
        exit_time, 
        ip,  
        upark, 
        lot_row, 
        lot_number,  
        my_timer1, 
        qrcode,  
        change_defaults, 
        township_rules,  
        pl_state,  
        token,
      },
      resetForm,
      submitting,
      dispatch
    } = this.props

    return(
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)} style={{margin: 0}}>
        <div id="modal-Inspector-payment-create" className="modal modal-fixed-footer">
          <div className="modal-content">

            <div className="row">
              <div className="center-align">
                <h4>Create a Parked Vehicle Fields</h4>
                <p className="center-align">Create a Parked Vehicle Fields by filling out the fields.</p>
              </div>
            </div>

            <div className="row">

              {this.tempInputs()}

              <AdminSelectize 
                options={this.state.selectizeOptions}
                objectKey={'pay_method'} 
                formName={'parking-payment'} 
                fieldName={'pay_method'}
                dispatch={dispatch} />

            </div>
          </div>
          

          <div className="modal-footer">
            <div className="row marginless-row">
              <div className="col s12 center-align">
                <button 
                type="submit" 
                disabled={submitting} 
                className="waves-effect waves-light btn">Create Parked Vehicle Fields</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );

  }

  renderTable() {
    console.log(this.props.inspectorParkingFieldFetched)
    let parkingData = this.props.inspectorParkingFieldFetched.data.resource;
    /*
      <a
      className="modal-trigger waves-effect waves-light btn valign" 
      onClick={() => $('#modal-Inspector-payment-create').openModal()}
      style={{margin: 10}}>Add New Parked Vehicle Fields</a>
    */

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
          columns={['id',  
                  'expiry_time', 
                  'user_id', 
                  'user_name', 
                  'parking_scheme',  
                  'rate',
                  'lot_row', 
                  'lot_number']}
        />

        <div className="divider"/> 

        <div className="center-align">

        </div>
      </div>
    );
  }

  renderEditModal(recordId, rowData) {
    console.log(rowData);
    console.log(recordId);
    window.scrollTo(0, document.body.scrollHeight);
    this.setState({showEditDuplicateButtons: true, rowData: rowData, showEditModal: true, parkingLocationCode: recordId})
  }

  renderEditDuplicateButtons(recordId) {
    return (
      <div className="container">
        <a
        style={{marginTop: 20}}
        onClick={() => {
          this.setState({showEditModal: true})
          $('#modal-inspector-parking-field-edit').openModal(); 
        }}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">edit</i>
          <h4> Edit - Parking Field ID: {recordId} </h4>
        </a>
        <a
        onClick={() => {
          this.setState({showEditModal: true})
          $('#modal-inspector-parking-field-duplicate').openModal(); 
        }}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">content_copy</i>
          <h4> Duplicate - Parking Field ID: {recordId} </h4>
        </a>
      </div>
    );
  }

  render() {
    console.log(this.props.townshipLocationsFetched)
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
                this.renderEditDuplicateButtons(this.state.parkingLocationCode) : <div> </div>}
            </div>
          </div>
        </Body>
        { this.props.inspectorParkingFieldFetched.isLoading ||
          this.props.townshipLocationsFetched.isLoading ||
          this.props.townshipSchemeTypesFetched.isLoading ? 
          <div> </div> : this.renderCreateModal()}

          { 
            !this.state.showEditModal ?
            <div></div> : <InspectorPanelParkingFieldEdit initialValues={this.state.rowData} handleSuccess={this.handleSuccess}/>
          }
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
