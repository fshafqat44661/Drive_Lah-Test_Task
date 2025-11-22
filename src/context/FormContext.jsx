import { createContext, useState, useEffect, useContext } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const initialState = {
    step: 1,
    plan: "good_mates",
    addOns: {
      gps: false,
      insurance: false,
    },
    devices: {
      device1: { type: "Primary GPS", isOwn: true, serial: "", image: null },
      device2: { type: "Secondary GPS", isOwn: true, serial: "", image: null },
      device3: { type: "Drive mate Go", isOwn: false, serial: "", image: null },
    },
  };

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("driveLahData");
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("driveLahData", JSON.stringify(formData));
  }, [formData]);

  const updateField = (path, value) => {
    setFormData((prev) => {
      const newData = { ...prev };
      if (path.includes(".")) {
        const [parent, child] = path.split(".");

        if (parent === "devices") {
          const [_, deviceKey, prop] = path.split(".");
          newData.devices[deviceKey][prop] = value;
        } else {
          newData[parent][child] = value;
        }
      } else {
        newData[path] = value;
      }
      return newData;
    });
  };

  return (
    <FormContext.Provider value={{ formData, setFormData, updateField }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
