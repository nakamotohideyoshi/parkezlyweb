import React from 'react';

import Body from "../../../../../common/components/body/body.jsx"
import Spinner from '../../../../common/components/spinner.jsx'
import { Link, browserHistory } from 'react-router'
import {createFilter} from 'react-search-input';
import { ajaxGet, ajaxDelete } from '../../../../common/components/ajax-selectize.js';

export default class InspectorVehicleInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markerData: null, 
      dataLoading: true,
      color: "green"
    }
    this.ajaxGet = this.ajaxGet.bind(this);
  }

  componentWillMount() {
    ajaxGet('poiv2', this.ajaxGet);
  }

  ajaxGet(markerData) {
    let markerArray = markerData.data.resource;
    let filteredData = markerArray.filter(createFilter(this.props.vehicleCode, ['title']))
    console.log(filteredData)
    this.setState({markerData: filteredData[0], dataLoading: false});
  }

  render() {
    return (
      <div className="marginless-row" style={{backgroundColor: "#FBE6CB"}}>
        <Body showHeader={true}>

          <div className="row marginless-row">
            <div className="center-align">
              <div className="card" 
              style={{
              backgroundColor: "#F6EADF", 
              display: "block", }}>
                  <div className="township-userlist-container" style={{backgroundColor: "#F6EADF"}}>
                    <div style={{marginTop: 20, fontSize: 50, fontWeight: "100"}}> Vehicle Info. </div>
                      { 
                        this.state.dataLoading ? 
                        <div> Loading... </div>
                        :
                        (() => {
                          switch (this.state.markerData.marker) {
                            case "status-red":     return <img src={require('../../../../../../images/car_red@3x.png')} />;
                            case "status-green":   return <img src={require('../../../../../../images/car_green@3x.png')} />;
                            case "status-yellow":  return <img src={require('../../../../../../images/car_yellow@3x.png')} />;
                            default:               return <img src={require('../../../../../../images/car_green@3x.png')} />;
                          }
                        })()
                      }
                    <div className="row" style={{marginTop: 30}}>
                  <h5 className="col s12">Plate Number - {this.props.vehicleCode}</h5>
                </div>

                <div className="row">
                  <h5 className="col s6">State - </h5>
                  <h5 className="col s6">Row - 555 </h5>
                </div>
                  </div>
              </div>
            </div>
          </div>

          <div className="card" 
          style={{
          backgroundColor: "#4C4B49", 
          display: "block", }}>
              <div className="township-userlist-container" style={{backgroundColor: "#4C4B49"}}>
                <div className="row marginless-row center-align">
                  <span className="col s12" style={{color: "white", fontSize: 50, margin: 0, fontWeight: "bold"}}> 0:0:0 </span>
                </div>
                <div className="row marginless-row center-align">
                  <span className="col s12" style={{color: "white", margin: 0}}>Hours : Minutes : Seconds </span>
                </div>
              </div>
          </div>

          <div className="card" 
          style={{
          backgroundColor: "#313131", 
          display: "block", }}>
              <div className="township-userlist-container" style={{backgroundColor: "#313131", color: "white",}}>
                <div className="row">
                  <div className="right-align">
                    <h5 className="col s6">Plate #:</h5> 
                  </div>
                  <div className="left-align">
                    <h5 className="col s6">TypeError</h5>
                  </div>
                  <div className="right-align">
                    <h5 className="col s6">Violation Fee:</h5> 
                  </div>
                  <div className="left-align">
                    <h5 className="col s6">Test</h5>
                  </div>
                  <div className="right-align">
                    <h5 className="col s6">Description:</h5>  
                  </div>
                  <div className="left-align">
                    <h5 className="col s6">Test</h5>
                  </div>
                </div>
              </div>
          </div>

          <Link 
            to={{pathname: `/admin/inspector/search-plate/${this.props.vehicleCode}`}} 
            className="card waves-effect waves-light center-align" 
            style={{
            backgroundColor: "#0d53cf", 
            border: "2px solid black", 
            borderBottom: "0", 
            display: "block", 
            }}>
            <div 
            className="township-userlist-container center-align" 
            style={{backgroundColor: "#0d53cf"}}>
              <i style={{color: "white", fontSize: "80", marginTop: 10}} className="material-icons valign">search</i>
              <h4 style={{color: "white", paddingTop: 0, marginTop: 0, marginBottom: 10}}> Find this Vehicle </h4>
            </div>
          </Link>

          <Link  
            to={{pathname: `/admin/inspector/vehicle-info/create-ticket/:${this.props.vehicleCode}`}} 
            className="card waves-effect waves-light center-align" 
            style={{
            backgroundColor: "#CC0000", 
            border: "2px solid black",
            borderBottom: "0",  
            display: "block", 
            }}>
            <div 
            className="township-userlist-container center-align" 
            style={{backgroundColor: "#CC0000"}}>
              <i style={{color: "white", fontSize: "80", marginTop: 10}} className="material-icons valign">receipt</i>
              <h4 style={{color: "white", paddingTop: 0, marginTop: 0, marginBottom: 10}}> Create Ticket </h4>
            </div>
          </Link>

          <div 
            onClick={() => this.context.router.goBack()}
            className="card waves-effect waves-light center-align" 
            style={{
            backgroundColor: "#FCFF00", 
            border: "2px solid black", 
            display: "block", 
            }}>
            <div 
            className="township-userlist-container center-align" 
            style={{backgroundColor: "#FCFF00"}}>
              <i style={{color: "black", fontSize: "80", marginTop: 10}} className="material-icons valign">arrow_back</i>
              <h4 style={{color: "black", marginTop: 0, marginBottom: 10}}> Back </h4>
            </div>
          </div>
        </Body>
      </div>
    );
  }
}

InspectorVehicleInfo.contextTypes = {
    router: React.PropTypes.func.isRequired
}