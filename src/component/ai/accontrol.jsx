export default function ACControl() {
  const [temperature, setTemperature] = useState(21);
  const [activeMode, setActiveMode] = useState("Fan");
  const [isOn, setIsOn] = useState(true); // Add power state

  // Add animation state for different modes
  const [animation, setAnimation] = useState("");

  const handlePowerToggle = () => {
    setIsOn(!isOn);
    setAnimation(isOn ? "power-off" : "power-on");
    setTimeout(() => setAnimation(""), 1000); // Reset animation after 1s
  };

  // Add mode change animations
  useEffect(() => {
    setAnimation("mode-change");
    setTimeout(() => setAnimation(""), 800);
  }, [activeMode]);

  // ... rest of your existing state and handlers ...

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      {/* Add AC Image with animations */}
      <div className={`transition-all duration-500 ${animation === "power-off" ? "scale-90 opacity-70" : ""} ${animation === "power-on" ? "scale-110" : ""}`}>
        <ACImage isOn={isOn} />
      </div>

      {/* Temperature Ring - add opacity transition when off */}
      <div className={`relative w-48 h-48 flex items-center justify-center transition-all duration-300 ${!isOn ? "opacity-50" : ""}`}>
        {/* Your existing ring SVG */}
        <svg className={`absolute w-full h-full rotate-[-90deg] transition-all duration-1000 ${animation === "power-on" ? "scale-105" : ""}`}>
          {/* ... your existing path ... */}
        </svg>
        <div className="text-center">
          <div className={`text-4xl font-bold transition-all duration-300 ${!isOn ? "text-gray-400" : ""}`}>
            {temperature}°C
          </div>
          <div className="text-sm text-gray-500">Temp</div>
        </div>
      </div>

      {/* Slider - disable when off */}
      <div className={`flex items-center gap-4 my-4 w-3/4 transition-opacity ${!isOn ? "opacity-50" : ""}`}>
        <button 
          onClick={decreaseTemp} 
          disabled={!isOn}
          className="text-blue-500 text-2xl disabled:text-gray-400"
        >
          <FaMinus />
        </button>
        <Slider
          value={temperature}
          min={16}
          max={30}
          step={1}
          disabled={!isOn}
          onValueChange={handleSliderChange}
          className="flex-1"
        />
        <button 
          onClick={increaseTemp} 
          disabled={!isOn}
          className="text-blue-500 text-2xl disabled:text-gray-400"
        >
          <FaPlus />
        </button>
      </div>

      {/* Updated Power Button */}
      <Button 
        onClick={handlePowerToggle}
        className={`mb-4 transition-all duration-300 ${isOn ? "bg-gradient-to-r from-blue-400 to-cyan-400" : "bg-gradient-to-r from-gray-400 to-gray-500"} text-white`}
      >
        <div className="flex items-center gap-2">
          <FaPowerOff className={`transition-transform duration-300 ${isOn ? "rotate-0" : "rotate-180"}`} />
          {isOn ? "TURN OFF" : "TURN ON"}
        </div>
      </Button>

      {/* Mode buttons - disable when off */}
      <div className={`grid grid-cols-4 gap-4 mb-4 transition-opacity ${!isOn ? "opacity-50 pointer-events-none" : ""}`}>
        {modes.map((mode) => (
          <button
            key={mode.name}
            onClick={() => setActiveMode(mode.name)}
            disabled={!isOn}
            className={`flex flex-col items-center p-2 rounded-xl shadow-md transition-all duration-300 ${
              activeMode === mode.name 
                ? "bg-gradient-to-r from-blue-400 to-cyan-400 text-white" 
                : "bg-gray-100 text-gray-700"
            } ${animation === "mode-change" && activeMode === mode.name ? "scale-105 ring-2 ring-blue-300" : ""}`}
          >
            {mode.icon}
            <span className="text-sm mt-1 capitalize">{mode.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}