import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDevice, toggleDeviceOwn } from "../../store/slices/formSlice";
import DeviceBlock from "../../components/DeviceBlock/DeviceBlock";
import "./DeviceManagement.scss";

const DeviceManagement = () => {
  const dispatch = useDispatch();
  const { devices } = useSelector((state) => state.form);

  const handleSerialChange = (deviceId, value) => {
    dispatch(updateDevice({ deviceId, field: "serial", value }));
  };

  const handleToggle = (deviceId) => {
    dispatch(toggleDeviceOwn(deviceId));
  };

  return (
    <div className="device-page-container">
      <div className="page-header">
        <h2>Device management</h2>
        <p>
          Add details of the device, if any already installed on your car. If
          none, then continue to next step.
        </p>
      </div>

      <div className="scrollable-content">
        <DeviceBlock
          label="Device 1"
          deviceId="device1"
          image={devices.device1.image}
          typeValue={devices.device1.type}
          serialValue={devices.device1.serial}
          isOwn={devices.device1.isOwn}
          onToggle={() => handleToggle("device1")}
          onSerialChange={(e) => handleSerialChange("device1", e.target.value)}
        />

        <DeviceBlock
          label="Device 2"
          deviceId="device2"
          image={devices.device2.image}
          typeValue={devices.device2.type}
          serialValue={devices.device2.serial}
          isOwn={devices.device2.isOwn}
          onToggle={() => handleToggle("device2")}
          onSerialChange={(e) => handleSerialChange("device2", e.target.value)}
        />

        <DeviceBlock
          label="Device 3"
          deviceId="device3"
          image={devices.device3.image}
          typeValue={devices.device3.type}
          serialValue={devices.device3.serial}
          isOwn={devices.device3.isOwn}
          onToggle={() => handleToggle("device3")}
          onSerialChange={(e) => handleSerialChange("device3", e.target.value)}
        />

        <DeviceBlock
          label="Device 4"
          deviceId="device4"
          image={devices.device4.image}
          typeValue={devices.device4.type}
          serialValue={devices.device4.serial}
          isOwn={devices.device4.isOwn}
          onToggle={() => handleToggle("device4")}
          onSerialChange={(e) => handleSerialChange("device4", e.target.value)}
        />
      </div>
    </div>
  );
};

export default DeviceManagement;
