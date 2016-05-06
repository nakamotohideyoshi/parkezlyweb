import React from "react";
import BackButton from "./utils/back-button.jsx";
import Logo from "./utils/logo.jsx";
import Menu from "./utils/menu.jsx";
import * as MenuData from "./utils/menu-data.js"

const Header = () => {

  return (
    <div className="navbar-fixed">
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
              <Menu menuData={MenuData.menuLinks}/>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;