import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    // Primary: Apple-esque solid contrast (Black in Light, Indigo in Dark)
    primary: 'bg-slate-900 text-white dark:bg-indigo-600 dark:text-white shadow-md hover:bg-slate-800 dark:hover:bg-indigo-500',
    // Outline: Clean structural border
    outline: 'border border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5',
    // Neon: High converted action CTA
    neon: 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5',
    // Glass: Secondary action
    glass: 'bg-white/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-800 dark:text-slate-200 backdrop-blur-md hover:bg-slate-50 dark:hover:bg-white/10 shadow-sm',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
