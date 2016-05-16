import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import Body from "../../../common/components/body/body.jsx";
import GrayButton from "../../../common/components/button/gray-button.jsx";
import ImageCheckbox from "../../../common/components/footer/utils/image-checkbox.jsx";
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";
import { default as MarkerClusterer } from "react-google-maps/lib/addons/MarkerClusterer";
import { updateGeolocation, getNearbyParking, setParkingType } from "../../actions/parking.js";
import { FREE_MAP_MARKER, PAID_MAP_MARKER, MANAGED_MAP_MARKER } from "./constants/texts.js";

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

class FindParking extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getGeolocation();
  }

  getGeolocation() {
    if (canUseDOM && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.initializePosition.bind(this));
    }
  }

  initializePosition(position) {
    const { dispatch } = this.props;
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    const demoPos = {
      lat: 40.7128,
      lng: -73.935242,
    };
    dispatch(updateGeolocation(demoPos));
    dispatch(getNearbyParking(demoPos));
  }

  toggleParking(type) {
    const { dispatch, parking } = this.props;
    const currentVal = parking[type];
    dispatch(setParkingType(type, !currentVal));
  }

  renderMarker(markerItem, index) {
    console.log(this.props.parking);
    const { lat, lng, marker } = markerItem;
    const parkingType = marker.split("-")[1];
    const parkingTypeVal = this.props.parking[parkingType];
    if ( !parkingTypeVal ) {
      return;
    }
    const position = new google.maps.LatLng({
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    });

    let iconUrl = "";
    switch (marker) {
      case "ez-free": {
        iconUrl = FREE_MAP_MARKER;
        break;
      }
      case "ez-paid": {
        iconUrl = PAID_MAP_MARKER;
        break;
      }
      case "ez-managed": {
        iconUrl = MANAGED_MAP_MARKER;
        break;
      }
    }

    const icon = {
      url: iconUrl,
      scaledSize: new google.maps.Size(50,50)
    };

    const markerProps = {
      position,
      icon
    };
    return (
      <Marker {...markerProps} key={index}/>
    );
  }

  renderGMap() {
    const { lat, lng, markers } = this.props.parking;
    const markersList = markers.map(this.renderMarker.bind(this));
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
              ref={null}
              defaultZoom={10}
              defaultCenter={{ lat: lat, lng: lng }}
              onClick={null}
              center={{ lat: lat, lng: lng }}>
                {markersList}
            </GoogleMap>
          }/>
      </section>
    );
  }

  renderFooterContent() {
    return (
      <div className="row footer-row">
        <div className="col s4 footer-item">
          <ImageCheckbox
            label="Park and Track"
            iconClass="free-parking"
            onClick={this.toggleParking.bind(this, "free")}/>
        </div>
        <div className="col s4 footer-item">
          <ImageCheckbox
            label="Paid Parking"
            iconClass="paid-parking"
            onClick={this.toggleParking.bind(this, "paid")}/>
        </div>
        <div className="col s4 footer-item">
          <ImageCheckbox
            label="Managed Lots"
            iconClass="managed-parking"
            onClick={this.toggleParking.bind(this, "managed")}/>
        </div>
      </div>
    );
  }

  renderParkNowBtn() {
    return (
      <div className="park-now-btn">
        <GrayButton onClick={null}>
          PARK NOW
        </GrayButton>
      </div>
    );
  }

  render() {
    const parkNowBtn = this.renderParkNowBtn();
    const gMap = this.renderGMap();
    const { loading } = this.props.parking;
    const footerContent = this.renderFooterContent();
    return (
      <Body
        ref="find-parking-body"
        showHeader={true}
        showFooter={true}
        footerContent={footerContent}
        loading={loading}>
          {parkNowBtn}
          {gMap}
          }
      </Body>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    parking: state.Parking
  };
};

export default connect(MapStateToProps)(FindParking);
