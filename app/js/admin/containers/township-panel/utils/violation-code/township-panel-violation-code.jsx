import React from 'react'
import { reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import datetime from 'node-datetime'
import {SimpleSelect} from "react-selectize"

import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'
import {optionsSelectize} from '../../../../common/components/options-selectize.js'

import {fetchTownshipLocations, fetchViolationCode, createViolationCode, resetLoading} from '../../../../actions/actions-township-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

import TownshipPanelViolationCodeForm from './township-panel-violation-code-form.jsx'
import customColumnComponent from '../../../../common/components/custom-column-component.jsx'
import {ajaxSelectizeGet, ajaxDelete} from '../../../../common/components/ajax-selectize.js'

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


class TownshipPanelViolationCode extends React.Component {

  constructor(props) {
    super(props);
    window.scrollTo(0, 0);

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
    this.props.fetchViolationCode();
    this.props.fetchTownshipSchemeTypes();
    this.props.fetchTownshipLocations(this.props.townshipCode);
  }

  componentDidUpdate() {
    if (this.props.townshipViolationCodeCreated.isLoading) {
    } else if (!this.props.townshipViolationCodeCreated.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess(){
    this.props.resetLoading();
    this.props.fetchViolationCode();
    this.setState({rowData: {}, showEditDuplicateButtons: false});
    $('#modal-violation-code-create').closeModal();
    $('#modal-success').openModal();
  }

  handleSubmit(data) {
    this.props.createViolationCode(data);
  }

  tempInputs() {
    const {dispatch} = this.props;

    return fields.map((data) => {
      return( 
        <div className="col s12 admin-form-input">
          <div className="form-group">
            <div></div>
            <input type="text" placeholder={data} onChange={(event) => 
              dispatch(change('create-ticket', data, event.target.value))
            }/>
          </div>
        </div>
      );
    });
  }

  renderCreateModal() {

    return(
      <TownshipPanelViolationCodeForm
        modalName="modal-violation-code-create" 
        modalText="Create a Violation Type" 
        submitType="CREATE"
        editMode={false}
        handleSuccess={this.handleSuccess}
        townshipCode={this.props.townshipCode}
      />
    );

  }

  renderTable() {
    console.log(this.props.townshipViolationCodeFetched)
    let parkingData = _.filter(this.props.townshipViolationCodeFetched.data.resource, {'township_code': this.props.townshipCode});

    var renderEditModal = this.renderEditModal
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
        />

        <div className="divider"/> 

        <div className="center-align">

          <a
            className="modal-trigger waves-effect waves-light btn valign" 
            onClick={() => {$('#modal-violation-code-create').openModal(); window.scrollTo(0, 0);}}
            style={{margin: 10}}>Add New Violation Type</a>
        </div>
      </div>
    );
  }

  renderEditModal(recordId, rowData) {
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
          $('#modal-violation-code-edit').openModal(); 
        window.scrollTo(0, 0);}}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">edit</i>
          <h4> Edit - Violation Type ID: {recordId} </h4>
        </a>

        <a
        onClick={() => {
          this.setState({showEditModal: true})
          $('#modal-violation-code-duplicate').openModal(); 
        window.scrollTo(0, 0);}}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">content_copy</i>
          <h4> Duplicate - Violation Type ID: {recordId} </h4>
        </a>

        <a
        onClick={() => $('#modal-delete').openModal() }
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">delete</i>
          <h4> Delete - Violation Type ID: {recordId} </h4>
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
                  ajaxDelete('violation_code', recordId, this.handleSuccess);
                  this.setState({showEditDuplicateButtons: false});
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
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>
          <div className="row marginless-row" style={{marginTop: 40}}>
            <div className="col s12">
              <nav>
                <div className="nav-wrapper nav-admin z-depth-2">
                  <a className="brand-logo center">Violation Type</a>
                </div>
              </nav>
               <div className="card">
                  <div className="township-userlist-container">
                    { this.props.townshipViolationCodeFetched.isLoading ||
                      this.props.townshipLocationsFetched.isLoading ? 
                      <div> </div> : this.renderTable()}
                  </div>
               </div>
               {this.state.showEditDuplicateButtons ? 
                this.renderEditDuplicateButtons(this.state.parkingLocationCode) : <div> </div>}
            </div>
          </div>
        </Body>
        {this.renderCreateModal()}
        <TownshipPanelViolationCodeForm
          modalName="modal-violation-code-edit" 
          modalText="Edit a Violation Type" 
          submitType="EDIT"
          initialValues={this.state.rowData} 
        handleSuccess={this.handleSuccess}
        townshipCode={this.props.townshipCode}
          />
        <TownshipPanelViolationCodeForm 
          modalName="modal-violation-code-duplicate" 
          modalText="Duplicate a Violation Type" 
          submitType="DUPLICATE"
          initialValues={this.state.rowData} 
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
    townshipViolationCodeFetched: state.townshipViolationCodeFetched,
    townshipViolationCodeCreated: state.townshipViolationCodeCreated,
    townshipLocationsFetched: state.townshipLocationsFetched,
    townshipSchemeTypesFetched: state.townshipSchemeTypesFetched,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchViolationCode,
    fetchTownshipLocations,
    resetLoading,
    fetchTownshipSchemeTypes,
    createViolationCode
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'violation-code',
  fields
})(TownshipPanelViolationCode));
