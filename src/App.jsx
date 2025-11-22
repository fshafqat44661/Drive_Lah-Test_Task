import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStep } from "./store/slices/formSlice";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Subscription from "./pages/SubscriptionPage";
import DeviceManagement from "./pages/DeviceManagement/DeviceManagement";
import MobileStepSelector from "./components/MobileStepSelector/MobileStepSelector"; // 👈 IMPORT THIS
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const step = useSelector((state) => state.form.step);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [step]);

  const handleNext = () => {
    if (step === 1) dispatch(setStep(2));
    else alert("Data Saved!");
  };

  return (
    <div className="app-layout">
      <Navbar />

      <div className="main-container">
        <Sidebar />

        <div className="content-wrapper">
          <div className="page-scroll-area" ref={scrollRef}>
            <div style={{ padding: "0 0 10px 0" }}>
              <MobileStepSelector />
            </div>

            {step === 1 && <Subscription />}
            {step === 2 && <DeviceManagement />}
          </div>

          <div className="sticky-footer">
            <button className="btn-next" onClick={handleNext}>
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
