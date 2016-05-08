import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import cookie from 'react-cookie';

import Body from "../../../common/components/body/body.jsx";
import GrayButton from "../../../common/components/button/gray-button.jsx";
import LicensePlateField from "../../../common/components/fields/license-plate-field.jsx";
import Chooser from "../../../common/components/fields/chooser/chooser.jsx";
import { addPlate } from "../../actions/vehicle.js";
//import * as Texts from "./constants/texts.js";
import { states } from "./constants/states.js";

class NewVehicleForm extends Component {
  constructor(props) {
    super(props);

    this.addVehicle = this.addVehicle.bind(this);
  }

  componentWillMount() {
    const userId = cookie.load('userId');
    if(!userId) {
      window.location = "/";
    }
  }

  validateVehicle() {
    this.refs["license-number"].invalidate();
    this.refs["select-state"].invalidate();
    const isLicenseValid = this.refs["license-number"].validate();
    const isStateValid = this.refs["select-state"].validate();

    return isLicenseValid && isStateValid;
  }

  addVehicle() {
    const { dispatch } = this.props;
    const isValid = this.validateVehicle();
    if(isValid) {
      const licenseNo = this.refs["license-number"].getValue();
      const state = this.refs["select-state"].getValue();
      const licenseDetails = {
        plate_no: licenseNo,
        registered_state: state,
        user_id: cookie.load('userId')
      };
      dispatch(addPlate(licenseDetails));
    }
  }

  renderNotice() {
    const { errorMessage } = this.props.vehicle;
    return errorMessage ? (
      <div className="alert alert-danger">
        {errorMessage}
      </div>
    ) : null;
  }

  renderNewVehicleForm() {
    return (
      <div>
        <h1 className="my-vehicle-heading">Add a Vehicle</h1>
        <form className="form-new-vehicle">
          <LicensePlateField
            ref="license-number"
            placeholder="LICENSE PLATE #"
            className="license-no"/>
          <Chooser
            ref="select-state"
            optionsData={states}
            selectionEntity="a state"/>
        </form>
      </div>
    );
  }

  renderSkipLink() {
    return (
      <div className="skip-link">
        <a href="#">SKIP THIS</a>
      </div>
    );
  }

  renderButtons() {
    const skipLink = this.renderSkipLink();
    return (
      <div className="row new-vehicle-actions">
        <div className="col s6 left-btn">
          {skipLink}
        </div>
        <div className="col s6 right-btn">
          <GrayButton onClick={this.addVehicle}>
            SAVE
          </GrayButton>
        </div>
      </div>
    );
  }

  renderNewVehicleContent() {
    const notice = this.renderNotice();
    const newVehicleForm = this.renderNewVehicleForm();
    const btns = this.renderButtons();
    return (
      <div className="new-vehicle-content">
        {notice}
        {newVehicleForm}
        {btns}
      </div>
    );
  }

  render() {
    console.log(this.props);
    const { loading } = this.props.vehicle;
    const newVehicleContent = this.renderNewVehicleContent();
    return (
      <Body showHeader={true} loading={loading}>
        <div className="new-vehicle-root">
          {newVehicleContent}
        </div>
      </Body>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    vehicle: state.Vehicle
  };
};

export default connect(MapStateToProps)(NewVehicleForm);