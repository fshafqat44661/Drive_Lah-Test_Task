import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  step: 1,
  plan: "good_mates",
  addOns: {
    gps: false,
    insurance: false,
  },
  cardDetails: {
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    cardImage: null,
  },

  devices: {
    device1: { type: "Primary GPS", isOwn: true, serial: "", image: null },
    device2: { type: "Secondary GPS", isOwn: true, serial: "", image: null },
    device3: { type: "Drive mate Go", isOwn: false, serial: "", image: null },
    device4: { type: "Lockbox", isOwn: false, serial: "", image: null },
  },
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("driveLahState");
    if (serializedState === null) return defaultState;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Error loading state from local storage", e);
    return defaultState;
  }
};

const formSlice = createSlice({
  name: "form",

  initialState: loadFromLocalStorage(),

  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },

    setPlan: (state, action) => {
      state.plan = action.payload;
    },
    toggleAddOn: (state, action) => {
      const key = action.payload;
      state.addOns[key] = !state.addOns[key];
    },
    updateCard: (state, action) => {
      state.cardDetails = { ...state.cardDetails, ...action.payload };

      try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("driveLahState", serializedState);
      } catch (e) {
        console.warn("Error saving state to local storage", e);
      }
    },
    updateCardImage: (state, action) => {
      state.cardDetails.cardImage = action.payload;
      try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("driveLahState", serializedState);
      } catch (e) {
        console.warn("Error saving card image to local storage", e);
      }
    },

    updateDevice: (state, action) => {
      const { deviceId, field, value } = action.payload;
      if (state.devices[deviceId]) {
        state.devices[deviceId][field] = value;
      }
    },
    toggleDeviceOwn: (state, action) => {
      const deviceId = action.payload;
      if (state.devices[deviceId]) {
        state.devices[deviceId].isOwn = !state.devices[deviceId].isOwn;
      }
    },
    updateDeviceImage: (state, action) => {
      const { deviceId, image } = action.payload;
      if (state.devices[deviceId]) {
        state.devices[deviceId].image = image;
      }
    },
  },
});

export const {
  setStep,
  setPlan,
  toggleAddOn,
  updateCard,
  updateCardImage,
  updateDevice,
  updateDeviceImage,
  toggleDeviceOwn,
} = formSlice.actions;

export default formSlice.reducer;
