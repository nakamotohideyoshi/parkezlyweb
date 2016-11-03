import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import Body from "../../../common/components/body/body.jsx";
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import { getPlaces, getLocationDetails } from "../../actions/nearby.js";
import { setPosition, setInitialPosition } from "../../actions/location.js";
import { throttle } from "lodash";
import "./styles/nearby.scss";

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

class Nearby extends Component {
  constructor(props) {
    super(props);
    this.handleCenterChanged = throttle(this.handleCenterChanged.bind(this), 100);
    this.goToInitialLocation = this.goToInitialLocation.bind(this);
  }

  componentWillMount() {
    const { lat, lon } = this.props.location;
    if(!lat) {
      this.getGeolocation();
    } else {
      this.getLocationDetails();
    }
  }

  getGeolocation() {
    if (canUseDOM && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.initializePosition.bind(this));
    }
  }

  initializePosition(position) {
    const { dispatch } = this.props;
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    
    dispatch(setInitialPosition(lat, lon));
    dispatch(getLocationDetails(lat, lon));
  }

  goToInitialLocation() {
    const { dispatch, location } = this.props;
    const { initialLat, initialLon } = location;
    dispatch(setPosition(initialLat, initialLon));
  }

  handleCenterChanged() {
    const map = this.refs["gMap"];
    const { dispatch, location } = this.props;
    const { lat, lon } = location;
    const newPos = map.getCenter();
    const initialPos = {
      lat: parseFloat(lat),
      lng: parseFloat(lon)
    };
    const newLat = newPos.lat();
    const newLon = newPos.lng();
    if (newPos.equals(new google.maps.LatLng(initialPos))) {
      return;
    } else {
      dispatch(setPosition(newLat, newLon));
      dispatch(getLocationDetails(newLat, newLon));
    }
  }

  renderMarker(markerItem, index) {
    const { geometry } = markerItem;
    const { location } = geometry;
    const { lat, lng } = location;
    const position = new google.maps.LatLng({
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    });

    const markerProps = {
      position
    };
    return (
      <Marker {...markerProps} key={index}/>
    );
  }

  renderContent() {
    const { location } = this.props.nearby;
    return (
      <div className="nearby-content">
        <h4>Get Nearby</h4>
        <div>
          {location}
        </div>
      </div>
    );
  }

  renderMyLocationIcon() {
    return (
      <div className="my-location-marker" onClick={this.goToInitialLocation}>
      </div>
    );
  }

  renderGMap() {
    let lat = this.props.location.lat || 40.7128;
    let lon = this.props.location.lon || -73.935242;
    const position = new google.maps.LatLng({
      lat: parseFloat(lat),
      lng: parseFloat(lon)
    });
    return (
      <section style={{height: "100%"}}>
        <GoogleMapLoader
          containerElement={
            <div
              style={{
                height: "100%",
              }}/>
          }
          googleMapElement={
            <GoogleMap
              ref="gMap"
              defaultZoom={15}
              defaultCenter={{ lat: lat, lng: lon }}
              onClick={null}
              onCenterChanged={this.handleCenterChanged}
              center={{ lat: lat, lng: lon }}>
                <Marker position={position}/>
            </GoogleMap>
          }/>
      </section>
    );
  }

  render() {
    const gMap = this.renderGMap();
    const content = this.renderContent();
    const myLocationIcon = this.renderMyLocationIcon();
    const { loading } = this.props.nearby;

    return (
      <Body
        ref="find-parking-body"
        showHeader={true}
        loading={false}>
          {content}
          {gMap}
          {myLocationIcon}
      </Body>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    nearby: state.nearbyPlaces,
    location: state.location
  };
};

export default connect(MapStateToProps)(Nearby);
