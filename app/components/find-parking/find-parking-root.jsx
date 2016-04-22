import React from "react";
import Body from "../common/body/body.jsx"

const FindParkingClass = React.createClass({
  displayName: "FindParking",

  render() {

    return (
      <Body
        showHeader={true}
        showFooter={true}/>
    );
  }
});

export default FindParkingClass;
