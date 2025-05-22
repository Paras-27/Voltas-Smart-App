import React from "react";
import AChealth from "./header";

export default function AChealthcritical() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-5 font-inter text-gray-900">

        <AChealth />
      <div className="flex justify-between items-center font-semibold text-lg">
        <div>❄️ AC Health Monitor</div>
        <div className="flex gap-2">
          <span className="bg-white rounded-full p-1 shadow">⚙️</span>
          <span className="bg-white rounded-full p-1 shadow">🔔</span>
        </div>
      </div>

      <div className="text-xs text-gray-500 mt-5">
        System Overview <span className="float-right">Last Updated: Just now</span>
      </div>
      <div className="mt-2 px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm">
        🔄 AC Unit-3 <span className="float-right text-gray-500">Change</span>
      </div>

      <div className="font-semibold text-base mt-5 mb-2">
        System Health <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-medium float-right">🚨 Critical Risk</span>
      </div>
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-red-700 m-0">❤️ Major Fault Detected</h3>
        <p className="text-sm text-gray-600 mt-1 mb-3">Refrigerant Leak • Coils Overheating</p>
        <div className="flex justify-between text-sm font-medium gap-2">
          <div className="bg-red-100 rounded-lg p-2 flex-1 text-center">
            <div>Confidence</div>
            <div className="text-lg font-bold text-red-600">97%</div>
          </div>
          <div className="bg-red-100 rounded-lg p-2 flex-1 text-center">
            <div>Severity</div>
            <div className="text-red-600 font-bold">High</div>
          </div>
        </div>
        <div className="mt-2 bg-yellow-100 px-3 py-2 rounded-md text-sm font-semibold text-yellow-800">
          ⏳ ATTENTION NEEDED <span className="font-medium text-yellow-700"> Issue likely in 2–4 days</span>
        </div>
        <div className="mt-2 text-red-700 text-sm font-semibold">
          ❗ Immediate maintenance required to prevent breakdown.
        </div>
        <div className="text-xs text-gray-500 mt-2">🕒 Last prediction: Today, 12:30 PM</div>
      </div>

      <div className="bg-orange-50 rounded-xl p-4 mt-4 text-sm">
        <div className="mb-2 font-semibold text-orange-800">⚠️ Recommendation</div>
        <ul className="list-disc pl-5">
          <li>Schedule immediate refrigerant leak inspection.</li>
          <li>Coolant coil cleaning recommended.</li>
          <li>Delay in maintenance may result in system shutdown & high repair costs.</li>
        </ul>
        <p className="text-xs text-gray-500 mt-3">Contact support or request a technician visit as soon as possible.</p>
      </div>

      <div className="flex justify-between gap-2 mt-5 mb-14">
        <button className="flex-1 bg-blue-500 text-white py-2 rounded-xl font-semibold text-sm shadow">📄 View Logs</button>
        <button className="flex-1 bg-red-500 text-white py-2 rounded-xl font-semibold text-sm shadow">🛠️ Request Maintenance</button>
        <button className="flex-1 bg-gray-400 text-white py-2 rounded-xl font-semibold text-sm shadow">🔄 Refresh Status</button>
      </div>
    </div>
  );
}
