import React from 'react';
import Cropper from 'react-cropper';
import Dropzone from 'react-dropzone';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {uploadImage, editTownshipImage, resetLoading} from '../../../actions/actions-township.js';

import '../../../../../css/cropper.scss';

class TownshipImageUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      cropResult: null,
      showSpinner: false
    }

    this.onDrop = this.onDrop.bind(this);
    this._cropImage = this._cropImage.bind(this);
  }

  componentDidUpdate() {
    if (this.props.uploadedImage.isLoading) {

    } else {
      let townshipLogo = this.props.uploadedImage.data.data.message;
      this.props.editTownshipImage({"township_logo": townshipLogo}, this.props.townshipCode);
      this.setState({showerSpinner: false})
      this.props.resetLoading();
    }
  };

  _cropImage() {
    this.setState({
      cropResult: finalResult,
      showSpinner: true
    });

    let finalResult = this.refs.cropper.getCroppedCanvas({height: 256, width: 256}).toDataURL();

    this.props.uploadImage(finalResult);

    if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
  }

  onDrop(files) {
    this.setState({
        files: files
    });
  }

  render() {
    let filePreview;
    return (
      <div>
        {this.state.files.map((file) => {filePreview = file.preview})}
        <div className="row">
          <div className="col s12 m12 l4 offset-l1 center-align">
            <p className="center-align">Uploader</p>
            <Dropzone onDrop={this.onDrop}>
              <div style={{padding: 20}}>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
          </div>
          <div className="col s12 m12 l7">
            <p className="center-align">Crop Editor</p>
            <div className="image-upload-crop">
              <Cropper
                ref='cropper'
                preview=".img-preview"
                src={filePreview}
                style={{height: 300, width: 450}}
                // Cropper.js options
                aspectRatio={1 / 1}
                guides={false} />
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col s12 m12 l4">
            <p className="center-align">Uploaded File Preview</p>
            <img src={filePreview} style={{height: 256, width: 256}}/>
          </div>
          <div className="col s12 m12 l4">
            <p className="center-align">Crop Preview</p>
            <div className="cropper-wrap-box image-upload-crop" style={{ height: 256, width: 256, position: "relative"}}>
              <div className="img-preview" style={{ width: '100%', float: 'left', height: 300 }} />
            </div>
          </div>
          <div className="col s12 m12 l4">
            <p className="center-align"> Cropped Image </p>
            <div className="cropper-wrap-box" style={{ height: 256, width: 256, position: "relative"}}>
              <img style={{ height: 256, width: 256 }} src={this.state.cropResult} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col s12 m12 l12 center-align">
          {this.state.showSpinner ?  
            <div>
              <div> Uploading: Please be patient... </div>
              <div className="preloader-wrapper small active">
                <div className="spinner-layer spinner-green-only">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div><div className="gap-patch">
                    <div className="circle"></div>
                  </div><div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>
              </div>
            </div>: 
            <button 
            className="waves-effect waves-light green btn btn-green" 
            onClick={ this._cropImage }>Upload Cropped Image</button>}
            
          </div>
        </div>

        <div id="modal-upload-loading" className="modal">
          <div className="modal-content">
            <h4 s>Upload File</h4>
            <p>Placeholder to upload file.</p>
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

function mapStateToProps(state) {
  return {
    townshipListFetched: state.townshipListFetched,
    uploadedImage: state.uploadedImage
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    uploadImage,
    editTownshipImage,
    resetLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TownshipImageUpload);
