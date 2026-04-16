import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', icon: Icon, ...props }) => {
  const variants = {
    primary: 'px-6 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-indigo-600 dark:text-white shadow-md hover:bg-slate-800 dark:hover:bg-indigo-500',
    outline: 'px-6 py-2.5 rounded-xl border border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5',
    neon: 'px-6 py-2.5 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5',
    glass: 'px-6 py-2.5 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-800 dark:text-slate-200 backdrop-blur-md hover:bg-slate-50 dark:hover:bg-white/10 shadow-sm',
    animated: 'animated-cta-button'
  };

  const isAnimated = variant === 'animated';

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {isAnimated && (
        <div className="icon-wrapper">
          {Icon ? <Icon size={20} /> : (
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path>
            </svg>
          )}
        </div>
      )}
    </motion.button>
  );
};

export default Button;
