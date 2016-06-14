import React from 'react'
import { reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import datetime from 'node-datetime'
import {SimpleSelect} from "react-selectize"

import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'
import {optionsSelectize} from '../../../../common/components/options-selectize.js'

import {fetchBursarWalletPayment, createBursarWalletPayment, resetLoading} from '../../../../actions/actions-bursar-panel.jsx'
import {fetchTownshipLocations} from '../../../../actions/actions-township-panel.jsx'
import {fetchTownshipSchemeTypes} from '../../../../actions/actions-township-common.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

export const fields = [ 
  'id',
  'date_time',
  'user_id',
  'wallet_id',
  'current_balance',
  'pay_method',
  'amount',
  'cashier_id',
  'user_name',
  'cbalance',
]


class BursarPanelWalletPayment extends React.Component {

  constructor(props) {
    super(props);

    this.renderCreateModal = this.renderCreateModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.renderTable = this.renderTable.bind(this);
  }

  componentWillMount() {
    this.props.fetchBursarWalletPayment();
    this.props.fetchTownshipSchemeTypes();
    this.props.fetchTownshipLocations(this.props.townshipCode);
  } 

  componentDidUpdate() {
    if (this.props.bursarWalletPaymentCreated.isLoading) {
    } else if (!this.props.bursarWalletPaymentCreated.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess(){
    this.props.resetLoading();
    $('#modal-bursar-payment-create').closeModal();
    this.props.fetchBursarWalletPayment();
  }

  handleSubmit(data) {
    this.props.createBursarWalletPayment(data);
  }
  tempInputs() {
    const {dispatch} = this.props;

    return fields.map((data) => {
      return( 
        <div className="col s6 admin-form-input">
          <div className="form-group">
            <label>{data}</label>
            <input type="text" placeholder={data} onChange={(event) => 
              dispatch(change('wallet-payment', data, event.target.value))
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
        date_time,
        user_id,
        wallet_id,
        current_balance,
        pay_method,
        amount,
        cashier_id,
        user_name,
        cbalance,
      },
      resetForm,
      submitting,
      dispatch
    } = this.props

    return(
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)} style={{margin: 0}}>
        <div id="modal-bursar-payment-create" className="modal modal-fixed-footer">
          <div className="modal-content">

            <div className="row">
              <div className="center-align">
                <h4>Create a Wallet Payment</h4>
                <p className="center-align">Create a Wallet payment by filling out the fields.</p>
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
                className="waves-effect waves-light btn">Create Wallet Payment</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );

  }

  renderTable() {
    let walletData = this.props.bursarWalletPaymentFetched.data.resource;
    document.getElementById('griddle-metadata')
    return (
      <div>
        <div className="bursar-payment-container">
        <Griddle
          tableClassName={'table table-bordered table-striped table-hover'}
          filterClassName={''}
          useGriddleStyles={false}
          results={walletData}
          showFilter={true}
          showSettings={true}
          settingsToggleClassName='btn btn-default'
          useCustomPagerComponent={true}
          customPagerComponent={ BootstrapPager }
          useCustomFilterComponent={true} customFilterComponent={customFilterComponent}
          useCustomFilterer={true} customFilterer={customFilterFunction}
        />
        </div>
        <div className="divider"/> 

        <div className="center-align">
          <a
            className="modal-trigger waves-effect waves-light btn valign" 
            onClick={() => $('#modal-bursar-payment-create').openModal()}
            style={{margin: 10}}>Add New Wallet Payment</a>
        </div>
      </div>
    );
  }

  render() {
    console.log(this.props.bursarWalletPaymentFetched)
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>
          <div className="row" style={{marginTop: 40}}>
            <div className="col s12">
              <nav>
                <div className="nav-wrapper nav-admin z-depth-2">
                  <a className="brand-logo center">Wallet Payment</a>
                </div>
              </nav>
               <div className="card">
                  <div >
                    { this.props.bursarWalletPaymentFetched.isLoading ||
                      this.props.townshipLocationsFetched.isLoading ? 
                      <div> </div> : this.renderTable()}
                  </div>
               </div>
            </div>
          </div>
        </Body>
        { this.props.bursarWalletPaymentFetched.isLoading ? 
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
    bursarWalletPaymentFetched: state.bursarWalletPaymentFetched,
    bursarWalletPaymentCreated: state.bursarWalletPaymentCreated,
    townshipLocationsFetched: state.townshipLocationsFetched,
    townshipSchemeTypesFetched: state.townshipSchemeTypesFetched,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchBursarWalletPayment,
    resetLoading,
    createBursarWalletPayment,
    fetchTownshipLocations,
    fetchTownshipSchemeTypes
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'wallet-payment',
  fields
})(BursarPanelWalletPayment));