import React, { useState } from "react";
import { Thermometer, Fan } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

function Energy() {
  const [autoAdjust, setAutoAdjust] = useState(false);
  const [targetEnergy, setTargetEnergy] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dailyThreshold, setDailyThreshold] = useState(0);
  const [data, setData] = useState([]);
  const [totalUsedToday, setTotalUsedToday] = useState(0);
  const [quotaLeft, setQuotaLeft] = useState(0);

  const handleSetTarget = () => {
    const energyVal = parseFloat(targetEnergy);
    if (!energyVal || !fromDate || !toDate) return;

    // use energyVal instead of targetEnergy throughout

    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    const dailyAvg = energyVal / diffDays;
    setDailyThreshold(dailyAvg);

    const currentHour = new Date().getHours();
    const startHour = Math.max(0, currentHour - 5);

    const sampleData = Array.from(
      { length: currentHour - startHour + 1 },
      (_, i) => {
        const hour = startHour + i +'am';
        const value = Math.min(
          Math.round(dailyAvg * (0.3 + Math.random() * 0.7)),
          dailyAvg
        );
        const value_actual = Math.min(
          Math.round(dailyAvg * (0.4 + Math.random() * 0.6)),
          dailyAvg
        );
        return {
          hour,
          forecast: value,
          actual: value_actual,
        };
      }
    );

    setData(sampleData);
    console.log(sampleData)
    const totalToday = sampleData.reduce((sum, h) => sum + h.actual, 0);
    setTotalUsedToday(totalToday);
    setQuotaLeft(Math.max(0, dailyAvg - totalToday));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 font-sans">
      {/* Set Energy Goal */}
      <div className="rounded-2xl shadow-md bg-white p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Set Your Energy Goal</h2>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="number"
            placeholder="Target Energy (kWh)"
            value={targetEnergy}
            onChange={(e) => setTargetEnergy(e.target.value)}
            className="p-2 border rounded-md"
          />
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="p-2 border rounded-md"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Planned Daily Usage Hours
          </label>
          <div className="h-20 bg-blue-100 rounded-lg flex items-end gap-1 px-2 py-1">
            {[...Array(14)].map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-cyan-400 rounded-lg"
                style={{ height: `${20 + (i % 5) * 10}px` }}
              ></div>
            ))}
          </div>
        </div>
        <button
          onClick={handleSetTarget}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
        >
          Set Target
        </button>
      </div>

      {/* Daily Usage Overview */}
      <div className="rounded-2xl shadow-md bg-white p-6  pl-0 space-y-4">
        <h2 className="text-2xl font-semibold">Daily Usage Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="forecast" fill="#06b6d4" name="Forecast" />
            <Bar dataKey="actual" fill="#3b82f6" name="Actual" />
            {dailyThreshold > 0 && (
              <ReferenceLine
                y={dailyThreshold}
                stroke="red"
                strokeDasharray="3 3"
                label="Threshold"
              />
            )}
          </BarChart>
        </ResponsiveContainer>

        <div className="flex justify-between pt-2">
          <p className="text-green-600 font-medium">
            Total Used Today: {totalUsedToday.toFixed(2)} kWh
          </p>
          <p className="text-yellow-600 font-medium">
            Quota Left Today: {quotaLeft.toFixed(2)} kWh
          </p>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="rounded-2xl shadow-md bg-white p-6 space-y-4">
        <h2 className="text-2xl font-semibold">AI Energy Saving Suggestions</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-4">
            <Thermometer className="text-blue-500" />
            <span>Reduce temperature setpoint by 1°C for 10% savings</span>
          </div>
          <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-4">
            <Fan className="text-teal-500" />
            <span>Enable auto swing to improve airflow efficiency</span>
          </div>
          <div className="bg-gray-100 rounded-xl p-4">
            Try enabling Eco Mode during peak hours
          </div>
          <div className="bg-gray-100 rounded-xl p-4 flex justify-between items-center">
            <span>Allow auto adjustments?</span>
            <input
              type="checkbox"
              checked={autoAdjust}
              onChange={(e) => setAutoAdjust(e.target.checked)}
              className="w-5 h-5"
            />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button className="border px-4 py-2 rounded-md">Cancel</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default Energy;
