import React from 'react';
import Body from "../../../common/components/body/body.jsx";
import TownshipDetails from './township-details.jsx';
import TownshipTiles from './township-tiles.jsx';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchTownshipList} from '../../actions/index';

export default class TownshipList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      townshipDetails: null
    }

    this.handeClick = this.handleFetch.bind(this);
    this.renderTownshipList = this.renderTownshipList.bind(this);
  }

  handleFetch(townshipData) {
    this.props.fetchTownshipList();
    this.forceUpdate();
  }

  componentWillMount() {
    this.props.fetchTownshipList();
  };

  renderTownshipList(townshipData) {
    return townshipData.resource.map((township) => {
        return(   
          <a 
          className="collection-item waves-effect waves-dark avatar" 
          key={township.id} 
          onClick={() => this.setState({townshipDetails: township})}>
              <img src="https://media-cdn.tripadvisor.com/media/photo-s/03/9b/2d/f2/new-york-city.jpg" alt="" className="circle"/>
              <span className="title">{township.city}</span>
              <p>{township.city} - {township.manager_type}</p>
          </a>
        );
    });
  }

  render() {
    let townshipDetails = this.state.townshipDetails;
    return (
      <Body showHeader={true} className="admin-body">
        <div className="content-container">
          <div className="row">
            <div className="col-xs-6">
              <nav>
                <div className="nav-wrapper nav-admin z-depth-2">
                  <a className="brand-logo center" onClick={() => this.handleFetch()}>Township List</a>
                </div>
              </nav>
              <div className="township-list-container">
              <ul className="collection z-depth-2">
                {this.props.townshipListFetched.map(this.renderTownshipList)}
              </ul>
              </div>
            </div>
            <TownshipDetails townshipData={townshipDetails}/>
          </div>  
          <TownshipTiles />
        </div>
      </Body>
    );
  }
}


function mapStateToProps(state) {
  return {
    townshipListFetched: state.townshipListFetched
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipList
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TownshipList);


