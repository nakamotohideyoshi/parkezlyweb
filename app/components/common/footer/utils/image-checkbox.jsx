import React from "react";
import classNames from "classnames";

const ImageCheckboxClass = React.createClass({
  displayName: "ImageCheckbox",

  propTypes: {
    iconClass: React.PropTypes.string,
    label: React.PropTypes.string,
    className: React.PropTypes.string
  },

  getInitialState() {
    return {
      checked: false
    };
  },

  toggleCheckIcon() {
    const currentState = this.state.checked;
    this.setState({
      checked: !currentState
    });
  },

  render() {
    const { iconClass, label, className } = this.props;
    const validClasses = classNames({
        "img-checkbox-checked": this.state.checked
      },
      className
    );
    const iconClasses = classNames({
        "img-checkbox-icon": true
      },
      iconClass
    );

    return (
      <div className={validClasses} onClick={this.toggleCheckIcon}>
        <div className={iconClasses}>
        </div>
        <div className="img-checkbox-label">
          {label}
        </div>
      </div>
    );
  }
});

export default ImageCheckboxClass;
