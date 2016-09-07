import React from 'react';
import { reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import datetime from 'node-datetime';
import {SimpleSelect} from "react-selectize"

import {
  fetchTownshipPermitsList, 
  createTownshipPermitsList, 
  fetchTownshipUsers,
  resetLoading} from '../../../../../actions/actions-township-panel.jsx'

import Spinner from '../../../../../common/components/spinner.jsx';
import {optionsSelectize} from '../../../../../common/components/options-selectize.js';

import Griddle from 'griddle-react'
import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import {customFilterComponent, customFilterFunction} from '../../../../../common/components/griddle-custom-filter.jsx'



export const fields = [ 
'user_id',
'township_code',
'permit_name',
'name']

class customColumnComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onClick={() => this.props.metadata.customComponentMetadata.renderEditModal(
        this.props.rowData)}>
        {this.props.data}
      </div>
    );
  }
}

customColumnComponent.defaultProps = { "data": {}, "renderEditModal": null};


class TownshipPermits extends React.Component {

  constructor(props) {
    super(props);

    this.renderCreateModal = this.renderCreateModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.renderEditModal = this.renderEditModal.bind(this);

    this.state = {
      showEditDuplicateButtons: false,
      parkingLocationCode: null,
      showEditModal: false,
      rowData: null,
      selectizeOptions: {}
    }

    var dt = datetime.create();
    var formattedDate = dt.format('m-d-Y H:M:S');
    this.props.dispatch(change('township-permits', 'date_time', formattedDate));
  }

  componentWillMount() {
    this.props.fetchTownshipPermitsList();
    this.props.fetchTownshipUsers(this.props.townshipCode);
    this.props.dispatch(change('township-permits', 'township_code', this.props.townshipCode));
  }

  componentDidUpdate() {
    if (this.props.townshipPermitsListCreated.isLoading) {
    } else if (!this.props.townshipPermitsListCreated.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess(){
    this.props.resetLoading();
    $('#modal-township-permit-create').closeModal();
    this.props.fetchTownshipPermitsList();
  }

  handleSubmit(data) {
    this.props.createTownshipPermitsList(data);
  }

  renderEditModal(rowData) {
    window.scrollTo(0, document.body.scrollHeight);
    this.setState({showEditDuplicateButtons: true, rowData: rowData, showEditModal: true})
  }

  renderCreateModal() {
    
    const {
      fields: {
        user_id,
        township_code,
        permit_name,
        name,
      },
      resetForm,
      submitting,
      dispatch
    } = this.props

    var options = this.props.townshipUsersFetched.data.resource;

    var optionsUserName = optionsSelectize(options, 'user_name');

    var optionsUserId = optionsSelectize(options, 'user_id');

    return(
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <div id="modal-township-permit-create" className="modal modal-fixed-footer">
          <div className="modal-content">

            <div className="row">
              <div className="center-align">
                <h4>Create a Township Permit</h4>
                <p className="center-align">Create a township permit  by filling out the fields.</p>
              </div>
            </div>

            <div className="row">
              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>User Id</label>
                  <div clasName="input-field col s12">
                    <SimpleSelect 
                    options = {optionsUserId} 
                    placeholder = "Select a User Id" 
                    theme = "material" 
                    style={{marginTop: 5}}
                    onValueChange = {(value) => {
                      dispatch(change('township-permits', 'user_id', value.value)); 
                    }}></SimpleSelect>
                  </div>
                </div>
              </div>
              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>User Name</label>
                  <SimpleSelect 
                    options = {optionsUserName} 
                    placeholder = "Select a User Name" 
                    theme = "material" 
                    style={{marginTop: 5}}
                    onValueChange = {(value) => {
                      dispatch(change('township-permits', 'name', value.value));     
                    }}></SimpleSelect>
                </div>
              </div>
              <div className="col s6 admin-form-input">
                <div className="form-group">
                  <label>Permit Name</label>
                  <input type="text" placeholder="Permit Name" {...permit_name}/>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <div className="row marginless-row">
              <div className="col s8">
                <button 
                type="submit" 
                disabled={submitting} 
                className="waves-effect waves-light btn">Create Permit Type</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );

  }

  renderPermitsTable() {
    let filteredPermits = this.props.townshipPermitsListFetched.data.resource;

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
      <Griddle
          tableClassName={'table table-bordered table-striped table-hover'}
          filterClassName={''}
          useGriddleStyles={false}
          results={filteredPermits}
          showFilter={true}
          showSettings={true}
          settingsToggleClassName='btn btn-default'
          useCustomPagerComponent={true}
          customPagerComponent={ BootstrapPager }
          useCustomFilterComponent={true} customFilterComponent={customFilterComponent}
          useCustomFilterer={true} customFilterer={customFilterFunction}
          columnMetadata={columnMeta}
          />
    ); 
  }

  renderEditDuplicateButtons(locationCode) {
    return (
      <div className="container" style={{marginTop: 40}}>
        <a
        onClick={() => {
          this.setState({showEditModal: true})
          $('#modal-township-facilities-edit').openModal(); 
        }}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">edit</i>
          <h4> Edit Township Permit: {locationCode} </h4>
        </a>
        <a
        onClick={() => {
          this.setState({showEditModal: true})
          $('#modal-township-facilities-duplicate').openModal(); 
        }}
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">content_copy</i>
          <h4> Duplicate Township Permit: {locationCode} </h4>
        </a>

        <a
        onClick={() => $('#modal-delete').openModal() }
        className="waves-effect waves-light btn-large admin-tile valign-wrapper col s12 m12 l12 animated fadeInUp">
          <i className="material-icons valign">delete</i>
          <h4> Delete Township Permit: {locationCode} </h4>
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
                  ajaxDelete('manage_locations', this.state.rowData.id, this.handleSuccess);
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
      <div>
        <nav>
          <div className="nav-wrapper nav-admin z-depth-2">
            <a className="brand-logo center">Township Permits</a>
          </div>
        </nav>
        <div className="card">
          {this.props.townshipPermitsListFetched.isLoading ? 
              <div className="center-align"> <Spinner /> </div> : this.renderPermitsTable()}   

          <div className="divider"/> 

          <div className="center-align">
            <a
              className="modal-trigger waves-effect waves-light btn valign" 
              onClick={() => $('#modal-township-permit-create').openModal()}
              style={{margin: 10}}>Add New Township Permit</a>
          </div>
          {this.props.townshipUsersFetched.isLoading ? <div> </div> : this.renderCreateModal()}
        </div>
         {this.state.showEditDuplicateButtons ? 
                this.renderEditDuplicateButtons(this.state.rowData.id) : <div> </div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    townshipPermitsListFetched: state.townshipPermitsListFetched,
    townshipPermitsListCreated: state.townshipPermitsListCreated,
    townshipUsersFetched: state.townshipUsersFetched
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipPermitsList,
    createTownshipPermitsList,
    resetLoading,
    fetchTownshipUsers
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'township-permits',
  fields
})(TownshipPermits));


/*

<Select
  name={this.props.field.name}
  value={value}
  options={options}
  onChange={::this.onChange}
  onBlur={() => this.props.field.onBlur(this.props.field.value)}
  placeholder={this.props.placeholder}
  noResultsText={this.state.noResultsText}
  disabled={this.props.submitting} />
*/

/*

  <select value='236' onChange={(event) => 
    this.props.dispatch(change('township-permits', 'user_id', event))
  } >
    <option disabled selected>Choose your option</option>
    <option value="Test">Option 1</option>
    <option value="Test2">Option 2</option>
    <option value="Test3">Option 3</option>
  </select>

*/