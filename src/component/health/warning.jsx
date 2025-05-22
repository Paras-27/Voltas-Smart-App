import React from 'react';
import AChealth from './header';

const AChealthwarning = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm p-5 font-sans">
      {/* Header */}
      <AChealth />
      <div className="flex justify-between items-center font-semibold text-lg">
        <div>❄️ AC Health Monitor</div>
        <div className="flex gap-2">
          <span className="bg-white rounded-full p-1.5 shadow-sm">⚙️</span>
          <span className="bg-white rounded-full p-1.5 shadow-sm">🔔</span>
        </div>
      </div>

      {/* System Overview */}
      <div className="text-xs text-gray-500 mt-5">
        System Overview <span className="float-right">Last Updated: Just now</span>
      </div>
      <div className="mt-2 p-2 rounded-xl border border-gray-200 bg-gray-50 text-sm">
        🔄 AC Unit-3 <span className="float-right text-gray-500">Change</span>
      </div>

      {/* System Health */}
      <div className="mt-5">
        <div className="text-base font-semibold">
          System Health <span className="float-right bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full text-xs font-medium">🚨 Critical Risk</span>
        </div>
        
        {/* Card */}
        <div className="mt-2 bg-red-50 rounded-xl p-4 border border-red-200">
          <h3 className="text-sm font-semibold text-red-800">❤️ Major Fault Detected</h3>
          <p className="text-xs text-gray-600 mt-1 mb-3">Refrigerant Leak • Coils Overheating</p>
          
          {/* Info Box */}
          <div className="flex gap-2">
            <div className="bg-red-100 rounded-lg p-2 text-center flex-1">
              <div className="text-xs">Confidence</div>
              <div className="text-lg font-bold text-red-700">97%</div>
            </div>
            <div className="bg-red-100 rounded-lg p-2 text-center flex-1">
              <div className="text-xs">Severity</div>
              <div className="font-bold text-red-700">High</div>
            </div>
          </div>
          
          <div className="mt-2 bg-amber-100 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-800">
            ⏳ ATTENTION NEEDED <span className="font-medium text-amber-700"> Issue likely in 2–4 days</span>
          </div>
          <div className="mt-1 text-red-800 text-xs font-semibold">
            ❗ Immediate maintenance required to prevent breakdown.
          </div>
          <div className="mt-2 text-xs text-gray-500">
            🕒 Last prediction: Today, 12:30 PM
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className="mt-4 bg-orange-50 rounded-xl p-4 text-sm">
        <div className="font-semibold text-orange-800 mb-2">⚠️ Recommendation</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>Schedule immediate refrigerant leak inspection.</li>
          <li>Coolant coil cleaning recommended.</li>
          <li>Delay in maintenance may result in system shutdown & high repair costs.</li>
        </ul>
        <p className="text-xs text-gray-500 mt-2">
          Contact support or request a technician visit as soon as possible.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex gap-2 mb-11">
        <button className="flex-1 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition">
          📄 View Logs
        </button>
        <button className="flex-1 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition">
          🛠️ Request Maintenance
        </button>
        <button className="flex-1 py-2 bg-gray-400 text-white font-semibold rounded-lg shadow hover:bg-gray-500 transition">
          🔄 Refresh Status
        </button>
      </div>
    </div>
  );
};

export default AChealthwarning;