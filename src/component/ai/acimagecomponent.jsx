import { useState, useEffect } from "react";
import { FaPowerOff } from "react-icons/fa";

const ACImage = ({ isOn }) => {
  return (
    <div className={`relative mb-4 transition-all duration-500 ${isOn ? "opacity-100" : "opacity-50"}`}>
      <img 
        src="/ac image.avif" // Replace with your AC image path
        alt="AC Unit"
        className="w-20 h-20 object-contain"
      />
      {/* Power indicator */}
      <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${isOn ? "bg-green-500" : "bg-gray-400"} transition-all duration-300`}>
        {isOn && (
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></div>
        )}
      </div>
    </div>
  );
};

export default ACImage;