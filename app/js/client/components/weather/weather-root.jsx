import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import cookie from "react-cookie";
import moment from "moment";
//import momentTimezone from "moment-timezone";

import Body from "../../../common/components/body/body.jsx";
import { getWeather } from "../../actions/weather.js";

import "./styles/weather.scss";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
  }

  componentWillMount() {
    const { dispatch, position } = this.props;
    //const { lat, lon } = position;
    //dispatch(getTimeZone(40.7146, -74.0071));
    dispatch(getWeather(40.7146, -74.0071));
  }

  refreshData() {
    const { dispatch, position } = this.props;
    dispatch(getWeather(40.7146, -74.0071));
  }

  renderNotice() {
    const { errorMessage } = this.props.Weather;
    return errorMessage ? (
      <div className="alert alert-danger">
        {errorMessage}
      </div>
    ) : null;
  }

  renderRefreshButton() {
    return (
      <div className="refresh-weather">
        <a className="waves-effect waves-light  btn-large" href="javascript:void(0)" onClick={this.refreshData}>Refresh Data</a>
      </div>
    );
  }

  renderContent() {
    const userTimeZone = - (new Date().getTimezoneOffset());
    const { weatherData } = this.props.Weather;
    let main = {},
      wind = {},
      sys = {},
      weather = [],
      dt = null,
      name = null,
      temp = null,
      humidity = null,
      pressure = null,
      windSpeed =  null,
      sunrise = null,
      sunset = null,
      forecast = null,
      icon = null,
      iconUrl = null;
    if(weatherData) {
      name = weatherData.name;
      dt = moment.unix(weatherData.dt).utcOffset(userTimeZone).format("YYYY-MM-DD HH:MM");
      main = weatherData.main;
      wind = weatherData.wind;
      sys = weatherData.sys;
      weather = weatherData.weather;
      temp = main.temp;
      humidity = main.humidity;
      pressure = main.pressure;
      windSpeed = wind.speed;
      sunrise = moment.unix(sys.sunrise).utcOffset(userTimeZone).format("HH:MM");
      sunset = moment.unix(sys.sunset).utcOffset(userTimeZone).format("HH:MM");
      forecast = weather[0].description;
      icon = weather[0].icon;
      iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
    }
    return (
      <div className="weather-container">
        <h4>Weather Info</h4>
        <div className="weather-info">
          <div className="weather-overview">
            <img src={iconUrl}/>
            <div className="location">{name}</div>
            <div className="temp">Temp: {temp} F</div>
            <div className="timestamp">Updated at: {dt}</div>
          </div>
          <div className="weather-item">Wind Speed: {windSpeed} mph</div>
          <div className="weather-item">Forecast: {forecast}</div>
          <div className="weather-item">Pressure: {pressure}</div>
          <div className="weather-item">Humidity: {humidity}</div>
          <div className="weather-item">Sunrise: {sunrise}</div>
          <div className="weather-item">Sunset: {sunset}</div>
        </div>
      </div>
    );
  }

  render() {
    console.log(this.props);

    const { loading } = this.props.Weather;
    const notice = this.renderNotice();
    const refreshBtn = this.renderRefreshButton();
    const content = !loading ? this.renderContent() : null;

    return (
      <Body showHeader={true} loading={loading}>
        <div className="weather-root">
          {notice}
          {content}
          {refreshBtn}
        </div>
      </Body>
    );
  }
}

const MapStateToProps = (state) => {
  return state;
};

export default connect(MapStateToProps)(Weather);