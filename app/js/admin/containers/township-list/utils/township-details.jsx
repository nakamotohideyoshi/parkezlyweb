import React from 'react';

export default class TownshipDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      townshipData: null,
      editMode: false
    }
  }

  renderDetails(dataValid) {
    let townshipData = this.props.townshipData;
    if(dataValid) {
      return (
        <div>
          <div className="card-image">
            <img src="https://media-cdn.tripadvisor.com/media/photo-s/03/9b/2d/f2/new-york-city.jpg"/>
            <span className="card-title">{townshipData.city}</span>
          </div>
          <div className="card-content township-details-container">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Manager Id</label>
                  <input value={townshipData.manager_id} onChange={() => this.setState({townshipData: townshipData})}/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Manager Type</label>
                  <input value={townshipData.manager_type} onChange={() => this.setState({townshipData: townshipData})}/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Lot Manager</label>
                  <input value={townshipData.lot_manager} onChange={() => this.setState({townshipData: townshipData})}/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Address</label>
                  <input value={townshipData.address} onChange={() => this.setState({townshipData: townshipData})}/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>State</label>
                  <input value={townshipData.state} onChange={() => this.setState({townshipData: townshipData})}/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>City</label>
                  <input value={townshipData.city} onChange={() => this.setState({townshipData: townshipData})}/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Country</label>
                  <input value={townshipData.country} onChange={() => this.setState({townshipData: townshipData})}/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Zip</label>
                  <input value={townshipData.zip} onChange={() => this.setState({townshipData: townshipData})}/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Contact Person</label>
                  <input value={townshipData.contact_person} onChange={() => this.setState({townshipData: townshipData})}/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Contact Title</label>
                  <input value={townshipData.contact_title} onChange={() => this.setState({townshipData: townshipData})}/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Contact Email</label>
                  <input value={townshipData.contact_email} onChange={() => this.setState({townshipData: townshipData})}/>
                </div>
              </div>
            </div>
          </div>
          <div className="card-action">
            <div className="row marginless-row">
              <div className="col-lg-1"/>
              <div className="col-lg-4 center-align">
                <a className="waves-effect waves-light btn">Go To Township</a>
              </div>
              <div className="col-lg-2"/>
              <div className="col-lg-4 center-align">
                <a className="waves-effect waves-light btn btn-green">Edit Township</a>
              </div>
              <div className="col-lg-1"/>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="card-content center-align">
          <p>Select a Township</p>
        </div>
      );
    }

  }

  render() {
    let townshipData = this.props.townshipData;
    let dataValid;
    if (townshipData !== null && townshipData !== undefined)
    {
      dataValid = true;
    } else {
      dataValid = false;
    }
    return (
      <div className="col-xs-6">
        <nav>
          <div className="nav-wrapper nav-admin z-depth-2">
            <a className="brand-logo center" onClick={() => this.handleFetch()}>Township Details</a>
          </div>
        </nav>
        <div className="card">
          {this.renderDetails(dataValid, townshipData)}
        </div>
      </div>
    );
  }
}
