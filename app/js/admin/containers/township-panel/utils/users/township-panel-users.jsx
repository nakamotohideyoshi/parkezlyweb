import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Body from "../../../../../common/components/body/body.jsx";
import SearchInput, {createFilter} from 'react-search-input';
import Spinner from '../../../../common/components/spinner.jsx';

import {
  fetchTownshipUsers, 
  editTownshipUsers, 
  createTownshipUsers,  
  resetLoading} from '../../../../actions/actions-township-panel.jsx'

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

import { Link } from 'react-router';

import TownshipPanelUsersForm from './township-panel-users-form.jsx'
import {ajaxSelectizeGet, ajaxDelete} from '../../../../common/components/ajax-selectize.js'
import _ from 'lodash';

const KEYS_TO_FILTERS = [
  'id',
  'user_id',
  'user_name',
  'township_code',
  'township_name',
  'profile_name',
  'status'
]


const fields = [ 
  'id',
  'user_id',
  'user_name',
  'township_code',
  'township_name',
  'profile_name',
  'status'
]

class customColumnComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onClick={() => this.props.metadata.customComponentMetadata.renderEditModal(
          this.props.rowData.id, 
          this.props.rowData
        )}>
        {this.props.data}
      </div>
    );
  }
}

customColumnComponent.defaultProps = { "data": {}, "renderEditModal": null};


class TownshipPanelUsers extends React.Component {
  constructor(props) {
    super(props);
    // Scroll to the top of the page on construct.
    window.scrollTo(0, 0);

    this.state = {
      showEditDuplicateButtons: false,
      parkingLocationCode: null,
      showEditModal: false,
      rowData: null,
      selectizeOptions: {}
    }

    this.renderUserTable = this.renderUserTable.bind(this);
    this.renderUserList = this.renderUserList.bind(this);
    this.updateRowData = this.updateRowData.bind(this);

    this.renderEditModal = this.renderEditModal.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  componentWillMount() {
    this.props.fetchTownshipUsers(this.props.townshipCode);
  }

  handleSuccess(){
    this.props.resetLoading();
    this.props.fetchTownshipUsers(this.props.townshipCode);
    this.setState({showEditDuplicateButtons: false});
    $('#modal-hearing-place-create').closeModal();
    $('#modal-success').openModal();
  }

  updateRowData(newData, objectKey) {
    console.log(_.assign(this.state.rowData, {[objectKey]: newData}))
    this.setState({
      rowData: _.assign(this.state.rowData, {[objectKey]: newData})
    });
  }

  renderCreateModal() {
    return(
      <TownshipPanelUsersForm 
        modalName="modal-township-users-create" 
        modalText="Create a User" 
        submitType="CREATE"
        initialValues={null}
        editMode={false}
        rowData={this.props.rowData}
        handleSuccess={this.handleSuccess}
        townshipCode={this.props.townshipCode}
        updateRowData={this.updateRowData}
      />
    );
  }

  renderEditModal(recordId, rowData) {
    window.scrollTo(0, document.body.scrollHeight);
    this.setState({showEditDuplicateButtons: true, rowData: rowData, showEditModal: true, parkingLocationCode: recordId})
  }

  renderUserTable() {
    let parkingData = this.props.townshipUsersFetched.data.resource;
    var renderEditModal = this.renderEditModal;
    var metaDataFunction = () =>  {
      return fields.map((data) => {
        return(
          {
            "columnName": data,
            "customComponent": customColumnComponent,
            'customComponentMetadata': {
                'renderEditModal': renderEditModal
            }
          }
        );
      });
    }
    var columnMeta = metaDataFunction()

    return (
      <div>
        <Griddle
          tableClassName={'table table-bordered table-striped table-hover'}
          filterClassName={''}
          useGriddleStyles={false}
          results={parkingData}
          showFilter={true}
          showSettings={true}
          settingsToggleClassName='btn'
          useCustomPagerComponent={true}
          customPagerComponent={ BootstrapPager }
          useCustomFilterComponent={true} customFilterComponent={customFilterComponent}
          useCustomFilterer={true} customFilterer={customFilterFunction}
          columnMetadata={columnMeta}
        />

        <div className="divider"/> 

        <div className="center-align">

          <a
            className="modal-trigger waves-effect waves-light btn valign blue-btn-admin"
            onClick={() => {
              window.scrollTo(0, 0);
              $('#modal-township-users-create').openModal()
            }}
            style={{margin: 10}}>Add New User</a>
        </div>
      </div>
    );
  }

  renderUserList() {
    return(
      <div>
        {this.state.editMode ? 
        <nav>
          <div className="nav-wrapper nav-admin z-depth-2">
            <a className="brand-logo center">Township Users Editor</a>
          </div>
        </nav>
        :
        <nav>
          <div className="nav-wrapper nav-admin z-depth-2">
            <a className="brand-logo center">Township Users List</a>
          </div>
        </nav>
        }

        <div className="card">
          <div className="divider" />
					{this.props.townshipUsersFetched.isLoading ? <div className="center-align"> <Spinner /> </div> : this.renderUserTable()}
          {this.state.editMode ? 
          null
          :
          <div className="center-align">
            <a
            className="modal-trigger waves-effect waves-light btn valign" 
            onClick={() => this.setState({createMode: true})}
            style={{margin: 10}}>Add New User</a>
          </div>
          }
                     
        </div>
      </div>
    );
  }

  renderEditDuplicateButtons(recordId) {
    return (
      <div className="container">
        <a
        style={{marginTop: 20}}
        onClick={() => {
					window.scrollTo(0, 0);
          this.setState({showEditModal: true})
          $('#modal-township-users-edit').openModal(); 
        }}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp blue-btn-admin">
          <i className="material-icons valign">edit</i>
          <h4> Edit - User ID: {recordId} </h4>
        </a>

        <a
        onClick={() => {
					window.scrollTo(0, 0);
          this.setState({showEditModal: true})
          $('#modal-township-users-duplicate').openModal(); 
        }}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp blue-btn-admin">
          <i className="material-icons valign">content_copy</i>
          <h4> Duplicate - User ID: {recordId} </h4>
        </a>

        <a
        onClick={() => {
					window.scrollTo(0, 0);
					$('#modal-delete').openModal() 
				}}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp blue-btn-admin">
          <i className="material-icons valign">delete</i>
          <h4> Delete - User ID: {recordId} </h4>
        </a>

        <div id="modal-delete" className="modal" style={{overflowX: "hidden"}}>
          <div className="modal-content">
            <h4>Delete</h4>
            <p>Are you sure you want to delete this record?</p>
          </div>
          <div className="modal-footer">
            <div className="row marginless-row">
              <div className="col s6 left">
                <button 
                  href="#" 
                  className=" modal-action modal-close waves-effect waves-green btn-flat">Close</button>
              </div>
              <div className="col s3">
                <a className="waves-effect waves-light btn btn-red" 
                onClick={() => {
                  $('#modal-delete').closeModal()
                }}>No</a>
              </div>
              <div className="col s3">
                <a className="waves-effect waves-light btn btn-green" 
                onClick={() => {
                  $('#modal-delete').closeModal()
                  ajaxDelete('township_users', recordId, this.handleSuccess);
                  this.setState({showEditDuplicateButtons: false});
                  window.scrollTo(0, 0);
                }}>Yes</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>
          <div className="row marginless-row" style={{marginTop: 40}}>
            <div className="col s12">
              <nav>
                <div className="nav-wrapper nav-admin z-depth-2">
                  <a className="brand-logo center">User List</a>
                </div>
              </nav>
              <div className="card">
                <div className="township-userlist-container">
                  {this.props.townshipUsersFetched.isLoading ? 
                    <div className="card-content center-align">
                      <div className="center-align"> <Spinner /> </div> 
                    </div>
                    : this.renderUserTable()}
                </div>
              </div>
              {this.state.showEditDuplicateButtons ? 
                this.renderEditDuplicateButtons(this.state.parkingLocationCode) : <div> </div>}
            </div>
          </div>
        </Body>

        { this.props.townshipUsersFetched.isLoading ? 
          <div> </div> : this.renderCreateModal()}

        { 
          !this.state.showEditModal ?
          <div></div> : 
          <div>
            <TownshipPanelUsersForm
              initialValues={this.state.rowData} 
              handleSuccess={this.handleSuccess}
              modalName="modal-township-users-edit" 
              modalText="Edit a User" 
              submitType="EDIT"
              initialValues={this.state.rowData} 
              rowData={this.state.rowData}
              handleSuccess={this.handleSuccess}
              townshipCode={this.props.townshipCode}
              updateRowData={this.updateRowData}
              />
            <TownshipPanelUsersForm 
              initialValues={this.state.rowData} 
              handleSuccess={this.handleSuccess}
              modalName="modal-township-users-duplicate" 
              modalText="Duplicate a User" 
              submitType="DUPLICATE"
              initialValues={this.state.rowData} 
              rowData={this.state.rowData}
              handleSuccess={this.handleSuccess}
              townshipCode={this.props.townshipCode}
              updateRowData={this.updateRowData}
              />
          </div>
        }

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
    townshipUsersFetched: state.townshipUsersFetched
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipUsers,
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TownshipPanelUsers);

