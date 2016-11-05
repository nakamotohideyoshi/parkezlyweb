import React from 'react';
import Body from "../../../common/components/body/body.jsx";
import TownshipDetails from './utils/township-details.jsx';
import TownshipTiles from './utils/township-tiles.jsx';
import SearchInput, {createFilter} from 'react-search-input';
import TownshipCreate from './utils/township-create.jsx';
import Spinner from '../../common/components/spinner.jsx';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchTownshipList, updateTownshipDetails} from '../../actions/actions-township';
import {SchemaFilterTest} from '../../common/components/schema-filter-test.jsx'



const KEYS_TO_FILTERS = ['city']



class TownshipListRoot extends React.Component {
  constructor(props) {
    super(props);
    
    //SchemaFilterTest();

    this.state = {
      searchTerm: ''
    }

    // Scroll to the top of the page on construct.
    window.scrollTo(0, 0);

    this.handleFetch = this.handleFetch.bind(this);
    this.renderTownshipList = this.renderTownshipList.bind(this);
  
  }

  componentWillMount() {
    this.props.fetchTownshipList();
  };

  handleFetch(townshipData) {
    this.props.fetchTownshipList();
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
              src={township.township_logo} 
              alt="" className="circle"/>
              <span className="title">{township.city}</span>
              <p>{township.city} - {township.manager_type}</p>
          </a>
        );
    });

  }

  render() {
    let townshipDetails = this.props.townshipDetails;
    return (
      <div className="blue-body">
        <Body showHeader={true}>
          <div className="content-container">
            <div className="row">
              <div className="col s12 m12 l6 township-content-width">
                <nav>
                  <div className="nav-wrapper nav-admin z-depth-2">
                    <a 
                    className="brand-logo center">Township List</a>
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
              <div className="col s12 m12 l6 township-content-width">
                <TownshipDetails townshipData={townshipDetails} initialValues={townshipDetails.data}/>
              </div>
            </div>  
            <TownshipTiles townshipData={townshipDetails} />
          </div>
        </Body>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TownshipListRoot);