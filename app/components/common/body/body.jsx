import React from "react";
import classNames from "classnames";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";

const Body = (props) => {
  const { showHeader, showFooter, footerType, children } = props;
  return (
    <div>
      <Header show={showHeader}/>
      <div className="container-fluid">
        {children}
      </div>
      <Footer show={showFooter} footerType={footerType}/>
    </div>
  );
};

export default Body;