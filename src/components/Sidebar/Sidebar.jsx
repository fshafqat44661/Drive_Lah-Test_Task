import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStep } from "../../store/slices/formSlice";
import { FaCheck } from "react-icons/fa";
import "./Sidebar.scss";

const sidebarItems = [
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
  { id: "easy_access", label: "Easy Access", stepIndex: 3 },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.form.step);

  return (
    <aside className="sidebar">
      {sidebarItems.map((item, index) => {
        const isActive = item.stepIndex === currentStep;

        const isCompleted =
          index < 8 || (item.stepIndex && item.stepIndex < currentStep);

        let className = "menu-item";
        if (isActive) className += " active";
        if (isCompleted) className += " completed";

        return (
          <div
            key={item.id}
            className={className}
            onClick={() => item.stepIndex && dispatch(setStep(item.stepIndex))}
          >
            <span className="label">{item.label}</span>

            <div className="tick-wrapper">
              <FaCheck />
            </div>
          </div>
        );
      })}
    </aside>
  );
}
