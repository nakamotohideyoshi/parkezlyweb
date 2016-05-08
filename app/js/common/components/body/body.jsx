import React from "react";
import classNames from "classnames";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";
import Spinner from "../spinner/spinner.jsx";

const Body = (props) => {
  const { showHeader, showFooter, footerType, children, loading } = props;

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
      <Spinner loading={loading}/>
    </div>
  );
};

export default Body;