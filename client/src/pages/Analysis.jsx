import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ShieldCheck, Crosshair, AlertTriangle, TrendingUp, Terminal, Loader2, Check, Briefcase } from 'lucide-react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

// The simulated logs that will appear one by one
const AI_LOGS = [
  "Initializing neural pathways...",
  "Extracting candidate identity matrix and timelines...",
  "Cross-referencing skills against verified semantic clusters...",
  "Analyzing project depth and architectural complexity...",
  "Detecting chronological inconsistencies...",
  "Evaluating linguistic markers for overstatements...",
  "Running integrity checks on certifications...",
  "Generating targeted adaptive interview questions...",
  "Finalizing Deep Scan composite score..."
];

const Analysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resultData = location.state?.resultData;

  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Fallback trap to prevent loading without API data
  if (!resultData && !isAnalyzing) {
     return <Navigate to="/upload" replace />;
  }

  // Simulation Effect
  useEffect(() => {
    if (!isAnalyzing) return;

    // Advance logs every 1.2 seconds
    const logInterval = setInterval(() => {
      setCurrentLogIndex((prev) => {
        if (prev >= AI_LOGS.length - 1) {
          clearInterval(logInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);

    // Smoothly increment progress bar to 100%
    const totalTime = AI_LOGS.length * 1200 + 500; // total duration based on logs
    const intervalTime = 50;
    const increment = 100 / (totalTime / intervalTime);
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsAnalyzing(false), 800); // Wait a bit at 100% then show results
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [isAnalyzing]);

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto min-h-[85vh] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {/* ==================================================== */}
        {/* PHASE 1: FUTURISTIC AI ANALYSIS SIMULATION           */}
        {/* ==================================================== */}
        {isAnalyzing ? (
          <motion.div
            key="analyzing-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-3xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto relative mb-6">
                <Loader2 size={80} className="text-indigo-500 animate-spin absolute inset-0" />
                <div className="absolute inset-2 border-2 border-dashed border-emerald-500/50 rounded-full animate-[spin_3s_linear_reverse]" />
                <div className="absolute inset-0 bg-indigo-500/10 blur-xl rounded-full animate-pulse" />
              </div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-widest uppercase">
                Neural Scan Active
              </h1>
              <p className="font-mono text-indigo-600 dark:text-indigo-400 mt-2">
                Processing UUID: ST-88291-VX
              </p>
            </div>

            {/* Terminal Window */}
            <div className="glass-card bg-slate-900 dark:bg-black/40 border border-slate-700/50 dark:border-indigo-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/10">
              <div className="bg-slate-800/80 dark:bg-slate-900/50 px-4 py-3 border-b border-slate-700/50 dark:border-white/5 flex items-center gap-3">
                <Terminal size={16} className="text-slate-400" />
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">System Logs</span>
              </div>
              
              <div className="p-6 h-[250px] overflow-hidden flex flex-col justify-end relative">
                {/* Overlay gradient to fade out older logs at the top */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-slate-900 dark:from-black/40 to-transparent z-10 pointer-events-none" />
                
                <div className="space-y-3 font-mono text-sm z-0">
                  {AI_LOGS.slice(0, currentLogIndex + 1).map((log, index) => {
                    const isLast = index === currentLogIndex;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: isLast ? 1 : 0.5, x: 0 }}
                        className={`flex items-start gap-3 ${isLast ? 'text-indigo-400' : 'text-slate-500'}`}
                      >
                        <span className="shrink-0 mt-0.5 opacity-70">
                          {isLast ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} className="text-emerald-500" />}
                        </span>
                        <span>{log}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="bg-slate-800/50 px-6 py-4 border-t border-slate-700/50">
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>Engine Completion</span>
                  <span>{Math.max(0, Math.min(100, progress)).toFixed(0)}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear", duration: 0.1 }}
                    className="h-full bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ==================================================== */
          /* PHASE 2: RESULTS SCREEN                              */
          /* ==================================================== */
          <motion.div
            key="results-state"
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full"
                >
                  <Check size={12} /> Scan Complete
                </motion.div>
                <h1 className="text-4xl font-black mb-2 text-slate-900 dark:text-white">Deep Scan Result</h1>
              </div>
              <p className="text-indigo-600 dark:text-indigo-400 font-mono text-sm tracking-widest uppercase">
                ID: #ST-88291-VX
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <Card className="border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-500/5 relative overflow-hidden">
                {/* Decorative background icon */}
                <ShieldCheck size={160} className="absolute -bottom-10 -right-10 text-emerald-500/10 dark:text-emerald-500/5" />
                
                <div className="relative z-10 flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                    <ShieldCheck className="text-emerald-600 dark:text-emerald-500" />
                    Verified Competencies
                  </h3>
                  <span className="text-3xl font-black text-emerald-600 dark:text-emerald-500 drop-shadow-md">92%</span>
                </div>
                <div className="relative z-10 space-y-3">
                  {(resultData?.skills || ['React', 'System Design', 'JavaScript']).slice(0, 5).map((skill, i) => (
                    <motion.div 
                      key={skill} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex justify-between items-center p-3 rounded-lg bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm"
                    >
                      <span className="text-slate-800 dark:text-slate-200 font-medium truncate pr-2">{skill}</span>
                      <TrendingUp size={16} className="shrink-0 text-emerald-600 dark:text-emerald-500" />
                    </motion.div>
                  ))}
                </div>
              </Card>

              <Card className="border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-500/5 relative overflow-hidden">
                {/* Decorative background icon */}
                <Briefcase size={160} className="absolute -bottom-10 -right-10 text-amber-500/10 dark:text-amber-500/5" />

                <div className="relative z-10 flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                    <Briefcase className="text-amber-600 dark:text-amber-500" />
                    Extracted Projects
                  </h3>
                  <span className="text-3xl font-black text-amber-600 dark:text-amber-500 drop-shadow-md">
                    {resultData?.projects?.length || 0}
                  </span>
                </div>
                <div className="relative z-10 space-y-3 overflow-y-auto max-h-[250px] pr-2">
                  {(resultData?.projects || []).length > 0 ? resultData.projects.map((proj, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 rounded-lg bg-white/60 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 shadow-sm"
                    >
                      <p className="text-sm font-bold text-amber-700 dark:text-amber-400 mb-1">{proj.title}</p>
                      <p className="text-xs text-amber-900/80 dark:text-slate-300/60 line-clamp-2">{proj.description}</p>
                    </motion.div>
                  )) : (
                     <div className="p-4 text-center text-slate-500 text-sm">No structured projects extracted.</div>
                  )}
                </div>
              </Card>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-indigo-50 to-slate-100 dark:from-indigo-500/10 dark:to-indigo-900/10 border-indigo-200 dark:border-indigo-500/30">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                      <Crosshair className="text-indigo-600 dark:text-indigo-400" />
                      AI Profile Blueprint
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 font-medium">
                      While the technical foundation is extremely robust, the AI detected linguistic patterns pointing to potential exaggeration of leadership scope. 
                      <strong className="text-indigo-600 dark:text-indigo-400 font-bold ml-1">
                        Recommendation: 
                      </strong> Initiate an AI Interview focused heavily on 'Conflict Management' and 'Strategic Vision'.
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-3 justify-center shrink-0">
                    <Button variant="neon" onClick={() => navigate('/interview', { state: { resultData } })} className="w-full sm:w-auto shadow-indigo-500/30">
                      Launch Behavioral Interview
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto">
                      Export Detailed Heatmap PDF
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Analysis;
