import React, { useState, useEffect } from "react";
import { FaFan, FaSnowflake, FaFire, FaRegClock, FaMinus, FaPlus, FaPowerOff } from "react-icons/fa";
import { Slider } from "./ai/slider";
import { Button } from "./ai/button";

export default function ACControl() {
  const [temperature, setTemperature] = useState(21);
  const [activeMode, setActiveMode] = useState("Fan");
  const [isOn, setIsOn] = useState(true);
  const [animation, setAnimation] = useState("");

  const handleSliderChange = (value) => {
    setTemperature(value);
  };

  const increaseTemp = () => {
    if (temperature < 30 && isOn) {
      setTemperature((prev) => prev + 1);
    }
  };

  const decreaseTemp = () => {
    if (temperature > 16 && isOn) {
      setTemperature((prev) => prev - 1);
    }
  };

  const handlePowerToggle = () => {
    setIsOn(!isOn);
    setAnimation(isOn ? "power-off" : "power-on");
    setTimeout(() => setAnimation(""), 1000);
  };

  useEffect(() => {
    if (activeMode) {
      setAnimation("mode-change");
      setTimeout(() => setAnimation(""), 800);
    }
  }, [activeMode]);

  const modes = [
    { name: "timer", icon: <FaRegClock /> },
    { name: "Fan", icon: <FaFan /> },
    { name: "Cool", icon: <FaSnowflake /> },
    { name: "Heat", icon: <FaFire /> },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* AC Image Section */}
      <div className="w-full max-w-md flex flex-col items-center mb-6 pb-[4.5rem] border-b border-gray-200">
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
        {/* Temperature Ring */}
        <div className={`relative w-48 h-48 flex items-center justify-center transition-all duration-300 ${
          !isOn ? "opacity-50" : ""
        }`}>
          <svg className={`absolute w-full h-full rotate-[-90deg] transition-all duration-1000 ${
            animation === "power-on" ? "scale-105" : ""
          }`} viewBox="0 0 36 36">
            <path
              className={`stroke-current ${isOn ? "text-blue-400" : "text-gray-300"}`}
              strokeWidth="3"
              fill="none"
              strokeDasharray="100, 100"
              d={`M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831`}
            />
          </svg>
          <div className="text-center">
            <div className={`text-4xl font-bold transition-all duration-300 ${
              !isOn ? "text-gray-400" : ""
            }`}>
              {temperature}°C
            </div>
            <div className="text-sm text-gray-500">Temp</div>
          </div>
        </div>

        {/* Temperature Controls */}
        <div className={`flex items-center gap-4 my-6 w-full transition-opacity ${
          !isOn ? "opacity-50" : ""
        }`}>
          <button 
            onClick={decreaseTemp} 
            disabled={!isOn}
            className="text-blue-500 text-2xl disabled:text-gray-400"
          >
            <FaMinus />
          </button>
          <Slider
            value={temperature}
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
            className="text-blue-500 text-2xl disabled:text-gray-400"
          >
            <FaPlus />
          </button>
        </div>

        {/* Power Button */}
        <Button 
          onClick={handlePowerToggle}
          className={`mb-6 transition-all duration-300 ${
            isOn 
              ? "bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500" 
              : "bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600"
          } text-white`}
        >
          <div className="flex items-center gap-2">
            <FaPowerOff className={`transition-transform duration-300 ${
              isOn ? "rotate-0" : "rotate-180"
            }`} />
            {isOn ? "TURN OFF" : "TURN ON"}
          </div>
        </Button>

        {/* Mode Buttons */}
        <div className={`grid grid-cols-4 gap-4 w-full transition-opacity ${
          !isOn ? "opacity-50 pointer-events-none" : ""
        }`}>
          {modes.map((mode) => (
            <button
              key={mode.name}
              onClick={() => setActiveMode(mode.name)}
              disabled={!isOn}
              className={`flex flex-col items-center p-3 rounded-xl shadow-md transition-all duration-300 ${
                activeMode === mode.name 
                  ? "bg-gradient-to-r from-blue-400 to-cyan-400 text-white" 
                  : "bg-gray-100 text-gray-700"
              } ${
                animation === "mode-change" && activeMode === mode.name 
                  ? "scale-105 ring-2 ring-blue-300" 
                  : ""
              }`}
            >
              {mode.icon}
              <span className="text-sm mt-1 capitalize">{mode.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}