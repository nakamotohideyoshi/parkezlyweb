import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { reduxForm } from 'redux-form'

import {submitNewTownship} from '../../../actions/index';

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

class TownshipCreate extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    this.props.submitNewTownship(data);
  }

  render() {
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

    return (
      <div className="valign-wrapper">
        <a 
        className="modal-trigger waves-effect waves-light btn valign"
        onClick={() => $('#modal-township-create').openModal()}>Create</a>

          <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
            <div id="modal-township-create" className="modal modal-fixed-footer">
              <div className="modal-content">
                <div className="row">
                  <div className="center-align">
                    <h4>Create a Township</h4>
                    <p className="center-align">Create a township by filling out the fields.</p>
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

              <div className="modal-footer">
                <div className="row marginless-row">
                  <div className="col s3">
                    <a className="modal-action modal-close waves-effect waves-light btn btn-yellow">Cancel</a>
                  </div>
                  <div className="col s4 offset-s1">
                    <a className="waves-effect waves-light btn btn-green" disabled={submitting} onClick={resetForm}>Clear Values</a>
                  </div>
                  <div className="col s4">
                    <button 
                    type="submit" 
                    disabled={submitting} 
                    className="waves-effect waves-light btn">Create Township</button>
                  </div>
                </div>
              </div>

            </div>
          </form>
      </div>
    );
  }
}


TownshipCreate.propTypes = {
  fields: React.PropTypes.object.isRequired,
  resetForm: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {
    townshipReducer: state.townshipReducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    submitNewTownship
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'township-create',
  fields
})(TownshipCreate))


// {submitting ? <p> TEST </p> : <p> TESTING </p>} 