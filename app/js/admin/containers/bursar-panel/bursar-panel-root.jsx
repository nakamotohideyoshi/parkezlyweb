import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Body from "../../../common/components/body/body.jsx";
import Spinner from "../../../admin/common/components/spinner"

import {fetchTownshipList, fetchTownshipDetails} from '../../actions/actions-township.js';
import {BursarPanelTiles} from './utils/bursar-panel-tiles.jsx'

class BursarPanelRoot extends React.Component {

  constructor(props) {
    super(props);
    window.scrollTo(0, 0)
  }

  componentWillMount() {
    this.props.fetchTownshipDetails(this.props.townshipCode);
  }

  render() {
    return (
      <div className="blue-body">
        <Body showHeader={true}>
          <div className="content-container">
            <div className="container">
              {this.props.townshipDetailsFetched.isLoading ? 
                <div className="center-align"> 
                  <Spinner /> <div style={{color: "#FFF"}}> Loading... </div> 
                </div> 
                : 
                <BursarPanelTiles townshipCode={this.props.townshipDetailsFetched.data.resource[0].manager_id}/>}
            </div>
          </div>
        </Body>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    townshipDetailsFetched: state.townshipDetailsFetched,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipList,
    fetchTownshipDetails
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(BursarPanelRoot);