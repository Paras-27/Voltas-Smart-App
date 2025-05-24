import React from "react";
import { FiEdit, FiLogOut, FiUser, FiCpu, FiMoon, FiSun, FiSettings, FiAlertCircle } from "react-icons/fi";
import { FaGoogle, FaAmazon } from "react-icons/fa";

export default function Profile() {
  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <div className="bg-blue-100 shadow-md rounded-xl p-5">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <FiUser className="text-blue-500 text-2xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Paras Upadhyay</h2>
            <p className="text-gray-500">Premium Member</p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Personal Information Section */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-700 flex items-center gap-2">
              <FiUser className="text-blue-500" />
              Personal Information
            </h3>
            <div className="pl-8 space-y-3">
              <div>
                <p className="text-gray-500 text-sm">Name</p>
                <p className="font-medium">Paras Upadhyay</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-medium">paras@example.com</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <p className="font-medium">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          {/* Settings from Image */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-700 flex items-center gap-2">
              <FiSettings className="text-blue-500" />
              AC Settings
            </h3>
            <div className="pl-8 space-y-3">
              <div className="space-y-1">
                <p className="text-gray-500 text-sm">Preferred Temp Range</p>
                <p className="font-medium">24°C</p>
              </div>

              <div className="space-y-1">
                <p className="text-gray-500 text-sm">AI Model Learning</p>
                <p className="font-medium text-green-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Active
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-gray-500 text-sm">Theme</p>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-600">
                    <FiSun />
                    Light
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                    <FiMoon />
                    Dark
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-gray-500 text-sm">Language</p>
                <p className="font-medium">English</p>
              </div>
            </div>
          </div>

          {/* Smart Features Section */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-700 flex items-center gap-2">
              <FiCpu className="text-blue-500" />
              Smart Features
            </h3>
            <div className="pl-8 space-y-3">
              <div>
                <p className="text-gray-500 text-sm">Smart Home Connect</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded">
                    <FaGoogle className="text-blue-500" />
                    Google Home
                  </span>
                  <span className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded">
                    <FaAmazon className="text-blue-500" />
                    Alexa
                  </span>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Geofencing</p>
                <p className="font-medium">Enabled (500m radius)</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Energy Saving</p>
                <p className="font-medium">Optimized (saved 12% last month)</p>
              </div>
            </div>
          </div>

          {/* Warning Messages */}
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 rounded-lg text-yellow-700 text-sm flex items-start gap-2">
              <FiAlertCircle className="mt-0.5 flex-shrink-0" />
              Changes may affect AI recommendations and energy efficiency.
            </div>
            <div className="p-3 bg-red-50 rounded-lg text-red-700 text-sm flex items-start gap-2">
              <FiAlertCircle className="mt-0.5 flex-shrink-0" />
              Filter needs cleaning! <a href="/pred1" className="font-medium underline ml-1">Details</a>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 mb-14 flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
            <FiEdit />
            Edit Profile
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors">
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}