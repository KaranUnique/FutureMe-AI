import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Meter = ({ title, value, invertColor = false }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Simple custom easing for number counter
    let startTime;
    const duration = 1500;
    
    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(Math.floor(easeProgress * value));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value]);

  // Determine color based on value and whether high is good or bad
  // InvertColor: true means High Value = Red (e.g. Risk)
  // InvertColor: false means High Value = Green (e.g. Stability)
  let colorClass = "from-yellow-400 to-orange-500";
  let strokeColor = "#f59e0b"; // yellow-500

  if (invertColor) {
    if (value > 66) { colorClass = "from-red-500 to-rose-600"; strokeColor = "#ef4444"; }
    else if (value < 33) { colorClass = "from-emerald-400 to-green-500"; strokeColor = "#10b981"; }
  } else {
    if (value > 66) { colorClass = "from-emerald-400 to-green-500"; strokeColor = "#10b981"; }
    else if (value < 33) { colorClass = "from-red-500 to-rose-600"; strokeColor = "#ef4444"; }
  }

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 p-5 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
      {/* Background glow hover effect */}
      <div className={`absolute inset-0 bg-gradient-to-t ${colorClass} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      <h3 className="text-gray-400 font-medium text-sm mb-4 tracking-wide">{title}</h3>
      
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* SVG Circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#1f2937" // gray-800
            strokeWidth="8"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        
        {/* Value Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
          <span className="text-2xl font-bold text-white">{displayValue}</span>
        </div>
      </div>
    </div>
  );
};

export default Meter;
