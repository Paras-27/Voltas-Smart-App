import React, { useState, useEffect } from "react";
import { FaFan, FaSnowflake, FaFire, FaRegClock, FaMinus, FaPlus, FaPowerOff, FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Slider } from "./ai/slider";
import { Button } from "./ai/button";

export default function ACControl() {
  const [temperature, setTemperature] = useState(24);
  const [activeMode, setActiveMode] = useState("Fan");
  const [isOn, setIsOn] = useState(true);
  const [animation, setAnimation] = useState("");
  const [showAirflowControls, setShowAirflowControls] = useState(false);
  const [upDownSwing, setUpDownSwing] = useState(false);
  const [leftRightSwing, setLeftRightSwing] = useState(false);
  const [sliderValue, setSliderValue] = useState(24); // Separate state for smooth slider movement

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
  };

  const toggleLeftRightSwing = () => {
    setLeftRightSwing(!leftRightSwing);
  };

  useEffect(() => {
    if (activeMode) {
      setAnimation("mode-change");
      setTimeout(() => setAnimation(""), 800);
    }
  }, [activeMode]);

  // Calculate circle progress based on temperature (16-30°C range)
  const progress = ((sliderValue - 16) / (30 - 16)) * 100;

  const modes = [
    { name: "timer", icon: <FaRegClock /> },
    { name: "Fan", icon: <FaFan /> },
    { name: "Cool", icon: <FaSnowflake /> },
    { name: "Heat", icon: <FaFire /> },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-blue-100">
      {/* AC Image Section */}
      <div className="w-full max-w-md flex flex-col items-center mb-6 pb-[1.5rem] border-b border-gray-200">
        <div className={`transition-all duration-500 ${isOn ? "opacity-100" : "opacity-50"}`}>
          <div className="relative">
            <img 
              src="/img/ac.png" 
              alt="AC Unit" 
              className="w-[19rem] h-24 object-contain"
            />
            <div className={`absolute top-0 right-0 w-4 h-4 rounded-full ${
              isOn ? "bg-green-500 animate-pulse" : "bg-gray-400"
            }`}></div>
          </div>
        </div>
      </div>

      {/* Main Controls Section - Centered */}
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Temperature Ring - Now properly synced with slider */}
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

        {/* Temperature Controls */}
        <div className={`flex items-center gap-4 my-6 w-full transition-opacity ${
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

        {/* Power Button */}
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

        {/* Airflow Controls */}
        {showAirflowControls && (
          <div className={`w-full mb-6 p-4 bg-white rounded-xl shadow-md transition-all duration-300 ${
            !isOn ? "opacity-50 pointer-events-none" : ""
          }`}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={toggleUpDownSwing}
                    disabled={!isOn}
                    className={`p-3 rounded-full transition-all ${
                      upDownSwing ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <FaArrowUp />
                  </button>
                  <button 
                    onClick={toggleUpDownSwing}
                    disabled={!isOn}
                    className={`p-3 rounded-full transition-all ${
                      upDownSwing ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <FaArrowDown />
                  </button>
                </div>
                <span className="text-sm text-gray-600">Up/Down Swing</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={toggleLeftRightSwing}
                    disabled={!isOn}
                    className={`p-3 rounded-full transition-all ${
                      leftRightSwing ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <FaArrowLeft />
                  </button>
                  <button 
                    onClick={toggleLeftRightSwing}
                    disabled={!isOn}
                    className={`p-3 rounded-full transition-all ${
                      leftRightSwing ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <FaArrowRight />
                  </button>
                </div>
                <span className="text-sm text-gray-600">Left/Right Swing</span>
              </div>
              
              <Button 
                onClick={toggleAirflowControls}
                className="mt-2 bg-gray-500 text-white hover:bg-gray-200 transition-colors"
              >
                Close
              </Button>
            </div>
          </div>
        )}

        {/* Mode Buttons */}
        <div className={`grid grid-cols-5 gap-4 w-full transition-opacity mb-14 ${
          !isOn ? "opacity-50 pointer-events-none" : ""
        }`}>
          {modes.map((mode) => (
            <button
              key={mode.name}
              onClick={() => setActiveMode(mode.name)}
              disabled={!isOn}
              className={`flex flex-col items-center p-3 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg ${
                activeMode === mode.name 
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg" 
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } ${
                animation === "mode-change" && activeMode === mode.name 
                  ? "scale-105 ring-2 ring-blue-300" 
                  : ""
              }`}
            >
              <span className={`text-lg ${
                activeMode === mode.name ? "text-white" : "text-blue-500"
              }`}>
                {mode.icon}
              </span>
              <span className="text-sm mt-1 capitalize">{mode.name}</span>
            </button>
          ))}
          
          {/* Airflow Button */}
          <button
            onClick={toggleAirflowControls}
            disabled={!isOn}
            className={`flex flex-col items-center p-3 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg ${
              showAirflowControls 
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg" 
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className={`text-lg ${
              showAirflowControls ? "text-white" : "text-blue-500"
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            <span className="text-sm mt-1 capitalize">Airflow</span>
          </button>
        </div>
      </div>
    </div>
  );
}