import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
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
import { useEffect, useRef } from 'react';
import ThemeToggle from './components/ui/ThemeToggle';


const Navigation = () => {
  const location = useLocation();
  const { resetFlow } = useFlow();
  const [isOpen, setIsOpen] = React.useState(false);
  
  const getLinkClass = (path) => {
    const base = "hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300";
    return location.pathname === path 
      ? `text-indigo-600 dark:text-indigo-400 font-black ${base}`
      : `text-slate-600 dark:text-slate-300 ${base}`;
  };

  const navLinks = [
    { name: 'Upload', path: '/upload' },
    { name: 'Analysis', path: '/analysis' },
    { name: 'Interview', path: '/interview' },
    { name: 'Dashboard', path: '/dashboard' }
  ];

  return (
    <>
      <nav className="p-4 bg-white/80 dark:bg-[#030712]/80 backdrop-blur-xl sticky top-0 z-[60] border-b border-slate-200/60 dark:border-white/5 flex justify-between items-center transition-all duration-300">
        <Link to="/" className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-emerald-500">
          SkillTruth AI
        </Link>
        
        <div className="flex items-center gap-2">
          {/* Desktop Links */}
          <div className="hidden lg:flex gap-8 text-sm font-bold mr-6">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} className={getLinkClass(link.path)}>
                {link.name}
              </Link>
            ))}
          </div>

          <ThemeToggle />

          <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-2 hidden md:block" />
          
          <button 
            onClick={() => { if(window.confirm('Reset current progress?')) resetFlow(); }}
            className="p-2 text-slate-400 hover:text-rose-500 transition-colors hidden md:block"
            title="Reset Flow"
          >
            <LogOut size={20} />
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-slate-600 dark:text-slate-300 active:scale-95 transition-transform"
          >
            {isOpen ? <LogOut size={24} className="rotate-90" /> : <div className="space-y-1.5 w-6">
              <div className="h-0.5 w-full bg-current rounded-full" />
              <div className="h-0.5 w-full bg-current rounded-full" />
              <div className="h-0.5 w-2/3 bg-current rounded-full" />
            </div>}
          </button>
        </div>
      </nav>

      {/* Mobile Slide-over Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[73px] bottom-0 z-[55] bg-white/95 dark:bg-[#030712]/95 backdrop-blur-3xl lg:hidden p-8 flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="w-full text-center"
              >
                <Link 
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className={`text-3xl font-black ${location.pathname === link.path ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-600'}`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => { resetFlow(); setIsOpen(false); }}
              className="mt-8 px-8 py-3 bg-rose-500/10 text-rose-500 font-bold rounded-2xl flex items-center gap-2"
            >
              <LogOut size={20} /> Reset Session
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
    let isMounted = true;

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
        import('cursor-effects')
          .then(({ trailingCursor, followingDotCursor }) => {
            if (!isMounted) return;

            instances.current.tCursor = new trailingCursor({
              particles: 15,
              rate: 0.8,
              baseImageSrc: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAuSURBVBgZpcixDQAADMAwTP//vL+uC60vESmShD4UInmOq7uXqLru7r57iaq7i6g6pS0YAdD2fWAAAAAASUVORK5CYII=",
            });

            instances.current.fDot = new followingDotCursor({
              color: [dotColor]
            });
          })
          .catch((err) => {
            console.warn("Cursor effects unavailable:", err);
          });
      } catch (err) {
        console.warn("Failed to init cursor:", err);
      }
    }, 150);

    return () => {
      isMounted = false;
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
