import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form'
import {createFilter} from 'react-search-input';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import _ from 'lodash';

import { Link } from 'react-router'

import TownshipImageUpload from '../../township-list/utils/township-image-upload.jsx';
import Spinner from '../../../common/components/spinner.jsx';

import {
  editTownship, 
  fetchTownshipList, 
  updateTownshipDetails, 
  resetLoading,
  resetTownshipDetails,
  fetchTownshipDetails
} from '../../../actions/actions-township';

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

const validate = values => {
  const errors = {}
  if (!values.manager_id) {
    errors.manager_id = 'Required'
  } else if (values.manager_id.length > 15) {
    errors.manager_id = 'Must be 15 characters or less'
  }
  return errors
}

class TownshipDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      townshipData: null,
      editMode: false,
      isShowingModal: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  componentWillMount() {
    this.props.fetchTownshipList();
  }

   componentDidUpdate() {
    if (this.props.townshipData === null && this.props.townshipData === undefined) {
      this.props.fetchTownshipDetails(this.props.townshipData.id);
    }
  };

  componentWillUpdate() {
    if (!this.props.townshipListEdited.isLoading || !this.props.uploadedImage.isLoading) {
      this.handleClose();
      this.handleSuccess();
    } 
  };

  componentDidUpdate () {
  }

  handleSubmit(data) {
    console.log(this.props.townshipData);
    this.props.editTownship(data, this.props.townshipCode);
  }

  handleSuccess(){
    // Reset loading status so it doesn't infinitely handleSuccess. 
    // Reload township list to represent new changes.
    // Go back to view mode.
    this.props.fetchTownshipList();
    this.setState({editMode: false});
    $('#modal-success').openModal();
    this.props.resetLoading();
  }

  handleClick() {
    this.setState({isShowingModal: true})
  } 
  handleClose() {
    this.setState({isShowingModal: false})
  } 

  renderDetails(dataValid, townshipData) {
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

    if(dataValid) {
      if (editMode === false) {
        return (
          <div>
            <div className="card-image" style={{backgroundColor: "#2E2E2E"}}>
              <img src={townshipData.township_logo} 
              className="township-details-image circle responsive-img" />
              <span className="card-title valign-wrapper">{townshipData.city}</span>
              <div className="fixed-action-btn horizontal image-upload-button">
                <a className="btn-floating btn-large btn-green waves-effect waves-light" onClick={() => this.handleClick()}>
                  <i className="large material-icons">file_upload</i>
                </a>
                <ul>
                  <li className="image-upload-text"> Upload Image </li>
                </ul>
              </div>
            </div>
            <div className="card-content township-details-container">
              <div className="row">
                <div className="center-align">
                  <h4 style={{marginTop: 0}}>View Township</h4>
                  <p className="center-align">Enter edit mode to edit fields.</p>
                </div>
              </div>
              <div className="row">
                <div className="col s6 admin-form-input">
                  <div className="form-group">
                    <label>Manager ID</label>
                    <input value={townshipData.manager_id} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                <div className="col s6 admin-form-input">
                  <div className="form-group">
                    <label>Manager Type</label>
                    <input value={townshipData.manager_type} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                <div className="col s6 admin-form-input">
                  <div className="form-group">
                    <label>Lot Manager</label>
                    <input value={townshipData.lot_manager} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                <div className="col s6 admin-form-input">
                  <div className="form-group">
                    <label>Address</label>
                    <input value={townshipData.address} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                <div className="col s6 admin-form-input">
                  <div className="form-group">
                    <label>City</label>
                    <input value={townshipData.city} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                <div className="col s6 admin-form-input">
                  <div className="form-group">
                    <label>State</label>
                    <input value={townshipData.state} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                <div className="col s6 admin-form-input">
                  <div className="form-group">
                    <label>Country</label>
                    <input value={townshipData.country} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                <div className="col s6 admin-form-input">
                  <div className="form-group">
                    <label>Zip</label>
                    <input value={townshipData.zip} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                <div className="col s6 admin-form-input">
                  <div className="form-group">
                    <label>Contact Person</label>
                    <input value={townshipData.contact_person} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                <div className="col s6 admin-form-input">
                  <div className="form-group">
                    <label>Contact Title</label>
                    <input value={townshipData.contact_title} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                <div className="col s6 admin-form-input">
                  <div className="form-group">
                    <label>Contact Number</label>
                    <input value={townshipData.contact_number} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
                <div className="col s6 admin-form-input">
                  <div className="form-group">
                    <label>Contact Email</label>
                    <input value={townshipData.contact_email} onChange={() => this.setState({townshipData: townshipData})}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-action">
              <div className="row marginless-row">
                  <a className="waves-effect waves-light btn btn-green col s12 m12 l8 offset-l2" onClick={() => this.setState({editMode: true})}>Edit Township</a>
              </div>
            </div>
          </div>
        );
      } else if (editMode === true){
        return (
          <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
            <div>
              <div className="card-image" style={{backgroundColor: "#2E2E2E"}}>
              <img src={townshipData.township_logo} 
              className="township-details-image circle responsive-img" />
              <span className="card-title valign-wrapper">{townshipData.city}</span>
              <div className="fixed-action-btn horizontal image-upload-button">
                <a className="btn-floating btn-large btn-green waves-effect waves-light" onClick={() => this.handleClick()}>
                  <i className="large material-icons">file_upload</i>
                </a>
                <ul>
                  <li className="image-upload-text"> Upload Image </li>
                </ul>
              </div>
            </div>
              <div className="card-content township-edit-container">
                <div className="row">
                  <div className="center-align">
                    <h4 style={{marginTop: 0}}>Edit Township</h4>
                    <p className="center-align">Edit a township by changing the fields.</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col s6 admin-form-input">
                    <div className="form-group">
                      <label>Manager ID</label>
                      <input type="text" placeholder="Manager ID" {...manager_id}/>
                    </div>
                    {manager_id.touched && manager_id.error && <div className="form-required">{manager_id.error}</div>}
                  </div>
                  <div className="col s6 admin-form-input">
                    <div className="form-group">
                      <label>Manager Type</label>
                      <input type="text" placeholder="Manager Type" {...manager_type}/>
                    </div>
                  </div>
                  <div className="col s6 admin-form-input">
                    <div className="form-group">
                      <label>Lot Manager</label>
                      <input type="text" placeholder="Lot Manager" {...lot_manager}/>
                    </div>
                  </div>
                  <div className="col s6 admin-form-input">
                    <div className="form-group">
                      <label>Address</label>
                      <input type="text" placeholder="Address" {...address}/>
                    </div>
                  </div>
                  <div className="col s6 admin-form-input">
                    <div className="form-group">
                      <label>City</label>
                      <input type="text" placeholder="City" {...city}/>
                    </div>
                  </div>
                  <div className="col s6 admin-form-input">
                    <div className="form-group">
                      <label>State</label>
                      <input type="text" placeholder="State" {...state}/>
                    </div>
                  </div>
                  <div className="col s6 admin-form-input">
                    <div className="form-group">
                      <label>Country</label>
                      <input type="text" placeholder="Country" {...country}/>
                    </div>
                  </div>
                  <div className="col s6 admin-form-input">
                    <div className="form-group">
                      <label>Zip</label>
                      <input type="number" placeholder="Zip" {...zip}/>
                    </div>
                  </div>
                  <div className="col s6 admin-form-input">
                    <div className="form-group">
                      <label>Contact Person</label>
                      <input type="text" placeholder="Contact Person" {...contact_person}/>
                    </div>
                  </div>
                  <div className="col s6 admin-form-input">
                    <div className="form-group">
                      <label>Contact Title</label>
                      <input type="text" placeholder="Contact Title" {...contact_title}/>
                    </div>
                  </div>
                  <div className="col s6 admin-form-input">
                    <div className="form-group">
                      <label>Contact Number</label>
                      <input type="text" placeholder="Contact Number" {...contact_number}/>
                    </div>
                  </div>
                  <div className="col s6 admin-form-input">
                    <div className="form-group">
                      <label>Contact Email</label>
                      <input type="email" placeholder="Contact Email" {...contact_email}/>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-action">
                <div className="row marginless-row" style={{minWidth: 500}}>
                  <div className="col s12 m12 l3 offset-l5">
                    <a className="waves-effect waves-light btn btn-yellow" onClick={() => {this.setState({editMode: false}); resetForm()}}>Cancel</a>
                  </div>
                  <div className="col s12 m12 l3">
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
        <div className="card-content center-align animated fadeIn">
          <div className="center-align animated fadeIn"> <Spinner /> </div> 
        </div>
      );
    }
  }

  render() {
    let dataValid;
    let townshipData = this.props.townshipData;
    let townshipId = this.props.townshipCode;

    if (townshipData !== null && townshipData !== undefined) {
      dataValid = true;
    } else {
      dataValid = false;
    }

    return (
      <div style={{marginTop: 40}}>
        <nav>
          <div className="nav-wrapper nav-admin z-depth-2">
            <a className="brand-logo center">Township Details</a>
          </div>
        </nav>
        <div className="card">
          { 

          this.state.isShowingModal &&
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose} style={{top: 120}}>
              <TownshipImageUpload townshipId={this.props.townshipCode} />
            </ModalDialog>
          </ModalContainer>
          }

          {this.props.townshipListFetched.isLoading ?  
            <div> Loading... </div>
          : this.renderDetails(dataValid, townshipData)}
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
    townshipDetails: state.townshipDetails,
    townshipDetailsFetched: state.townshipDetailsFetched,
    uploadedImage: state.uploadedImage
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    editTownship,
    fetchTownshipList,
    updateTownshipDetails,
    resetLoading,
    resetTownshipDetails,
    fetchTownshipDetails,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'township-panel-details',
  fields,
  validate
})(TownshipDetails))
