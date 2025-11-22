import React from "react";
import "./AddOnCard.scss";

const AddOnCard = ({ label, isSelected, onToggle, isComingSoon = false }) => {
  return (
    <div
      className={`addon-card ${isSelected ? "selected" : ""}`}
      onClick={onToggle}
    >
      
      {isComingSoon && <span className="tag-coming-soon">Coming soon</span>}

      <div className="addon-content">
        <span className="addon-label">{label}</span>
      </div>

      <div className="selection-circle"></div>
    </div>
  );
};

export default AddOnCard;
