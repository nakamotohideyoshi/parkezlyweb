import React, { Component, PropTypes } from "react";
import classNames from "classnames";
import ImageCheckbox from "./utils/image-checkbox.jsx";
import * as footerData from "./utils/footer-data.js"

class Footer extends Component {

  constructor(props) {
    super(props);
  }

  renderFooterTab(footerDataItem, index) {
    return (
      <div className="col-xs-4 footer-item" key={index}>
        <ImageCheckbox
          label={footerDataItem.label}
          iconClass={footerDataItem.iconClass}/>
      </div>
    );
  }

  render() {
    const { show, footerType } = this.props;
    let data = {};

    if (footerType === "parking") {
      data = footerData.footerParking;
    } else if (footerType === "validity") {
      data = footerData.footerValidity;
    }
    const footerTabs = data.map(this.renderFooterTab);

    return show ? (
      <div className="container-fluid footer">
        <div className="row footer-row">
          {footerTabs} 
        </div>
      </div>
    ) : null;
  }
}

Footer.PropTypes = {
  show: PropTypes.bool,
  footerType: PropTypes.oneOf(['parking', 'validity']),
  className: PropTypes.string
};

export default Footer;
