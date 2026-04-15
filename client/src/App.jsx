import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Analysis from './pages/Analysis';
import Interview from './pages/Interview';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-300 ml-4 flex items-center justify-center text-slate-700 dark:text-slate-300"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

const Navigation = () => {
  const location = useLocation();
  const getLinkClass = (path) => {
    const base = "hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors";
    return location.pathname === path 
      ? `text-indigo-600 dark:text-indigo-400 font-bold ${base}`
      : `text-slate-600 dark:text-slate-300 ${base}`;
  };

  return (
    <nav className="p-4 bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-md sticky top-0 z-[60] border-b border-slate-200 dark:border-slate-800 flex justify-between items-center transition-all duration-300">
      <Link to="/" className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-emerald-500">
        SkillTruth AI
      </Link>
      <div className="flex items-center">
        <div className="flex gap-8 text-sm font-semibold hidden md:flex">
          <Link to="/upload" className={getLinkClass('/upload')}>Upload</Link>
          <Link to="/analysis" className={getLinkClass('/analysis')}>Analysis</Link>
          <Link to="/interview" className={getLinkClass('/interview')}>Interview</Link>
          <Link to="/dashboard" className={getLinkClass('/dashboard')}>Dashboard</Link>
          <Link to="/history" className={getLinkClass('/history')}>History</Link>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen">
          <Navigation />
          <main className="container mx-auto max-w-6xl py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/interview" element={<Interview />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
