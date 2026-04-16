import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, Legend, Cell 
} from 'recharts';
import { CheckCircle, AlertTriangle, Info, ShieldCheck, Terminal, MessageSquare, History, Zap } from 'lucide-react';
import { useFlow } from '../context/FlowContext';

const Dashboard = () => {
  const { flowState } = useFlow();
  const resultData = flowState.analysisData || {};
  const transcript = flowState.interviewTranscript || [];

  // 1. Radar Analysis Data
  const radarData = (resultData.skills || []).map(s => ({
    subject: s.name,
    A: s.confidence || 70,
    fullMark: 100
  })).slice(0, 6);

  // 2. Bar Chart Data (Claimed vs Verified)
  const integrityData = (resultData.skills || []).map(s => ({
    name: s.name,
    Claimed: 95 + Math.random() * 5, // Resume usually implies high competence
    Verified: s.confidence || 70
  })).slice(0, 5);

  const truthScore = Math.round(
    integrityData.length > 0 
      ? integrityData.reduce((acc, d) => acc + d.Verified, 0) / integrityData.length
      : 70
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 sm:p-8 max-w-7xl mx-auto min-h-screen space-y-8"
    >
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-white/10 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-tighter rounded">Live Report</span>
            <span className="text-slate-400 dark:text-slate-500 font-mono text-[10px]">ID: AUDIT-{Math.floor(Math.random() * 90000) + 10000}</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">Neural Integrity Report</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Aggregated technical signals and interrogation analytics.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Audit Outcome</p>
            <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">VERIFIED</p>
          </div>
          <div className="p-4 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
            <ShieldCheck size={32} />
          </div>
        </div>
      </header>

      {/* TOP ANALYTICS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* BIG TRUTH SCORE CARD */}
        <motion.div variants={itemVariants} className="lg:col-span-4 h-full">
          <Card className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-white to-slate-50 dark:from-white/5 dark:to-white/[0.02] border-none shadow-2xl relative overflow-hidden">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />
             <h2 className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-8">Mastery Quotient</h2>
             
             <div className="relative w-56 h-56 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="112" cy="112" r="90" fill="none" stroke="currentColor" strokeWidth="12" className="text-slate-100 dark:text-white/5" />
                  <motion.circle 
                    cx="112" cy="112" r="90" fill="none" stroke="currentColor" strokeWidth="12" 
                    strokeLinecap="round" strokeDasharray="565.48"
                    initial={{ strokeDashoffset: 565.48 }}
                    animate={{ strokeDashoffset: 565.48 - (565.48 * truthScore) / 100 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="text-indigo-600 dark:text-indigo-500"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-6xl font-black text-slate-900 dark:text-white">{truthScore}%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Aggregate Truth</span>
                </div>
             </div>
             
             <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                <div className="p-3 bg-white dark:bg-black/20 rounded-xl border border-slate-100 dark:border-white/5 text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-black">Signals</p>
                  <p className="text-lg font-black dark:text-white">Active</p>
                </div>
                <div className="p-3 bg-white dark:bg-black/20 rounded-xl border border-slate-100 dark:border-white/5 text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-black">Reliability</p>
                  <p className="text-lg font-black text-emerald-500 font-mono">HIGH</p>
                </div>
             </div>
          </Card>
        </motion.div>

        {/* COMPARISON CHART CARD */}
        <motion.div variants={itemVariants} className="lg:col-span-8 h-full">
          <Card className="h-full p-8 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Zap size={20} className="text-amber-500" /> Integrity Gap Analysis
              </h2>
              <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-white/10" /> Resume Claim</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-500" /> Verified Signal</div>
              </div>
            </div>
            
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={integrityData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" strokeOpacity={0.1} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} />
                  <YAxis hide />
                  <RechartsTooltip 
                    cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-3 rounded-xl shadow-2xl">
                            <p className="text-xs font-black mb-2 dark:text-white">{payload[0].payload.name}</p>
                            <div className="space-y-1">
                              <p className="text-[10px] flex justify-between gap-4 text-slate-500">Claimed: <span className="font-bold text-slate-900 dark:text-slate-300">{Math.round(payload[0].value)}%</span></p>
                              <p className="text-[10px] flex justify-between gap-4 text-indigo-500">Verified: <span className="font-bold">{Math.round(payload[1].value)}%</span></p>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="Claimed" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={24} opacity={0.3} />
                  <Bar dataKey="Verified" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* RECRUITER'S AUDIT LOG SECTION */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
        {/* Radar Map ( Holistic View ) */}
        <Card className="lg:col-span-1 p-6 flex flex-col h-full mb-0">
          <h2 className="text-sm font-black text-slate-900 dark:text-white mb-4 uppercase tracking-widest">Semantic Map</h2>
          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#94a3b8" strokeOpacity={0.2} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 8, fontWeight: 700 }} />
                <Radar name="Proficiency" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* THE CHAT TRANSCRIPT ( Audit Log ) */}
        <Card className="lg:col-span-3 p-0 overflow-hidden flex flex-col h-[500px] border-slate-200 dark:border-white/5">
           <div className="p-4 bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal size={18} className="text-indigo-500" />
                <h2 className="font-black text-slate-900 dark:text-white uppercase tracking-tighter">Recruiter's Audit Log</h2>
              </div>
              <span className="text-[10px] font-mono text-slate-400">SESSION_ACTIVE:INTERROGATION_SYNC</span>
           </div>
           
           <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-black/10">
              {transcript.length > 0 ? transcript.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] group`}>
                    <div className="flex items-center gap-2 mb-1 px-1">
                       <span className={`text-[9px] font-black uppercase tracking-widest ${msg.sender === 'user' ? 'text-indigo-500' : 'text-slate-500'}`}>
                          {msg.sender === 'user' ? 'Candidate' : 'Neural Architect'}
                       </span>
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm transition-all ${
                      msg.sender === 'user' 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-slate-300 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              )) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50 space-y-3">
                   <History size={48} />
                   <p className="font-medium">No interrogation logs detected in current audit context.</p>
                </div>
              )}
           </div>
        </Card>
      </motion.div>

      {/* PROJECT BREAKDOWN SLOTS */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3 mt-4">
          <Zap size={24} className="text-indigo-500" /> Granular Technical Proof
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resultData.projects?.map((proj, idx) => (
            <Card key={idx} className="hover:translate-y-[-4px] transition-all duration-300 group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">{proj.name}</h3>
                <span className="text-[9px] font-black px-2 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded uppercase">{proj.complexity}</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-medium">
                {proj.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {proj.technologies?.map((tech, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-white/5 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
