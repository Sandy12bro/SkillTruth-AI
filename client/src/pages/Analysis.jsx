import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ShieldCheck, Crosshair, TrendingUp, Terminal, Loader2, Check, Briefcase, Zap, AlertTriangle, ChevronRight } from 'lucide-react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useFlow } from '../context/FlowContext';

const AI_LOGS = [
  "Initializing deep neural extractors...",
  "Understanding your core professional skills...",
  "Evaluating project depth and technical architecture...",
  "Inferring skill proficiency levels from context...",
  "Detecting vague claims and performance markers...",
  "Identifying distinct strengths and improvement areas...",
  "Finalizing structured intelligence report...",
];

const Analysis = () => {
  const navigate = useNavigate();
  const { flowState, updateFlowState } = useFlow();
  const resultData = flowState.analysisData;
  const hasAnalysisData =
    resultData &&
    Array.isArray(resultData.skills) &&
    Array.isArray(resultData.projects) &&
    typeof resultData.experienceSummary === 'string' &&
    Array.isArray(resultData.strengths) &&
    Array.isArray(resultData.weaknesses);

  // Only show animation if we have data AND have not completed the analysis phase yet
  const [isAnalyzing, setIsAnalyzing] = useState(hasAnalysisData && !flowState.analysisCompleted);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!hasAnalysisData || !isAnalyzing) return;

    const logInterval = setInterval(() => {
      setCurrentLogIndex((prev) => {
        if (prev >= AI_LOGS.length - 1) {
          clearInterval(logInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    const totalTime = AI_LOGS.length * 1000 + 500;
    const intervalTime = 50;
    const increment = 100 / (totalTime / intervalTime);
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsAnalyzing(false);
            updateFlowState({ analysisCompleted: true });
          }, 800);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [isAnalyzing, updateFlowState, hasAnalysisData]);

  if (!hasAnalysisData) {
    return (
      <div className="p-4 sm:p-8 max-w-4xl mx-auto min-h-[80vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-3">No analysis data found</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Upload and analyze a resume first to view structured skills, projects, and insights.
        </p>
        <Button variant="primary" onClick={() => navigate('/upload')}>
          Go to Upload
        </Button>
      </div>
    );
  }

  const getLevelBadge = (level) => {
    const styles = {
      'Advanced': 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      'Intermediate': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      'Beginner': 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20'
    };
    return styles[level] || styles['Beginner'];
  };

  const getComplexityColor = (comp) => {
    const colors = {
      'High': 'text-rose-500',
      'Medium': 'text-amber-500',
      'Low': 'text-emerald-500'
    };
    return colors[comp] || 'text-slate-500';
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto min-h-[85vh] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {isAnalyzing ? (
          <motion.div
            key="analyzing-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            className="w-full max-w-3xl mx-auto"
          >
            <div className="text-center mb-8">
              <Loader2 size={64} className="text-indigo-500 animate-spin mx-auto mb-6" />
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                AI Intelligence Engine
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Deep Scanning Resume Data...</p>
            </div>

            <div className="glass-card bg-slate-900 dark:bg-black/40 border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-6 h-[200px] overflow-hidden flex flex-col justify-end">
                <div className="space-y-3 font-mono text-sm">
                  {AI_LOGS.slice(0, currentLogIndex + 1).map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: index === currentLogIndex ? 1 : 0.4, x: 0 }}
                      className="flex items-center gap-3 text-indigo-400"
                    >
                      <Check size={14} className={index === currentLogIndex ? "animate-pulse" : "text-emerald-500"} />
                      <span>{log}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-800/50 px-6 py-4 border-t border-slate-700/50">
                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: `${progress}%` }} 
                    className="h-full bg-indigo-500 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <header className="mb-10 flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">Analysis Intelligence</h1>
                <p className="text-slate-500 dark:text-slate-400">Structured professional breakdown generated by AI.</p>
              </div>
              <div className="hidden md:flex flex-col items-end">
                <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Confidence Score</span>
                <span className="text-3xl font-black text-slate-900 dark:text-white">94%</span>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Skills Section */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="h-full">
                  <h3 className="intelligence-header">
                    <Zap className="text-amber-500" />
                    Skill Levels
                  </h3>
                  <div className="space-y-4">
                    {resultData?.skills?.map((skill, i) => (
                      <div key={i} className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-slate-800 dark:text-slate-200">{skill?.name}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-tight ${getLevelBadge(skill?.level)}`}>
                            {skill?.level}
                          </span>
                        </div>
                        <div className="w-full h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500/40" 
                            style={{ width: `${skill?.confidence || 0}%` }}
                          />
                        </div>
                      </div>
                    ))}
                    {!resultData?.skills?.length && (
                      <p className="text-xs text-slate-500 italic">No skills identified.</p>
                    )}
                  </div>
                </Card>
              </div>

              {/* Projects Section */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resultData?.projects?.map((proj, i) => (
                    <Card key={i} className="group hover:border-indigo-500/40 transition-all duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-black text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                          {proj?.name}
                        </h4>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${getComplexityColor(proj?.complexity)}`}>
                          {proj?.complexity} Complexity
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                        {proj?.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {proj?.technologies?.map((tech, j) => (
                          <span key={j} className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 rounded-md border border-slate-200 dark:border-white/5">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </Card>
                  ))}
                  {!resultData?.projects?.length && (
                    <Card className="flex items-center justify-center p-8 border-dashed border-slate-300 dark:border-white/10">
                      <p className="text-xs text-slate-500 italic">No project data available.</p>
                    </Card>
                  )}
                </div>

                <Card className="bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-500/20 relative overflow-hidden group shadow-indigo-500/10">
                  <div className="absolute top-0 right-0 p-8 opacity-10 dark:opacity-5 group-hover:scale-110 transition-transform text-indigo-600 dark:text-indigo-500">
                    <ShieldCheck size={120} />
                  </div>
                  <div className="relative z-10">
                    <h3 className="intelligence-header !text-indigo-900 dark:!text-indigo-100">
                      <ShieldCheck className="text-indigo-600 dark:text-emerald-400" />
                      Experience Summary
                    </h3>
                    <p className="text-sm text-indigo-800 dark:text-indigo-50 leading-relaxed italic">
                      "{resultData?.experienceSummary}"
                    </p>
                  </div>
                </Card>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="!bg-emerald-500/5 border-emerald-500/20">
                <h3 className="intelligence-header !text-emerald-600 dark:!text-emerald-400">
                   <TrendingUp />
                   Identified Strengths
                </h3>
                <ul className="space-y-3">
                  {resultData?.strengths?.map((s, i) => (
                    <li key={i} className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      {s}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="!bg-rose-500/5 border-rose-500/20">
                <h3 className="intelligence-header !text-rose-600 dark:!text-rose-400">
                   <AlertTriangle />
                   Areas to Verify
                </h3>
                <ul className="space-y-3">
                  {resultData?.weaknesses?.map((w, i) => (
                    <li key={i} className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                      {w}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="flex justify-center">
              <Button 
                variant="animated" 
                onClick={() => navigate('/interview')}
                className="text-lg px-12 py-5"
                icon={ChevronRight}
              >
                Proceed to Intelligence Interview
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Analysis;
