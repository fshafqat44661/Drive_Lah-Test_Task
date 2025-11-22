import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slices/formSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  try {
    const serializedState = JSON.stringify(state.form);
    localStorage.setItem("driveLahState", serializedState);
  } catch (e) {
    console.warn("Could not save state", e);
  }
});

export default store;
