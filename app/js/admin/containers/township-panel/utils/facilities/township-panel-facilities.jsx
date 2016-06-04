import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Body from "../../../../../common/components/body/body.jsx";
import {fetchTownshipFacilities} from '../../../../actions/actions-township-panel.jsx';
import SearchInput, {createFilter} from 'react-search-input';

import TownshipPanelFacilitiesEdit from './township-panel-facilities-edit.jsx';
import TownshipPanelFacilitiesCreate from './township-panel-facilities-create.jsx';
import Spinner from '../../../../common/components/spinner.jsx';

import { Link } from 'react-router';

const KEYS_TO_FILTERS = [
'township_code',
'location_code',
'location_name',
'lot_row',
'lot_number',
'lot_id',
'occupied',
'plate_no',
'plate_state',
]

class TownshipPanelFacilities extends React.Component {
  constructor(props) {
    super(props);
    // Scroll to the top of the page on construct.
    window.scrollTo(0, 0);

    this.state = {
      editMode: false,
      createMode: false,
      fieldData: null,
      facilityId: null,
      searchTerm: ''
    }

    this.renderFacilityTable = this.renderFacilityTable.bind(this);
    this.renderFacilityTableData = this.renderFacilityTableData.bind(this);
    this.renderFacilityList = this.renderFacilityList.bind(this);
    this.renderFacilityCreate = this.renderFacilityCreate.bind(this);
  }

  componentWillMount() {
    this.props.fetchTownshipFacilities(this.props.townshipCode);
  };

  renderFacilityTableData(filteredFacilitiesData) {
    const filteredFacilities = filteredFacilitiesData.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    console.log(filteredFacilities)
    if(filteredFacilities.length > 0){   
      return filteredFacilities.map((facility) => {
        return( 
          <tr className="clickable" key={facility.id} onClick={
            () => this.setState({
              editMode: true,
              createMode: false, 
              fieldData: facility, 
              facilityId: facility.id
            })
          }>
            <td>{facility.township_code}</td>
            <td>{facility.location_code}</td>
            <td>{facility.location_name}</td>
            <td>{facility.lot_row}</td>
            <td>{facility.lot_number}</td>
            <td>{facility.lot_id}</td>
            <td>{facility.occupied}</td>
            <td>{facility.plate_no}</td>
            <td>{facility.plate_state}</td>
          </tr>  
        );
      });
    } else {
      return( 
        <tr>
          <td>There are currently no facilities in this township or ones that match your search. Please create one.</td> 
        </tr>
      );
    }
  }

  renderFacilityTable() {
    if (this.state.editMode === false) {
      const filteredFacilities = this.props.townshipFacilitiesFetched.data.resource;
      return (
        <div>
          <div className="row marginless-row valign-wrapper">
            <div className="col s1"/>
            <div className="search-wrapper card col s9" style={{marginBottom:10, marginTop: 10}}>
              <div className="row marginless-row valign-wrapper">
                <SearchInput 
                className="search search-input col s11" 
                onChange={(term) => this.setState({searchTerm: term})}
                style={{border: 0, margin: 0}} />
                <i className="material-icons col s1 valign clickable">search</i>
              </div>
            </div>
            <div className="col s1"/>
          </div>

          <div className="divider" />
          <div className="township-userlist-container">
            <table className="highlight">
              <thead>
                <tr>
                  <th data-field="id">Township Code</th>
                  <th data-field="name">Location Code</th>
                  <th data-field="price">Location Name</th>
                  <th data-field="price">Lot Row</th>
                  <th data-field="price">Lot Number</th>
                  <th data-field="price">Lot ID</th>
                  <th data-field="price">Occupied</th>
                  <th data-field="price">Plate Num.</th>
                  <th data-field="price">Plate State</th>
                </tr>
              </thead>
              <tbody>
              {this.renderFacilityTableData(filteredFacilities)}
              </tbody>
            </table>
          </div>
        </div>
      );   
    } else {
      return (
        <TownshipPanelFacilitiesEdit 
        initialValues={this.state.fieldData} 
        setInitialValues={() => this.props.fetchTownshipFacilities(this.props.townshipCode)}
        facilityId={this.state.facilityId}
        editModeFalse={() => this.setState({editMode: false})}
        openModal={() => $('#modal-success').openModal()} />
      );
    }
    
  }

  renderFacilityList() {
    return(
      <div>
        {this.state.editMode ? 
        <nav>
          <div className="nav-wrapper nav-admin z-depth-2">
            <a className="brand-logo center">Township Facilities Editor</a>
          </div>
        </nav>
        :
        <nav>
          <div className="nav-wrapper nav-admin z-depth-2">
            <a className="brand-logo center">Township Facilities List</a>
          </div>
        </nav>
        }

        <div className="card">
            {this.props.townshipFacilitiesFetched.isLoading ? 
              <div className="center-align"> <Spinner /> </div> : this.renderFacilityTable()}
          <div className="divider" />

          {this.state.editMode ? 
          null
          :
          <div className="center-align">
            <a
            className="modal-trigger waves-effect waves-light btn valign" 
            onClick={() => this.setState({createMode: true})}
            style={{margin: 10}}>Add New Facility</a>
          </div>
          }
                     
        </div>
      </div>
    );
  }

  renderFacilityCreate() {
    return(
    <div>
      <nav>
        <div className="nav-wrapper nav-admin z-depth-2">
          <a className="brand-logo center">Township Facilities Create</a>
        </div>
      </nav>
       <div className="card">
        <TownshipPanelFacilitiesCreate 
        setInitialValues={() => this.props.fetchTownshipFacilities(this.props.townshipCode)}
        createModeFalse={() => this.setState({createMode: false})}
        initialValues={{township_code: this.props.townshipCode, township_name: this.props.townshipCode}}
        openModal={() => $('#modal-success').openModal()}/>
       </div>
    </div>
    );
  }

  render() {
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>
          <div className="container" style={{marginTop: 40}}>
            {this.state.createMode ?
              this.renderFacilityCreate()
              :
              this.renderFacilityList()
            }
          </div>
        </Body>

        <div id="modal-success" className="modal">
          <div className="modal-content">
            <h4>Success!</h4>
            <p>You've successfully sent the request!</p>
          </div>
          <div className="modal-footer">
            <button 
            href="#" 
            className=" modal-action modal-close waves-effect waves-green btn-flat">Close</button>
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    townshipFacilitiesFetched: state.townshipFacilitiesFetched
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipFacilities
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TownshipPanelFacilities);