import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartPulse,
  Wallet,
  Rocket,
  Flame,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react";
import TrendGraph from "./TrendGraph";
import AvatarHuman from "./AvatarHuman";
import ActionPlan from "./ActionPlan";

const Dashboard = ({ data }) => {
  const [showImproved, setShowImproved] = useState(false);
  const [showActionPlan, setShowActionPlan] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const currentView = showImproved ? data.improvedPath : data.currentPath;
  const { scores, aiInsights } = currentView;

  // Determine the interactive character's emotion
  let characterEmotion = "neutral";
  if (currentSlide === 1 || currentSlide === 2) {
    if (scores.overallStability >= 60) {
      characterEmotion = "happy";
    } else {
      characterEmotion = "sad";
    }
  } else if (currentSlide === 3) {
    characterEmotion = "thinking";
  } else if (currentSlide === 4) {
    characterEmotion = "happy";
  }

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] },
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] },
    }),
  };

  // --- Slide Content --- //

  const slideIntro = (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-8 px-4 w-full relative z-10">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.6)] animate-pulse">
        <TrendingUp className="text-white" size={48} />
      </div>
      <div>
        <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-4 drop-shadow-md">
          Analysis Complete
        </h2>
        <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
          We have processed your data and simulated your trajectory for the year{" "}
          <span className="text-white font-bold">2029</span>. Are you ready to
          see your future?
        </p>
      </div>
      <button
        onClick={nextSlide}
        className="mt-8 px-8 py-4 bg-white text-black rounded-full font-bold text-lg flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] z-20"
      >
        <Play fill="currentColor" size={20} /> Begin Presentation
      </button>
    </div>
  );

  const slideMetrics = (
    <div className="flex flex-col h-full justify-center space-y-4 md:space-y-6 w-full">
      <div className="text-center mb-2">
        <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-2 shadow-sm">
          Core Life Metrics
        </h3>
        <p className="text-gray-400 text-base md:text-lg">
          Your projected baseline across critical domains.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full max-w-4xl mx-auto">
        <MetricCard
          title="Health Risk"
          value={scores.healthRisk}
          icon={HeartPulse}
          invert={true}
        />
        <MetricCard
          title="Financial Stability"
          value={scores.financialStability}
          icon={Wallet}
        />
        <MetricCard
          title="Career Growth"
          value={scores.careerGrowth}
          icon={Rocket}
        />
        <MetricCard
          title="Burnout Risk"
          value={scores.burnoutRisk}
          icon={Flame}
          invert={true}
        />
      </div>
    </div>
  );

  const slideTrajectory = (
    <div className="flex flex-col h-full justify-center w-full space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-3 md:gap-4 w-full max-w-5xl mx-auto">
        <div>
          <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-1 shadow-sm">
            Trajectory Model
          </h3>
          <p className="text-gray-400 text-sm md:text-base">
            Overall stability index projection over the next 4 years.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#131b2c]/90 backdrop-blur-md px-4 py-2 md:px-5 md:py-3 rounded-[1rem] border border-gray-800 shadow-xl">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Index
          </div>
          <div
            className={`text-4xl font-black transition-colors duration-500 ${showImproved ? "text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" : "text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"}`}
          >
            {scores.overallStability}
          </div>
          <div className="text-lg text-gray-500 font-bold mt-1">/ 100</div>
        </div>
      </div>
      <div className="w-full max-w-5xl mx-auto bg-[#0b0f1a]/60 p-4 rounded-3xl border border-gray-800/80 backdrop-blur-md shadow-2xl relative z-10">
        <TrendGraph
          showImproved={showImproved}
          data={data}
          key={showImproved ? "graph-improved" : "graph-current"}
        />
      </div>
    </div>
  );

  const slideAnalysis = (
    <div className="flex flex-col h-full justify-center w-full max-w-5xl mx-auto space-y-3 -mt-8">
      <div className="text-center mb-1">
        <h3 className="text-xl md:text-3xl font-extrabold text-white mb-2 flex justify-center items-center gap-2 shadow-sm">
          <Lightbulb className="text-purple-400" size={24} /> AI Deep Analysis
        </h3>
        <div className="flex justify-center">
          <p className="text-gray-300 text-sm md:text-base font-medium max-w-3xl leading-snug italic border-l-4 border-purple-500 pl-3 text-left bg-purple-500/10 p-2 rounded-r-xl shadow-inner">
            "{aiInsights.summary}"
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
        <div className="bg-rose-950/30 border border-rose-500/20 p-8 rounded-xl backdrop-blur-md relative overflow-hidden group shadow-md">
          <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 rounded-full blur-[20px] group-hover:bg-rose-500/20 transition-all"></div>
          <h4 className="font-bold text-rose-400 mb-3 text-xs sm:text-sm tracking-wider uppercase flex items-center gap-1.5">
            <AlertTriangle size={14} /> Compounding Risks
          </h4>
          <ul className="space-y-2 relative z-10">
            {aiInsights.compoundingRisks.map((risk, i) => (
              <li
                key={i}
                className="text-sm text-gray-300 flex items-start gap-2"
              >
                <div className="w-1 h-1 rounded-full bg-rose-500 mt-1.5 shrink-0 shadow-[0_0_4px_rgba(244,63,94,0.8)]"></div>
                <span className="leading-snug">{risk}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-emerald-950/30 border border-emerald-500/20 p-8 rounded-xl backdrop-blur-md relative overflow-hidden group shadow-md">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-full blur-[20px] group-hover:bg-emerald-500/20 transition-all"></div>
          <h4 className="font-bold text-emerald-400 mb-3 text-xs sm:text-sm tracking-wider uppercase flex items-center gap-1.5">
            <CheckCircle2 size={14} /> Actionable Plan
          </h4>
          <ul className="space-y-2 relative z-10">
            {aiInsights.behavioralImprovements.map((improvement, i) => (
              <li
                key={i}
                className="text-sm text-gray-300 flex items-start gap-2"
              >
                <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0 shadow-[0_0_4px_rgba(16,185,129,0.8)]"></div>
                <span className="leading-snug">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const slideLetter = (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-4xl mx-auto px-4 z-10">
      <div
        className={`relative w-full bg-[#0b0f1a]/90 backdrop-blur-3xl border border-gray-700/50 p-6 md:p-8 rounded-[2rem] overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center`}
      >
        <div
          className={`absolute top-0 right-0 w-full h-full opacity-10 blur-[100px] pointer-events-none transition-all duration-1000 ${showImproved ? "bg-gradient-to-r from-emerald-500 to-blue-600" : "bg-gradient-to-r from-blue-600 to-purple-600"}`}
        ></div>
        <div
          className={`absolute left-0 top-0 w-2 h-full transition-all duration-1000 ${showImproved ? "bg-gradient-to-b from-emerald-400 to-blue-500" : "bg-gradient-to-b from-blue-500 to-purple-600"}`}
        ></div>

        <div className="relative z-10 w-full">
          <div className="flex justify-center mb-4">
            <div
              className={`p-3 rounded-2xl border shadow-xl transition-all duration-700 ${showImproved ? "bg-emerald-950/50 border-emerald-500/30 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]" : "bg-blue-950/50 border-blue-500/30 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]"}`}
            >
              <MessageSquare size={24} />
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-center text-white shadow-sm">
            A Message From 2029
          </h3>

          <div className="relative mb-6">
            <div className="absolute -top-4 -left-2 text-4xl text-gray-800/60 font-serif z-0">
              "
            </div>
            <p className="text-gray-300 text-base md:text-lg leading-snug font-serif relative z-10 px-6 text-center italic font-light drop-shadow-md">
              {aiInsights.letterFromFuture}
            </p>
            <div className="absolute -bottom-6 right-0 text-4xl text-gray-800/60 font-serif z-0">
              "
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center gap-4 w-full">
            <div className="flex items-center justify-center gap-4 w-full">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gray-500"></div>
              <span className="font-bold text-gray-400 tracking-widest uppercase text-xs">
                Future You
              </span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gray-500"></div>
            </div>

            <button
              onClick={() => setShowActionPlan(true)}
              className="mt-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-full font-bold text-sm flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:scale-105 active:scale-95"
            >
              <Sparkles size={16} /> Generate Transformation Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const slides = [
    slideIntro,
    slideMetrics,
    slideTrajectory,
    slideAnalysis,
    slideLetter,
  ];

  if (showActionPlan) {
    return <ActionPlan data={data} onBack={() => setShowActionPlan(false)} />;
  }

  return (
    <div className="w-full max-w-7xl mx-auto min-h-[100dvh] lg:h-[75vh] lg:min-h-[600px] mt-0 lg:mt-4 relative flex flex-col bg-[#0b0f1a]/80 backdrop-blur-xl rounded-none lg:rounded-[2.5rem] lg:border border-gray-800/80 lg:shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden lg:overflow-hidden overflow-y-auto">
      {/* Top Header Navigation (Visible after Intro) */}
      <AnimatePresence>
        {currentSlide > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-0 left-0 w-full p-6 z-50 flex justify-between items-center pointer-events-none"
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="text-gray-500" size={24} />
              <span className="font-bold text-gray-500 tracking-wider uppercase text-sm hidden sm:block">
                Future Projection 2029
              </span>
            </div>

            <div className="flex bg-[#131b2c] p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-gray-800 pointer-events-auto shadow-xl">
              <button
                onClick={() => setShowImproved(false)}
                className={`px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${!showImproved ? "bg-gray-800 text-white shadow-md" : "text-gray-500 hover:text-gray-300"}`}
              >
                Current Path
              </button>
              <button
                onClick={() => setShowImproved(true)}
                className={`px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 sm:gap-2 ${showImproved ? "bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "text-gray-500 hover:text-gray-300"}`}
              >
                <Sparkles
                  size={14}
                  className={`sm:w-[16px] sm:h-[16px] ${showImproved ? "text-emerald-400 animate-pulse" : ""}`}
                />
                Improved Habits
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Slide Content Area with 3D Integration */}
      <div className="flex-1 relative lg:overflow-hidden flex flex-col lg:flex-row w-full h-full pb-24 lg:pb-0">
        {/* Left Side: SVG Avatar (Sticky/Persistent) */}
        <div className="w-full lg:w-1/3 xl:w-2/5 h-56 sm:h-64 lg:h-full relative z-0 lg:z-10 bg-gradient-to-b lg:bg-gradient-to-r from-[#0b0f1a] to-transparent shrink-0 pt-16 lg:pt-0">
          <AvatarHuman emotion={characterEmotion} />
        </div>

        {/* Right Side: Text & Data Slides */}
        <div className="flex-1 relative z-20 w-full h-full lg:py-24 px-4 md:px-8 xl:px-12 flex flex-col items-center justify-start lg:justify-center">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex justify-center py-6 lg:py-0 pointer-events-none"
            >
              <div className="pointer-events-auto w-full">
                {slides[currentSlide]}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Navigation Controls */}
      <div className="fixed lg:absolute bottom-0 left-0 w-full p-4 lg:p-6 z-50 flex justify-between items-center bg-gradient-to-t from-[#0b0f1a] via-[#0b0f1a]/95 to-transparent pt-12 pb-6 lg:pb-6 pointer-events-none">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base transition-all pointer-events-auto ${currentSlide === 0 ? "opacity-0 pointer-events-none" : "text-white bg-gray-800 hover:bg-gray-700 hover:scale-105 active:scale-95 border border-gray-700"}`}
        >
          <ChevronLeft size={20} /> Back
        </button>

        {/* Slide Indicators */}
        <div className="flex gap-3 pointer-events-auto">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentSlide ? 1 : -1);
                setCurrentSlide(idx);
              }}
              className={`h-2.5 rounded-full transition-all duration-500 ${idx === currentSlide ? "w-10 bg-white" : "w-2.5 bg-gray-700 hover:bg-gray-500"}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={`flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base transition-all pointer-events-auto ${currentSlide === slides.length - 1 ? "opacity-0 pointer-events-none" : "bg-white/10 hover:bg-white text-gray-300 hover:text-black border border-white/20 hover:scale-105 active:scale-95"}`}
        >
          Next <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

// Subcomponents

const MetricCard = ({ title, value, icon: Icon, invert }) => {
  const isGood = invert ? value < 40 : value > 60;
  const isBad = invert ? value > 70 : value < 40;

  const statusColor = isBad
    ? "text-rose-500"
    : isGood
      ? "text-emerald-500"
      : "text-yellow-500";
  const statusBg = isBad
    ? "bg-rose-500/10 border-rose-500/30"
    : isGood
      ? "bg-emerald-500/10 border-emerald-500/30"
      : "bg-yellow-500/10 border-yellow-500/30";
  const shadowColor = isBad
    ? "shadow-[0_0_20px_rgba(244,63,94,0.15)]"
    : isGood
      ? "shadow-[0_0_20px_rgba(16,185,129,0.15)]"
      : "shadow-[0_0_20px_rgba(234,179,8,0.15)]";

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`bg-[#0b0f1a]/80 backdrop-blur-xl border border-gray-800 p-4 md:p-5 rounded-[1.5rem] relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 ${shadowColor}`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className={`p-3 rounded-xl border ${statusBg} ${statusColor}`}>
          <Icon size={24} />
        </div>
        <div className="text-right">
          <div className="text-3xl md:text-4xl font-black text-white track-tight">
            {value}
          </div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">
            Score
          </div>
        </div>
      </div>
      <h4 className="text-lg font-bold text-gray-200">{title}</h4>

      <div className="mt-4 h-2 w-full bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${isBad ? "bg-rose-500" : isGood ? "bg-emerald-500" : "bg-yellow-500"}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </motion.div>
  );
};

export default Dashboard;
