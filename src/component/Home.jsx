// HomePage.jsx
import React, { useState } from "react";

const HomePage = () => {
  const [temperature, setTemperature] = useState(21); // default temperature

  const increaseTemp = () => {
    if (temperature < 30) {
      setTemperature(temperature + 1);
    } else {
      alert("Maximum temperature is 30°C");
    }
  };

  const decreaseTemp = () => {
    if (temperature > 16) {
      setTemperature(temperature - 1);
    } else {
      alert("Minimum temperature is 16°C");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between py-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-center">Air Conditioner</h1>

      {/* Main Temperature Display */}
      <div className="flex flex-col items-center mt-6">
        <div className="w-40 h-40 flex items-center justify-center rounded-full bg-gray-100 shadow-inner mb-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold">{temperature}°C</h2>
            <p className="text-gray-500">Temp</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4 mt-2">
          <button
            onClick={decreaseTemp}
            className="text-2xl bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 shadow"
          >
            -
          </button>

          <input
            type="range"
            min="16"
            max="30"
            value={temperature}
            onChange={(e) => setTemperature(parseInt(e.target.value))}
            className="w-52 accent-blue-500"
          />

          <button
            onClick={increaseTemp}
            className="text-2xl bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 shadow"
          >
            +
          </button>
        </div>
      </div>

      {/* Turn Off Button */}
      <button className="mt-8 bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all">
        TURN OFF
      </button>

      {/* Mode Buttons */}
      <div className="flex justify-around w-full mt-8 px-6">
        {["Timer", "Fan", "Cool", "Heat"].map((mode, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-gray-100 px-4 py-2 rounded-xl hover:bg-blue-100 cursor-pointer transition-all"
          >
            <div className="w-6 h-6 bg-blue-200 rounded-full mb-1" />
            <span className="text-sm">{mode}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
