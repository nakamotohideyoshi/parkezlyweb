import React from 'react';
import Body from "../../../common/components/body/body.jsx";
import TownshipDetails from './utils/township-details.jsx';
import TownshipTiles from './utils/township-tiles.jsx';
import SearchInput, {createFilter} from 'react-search-input';
import TownshipCreate from './utils/township-create.jsx';
import Spinner from '../../common/components/spinner.jsx';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchTownshipList, updateTownshipDetails} from '../../actions/index';

const KEYS_TO_FILTERS = ['city']

export default class TownshipList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ''
    }

    this.handleFetch = this.handleFetch.bind(this);
    this.renderTownshipList = this.renderTownshipList.bind(this);
  }

  componentWillMount() {
    this.props.fetchTownshipList();
  };

  handleFetch(townshipData) {
    this.props.fetchTownshipList();
    this.forceUpdate();
    $('#modal-success').openModal();
  }

  renderTownshipList(townshipData) {

    let townshipObjects = townshipData.resource;

    const filteredTownships = townshipObjects.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));

    return filteredTownships.map((township) => {
        return(   
          <a 
          className="collection-item waves-effect waves-dark avatar" 
          key={township.id} 
          onClick={() => this.props.updateTownshipDetails(township)}>
              <img 
              src="https://media-cdn.tripadvisor.com/media/photo-s/03/9b/2d/f2/new-york-city.jpg" 
              alt="" className="circle"/>
              <span className="title">{township.city}</span>
              <p>{township.city} - {township.manager_type}</p>
          </a>
        );
    });

  }

  render() {

    let townshipDetails = this.props.townshipDetails;
    let isLoading = true;

    return (
      <Body showHeader={true}>
        <div className="content-container">
          <div className="row">
            <div className="col s6">
              <nav>
                <div className="nav-wrapper nav-admin z-depth-2">
                  <a 
                  className="brand-logo center" 
                  onClick={() => this.handleFetch()}>Township List</a>
                </div>
              </nav>
              <div className="card">
                <div className="row marginless-row valign-wrapper">
                  <div className="col s1"/>
                  <div className="col s3">
                    <TownshipCreate />
                  </div>
                  <div className="search-wrapper card col s7" style={{marginBottom:10, marginTop: 10}}>
                    <div className="row marginless-row valign-wrapper">
                      <SearchInput 
                      className="search search-input col s11" 
                      style={{border: 0, margin: 0}}
                      onChange={(term) => this.setState({searchTerm: term})} />
                      <i className="material-icons col s1 valign clickable">search</i>
                    </div>
                  </div>
                  <div className="col s1"/>
                </div>
              </div>
              <div className="township-list-container center-align">
                <ul className="collection z-depth-2">
                  {this.props.townshipListFetched.isLoading ?  <Spinner /> : this.renderTownshipList(this.props.townshipListFetched.data)}
                </ul>
              </div>
            </div>
            <TownshipDetails townshipData={townshipDetails}/>
          </div>  
          <TownshipTiles townshipData={townshipDetails}/>
        </div>
      </Body>
    );
  }
}


function mapStateToProps(state) {
  return {
    townshipListFetched: state.townshipListFetched,
    townshipListEdited: state.townshipListEdited,
    townshipDetails: state.townshipDetails
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipList,
    updateTownshipDetails
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TownshipList);


/* 
console.log({ 
      typeof: typeof townshipObjects, 
      isArray: Array.isArray(townshipObjects), 
      isPromise: townshipObjects && typeof townshipObjects.then === 'function'});

*/