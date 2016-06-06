import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import cookie from "react-cookie";
import moment from "moment";

import Body from "../../../common/components/body/body.jsx";
import { getWeather } from "../../actions/weather.js";

class Weather extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch, position } = this.props;
    const { lat, lon } = position;
    dispatch(getWeather(lat, lon));
  }

  renderNotice() {
    const { errorMessage } = this.props;
    return errorMessage ? (
      <div className="alert alert-danger">
        {errorMessage}
      </div>
    ) : null;
  }

  renderContent() {
    return (
      <div>
        <h4>Weather Info</h4>
        <div>
          <div>
            <div className="location">Cupertino, US</div>
            <div className="location">Temp: 59.38 F</div>
            <div className="location">Updated at: 2016-06-05 09:36 PM</div>
          </div>
          <div>Wind Speed: 1.5mph</div>
          <div>Forecast: MIST</div>
          <div>Pressure: 1014</div>
          <div>Humidity: 87%</div>
          <div>Sunrise: 04:42 PM</div>
          <div>Sunset: 02:03 AM</div>
        </div>
        Refresh Data Btn
      </div>
    );
  }

  render() {
    const { loading } = this.props;
    const content = this.renderContent();

    return (
      <Body showHeader={true} loading={loading}>
        <div className="weather-root">
          {content}
        </div>
        {modalData}
      </Body>
    ) : null;
  }
}

const MapStateToProps = (state) => {
  return {
    state
  };
};

export default connect(MapStateToProps)(Weather);