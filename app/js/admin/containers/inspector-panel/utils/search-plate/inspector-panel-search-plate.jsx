import React from 'react'
import Body from "../../../../../common/components/body/body.jsx"
import {fetchInspectorPlate, createInspectorPlate, resetLoading} from '../../../../actions/actions-inspector-panel.jsx';
import { ajaxGet, ajaxDelete } from '../../../../common/components/ajax-selectize.js';
import {SimpleSelect} from "react-selectize"
import { browserHistory } from 'react-router'


const fields = [ 
      'id',  
      'date_time',  
      'dd',  
      'location_name', 
      'location_type', 
      'full_address',  
      'intersect_road1', 
      'intersect_road2', 
      'rows',  
      'lots_per_rows', 
      'total_lots',   
      'show_location', 
      'ff',  
      'location_code', 
]

export default class InspectorPanelSearchPlate extends React.Component {
  
  constructor(props) {
    super(props);

    this.ajaxGet = this.ajaxGet.bind(this);
    this.renderSearchBar = this.renderSearchBar.bind(this);
    this.state = {
      parkingData: null
    }
  }

  componentWillMount() {
    ajaxGet('parked_cars', this.ajaxGet);
  }

  ajaxGet(parkingData) {
    this.setState({parkingData: parkingData.data.resource});
    console.log(parkingData)
  }

  renderSearchBar() {
    var nullString = "N/A no data in field.";
    const parkedList = this.state.parkingData.map((data) => {
      if(data.plate_no != null && (data.location_code == null || data.location_code == "")) {
        return {label: "id: " + data.id + ", plate: " + data.plate_no + ", location code: " + nullString, value: data.id} 
      } else if (data.plate_no != null && data.location_code != null) {
        return {label: "id: " + data.id + ", plate: " + data.plate_no + ", location code: " + data.location_code, value: data.id} 
      } else {
        return {label: "id: " + data.id + ", plate: " + nullString, value: null  }
      }
    });
    let selectedPlate;
    return(
      <div>
        <div className="col s12 m9" style={{margin: 0, padding: 0}}>
          <SimpleSelect 
            options={parkedList} 
            theme="searchbar"
            style={{marginTop: 0}}
            transitionEnter={true} 
            onValueChange={(value) => {
              selectedPlate = value.value;
            }}/>
        </div>
        <div className="col s12 m3" style={{margin: 0, padding: 0}}>
          <button 
            onClick={() => browserHistory.push(`admin/inspector/vehicle-info/${selectedPlate}`)} 
            className="waves-effect waves-light btn-large btn btn-blue valign-wrapper col s12 m12 l12 left"
            style={{height: 105, margin: 0, padding: 0, minWidth: 0}}
            >
            <i className="material-icons valign" style={{fontSize: 100}}>search</i>
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="blue-body marginless-row" style={{minHeight: "100%"}}>
        <Body showHeader={true}>
          <div className="row marginless-row animated fadeInUp center-align" style={{marginTop: "15vh", marginLeft: 30, marginRight: 30}}>
            <h2 style={{color: "#FFF", fontWeight: "bold", marginBottom: 30}}> Search Plate # </h2>
            {
              this.state.parkingData != null ? this.renderSearchBar() : 
              <div className="center-align">
                <div>
                  <div className="col s12 m9" style={{margin: 0, padding: 0}}>
                    <SimpleSelect 
                      options={[{label: "Loading...", value: "Loading..."}]} 
                      theme="searchbar"
                      style={{marginTop: 0}}
                      transitionEnter={true} 
                      onKeyPress={() => this.handleKeyPress()}
                      onValueChange={(value) => {
                        selectedPlate = value.value;
                      }}/>
                  </div>
                  <div className="col s12 m3" style={{margin: 0, padding: 0, minWidth: 0}}>
                    <button 
                      onClick={() => alert("Results haven't loaded yet.")} 
                      className="waves-effect waves-light btn-large btn btn-blue valign-wrapper col s12 m12 l12 left"
                      style={{height: 105, margin: 0, padding: 0}}
                      >
                      <i className="material-icons valign" style={{fontSize: 100}}>search</i>
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        </Body>
      </div>
    );
  }
}
