import { useForm } from "../context/FormContext";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import "./Sidebar.scss";

const steps = [
  { id: "location", label: "Location" },
  { id: "about", label: "About" },
  { id: "features", label: "Features" },
  { id: "rules", label: "Rules" },
  { id: "pricing", label: "Pricing" },
  { id: "promotion", label: "Promotion" },
  { id: "pictures", label: "Pictures" },
  { id: "insurance", label: "Insurance" },
  { id: "subscription", label: "Subscription" },
  { id: "device", label: "Device" },
  { id: "easy_access", label: "Easy Access" },
];

export default function Sidebar() {
  const { formData, updateField } = useForm();

  const handleNav = (id) => {
    if (id === "subscription") updateField("step", 1);
    if (id === "device") updateField("step", 2);
  };

  return (
    <div className="sidebar">
      {steps.map((item, index) => {
        let isActive = false;
        let isCompleted = false;

        if (item.id === "subscription" && formData.step === 1) isActive = true;
        if (item.id === "device" && formData.step === 2) isActive = true;

        if (index < 8) isCompleted = true;
        if (item.id === "subscription" && formData.step > 1) isCompleted = true;

        return (
          <div
            key={item.id}
            className={`menu-item ${isActive ? "active" : ""}`}
            onClick={() => handleNav(item.id)}
          >
            <span className="icon">
              {isCompleted ? (
                <FaCheckCircle className="check" />
              ) : (
                <FaCircle className="dot" />
              )}
            </span>
            <span className="label">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
