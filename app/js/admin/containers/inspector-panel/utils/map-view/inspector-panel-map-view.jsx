import React from 'react';

import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'

import { browserHistory } from 'react-router'

import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { ajaxGet, ajaxDelete } from '../../../../common/components/ajax-selectize.js';
import ImageCheckbox from '../../../../../common/components/footer/utils/image-checkbox.jsx';

export default class InspectorMapView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      markerData: null,
      showMarkers: false,
      showInfo: false,
      yellowOff: false,
      redOff: false,
      greenOff: false,
    }

    this.ajaxGet = this.ajaxGet.bind(this);
    this.renderFooterIcons = this.renderFooterIcons.bind(this);
  }

  componentWillMount() {
    ajaxGet('poiv2', this.ajaxGet);
  }

  ajaxGet(markerData) {
    console.log(markerData.data.resource)
    this.setState({markerData: markerData, showMarkers: true})
  }

  handleMarkerClick(marker) {
    this.setState(this.state);
  }
  
  handleMarkerClose(marker) {
    this.setState({showInfo: false});
  }

  renderInfoWindow(ref, marker, title) {
    return (
      <InfoWindow 
      key={`${ref}_info_window`}
      onCloseclick={this.handleMarkerClose.bind(this, marker)}
      className="center-align"
      >
        <div 
        onClick={() => browserHistory.push(`admin/inspector/vehicle-info/${title}`)} 
        className="center-align">
          {title} 
          <div> - Click Here - </div>
        </div>
      </InfoWindow>
    );
  }

  handleMarkerClick(marker) {
    marker.showInfo = true;
    this.setState(this.state);
  }

  handleMarkerClose(marker) {
    marker.showInfo = false;
    this.setState(this.state);
  }
  
  renderMarkers() {

    let markerData = this.state.markerData.data.resource;
    
    return markerData.map((data, index) => {
      let iconUrl;
      const ref = `marker_${index}`;
      let renderMarker = true;

      if(data.marker === "status-green" && this.state.greenOff == false) {
        console.log("test")
        iconUrl = require('../../../../../../images/car_green@3x.png')
      } else if (data.marker === "status-red" && this.state.redOff == false) {
        iconUrl = require('../../../../../../images/car_red@3x.png')
      } else if (data.marker === "status-yellow" && this.state.yellowOff == false) {
        iconUrl = require('../../../../../../images/car_yellow@3x.png')
      } else {
        renderMarker = false;
      }

      if (renderMarker) {
        return (
          <Marker 
            key={index}
            ref={ref}
            position={{lat: data.lat, lng: data.lng}} 
            icon={{url: iconUrl, scaledSize: new google.maps.Size(75,50)}} 
            onClick={this.handleMarkerClick.bind(this, data)}
            >
            {data.showInfo ? this.renderInfoWindow(ref, data, data.title) : null}
          </Marker>
        );
      }
    });

  }

  renderFooterIcons() {
    const { greenOff, yellowOff, redOff } = this.state;

    let greenStyle = null;
    let redStyle = null;
    let yellowStyle = null;

    if (this.state.greenOff == true) {
      greenStyle = {opacity: "0.5"};
    } 
    if (this.state.redOff) {
      redStyle = {opacity: "0.5"};
    } 
    if (this.state.yellowOff) {
      yellowStyle = {opacity: "0.5"};
    }

    return (
      <div className="footer row marginless-row">
        <div className="col s4 footer-item">
          <div className="img-checkbox-icon" style={{paddingBottom: 0, marginBottom: 0}}>
            <img 
            src={require('../../../../../../images/car_green@3x.png')} 
            style={greenStyle}
            onClick={() => this.setState({greenOff: !greenOff})} 
            className="responsive-img"/>
          </div>
          <div className="img-checkbox-label">
            Valid
          </div>
        </div>
        <div className="col s4 footer-item">
          <div className="img-checkbox-icon">
            <img 
            style={redStyle}
            src={require('../../../../../../images/car_red@3x.png')} 
            onClick={() => this.setState({redOff: !redOff})} 
            className="responsive-img"/>
          </div>
          <div className="img-checkbox-label">
            Expired
          </div>
        </div>
        <div className="col s4 footer-item">
          <div className="img-checkbox-icon">
            <img 
            style={yellowStyle}
            src={require('../../../../../../images/car_yellow@3x.png')} 
            onClick={() => this.setState({yellowOff: !yellowOff})} 
            className="responsive-img"/>
          </div>
          <div className="img-checkbox-label">
            Expiring
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="marginless-row">
        <Body showHeader={true}>
            <div>
              <section style={{height: "calc(100% - 165px)"}}>
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
                    defaultCenter={{ lat: 40.7128, lng: -73.935242 }}
                    onClick={null}
                    center={{ lat: 40.7128, lng: -73.935242 }}>
                    {this.state.showMarkers ?  this.renderMarkers() : <div/>}
                  </GoogleMap>
                }/>
              </section>
              {this.renderFooterIcons()}
            </div>
        </Body>
      </div>
    );
  }   
}