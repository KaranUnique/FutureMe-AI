import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Brain,
  Calendar,
  Coffee,
  Moon,
  Sun,
  Activity,
  Loader2,
  Trophy,
  X,
  ChevronRight,
  Zap,
} from "lucide-react";
import ChallengeTracker from "./ChallengeTracker";

const ActionPlan = ({ data, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [routine, setRoutine] = useState(null);
  const [error, setError] = useState(null);

  // Challenge Tracker State
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState(() => {
    return localStorage.getItem("futureme-active-challenge")
      ? JSON.parse(localStorage.getItem("futureme-active-challenge"))
      : null;
  });

  const startChallenge = (days) => {
    setActiveChallenge(days);
    localStorage.setItem("futureme-active-challenge", JSON.stringify(days));
    setShowChallengeModal(false);
  };

  const resetChallenge = () => {
    setActiveChallenge(null);
    localStorage.removeItem("futureme-active-challenge");
  };

  useEffect(() => {
    const generateRoutine = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/generate-routine`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ aiInsights: data.currentPath.aiInsights }),
          },
        );

        const result = await response.json();

        if (result.success) {
          setRoutine(result.data);
        } else {
          setError(result.error || "Failed to generate routine");
        }
      } catch (err) {
        setError("Network error connecting to backend");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    generateRoutine();
  }, [data]);

  if (loading) {
    return (
      <div className="w-full max-w-5xl mx-auto h-[70vh] flex flex-col items-center justify-center p-8 bg-[#0b0f1a]/80 backdrop-blur-xl rounded-[2.5rem] border border-gray-800/80 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
        <Loader2 className="animate-spin text-purple-500 mb-6" size={64} />
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-4 drop-shadow-md">
          Designing Your Future
        </h2>
        <p className="text-gray-400 text-lg text-center max-w-md animate-pulse">
          Analyzing your habits and creating a personalized routine...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-5xl mx-auto h-[70vh] flex flex-col items-center justify-center p-8 bg-[#0b0f1a]/80 backdrop-blur-xl rounded-[2.5rem] border border-gray-800/80 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
        <div className="bg-red-950/50 border border-red-500/50 text-red-400 p-8 rounded-2xl max-w-lg text-center shadow-2xl">
          <h3 className="text-2xl font-bold mb-4">Generation Error</h3>
          <p className="mb-6">{error}</p>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-full font-bold transition-all"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full flex flex-col p-0 relative bg-transparent"
    >
      <div className="absolute top-0 right-0 w-full bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none blur-[50px]"></div>

      <button
        onClick={onBack}
        className="absolute top-0 left-2 flex items-center gap-2 text-gray-400 hover:text-white transition-colors z-20 group bg-gray-900/50 px-3 py-1.5 rounded-full border border-gray-800 hover:bg-gray-800"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="font-bold text-xs sm:text-sm uppercase tracking-wider">
          Back
        </span>
      </button>

      <div className="text-center mt-0 mb-2 sm:mb-4 relative z-10 px-2 flex flex-col items-center">
        <div className="flex justify-center mb-1">
          <div className="p-1.5 bg-purple-900/30 border border-purple-500/30 rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.3)]">
            <Brain size={24} className="text-purple-400" />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 shadow-sm tracking-tight">
          Your Intelligent Routine
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Generated based on your core risks to restructure your future
          timeline.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 relative z-10 flex-1 w-full"
      >
        {/* Morning */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-b from-orange-950/40 to-transparent border border-orange-500/20 rounded-3xl p-5 sm:p-6 md:p-8 group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex flex-col h-full"
        >
          <div className="absolute -top-10 -right-10 text-orange-500/10 group-hover:scale-110 transition-transform duration-500">
            <Sun size={100} className="sm:w-[120px] sm:h-[120px]" />
          </div>
          <div className="flex items-center gap-3 mb-6 sm:mb-8 relative z-10">
            <div className="p-2.5 sm:p-3 bg-orange-500/20 text-orange-400 rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.3)]">
              <Coffee size={24} className="sm:w-[28px] sm:h-[28px]" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-orange-50">
              Morning
            </h3>
          </div>
          <ul className="space-y-3 sm:space-y-5 relative z-10 flex-1">
            {routine?.morning?.map((item, idx) => (
              <li
                key={idx}
                className="text-sm sm:text-base text-gray-300 flex items-start gap-3 sm:gap-4 bg-black/30 p-3 sm:p-4 rounded-xl border border-white/5"
              >
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-orange-500 mt-1.5 sm:mt-2 shrink-0 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Afternoon */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-b from-blue-950/40 to-transparent border border-blue-500/20 rounded-3xl p-5 sm:p-6 md:p-8 group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex flex-col h-full"
        >
          <div className="absolute -top-10 -right-10 text-blue-500/10 group-hover:scale-110 transition-transform duration-500">
            <Activity size={100} className="sm:w-[120px] sm:h-[120px]" />
          </div>
          <div className="flex items-center gap-3 mb-6 sm:mb-8 relative z-10">
            <div className="p-2.5 sm:p-3 bg-blue-500/20 text-blue-400 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <Calendar size={24} className="sm:w-[28px] sm:h-[28px]" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-50">
              Afternoon
            </h3>
          </div>
          <ul className="space-y-3 sm:space-y-5 relative z-10 flex-1">
            {routine?.afternoon?.map((item, idx) => (
              <li
                key={idx}
                className="text-sm sm:text-base text-gray-300 flex items-start gap-3 sm:gap-4 bg-black/30 p-3 sm:p-4 rounded-xl border border-white/5"
              >
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500 mt-1.5 sm:mt-2 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Evening */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-b from-indigo-950/40 to-transparent border border-indigo-500/20 rounded-3xl p-5 sm:p-6 md:p-8 group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex flex-col h-full"
        >
          <div className="absolute -top-10 -right-10 text-indigo-500/10 group-hover:scale-110 transition-transform duration-500">
            <Moon size={100} className="sm:w-[120px] sm:h-[120px]" />
          </div>
          <div className="flex items-center gap-3 mb-6 sm:mb-8 relative z-10">
            <div className="p-2.5 sm:p-3 bg-indigo-500/20 text-indigo-400 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.3)]">
              <Moon size={24} className="sm:w-[28px] sm:h-[28px]" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-indigo-50">
              Evening
            </h3>
          </div>
          <ul className="space-y-3 sm:space-y-5 relative z-10 flex-1">
            {routine?.evening?.map((item, idx) => (
              <li
                key={idx}
                className="text-sm sm:text-base text-gray-300 flex items-start gap-3 sm:gap-4 bg-black/30 p-3 sm:p-4 rounded-xl border border-white/5"
              >
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-indigo-500 mt-1.5 sm:mt-2 shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* General Guidelines */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-b from-emerald-950/40 to-transparent border border-emerald-500/20 rounded-3xl p-5 sm:p-6 md:p-8 group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex flex-col h-full"
        >
          <div className="absolute -top-10 -right-10 text-emerald-500/10 group-hover:scale-110 transition-transform duration-500">
            <Brain size={100} className="sm:w-[120px] sm:h-[120px]" />
          </div>
          <div className="flex items-center gap-3 mb-6 sm:mb-8 relative z-10">
            <div className="p-2.5 sm:p-3 bg-emerald-500/20 text-emerald-400 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Loader2 size={24} className="sm:w-[28px] sm:h-[28px]" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-emerald-50">
              Core Rules
            </h3>
          </div>
          <ul className="space-y-3 sm:space-y-5 relative z-10 flex-1">
            {routine?.guidelines?.map((item, idx) => (
              <li
                key={idx}
                className="text-sm sm:text-base text-gray-300 flex items-start gap-3 sm:gap-4 bg-black/30 p-3 sm:p-4 rounded-xl border border-white/5"
              >
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 mt-1.5 sm:mt-2 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                <span className="leading-relaxed font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      <div className="mt-8 sm:mt-12 text-center relative z-10 flex flex-col items-center px-4">
        <p className="text-gray-500 text-xs sm:text-sm italic mb-6 sm:mb-8 max-w-lg mx-auto">
          This path mitigates{" "}
          {data.currentPath.aiInsights.compoundingRisks.length > 0
            ? "your core risks"
            : "potential friction"}{" "}
          and maximizes long-term stability. Let's make 2029 remarkable.
        </p>

        {!activeChallenge && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowChallengeModal(true)}
            className="group relative flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-500 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-full font-black text-lg sm:text-xl md:text-2xl transition-all shadow-lg hover:shadow-xl overflow-hidden w-full sm:w-auto"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
            <Trophy
              size={24}
              className="sm:w-[28px] sm:h-[28px] text-emerald-100 drop-shadow-md"
            />
            Ready To Win! 🚀
          </motion.button>
        )}
      </div>

      {/* Challenge Tracker Render */}
      {activeChallenge && (
        <div className="mt-8 sm:mt-16 relative z-10 w-full animate-fade-in-up">
          <ChallengeTracker
            duration={activeChallenge}
            onReset={resetChallenge}
          />
        </div>
      )}

      {/* Challenge Selection Modal Overlay */}
      <AnimatePresence>
        {showChallengeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0f1a]/80 backdrop-blur-xl p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-950 border border-gray-800 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 max-w-2xl w-full shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative overflow-hidden my-auto"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>

              <button
                onClick={() => setShowChallengeModal(false)}
                className="absolute top-4 sm:top-6 right-4 sm:right-6 text-gray-500 hover:text-white bg-gray-900 border border-gray-800 hover:bg-gray-800 p-2 rounded-full transition-all"
              >
                <X size={20} className="sm:w-[24px] sm:h-[24px]" />
              </button>

              <div className="text-center mb-6 sm:mb-10 relative z-10 mt-4 sm:mt-0">
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl sm:rounded-2xl border border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                    <Zap
                      size={32}
                      className="sm:w-[40px] sm:h-[40px] text-yellow-400"
                    />
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2 sm:mb-4">
                  Select Your Protocol
                </h2>
                <p className="text-gray-400 text-sm sm:text-lg max-w-md mx-auto">
                  Commit to a timeframe to rewire your habits using the "Don't
                  Break The Chain" method.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 relative z-10 max-h-[50vh] sm:max-h-none overflow-y-auto sm:overflow-visible pr-2 sm:pr-0">
                {/* 30 Days */}
                <button
                  onClick={() => startChallenge(30)}
                  className="group bg-[#131b2c] border border-gray-800 hover:border-blue-500 hover:bg-gradient-to-b hover:from-blue-900/40 hover:to-[#131b2c] rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 shadow-sm sm:shadow-lg flex flex-col items-center justify-center min-h-[140px] sm:min-h-[auto]"
                >
                  <h3 className="text-2xl sm:text-3xl font-black text-blue-400 mb-1 sm:mb-2">
                    30
                    <span className="text-sm sm:text-lg text-blue-400/50">
                      D
                    </span>
                  </h3>
                  <div className="text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider mb-1 sm:mb-2">
                    Quick Start
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    Build initial momentum and break basic friction.
                  </p>
                  <div className="hidden sm:flex mt-4 w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 mx-auto flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={18} />
                  </div>
                </button>

                {/* 90 Days */}
                <button
                  onClick={() => startChallenge(90)}
                  className="group relative bg-[#131b2c] border border-purple-500/50 hover:border-purple-400 hover:bg-gradient-to-b hover:from-purple-900/40 hover:to-[#131b2c] rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center transition-all duration-300 sm:hover:-translate-y-2 shadow-[0_0_30px_rgba(168,85,247,0.15)] overflow-hidden scale-100 sm:scale-105 flex flex-col items-center justify-center min-h-[140px] sm:min-h-[auto] mt-2 sm:mt-0"
                >
                  <div className="absolute top-0 right-0 left-0 bg-purple-500 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest py-1">
                    Recommended
                  </div>
                  <div className="mt-4 sm:mt-4">
                    <h3 className="text-3xl sm:text-4xl font-black text-purple-400 mb-1 sm:mb-2">
                      90
                      <span className="text-sm sm:text-lg text-purple-400/50">
                        D
                      </span>
                    </h3>
                    <div className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-1 sm:mb-2">
                      Rewire
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-400">
                      Deep behavioral change. Enough time to form lasting neural
                      pathways.
                    </p>
                    <div className="hidden sm:flex mt-4 w-8 h-8 rounded-full bg-purple-500 text-white mx-auto flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_15px_rgba(168,85,247,0.6)]">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </button>

                {/* 180 Days */}
                <button
                  onClick={() => startChallenge(180)}
                  className="group bg-[#131b2c] border border-gray-800 hover:border-rose-500 hover:bg-gradient-to-b hover:from-rose-900/40 hover:to-[#131b2c] rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 shadow-sm sm:shadow-lg flex flex-col items-center justify-center min-h-[140px] sm:min-h-[auto] mt-2 sm:mt-0"
                >
                  <h3 className="text-2xl sm:text-3xl font-black text-rose-400 mb-1 sm:mb-2">
                    180
                    <span className="text-sm sm:text-lg text-rose-400/50">
                      D
                    </span>
                  </h3>
                  <div className="text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider mb-1 sm:mb-2">
                    Transformation
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    Complete architectural rewrite of your daily identity.
                  </p>
                  <div className="hidden sm:flex mt-4 w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={18} />
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ActionPlan;
