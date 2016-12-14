import React from 'react'
import { reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import datetime from 'node-datetime'
import {SimpleSelect} from "react-selectize"

import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'
import {optionsSelectize} from '../../../../common/components/options-selectize.js'
import { browserHistory } from 'react-router'

import {
  fetchTownshipFacilities, 
  editTownshipFacilities, 
  createTownshipFacilities, 
  fetchTownshipLocations, 
  createTownshipLocations,
  resetLoading} from '../../../../actions/actions-township-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'
import { Link } from 'react-router';
import TownshipPanelFacilitiesForm from './township-panel-facilities-form.jsx';
import {ajaxSelectizeGet, ajaxDelete} from '../../../../common/components/ajax-selectize.js'

export const fields = [ 
  'date_time', 
  'township_code', 
  'dd',  
  'location_name', 
  'location_type', 
  'full_address',  
  'intersect_road1', 
  'intersect_road2', 
  'rows',  
  'lots_per_rows', 
  'total_lots',  
  'parking_rate',  
  'show_location', 
  'country', 
  'ff',  
  'location_code', 
  'state',
]

class customColumnComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onClick={() => this.props.metadata.customComponentMetadata.renderEditModal(
        this.props.rowData.location_code, 
        this.props.rowData)}>
        {this.props.data}
      </div>
    );
  }
}

customColumnComponent.defaultProps = { "data": {}, "renderEditModal": null};

class TownshipPanelFacilities extends React.Component {

  constructor(props) {
    super(props);

    window.scrollTo(0, 0);

    this.state = {
      showEditDuplicateButtons: false,
      parkingLocationCode: null,
      showEditModal: false,
      rowData: null,
    }

    this.renderCreateModal = this.renderCreateModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.renderEditModal = this.renderEditModal.bind(this);
  }

  componentWillMount() {
    this.props.fetchTownshipFacilities();
    this.props.fetchTownshipSchemeTypes();
    this.props.fetchTownshipLocations(this.props.townshipCode);
  }

  componentDidUpdate() {
    if (this.props.townshipLocationsCreated.isLoading) {
    } else if (!this.props.townshipLocationsCreated.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess(){
    this.props.resetLoading();
    this.props.fetchTownshipLocations(this.props.townshipCode);
    this.setState({rowData: {}, showEditDuplicateButtons: false});
    $('#modal-facilities-create').closeModal();
    $('#modal-success').openModal();
  }

  handleSubmit(data) {
    this.props.createTownshipLocations(data);
  }

  tempInputs() {
    const {dispatch} = this.props;

    return fields.map((data) => {
      return( 
        <div className="col s12 admin-form-input">
          <div className="form-group">
            <label>{data}</label>
            <input type="text" placeholder={data} onChange={(event) => 
              dispatch(change('create', data, event.target.value))
            }/>
          </div>
        </div>
      );
    });
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
      <TownshipPanelFacilitiesForm
        modalName="modal-township-facilities-create" 
        modalText="Create a Facility" 
        submitType="CREATE"
        initialValues={this.state.rowData} 
        rowData={this.state.rowData}
        handleSuccess={this.handleSuccess}
        townshipCode={this.props.townshipCode}
      />
    );
  }

  renderEditModal(locationCode, rowData) {
    window.scrollTo(0, document.body.scrollHeight);
    this.setState({showEditDuplicateButtons: true, rowData: rowData, showEditModal: true, parkingLocationCode: locationCode})
  }

  renderEditDuplicateButtons(locationCode) {
    console.log(this.state.rowData.id)
    return (
      <div className="container">
        <Link 
        to={{pathname: `admin/township/facilities/parking-rules/${locationCode}`}} 
        style={{marginTop: 20, }}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">report</i>
          <h4> {locationCode}'s Parking Rules </h4>
        </Link>
        <a
        onClick={() => {
          this.setState({showEditModal: true})
          $('#modal-township-facilities-edit').openModal(); 
        }}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">edit</i>
          <h4> Edit: {locationCode} </h4>
        </a>
        <a
        onClick={() => {
          this.setState({showEditModal: true})
          $('#modal-township-facilities-duplicate').openModal(); 
        }}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">content_copy</i>
          <h4> Duplicate: {locationCode} </h4>
        </a>

        <a
        onClick={() => $('#modal-delete').openModal() }
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">delete</i>
          <h4> Delete: {locationCode} </h4>
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
                  ajaxDelete('manage_locations', this.state.rowData.id, this.handleSuccess);
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

  renderTable() {
    let parkingData = this.props.townshipLocationsFetched.data.resource;

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
            'location_type',  
            'township_code', 
            'rows',  
            'lots_per_rows', ]}
        />

        <div className="divider"/> 
        
        <div className="center-align">

          <a
            className="modal-trigger waves-effect waves-light btn valign" 
            onClick={() => $('#modal-township-facilities-create').openModal()}
            style={{margin: 10}}>Add New Facility</a>

        </div>
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
                  <a className="brand-logo center">Township Facilities</a>
                </div>
              </nav>
               <div className="card">
                  <div className="township-userlist-container">
                    { this.props.townshipFacilitiesFetched.isLoading ||
                      this.props.townshipLocationsFetched.isLoading ? 
                       <div className="card-content center-align">
                        <div className="center-align"> <Spinner /> </div> 
                      </div> : this.renderTable()}
                  </div>
               </div>
               {this.state.showEditDuplicateButtons ? 
                this.renderEditDuplicateButtons(this.state.parkingLocationCode) : <div> </div>}
            </div>
          </div>
        </Body>

        { 
          this.props.townshipFacilitiesFetched.isLoading ||
          this.props.townshipLocationsFetched.isLoading ||
          this.props.townshipSchemeTypesFetched.isLoading ?
          <div> </div> : this.renderCreateModal()
        }
        
        <TownshipPanelFacilitiesForm
          modalName="modal-township-facilities-edit" 
          modalText="Edit a Facility" 
          submitType="EDIT"
          initialValues={this.state.rowData} 
          handleSuccess={this.handleSuccess}
          townshipCode={this.props.townshipCode}
        />
        <TownshipPanelFacilitiesForm
          modalName="modal-township-facilities-duplicate" 
          modalText="Duplicate a Facility" 
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
    townshipFacilitiesFetched: state.townshipFacilitiesFetched,
    townshipLocationsCreated: state.townshipLocationsCreated,
    townshipLocationsFetched: state.townshipLocationsFetched,
    townshipSchemeTypesFetched: state.townshipSchemeTypesFetched,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipFacilities,
    fetchTownshipLocations,
    createTownshipLocations,
    resetLoading,
    fetchTownshipSchemeTypes,
    createTownshipFacilities
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'create',
  fields
})(TownshipPanelFacilities));