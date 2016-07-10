import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Body from "../../../../../common/components/body/body.jsx";
import {fetchTownshipUsers} from '../../../../actions/actions-township-panel.jsx';
import SearchInput, {createFilter} from 'react-search-input';

import TownshipPanelUsersEdit from './township-panel-users-edit.jsx';
import TownshipPanelUsersCreate from './township-panel-users-create.jsx';
import Spinner from '../../../../common/components/spinner.jsx';

import { BootstrapPager, GriddleBootstrap } from 'griddle-react-bootstrap'
import Griddle from 'griddle-react'
import {customFilterComponent, customFilterFunction} from '../../../../common/components/griddle-custom-filter.jsx'

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
    let parkingData = this.props.townshipUsersFetched.data.resource;
    return (
      <div>
        <Griddle
          tableClassName={'table table-bordered table-striped table-hover'}
          filterClassName={''}
          useGriddleStyles={false}
          results={parkingData}
          showFilter={true}
          showSettings={true}
          settingsToggleClassName='btn btn-default'
          useCustomPagerComponent={true}
          customPagerComponent={ BootstrapPager }
          useCustomFilterComponent={true} customFilterComponent={customFilterComponent}
          useCustomFilterer={true} customFilterer={customFilterFunction}
        />

        <div className="divider"/> 

        <div className="center-align">

          <a
            className="modal-trigger waves-effect waves-light btn valign" 
            onClick={() => $('#modal-violation-code-create').openModal()}
            style={{margin: 10}}>Add New User</a>
        </div>
      </div>
    );
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
          <div className="row marginless-row" style={{marginTop: 40}}>
            <div className="col s12">
              <nav>
                <div className="nav-wrapper nav-admin z-depth-2">
                  <a className="brand-logo center">User List</a>
                </div>
              </nav>
              <div className="card">
                <div className="township-userlist-container">
                  {this.props.townshipUsersFetched.isLoading ? 
                    <div> </div> : this.renderUserTable()}
                </div>
              </div>
            </div>
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



