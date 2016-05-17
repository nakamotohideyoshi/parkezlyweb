import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import cookie from "react-cookie";
import BackButton from "./utils/back-button.jsx";
import Logo from "./utils/logo.jsx";
import Menu from "./utils/menu.jsx";
import { mainGuestLinks, mainUserLinks, myAccountMenuLinks  } from "./utils/menu-data.js";

class Header extends Component {
  constructor(props){
    super(props);
  }

  getMenu() {
    const { selectedMenu } = this.props.header;
    const userId = cookie.load('userId');
    let currentMenu = null;
    switch (selectedMenu) {
      case "mainGuestLinks":
        currentMenu = mainGuestLinks;
        break;
      case "mainUserLinks":
        currentMenu = mainUserLinks;
        break;
      case "myAccountMenuLinks":
        currentMenu = myAccountMenuLinks;
        break;
    }
    return currentMenu ? currentMenu
      : (userId ? mainUserLinks : mainGuestLinks );
  }

  renderNav() {
    const menuData = this.getMenu();
    return (
      <nav>
        <div className="nav-wrapper">
          <div className="row">
            <div className="col s3">
              <BackButton/>
            </div>
            <div className="col s6">
              <Logo/>
            </div>
            <div className="col s3">
              <Menu menuData={menuData}/>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  render() {
    console.log(this.props);
    const nav = this.renderNav();
    return (
      <div className="navbar-fixed">
        {nav}
      </div>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    header: state
  };
};

export default connect(MapStateToProps)(Header);