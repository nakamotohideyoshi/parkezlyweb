import React from 'react'
import { reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import datetime from 'node-datetime'
import {SimpleSelect} from "react-selectize"

import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'
import {optionsSelectize} from '../../../../common/components/options-selectize.js'

import {fetchTownshipLocations, fetchHearingPlace, createHearingPlace, resetLoading} from '../../../../actions/actions-township-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

export const fields = [ 
  'id',  
  'date_time', 
  'court_id',  
  'hearing_location',  
  'hearing_address', 
  'court_contact', 
  'township_code',
]


class TownshipPanelHearingPlace extends React.Component {

  constructor(props) {
    super(props);

    this.renderCreateModal = this.renderCreateModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.renderTable = this.renderTable.bind(this);
  }

  componentWillMount() {
    this.props.fetchHearingPlace();
    this.props.fetchTownshipSchemeTypes();
    this.props.fetchTownshipLocations(this.props.townshipCode);
  }

  componentDidUpdate() {
    if (this.props.townshipHearingPlaceCreated.isLoading) {
    } else if (!this.props.townshipHearingPlaceCreated.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess(){
    this.props.resetLoading();
    $('#modal-inspector-ticket-create').closeModal();
    $('#modal-success').openModal();
    this.props.fetchHearingPlace();
  }

  handleSubmit(data) {
    this.props.createHearingPlace(data);
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
                <h4>Create a Hearing Place</h4>
                <p className="center-align">Create a Hearing Place by filling out the fields.</p>
              </div>
            </div>

            <div className="row">

              {this.tempInputs()}

            </div>
          </div>
          

          <div className="modal-footer">
            <div className="row marginless-row">
              <div className="col s12 center-align">
                <button 
                type="submit" 
                disabled={submitting} 
                className="waves-effect waves-light btn">Create Hearing Place</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );

  }

  renderTable() {
    console.log(this.props.townshipHearingPlaceFetched)
    let parkingData = this.props.townshipHearingPlaceFetched.data.resource;

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
        />

        <div className="divider"/> 

        <div className="center-align">

          <a
            className="modal-trigger waves-effect waves-light btn valign" 
            onClick={() => $('#modal-inspector-ticket-create').openModal()}
            style={{margin: 10}}>Add New Hearing Place</a>

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
                  <a className="brand-logo center">Hearing Place</a>
                </div>
              </nav>
               <div className="card">
                  <div className="township-userlist-container">
                    { this.props.townshipHearingPlaceFetched.isLoading ||
                      this.props.townshipLocationsFetched.isLoading ? 
                      <div> </div> : this.renderTable()}
                  </div>
               </div>
            </div>
          </div>
        </Body>
        { this.props.townshipHearingPlaceFetched.isLoading ||
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
    townshipHearingPlaceFetched: state.townshipHearingPlaceFetched,
    townshipHearingPlaceCreated: state.townshipHearingPlaceCreated,
    townshipLocationsFetched: state.townshipLocationsFetched,
    townshipSchemeTypesFetched: state.townshipSchemeTypesFetched,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchHearingPlace,
    fetchTownshipLocations,
    resetLoading,
    fetchTownshipSchemeTypes,
    createHearingPlace
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'create-ticket',
  fields
})(TownshipPanelHearingPlace));
