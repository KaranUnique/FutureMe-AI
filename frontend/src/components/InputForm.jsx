import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Briefcase, Target, 
  Monitor, Moon, Activity, Apple, BrainCircuit, 
  TrendingUp, CreditCard, BookOpen, 
  ChevronRight, ChevronLeft, Sparkles, Check
} from 'lucide-react';

const InputForm = ({ onSubmit, loading }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: 25,
    screenTime: 6,
    sleepHours: 7,
    exerciseFreq: 2,
    dietQuality: 5,
    savingsRate: 10,
    debtLevel: 5000,
    learningHours: 2,
    stressLevel: 6,
    jobRole: 'Software Engineer',
    skillFocus: 'Full Stack Development'
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' || type === 'range' ? Number(value) : value
    }));
  };

  const setQualitativeValue = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 3) {
      onSubmit(formData);
    } else {
      handleNext();
    }
  };

  const slideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4">
      {/* Progress Stepper */}
      <div className="flex justify-between items-center mb-10 relative px-4">
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1 bg-gray-800 rounded-full z-0"></div>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full z-0 transition-all duration-500" style={{ width: `calc(${((step - 1) / 2) * 100}% - 2rem)` }}></div>
        
        {[1, 2, 3].map((num) => (
          <div key={num} className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg transition-all duration-500 ${step >= num ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.6)] scale-110' : 'bg-gray-900 text-gray-600 border-2 border-gray-800'}`}>
            {num}
          </div>
        ))}
      </div>

      <motion.div 
        className="bg-[#0b0f1a] border border-gray-800/80 p-8 md:p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden backdrop-blur-2xl"
      >
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"></div>
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative z-10 mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 tracking-tight">
            {step === 1 ? 'Your Identity' : step === 2 ? 'Body & Mind' : 'Wealth & Growth'}
          </h2>
          <p className="text-gray-400 mt-3 text-sm md:text-base font-medium">
            {step === 1 ? 'Define your current standing.' : step === 2 ? 'How are you treating your biological machine?' : 'Optimize your resources and adaptability.'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="relative z-10 min-h-[380px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                <InputGroup icon={User} label="Current Age" name="age" type="number" value={formData.age} onChange={handleChange} min={18} max={100} color="blue" />
                <InputGroup icon={Briefcase} label="Current Job Role" name="jobRole" type="text" value={formData.jobRole} onChange={handleChange} placeholder="e.g. Software Engineer" color="purple" />
                <InputGroup icon={Target} label="Primary Skill Focus" name="skillFocus" type="text" value={formData.skillFocus} onChange={handleChange} placeholder="e.g. Machine Learning, Sales" color="cyan" />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup icon={Moon} label="Sleep (hours/night)" name="sleepHours" type="number" value={formData.sleepHours} onChange={handleChange} min={0} max={24} color="blue" />
                  <InputGroup icon={Monitor} label="Screen Time (hours/day)" name="screenTime" type="number" value={formData.screenTime} onChange={handleChange} min={0} max={24} color="indigo" />
                </div>
                <SliderGroup icon={Activity} label="Exercise Frequency" name="exerciseFreq" value={formData.exerciseFreq} onChange={handleChange} min={0} max={7} formatVal={(v) => `${v} days/wk`} color="blue" />
                
                {/* Descriptive Diet Quality UI */}
                <QualitativeSelector
                  icon={Apple}
                  label="Diet Identity"
                  color="green"
                  options={[
                    { value: 2, label: "Fast Food Heavy", desc: "Mostly takeout and processed meals" },
                    { value: 5, label: "Average", desc: "Mix of home-cooked and convenience food" },
                    { value: 9, label: "Clean & Planned", desc: "Mostly whole foods, balanced macros" }
                  ]}
                  currentValue={formData.dietQuality}
                  onSelect={(v) => setQualitativeValue('dietQuality', v)}
                />

                {/* Descriptive Stress Level UI */}
                <QualitativeSelector
                  icon={BrainCircuit}
                  label="Daily Stress State"
                  color="rose"
                  options={[
                    { value: 3, label: "Relaxed", desc: "Low pressure, manageable deadlines" },
                    { value: 6, label: "Moderate", desc: "Busy, occasional pressure peaks" },
                    { value: 9, label: "High Anxiety", desc: "Constant fire-fighting, poor work-life balance" }
                  ]}
                  currentValue={formData.stressLevel}
                  onSelect={(v) => setQualitativeValue('stressLevel', v)}
                />

              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                <InputGroup icon={TrendingUp} label="Monthly Savings Rate (%)" name="savingsRate" type="number" value={formData.savingsRate} onChange={handleChange} min={0} max={100} color="emerald" />
                <InputGroup icon={CreditCard} label="Estimated Debt ($)" name="debtLevel" type="number" value={formData.debtLevel} onChange={handleChange} min={0} step={100} color="rose" />
                <SliderGroup icon={BookOpen} label="Learning Time" name="learningHours" value={formData.learningHours} onChange={handleChange} min={0} max={40} formatVal={(v) => `${v} hrs/wk`} color="blue" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-800/80">
            <button
              type="button"
              onClick={handleBack}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-white hover:bg-gray-800 active:scale-95'}`}
            >
              <ChevronLeft size={20} /> Back
            </button>

            {step < 3 ? (
              <button
                type="submit"
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-xl font-medium transition-all border border-gray-700 hover:border-gray-500 shadow-lg active:scale-95"
              >
                Next Step <ChevronRight size={20} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(99,102,241,0.6)] disabled:opacity-70 disabled:pointer-events-none overflow-hidden active:scale-95"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
                {loading ? (
                  <span className="flex items-center gap-2 animate-pulse">Running Simulation...</span>
                ) : (
                  <>
                    <Sparkles size={20} className="text-blue-200" /> Generate Future Trajectory
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// Subcomponents for premium feel
const colorMap = {
  blue: 'text-blue-400 group-focus-within:text-blue-300',
  purple: 'text-purple-400 group-focus-within:text-purple-300',
  cyan: 'text-cyan-400 group-focus-within:text-cyan-300',
  indigo: 'text-indigo-400 group-focus-within:text-indigo-300',
  emerald: 'text-emerald-400 group-focus-within:text-emerald-300',
  rose: 'text-rose-400 group-focus-within:text-rose-300',
  green: 'text-emerald-400 group-focus-within:text-emerald-300'
};

const ringMap = {
  blue: 'focus:border-blue-500 focus:ring-blue-500/20',
  purple: 'focus:border-purple-500 focus:ring-purple-500/20',
  cyan: 'focus:border-cyan-500 focus:ring-cyan-500/20',
  indigo: 'focus:border-indigo-500 focus:ring-indigo-500/20',
  emerald: 'focus:border-emerald-500 focus:ring-emerald-500/20',
  rose: 'focus:border-rose-500 focus:ring-rose-500/20',
  green: 'focus:border-emerald-500 focus:ring-emerald-500/20'
};

const InputGroup = ({ icon: Icon, label, name, type, value, onChange, placeholder, color="blue", ...props }) => (
  <div className="flex flex-col gap-2.5 relative group">
    <label className="text-sm font-semibold text-gray-300 ml-1 flex items-center gap-2.5 transition-colors">
      <span className={`p-1.5 rounded-md bg-gray-800/50 border border-gray-700/50 ${colorMap[color]}`}>
        <Icon size={16} />
      </span>
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`relative w-full bg-[#131b2c] border border-gray-700/80 ${ringMap[color]} focus:ring-4 rounded-xl px-4 py-3.5 text-white outline-none transition-all duration-300 placeholder:text-gray-600 font-medium shadow-inner`}
        {...props}
      />
    </div>
  </div>
);

const sliderGradientMap = {
  blue: 'from-blue-600 to-cyan-400',
  green: 'from-emerald-600 to-green-400',
  rose: 'from-rose-600 to-red-400'
};

const textColorMap = {
  blue: 'text-blue-400',
  green: 'text-emerald-400',
  rose: 'text-rose-400'
};

const SliderGroup = ({ icon: Icon, label, name, value, onChange, min, max, formatVal, color = "blue" }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const gradient = sliderGradientMap[color];
  const textColor = textColorMap[color];

  return (
    <div className="flex flex-col gap-4 group mt-2">
      <div className="flex justify-between items-end">
        <label className="text-sm font-semibold text-gray-300 ml-1 flex items-center gap-2.5">
          <span className={`p-1.5 rounded-md bg-gray-800/50 border border-gray-700/50 ${textColor}`}>
            <Icon size={16} />
          </span>
          {label}
        </label>
        <span className={`text-sm font-bold bg-[#131b2c] ${textColor} px-3 py-1 rounded-lg border border-gray-700 shadow-sm`}>
          {formatVal ? formatVal(value) : value}
        </span>
      </div>
      <div className="relative h-2.5 bg-[#131b2c] rounded-full border border-gray-800/80 overflow-visible mt-1">
        <div 
          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-100 ease-out`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] border-2 border-gray-100 scale-[1.15] scale-x-[1.15] cursor-grab active:cursor-grabbing hover:scale-125 transition-transform duration-200"></div>
        </div>
        <input
          type="range"
          name={name}
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
      </div>
    </div>
  );
};

const QualitativeSelector = ({ icon: Icon, label, options, color, currentValue, onSelect }) => {
  const textColor = textColorMap[color];
  const activeClassMap = {
    green: 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]',
    rose: 'border-rose-500 bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
  };

  return (
    <div className="flex flex-col gap-3 group mt-2">
      <label className="text-sm font-semibold text-gray-300 ml-1 flex items-center gap-2.5 mb-1">
        <span className={`p-1.5 rounded-md bg-gray-800/50 border border-gray-700/50 ${textColor}`}>
          <Icon size={16} />
        </span>
        {label}
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {options.map((opt) => {
          const isActive =
            (opt.value === currentValue) ||
            // Fallback matching logic if user lands between presets somehow
            (opt.value === 2 && currentValue <= 3) ||
            (opt.value === 5 && currentValue > 3 && currentValue <= 6) ||
            (opt.value === 9 && currentValue > 6);

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              className={`relative flex flex-col items-start p-4 rounded-xl border text-left transition-all ${
                isActive 
                  ? activeClassMap[color] 
                  : 'border-gray-700/80 bg-[#131b2c] hover:border-gray-500 hover:bg-gray-800'
              }`}
            >
              {isActive && (
                <div className={`absolute top-3 right-3 ${textColor}`}>
                  <Check size={16} strokeWidth={3} />
                </div>
              )}
              <span className={`font-bold text-sm mb-1 ${isActive ? 'text-white' : 'text-gray-300'}`}>
                {opt.label}
              </span>
              <span className="text-xs text-gray-500 leading-tight pr-4">
                {opt.desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default InputForm;
