import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AvatarHuman = ({ emotion }) => {
  // Map emotions to the generated image paths
  const imageMap = {
    neutral: '/avatars/neutral.png',
    happy: '/avatars/happy.png',
    sad: '/avatars/sad.png',
    thinking: '/avatars/thinking.png'
  };

  const currentImage = imageMap[emotion] || imageMap.neutral;

  return (
    <div className="w-full h-full min-h-[200px] sm:min-h-[300px] lg:min-h-0 flex justify-center items-center relative overflow-hidden rounded-xl lg:rounded-r-none lg:rounded-l-2xl border border-[#1e293b]">
      {/* Background container for the avatar */}
      <div className="absolute inset-0 bg-[#0b0f1a]">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentImage}
            src={currentImage}
            alt={`AI Avatar looking ${emotion}`}
            initial={{ opacity: 0, scale: 1.05, filter: "brightness(0.5) blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "brightness(1) blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "brightness(0.5) blur(4px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full object-cover origin-center"
          />
        </AnimatePresence>
      </div>

      {/* Vignette overlay to blend character into the dark dashboard */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f1a] via-transparent to-[#0b0f1a] opacity-80 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0b0f1a] lg:from-[#0b0f1a] lg:via-transparent lg:to-[#0b0f1a] opacity-60 pointer-events-none"></div>

      {/* Floating particles/icons based on emotion for extra flair */}
      <AnimatePresence mode="wait">
         {emotion === 'thinking' && (
           <motion.div 
             key="think"
             initial={{ opacity: 0, y: 10, scale: 0 }}
             animate={{ opacity: 1, y: -20, scale: 1 }}
             exit={{ opacity: 0, scale: 0 }}
             className="absolute top-8 right-8 text-3xl drop-shadow-[0_0_10px_rgba(14,165,233,0.8)]"
           >
             <span className="animate-pulse">💡</span>
           </motion.div>
         )}
         {emotion === 'happy' && (
           <motion.div 
             key="happy"
             initial={{ opacity: 0, scale: 0 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0 }}
             className="absolute top-8 left-8 text-3xl drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]"
           >
             
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default AvatarHuman;
