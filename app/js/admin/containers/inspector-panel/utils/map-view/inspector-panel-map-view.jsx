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
      showInfo: false
    }

    this.ajaxGet = this.ajaxGet.bind(this);
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

      if(data.marker === "status-green") {
        iconUrl = require('../../../../../../images/car_green@3x.png')
      } else if (data.marker === "status-red") {
        iconUrl = require('../../../../../../images/car_red@3x.png')
      } else if (data.marker === "status-yellow") {
        iconUrl = require('../../../../../../images/car_yellow@3x.png')
      }

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
    });

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
              <div className="footer">
                <div className="col s4 footer-item">
                  <img src={require('../../../../../../images/car_red@3x.png')} className="responsive-img"/>
                </div>
                <div className="col s4 footer-item">
                  <img src={require('../../../../../../images/car_red@3x.png')} className="responsive-img"/>
                </div>
                <div className="col s4 footer-item">
                  <img src={require('../../../../../../images/car_red@3x.png')} className="responsive-img"/>
                </div>
              </div>
            </div>
        </Body>
      </div>
    );
  }   
}
