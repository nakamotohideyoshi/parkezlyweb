import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form'
import {createFilter} from 'react-search-input';
import _ from 'lodash';

import {editTownship, fetchTownshipList, updateTownshipDetails} from '../../../actions/index';

export const fields = [ 
  'manager_id', 
  'manager_type', 
  'lot_manager', 
  'address', 
  'state', 
  'city',
  'country',
  'zip',
  'contact_person',
  'contact_title',
  'contact_number',
  'contact_email']

export default class TownshipDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      townshipData: null,
      editMode: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);

  }

  componentWillMount() {
    fetchTownshipList
  };

  handleSubmit(data) {
    this.props.editTownship(data, this.props.townshipData.id);

    this.setState({editMode: false});
    $('#modal-success').openModal();

    this.props.fetchTownshipList();
    //this.props.updateTownshipDetails
  }

  handleSuccess(){
    let townshipDataFetched = this.props.townshipListFetched.data.resource;
    let filteredTownships = _.filter(townshipDataFetched, { 'id': this.props.townshipData.id});
    console.log(filteredTownships);
    
  }

  renderDetails(dataValid) {

    const {
      fields: {
        manager_id,
        manager_type,
        lot_manager,
        address,
        state,
        city,
        country,
        zip,
        contact_person,
        contact_title,
        contact_number,
        contact_email },
      resetForm,
      submitting
    } = this.props

    let editMode = this.state.editMode;

    let townshipData = this.props.townshipData;
    if(dataValid) {
      if (editMode === false) {
        return (
          <div>
            <div className="card-image">
              <img src="https://media-cdn.tripadvisor.com/media/photo-s/03/9b/2d/f2/new-york-city.jpg"/>
              <span className="card-title">{townshipData.city}</span>
            </div>
            <div className="card-content township-details-container">
              <div className="row">
                <div className="center-align">
                  <h4 style={{marginTop: 0}}>View Township</h4>
                  <p className="center-align">Enter edit mode to edit fields.</p>
                </div>
              </div>
              <div className="row">
                <div className="col s6">
                  <div className="form-group">
                    <label>Manager ID</label>
                    <input value={townshipData.manager_id} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                <div className="col s6">
                  <div className="form-group">
                    <label>Manager Type</label>
                    <input value={townshipData.manager_type} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                <div className="col s6">
                  <div className="form-group">
                    <label>Lot Manager</label>
                    <input value={townshipData.lot_manager} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                <div className="col s6">
                  <div className="form-group">
                    <label>Address</label>
                    <input value={townshipData.address} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                <div className="col s6">
                  <div className="form-group">
                    <label>State</label>
                    <input value={townshipData.state} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                <div className="col s6">
                  <div className="form-group">
                    <label>City</label>
                    <input value={townshipData.city} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                <div className="col s6">
                  <div className="form-group">
                    <label>Country</label>
                    <input value={townshipData.country} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                <div className="col s6">
                  <div className="form-group">
                    <label>Zip</label>
                    <input value={townshipData.zip} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                <div className="col s6">
                  <div className="form-group">
                    <label>Contact Person</label>
                    <input value={townshipData.contact_person} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                <div className="col s6">
                  <div className="form-group">
                    <label>Contact Title</label>
                    <input value={townshipData.contact_title} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                <div className="col s6">
                  <div className="form-group">
                    <label>Contact Number</label>
                    <input value={townshipData.contact_number} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                <div className="col s6">
                  <div className="form-group">
                    <label>Contact Email</label>
                    <input value={townshipData.contact_email} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-action">
              <div className="row marginless-row">
                <div className="col s4 offset-s1 center-align">
                  <a className="waves-effect waves-light btn">Go To Township</a>
                </div>
                <div className="col s4 offset-s2 right-align">
                  <a className="waves-effect waves-light btn btn-green" onClick={() => this.setState({editMode: true})}>Edit Township</a>
                </div>
                <div className="col s1"/>
              </div>
            </div>
          </div>
        );
      } else if (editMode === true){
        return (
          <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
            <div>
              <div className="card-image">
                <img src="https://media-cdn.tripadvisor.com/media/photo-s/03/9b/2d/f2/new-york-city.jpg"/>
                <span className="card-title">{townshipData.city}</span>
              </div>
              <div className="card-content township-edit-container">
                <div className="row">
                  <div className="center-align">
                    <h4 style={{marginTop: 0}}>Edit Township</h4>
                    <p className="center-align">Edit a township by changing the fields.</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col s6">
                    <div className="form-group">
                      <label>Manager ID</label>
                      <input type="number" placeholder="Manager ID" {...manager_id}/>
                    </div>
                  </div>
                  <div className="col s6">
                    <div className="form-group">
                      <label>Manager Type</label>
                      <input type="text" placeholder="Manager Type" {...manager_type}/>
                    </div>
                  </div>
                  <div className="col s6">
                    <div className="form-group">
                      <label>Lot Manager</label>
                      <input type="text" placeholder="Lot Manager" {...lot_manager}/>
                    </div>
                  </div>
                  <div className="col s6">
                    <div className="form-group">
                      <label>Address</label>
                      <input type="text" placeholder="Address" {...address}/>
                    </div>
                  </div>
                  <div className="col s6">
                    <div className="form-group">
                      <label>City</label>
                      <input type="text" placeholder="City" {...city}/>
                    </div>
                  </div>
                  <div className="col s6">
                    <div className="form-group">
                      <label>State</label>
                      <input type="text" placeholder="State" {...state}/>
                    </div>
                  </div>
                  <div className="col s6">
                    <div className="form-group">
                      <label>Country</label>
                      <input type="text" placeholder="Country" {...country}/>
                    </div>
                  </div>
                  <div className="col s6">
                    <div className="form-group">
                      <label>Zip</label>
                      <input type="number" placeholder="Zip" {...zip}/>
                    </div>
                  </div>
                  <div className="col s6">
                    <div className="form-group">
                      <label>Contact Person</label>
                      <input type="text" placeholder="Contact Person" {...contact_person}/>
                    </div>
                  </div>
                  <div className="col s6">
                    <div className="form-group">
                      <label>Contact Title</label>
                      <input type="text" placeholder="Contact Title" {...contact_title}/>
                    </div>
                  </div>
                  <div className="col s6">
                    <div className="form-group">
                      <label>Contact Number</label>
                      <input type="text" placeholder="Contact Number" {...contact_number}/>
                    </div>
                  </div>
                  <div className="col s6">
                    <div className="form-group">
                      <label>Contact Email</label>
                      <input type="email" placeholder="Contact Email" {...contact_email}/>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-action">
                <div className="row marginless-row">
                  <div className="col s5 center-align">
                    <a className="waves-effect waves-light btn">Go To Township</a>
                  </div>
                  <div className="col s3 right-align">
                    <a className="waves-effect waves-light btn btn-yellow" onClick={() => this.setState({editMode: false})}>Cancel</a>
                  </div>
                  <div className="col s4 left-align">
                    <button 
                    type="submit" 
                    disabled={submitting} 
                    className="waves-effect waves-light btn btn-green">Save Township</button>
                  </div>
                </div>
              </div>

            </div>
          </form>
        );
      }
    } else {
      return (
        <div className="card-content center-align">
          <p>Select a Township</p>
        </div>
      );
    }

  }

  render() {
    let townshipData = this.props.townshipData;
    let dataValid;
    if (townshipData !== null && townshipData !== undefined)
    {
      dataValid = true;
    } else {
      dataValid = false;
    }


    return (
      <div className="col s6">
        <nav>
          <div className="nav-wrapper nav-admin z-depth-2">
            <a className="brand-logo center" onClick={() => this.handleFetch()}>Township Details</a>
          </div>
        </nav>
        <div className="card">
          {this.renderDetails(dataValid, townshipData)}
           {this.props.townshipListEdited.isLoading ?  
              console.log(this.props.townshipListEdited.data) 
              : console.log(this.props.townshipListEdited.isLoading)}
        </div>
          <div id="modal-success" className="modal">
            <div className="modal-content">
              <h4>Success!</h4>
              <p>You've successfuly sent the request!</p>
            </div>
            <div className="modal-footer">
              <button 
              href="#" 
              className=" modal-action modal-close waves-effect waves-green btn-flat"
              onClick={() => this.forceUpdate()}>Close</button>
            </div>
          </div>
      </div>
    );
  }
}


TownshipDetails.propTypes = {
  fields: React.PropTypes.object.isRequired,
  resetForm: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {
    townshipListEdited: state.townshipListEdited,
    townshipListFetched: state.townshipListFetched,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    editTownship,
    fetchTownshipList,
    updateTownshipDetails
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'township-details',
  fields
})(TownshipDetails))