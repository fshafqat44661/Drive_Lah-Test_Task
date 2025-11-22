import React from "react";
import "./ToggleSwitch.scss";

const ToggleSwitch = ({ isOn, handleToggle }) => {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isOn} onChange={handleToggle} />
      <span className="slider round"></span>
    </label>
  );
};

export default ToggleSwitch;
