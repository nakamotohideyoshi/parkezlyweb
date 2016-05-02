import React from "react";
import { Link } from 'react-router'

const MenuItem = ({text, link, className}) => {
  return (
    <li className={className}>
      <Link to={link}>{text}</Link>
    </li>
  );
};

export default MenuItem;