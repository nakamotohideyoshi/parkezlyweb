import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { reduxForm, change } from 'redux-form'
import datetime from 'node-datetime';

import {
  fetchTownshipPermitTypes, 
  createTownshipPermitTypes,
  resetLoading
} from '../../../../../actions/actions-township-panel.jsx'

import Spinner from '../../../../../common/components/spinner.jsx';

const potentialColors = [ 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet' ]

export const fields = [ 
  'permit_type', 'date_time']

class PermitTypes extends React.Component {

  constructor(props) {
    super(props);

    this.renderPermitList = this.renderPermitList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);

    var dt = datetime.create();
    var formattedDate = dt.format('m-d-Y H:M:S');
    this.props.dispatch(change('permit-types', 'date_time', formattedDate));
  }

  componentWillMount() {
    this.props.fetchTownshipPermitTypes();
  }

  componentDidUpdate() {
    if (this.props.townshipPermitTypesCreated.isLoading) {
    } else if (!this.props.townshipPermitTypesCreated.isLoading) {
      this.handleSuccess();
    }
  };

  handleSuccess(){
    this.props.resetLoading();
    $('#modal-permit-type-create').closeModal();
    this.props.fetchTownshipPermitTypes();
  }

  handleSubmit(data) {
    this.props.createTownshipPermitTypes(data);
  }

  renderCreateModal() {

    const {
      fields: {
        permit_type,
        date_time
      },
      resetForm,
      submitting
    } = this.props

    return(
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <div id="modal-permit-type-create" className="modal modal-fixed-footer">
          <div className="modal-content">

            <div className="row">
              <div className="center-align">
                <h4>Create a Permit Type</h4>
                <p className="center-align">Create a permit type by filling out the fields.</p>
              </div>
            </div>

            <div className="row">
              <div className="col s12">
                <div className="form-group">
                  <label>Permit Type</label>
                  <input type="text" placeholder="Permit Type" {...permit_type}/>
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

  renderPermitList() {
    let filteredTypes = this.props.townshipPermitTypesFetched.data.resource;
    return filteredTypes.map((type) => {
      return( 
        <div key={type.id}>
          <a className="collection-item waves-effect waves-dark">
            <span className="title">PERMIT TYPE - {type.permit_type}</span>
          </a>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="col s6">
        <nav>
          <div className="nav-wrapper nav-admin z-depth-2">
            <a className="brand-logo center">Township Permit Types</a>
          </div>
        </nav>
        <div className="card">

          <div className="township-list-container center-align">
            <ul className="collection z-depth-2">
              {this.props.townshipPermitTypesFetched.isLoading ? 
                <div className="center-align"> <Spinner /> </div> : this.renderPermitList()}
            </ul>
          </div>

          <div className="divider"/>

          <div className="center-align">
            <a
              className="modal-trigger waves-effect waves-light btn valign" 
              onClick={() => $('#modal-permit-type-create').openModal()}
              style={{margin: 10}}>Add New Permit Type</a>
          </div>
            {this.renderCreateModal()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    townshipPermitTypesFetched: state.townshipPermitTypesFetched,
    townshipPermitTypesCreated: state.townshipPermitTypesCreated
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipPermitTypes,
    createTownshipPermitTypes,
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'permit-types',
  fields
})(PermitTypes));


/*
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!

  var yyyy = today.getFullYear();
  if(dd<10){
      dd='0'+dd
  } 
  if(mm<10){
      mm='0'+mm
  } 
  var today = yyyy + '-' + mm + '-' + dd + ' ' + time;

  console.log(today);
  console.log(today);

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
*/