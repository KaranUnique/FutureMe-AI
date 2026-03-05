import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Flame, Trophy, Calendar, Check, X, Shield, RefreshCw, Zap } from 'lucide-react';

const ChallengeTracker = ({ duration, onComplete, onReset }) => {
  // Try to load state from local storage based on duration (to keep them scoped)
  const storageKey = `futureme-challenge-${duration}`;
  
  const [completedDays, setCompletedDays] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });
  
  const [celebrate, setCelebrate] = useState(false);

  // Save to local storage whenever completedDays changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(completedDays));
  }, [completedDays, storageKey]);

  const toggleDay = (day) => {
    setCompletedDays(prev => {
      // If already completed, remove it
      if (prev.includes(day)) {
        return prev.filter(d => d !== day);
      }
      
      // Otherwise add it
      const newDays = [...prev, day];
      
      // Trigger mini celebration animation
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 1000);
      
      // If challenge completed
      if (newDays.length === duration && onComplete) {
        onComplete();
      }
      
      return newDays;
    });
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your progress? This cannot be undone.")) {
      setCompletedDays([]);
      if (onReset) onReset();
    }
  };

  // Calculate stats
  const progressPercentage = Math.round((completedDays.length / duration) * 100);
  
  // Calculate current streak (consecutive completed days starting from latest back to 1)
  // We assume days are chronological, so we sort them first
  const sortedDays = [...completedDays].sort((a, b) => b - a);
  let currentStreak = 0;
  
  // A simple streak logic: assume the user has to fill them sequentially
  // Check from highest completed day downwards
  if (sortedDays.length > 0) {
     if (sortedDays[0] === completedDays.length) {
         currentStreak = completedDays.length; // Flawless streak from day 1 to N
     } else {
         // Count consecutive days from the max completed day
         currentStreak = 1;
         for (let i = 0; i < sortedDays.length - 1; i++) {
             if (sortedDays[i] === sortedDays[i+1] + 1) {
                 currentStreak++;
             } else {
                 break;
             }
         }
     }
  }

  // Generate grid array
  const gridDays = Array.from({ length: duration }, (_, i) => i + 1);

  // Animation variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.02 }
    }
  };

  const itemVars = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  // Determine grid columns based on screen size and duration
  const getGridCols = () => {
    if (duration === 30) return 'grid-cols-5 sm:grid-cols-6 md:grid-cols-10';
    if (duration === 90) return 'grid-cols-6 sm:grid-cols-10 md:grid-cols-15';
    return 'grid-cols-7 sm:grid-cols-12 md:grid-cols-[repeat(20,minmax(0,1fr))]'; // 180 days
  };

  const getCellSize = () => {
    if (duration === 180) return 'h-8 sm:h-10 text-[10px] sm:text-xs rounded-lg';
    if (duration === 90) return 'h-10 sm:h-12 text-xs sm:text-sm rounded-xl';
    return 'h-12 sm:h-16 text-sm sm:text-base rounded-2xl'; // 30 days
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col bg-[#0b0f1a]/90 backdrop-blur-2xl rounded-[2rem] sm:rounded-[3rem] border border-gray-800/80 shadow-[0_20px_40px_rgba(0,0,0,0.6)] sm:shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden p-4 sm:p-6 md:p-12 relative mb-8 sm:mb-12">
      
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-full h-[300px] sm:h-[500px] bg-gradient-to-b from-blue-900/10 via-purple-900/5 to-transparent pointer-events-none blur-[60px] sm:blur-[80px]"></div>
      <div className="absolute -left-16 sm:-left-32 top-1/2 w-48 sm:w-96 h-48 sm:h-96 bg-emerald-600/10 rounded-full blur-[60px] sm:blur-[100px] pointer-events-none"></div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 sm:mb-10 relative z-10 gap-4 sm:gap-6">
        <div>
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl sm:rounded-2xl border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.3)] text-blue-400">
              <Shield size={24} className="sm:w-[32px] sm:h-[32px]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight">
                {duration}-Day Protocol
              </h2>
              <p className="text-blue-400 font-bold uppercase tracking-widest text-[10px] sm:text-sm mt-0.5 sm:mt-1 flex items-center gap-1.5 sm:gap-2">
                <Target size={14} className="sm:w-[16px] sm:h-[16px]" /> Don't Break The Chain
              </p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-2 sm:gap-4 w-full md:w-auto overflow-x-auto pb-2 sm:pb-4 md:pb-0 no-scrollbar snap-x">
          <div className="flex-shrink-0 bg-black/40 border border-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center min-w-[100px] sm:min-w-[120px] shadow-inner snap-center">
            <span className="text-gray-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-0.5 sm:mb-1">Progress</span>
            <div className="flex items-end gap-0.5 sm:gap-1">
              <span className="text-xl sm:text-3xl font-black text-white">{completedDays.length}</span>
              <span className="text-gray-500 font-bold mb-0.5 sm:mb-1 text-xs sm:text-base">/{duration}</span>
            </div>
          </div>
          
          <div className="flex-shrink-0 bg-gradient-to-br from-orange-950/40 to-red-950/40 border border-orange-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center min-w-[100px] sm:min-w-[120px] shadow-[0_0_20px_rgba(249,115,22,0.1)] group snap-center">
            <span className="text-orange-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-0.5 sm:mb-1 flex items-center gap-1">
              <Flame size={12} className={`sm:w-[14px] sm:h-[14px] ${currentStreak > 0 ? "text-orange-500 animate-pulse" : "text-orange-500/50"}`} /> Streak
            </span>
            <div className="text-xl sm:text-3xl font-black text-orange-400 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">
              {currentStreak}
            </div>
          </div>

          <button 
            onClick={handleReset}
            className="flex-shrink-0 bg-gray-900 border border-gray-700 hover:bg-red-950/40 hover:border-red-500/50 hover:text-red-400 text-gray-500 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center min-w-[80px] sm:min-w-[100px] transition-all group active:scale-95 snap-center"
          >
            <RefreshCw size={18} className="sm:w-[24px] sm:h-[24px] mb-1 sm:mb-2 group-hover:-rotate-180 transition-transform duration-500" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Reset</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-900 rounded-full h-2 sm:h-3 mb-8 sm:mb-12 border border-gray-800 shadow-inner overflow-hidden relative z-10">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-l from-white/30 to-transparent"></div>
        </motion.div>
      </div>

      {/* Grid Container */}
      <motion.div 
        variants={containerVars}
        initial="hidden"
        animate="visible"
        className={`grid ${getGridCols()} gap-1.5 sm:gap-2 md:gap-4 relative z-10 w-full bg-black/20 p-3 sm:p-6 md:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-white/5 shadow-inner`}
      >
        {gridDays.map((day) => {
          const isCompleted = completedDays.includes(day);
          const isToday = day === completedDays.length + 1; // Assuming they check off sequentially

          return (
            <motion.button
              key={day}
              variants={itemVars}
              onClick={() => toggleDay(day)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className={`relative flex items-center justify-center font-bold tracking-tight transition-all duration-300 overflow-hidden ${getCellSize()} ${
                isCompleted 
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)] border-0' 
                  : isToday
                  ? 'bg-blue-900/20 text-blue-400 border-2 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)] animate-pulse'
                  : 'bg-[#131b2c] text-gray-600 border border-gray-800 hover:border-gray-500 hover:text-gray-300 shadow-sm'
              }`}
            >
              {/* Completed checkmark animation overlay */}
              <AnimatePresence>
                {isCompleted && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-transparent z-10"
                  >
                    <Check size={duration === 180 ? 12 : duration === 90 ? 16 : 24} strokeWidth={duration === 180 ? 2 : 3} className="opacity-40 sm:opacity-50" />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Day number */}
              <span className={`relative z-20 ${isCompleted ? 'opacity-90' : ''}`}>
                {day}
              </span>
              
              {/* Subtle inner glow for completed */}
              {isCompleted && (
                 <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/20 pointer-events-none"></div>
              )}
            </motion.button>
          );
        })}
      </motion.div>
      
      {/* Floating Celebration Particles (Simplified) */}
      <AnimatePresence>
        {celebrate && (
           <motion.div 
             initial={{ opacity: 0, scale: 0.5, y: 20 }}
             animate={{ opacity: 1, scale: 1.2, y: -20 }}
             exit={{ opacity: 0, scale: 1.5, y: -40 }}
             className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.8)]"
           >
             <Zap size={100} fill="currentColor" />
           </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ChallengeTracker;
