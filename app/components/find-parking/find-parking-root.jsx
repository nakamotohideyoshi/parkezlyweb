import React, { Component, PropTypes } from "react";
import Body from "../common/body/body.jsx"

class FindParking extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Body
        showHeader={true}
        showFooter={true}
        footerType="parking"/>
    );
  }
}

export default FindParking;
