import React from "react";

const MenuItem = ({text, link, className}) => {
  return (
    <li className={className}>
      <a href={link}>{text}</a>
    </li>
  );
};

export default MenuItem;