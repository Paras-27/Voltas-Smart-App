import React from "react";
import AChealth from "./header";
import { 
  Settings, 
  Bell, 
  Snowflake, 
  RefreshCw, 
  Wrench, 
  FileText, 
  CheckCircle, 
  HeartPulse, 
  AlertTriangle, 
  Clock, 
  Thermometer,
  Calendar
} from 'lucide-react';

export default function Achealthsuccess() {
  return (
    <div className="max-w-md mx-auto bg-blue-100 rounded-xl shadow-sm border border-gray-100 p-6 transition-all ease-in-out duration-300 hover:shadow-md">
      <AChealth />
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Snowflake className="w-5 h-5 text-blue-500" />
          <h1 className="font-semibold text-lg text-gray-800">AC Health Monitor</h1>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition hover:scale-105">
            <Settings className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition hover:scale-105">
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* System Info */}
      <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
        <span>System Overview</span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Last Updated: 5 min ago
        </span>
      </div>

      {/* AC Unit Selector */}
      <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg mb-6 cursor-pointer hover:bg-blue-100 transition">
        <div className="flex items-center gap-2">
          <Snowflake className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium">AC Unit-3</span>
        </div>
        <span className="text-xs text-blue-600 font-medium">Change</span>
      </div>

      {/* Health Status */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="font-semibold text-base text-gray-800">System Health</h2>
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3" /> Healthy
          </span>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-xl p-4 hover:shadow-sm transition-shadow">
          <div className="flex items-start gap-2">
            <HeartPulse className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="text-gray-800 font-bold text-sm">No Fault Detected</h3>
              <p className="text-xs text-gray-600 mt-1">System is operating optimally within normal parameters</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-white rounded-lg p-3 text-center shadow-xs border border-gray-100">
              <div className="text-xs text-gray-500 mb-1">Confidence</div>
              <div className="text-lg font-bold text-gray-800">99%</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-xs border border-gray-100">
              <div className="text-xs text-gray-500 mb-1">Severity</div>
              <div className="text-green-600 font-bold text-sm">None</div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-500 mt-3">
            <Clock className="w-3 h-3" />
            Last prediction: Today, 12:30 PM
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <button className="flex items-center justify-center gap-1 bg-blue-600 text-white rounded-lg px-3 py-2 font-medium text-xs hover:bg-blue-700 transition hover:scale-[1.02]">
          <FileText className="w-4 h-4" /> Logs
        </button>
        <button className="flex items-center justify-center gap-1 bg-amber-500 text-white rounded-lg px-3 py-2 font-medium text-xs hover:bg-amber-600 transition hover:scale-[1.02]">
          <Wrench className="w-4 h-4" /> Maintenance
        </button>
        <button className="flex items-center justify-center gap-1 bg-gray-200 text-gray-700 rounded-lg px-3 py-2 font-medium text-xs hover:bg-gray-300 transition hover:scale-[1.02]">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Recent Activity */}
      <div className="mb-14">
        <h2 className="font-semibold text-base text-gray-800 mb-3">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-800">Maintenance Completed</p>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <Wrench className="w-3 h-3" /> Refrigerant Refill • Yesterday
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-800">Temperature Anomaly</p>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <Thermometer className="w-3 h-3" /> Coil Temperature • 2 days ago
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <Calendar className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-800">Scheduled Maintenance</p>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <Wrench className="w-3 h-3" /> Filter Change • 1 week ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}