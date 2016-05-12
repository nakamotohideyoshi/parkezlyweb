import React from 'react';
import Cropper from 'react-cropper';
import '../../../../../css/cropper.scss';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import Dropzone from 'react-dropzone';

//Testing HTTP remove later
import axios from 'axios';

export default class TownshipImageUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowingModal: true,
      files: [],
      cropResult: null
    }

    this.onDrop = this.onDrop.bind(this);
    this._cropImage = this._cropImage.bind(this);
  }

  _cropImage() {
    axios.post('/admin/s3', {croppedImage: this.refs.cropper.getCroppedCanvas().toDataURL()});
    if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.refs.cropper.getCroppedCanvas().toDataURL()
    });
    
    //this.refs.cropper.getCroppedCanvas().toDataURL(),
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
      {
          this.state.isShowingModal &&
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose}>
              <div className="row">
                <h1 className="center-align">Uploader</h1>
                <div style={{marginLeft: 300}}>
                  <Dropzone onDrop={this.onDrop}>
                    <div>Try dropping some files here, or click to select files to upload.</div>
                  </Dropzone>
                </div>
              </div>
              
              {this.state.files.map((file) => {filePreview = file.preview})}

              <div className="row">
                <div className="col s12 m12 l6">
                  <p className="center-align">Uploaded File Preview</p>
                  <img src={filePreview} style={{height: 256, width: 256}}/>
                </div>
                <div className="col s12 m12 l6">
                  <p className="center-align">Crop Preview</p>
                  <div className="cropper-wrap-box" style={{ height: 256, width: 256, position: "relative"}}>
                    <div className="img-preview" style={{ width: '100%', float: 'left', height: 300 }} />
                  </div>
                </div>
              </div>
              <Cropper
              ref='cropper'
              preview=".img-preview"
              src={filePreview}
              style={{height: 400, width: 800}}
              // Cropper.js options
              aspectRatio={1 / 1}
              guides={false} />
              <button 
              className="waves-effect waves-light btn btn-green center-align" 
              onClick={ this._cropImage }>Upload Cropped Image</button>
              <p> Cropped Image </p>
              <img style={{ width: '100%' }} src={this.state.cropResult} />
            </ModalDialog>
          </ModalContainer>
        }
        <div id="modal-upload" className="modal">
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

//<img src={file.preview} />