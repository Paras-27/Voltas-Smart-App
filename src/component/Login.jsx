import React, { useState, useEffect } from "react";
import {
  FaFan,
  FaSnowflake,
  FaSun,
  FaMinus,
  FaPlus,
  FaPowerOff,
  FaRegClock,
  FaMoon,
  FaLeaf,
  FaLightbulb,
  FaBolt,
} from "react-icons/fa";
import { IoIosTimer, IoIosSync } from "react-icons/io";
import { FaWifi, FaArrowsUpDown, FaArrowsLeftRight } from "react-icons/fa6";

// Note: Ensure you have `react-icons/fa6` and `react-icons/io5` installed
// npm install react-icons

const Button = ({ icon, text, onClick, isActive, isDisabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`flex flex-col items-center justify-center p-3 rounded-xl shadow-md transition-all duration-300
        ${
          isActive
            ? "bg-blue-500 text-white shadow-lg scale-105"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }
        ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      <div
        className={`text-2xl ${isActive ? "text-white" : "text-gray-600"}`}
      >
        {icon}
      </div>
      <span className="text-sm mt-1 capitalize">{text}</span>
    </button>
  );
};

export default function ACControl() {
  const [temperature, setTemperature] = useState(28);
  const [activeMode, setActiveMode] = useState("Cool");
  const [fanSpeed, setFanSpeed] = useState("Auto");
  const [isOn, setIsOn] = useState(true);
  const [isVswing, setIsVswing] = useState(false);
  const [isHswing, setIsHswing] = useState(false);
  const [isSleepMode, setIsSleepMode] = useState(false);
  const [isSaverMode, setIsSaverMode] = useState(false);
  const [isLampOn, setIsLampOn] = useState(false);
  const [isTurboMode, setIsTurboMode] = useState(false);
  const [timerOn, setTimerOn] = useState(null);
  const [timerOff, setTimerOff] = useState(null);

  // Power toggle function
  const handlePowerToggle = () => {
    setIsOn(!isOn);
  };

  // Temperature controls
  const increaseTemp = () => {
    if (isOn && temperature < 30) {
      setTemperature(temperature + 1);
    }
  };

  const decreaseTemp = () => {
    if (isOn && temperature > 16) {
      setTemperature(temperature - 1);
    }
  };

  // Other control functions
  const toggleVswing = () => setIsVswing(!isVswing);
  const toggleHswing = () => setIsHswing(!isHswing);
  const toggleSleepMode = () => setIsSleepMode(!isSleepMode);
  const toggleSaverMode = () => setIsSaverMode(!isSaverMode);
  const toggleLamp = () => setIsLampOn(!isLampOn);
  const toggleTurboMode = () => setIsTurboMode(!isTurboMode);

  const toggleFanSpeed = () => {
    if (!isOn) return;
    const speeds = ["Auto", "Low", "Medium", "High"];
    const currentIndex = speeds.indexOf(fanSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setFanSpeed(speeds[nextIndex]);
  };

  // Logic to set a timer
  const handleSetTimer = (type) => {
    const time = prompt(`Enter ${type} time (e.g., 2h 30m):`);
    // Basic validation, in a real app this would be a date/time picker
    if (time) {
      if (type === "ON") setTimerOn(time);
      if (type === "OFF") setTimerOff(time);
    }
  };

  // The 'modes' array is used to render the mode buttons dynamically
  const modes = [
    { name: "cool", icon: <FaSnowflake /> },
    { name: "dry", icon: <IoIosSync /> }, // Using IoIosSync for Dry
    { name: "fan", icon: <FaFan /> },
    { name: "heat", icon: <FaSun /> },
  ];

  // The 'advancedFeatures' array for the lower grid of buttons
  const advancedFeatures = [
    { name: "V.SWING", icon: <FaArrowsUpDown />, action: toggleVswing, isActive: isVswing },
    { name: "SLEEP", icon: <FaMoon />, action: toggleSleepMode, isActive: isSleepMode },
    { name: "H.SWING", icon: <FaArrowsLeftRight />, action: toggleHswing, isActive: isHswing },
    { name: "SAVER", icon: <FaLeaf />, action: toggleSaverMode, isActive: isSaverMode },
    { name: "LAMP", icon: <FaLightbulb />, action: toggleLamp, isActive: isLampOn },
    { name: "TURBO", icon: <FaBolt />, action: toggleTurboMode, isActive: isTurboMode },
    { name: "TIMER ON", icon: <FaRegClock />, action: () => handleSetTimer("ON"), isActive: !!timerOn },
    { name: "SET", icon: <IoIosTimer />, action: () => alert("Set function pressed!"), isActive: false },
    { name: "TIMER OFF", icon: <FaRegClock />, action: () => handleSetTimer("OFF"), isActive: !!timerOff },
    { name: "TEMP", icon: <FaMinus />, action: () => {}, isActive: false }, // Temp button on remote cycles between F/C or other settings
    { name: "WIFI/ADJ", icon: <FaWifi />, action: () => alert("Wi-Fi/Adjust pressed!"), isActive: false },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-blue-50 text-gray-800 font-sans">
      <div
        className={`w-full max-w-md bg-white rounded-3xl shadow-xl p-6 transition-all duration-500
        ${!isOn ? "opacity-70" : "opacity-100"}`}
      >
        {/* Remote Display Section */}
        <div className="bg-gray-800 text-white rounded-xl p-4 mb-6 shadow-inner relative overflow-hidden">
          {/* A more accurate temperature display as per the remote */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-2xl font-bold flex-1">{isOn ? temperature : "--"}°C</span>
            <div className="flex items-center space-x-2">
              {/* Fan Speed Indicator */}
              <div className="flex flex-col items-center">
                <span className="text-xs">{fanSpeed}</span>
                <FaFan className="text-xl" />
              </div>
              {/* Other indicators like Wi-Fi */}
              <FaWifi className="text-xl" />
            </div>
          </div>
          <div className="text-xs text-gray-400">SET TEMP</div>
        </div>

        {/* Temperature Controls */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            icon={<FaMinus />}
            text="-"
            onClick={decreaseTemp}
            isDisabled={!isOn}
            isActive={false}
          />
          <Button
            icon={<FaPlus />}
            text="+"
            onClick={increaseTemp}
            isDisabled={!isOn}
            isActive={false}
          />
        </div>

        {/* Main Control Buttons */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Button
            icon={<IoIosSync />} // Using this for MODE, as per the remote's function
            text="MODE"
            onClick={() => {
              const currentModeIndex = modes.findIndex(m => m.name === activeMode.toLowerCase());
              const nextModeIndex = (currentModeIndex + 1) % modes.length;
              setActiveMode(modes[nextModeIndex].name);
            }}
            isDisabled={!isOn}
            isActive={false}
          />
          <Button
            icon={<FaPowerOff />}
            text="POWER"
            onClick={handlePowerToggle}
            isActive={isOn}
          />
          <Button
            icon={<FaFan />}
            text="FAN"
            onClick={toggleFanSpeed}
            isDisabled={!isOn}
            isActive={false}
          />
        </div>

        {/* All other buttons, arranged in a grid */}
        <div className="grid grid-cols-3 gap-4">
          {advancedFeatures.map((feature, index) => (
            <Button
              key={index}
              icon={feature.icon}
              text={feature.name}
              onClick={feature.action}
              isDisabled={!isOn}
              isActive={feature.isActive}
            />
          ))}
        </div>
      </div>
    </div>
  );
}