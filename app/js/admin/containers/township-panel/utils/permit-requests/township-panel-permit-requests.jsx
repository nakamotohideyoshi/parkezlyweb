import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

import Body from "../../../../../common/components/body/body.jsx";
import {fetchTownshipPermitRequests} from '../../../../actions/actions-township-panel.jsx';

import {Tabbordion, Panel} from 'react-tabbordion'

var classNames = {
  content: 'traditional-tabs-content',
  panel: 'traditional-tabs-panel',
  title: 'traditional-tabs-title'
}

export default class TownshipPanelPermitRequests extends React.Component {

  constructor(props) {
    super(props);
    $('.collapsible').collapsible();
  }

  componentWillMount() {
    this.props.fetchTownshipPermitRequests(this.props.townshipCode);
  }

  renderPendingData(filteredSubscriptions) {
    if(filteredSubscriptions.resource.length > 0){   
      return filteredSubscriptions.resource.map((request) => {
        return( 
          <tr key={request.id}>
            <td>{request.user_id}</td>
            <td>{request.township_code}</td>
            <td>{request.township_name}</td>
            <td>{request.permit_type}</td>
            <td>{request.permit_name}</td>
            <td>{request.residency_proof}</td>
            <td>{request.approved}</td>
            <td>{request.date_action}</td>
            <td>{request.status}</td>
            <td>{request.paid}</td>
            <td>{request.user_comments}</td>
            <td>{request.town_comments}</td>
            <td>{request.logo}</td>
            <td>{request.schema_type}</td>
            <td>{request.first_contact_date}</td>
            <td>{request.permit_status_image}</td>
            <td>{request.rate}</td>
            <td>{request.user_name}</td>
          </tr>
        );
      });
    } else {
      return( 
        <tr>
          <td>There are no pending requests.</td> 
        </tr>
      );
    }
  }

  renderPendingTable() {
    /*
    if(this.props.townshipPermitRequestsFetched.isLoading === false) {
      console.log(this.props.townshipPermitRequestsFetched);
    }
    */
   var filteredSubscriptions = this.props.townshipPermitRequestsFetched.data;
   console.log(filteredSubscriptions.resource);
    return(
      <div className="township-userlist-container">
        <table className="highlight">
          <thead>
            <tr>
              <th data-field="id">User ID</th>
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
              <th data-field="price">Permit Status Image</th>
              <th data-field="price">Rate</th>
              <th data-field="price">User Name</th>
            </tr>
          </thead>
          <tbody>
            {this.renderPendingData(filteredSubscriptions)}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    console.log(this.props.townshipPermitRequestsFetched)
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>
          <div style={{marginTop: 40}}>
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
                  <div className="row marginless-row">
                    test
                  </div>
                </Panel>
                <Panel title={<span>Rejected Permit Requests</span>}>
                  <div className="row marginless-row">
                    test
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
    townshipPermitRequestsFetched: state.townshipPermitRequestsFetched
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipPermitRequests
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TownshipPanelPermitRequests);

/*

      <div className="blue-body marginless-row">
        <Body showHeader={true}>
          <div className="container" style={{marginTop: 40}}>
            <nav style={{marginTop: 40}}>
              <div className="nav-wrapper nav-admin z-depth-2">
                <a className="brand-logo center">Township Permit Requests</a>
              </div>
            </nav>
            <div className="card">
              <div className="card-content">
                <ul className="collapsible" data-collapsible="expandable">
                  <li>
                    <div className="collapsible-header active"><i className="material-icons">priority_high</i>Pending - Click Here to Toggle</div> 
                    <div className="collapsible-body">
                      <p>There are currently no pending subscriptions.</p>
                    </div>
                  </li>
                  <li>
                    <div className="collapsible-header active"><i className="material-icons">done</i>Approved - Click Here to Toggle</div>
                    <div className="collapsible-body">
                      {this.props.townshipPermitRequestsFetched.isLoading ? 
                          <div>Loading...</div> : this.renderPendingTable() }
                    </div>
                  </li>
                  <li>
                    <div className="collapsible-header"><i className="material-icons">whatshot</i>Rejected - Click Here To Toggle</div>
                    <div className="collapsible-body"><p>There are no rejected subscriptions yet.</p></div>
                  </li>
                </ul>
              </div>              
            </div>
          </div>
        </Body>
      </div>
*/