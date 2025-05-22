import React, { useState, useEffect } from "react";
import { Thermometer, Fan, Clock, Calendar, Sun } from "lucide-react";
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function Energy() {
  const [autoAdjust, setAutoAdjust] = useState(false);
  const [targetEnergy, setTargetEnergy] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dailyThreshold, setDailyThreshold] = useState(0);
  const [activeTab, setActiveTab] = useState("day");
  const [data, setData] = useState([]);
  const [totalUsedToday, setTotalUsedToday] = useState(0);
  const [quotaLeft, setQuotaLeft] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleApplyChanges = () => {
    // Your apply changes logic here
    handleClose();
  };

  // Generate sample data based on active tab
  const generateData = () => {
    const now = new Date();
    let sampleData = [];

    if (activeTab === "day") {
      // Last 6 hours data
      const currentHour = now.getHours();
      const startHour = Math.max(0, currentHour - 5);
      
      sampleData = Array.from({ length: 6 }, (_, i) => {
        const hour = `${startHour + i}:00`;
        const value = Math.min(
          Math.round(dailyThreshold * (0.3 + Math.random() * 0.7)),
          dailyThreshold
        );
        const value_actual = Math.min(
          Math.round(dailyThreshold * (0.4 + Math.random() * 0.6)),
          dailyThreshold
        );
        return {
          time: hour,
          forecast: value,
          actual: value_actual,
        };
      });
    } else if (activeTab === "week") {
      // Last 7 days data
      sampleData = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const value = Math.min(
          Math.round(dailyThreshold * 24 * (0.3 + Math.random() * 0.7)),
          dailyThreshold * 24
        );
        const value_actual = Math.min(
          Math.round(dailyThreshold * 24 * (0.4 + Math.random() * 0.6)),
          dailyThreshold * 24
        );
        return {
          time: day,
          forecast: value,
          actual: value_actual,
        };
      });
    } else if (activeTab === "month") {
      // Last 6 months data
      sampleData = Array.from({ length: 6 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - (5 - i));
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const value = Math.min(
          Math.round(dailyThreshold * 24 * 30 * (0.3 + Math.random() * 0.7)),
          dailyThreshold * 24 * 30
        );
        const value_actual = Math.min(
          Math.round(dailyThreshold * 24 * 30 * (0.4 + Math.random() * 0.6)),
          dailyThreshold * 24 * 30
        );
        return {
          time: month,
          forecast: value,
          actual: value_actual,
        };
      });
    }

    setData(sampleData);
  };

  useEffect(() => {
    if (dailyThreshold > 0) {
      generateData();
    }
  }, [activeTab, dailyThreshold]);

  const handleSetTarget = () => {
    const energyVal = parseFloat(targetEnergy);
    if (!energyVal || !fromDate || !toDate) return;

    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    const dailyAvg = energyVal / diffDays;
    setDailyThreshold(dailyAvg);

    generateData();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 font-sans pb-20"> {/* Added pb-20 for footer space */}
      {/* Set Energy Goal */}
      <div className="rounded-2xl shadow-md bg-white p-4 md:p-6 space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold">Set Your Energy Goal</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <button
          onClick={handleSetTarget}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
        >
          Set Target
        </button>
      </div>

      {/* Time Period Selector - Now always in one row */}
      <div className="flex flex-row gap-4 overflow-x-auto pb-2"> {/* Changed to flex-row and added overflow handling */}
        <button
          onClick={() => setActiveTab("day")}
          className={`flex-1 min-w-[120px] p-3 md:p-4 rounded-xl shadow-md flex flex-col items-center transition-all ${
            activeTab === "day" ? "bg-blue-100 border-2 border-blue-300" : "bg-white"
          }`}
        >
          <Clock className="text-blue-500 mb-2" size={20} />
          <span className="font-medium text-sm md:text-base">Day</span>
          <span className="text-xs md:text-sm text-gray-500">Last 6 hours</span>
        </button>
        <button
          onClick={() => setActiveTab("week")}
          className={`flex-1 min-w-[120px] p-3 md:p-4 rounded-xl shadow-md flex flex-col items-center transition-all ${
            activeTab === "week" ? "bg-blue-100 border-2 border-blue-300" : "bg-white"
          }`}
        >
          <Calendar className="text-blue-500 mb-2" size={20} />
          <span className="font-medium text-sm md:text-base">Week</span>
          <span className="text-xs md:text-sm text-gray-500">Last 7 days</span>
        </button>
        <button
          onClick={() => setActiveTab("month")}
          className={`flex-1 min-w-[120px] p-3 md:p-4 rounded-xl shadow-md flex flex-col items-center transition-all ${
            activeTab === "month" ? "bg-blue-100 border-2 border-blue-300" : "bg-white"
          }`}
        >
          <Sun className="text-blue-500 mb-2" size={20} />
          <span className="font-medium text-sm md:text-base">Month</span>
          <span className="text-xs md:text-sm text-gray-500">Last 6 months</span>
        </button>
      </div>

      {/* Daily Usage Overview */}
      <div className="rounded-2xl shadow-md bg-white p-4 md:p-6 space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold">
          {activeTab === "day" ? "Hourly" : activeTab === "week" ? "Daily" : "Monthly"} Usage Overview
        </h2>
        
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ 
                top: 20, 
                right: 10, 
                left: 0, 
                bottom: 5 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }}
                label={{ 
                  value: activeTab === "day" ? "Hour of Day" : activeTab === "week" ? "Day of Week" : "Month", 
                  position: "insideBottom", 
                  offset: -5,
                  fontSize: 12
                }} 
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                label={{ 
                  value: "Energy (kWh)", 
                  angle: -90, 
                  position: "insideLeft",
                  fontSize: 12
                }} 
              />
              <Tooltip 
                formatter={(value) => [`${value} kWh`, activeTab === "day" ? "Hourly" : activeTab === "week" ? "Daily" : "Monthly"]}
                labelFormatter={(label) => `${activeTab === "day" ? "Time" : activeTab === "week" ? "Day" : "Month"}: ${label}`}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar 
                dataKey="forecast" 
                fill="#06b6d4" 
                name="Forecast" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="actual" 
                fill="#3b82f6" 
                name="Actual" 
                radius={[4, 4, 0, 0]} 
              />
              {dailyThreshold > 0 && activeTab === "day" && (
                <ReferenceLine
                  y={dailyThreshold}
                  stroke="red"
                  strokeDasharray="3 3"
                  label={{ 
                    value: "Threshold", 
                    position: "top",
                    fontSize: 12
                  }}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-2 pt-2">
          <div className="bg-blue-50 p-3 rounded-lg flex-1">
            <p className="text-sm text-gray-600">Total Used</p>
            <p className="text-green-600 font-medium text-lg md:text-xl">
              {data.reduce((sum, d) => sum + d.actual, 0).toFixed(2)} kWh
            </p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg flex-1">
            <p className="text-sm text-gray-600">Forecast</p>
            <p className="text-cyan-600 font-medium text-lg md:text-xl">
              {data.reduce((sum, d) => sum + d.forecast, 0).toFixed(2)} kWh
            </p>
          </div>
          {activeTab === "day" && (
            <div className="bg-blue-50 p-3 rounded-lg flex-1">
              <p className="text-sm text-gray-600">Quota Left</p>
              <p className="text-yellow-600 font-medium text-lg md:text-xl">
                {quotaLeft.toFixed(2)} kWh
              </p>
            </div>
          )}
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="rounded-2xl shadow-md bg-white p-4 md:p-6 space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold">AI Energy Saving Suggestions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-4">
            <Thermometer className="text-blue-500" size={20} />
            <span className="text-sm md:text-base">Reduce temperature setpoint by 1°C for 10% savings</span>
          </div>
          <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-4">
            <Fan className="text-teal-500" size={20} />
            <span className="text-sm md:text-base">Enable auto swing to improve airflow efficiency</span>
          </div>
          <div className="bg-gray-100 rounded-xl p-4 text-sm md:text-base">
            Try enabling Eco Mode during peak hours
          </div>
          <div className="bg-gray-100 rounded-xl p-4 flex justify-between items-center text-sm md:text-base">
            <span>Allow auto adjustments?</span>
            <input
              type="checkbox"
              checked={autoAdjust}
              onChange={(e) => setAutoAdjust(e.target.checked)}
              className="w-5 h-5"
            />
          </div>
        </div>
        <div className="flex flex-row justify-end gap-4"> {/* Changed to keep buttons in one row */}
          <button 
            className="border px-4 py-2 rounded-md text-sm md:text-base"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm md:text-base"
            onClick={handleClickOpen}
          >
            Apply Suggestions
          </button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Changes"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By applying these changes, your comfort settings will be adjusted which may affect your indoor environment. Are you sure you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleApplyChanges} autoFocus>
            Apply Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Energy;