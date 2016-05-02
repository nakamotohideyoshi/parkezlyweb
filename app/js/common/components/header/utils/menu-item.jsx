import React from "react";
import { Link } from 'react-router'

const MenuItem = ({text, link, className}) => {
  return (
    <div className="row">
      <li className={className}>
        <Link to={link}>{text}</Link>
      </li>
    </div>
  );
};

export default MenuItem;