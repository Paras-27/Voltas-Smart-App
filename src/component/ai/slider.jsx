export function Slider({ min = 16, max = 30, value, onValueChange, disabled = false }) {
  const fillPercentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative w-full h-4 group">
      {/* Background track */}
      <div className={`absolute top-0 left-0 w-full h-1 rounded-full mt-1.5 ${disabled ? "bg-gray-300" : "bg-gray-200"}`}></div>
      
      {/* Filled portion */}
      <div 
        className={`absolute top-0 left-0 h-1 rounded-full mt-1.5 ${disabled ? "bg-gray-400" : "bg-blue-500"}`}
        style={{ width: `${fillPercentage}%` }}
      ></div>
      
      {/* Thumb indicator */}
      <div 
        className={`absolute top-0 h-4 w-4 rounded-full -translate-x-1/2 transition-all duration-100 ${
          disabled 
            ? "bg-gray-500" 
            : "bg-blue-500 group-active:scale-125 group-active:bg-blue-600"
        }`}
        style={{ left: `${fillPercentage}%` }}
      ></div>
      
      {/* Actual input slider */}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => !disabled && onValueChange(Number(e.target.value))}
        disabled={disabled}
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
      />
    </div>
  );
}