import React, { useState, useEffect } from "react";
import { 
  FaFan, 
  FaSnowflake, 
  FaFire, 
  FaRegClock, 
  FaMinus, 
  FaPlus, 
  FaPowerOff, 
  FaArrowUp, 
  FaArrowDown, 
  FaArrowLeft, 
  FaArrowRight,
  FaMoon,
  FaLeaf,
  FaLightbulb,
  FaBolt
} from "react-icons/fa";
import { IoIosSync, IoIosTimer } from "react-icons/io";
import { FaArrowsUpDown, FaArrowsLeftRight, FaWifi } from "react-icons/fa6";
import { Slider } from "./ai/slider"; // Assuming these are correctly imported
import { Button } from "./ai/button"; // Assuming these are correctly imported


// A generic button component for reusability and cleaner code
const ControlButton = ({ icon, text, onClick, isActive, isDisabled = false }) => {
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
  // YOUR ORIGINAL STATE
  const [temperature, setTemperature] = useState(24);
  const [activeMode, setActiveMode] = useState("Cool");
  const [isOn, setIsOn] = useState(true);
  const [animation, setAnimation] = useState("");
  const [showAirflowControls, setShowAirflowControls] = useState(false);
  const [upDownSwing, setUpDownSwing] = useState(false);
  const [leftRightSwing, setLeftRightSwing] = useState(false);
  const [sliderValue, setSliderValue] = useState(24);
  
  // NEW STATE FROM THE EXPANDED DESIGN
  const [fanSpeed, setFanSpeed] = useState("Auto");
  const [isVswing, setIsVswing] = useState(false);
  const [isHswing, setIsHswing] = useState(false);
  const [isSleepMode, setIsSleepMode] = useState(false);
  const [isSaverMode, setIsSaverMode] = useState(false);
  const [isLampOn, setIsLampOn] = useState(false);
  const [isTurboMode, setIsTurboMode] = useState(false);
  const [timerOn, setTimerOn] = useState(null);
  const [timerOff, setTimerOff] = useState(null);

  // Sync temperature with slider value
  useEffect(() => {
    const timer = setTimeout(() => {
      setTemperature(sliderValue);
    }, 100);
    return () => clearTimeout(timer);
  }, [sliderValue]);

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const increaseTemp = () => {
    if (sliderValue < 30 && isOn) {
      const newValue = sliderValue + 1;
      setSliderValue(newValue);
      setTemperature(newValue);
    }
  };

  const decreaseTemp = () => {
    if (sliderValue > 16 && isOn) {
      const newValue = sliderValue - 1;
      setSliderValue(newValue);
      setTemperature(newValue);
    }
  };

  const handlePowerToggle = () => {
    setIsOn(!isOn);
    setAnimation(isOn ? "power-off" : "power-on");
    setTimeout(() => setAnimation(""), 1000);
  };

  const toggleAirflowControls = () => {
    setShowAirflowControls(!showAirflowControls);
  };

  const toggleUpDownSwing = () => {
    setUpDownSwing(!upDownSwing);
    // Also update the isVswing state for the new button
    setIsVswing(!isVswing);
  };

  const toggleLeftRightSwing = () => {
    setLeftRightSwing(!leftRightSwing);
    // Also update the isHswing state for the new button
    setIsHswing(!isHswing);
  };

  // Expanded functionality handlers
  const toggleVswing = () => setIsVswing(!isVswing);
  const toggleHswing = () => setIsHswing(!isHswing);
  const toggleSleepMode = () => setIsSleepMode(!isSleepMode);
  const toggleSaverMode = () => setIsSaverMode(!isSaverMode);
  const toggleLamp = () => setIsLampOn(!isLampOn);
  const toggleTurboMode = () => setIsTurboMode(!isTurboMode);
  
  const handleSetTimer = (type) => {
    const time = prompt(`Enter ${type} time (e.g., 2h 30m):`);
    if (time) {
      if (type === "ON") setTimerOn(time);
      if (type === "OFF") setTimerOff(time);
    }
  };

  const toggleFanSpeed = () => {
    if (!isOn) return;
    const speeds = ["Auto", "Low", "Medium", "High"];
    const currentIndex = speeds.indexOf(fanSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setFanSpeed(speeds[nextIndex]);
  };


  useEffect(() => {
    if (activeMode) {
      setAnimation("mode-change");
      setTimeout(() => setAnimation(""), 800);
    }
  }, [activeMode]);

  // Calculate circle progress based on temperature (16-30°C range)
  const progress = ((sliderValue - 16) / (30 - 16)) * 100;

  // Buttons data for the grid layout
  const allButtons = [
    { name: "V.SWING", icon: <FaArrowsUpDown />, action: toggleVswing, isActive: isVswing },
    { name: "SLEEP", icon: <FaMoon />, action: toggleSleepMode, isActive: isSleepMode },
    { name: "H.SWING", icon: <FaArrowsLeftRight />, action: toggleHswing, isActive: isHswing },
    { name: "SAVER", icon: <FaLeaf />, action: toggleSaverMode, isActive: isSaverMode },
    { name: "LAMP", icon: <FaLightbulb />, action: toggleLamp, isActive: isLampOn },
    { name: "TURBO", icon: <FaBolt />, action: toggleTurboMode, isActive: isTurboMode },
    { name: "TIMER ON", icon: <FaRegClock />, action: () => handleSetTimer("ON"), isActive: !!timerOn },
    { name: "SET", icon: <IoIosTimer />, action: () => alert("Set function pressed!"), isActive: false },
    { name: "TIMER OFF", icon: <FaRegClock />, action: () => handleSetTimer("OFF"), isActive: !!timerOff },
    { name: "TEMP", icon: <FaMinus />, action: () => {}, isActive: false }, // Placeholder for Temp button
    { name: "WIFI/ADJ", icon: <FaWifi />, action: () => alert("Wi-Fi/Adjust pressed!"), isActive: false }, // Placeholder for Wi-Fi button
    { name: "MODE", icon: <IoIosSync />, action: () => {
        const modes = ["Cool", "Dry", "Fan", "Heat"];
        const currentIndex = modes.indexOf(activeMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        setActiveMode(modes[nextIndex]);
      }, isActive: false },
    { name: "FAN", icon: <FaFan />, action: toggleFanSpeed, isActive: false },
  ];

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-blue-100">
      <div className="w-full max-w-md mt-8 flex flex-col items-center">

        {/* AC Image Section (from your code) */}
        <div className="w-full max-w-md flex flex-col items-center mb-6 border-b border-gray-200">
          <div className={`transition-all duration-500 ${isOn ? "opacity-100" : "opacity-50"}`}>
            <div className="relative">
              <img 
                src="/img/ac.png" 
                alt="AC Unit" 
                className="w-[19rem] h-24 object-contain"
              />
              <div className="absolute bottom-[-1.5rem] left-1/2 top-1/4 -translate-x-1/2 text-lg text-black">
26°C
</div>
              <div className={`absolute top-0 right-0 w-4 h-4 rounded-full ${
                isOn ? "bg-green-500 animate-pulse" : "bg-gray-400"
              }`}></div>
            </div>
          </div>
        </div>

        {/* Temperature Ring (from your code) */}
        <div className={`relative w-48 h-48 flex items-center justify-center transition-all duration-300 ${
          !isOn ? "opacity-50" : ""
        }`}>
          <svg className="absolute w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
            <path
              className="stroke-current text-gray-200"
              strokeWidth="3"
              fill="none"
              strokeDasharray="100, 100"
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={`stroke-current ${isOn ? "text-blue-400" : "text-gray-300"}`}
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${progress}, 100`}
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="text-center">
            <div className={`text-4xl font-bold transition-all duration-300 ${
              !isOn ? "text-gray-400" : ""
            }`}>
              {temperature}°C
            </div>
            <div className="text-sm text-gray-500">Temperature</div>
          </div>
        </div>

        {/* Temperature Controls (from your code) */}
        <div className={`flex items-center gap-4 my-6 w-full max-w-xs transition-opacity ${
          !isOn ? "opacity-50" : ""
        }`}>
          <button 
            onClick={decreaseTemp} 
            disabled={!isOn}
            className="text-blue-500 text-2xl disabled:text-gray-400 hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <FaMinus />
          </button>
          <Slider
            value={sliderValue}
            min={16}
            max={30}
            step={1}
            disabled={!isOn}
            onValueChange={handleSliderChange}
            className="flex-1"
          />
          <button 
            onClick={increaseTemp} 
            disabled={!isOn}
            className="text-blue-500 text-2xl disabled:text-gray-400 hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <FaPlus />
          </button>
        </div>

        {/* Power Button (from your code) */}
        <Button 
          onClick={handlePowerToggle}
          className={`mb-6 transition-all duration-300 shadow-lg ${
            isOn 
              ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600" 
              : "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700"
          } text-white`}
        >
          <div className="flex items-center gap-2">
            <FaPowerOff className={`transition-transform duration-300 ${
              isOn ? "rotate-0" : "rotate-180"
            }`} />
            {isOn ? "TURN OFF" : "TURN ON"}
          </div>
        </Button>

        {/* Expanded Controls Section (from my code) */}
        <div className="w-full max-w-md flex flex-col items-center">
          
          {/* Main Controls row */}
          <div className={`grid grid-cols-3 gap-4 mb-6 w-full ${!isOn ? "opacity-50 pointer-events-none" : ""}`}>
            <ControlButton
              icon={<IoIosSync />}
              text="MODE"
              onClick={() => {
                const modes = ["Cool", "Dry", "Fan", "Heat"];
                const currentIndex = modes.indexOf(activeMode);
                const nextIndex = (currentIndex + 1) % modes.length;
                setActiveMode(modes[nextIndex]);
              }}
              isDisabled={!isOn}
              isActive={false}
            />
            <ControlButton icon={<FaFan />} text="FAN" onClick={toggleFanSpeed} isDisabled={!isOn} isActive={false} />
            <ControlButton
              icon={<FaArrowsUpDown />}
              text="V.SWING"
              onClick={toggleVswing}
              isDisabled={!isOn}
              isActive={isVswing}
            />
          </div>

          {/* All other buttons, arranged in a grid */}
          <div className={`grid grid-cols-3 gap-4 w-full ${!isOn ? "opacity-50 pointer-events-none" : ""}`}>
            {allButtons.filter(btn => ["SLEEP", "H.SWING", "SAVER", "LAMP", "TURBO", "TIMER ON", "SET", "TIMER OFF", "TEMP", "WIFI/ADJ"].includes(btn.name)).map((feature, index) => (
              <ControlButton
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
    </div>
  );
}