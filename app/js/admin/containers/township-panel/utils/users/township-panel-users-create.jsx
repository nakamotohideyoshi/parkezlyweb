import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form'
import {reset} from 'redux-form';

import {fetchTownshipUsers, createTownshipUsers, resetLoading} from '../../../../actions/actions-township-panel.jsx';
import SearchInput, {createFilter} from 'react-search-input';

export const fields = [ 
  'user_id',
  'user_name',
  'township_code',
  'township_name',
  'profile_name',
  'status']

const validate = values => {
  const errors = {}
  if (!values.user_id) {
    errors.user_id = 'User ID Required'
  } else if (values.user_id.length > 15) {
    errors.user_id = 'Must be 15 characters or less'
  }
  return errors
}

class TownshipPanelUsersCreate extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  componentDidUpdate() {
    console.log(this.props.townshipUsersCreated)
    if (!this.props.townshipUsersCreated.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess() {
    this.props.setInitialValues();
    this.props.openModal();
    this.props.resetLoading();
    this.props.createModeFalse();
    this.props.resetForm();
  }

  handleSubmit(data) {
    console.log(data)
    this.props.createTownshipUsers(data);
  }

  render() {
    const {
      fields: {
        user_id,
        user_name,
        township_code,
        township_name,
        profile_name,
        status
      },
      resetForm,
      submitting
    } = this.props

    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)} style={{margin: 0}}>
          <div className="row"/>
          <div className="row">
            <div className="center-align">
              <h4 style={{marginTop: 0}}>Create Township User</h4>
              <p className="center-align">Create a township user by changing the fields.</p>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>User ID</label>
                  <input type="text" placeholder="User ID" {...user_id}/>
                </div>    
                {user_id.touched && user_id.error && <div className="form-required">{user_id.error}</div>}
              </div>
              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" placeholder="Username" {...user_name}/>
                </div>
              </div>
              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Profile Name</label>
                  <input type="text" placeholder="Profile Name" {...profile_name}/>
                </div>
              </div>
              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Status</label>
                  <input type="text" placeholder="Status" {...status}/>
                </div>
              </div>
            </div>
          </div>
          <div className="divider" />
          <div className="center-align">
            <a 
            className="modal-trigger waves-effect waves-light btn valign" 
            style={{margin: 10}}
            onClick={() => this.props.createModeFalse()}>Go Back to User List</a>

            <a className="waves-effect waves-light btn btn-yellow" disabled={submitting} onClick={resetForm}>Clear Values</a>

            <button 
            type="submit" 
            style={{margin: 10}}
            disabled={submitting} 
            className="waves-effect waves-light btn btn-green">Save User</button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    townshipUsersFetched: state.townshipUsersFetched,
    townshipUsersCreated: state.townshipUsersCreated
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipUsers,
    createTownshipUsers,
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'township-panel-users-create',
  fields,
  validate,
  overwriteOnInitialValuesChange : true
})(TownshipPanelUsersCreate));
