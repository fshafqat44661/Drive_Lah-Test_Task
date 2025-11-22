import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateDeviceImage } from "../../store/slices/formSlice";
import ToggleSwitch from "../ToogleSwitch/ToggleSwitch";
import { FaCamera, FaCheck } from "react-icons/fa";
import "./DeviceBlock.scss";

const DeviceBlock = ({
  label,
  typeValue,
  serialValue,
  isOwn,
  onToggle,
  onSerialChange,
  deviceId,
  image, 
  onImageUpload,
}) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
       
        dispatch(
          updateDeviceImage({
            deviceId,
            image: imageDataUrl,
          })
        );

        
        if (onImageUpload) {
          onImageUpload(deviceId, imageDataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="device-block">
      <div className="block-header">
        <h4>{label}</h4>
      </div>

      <div className="block-grid">
        <div className="left-col">
          <div>
            <label>Device type</label>
            <input
              type="text"
              value={typeValue}
              readOnly
              className="disabled"
            />
          </div>
          <div>
            <label>Serial number</label>
            <input
              type="text"
              placeholder="Enter the serial number"
              value={serialValue}
              onChange={onSerialChange}
              disabled={!isOwn}
              className={!isOwn ? "disabled" : ""}
            />
          </div>
        </div>

        
        <div className="right-col">
          <div className="toggle-row">
            <label>Bringing your own device?</label>
            <ToggleSwitch isOn={isOwn} handleToggle={onToggle} />
          </div>

          <p className="help-text">
            Toggle this on if you're bringing your own device. Leave it off if
            Drive mate is to provide the device.
          </p>

          
          {isOwn && (
            <div className="upload-container">
              <label>Upload an image of the device</label>
              <div
                className="upload-box"
                onClick={() => fileInputRef.current.click()}
              >
                {image ? (
                  <div className="image-preview">
                    <img src={image} alt="Device preview" />
                    <div className="change-overlay">
                      <FaCamera /> Change Image
                    </div>
                  </div>
                ) : (
                  <span>Click to upload</span>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceBlock;
