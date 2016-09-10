import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import cookie from 'react-cookie';
import moment from "moment";
import Body from "../../../common/components/body/body.jsx";

import { getParkedVehicle, exitVehicle } from "../../actions/find-vehicle.js";
import ConfirmationScreen from "./ConfirmationScreen.jsx";


class FindVehicleDetail extends Component {
  constructor(props) {
    super(props);
    this.onExit = this.onExit.bind(this);
  }

  componentWillMount() {
    if(!this.checkAuthStatus()) {
      window.location = "/";
    }
    const userId = cookie.load('userId');
    const { dispatch, parkingId } = this.props;
    
    dispatch(getParkedVehicle(parkingId));
  }

  checkAuthStatus() {
    const userId = cookie.load('userId');
    if(userId) {
      return true;
    }
  }

  onExit() {
    const { dispatch, parkingId } = this.props;
    const dateTimeNow = moment.utc().format("YYYY-MM-DD HH:mm");
    dispatch(exitVehicle(parkingId, dateTimeNow));
  }

  renderNotice() {
    const { errorMessage } = this.props.parkedVehicle;
    return errorMessage ? (
      <div className="alert alert-danger">
        {errorMessage}
      </div>
    ) : null;
  }

  renderConfirmationScreen() {
    const { vehicleData } = this.props.parkedVehicle;
    const { 
      plate_no,
      max_time,
      entry_date_time,
      exit_date_time,
      expiry_time,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      parking_status
    } = vehicleData;
    const expiryTime = new Date(expiry_time);
    const dateTimeNow = new Date(moment.utc().format("YYYY-MM-DD HH:mm"));
    let timeRemaining = expiryTime - dateTimeNow;
    const parkedTime = moment(entry_date_time).local().format("dddd, MMMM Do YYYY, h:mm:ss a");
    const expiresAt = moment(exit_date_time).local().format("dddd, MMMM Do YYYY, h:mm:ss a");

    if(parking_status === "EXIT") {
      timeRemaining = 0;
    }

    return (
      <ConfirmationScreen
        timeRemaining={timeRemaining}
        plate_no={plate_no}
        max_time={max_time}
        address1={address1}
        address2={address2}
        city={city}
        state={state}
        zip={zip}
        country={country}
        parkedTime={parkedTime}
        expiresAt={expiresAt}
        onExit={this.onExit} />
    );
  }

  render() {
    console.log(this.props);
    const authStatus = this.checkAuthStatus();
    const { loading } = this.props.parkedVehicle;
    const content = this.renderConfirmationScreen();

    return authStatus ? (
      <Body showHeader={true} loading={loading}>
        <div className="parked-vehicle-list-root">
          {content}
        </div>
      </Body>
    ) : null;
  }
}

const MapStateToProps = (state) => {
  return {
    parkedVehicle: state.FindVehicle
  };
};

export default connect(MapStateToProps)(FindVehicleDetail);