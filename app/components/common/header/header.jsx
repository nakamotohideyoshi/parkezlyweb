import React from "react";
import BackButton from "./utils/back-button.jsx";
import Logo from "./utils/logo.jsx";
import Menu from "./utils/menu.jsx";
import * as MenuData from "./utils/menu-data.js"

const Header = ({show}) => {

  return show ? (
    <nav className="navbar navbar-static-top">
      <div className="container-fluid">
        <div className="row navbar">
          <div className="col-xs-3">
            <BackButton/>
          </div>
          <div className="col-xs-6">
            <Logo/>
          </div>
          <div className="col-xs-3">
            <Menu menuData={MenuData.menuLinks}/>
          </div>
        </div>
      </div>
    </nav>
  ) : <div></div>;
}

export default Header;