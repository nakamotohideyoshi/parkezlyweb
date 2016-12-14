import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { reduxForm } from 'redux-form'
import {submitNewTownship, fetchTownshipList, resetLoading} from '../../../actions/actions-township.js';

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

class TownshipCreate extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  componentDidUpdate() {
    if (this.props.townshipCreate.isLoading) {
    } else if (!this.props.townshipCreate.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess(){
    this.props.resetLoading();
    $('#modal-success').openModal();
    $('#modal-township-create').closeModal();
    this.props.fetchTownshipList();
  }

  handleSubmit(data) {
    this.props.submitNewTownship(data);
    $('#modal-township-create').openModal()
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
      <div>
        

          <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
            <div id="modal-township-create" className="modal modal-fixed-footer admin-parking-modal">
            <nav>
							<div className="nav-wrapper nav-admin">
								<a className="brand-logo center">Create A Township</a>
								<i 
								className="material-icons right right-align clickable" 
								style={{marginRight: 15, lineHeight: "55px"}}
								onClick={() => {
									$('#modal-township-create').closeModal();
								}}>close</i>
							</div>
						</nav>
              <div className="modal-content">
                <div className="row">
                  <div className="center-align">
                    <h4>Create a Township</h4>
                    <p className="center-align">Create a township by filling out the fields.</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col s12 admin-form-input">
                    <div className="form-group">
                      <input type="text" placeholder="Country" {...country}/>
                    </div>
                  </div>
                  <div className="col s12 admin-form-input">
                    <div className="form-group">
                      <input type="text" placeholder="City" {...city}/>
                    </div>
                  </div>
                  <div className="col s12 admin-form-input">
                    <div className="form-group">
                      <input type="text" placeholder="State" {...state}/>
                    </div>
                  </div>
                  <div className="col s12 admin-form-input">
                    <div className="form-group">
                      <input type="number" placeholder="Zip" {...zip}/>
                    </div>
                  </div>
                  <div className="col s12 admin-form-input">
                    <div className="form-group">
                      <input type="text" placeholder="Manager Type" {...manager_type}/>
                    </div>
                  </div>
                  <div className="col s12 admin-form-input">
                    <div className="form-group">
                      <input type="text" placeholder="Lot Manager" {...lot_manager}/>
                    </div>
                  </div>
                  <div className="col s12 admin-form-input">
                    <div className="form-group">
                      <input type="text" placeholder="Address" {...address}/>
                    </div>
                  </div>
                  <div className="col s12 admin-form-input">
                    <div className="form-group">
                      <input type="text" placeholder="Phone" {...contact_number}/>
                    </div>
                  </div>
                  <div className="col s12 admin-form-input">
                    <div className="form-group">
                      <input type="email" placeholder="Email" {...contact_email}/>
                    </div>
                  </div>
                  <div className="col s12 admin-form-input">
                    <div className="form-group">
                      <input type="text" placeholder="Owner Name" {...contact_person}/>
                    </div>
                  </div>
                  <div className="col s12 admin-form-input">
                    <div className="form-group">
                      <input type="text" placeholder="Owner Type" {...contact_title}/>
                    </div>
                  </div>
                  <div className="col s12 admin-form-input">
                    <div className="form-group">
                      <input type="text" placeholder="FacilityMgr Code" {...manager_id}/>
                    </div>
                    {manager_id.touched && manager_id.error && <div className="form-required">{manager_id.error}</div>}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <div className="row marginless-row">
                  <div className="col s6 left">
                    <button className="modal-action modal-close waves-effect waves-light btn btn-yellow" onClick={resetForm}>Cancel</button>
                  </div>

                  <div className="col s6 center-align">
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

function mapStateToProps(state) {
  return {
    townshipCreate: state.townshipCreate
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    submitNewTownship,
    fetchTownshipList,
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'township-create',
  fields,
  validate
})(TownshipCreate))

/*
<div className="col s4 center-align">
  <button className="waves-effect waves-light btn btn-green" disabled={submitting} onClick={resetForm}>Clear Values</button>
</div>
*/