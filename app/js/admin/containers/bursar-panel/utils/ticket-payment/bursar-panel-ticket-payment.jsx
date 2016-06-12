import React from 'react'
import { reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import datetime from 'node-datetime'
import {SimpleSelect} from "react-selectize"

import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'
import {optionsSelectize} from '../../../../common/components/options-selectize.js'

import {fetchBursarTicketPayment} from '../../../../actions/actions-bursar-panel.jsx'
import {fetchTownshipLocations} from '../../../../actions/actions-township-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

export const fields = [ 
  'id',
  'ip',
  'ticket_no',
  'plate_num',
  'user_id',
  'address',
  'email',
  'paypal_total',
  'violation_charge',
  'violation_details',
  'violation_location',
  'pld_guilty',
  'penalty_adjustment',
  'adjust_rfchange',
  'new_amt_due',
  'pmt_status',
  'ticket_status',
  'pmt_options',
  'ipn_txn_id',
  'ipn_payment',
  'tr_percentage',
  'ipn_address',
  'wallet_balance',
  'township_code',
  'twp_payment',
  'ipn_status',
  'adjust_ref',
  'phone',
  'paid_date',
  'ipn_custom',
  'penalty_change',
  'date_payment',
  'tr_fee',
  'cheque_details',
  'cheque_date',
  'violation_date',
  'cheque_no',
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
    this.props.fetchBursarTicketPayment();
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
        id,
        ip,
        ticket_no,
        plate_num,
        user_id,
        address,
        email,
        paypal_total,
        violation_charge,
        violation_details,
        violation_location,
        pld_guilty,
        penalty_adjustment,
        adjust_rfchange,
        new_amt_due,
        pmt_status,
        ticket_status,
        pmt_options,
        ipn_txn_id,
        ipn_payment,
        tr_percentage,
        ipn_address,
        wallet_balance,
        township_code,
        twp_payment,
        ipn_status,
        adjust_ref,
        phone,
        paid_date,
        ipn_custom,
        penalty_change,
        date_payment,
        tr_fee,
        cheque_details,
        cheque_date,
        violation_date,
        cheque_no,
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
                <h4>Create a Ticket Payment</h4>
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
                className="waves-effect waves-light btn">Create Ticket Payment</button>
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
          <td>{data.id}</td>
          <td>{data.ip}</td>
          <td>{data.ticket_no}</td>
          <td>{data.plate_num}</td>
          <td>{data.user_id}</td>
          <td>{data.address}</td>
          <td>{data.email}</td>
          <td>{data.paypal_total}</td>
          <td>{data.violation_charge}</td>
          <td>{data.violation_details}</td>
          <td>{data.violation_location}</td>
          <td>{data.pld_guilty}</td>
          <td>{data.penalty_adjustment}</td>
          <td>{data.adjust_rfchange}</td>
          <td>{data.new_amt_due}</td>
          <td>{data.pmt_status}</td>
          <td>{data.ticket_status}</td>
          <td>{data.pmt_options}</td>
          <td>{data.ipn_txn_id}</td>
          <td>{data.ipn_payment}</td>
          <td>{data.tr_percentage}</td>
          <td>{data.ipn_address}</td>
          <td>{data.wallet_balance}</td>
          <td>{data.township_code}</td>
          <td>{data.twp_payment}</td>
          <td>{data.ipn_status}</td>
          <td>{data.adjust_ref}</td>
          <td>{data.phone}</td>
          <td>{data.paid_date}</td>
          <td>{data.ipn_custom}</td>
          <td>{data.penalty_change}</td>
          <td>{data.date_payment}</td>
          <td>{data.tr_fee}</td>
          <td>{data.cheque_details}</td>
          <td>{data.cheque_date}</td>
          <td>{data.violation_date}</td>
          <td>{data.cheque_no}</td>
        </tr>
      );
    });
  }

  renderTable() {
    let parkingPermitsData = this.props.bursarTicketPaymentFetched.data.resource;
    return (
      <div>
        <table className="highlight">
          <thead>
            <tr>
              <th data-field="id">id</th>
              <th data-field="id">ip</th>
              <th data-field="id">ticket_no</th>
              <th data-field="id">plate_num</th>
              <th data-field="id">user_id</th>
              <th data-field="id">address</th>
              <th data-field="id">email</th>
              <th data-field="id">paypal_total</th>
              <th data-field="id">violation_charge</th>
              <th data-field="id">violation_details</th>
              <th data-field="id">violation_location</th>
              <th data-field="id">pld_guilty</th>
              <th data-field="id">penalty_adjustment</th>
              <th data-field="id">adjust_rfchange</th>
              <th data-field="id">new_amt_due</th>
              <th data-field="id">pmt_status</th>
              <th data-field="id">ticket_status</th>
              <th data-field="id">pmt_options</th>
              <th data-field="id">ipn_txn_id</th>
              <th data-field="id">ipn_payment</th>
              <th data-field="id">tr_percentage</th>
              <th data-field="id">ipn_address</th>
              <th data-field="id">wallet_balance</th>
              <th data-field="id">township_code</th>
              <th data-field="id">twp_payment</th>
              <th data-field="id">ipn_status</th>
              <th data-field="id">adjust_ref</th>
              <th data-field="id">phone</th>
              <th data-field="id">paid_date</th>
              <th data-field="id">ipn_custom</th>
              <th data-field="id">penalty_change</th>
              <th data-field="id">date_payment</th>
              <th data-field="id">tr_fee</th>
              <th data-field="id">cheque_details</th>
              <th data-field="id">cheque_date</th>
              <th data-field="id">violation_date</th>
              <th data-field="id">cheque_no</th>
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
            style={{margin: 10}}>Add New Ticket Payment</a>
        </div>
      </div>
    );
  }

  render() {
    console.log(this.props.bursarTicketPaymentFetched)
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>
          <div className="row" style={{marginTop: 40}}>
            <div className="col s12">
              <nav>
                <div className="nav-wrapper nav-admin z-depth-2">
                  <a className="brand-logo center">Ticket Payment</a>
                </div>
              </nav>
               <div className="card">
                  <div className="township-userlist-container">
                    { this.props.bursarTicketPaymentFetched.isLoading ||
                      this.props.townshipLocationsFetched.isLoading ? 
                      <div> </div> : this.renderTable()}
                  </div>
               </div>
            </div>
          </div>
        </Body>


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
    bursarTicketPaymentFetched: state.bursarTicketPaymentFetched,
    townshipLocationsFetched: state.townshipLocationsFetched,
    townshipSchemeTypesFetched: state.townshipSchemeTypesFetched,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchBursarTicketPayment,
    fetchTownshipLocations,
    fetchTownshipSchemeTypes
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'ticket-payment',
  fields
})(BursarPanelPermitPayment));

/*
{ this.props.bursarTicketPaymentFetched.isLoading ||
  this.props.townshipLocationsFetched.isLoading ||
  this.props.townshipSchemeTypesFetched.isLoading ? 
  <div> </div> : this.renderCreateModal()}
  */