import React from 'react'
import {SimpleSelect} from 'react-selectize'
import { reduxForm, change } from 'redux-form'

export default class AdminSelectize extends React.Component {
  constructor(props) {
    super(props);

    this.renderSelectize = this.renderSelectize.bind(this);
  }

  renderSelectize(){
    const {dispatch} = this.props
    let defaultValue;

    if (this.props.defaultData !== null && this.props.defaultData !== undefined) {
      defaultValue = this.props.defaultData[this.props.fieldName];
    }

    if(this.props.options[this.props.objectKey] !== undefined) {
      return (
        <div className="col s6 admin-form-input">
          <div className="form-group">
            <label>{this.props.fieldName}</label>
            <div clasName="input-field col s12">
              <SimpleSelect 
              options = {this.props.options[this.props.objectKey]} 
              placeholder = {this.props.fieldName}
              theme = "material" 
              style={{marginTop: 5}}
              defaultValue = {{label: defaultValue, value: defaultValue}}
              onValueChange = {(value) => {
                dispatch(change(this.props.formName, this.props.fieldName, value.value)); 
                this.props.onChange(value.value);
              }}></SimpleSelect>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col s6 admin-form-input">
          <div className="form-group">
            <label>{this.props.objectKey}</label>
            <div clasName="input-field col s12">
              <SimpleSelect 
              options = {this.props.options} 
              defaultValue = {{label: defaultValue, value: defaultValue}}
              placeholder = "Select Scheme Type" 
              theme = "material" 
              style={{marginTop: 5}}
              onValueChange = {(value) => {
                this.props.onChange(value.value);
              }}></SimpleSelect>
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    if (this.props.options[this.props.objectKey] === undefined) {
      //console.log(this.props.options[this.props.objectKey]);
    } else {
      //console.log(this.props.options[this.props.objectKey]);
    }
    
    return(
      <div>
        {this.renderSelectize()}
      </div>
    );
  }
}


/*
  testRender() {
    if(this.state.selectizeOptions.manage_locations !== undefined) {
      <div className="col s6 admin-form-input">
          <div className="form-group">
            <label>Scheme Type</label>
            <div clasName="input-field col s12">
              <SimpleSelect 
              options = {this.state.selectizeOptions} 
              placeholder = "Select Scheme Type" 
              theme = "material" 
              style={{marginTop: 5}}
              onValueChange = {(value) => {
                dispatch(change('locations-rate', 'scheme_type', value.value)); 
              }}></SimpleSelect>
            </div>
          </div>
        </div>
    } else {
      return (
        <div className="col s6 admin-form-input">
          <div className="form-group">
            <label>Scheme Type</label>
            <div clasName="input-field col s12">
              <SimpleSelect 
              options = {this.state.selectizeOptions} 
              placeholder = "Select Scheme Type" 
              theme = "material" 
              style={{marginTop: 5}}
              onValueChange = {(value) => {
                dispatch(change('locations-rate', 'scheme_type', value.value)); 
              }}></SimpleSelect>
            </div>
          </div>
        </div>
      )
    }
  }
  */