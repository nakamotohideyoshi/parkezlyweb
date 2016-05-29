import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Body from "../../../../../common/components/body/body.jsx";
import {fetchTownshipUsers} from '../../../../actions/actions-township-panel.jsx';
import SearchInput, {createFilter} from 'react-search-input';

import TownshipPanelUsersEdit from './township-panel-users-edit.jsx';
import TownshipPanelUsersCreate from './township-panel-users-create.jsx';
import Spinner from '../../../../common/components/spinner.jsx';

import { Link } from 'react-router';

const KEYS_TO_FILTERS = ['user_id',
  'user_name',
  'township_code',
  'township_name',
  'profile_name',
  'status']

class TownshipPanelUsers extends React.Component {
  constructor(props) {
    super(props);
    // Scroll to the top of the page on construct.
    window.scrollTo(0, 0);

    this.state = {
      editMode: false,
      createMode: false,
      fieldData: null,
      userId: null,
      searchTerm: ''
    }

    this.renderUserTable = this.renderUserTable.bind(this);
    this.renderUserTableData = this.renderUserTableData.bind(this);
    this.renderUserList = this.renderUserList.bind(this);
    this.renderUserCreate = this.renderUserCreate.bind(this);
  }

  componentWillMount() {
    this.props.fetchTownshipUsers(this.props.townshipCode);
  };

  renderUserTableData(filteredUsersData) {
    const filteredUsers = filteredUsersData.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    console.log(filteredUsers)
    if(filteredUsers.length > 0){   
      return filteredUsers.map((user) => {
        return( 
          <tr className="clickable" key={user.id} onClick={
            () => this.setState({
              editMode: true,
              createMode: false, 
              fieldData: user, 
              userId: user.id
            })
          }>
            <td>{user.user_id}</td>
            <td>{user.user_name}</td>
            <td>{user.township_code}</td>
            <td>{user.township_name}</td>
            <td>{user.profile_name}</td>
            <td>{user.status}</td>
          </tr>  
        );
      });
    } else {
      return( 
        <tr>
          <td>There are currently no users in this township or ones that match your search. Please create one.</td> 
        </tr>
      );
    }
  }

  renderUserTable() {
    if (this.state.editMode === false) {
      const filteredUsers = this.props.townshipUsersFetched.data.resource;
      return (
        <div>
          <div className="row marginless-row valign-wrapper">
            <div className="col s1"/>
            <div className="col s2">
              <p>
                <input type="checkbox" className="filled-in" id="township-user-id" />
                <label htmlFor="township-user-id">User Id</label>
              </p>
            </div>
            <div className="col s2">
              <p>
                <input type="checkbox" className="filled-in" id="township-user-name" />
                <label htmlFor="township-user-name">User Name</label>
              </p>
            </div>
            <div className="search-wrapper card col s7" style={{marginBottom:10, marginTop: 10}}>
              <div className="row marginless-row valign-wrapper">
                <SearchInput 
                className="search search-input col s11" 
                onChange={(term) => this.setState({searchTerm: term})}
                style={{border: 0, margin: 0}} />
                <i className="material-icons col s1 valign clickable">search</i>
              </div>
            </div>
            <div className="col s1"/>
          </div>

          <div className="divider" />
          <div className="township-userlist-container">
            <table className="highlight">
              <thead>
                <tr>
                  <th data-field="id">User ID</th>
                  <th data-field="name">User Name</th>
                  <th data-field="price">Township Code</th>
                  <th data-field="price">Township Name</th>
                  <th data-field="price">Profile Name</th>
                  <th data-field="price">Status</th>
                </tr>
              </thead>
              <tbody>
              {this.renderUserTableData(filteredUsers)}
              </tbody>
            </table>
          </div>
        </div>
      );   
    } else {
      return (
        <TownshipPanelUsersEdit 
        initialValues={this.state.fieldData} 
        setInitialValues={() => this.props.fetchTownshipUsers(this.props.townshipCode)}
        userId={this.state.userId}
        editModeFalse={() => this.setState({editMode: false})}
        openModal={() => $('#modal-success').openModal()} />
      );
    }
    
  }

  renderUserList() {
    return(
      <div>
        {this.state.editMode ? 
        <nav>
          <div className="nav-wrapper nav-admin z-depth-2">
            <a className="brand-logo center">Township Users Editor</a>
          </div>
        </nav>
        :
        <nav>
          <div className="nav-wrapper nav-admin z-depth-2">
            <a className="brand-logo center">Township Users List</a>
          </div>
        </nav>
        }

        <div className="card">
            {this.props.townshipUsersFetched.isLoading ? <div className="center-align"> <Spinner /> </div> : this.renderUserTable()}
          <div className="divider" />

          {this.state.editMode ? 
          null
          :
          <div className="center-align">
            <a
            className="modal-trigger waves-effect waves-light btn valign" 
            onClick={() => this.setState({createMode: true})}
            style={{margin: 10}}>Add New User</a>
          </div>
          }
                     
        </div>
      </div>
    );
  }

  renderUserCreate() {
    return(
    <div>
      <nav>
        <div className="nav-wrapper nav-admin z-depth-2">
          <a className="brand-logo center">Township Users Create</a>
        </div>
      </nav>
       <div className="card">
        <TownshipPanelUsersCreate 
        setInitialValues={() => this.props.fetchTownshipUsers(this.props.townshipCode)}
        createModeFalse={() => this.setState({createMode: false})}
        initialValues={{township_code: this.props.townshipCode, township_name: this.props.townshipCode}}
        openModal={() => $('#modal-success').openModal()}/>
       </div>
    </div>
    );
  }

  render() {
    return (
      <div className="blue-body marginless-row">
        <Body showHeader={true}>
          <div className="container" style={{marginTop: 40}}>
            {this.state.createMode ?
              this.renderUserCreate()
              :
              this.renderUserList()
            }
          </div>
        </Body>

        <div id="modal-success" className="modal">
          <div className="modal-content">
            <h4>Success!</h4>
            <p>You've successfully sent the request!</p>
          </div>
          <div className="modal-footer">
            <button 
            href="#" 
            className=" modal-action modal-close waves-effect waves-green btn-flat">Close</button>
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    townshipUsersFetched: state.townshipUsersFetched
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTownshipUsers
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TownshipPanelUsers);




//<i>{(()=>{ console.log("Testing 123") })()}</i>

/*

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
*/

/*
if(arrayName.length > 0){   
    //this array is not empty 
}else{
   //this array is empty
}
*/