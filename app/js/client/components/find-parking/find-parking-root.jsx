import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import Body from "../../../common/components/body/body.jsx";
import GrayButton from "../../../common/components/button/gray-button.jsx";
import ImageCheckbox from "../../../common/components/footer/utils/image-checkbox.jsx";
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import { default as MarkerClusterer } from "react-google-maps/lib/addons/MarkerClusterer";
import {
  updateGeolocation,
  getNearbyParking,
  setParkingType,
  setParkingOptions,
  setOtherLocations
} from "../../actions/parking.js";
import { setPosition, setInitialPosition } from "../../actions/location.js";
import { FREE_MAP_MARKER, PAID_MAP_MARKER, MANAGED_MAP_MARKER } from "./constants/texts.js";
import {SimpleSelect} from "react-selectize";
import { throttle } from "lodash";

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

class FindParking extends Component {
  constructor(props) {
    super(props);
    this.handleCenterChanged = throttle(this.handleCenterChanged.bind(this), 300);
    this.goToInitialLocation = this.goToInitialLocation.bind(this);
    this.showParkingOptions = this.showParkingOptions.bind(this);
    this.hideParkingOptions = this.hideParkingOptions.bind(this);
    this.showOtherLocationOptions = this.showOtherLocationOptions.bind(this);
    this.hideOtherLocationOptions = this.hideOtherLocationOptions.bind(this);
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
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const demoPos = {
      lat: 40.7128,
      lng: -73.935242
    };
    dispatch(setInitialPosition(lat, lng));
    dispatch(getNearbyParking(demoPos));
  }

  toggleParking(type) {
    const { dispatch, parking } = this.props;
    const currentVal = parking[type];
    dispatch(setParkingType(type, !currentVal));
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
      dispatch(getNearbyParking({
        lat: newLat,
        lng: newLon
      }));
    }
  }

  goToInitialLocation() {
    const { dispatch, location } = this.props;
    const { initialLat, initialLon } = location;
    dispatch(setPosition(initialLat, initialLon));
  }

  showParkingOptions() {
    const { dispatch } = this.props;
    dispatch(setParkingOptions(true));
  }

  showOtherLocationOptions() {
    const { dispatch } = this.props;
    dispatch(setOtherLocations(true));
  }

  hideParkingOptions() {
    const { dispatch } = this.props;
    dispatch(setParkingOptions(false));
  }

  hideOtherLocationOptions() {
    const { dispatch } = this.props;
    dispatch(setOtherLocations(false));
  }

  renderMyLocationIcon() {
    return (
      <div className="my-location-marker" onClick={this.goToInitialLocation}>
      </div>
    );
  }

  renderSearchLocations() {
    const options = [
      {
        label: "Birmingham, AI",
        value: "BM"
      },
      {
        label: "New York, NY",
        value: "NY"
      }
    ];
    return (
      <div className="other-locations">
        <div className="row heading">
          <div className="col s10">
            Search Other Locations
          </div>
          <div className="col s2">
            <span className="close-btn" onClick={this.hideOtherLocationOptions}>
            </span>
          </div>
        </div>
        <div>
          Select a City
        </div>
        <div>
          <SimpleSelect 
            options = {options} 
            placeholder = "Select City from DB" 
            />
        </div>
        <div>
          OR
        </div>
        <div>
          Search By Address
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Address Here ...."/>
        </div>
        <div>
          <GrayButton onClick={this.showParkingOptions}>
            FIND
          </GrayButton>
        </div>
      </div>
    );
  }

  renderMarker(markerItem, index) {
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
    const { markers } = this.props.parking;
    let lat = this.props.location.lat || 40.7128;
    let lon = this.props.location.lon || -73.935242;
    const currentPos =  new google.maps.LatLng({
      lat: parseFloat(lat),
      lng: parseFloat(lon)
    });
    const currentMarker = (<Marker position={currentPos}/>);
    const markersList = markers.map(this.renderMarker.bind(this));
    markersList.push(currentMarker);
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
              defaultZoom={10}
              defaultCenter={{ lat: lat, lng: lon }}
              onClick={null}
              center={{ lat: lat, lng: lon }}
              onCenterChanged={this.handleCenterChanged}>
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

  renderFindNearbyBtn() {
    return (
      <div className="find-nearby-btn action-btn">
        <GrayButton onClick={this.showParkingOptions}>
          FIND NEARBY
        </GrayButton>
      </div>
    );
  }

  renderSearchBtn() {
    return (
      <div className="search-btn action-btn">
        <GrayButton onClick={this.showOtherLocationOptions}>
          SEARCH OTHER LOCATIONS
        </GrayButton>
      </div>
    );
  }

  renderParkingOptions() {
    return (
      <div className="parking-options">
        <div className="row">
          <div className="col s11">Available Parking</div>
          <div className="col s1">
            <span className="close-btn" onClick={this.hideParkingOptions}>
            </span>
          </div>
        </div>

        <div className="row parking-type">
          <div className="col s10 free-parking">
            <div>FREE Public Parking</div>
            <div>6 AM to 10 PM</div>
          </div>
          <div className="col s2">
            15.6 Miles
          </div>
        </div>

        <div className="row parking-type">
          <div className="col s10 public-parking">
            <div>Public Parking</div>
            <div>6 AM to 10 PM</div>
          </div>
          <div className="col s2">
            15.6 Miles
          </div>
        </div>

        <div className="row parking-type">
          <div className="col s10 managed-parking">
            <div>Managed Parking</div>
            <div>6 AM to 10 PM</div>
          </div>
          <div className="col s2">
            15.6 Miles
          </div>
        </div>
      </div>
    );
  }

  render() {
    const gMap = this.renderGMap();
    const myLocationIcon = this.renderMyLocationIcon();
    const { loading, showParkingOptions, showOtherLocations } = this.props.parking;
    const parkNowBtn = !showParkingOptions && !showOtherLocations ? this.renderFindNearbyBtn() : null;
    const searchBtn = !showParkingOptions && !showOtherLocations ? this.renderSearchBtn() : null;
    const footerContent = this.renderFooterContent();
    const parkingOptions = showParkingOptions ? this.renderParkingOptions() : null;
    const otherLocations = showOtherLocations ? this.renderSearchLocations() : null;
    return (
      <Body
        ref="find-parking-body"
        showHeader={true}
        showFooter={true}
        footerContent={footerContent}
        loading={loading}>
          {parkingOptions}
          {otherLocations}
          {parkNowBtn}
          {searchBtn}
          {gMap}
          {myLocationIcon}
      </Body>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    parking: state.parking,
    location: state.location
  };
};

export default connect(MapStateToProps)(FindParking);
