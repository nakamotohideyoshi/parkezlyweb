import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import cookie from 'react-cookie';

import Body from "../../../common/components/body/body.jsx";
import Plate from "./plate.jsx";
import { getVehicles } from "../../actions/vehicle.js";

class VehicleList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const userId = cookie.load('userId');
    if(!userId) {
      window.location = "/";
      return;
    }
    const { dispatch } = this.props;
    dispatch(getVehicles(userId));
  }

  renderNotice() {
    const { errorMessage } = this.props.vehicles;
    return errorMessage ? (
      <div className="alert alert-danger">
        {errorMessage}
      </div>
    ) : null;
  }

  renderPlate(plateData, index) {
    const { plate_no, registered_state } = plateData;
    return (
      <div className="col s12 m6" key={index}>
        <Plate number={plate_no} state={registered_state}/>
      </div>
    )
  }

  renderPlates() {
    const platesData = [
      {
        plate_no: "AK-0009",
        registered_state: "AK"
      },{
        plate_no: "NY-0009",
        registered_state: "NY"
      }
    ];
    const notice = this.renderNotice();
    const platesList = platesData.map(this.renderPlate);
    return (
      <div className="vehicles-list">
        {notice}
        <h4>My Vehicles</h4>
        <div className="row">
          {platesList} 
        </div>
      </div>
    );
  }

  render() {
    const { loading } = this.props.vehicles;
    const content = this.renderPlates();
    return (
      <Body showHeader={true} loading={loading}>
        <div className="vehicle-list-root">
          {content}
        </div>
      </Body>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    vehicles: state.Vehicle
  };
};

export default connect(MapStateToProps)(VehicleList);