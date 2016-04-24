import React, { Component, PropTypes } from "react";
import classNames from "classnames";
import MenuList from "./menu-list.jsx";

const getState = () => {
  return {
    isOpen: false
  };
};

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = getState();

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    const isMenuOpen =  this.state.isOpen;
    this.setState({
      isOpen: !isMenuOpen
    });
  }

  renderMenuButton() {
    return (
      <button type="button" className="navbar-toggle" onClick={this.toggleMenu}>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
    );
  }

  render() {
    const { menuData, className } = this.props;
    const validClasses = classNames({
        "menu-btn-container": true
      },
      className
    );
    const menuBtn = this.renderMenuButton();

    return (
      <div className={validClasses}>
        {menuBtn}
          <MenuList
            open={this.state.isOpen}
            menuData={menuData}
            className="hamburger-menu-container"/>
      </div>
    );
  }
}

Menu.PropTypes = {
  menuData: PropTypes.array,
  className: PropTypes.string
}

export default Menu;
