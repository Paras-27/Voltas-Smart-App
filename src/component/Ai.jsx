import React, { useState, useEffect } from 'react';
import { FaFan, FaSnowflake, FaSun, FaTint, FaWind, FaSmog, FaArrowsAltH, FaArrowsAltV } from 'react-icons/fa';
import { Chart } from 'chart.js/auto';

const Aimode = () => {
  const [isAIModeOn, setIsAIModeOn] = useState(true);
  const [fanSpeed, setFanSpeed] = useState('Low');
  const [swingMode, setSwingMode] = useState('Horizontal');
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current_weather=true&hourly=relativehumidity_2m&timezone=auto');
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        console.error("Failed to load weather data:", err);
      }
    };

    fetchWeather();
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Initialize chart
  useEffect(() => {
    const ctx = document.getElementById('tempChart');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'],
          datasets: [{
            label: 'kWh',
            data: [21, 23, 25, 26, 25, 24, 23, 22, 24, 25, 26, 26],
            backgroundColor: '#2ecc71',
            borderRadius: 4
          }]
        },
        options: {
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, ticks: { stepSize: 5 } }
          }
        }
      });
    }
  }, []);

  return (
    <div className="font-inter bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen p-6 text-gray-800">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6">
        {/* Weather Section */}
        <div className="bg-gradient-to-r from-blue-400 to-cyan-300 rounded-2xl text-white p-5 shadow-md mb-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Delhi, India</h2>
            <p className="text-sm opacity-90">
              {currentTime.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })} • 
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          
          {weatherData ? (
            <>
              <h1 className="text-4xl font-bold mb-1">
                {weatherData.current_weather.temperature}°C 
                <span className="text-xl opacity-80 ml-1">/ Feels {Math.round(weatherData.current_weather.temperature + 2)}°C</span>
              </h1>
              
              <div className="grid grid-cols-4 gap-2 text-xs mt-4 mb-3">
                <div className="flex items-center">
                  <FaSun className="mr-1" /> {weatherData.current_weather.weathercode < 3 ? 'Sunny' : 'Cloudy'}
                </div>
                <div className="flex items-center">
                  <FaTint className="mr-1" /> Humidity {weatherData.hourly.relativehumidity_2m[new Date().getHours()]}%
                </div>
                <div className="flex items-center">
                  <FaWind className="mr-1" /> Wind {weatherData.current_weather.windspeed} km/h
                </div>
                <div className="flex items-center">
                  <FaSmog className="mr-1" /> AQI 48
                </div>
              </div>
              
              <div className="flex justify-between text-xs pt-2 border-t border-white border-opacity-20">
                {[15, 16, 17, 18, 19].map(hour => (
                  <div key={hour} className="text-center">
                    <p>{hour}:00</p>
                    <p>{40 - (hour - 15)}°</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>Loading weather...</p>
          )}
        </div>

        {/* Main Control Card */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              AI Mode <span className="text-blue-500">AC Control</span>
            </h3>
            <label className="relative inline-block w-14 h-8">
              <input 
                type="checkbox" 
                checked={isAIModeOn} 
                onChange={() => setIsAIModeOn(!isAIModeOn)}
                className="opacity-0 w-0 h-0"
              />
              <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition ${isAIModeOn ? 'bg-green-400' : 'bg-gray-300'}`}>
                <span className={`absolute h-6 w-6 rounded-full bg-white transition left-1 bottom-1 ${isAIModeOn ? 'translate-x-6' : ''}`}></span>
              </span>
            </label>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 mb-5 shadow-inner text-sm">
            Set Temp: <span className="text-blue-500 font-medium">24°C</span> • 
            Mode: <span className="text-green-400 font-medium">Cooling <FaSnowflake className="inline" /></span> 
            <span className="text-blue-500 ml-1 cursor-pointer">Why this?</span>
          </div>

          <div className="mb-5">
            <p className="text-sm font-medium mb-2">Fan Speed:</p>
            <div className="flex gap-3">
              {['Low', 'Medium', 'High'].map(speed => (
                <div 
                  key={speed}
                  onClick={() => setFanSpeed(speed)}
                  className={`flex-1 text-center p-2 rounded-xl cursor-pointer transition ${fanSpeed === speed ? 'bg-blue-50 shadow-inner border border-blue-100' : 'hover:bg-gray-50'}`}
                >
                  <FaFan className={`mx-auto text-blue-500 ${speed === 'Medium' ? 'text-lg' : speed === 'High' ? 'text-xl' : ''}`} />
                  <small className="text-xs">{speed}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <p className="text-sm font-medium mb-2">Swing:</p>
            <div className="flex gap-3">
              {['Horizontal', 'Vertical'].map(mode => (
                <div 
                  key={mode}
                  onClick={() => setSwingMode(mode)}
                  className={`flex-1 text-center p-2 rounded-xl cursor-pointer transition ${swingMode === mode ? 'bg-blue-50 shadow-inner border border-blue-100' : 'hover:bg-gray-50'}`}
                >
                  {mode === 'Horizontal' ? (
                    <FaArrowsAltH className="mx-auto text-blue-500" />
                  ) : (
                    <FaArrowsAltV className="mx-auto text-blue-500" />
                  )}
                  <small className="text-xs">{mode}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm">
            Schedule (Today):<br />
            <span className="text-blue-500">07:00 ON</span>
            <span className="text-green-400 ml-2">18:00 ECO</span>
            <span className="text-red-400 ml-2">23:00 OFF</span>
            <span className="float-right text-blue-500 text-xs mt-1 cursor-pointer">View Week</span>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gray-50 rounded-2xl p-5 shadow-sm mb-6">
          <h3 className="text-lg font-semibold mb-3">AI Insights</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>AI learned you prefer <span className="text-blue-500 font-bold">24°C</span> at <strong>9 PM</strong> in summer</li>
            <li>Your average fan speed at night is <span className="text-blue-500 font-bold">low</span></li>
            <li>You usually turn off swing after <strong>11 PM</strong></li>
          </ul>
        </div>

        {/* Analytics */}
        <div className="bg-gray-50 rounded-2xl p-5 shadow-sm mb-6">
          <h3 className="text-lg font-semibold mb-3">Analytics</h3>
          <p className="mb-4"><span className="text-blue-500 font-bold">26°C</span> Current Indoor Temp</p>
          <canvas id="tempChart" height="160"></canvas>
          
          <div className="flex justify-between mt-4 text-sm">
            <div>
              <p>Energy Consumption</p>
              <p className="text-blue-500 font-bold">7.4 kWh</p>
            </div>
            <div>
              <p>Occupancy</p>
              <p className="text-green-500 font-bold">High Level</p>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm mb-2">How comfy is it now?</p>
            <div className="flex justify-between items-center">
              <div className="text-xl">
                <span>😠</span> <span>😐</span> <span>🙂</span> <span>😊</span> <span>😎</span>
              </div>
              <button className="text-blue-500 text-sm">Feedback</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aimode;