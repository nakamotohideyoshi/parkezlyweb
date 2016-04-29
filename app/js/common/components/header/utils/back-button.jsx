import React from "react";

const imgUrl = "./images/back-arrow.png";
const backBtnStyle = {
  backgroundImage: 'url(' + imgUrl + ')'
};
const BackButton = ({className, url}) => {
  return (
    <div className={className}>
      <a href={url} className="back-button" style={backBtnStyle}>
      </a>
    </div>
  );
};

export default BackButton;