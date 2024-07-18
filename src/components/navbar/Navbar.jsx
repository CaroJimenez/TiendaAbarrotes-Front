import React from "react";
import "./styles/index.css";
import "../../global/styles/index.css";

function Navbar(props) {
  const { name, options } = props;

  return (
    <div className="container">
      <div className="title">{name}</div>
    </div>
  );
}

export default Navbar;
