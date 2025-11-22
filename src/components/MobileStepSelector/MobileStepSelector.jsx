import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStep } from "../../store/slices/formSlice";
import { FaChevronDown } from "react-icons/fa";
import "./MobileStepSelector.scss";

const stepsList = [
  { id: "location", label: "Location" },
  { id: "about", label: "About" },
  { id: "features", label: "Features" },
  { id: "rules", label: "Rules" },
  { id: "pricing", label: "Pricing" },
  { id: "promotion", label: "Promotion" },
  { id: "pictures", label: "Pictures" },
  { id: "insurance", label: "Insurance" },
  { id: "subscription", label: "Subscription", stepIndex: 1 },
  { id: "device", label: "Device", stepIndex: 2 },
  { id: "easy_access", label: "Easy Access" },
];

export default function MobileStepSelector() {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.form.step);
  const [isOpen, setIsOpen] = useState(false);

  const currentLabel =
    stepsList.find((s) => s.stepIndex === currentStep)?.label || "Subscription";

  const handleSelect = (item) => {
    if (item.stepIndex) {
      dispatch(setStep(item.stepIndex));
      setIsOpen(false);
    }
  };

  return (
    <div className="mobile-step-dropdown">
      <div className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span>{currentLabel}</span>
        <FaChevronDown className={`arrow ${isOpen ? "open" : ""}`} />
      </div>

      {isOpen && (
        <div className="dropdown-options">
          {stepsList.map((item) => (
            <div
              key={item.id}
              className={`option-item ${
                item.stepIndex === currentStep ? "active" : ""
              }`}
              onClick={() => handleSelect(item)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
