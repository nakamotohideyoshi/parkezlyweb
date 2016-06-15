import React from 'react'
import { reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import datetime from 'node-datetime'
import {SimpleSelect} from "react-selectize"

import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'
import {optionsSelectize} from '../../../../common/components/options-selectize.js'

import {fetchBursarPermitPayment, createBursarPermitPayment, resetLoading} from '../../../../actions/actions-bursar-panel.jsx'
import {fetchTownshipLocations} from '../../../../actions/actions-township-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

export const fields = [ 
  'date_expiry',
  'user_name',
  'permit_approved',
  'rate',
  'pay_method',
  'amount',
  'cashier_id',
  'user_id',
  'twnship_code',
  'twnshp_name',
  'permit_name',
  'permit_type',
  'scheme_type',
  'loc_code',
  'loc_name',
  'duration',
  'duration_period',
  'ip',
  'date_payment'
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
    this.props.fetchBursarPermitPayment();
    this.props.fetchTownshipSchemeTypes();
    this.props.fetchTownshipLocations(this.props.townshipCode);
  }

  componentDidUpdate() {
    if (this.props.bursarPermitPaymentCreated.isLoading) {
    } else if (!this.props.bursarPermitPaymentCreated.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess(){
    this.props.resetLoading();
    $('#modal-bursar-permit-create').closeModal();
    this.props.fetchBursarPermitPayment();
  }

  handleSubmit(data) {
    this.props.createBursarPermitPayment(data);
  }

  tempInputs() {
    const {dispatch} = this.props;

    return fields.map((data) => {
      return( 
        <div className="col s6 admin-form-input">
          <div className="form-group">
            <label>{data}</label>
            <input type="text" placeholder={data} onChange={(event) => 
              dispatch(change('permit-payment', data, event.target.value))
            }/>
          </div>
        </div>
      );
    });
  }

  renderCreateModal() {
    
    const {
      fields: {
        date_expiry,
        user_name,
        permit_approved,
        rate,
        pay_method,
        amount,
        cashier_id,
        user_id,
        twnship_code,
        twnshp_name,
        permit_name,
        permit_type,
        scheme_type,
        loc_code,
        loc_name,
        duration,
        duration_period,
        ip,
        date_payment
      },
      resetForm,
      submitting,
      dispatch
    } = this.props

    return(
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)} style={{margin: 0}}>
        <div id="modal-bursar-permit-create" className="modal modal-fixed-footer">
          <div className="modal-content">

            <div className="row">
              <div className="center-align">
                <h4>Create a Permit Payment</h4>
                <p className="center-align">Create a parking payment by filling out the fields.</p>
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
                className="waves-effect waves-light btn">Create Permit Payment</button>
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
          <td>{data.date_expiry}</td>
          <td>{data.user_name}</td>
          <td>{data.permit_approved}</td>
          <td>{data.rate}</td>
          <td>{data.pay_method}</td>
          <td>{data.amount}</td>
          <td>{data.cashier_id}</td>
          <td>{data.user_id}</td>
          <td>{data.twnshp_code}</td>
          <td>{data.twnshp_name}</td>
          <td>{data.permit_name}</td>
          <td>{data.permit_type}</td>
          <td>{data.scheme_type}</td>
          <td>{data.loc_code}</td>
          <td>{data.loc_name}</td>
          <td>{data.duration}</td>
          <td>{data.duration_period}</td>
          <td>{data.ip}</td>
          <td>{data.date_payment}</td>
        </tr>
      );
    });
  }

  renderTable() {
    let permitsData = this.props.bursarPermitPaymentFetched.data.resource;
    return (
      <div>
        <Griddle
          tableClassName={'table table-bordered table-striped table-hover'}
          filterClassName={''}
          useGriddleStyles={false}
          results={permitsData}
          showFilter={true}
          showSettings={true}
          settingsToggleClassName='btn btn-default'
          useCustomPagerComponent={true}
          customPagerComponent={ BootstrapPager }
          columns={['id',
                    'date_expiry',
                    'user_name',
                    'permit_approved',
                    'rate',
                    'pay_method',
                    'amount',
                    'cashier_id',
                    'user_id']}
          useCustomFilterComponent={true} 
          customFilterComponent={customFilterComponent}
          useCustomFilterer={true} 
          customFilterer={customFilterFunction}
        />
      </div>
    );
  }

  render() {
    console.log(this.props.bursarPermitPaymentFetched)
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>
          <div className="row" style={{marginTop: 40}}>
            <div className="col s12">
              <nav>
                <div className="nav-wrapper nav-admin z-depth-2">
                  <a className="brand-logo center">Permit Payment</a>
                </div>
              </nav>
               <div className="card">
                  <div className="township-userlist-container">
                    { this.props.bursarPermitPaymentFetched.isLoading ? 
                      <div className="center-align"> <Spinner /> </div> : this.renderTable()}
                  </div>

              <div className="divider"/> 

              <div className="center-align">
                <a
                  className="modal-trigger waves-effect waves-light btn valign" 
                  onClick={() => $('#modal-bursar-permit-create').openModal()}
                  style={{margin: 10}}>Add New Permit Payment</a>
              </div>
               </div>
            </div>
          </div>
        </Body>
        { this.props.townshipLocationsFetched.isLoading ||
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
    bursarPermitPaymentFetched: state.bursarPermitPaymentFetched,
    bursarPermitPaymentCreated: state.bursarPermitPaymentCreated,
    townshipLocationsFetched: state.townshipLocationsFetched,
    townshipSchemeTypesFetched: state.townshipSchemeTypesFetched,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchBursarPermitPayment,
    createBursarPermitPayment,
    resetLoading,
    fetchTownshipLocations,
    fetchTownshipSchemeTypes
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'permit-payment',
  fields
})(BursarPanelPermitPayment));
