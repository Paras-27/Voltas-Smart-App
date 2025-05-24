import React, { useState, useEffect } from "react";
import { Thermometer, Fan, Clock, Calendar, Sun, Zap } from "lucide-react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Line,
  ComposedChart
} from "recharts";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';

function Energy() {
  const [autoAdjust, setAutoAdjust] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dailyUsageHours, setDailyUsageHours] = useState(8);
  const [energyConsumptionLevel, setEnergyConsumptionLevel] = useState(50);
  const [activeTab, setActiveTab] = useState("day");
  const [data, setData] = useState([]);
  const [totalUsedToday, setTotalUsedToday] = useState(0);
  const [quotaLeft, setQuotaLeft] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [lowerThreshold, setLowerThreshold] = useState(0);
  const [upperThreshold, setUpperThreshold] = useState(0);
  const [targetThreshold, setTargetThreshold] = useState(0);
  const [showGraph, setShowGraph] = useState(false);
  const [tempDailyUsageHours, setTempDailyUsageHours] = useState(8);
  const [tempEnergyConsumptionLevel, setTempEnergyConsumptionLevel] = useState(50);

  // AC power consumption parameters (in kW)
  const minPowerConsumption = 0.8; // Minimum power consumption in kW
  const maxPowerConsumption = 1.5; // Maximum power consumption in kW
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

  const handleSetTarget = () => {
    if (!fromDate || !toDate) return;
    
    setDailyUsageHours(tempDailyUsageHours);
    setEnergyConsumptionLevel(tempEnergyConsumptionLevel);
    
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    
    // Calculate power consumption based on slider (50% = 1.15 kW)
    const powerConsumption = minPowerConsumption + 
      (maxPowerConsumption - minPowerConsumption) * (tempEnergyConsumptionLevel / 100);
    
    // Calculate daily energy in kWh (power * hours)
    const dailyEnergy = powerConsumption * tempDailyUsageHours;
    
    // Set thresholds (10% variation)
    setLowerThreshold(dailyEnergy * 0.9);
    setUpperThreshold(dailyEnergy * 1.1);
    setTargetThreshold(dailyEnergy);
    
    generateData(dailyEnergy);
    setShowGraph(true);
  };

  // Generate sample data based on active tab and target threshold
  const generateData = (dailyThreshold) => {
    const now = new Date();
    let sampleData = [];

    if (activeTab === "day") {
      // Last 6 hours data
      const currentHour = now.getHours();
      const startHour = Math.max(0, currentHour - 5);
      
      sampleData = Array.from({ length: 6 }, (_, i) => {
        const hour = `${startHour + i}:00`;
        const value = Math.min(
          Math.round(dailyThreshold * (0.3 + Math.random() * 0.7 * (i/6))),
          dailyThreshold
        );
        const value_actual = Math.min(
          Math.round(dailyThreshold * (0.4 + Math.random() * 0.6 * (i/6))),
          dailyThreshold
        );
        return {
          time: hour,
          forecast: value,
          actual: value_actual,
        };
      });
      
      // Calculate quota left - dailyThreshold is the total allowed for the day
      const used = sampleData.reduce((sum, d) => sum + d.actual, 0);
      setTotalUsedToday(used);
      setQuotaLeft(dailyThreshold - used); // This is the correct calculation
    } else if (activeTab === "week") {
      // Last 7 days data
      sampleData = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const value = Math.min(
          Math.round(dailyThreshold * (0.3 + Math.random() * 0.7 * (i/7))),
          dailyThreshold
        );
        const value_actual = Math.min(
          Math.round(dailyThreshold * (0.4 + Math.random() * 0.6 * (i/7))),
          dailyThreshold
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
          Math.round(dailyThreshold * 30 * (0.3 + Math.random() * 0.7 * (i/6))),
          dailyThreshold * 30
        );
        const value_actual = Math.min(
          Math.round(dailyThreshold * 30 * (0.4 + Math.random() * 0.6 * (i/6))),
          dailyThreshold * 30
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

  const handleEnergyConsumptionChange = (event, newValue) => {
    setTempEnergyConsumptionLevel(newValue);
  };

  const handleDailyUsageChange = (e) => {
    setTempDailyUsageHours(parseInt(e.target.value));
  };

  useEffect(() => {
    if (showGraph) {
      generateData(targetThreshold);
    }
  }, [activeTab]);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-blue-100 md:p-6 space-y-6 font-sans pb-20">
      {/* Set Energy Goal */}
      <div className="rounded-2xl shadow-md bg-white p-4 md:p-6 space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold">Configure Your AC Energy Usage</h2>
        
        {/* Date Range and Usage Hours */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Daily Usage Hours: {tempDailyUsageHours}h
            </label>
            <input
              type="range"
              min="1"
              max="24"
              value={tempDailyUsageHours}
              onChange={handleDailyUsageChange}
              className="w-full"
            />
          </div>
        </div>

        {/* Energy Consumption Slider */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">
              Energy Consumption Level
            </label>
            <span className="text-sm font-medium">
              {tempEnergyConsumptionLevel}% ({((minPowerConsumption + 
                (maxPowerConsumption - minPowerConsumption) * (tempEnergyConsumptionLevel / 100)) * tempDailyUsageHours).toFixed(2)} kWh/day)
            </span>
          </div>
          <Slider
            value={tempEnergyConsumptionLevel}
            onChange={handleEnergyConsumptionChange}
            aria-labelledby="energy-consumption-slider"
            min={0}
            max={100}
            valueLabelDisplay="auto"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Eco Mode ({(minPowerConsumption * tempDailyUsageHours).toFixed(2)} kWh/day)</span>
            <span>Performance Mode ({(maxPowerConsumption * tempDailyUsageHours).toFixed(2)} kWh/day)</span>
          </div>
        </div>

        {/* Set Target Button */}
        <button
          onClick={handleSetTarget}
          disabled={!fromDate || !toDate}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Set Target and Generate Report
        </button>

        {/* Threshold Indicators - Only shown after target is set */}
        {showGraph && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Target Consumption</p>
              <p className="text-blue-600 font-medium text-lg">
                {targetThreshold.toFixed(2)} kWh/day
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Time Period Selector - Only shown after target is set */}
      {showGraph && (
        <div className="flex flex-row gap-4 overflow-x-auto pb-2">
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
      )}

      {/* Energy Usage Chart - Only shown after target is set */}
      {showGraph && (
        <div className="rounded-2xl shadow-md bg-white p-4 md:p-6 space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold">
            {activeTab === "day" ? "Hourly" : activeTab === "week" ? "Daily" : "Monthly"} Energy Consumption
          </h2>
          
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
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
                  dataKey="actual" 
                  fill="#3b82f6" 
                  name="Actual" 
                  radius={[4, 4, 0, 0]} 
                />
                <Line 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="#06b6d4" 
                  name="Forecast" 
                  strokeWidth={2} 
                  dot={false}
                />
                {activeTab === "day" && (
                  <>
                    <ReferenceLine
                      y={lowerThreshold}
                      stroke="green"
                      strokeDasharray="3 3"
                      label={{ 
                        value: "Lower", 
                        position: "top",
                        fontSize: 10
                      }}
                    />
                    <ReferenceLine
                      y={targetThreshold}
                      stroke="blue"
                      strokeDasharray="3 3"
                      label={{ 
                        value: "Target", 
                        position: "top",
                        fontSize: 10
                      }}
                    />
                    <ReferenceLine
                      y={upperThreshold}
                      stroke="orange"
                      strokeDasharray="3 3"
                      label={{ 
                        value: "Upper", 
                        position: "top",
                        fontSize: 10
                      }}
                    />
                  </>
                )}
              </ComposedChart>
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
                <p className={`font-medium text-lg md:text-xl ${
                  quotaLeft > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {Math.abs(quotaLeft).toFixed(2)} kWh
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI Suggestions - Only shown after target is set */}
      {showGraph && (
        <div className="rounded-2xl shadow-md bg-white p-4 md:p-6 space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold">AI Energy Saving Suggestions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-4">
              <Thermometer className="text-blue-500" size={20} />
              <div>
                <p className="font-medium">Temperature Adjustment</p>
                <p className="text-sm">Reduce setpoint by 1°C for ~10% energy savings</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-4">
              <Fan className="text-teal-500" size={20} />
              <div>
                <p className="font-medium">Fan Speed Optimization</p>
                <p className="text-sm">Higher fan speed can improve efficiency in humid conditions</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-4">
              <Zap className="text-yellow-500" size={20} />
              <div>
                <p className="font-medium">Peak Hours Adjustment</p>
                <p className="text-sm">Reduce usage between 2PM-6PM to lower costs</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-xl p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">Auto Optimization</p>
                <p className="text-sm">Allow system to make automatic adjustments</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoAdjust}
                  onChange={(e) => setAutoAdjust(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
          <div className="flex flex-row justify-end gap-4">
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
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Energy Optimization"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By applying these changes, your comfort settings will be adjusted which may affect your indoor environment. Are you sure you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleApplyChanges} autoFocus>
            Optimize Now
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Energy;