import React, { ReactDOM, Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import cookie from 'react-cookie';
import Body from "../../../common/components/body/body.jsx";
import GrayButton from "../../../common/components/button/gray-button.jsx";
import LicensePlateField from "../../../common/components/fields/license-plate-field.jsx";
import Chooser from "../../../common/components/fields/chooser/chooser.jsx";
import ImageCheckbox from "../../../common/components/footer/utils/image-checkbox.jsx";
import ParkingModal from "./parking-modal.jsx";
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import { default as MarkerClusterer } from "react-google-maps/lib/addons/MarkerClusterer";
import { states } from "../../constants/states.js";
import { statesHash } from "../../constants/states-hash.js";

import {
  updateGeolocation,
  getNearbyParking,
  setParkingType,
  setParkingOptions,
  setOtherLocations,
  setSelectedLocation,
  setSelectedMarker,
  getParkingRules,
  setSelectedParking,
  hideSelectedParking,
  getParkingLot,
  selectParking,
  setSelectedPlate
} from "../../actions/parking.js";
import { setPosition, setInitialPosition, getLocationCoordinates } from "../../actions/location.js";
import { getVehicles } from "../../actions/vehicle.js";
import { FREE_MAP_MARKER, PAID_MAP_MARKER, MANAGED_MAP_MARKER } from "./constants/texts.js";
import { SimpleSelect } from "react-selectize";
import { throttle } from "lodash";

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

class FindParking extends Component {
  constructor(props) {
    super(props);
    this.handleCenterChanged = throttle(this.handleCenterChanged.bind(this), 100);
    this.goToInitialLocation = this.goToInitialLocation.bind(this);
    this.showParkingOptions = this.showParkingOptions.bind(this);
    this.hideParkingOptions = this.hideParkingOptions.bind(this);
    this.showOtherLocationOptions = this.showOtherLocationOptions.bind(this);
    this.hideOtherLocationOptions = this.hideOtherLocationOptions.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleParkingSelection = this.handleParkingSelection.bind(this);
    this.hideParkingModal = this.hideParkingModal.bind(this);
    this.selectParkingandFetchVehicles = this.selectParkingandFetchVehicles.bind(this);
    this.selectVehiclePlate = this.selectVehiclePlate.bind(this);
    this.confirmBooking = this.confirmBooking.bind(this);
  }

  componentDidMount() {
    this.getGeolocation();
  }

  getGeolocation() {
    if (canUseDOM && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.initializePosition.bind(this));
    }
  }

  fetchNearbyParking() {
    const { dispatch, location } = this.props;
    const { lat, lon } = location;
    const pos = {
      lat: lat,
      lng: lon
    };
    dispatch(getNearbyParking(pos));
  }

  initializePosition(position) {
    const { dispatch } = this.props;
    const lat = 40.7128; //position.coords.latitude;
    const lng = -73.935242; //position.coords.longitude;
    const demoPos = {
      lat: 40.7346687317,
      lng: -73.4461441040
    };
    dispatch(setInitialPosition(lat, lng));
    this.fetchNearbyParking();
    dispatch(getParkingRules("New York"));
  }

  toggleParking(type) {
    const { dispatch, parking } = this.props;
    const currentVal = parking[type];
    dispatch(setParkingType(type, !currentVal));
  }
  /* This is probably not required */
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
      this.fetchNearbyParking();
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
    dispatch(setSelectedLocation(null));
  }

  showOtherLocationOptions() {
    const { dispatch } = this.props;
    dispatch(setOtherLocations(true));
    dispatch(setSelectedLocation(null));
  }

  hideParkingOptions() {
    const { dispatch } = this.props;
    dispatch(setParkingOptions(false));
  }

  hideOtherLocationOptions() {
    const { dispatch } = this.props;
    dispatch(setOtherLocations(false));
  }

  selectLocation(address) {
    const { dispatch } = this.props;
    dispatch(getLocationCoordinates(address.value));
    dispatch(setSelectedLocation(address.value));
    dispatch(getParkingRules(address.value));
    this.hideOtherLocationOptions();
  }

  selectLocationFromInput() {
    const { dispatch } = this.props;
    const address = this.refs["custom-location"].value;
    dispatch(getLocationCoordinates(address));
    dispatch(setSelectedLocation(address));
    dispatch(getParkingRules(address.value));
    this.hideOtherLocationOptions();
  }

  handleBack() {
    const { dispatch } = this.props;
    this.goToInitialLocation();
    this.hideParkingOptions();
    this.hideOtherLocationOptions();
    dispatch(setSelectedLocation(null));
  }

  handleParkingSelection(parking_type, location_code) {
    const { dispatch } = this.props;
    dispatch(setSelectedParking(parking_type, location_code));
    if(parking_type === "MANAGED") {
      //dispatch(getParkingLot(location_code));
      dispatch(getParkingLot("NY-FDV-L01"));
    }
  }

  hideParkingModal() {
    const { dispatch } = this.props;
    dispatch(hideSelectedParking());
  }

  selectParkingandFetchVehicles(location_code) {
    const { dispatch } = this.props;
    const userId = cookie.load('userId');
    dispatch(getVehicles(userId));
    dispatch(selectParking(location_code));
  }

  selectVehiclePlate(plate) {
    const { dispatch } = this.props;
    console.log(plate);
    dispatch(setSelectedPlate(plate));
  }

  confirmBooking() {
    const { dispatch } = this.props;
  }

  renderMyLocationIcon() {
    return (
      <div className="my-location-marker" onClick={this.goToInitialLocation}>
      </div>
    );
  }

  selectMarker(marker) {
    const { dispatch } = this.props;
    dispatch(setSelectedMarker(marker));
  }

  renderSearchLocations() {
    const options = [
      {
        label: "Birmingham, AI",
        value: "Birmingham"
      },
      {
        label: "New York, NY",
        value: "New York"
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
            onValueChange={this.selectLocation.bind(this)}/>
        </div>
        <div>
          OR
        </div>
        <div>
          Search By Address
        </div>
        <div>
          <input
            ref="custom-location"
            type="text"
            placeholder="Enter Address Here ...."/>
        </div>
        <div>
          <GrayButton onClick={this.selectLocationFromInput.bind(this)}>
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
    let clickHandler = "";
    switch (marker) {
      case "ez-free": {
        iconUrl = FREE_MAP_MARKER;
        clickHandler = () => {this.handleParkingSelection("FREE", markerItem)};
        break;
      }
      case "ez-paid": {
        iconUrl = PAID_MAP_MARKER;
        clickHandler = () => {this.handleParkingSelection("PAID", markerItem)};
        break;
      }
      case "ez-managed": {
        iconUrl = MANAGED_MAP_MARKER;
        clickHandler = () => {this.handleParkingSelection("MANAGED", markerItem)};
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
      <Marker {...markerProps} key={index} onClick={clickHandler}/>
    );
  }

  renderGMap() {
    const { markers, selectedMarker } = this.props.parking;
    let lat = this.props.location.lat || 40.7128;
    let lon = this.props.location.lon || -73.935242;
    const currentPos =  new google.maps.LatLng({
      lat: parseFloat(lat),
      lng: parseFloat(lon)
    });
    let centerPos = {
      lat: lat,
      lng: lon
    };
    let currentMarker = (<Marker position={currentPos}/>);
    if(selectedMarker) {
      let centerLat = parseFloat(selectedMarker.lat);
      let centerLon = parseFloat(selectedMarker.lng);
      centerPos = {
        lat: parseFloat(centerLat),
        lng: parseFloat(centerLon)
      };
    }
    
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
              defaultCenter={centerPos}
              onClick={null}
              center={centerPos}>
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

  renderLocationLabel() {
    const { selectedLocation } = this.props.parking;
    return (
      <div className="selected-location">
        {selectedLocation}
      </div>
    )
  }

  renderBackBtn() {
    return (
      <div className="back-btn">
        <a href="javascript:void(0)" onClick={this.handleBack}>Back</a>
      </div>
    )
  }

  renderParkingInfoBtn() {
    return (
      <div className="parking-info-btn">
        <a href="javascript:void(0)" onClick={this.showParkingOptions}>Parking Info</a>
      </div>
    )
  }

  renderParkingOption(marker) {
    const validClass = classNames({
      "col": true,
      "s10": true,
      "free-parking": marker.marker === "ez-free",
      "public-parking": marker.marker == "ez-paid",
      "managed-parking": marker.marker == "ez-managed"
    });
    let parkingTypeText = "";
    switch (marker.marker) {
      case "ez-free":
        parkingTypeText = "FREE Public Parking";
        break;
      case "ez-paid":
        parkingTypeText = "Public Parking";
        break;
      case "ez-managed":
        parkingTypeText = "Managed Parking";
        break;
    }
    const distance = parseFloat(marker.distancea / 5280).toFixed(1);
    return (
      <div className="row parking-type" onClick={this.selectMarker.bind(this, marker)}>
        <div className={validClass}>
          <div>{parkingTypeText}</div>
          <div>{marker.html}</div>
        </div>
        <div className="col s2">
          {distance} Miles
        </div>
      </div>
    );
  }

  renderParkingOptions() {
    const { markers } = this.props.parking;
    const parkingOptions = markers.map(this.renderParkingOption, this);
    return (
      <div className="parking-options">
        <div className="row">
          <div className="col s11">Available Parking</div>
          <div className="col s1">
            <span className="close-btn" onClick={this.hideParkingOptions}>
            </span>
          </div>
        </div>
        {parkingOptions}
      </div>
    );
  }

  /* Booking Step 1 */

  renderFreePaidParkingModalContent() {
    const { parkingRules, selectedMarkerItem } = this.props.parking;
    const currentRules = parkingRules[selectedMarkerItem.location_code];
    const pricing = currentRules.pricing == 0 ? "FREE" : "$" + currentRules.pricing + "/" + currentRules.pricing_duration + "min";
    const parkNowAction = () => {this.selectParkingandFetchVehicles(selectedMarkerItem.location_code)};
    return (
      <div className="row parking-details">
        <div className="col s12">
          Public Parking: {pricing}
        </div>
        <div className="col s12">
          {selectedMarkerItem.title}
        </div>
        <div className="col s12">
          {selectedMarkerItem.address}
        </div>
        <div className="col s12">
          {selectedMarkerItem.html}
          <hr/>
        </div>
        <div className="col s12">
          Today: {currentRules.this_day}
        </div>
        <div className="col s12">
          Time: {currentRules.time_rule}
        </div>
        <div className="col s12">
          Max: {currentRules.max_hours} Hours
        </div>
        <div className="col s6 link">
          <a href="javascript:void(0)">Street View</a>
        </div>
        <div className="col s6 link">
          <a href="javascript:void(0)">Directions</a>
        </div>
        <div className="col s12">
          <GrayButton onClick={parkNowAction}>
            PARK HERE
          </GrayButton>
        </div>
      </div>
    );
  }

  /* Booking Step 2 */

  renderPlate(plate) {
    const { plate_no, registered_state } = plate;
    const clickHandler = () => {this.selectVehiclePlate(plate)};
    return (
      <div className="plate">
        <a href="javascript:void(0)" onClick={clickHandler}>
          <div>
            License Plate #: {plate_no}
          </div>
          <div>
            State: {registered_state}
          </div>
        </a>
      </div>
    );
  }

  renderVehicleList() {
    let vehicles = [];
    if(this.props.vehicle) {
      vehicles = this.props.vehicle.vehicles;
    }
    const plates = vehicles.map(this.renderPlate, this);
    const clickHandler = () => {this.selectVehiclePlate({})};
    return (
      <div>
        <div className="plate-list">
          {plates}
        </div>
        <div>
          <GrayButton onClick={clickHandler}>
            Skip This
          </GrayButton>
        </div>
      </div>
    );
  }

  /* Booking Step 3 */

  renderVehicleForm() {
    //this.refs["license-number"].setValue(selectedPlate);
    //this.refs["select-state"].setValue(state);
    const { selectedPlate, parkingRules, selectedMarkerItem } = this.props.parking;
    const { registered_state, plate_no } = selectedPlate;
    const label = statesHash[registered_state];
    const currentRules = parkingRules[selectedMarkerItem.location_code];
    const { parking_times, max_hours} = currentRules;
    return (
      <div className="vehicle-form">
        <h4>Parking</h4>
        <div className="row">
          <div className="col s6">
            {parking_times}
          </div>
          <div className="col s6">
            Max: {max_hours} Hours
          </div>
        </div>
        <form className="select-vehicle">
          <LicensePlateField
            ref="license-number"
            placeholder="LICENSE PLATE #"
            className="license-no"
            defaultValue={plate_no}/>
          <SimpleSelect 
            options = {states} 
            placeholder = "Select State" 
            onValueChange={null}
            defaultValue={{label: label, value: registered_state}}/>
        </form>
        <div>
          <GrayButton onClick={this.confirmBooking}>
            PARK NOW
          </GrayButton>
        </div>
      </div>
    );
  }

  renderFreePaidParkingModal() {
    const { bookingStep } = this.props.parking;
    let content = "";
    if(bookingStep == 1) {
      content = this.renderFreePaidParkingModalContent();
    } else if(bookingStep == 2) {
      content = this.renderVehicleList();
    } else if(bookingStep == 3) {
      content = this.renderVehicleForm();
    }
    return (
      <ParkingModal
        className="free-parking-modal"
        onHide={this.hideParkingModal}>
        {content}
      </ParkingModal>
    );
  }

  renderLot(lot) {
    const { lot_row, lot_number, occupied } = lot;
    const carClasses = classNames({
      "car-icon": true,
      "occupied": occupied.toUpperCase() === "YES",
      "available": occupied.toUpperCase() === "NO"
    });
    return (
      <div className="col s2 car">
        <div className={carClasses}>
        </div>
        <div className="lot-number">
          Row {lot_row}: {lot_number}
        </div>
      </div>
    );
  }

  renderManagedParkingModal() {
    const { lotsData } = this.props.parking;
    const carList = lotsData.map(this.renderLot, this);
    return (
      <div className="managed-parking-modal">
        <div className="row heading">
          <h4 className="col s11">Current Parking Lot Status</h4>
          <div className="col s1">
            <span className="close-btn" onClick={this.hideParkingModal}/>
          </div>
        </div>
        <div className="row car-list">
          {carList}
        </div>
        <div className="park-here-btn">
          <GrayButton onClick={this.selectLocationFromInput.bind(this)}>
            PARK HERE
          </GrayButton>
        </div>
      </div>
    );
  }

  render() {
    console.log(this.props.vehicle);
    const gMap = this.renderGMap();
    const myLocationIcon = this.renderMyLocationIcon();
    const {
      loading,
      showParkingOptions,
      showOtherLocations,
      selectedLocation,
      selectedLocationCode,
      showFreeParkingModal,
      showPaidParkingModal,
      showManagedParkingModal,
      lotsData
    } = this.props.parking;
    const parkNowBtn = !showParkingOptions && !showOtherLocations && !selectedLocation ? this.renderFindNearbyBtn() : null;
    const searchBtn = !showParkingOptions && !showOtherLocations && !selectedLocation ? this.renderSearchBtn() : null;
    const footerContent = this.renderFooterContent();
    const parkingOptions = showParkingOptions ? this.renderParkingOptions() : null;
    const otherLocations = showOtherLocations ? this.renderSearchLocations() : null;
    const selectedLocationLabel = selectedLocation ? this.renderLocationLabel() : null;
    const backBtn = selectedLocation ? this.renderBackBtn() : null;
    const parkingInfoBtn = selectedLocation ? this.renderParkingInfoBtn() : null;

    //After marker is selected
    const freeParkingModal = showFreeParkingModal || showPaidParkingModal ? this.renderFreePaidParkingModal() : null;
    const managedParkingModal = showManagedParkingModal && lotsData ? this.renderManagedParkingModal() : null;

    return (
      <Body
        ref="find-parking-body"
        showHeader={true}
        showFooter={true}
        footerContent={footerContent}
        loading={loading}>
          <div className="find-parking-container">
            {parkingOptions}
            {otherLocations}
            {parkNowBtn}
            {searchBtn}
            {selectedLocationLabel}
            {freeParkingModal}
            {managedParkingModal}
            {gMap}
            {backBtn}
            {parkingInfoBtn}
            {myLocationIcon}
          </div>
      </Body>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    parking: state.parking,
    location: state.location,
    vehicle: state.vehicle.Vehicle.vehicleList
  };
};

export default connect(MapStateToProps)(FindParking);
