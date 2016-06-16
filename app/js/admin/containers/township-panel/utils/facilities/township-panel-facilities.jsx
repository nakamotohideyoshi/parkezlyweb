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
  resetLoading} from '../../../../actions/actions-township-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'
import { Link } from 'react-router';

export const fields = [ 
  'id',  
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
      <div onClick={() => this.props.metadata.customComponentMetadata.renderEditModal(this.props.rowData.location_code)}>
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
      showParkingRulesButton: false,
      parkingLocationCode: null,
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
    if (this.props.townshipFacilitiesCreated.isLoading) {
    } else if (!this.props.townshipFacilitiesCreated.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess(){
    this.props.resetLoading();
    $('#modal-inspector-ticket-create').closeModal();
    $('#modal-success').openModal();
    this.props.fetchTownshipFacilities();
  }

  handleSubmit(data) {
    this.props.createTownshipFacilities(data);
  }

  tempInputs() {
    const {dispatch} = this.props;

    return fields.map((data) => {
      return( 
        <div className="col s6 admin-form-input">
          <div className="form-group">
            <label>{data}</label>
            <input type="text" placeholder={data} onChange={(event) => 
              dispatch(change('create-ticket', data, event.target.value))
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
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)} style={{margin: 0}}>
        <div id="modal-inspector-ticket-create" className="modal modal-fixed-footer">
          <div className="modal-content">

            <div className="row">
              <div className="center-align">
                <h4>Create a Township Facility</h4>
                <p className="center-align">Create a Township Facility by filling out the fields.</p>
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
                className="waves-effect waves-light btn">Create Parking Plate</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );

  }

  renderEditModal(locationCode) {
    console.log(locationCode);
    window.scrollTo(0, document.body.scrollHeight);
    this.setState({showParkingRulesButton: true, parkingLocationCode: locationCode})
  }

  renderParkingRulesButton(locationCode) {
    return (
      <div className="container">
        <Link 
        to={{pathname: `admin/township/facilities/parking-rules/${locationCode}`}} 
        style={{marginTop: 10, }}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">report</i>
          <h4> {locationCode}'s Parking Rules </h4>
        </Link>
      </div>
    );
  }

  renderTable() {
    console.log(this.props.townshipLocations)
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
            onClick={() => $('#modal-inspector-ticket-create').openModal()}
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
          <div className="row" style={{marginTop: 40}}>
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
                      <div> </div> : this.renderTable()}
                  </div>
               </div>

               {this.state.showParkingRulesButton ? 
                this.renderParkingRulesButton(this.state.parkingLocationCode) : <div> </div>}
            </div>
          </div>
        </Body>
        { this.props.townshipFacilitiesFetched.isLoading ||
          this.props.townshipLocationsFetched.isLoading ||
          this.props.townshipSchemeTypesFetched.isLoading ? 
          <div> </div> : this.renderCreateModal()}

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
    townshipFacilitiesCreated: state.townshipFacilitiesCreated,
    townshipLocationsFetched: state.townshipLocationsFetched,
    townshipSchemeTypesFetched: state.townshipSchemeTypesFetched,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipFacilities,
    fetchTownshipLocations,
    resetLoading,
    fetchTownshipSchemeTypes,
    createTownshipFacilities
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'create-ticket',
  fields
})(TownshipPanelFacilities));
