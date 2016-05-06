import React from "react";
import classNames from "classnames";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";

const Body = (props) => {
  const { showHeader, showFooter, footerType, children } = props;

  const header = showHeader ? (
    <Header/>
  ) : <div/>;

  const footer = showFooter ? (
    <Footer footerType={footerType}/>
  ) : <div/>;

  return (
    <div>
      {header}
      <div className="content-wrapper">
        {children}
      </div>
      {footer}
    </div>
  );
};

export default Body;