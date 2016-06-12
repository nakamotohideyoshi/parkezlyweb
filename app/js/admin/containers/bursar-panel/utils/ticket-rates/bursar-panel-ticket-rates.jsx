import React from 'react'
import { reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import datetime from 'node-datetime'
import {SimpleSelect} from "react-selectize"

import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'
import {optionsSelectize} from '../../../../common/components/options-selectize.js'

import {fetchBursarParkingPayment} from '../../../../actions/actions-bursar-panel.jsx'
import {fetchTownshipLocations} from '../../../../actions/actions-township-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

export const fields = [ 
  'vehicle_id',
  'user_name',
  'date',
  'location_id',
  'scheme_type',
  'rate',
  'pay_method',
  'amount',
  'cashier_id',
  'user_id',
]


class BursarPanelPermitPayment extends React.Component {

  constructor(props) {
    super(props);

    this.renderCreateModal = this.renderCreateModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.renderTableData = this.renderTableData.bind(this);
  }

  componentWillMount() {
    this.props.fetchBursarParkingPayment();
    this.props.fetchTownshipSchemeTypes();
    this.props.fetchTownshipLocations(this.props.townshipCode);
  }

  handleSuccess(){

  }

  handleSubmit(data) {

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

    var optionsLocationCode = optionsSelectize(this.props.townshipLocationsFetched.data.resource, 'location_code');
    var optionsSchemeTypes = optionsSelectize(this.props.townshipSchemeTypesFetched.data.resource, 'scheme_type');

    return(
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)} style={{margin: 0}}>
        <div id="modal-bursar-payment-create" className="modal modal-fixed-footer">
          <div className="modal-content">

            <div className="row">
              <div className="center-align">
                <h4>Create a Parking Payment</h4>
                <p className="center-align">Create a parking payment by filling out the fields.</p>
              </div>
            </div>

            <div className="row">

              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Scheme Type</label>
                  <div clasName="input-field col s12">
                    <SimpleSelect 
                    options = {optionsSchemeTypes} 
                    placeholder = "Select Scheme Type" 
                    theme = "material" 
                    style={{marginTop: 5}}
                    onValueChange = {(value) => {
                      dispatch(change('locations-rate', 'scheme_type', value.value)); 
                    }}></SimpleSelect>
                  </div>
                </div>
              </div>


              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Location Code</label>
                  <SimpleSelect 
                    options = {optionsLocationCode} 
                    placeholder = "Select a User Name" 
                    theme = "material" 
                    style={{marginTop: 5}}
                    onValueChange = {(value) => {
                      dispatch(change('parking-payment', 'location_code', value.value));     
                    }}></SimpleSelect>
                </div>
              </div>

              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Vehicle Id</label>
                  <input type="text" placeholder="Vehicle Id" {...vehicle_id}/>
                </div>
              </div>

              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Vehicle Id</label>
                  <input type="text" placeholder="Vehicle Id" {...vehicle_id}/>
                </div>
              </div>


            </div>
          </div>
          

          <div className="modal-footer">
            <div className="row marginless-row">
              <div className="col s8">
                <button 
                type="submit" 
                disabled={submitting} 
                className="waves-effect waves-light btn">Create Parking Payment</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );

  }

  renderTableData(parkingPermitsData) {
    return parkingPermitsData.map((data) => {
      return( 
        <tr key={data.id}>
          <td>{data.vehicle_id}</td>
          <td>{data.user_name}</td>
          <td>{data.date}</td>
          <td>{data.location_id}</td>
          <td>{data.scheme_type}</td>
          <td>{data.rate}</td>
          <td>{data.payment_method}</td>
          <td>{data.amount}</td>
          <td>{data.cashier_id}</td>
          <td>{data.user_id}</td>
        </tr>
      );
    });
  }

  renderTable() {
    console.log(this.props.bursarParkingPaymentFetched)
    let parkingPermitsData = this.props.bursarParkingPaymentFetched.data.resource;
    return (
      <div>
        <table className="highlight">
          <thead>
            <tr>
              <th data-field="id">Vechile Id</th>
              <th data-field="name">User Name</th>
              <th data-field="price">Date</th>
              <th data-field="price">Location Id</th>
              <th data-field="price">Scheme Type</th>
              <th data-field="price">Rate</th>
              <th data-field="price">Pay Method</th>
              <th data-field="price">Amount</th>
              <th data-field="price">Cashier Id</th>
              <th data-field="price">User Id</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTableData(parkingPermitsData)}
          </tbody>
        </table>

        <div className="divider"/> 

        <div className="center-align">
          <a
            className="modal-trigger waves-effect waves-light btn valign" 
            onClick={() => $('#modal-bursar-payment-create').openModal()}
            style={{margin: 10}}>Add New Parking Payment</a>
        </div>
      </div>
    );
  }

  render() {
    console.log(this.props.townshipLocationsFetched)
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>
          <div className="container" style={{marginTop: 40}}>
            <div>
              <nav>
                <div className="nav-wrapper nav-admin z-depth-2">
                  <a className="brand-logo center">Parking Payment</a>
                </div>
              </nav>
               <div className="card">
                  <div className="township-userlist-container">
                    { this.props.bursarParkingPaymentFetched.isLoading ||
                      this.props.townshipLocationsFetched.isLoading ? 
                      <div> </div> : this.renderTable()}
                  </div>
               </div>
            </div>
          </div>
        </Body>
        { this.props.bursarParkingPaymentFetched.isLoading ||
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
    bursarParkingPaymentFetched: state.bursarParkingPaymentFetched,
    townshipLocationsFetched: state.townshipLocationsFetched,
    townshipSchemeTypesFetched: state.townshipSchemeTypesFetched,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchBursarParkingPayment,
    fetchTownshipLocations,
    fetchTownshipSchemeTypes
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'permit-payment',
  fields
})(BursarPanelPermitPayment));
