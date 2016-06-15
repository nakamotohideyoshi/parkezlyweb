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


class InspectorParkingField extends React.Component {

  constructor(props) {
    super(props);

    this.renderCreateModal = this.renderCreateModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.renderTable = this.renderTable.bind(this);
  }

  componentWillMount() {
    this.props.fetchInspectorParkingField();
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

  render() {
    console.log(this.props.townshipLocationsFetched)
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>
          <div className="row" style={{marginTop: 40}}>
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
            </div>
          </div>
        </Body>
        { this.props.inspectorParkingFieldFetched.isLoading ||
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
