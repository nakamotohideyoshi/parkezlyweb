import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { reduxForm, change } from 'redux-form'
import datetime from 'node-datetime';

import {
  fetchTownshipPermitTypes, 
  createTownshipPermitTypes,
  resetLoading
} from '../../../../../actions/actions-township-panel.jsx'

import Spinner from '../../../../../common/components/spinner.jsx';

import Griddle from 'griddle-react'
import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import {customFilterComponent, customFilterFunction} from '../../../../../common/components/griddle-custom-filter.jsx'

import {ajaxSelectizeGet, ajaxSelectizeFilteredGet, ajaxDelete, ajaxGet, ajaxPost} from '../../../../../common/components/ajax-selectize.js'
import SubscriptionsForm from './subscriptions-form'


export const fields = [ 
  'id',
  'date_time',
  'user_name',
  'township_name',
  'location_code',
  'location_name',
  'bill_date',
  'expiry_date',
  'permit_name',
  'rate',
  'ipn_custom_element',
  'ipn_custom_value',
  'ipn_txn_id',
  'ipn_payment',
  'ipn_status',
  'ipn_address',
  'user_id',
  'ip',
  'paypal_logo',
  'logo_paypal',
  'township_code',
  'scheme_type',
  'permit_type',
  'duration',
  'duration_period',
  'permit_status',
  'expired',
]

class customColumnComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onClick={() => this.props.metadata.customComponentMetadata.renderEditModal(
        this.props.rowData)}>
        {this.props.data}
      </div>
    );
  }
}

customColumnComponent.defaultProps = { "data": {}, "renderEditModal": null};

class Subscriptions extends React.Component {

  constructor(props) {
    super(props);

    this.renderPermitList = this.renderPermitList.bind(this);
    this.renderEditModal = this.renderEditModal.bind(this);

    this.state = {
      showEditDuplicateButtons: false,
      parkingLocationCode: null,
      showEditModal: false,
      rowData: null,
      subscriptionData: null,
      selectizeOptions: {}
    }

    var dt = datetime.create();
    var formattedDate = dt.format('m-d-Y H:M:S');
    this.props.dispatch(change('subscriptions', 'date_time', formattedDate));
  }

  renderEditModal(rowData) {
    window.scrollTo(0, document.body.scrollHeight);
    this.setState({showEditDuplicateButtons: true, rowData: rowData, showEditModal: true})
  }

  componentWillMount() {
    ajaxGet('subscriptions', (table) => {
      this.setState({subscriptionData: table.data.resource});
    });
  }

  renderPermitList() {
      let filteredData = this.state.subscriptionData;

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

      return( 
        <div>
          <Griddle
            tableClassName={'table table-bordered table-striped table-hover'}
            filterClassName={''}
            useGriddleStyles={false}
            results={filteredData}
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
            'user_name',
            'township_name',
            'location_code',
            'location_name',
            'bill_date',
            'expiry_date',
            'permit_name',
          ]}
          />
        </div>
      );
  }

    renderEditDuplicateButtons(locationCode) {
    return (
      <div className="container" style={{marginTop: 40}}>
        <a
        onClick={() => {
          this.setState({showEditModal: true})
          $('#modal-subscriptions-edit').openModal(); 
        }}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">edit</i>
          <h4> Edit Subscription: {locationCode} </h4>
        </a>
        <a
        onClick={() => {
          this.setState({showEditModal: true})
          $('#modal-subscriptions-duplicate').openModal(); 
        }}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">content_copy</i>
          <h4> Duplicate Subscription: {locationCode} </h4>
        </a>

        <a
        onClick={() => $('#modal-delete').openModal() }
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">delete</i>
          <h4> Delete Subscription: {locationCode} </h4>
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
                  ajaxDelete('subscriptions', this.state.rowData.id, this.handleSuccess);
                  this.setState({showEditDuplicateButtons: false});
                  window.scrollTo(0, 0);
                }}>Yes</a>
              </div>
            </div>
          </div>
        </div>
        { 
          !this.state.showEditModal ?
          <div></div> : 
          <div>
            <SubscriptionsForm
              initialValues={this.state.rowData} 
              handleSuccess={this.handleSuccess}
              modalName="modal-subscriptions-edit" 
              modalText="Edit a Subscription" 
              submitType="EDIT"
              initialValues={this.state.rowData} 
              rowData={this.state.rowData}
              handleSuccess={this.handleSuccess}
            />
            <SubscriptionsForm
              initialValues={this.state.rowData} 
              handleSuccess={this.handleSuccess}
              modalName="modal-subscriptions-duplicate" 
              modalText="Duplicate a Subscription" 
              submitType="DUPLICATE"
              initialValues={this.state.rowData} 
              rowData={this.state.rowData}
              handleSuccess={this.handleSuccess}
            />
          </div>
        }
      </div>
    );
  }

  render() {
    return (
      <div className="col s12" style={{marginBottom: 40}}>
        <nav>
          <div className="nav-wrapper nav-admin z-depth-2">
            <a className="brand-logo center">Subscriptions</a>
          </div>
        </nav>
        <div className="card">

          <div className="township-list-container">
            <ul className="collection z-depth-2">
              {this.state.subscriptionData === null ? 
                <div className="center-align"> <Spinner /> </div> : this.renderPermitList()}
            </ul>
          </div>

          <div className="divider"/>

          <div className="center-align">
            <a
              className="modal-trigger waves-effect waves-light btn valign" 
              onClick={() => $('#modal-permit-type-create').openModal()}
              style={{margin: 10}}>Add New Subscriptions</a>
          </div>

        </div>

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

        {this.state.showEditDuplicateButtons ? 
                this.renderEditDuplicateButtons(this.state.rowData.id) : <div> </div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    townshipPermitTypesFetched: state.townshipPermitTypesFetched,
    townshipPermitTypesCreated: state.townshipPermitTypesCreated
  }   
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipPermitTypes,
    createTownshipPermitTypes,
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'subscriptions',
  fields
})(Subscriptions));

