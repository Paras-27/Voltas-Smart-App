import React from "react";
import AChealth from "./header";

export default function Achealthsuccess() {
  return (
      <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-md p-5 transition-all ease-in-out duration-300">
        <AChealth />
      <div className="flex justify-between items-center font-semibold text-lg">
        <div>❄️ AC Health Monitor</div>
        <div className="flex gap-2">
          <span
            className="shadow p-1 rounded-full bg-white cursor-pointer hover:scale-110 transition"
            title="Settings"
          >
            ⚙️
          </span>
          <span
            className="shadow p-1 rounded-full bg-white cursor-pointer hover:scale-110 transition"
            title="Notifications"
          >
            🔔
          </span>
        </div>
      </div>

      <div className="mt-5 text-xs text-gray-500">
        System Overview <span className="float-right">Last Updated: 5 min ago</span>
      </div>

      <div className="flex justify-between items-center bg-gray-100 p-2 px-3 rounded-lg mt-2 text-sm cursor-pointer">
        <span>🌀 AC Unit-3</span>
        <span>Change</span>
      </div>

      <div className="font-semibold text-base mt-5 mb-2">
        System Health <span className="inline-block bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs font-medium ml-2">✅ Healthy</span>
      </div>

      <div className="bg-green-300 rounded-xl p-4 mt-1 hover:shadow-lg transition-shadow">
        <h3 className="text-black-600 font-bold text-sm">💓 No Fault Detected</h3>
        <p className="text-sm text-gray-800 mt-1">System is operating optimally</p>
        <div className="flex justify-between text-sm font-medium mt-2 gap-2">
          <div className="bg-white rounded-lg p-2 flex-1 text-center shadow-sm">
            <div title="AI confidence level">Confidence</div>
            <div className="text-lg font-bold">99%</div>
          </div>
          <div className="bg-white rounded-lg p-2 flex-1 text-center shadow-sm">
            <div>Severity</div>
            <div className="text-green-600 font-bold">None</div>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-3">🕒 Last prediction: Today, 12:30 PM</div>
      </div>

      <div className="flex justify-between flex-wrap gap-2 mt-5">
        <button
          className="flex-1 bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold text-sm min-w-[100px] hover:scale-105 transition"
          title="Open logs"
        >
          📄 View Logs
        </button>
        <button
          className="flex-1 bg-yellow-400 text-white rounded-lg px-4 py-2 font-semibold text-sm min-w-[100px] hover:scale-105 transition"
          title="Request maintenance"
        >
          🛠️ Request Maintenance
        </button>
        <button
          className="flex-1 bg-gray-200 text-gray-700 rounded-lg px-4 py-2 font-semibold text-sm min-w-[100px] hover:scale-105 transition"
          title="Refresh system status"
        >
          🔄 Refresh Status
        </button>
      </div>

      <div className="font-semibold text-base mt-6 mb-2">Recent Activity</div>
      <div className="bg-gray-50 rounded-xl p-4 mb-14">
        <div className="text-sm mb-3">
          ✅ Maintenance Completed
          <span className="block text-xs text-gray-500">Refrigerant Refill • Yesterday</span>
        </div>
        <div className="text-sm mb-3">
          🌡️ Temperature Anomaly Detected
          <span className="block text-xs text-gray-500">Coil Temperature • 2 days ago</span>
        </div>
        <div className="text-sm">
          📅 Scheduled Maintenance
          <span className="block text-xs text-gray-500">Filter Change • 1 week ago</span>
        </div>
      </div>

      
    </div>
  );
}
