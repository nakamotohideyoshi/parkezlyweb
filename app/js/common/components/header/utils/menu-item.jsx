import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from 'react-redux';
import { setCurrentMenu } from "../header.js"

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.changeMenu = this.changeMenu.bind(this);
  }

  changeMenu(evt) {
    evt.preventDefault();
    const { dispatch, subMenu } = this.props;
    console.log(subMenu);
    dispatch(setCurrentMenu(subMenu));
  }

  renderLink() {
    const { text, link } = this.props;
    return (
      <Link to={link}>{text}</Link>
    );
  }

  renderSubMenuParent() {
    const { text } = this.props;
    return (
      <a href="javascript:void(0)" onClick={this.changeMenu}>
        {text}
      </a>
    );
  }

  render() {
    const { subMenu, className } = this.props;
    console.log(subMenu);
    const link = subMenu ? this.renderSubMenuParent() : this.renderLink();
    return (
      <div className="row">
        <li className={className}>
          {link}
        </li>
      </div>
    );
  }
}
MenuItem.PropTypes = {
  text: PropTypes.string,
  link: PropTypes.string,
  subMenu: PropTypes.string,
  className: PropTypes.string
};

export default connect()(MenuItem);