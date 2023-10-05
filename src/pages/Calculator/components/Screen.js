import React from "react";
// import { Textfit } from "react";
import "./Screen.css";

const Screen = ({ value }) => {
  return (
    <label className="screen" mode="single" max={70}>
      {value}
    </label>
  );
};

export default Screen;
