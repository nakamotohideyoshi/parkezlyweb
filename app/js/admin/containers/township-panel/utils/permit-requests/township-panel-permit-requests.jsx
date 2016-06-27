import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

import Body from "../../../../../common/components/body/body.jsx";
import {fetchTownshipPermitRequests, 
  editTownshipPermitRequests, 
  resetLoading} from '../../../../actions/actions-township-panel.jsx';

import {Tabbordion, Panel} from 'react-tabbordion'

import {ajaxSelectizeGet, ajaxDelete} from '../../../../common/components/ajax-selectize.js'
import Griddle from 'griddle-react'
import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

import {createFilter} from 'react-search-input';

var classNames = {
  content: 'traditional-tabs-content',
  panel: 'traditional-tabs-panel',
  title: 'traditional-tabs-title'
}

export const fields = [ 
  'id',  
  'date_time', 
  'user_id', 
  'township_code', 
  'township_name', 
  'permit_type', 
  'permit_name', 
  'residency_proof', 
  'approved',  
  'date_action', 
  'status',  
  'paid',  
  'user_comments', 
  'town_comments', 
  'logo',  
  'scheme_type', 
  'first_contact_date',  
  'permit_status_image', 
  'rate',  
  'user_name', 
  'signature',
]

class customColumnComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.rowData)
    if(this.props.data === "YES") {
      return (
        <div style={{color: "blue"}}>
          <i className="material-icons valign" style={{color: "#2DB63D"}}>check_box</i>
        </div>
      );
    } else if (this.props.data === "NO") {
      return (
        <div style={{color: "blue"}}>
          <i className="material-icons valign" style={{color: "#EAB41C"}}>new_releases</i>
        </div>
      );
    } else {
      return (
        <div style={{color: "blue"}}>
          <i className="material-icons valign" style={{color: "#D9534F"}}>indeterminate_check_box</i>
        </div>
      );
    }
  }
}

customColumnComponent.defaultProps = { "data": {}, "renderEditModal": null};

export default class TownshipPanelPermitRequests extends React.Component {

  constructor(props) {
    super(props);
    
    window.scrollTo(0, 0);

    $('.collapsible').collapsible();

    this.state = {
      showEditDuplicateButtons: false,
      parkingLocationCode: null,
      showEditModal: false,
      rowData: null,
      selectizeOptions: {},
      requestName: 'Name Unavailable'
    }

    this.renderApproveModal = this.renderApproveModal.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.renderEditModal = this.renderEditModal.bind(this);
  }

  componentWillMount() {
    this.props.fetchTownshipPermitRequests(this.props.townshipCode);
  }

  componentDidUpdate() {
    if (this.props.townshipPermitRequestsEdited.isLoading) {
    } else if (!this.props.townshipPermitRequestsEdited.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess(){
    this.props.resetLoading();
    $('#permit-requests-modal').closeModal();
    this.props.fetchTownshipPermitRequests(this.props.townshipCode);
  }

  renderApproveModal() {
    
    return(
     <div id="permit-requests-modal" className="modal">
      <div className="modal-content">
        <h4>Approve or Deny Permit Request </h4>
        <p>Request ID: {this.state.requestName}</p>
      </div>
      <div className="modal-footer">
        <div className="row marginless-row">
          <div className="col s6 left">
            <a className="waves-effect waves-light btn btn-yellow left" onClick={() => $('#permit-requests-modal').closeModal()}>Cancel</a>
          </div>
          <div className="col s3">
            <a className="waves-effect waves-light btn btn-red" onClick={
              () => this.props.editTownshipPermitRequests({"approved": "NO", "status": "ACTIVE"}, this.state.requestName)
            }>Reject</a>
          </div>
          <div className="col s3">
            <a className="waves-effect waves-light btn btn-green" onClick={
              () => this.props.editTownshipPermitRequests({"approved": "YES", "status": "ACTIVE"}, this.state.requestName)
            }>Approve</a>
          </div>
        </div>
      </div>
    </div>
    );
  }

  renderPendingData(filteredSubscriptions) {
    if(filteredSubscriptions.resource.length > 0){   
      return filteredSubscriptions.resource.map((request) => {
        if(request.status === 'INACTIVE') {
          return( 
          <tbody>
            <tr key={request.id} onClick={() => { 
                this.setState({requestName: request.id});
                $('#permit-requests-modal').openModal();
              }
            }>
              <td>{request.id}</td>
              <td>{request.township_code}</td>
              <td>{request.township_name}</td>
              <td>{request.permit_type}</td>
              <td>{request.permit_name}</td>
              <td>{request.residency_proof}</td>

              <td><i className="material-icons valign" style={{color: "#EAB41C"}}>new_releases</i> </td>

              <td>{request.date_action}</td>
              <td>{request.status}</td>
              <td>{request.paid}</td>
              <td>{request.user_comments}</td>
              <td>{request.town_comments}</td>
              <td>{request.logo}</td>
              <td>{request.schema_type}</td>
              <td>{request.first_contact_date}</td>
              <td>{request.rate}</td>
              <td>{request.user_name}</td>
            </tr>
          </tbody>
          );
        }
      });
    } else {
      return( 
        <tr>
          <td>There are no pending requests.</td> 
        </tr>
      );
    }
  }

  renderEditModal(recordId, rowData) {
    console.log(rowData);
    console.log(recordId);
    window.scrollTo(0, document.body.scrollHeight);
    this.setState({showEditDuplicateButtons: true, rowData: rowData, showEditModal: true, parkingLocationCode: recordId})
  }

  renderPendingTable() {

   var filteredSubscriptions = this.props.townshipPermitRequestsFetched.data;
   console.log(filteredSubscriptions.resource);

    var columnMeta = [
      {
        "columnName": "approved",
        "customComponent": customColumnComponent
      }
    ];

    return(
      <Griddle
        tableClassName={'table table-bordered table-striped table-hover'}
        filterClassName={''}
        useGriddleStyles={false}
        results={filteredSubscriptions.resource}
        showFilter={true}
        showSettings={true}
        settingsToggleClassName='btn btn-default'
        useCustomPagerComponent={true}
        customPagerComponent={ BootstrapPager }
        useCustomFilterComponent={true} 
        customFilterComponent={customFilterComponent}
        useCustomFilterer={true} 
        customFilterer={customFilterFunction}
        columnMetadata={columnMeta}
        columns={['id',  
                  'date_time', 
                  'user_id', 
                  'township_code', 
                  'township_name', 
                  'permit_type', 
                  'permit_name', 
                  'residency_proof', 
                  'approved',  ]}
      />
    );
  }

  renderApprovedData(filteredSubscriptions) {
    if(filteredSubscriptions.resource.length > 0){   
      return filteredSubscriptions.resource.map((request) => {
        if(request.approved === 'YES' && request.status === 'ACTIVE') {
          return( 
            <tbody>
              <tr key={request.id} onClick={() => { 
                  this.setState({requestName: request.id});
                  $('#permit-requests-modal').openModal();
                }
              }>
                <td>{request.id}</td>
                <td>{request.township_code}</td>
                <td>{request.township_name}</td>
                <td>{request.permit_type}</td>
                <td>{request.permit_name}</td>
                <td>{request.residency_proof}</td>

                <td><i className="material-icons valign" style={{color: "#2DB63D"}}>check_box</i></td>

                <td>{request.date_action}</td>
                <td>{request.status}</td>
                <td>{request.paid}</td>
                <td>{request.user_comments}</td>
                <td>{request.town_comments}</td>
                <td>{request.logo}</td>
                <td>{request.schema_type}</td>
                <td>{request.first_contact_date}</td>
                <td>{request.rate}</td>
                <td>{request.user_name}</td>
              </tr>
          </tbody>
          );
        }
      });
    } else {
      return( 
        <tr>
          <td>There are no pending requests.</td> 
        </tr>
      );
    }
  }

  renderApprovedTable() {
    /*
    if(this.props.townshipPermitRequestsFetched.isLoading === false) {
      console.log(this.props.townshipPermitRequestsFetched);
    }
    */
   var filteredSubscriptions = this.props.townshipPermitRequestsFetched.data;
   console.log(filteredSubscriptions.resource);
    return(
      <div className="township-permitrequests-container">
        <table className="highlight">
          <thead>
            <tr>
              <th data-field="id">ID</th>
              <th data-field="name">Township Code</th>
              <th data-field="price">Township Name</th>
              <th data-field="price">Permit Type</th>
              <th data-field="price">Permit Name</th>
              <th data-field="price">Residency Proof</th>
              <th data-field="price">Approved</th>
              <th data-field="price">Date Action</th>
              <th data-field="price">Status</th>
              <th data-field="price">Paid</th>
              <th data-field="price">User Comments</th>
              <th data-field="price">Town Comments</th>
              <th data-field="price">Logo</th>
              <th data-field="price">Scheme Type</th>
              <th data-field="price">First Contact Date</th>
              <th data-field="price">Rate</th>
              <th data-field="price">User Name</th>
            </tr>
          </thead>
          {this.renderApprovedData(filteredSubscriptions)}
        </table>
      </div>
    );
  }

  renderRejectedData(filteredSubscriptions) {
    if(filteredSubscriptions.resource.length > 0){   
      return filteredSubscriptions.resource.map((request) => {
        if(request.approved === 'NO' && request.status === 'ACTIVE') {
          return( 
          <tbody>
            <tr key={request.id} onClick={() => { 
                this.setState({requestName: request.id});
                $('#permit-requests-modal').openModal();
              }
            }>
              <td>{request.id}</td>
              <td>{request.township_code}</td>
              <td>{request.township_name}</td>
              <td>{request.permit_type}</td>
              <td>{request.permit_name}</td>
              <td>{request.residency_proof}</td>

              <td><i className="material-icons valign" style={{color: "#D9534F"}}>indeterminate_check_box</i> </td>

              <td>{request.date_action}</td>
              <td>{request.status}</td>
              <td>{request.paid}</td>
              <td>{request.user_comments}</td>
              <td>{request.town_comments}</td>
              <td>{request.logo}</td>
              <td>{request.schema_type}</td>
              <td>{request.first_contact_date}</td>
              <td>{request.rate}</td>
              <td>{request.user_name}</td>
            </tr>
          </tbody>
          );
        }
      });
    } else {
      return( 
        <tr>
          <td>There are no pending requests.</td> 
        </tr>
      );
    }
  }

  renderRejectedTable() {
    /*
    if(this.props.townshipPermitRequestsFetched.isLoading === false) {
      console.log(this.props.townshipPermitRequestsFetched);
    }
    */
   var filteredSubscriptions = this.props.townshipPermitRequestsFetched.data;
   console.log(filteredSubscriptions.resource);
    return(
      <div className="township-permitrequests-container">
        <table className="highlight">
          <thead>
            <tr>
              <th data-field="id">ID</th>
              <th data-field="name">Township Code</th>
              <th data-field="price">Township Name</th>
              <th data-field="price">Permit Type</th>
              <th data-field="price">Permit Name</th>
              <th data-field="price">Residency Proof</th>
              <th data-field="price">Approved</th>
              <th data-field="price">Date Action</th>
              <th data-field="price">Status</th>
              <th data-field="price">Paid</th>
              <th data-field="price">User Comments</th>
              <th data-field="price">Town Comments</th>
              <th data-field="price">Logo</th>
              <th data-field="price">Scheme Type</th>
              <th data-field="price">First Contact Date</th>
              <th data-field="price">Rate</th>
              <th data-field="price">User Name</th>
            </tr>
          </thead>
          {this.renderRejectedData(filteredSubscriptions)}
        </table>
      </div>
    );
  }

  render() {
    console.log(this.props.townshipPermitRequestsEdited)
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>
          <div style={{marginTop: 40}}>
          {this.renderApproveModal()}
            <div className="row marginless-row">
              <Tabbordion className="traditional-tab col s12 z-depth-2" classNames={classNames} initialIndex={0} name="tabs">
                <Panel title={<span>Pending Permit Requests</span>}>
                  <div className="row marginless-row" style={{marginTop: 40, marginBottom: 40}}>
                   <nav style={{marginTop: 40}}>
                      <div className="nav-wrapper nav-admin z-depth-2">
                        <a className="brand-logo center">Pending Permit Requests</a>
                      </div>
                    </nav>
                    <div className="card">
                      {this.props.townshipPermitRequestsFetched.isLoading ? 
                        <div>Loading...</div> : this.renderPendingTable() }
                    </div>
                  </div>  
                </Panel>
                <Panel title={<span>Approved Permit Requests</span>}>
                  <div className="row marginless-row" style={{marginTop: 40, marginBottom: 40}}>
                    <nav style={{marginTop: 40}}>
                      <div className="nav-wrapper nav-admin z-depth-2">
                        <a className="brand-logo center">Approved Permit Requests</a>
                      </div>
                    </nav>
                    <div className="card">
                      {this.props.townshipPermitRequestsFetched.isLoading ? 
                        <div>Loading...</div> : this.renderApprovedTable() }
                    </div>
                  </div>
                </Panel>
                <Panel title={<span>Rejected Permit Requests</span>}>
                  <div className="row marginless-row" style={{marginTop: 40, marginBottom: 40}}>
                    <nav style={{marginTop: 40}}>
                      <div className="nav-wrapper nav-admin z-depth-2">
                        <a className="brand-logo center">Rejected Permit Requests</a>
                      </div>
                    </nav>
                    <div className="card">
                      {this.props.townshipPermitRequestsFetched.isLoading ? 
                        <div>Loading...</div> : this.renderRejectedTable() }
                    </div>
                  </div>
                </Panel>
              </Tabbordion>
            </div>
          </div>
        </Body>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    townshipPermitRequestsFetched: state.townshipPermitRequestsFetched,
    townshipPermitRequestsEdited: state.townshipPermitRequestsEdited
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipPermitRequests,
    editTownshipPermitRequests,
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TownshipPanelPermitRequests);