import React from "react";

const BackButton = ({className, url}) => {
  return (
    <div className={className}>
      <a href={url} className="back-button">
      </a>
    </div>
  );
};

export default BackButton;