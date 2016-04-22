import React from "react";
import classNames from "classnames";
import ImageCheckbox from "./utils/image-checkbox.jsx";
import * as footerData from "./utils/footer-data.js"

const FooterClass = React.createClass({
  displayName: "Footer",

  propTypes: {
    show: React.PropTypes.bool,
    className: React.PropTypes.string
  },

  renderFooterTab(footerDataItem, index) {
    return (
      <div className="col-xs-4 footer-item" key={index}>
        <ImageCheckbox
          label={footerDataItem.label}
          iconClass={footerDataItem.iconClass}/>
      </div>
    );
  },

  render() {
    const { show } = this.props;
    const data = footerData.footerTabs;
    const footerTabs = data.map(this.renderFooterTab);

    return show ? (
      <div className="container-fluid footer">
        <div className="row footer-row">
          {footerTabs} 
        </div>
      </div>
    ) : null;
  }
});

export default FooterClass;
