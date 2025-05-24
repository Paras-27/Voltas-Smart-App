import React from "react";
import AChealth from "./header";
import { 
  Snowflake, 
  Settings, 
  Bell, 
  RefreshCw, 
  Wrench, 
  FileText, 
  AlertTriangle, 
  Clock, 
  AlertCircle,
  AlertOctagon
} from 'lucide-react';

export default function AChealthcritical() {
  return (
    <div className="max-w-md mx-auto bg-blue-100 rounded-xl shadow-sm border border-gray-100 p-6 font-inter text-gray-800">
      <AChealth />
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Snowflake className="w-5 h-5 text-blue-500" />
          <h1 className="font-semibold text-lg text-gray-800">AC Health Monitor</h1>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
            <Settings className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* System Info */}
      <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
        <span>System Overview</span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Last Updated: Just now
        </span>
      </div>

      {/* AC Unit Selector */}
      <div className="flex justify-between items-center bg-red-50 border border-red-100 p-3 rounded-lg mb-6 cursor-pointer hover:bg-red-100 transition">
        <div className="flex items-center gap-2">
          <Snowflake className="w-4 h-4 text-red-600" />
          <span className="text-sm font-medium">AC Unit-3</span>
        </div>
        <span className="text-xs text-red-600 font-medium">Change</span>
      </div>

      {/* Critical Alert */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-base text-gray-800">System Health</h2>
          <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
            <AlertOctagon className="w-3 h-3" /> Critical Risk
          </span>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h3 className="text-red-700 font-bold text-sm">Major Fault Detected</h3>
              <p className="text-xs text-gray-600 mt-1">Refrigerant Leak • Coils Overheating</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white rounded-lg p-3 text-center shadow-xs border border-red-100">
              <div className="text-xs text-gray-500 mb-1">Confidence</div>
              <div className="text-lg font-bold text-red-600">97%</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-xs border border-red-100">
              <div className="text-xs text-gray-500 mb-1">Severity</div>
              <div className="text-red-600 font-bold">High</div>
            </div>
          </div>

          <div className="bg-yellow-100 border border-yellow-200 px-3 py-2 rounded-md text-xs font-medium text-yellow-800 mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>ATTENTION NEEDED - Issue likely in 2–4 days</span>
          </div>

          <div className="text-red-700 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Immediate maintenance required to prevent breakdown
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-500 mt-3">
            <Clock className="w-3 h-3" />
            Last prediction: Today, 12:30 PM
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 text-orange-700 font-medium text-sm mb-3">
          <AlertCircle className="w-4 h-4" />
          Recommendations
        </div>
        <ul className="space-y-2 text-sm text-gray-700 pl-1">
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">•</span>
            Schedule immediate refrigerant leak inspection
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">•</span>
            Coolant coil cleaning recommended
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-0.5">•</span>
            Delay may result in system shutdown & high repair costs
          </li>
        </ul>
        <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          Contact support or request a technician visit immediately
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <button className="flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-2 font-medium text-xs transition">
          <FileText className="w-4 h-4" /> Logs
        </button>
        <button className="flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white rounded-lg px-3 py-2 font-medium text-xs transition">
          <Wrench className="w-4 h-4" /> Maintenance
        </button>
        <button className="flex items-center justify-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg px-3 py-2 font-medium text-xs transition">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>
    </div>
  );
}