import React from "react";
import classNames from "classnames";
import MenuList from "./menu-list.jsx";

const MenuClass = React.createClass({
  displayName: "Menu",

  propTypes: {
    menuData: React.PropTypes.array,
    className: React.PropTypes.string
  },

  getInitialState() {
    return {
      isOpen: false
    };
  },

  toggleMenu() {
    const isMenuOpen =  this.state.isOpen;
    this.setState({
      isOpen: !isMenuOpen
    });
  },

  renderMenuButton() {
    return (
      <button type="button" className="navbar-toggle" onClick={this.toggleMenu}>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
    );
  },

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
});

export default MenuClass;
