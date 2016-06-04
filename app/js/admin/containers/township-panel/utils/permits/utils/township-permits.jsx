import React from 'react';
import { reduxForm, change } from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import datetime from 'node-datetime';
import ObjectSelect from '../../../../../common/components/object-select.jsx'
import {SimpleSelect} from "react-selectize"

import {
  fetchTownshipPermitsList, 
  createTownshipPermitsList, 
  resetLoading} from '../../../../../actions/actions-township-panel.jsx'

import Spinner from '../../../../../common/components/spinner.jsx';


export const fields = [ 
'user_id',
'township_code',
'permit_name',
'name']

var options = ["apple", "mango", "grapes", "melon", "strawberry"].map(function(fruit){
    return {label: fruit, value: fruit}
});
class TownshipPermits extends React.Component {

  constructor(props) {
    super(props);

    this.renderCreateModal = this.renderCreateModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);

    var dt = datetime.create();
    var formattedDate = dt.format('m-d-Y H:M:S');
    //this.props.dispatch(change('permit-types', 'date_time', formattedDate));
  }

  componentWillMount() {
    this.props.fetchTownshipPermitsList();
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

  renderPermitsData() {
    let filteredPermits = this.props.townshipPermitsListFetched.data.resource;
    return filteredPermits.map((permit) => {
      return( 
        <tr key={permit.id}>
          <td>{permit.user_id}</td>
          <td>{permit.township_code}</td>
          <td>{permit.permit_name}</td>
          <td>{permit.name}</td>
        </tr>
      );
    });
  }

  renderCreateModal() {
    $('select').material_select();
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

    console.log(this.props.fields.user_id.value)
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
              <div className="col s6">
                <div className="form-group">
                  <label>User Id</label>
                  <div clasName="input-field col s12">
                    <SimpleSelect 
                    options = {options} 
                    placeholder = "Select a fruit" 
                    theme = "material" 
                    style={{marginTop: 6}}
                    onValueChange = {(value) => {
                      dispatch(change('township-permits', 'permit_name', value.value));
                      console.log(value.value)     
                    }}></SimpleSelect>
                  </div>
                </div>
              </div>
              <div className="col s6">
                <div className="form-group">
                  <label>Township Code</label>
                  <input type="text" placeholder="Township Code"/>
                </div>
              </div>
              <div className="col s6">
                <div className="form-group">
                  <label>Permit Name</label>
                  <SimpleSelect options = {options} placeholder = "Select a fruit" theme = "material" {...permit_name}></SimpleSelect>
                </div>
              </div>
              <div className="col s6">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" placeholder="Name" {...name}/>
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
    console.log(this.props.townshipPermitsListFetched)
    return (
      <div className="township-userlist-container">
        <table className="highlight">
          <thead>
            <tr>
              <th data-field="id">User ID</th>
              <th data-field="id">Township Code</th>
              <th data-field="price">Permit Name</th>
              <th data-field="id">Name</th>
            </tr>
          </thead>
          <tbody>
            {this.renderPermitsData()}
          </tbody>
        </table>
      </div>
    ); 
  }

  render() {
    console.log(this.props.townshipPermitsListFetched)
    return (
      <div className="col s6">
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
          {this.renderCreateModal()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    townshipPermitsListFetched: state.townshipPermitsListFetched,
    townshipPermitsListCreated: state.townshipPermitsListCreated
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipPermitsList,
    createTownshipPermitsList,
    resetLoading
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