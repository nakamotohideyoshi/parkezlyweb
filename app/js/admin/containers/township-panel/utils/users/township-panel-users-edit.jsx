import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form'
import {reset} from 'redux-form';

import {fetchTownshipUsers, editTownshipUsers, resetLoading} from '../../../../actions/actions-township-panel.jsx';
import SearchInput, {createFilter} from 'react-search-input';

export const fields = [ 
  'user_id',
  'user_name',
  'township_code',
  'township_name',
  'profile_name',
  'status']

class TownshipPanelUsersEdit extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  componentDidUpdate() {
    if (!this.props.townshipUsersEdited.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess() {
    this.props.setInitialValues();
    this.props.openModal();
    this.props.resetLoading();
    this.props.editModeFalse();
    this.props.resetForm();
  }

  handleSubmit(data) {
    this.props.editTownshipUsers(data, this.props.userId);
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
              <h4 style={{marginTop: 0}}>Edit Township User</h4>
              <p className="center-align">Edit a township user by changing the fields.</p>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col s6">
                <div className="form-group">
                  <label>User ID</label>
                  <input type="text" placeholder="User ID" {...user_id}/>
                </div>
              </div>
              <div className="col s6">
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" placeholder="Username" {...user_name}/>
                </div>
              </div>
              <div className="col s6">
                <div className="form-group">
                  <label>Township Code</label>
                  <input type="text" placeholder="Township Code" {...township_code}/>
                </div>
              </div>
              <div className="col s6">
                <div className="form-group">
                  <label>Township Name</label>
                  <input type="text" placeholder="Township Name" {...township_name}/>
                </div>
              </div>
              <div className="col s6">
                <div className="form-group">
                  <label>Profile Name</label>
                  <input type="text" placeholder="Profile Name" {...profile_name}/>
                </div>
              </div>
              <div className="col s6">
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
            onClick={() => this.props.editModeFalse()}>Go Back to User List</a>

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
    townshipUsersEdited: state.townshipUsersEdited,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipUsers,
    editTownshipUsers,
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'township-panel-users-edit',
  fields,
  overwriteOnInitialValuesChange : true
})(TownshipPanelUsersEdit));
