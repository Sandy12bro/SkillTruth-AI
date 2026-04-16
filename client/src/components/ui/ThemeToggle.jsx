import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="relative flex items-center ml-4">
      <button
        onClick={toggleTheme}
        className={`
          relative w-16 h-8 rounded-full transition-colors duration-500 flex items-center p-1
          ${isDark ? 'bg-indigo-950/40' : 'bg-amber-100/50 border border-amber-400/50'}
          shadow-inner overflow-hidden cursor-pointer group
        `}
        aria-label="Toggle Theme"
      >
        {/* Track Glow Effect */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-20' : 'opacity-0'} bg-indigo-500 blur-xl`} />
        
        {/* Sliding Indicator */}
        <motion.div
          initial={false}
          animate={{ x: isDark ? 32 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`
            w-6 h-6 rounded-full flex items-center justify-center z-10
            ${isDark ? 'bg-indigo-500 text-white' : 'bg-white text-amber-500 shadow-md'}
          `}
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Moon size={14} fill="currentColor" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ scale: 0, rotate: 90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Sun size={14} fill="currentColor" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Subtle background icons for the track */}
        <div className="absolute inset-0 flex justify-between px-3 items-center pointer-events-none opacity-20 transition-opacity group-hover:opacity-40">
           <Sun size={10} className={isDark ? 'text-indigo-400' : 'text-amber-600'} />
           <Moon size={10} className={isDark ? 'text-indigo-400' : 'text-amber-600'} />
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
