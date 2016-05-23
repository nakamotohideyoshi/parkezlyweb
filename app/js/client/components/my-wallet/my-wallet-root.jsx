import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import cookie from "react-cookie";
import moment from "moment";

import Body from "../../../common/components/body/body.jsx";
import { getWalletTransactions } from "../../actions/wallet.js";

class MyWallet extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if(!this.checkAuthStatus()) {
      window.location = "/";
    }
    const userId = cookie.load('userId');
    const { dispatch } = this.props;
    dispatch(getWalletTransactions(5));
  }

  checkAuthStatus() {
    const userId = cookie.load('userId');
    if(userId) {
      return true;
    }
  }

  renderNotice() {
    const { errorMessage } = this.props.wallet;
    return errorMessage ? (
      <div className="alert alert-danger">
        {errorMessage}
      </div>
    ) : null;
  }

  renderAddFundsButton() {
    return (
      <div className="add-funds">
        <a className="waves-effect waves-light  btn-large" href="#">Add Funds</a>
      </div>
    );
  }

  renderTransaction(transactionData, index) {
    const { last_paid_amt, paid_date } = transactionData;
    const paidDate = moment(paid_date).format("MM-DD-YYYY");
    return (
      <div className="row" key={index}>
        <div className="col s4">
          {paidDate}
        </div>
        <div className="col s5">
          Parking Payment
        </div>
        <div className="col s3">
          &#36; {last_paid_amt}
        </div>
      </div>
    );
  }

  renderTransactions() {
    const { transactionsList } = this.props.wallet;
    console.log(transactionsList);
    let current_balance = 0;
    if(transactionsList.length > 0) {
      current_balance = transactionsList[0].current_balance;
    }
    const notice = this.renderNotice();
    const transactions = transactionsList.map(this.renderTransaction);
    return (
      <div className="transactions-list">
        {notice}
        <h4>Wallet Balance</h4>
        <div className="balance-amt">
          &#36; {current_balance} 
        </div>
        <div className="transaction-title">
          Transaction History
        </div>
        <div className="transaction-grid">
          {transactions}
        </div>
      </div>
    );
  }

  render() {
    const authStatus = this.checkAuthStatus();
    const { loading } = this.props.wallet;
    const content = this.renderTransactions();
    const addFundsBtn = this.renderAddFundsButton();
    return authStatus ? (
      <Body showHeader={true} loading={loading}>
        <div className="my-wallet-root">
          {content}
        </div>
        {addFundsBtn}
      </Body>
    ) : null;
  }
}

const MapStateToProps = (state) => {
  console.log(state);
  return {
    wallet: state.Wallet
  };
};

export default connect(MapStateToProps)(MyWallet);