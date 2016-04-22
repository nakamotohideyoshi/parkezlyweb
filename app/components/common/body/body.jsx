import React from "react";
import classNames from "classnames";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";

const Body = ({showHeader, showFooter, children}) => {
  return (
    <div>
      <Header show={showHeader}/>
      <div className="container-fluid">
        {children}
      </div>
      <Footer show={showFooter}/>
    </div>
  );
};

export default Body;