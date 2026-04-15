import React from 'react';

const Input = ({ label, className = '', error, ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm font-medium text-slate-600 dark:text-slate-400 ml-1">{label}</label>}
      <input
        className={`bg-white dark:bg-gray-800 border border-slate-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300 text-slate-900 dark:text-slate-100 ${className} ${error ? 'border-red-500' : ''}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500 ml-1">{error}</span>}
    </div>
  );
};

export default Input;
