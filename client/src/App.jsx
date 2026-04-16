import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { FlowProvider } from './context/FlowContext';
import ProtectedRoute from './components/ProtectedRoute';
import GridBackground from './components/GridBackground';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Analysis from './pages/Analysis';
import Interview from './pages/Interview';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import { Sun, Moon, LogOut } from 'lucide-react';
import { useFlow } from './context/FlowContext';
import { trailingCursor, followingDotCursor } from 'cursor-effects';
import { useEffect, useRef } from 'react';

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
  const { resetFlow } = useFlow();
  
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
        <div className="flex gap-8 text-sm font-semibold hidden lg:flex">
          <Link to="/upload" className={getLinkClass('/upload')}>Upload</Link>
          <Link to="/analysis" className={getLinkClass('/analysis')}>Analysis</Link>
          <Link to="/interview" className={getLinkClass('/interview')}>Interview</Link>
          <Link to="/dashboard" className={getLinkClass('/dashboard')}>Dashboard</Link>
        </div>
        <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-4" />
        <button 
          onClick={() => { if(window.confirm('Reset current progress?')) resetFlow(); }}
          className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
          title="Reset Flow"
        >
          <LogOut size={20} />
        </button>
        <ThemeToggle />
      </div>
    </nav>
  );
};

/* 
  DEFENSIVE CURSOR MANAGER
  Safely initializes and destroys cursor effects to prevent 
  rendering issues during theme transitions.
*/
const CursorEffects = () => {
  const { theme } = useTheme();
  const instances = useRef({ tCursor: null, fDot: null });

  useEffect(() => {
    const cleanup = () => {
      try {
        if (instances.current.tCursor?.destroy) instances.current.tCursor.destroy();
        if (instances.current.fDot?.destroy) instances.current.fDot.destroy();
        
        // Manual DOM cleanup fallback for followingDotCursor
        const nodes = document.querySelectorAll('.following-dot-cursor');
        nodes.forEach(node => node.remove());
      } catch (e) {
        console.warn("Cleanup failed:", e);
      }
    };

    cleanup(); // Clean before every re-init

    const dotColor = theme === 'dark' ? "#22c55e" : "#6366f1";
    
    // Short delay to let the DOM settle after theme change
    const timer = setTimeout(() => {
      try {
        instances.current.tCursor = new trailingCursor({
          particles: 15,
          rate: 0.8,
          baseImageSrc: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAuSURBVBgZpcixDQAADMAwTP//vL+uC60vESmShD4UInmOq7uXqLru7r57iaq7i6g6pS0YAdD2fWAAAAAASUVORK5CYII=",
        });

        instances.current.fDot = new followingDotCursor({ 
          color: [dotColor] 
        });
      } catch (err) {
        console.warn("Failed to init cursor:", err);
      }
    }, 150);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, [theme]);

  return null;
};

function App() {
  return (
    <ThemeProvider>
      <FlowProvider>
        <CursorEffects />
        <Router>
          <div className="min-h-screen bg-transparent selection:bg-indigo-500/30 relative overflow-x-hidden">
            <GridBackground />
            <Navigation />
            <main className="container mx-auto max-w-6xl py-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/upload" element={<Upload />} />
                
                <Route 
                  path="/analysis" 
                  element={
                    <ProtectedRoute requiredStep="analysis">
                      <Analysis />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/interview" 
                  element={
                    <ProtectedRoute requiredStep="interview">
                      <Interview />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute requiredStep="dashboard">
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                
                <Route path="/history" element={<History />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </FlowProvider>
    </ThemeProvider>
  );
}

export default App;
