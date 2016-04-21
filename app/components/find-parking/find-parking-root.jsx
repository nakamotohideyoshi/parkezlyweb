import React from "react";
import ParkingOptions from "./parking-options.jsx";

const FindParkingClass = React.createClass({
  displayName: "FindParking",

  propTypes: {
    
  },

  getDefaultProps() {
    return {

    };
  },

  render() {

    return (
      <div className="app-page">
          <ParkingOptions/>
      </div>
    );
  }
});

export default FindParkingClass;