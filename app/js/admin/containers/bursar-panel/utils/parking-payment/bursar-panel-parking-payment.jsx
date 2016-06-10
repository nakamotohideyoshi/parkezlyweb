import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Body from "../../../../../common/components/body/body.jsx";

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


class BursarPanelParkingPayment extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
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
                        Test
                      </tbody>
                    </table>
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

export default BursarPanelParkingPayment;
