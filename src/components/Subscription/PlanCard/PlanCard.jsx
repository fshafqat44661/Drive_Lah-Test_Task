import React from "react";
import "./PlanCard.scss";

const PlanCard = ({ title, price, isSelected, onClick, features }) => {
  const showPeriod = price.toLowerCase() !== "free";

  return (
    <div
      className={`plan-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <h3 className="card-title">{title}</h3>

      <ul className="features-list">
        {features.map((feat, index) => (
          <li key={index}>
            <img src={feat.icon} alt="" />
            <span>{feat.text}</span>
          </li>
        ))}
      </ul>

      <div className="price-container">
        <span className="amount">{price}</span>
        {showPeriod && <span className="period">/month</span>}
      </div>
    </div>
  );
};

export default PlanCard;
