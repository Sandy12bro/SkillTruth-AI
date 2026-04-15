import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { CheckCircle, AlertTriangle, Info, ShieldCheck } from 'lucide-react';

const Dashboard = () => {
  // Mock Data for Recharts
  const skillData = [
    { subject: 'React/UI', A: 95, fullMark: 100 },
    { subject: 'System Design', A: 85, fullMark: 100 },
    { subject: 'Node.js', A: 90, fullMark: 100 },
    { subject: 'AWS', A: 65, fullMark: 100 },
    { subject: 'Leadership', A: 70, fullMark: 100 },
    { subject: 'Security', A: 80, fullMark: 100 },
  ];

  const tenureData = [
    { name: 'Senior Dev (Corp A)', Claimed: 36, Verified: 36 },
    { name: 'Lead Eng (Corp B)', Claimed: 24, Verified: 18 },
    { name: 'Backend Dev (Corp C)', Claimed: 12, Verified: 12 },
  ];

  // Circular Progress Calculation
  const truthScore = 87;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (truthScore / 100) * circumference;

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto min-h-screen">
      <header className="mb-10 text-center sm:text-left">
        <h1 className="text-4xl font-black mb-2 text-slate-900 dark:text-white">Validation Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400 font-medium">Comprehensive breakdown of your SkillTruth integrity report.</p>
      </header>

      {/* TOP SECTION: Truth Score & Radar Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Section 1: Truth Score Hero */}
        <Card className="lg:col-span-1 flex flex-col items-center justify-center p-10 bg-white/80 dark:bg-black/20 border-slate-200/60 shadow-xl overflow-hidden relative">
          {/* Subtle bg glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-emerald-500/5 pointer-events-none" />
          
          <h2 className="text-lg font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-8 z-10">Overall Truth Score</h2>
          <div className="relative flex items-center justify-center z-10 hover:scale-105 transition-transform duration-500 cursor-default">
            {/* SVG Circular Progress */}
            <svg className="w-48 h-48 transform -rotate-90">
              {/* Background Circle */}
              <circle
                cx="96" cy="96" r={radius}
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeWidth="12" fill="transparent"
              />
              {/* Progress Circle */}
              <motion.circle
                cx="96" cy="96" r={radius}
                className="stroke-indigo-600 dark:stroke-indigo-500 drop-shadow-[0_0_10px_rgba(79,70,229,0.4)]"
                strokeWidth="12" fill="transparent"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-5xl font-black text-slate-900 dark:text-white drop-shadow-sm">{truthScore}%</span>
              <span className="text-xs font-bold text-emerald-500 flex items-center gap-1 mt-1">
                <ShieldCheck size={14} /> High Integrity
              </span>
            </div>
          </div>
        </Card>

        {/* Section 2: Skill Breakdown (Graphs with Recharts) */}
        <Card className="lg:col-span-2 p-6 flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Semantic Skill Map</h2>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                <PolarGrid stroke="#94a3b8" strokeOpacity={0.3} />
                <PolarAngleAxis dataKey="subject" className="text-xs font-bold fill-slate-600 dark:fill-slate-400" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} className="text-xs fill-slate-400" />
                <Radar name="Verified Confidence" dataKey="A" stroke="#4f46e5" strokeWidth={2} fill="#6366f1" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* MIDDLE SECTION: Secondary Graphs - Bar Chart for Tenure */}
      <div className="mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Tenure Verification Analysis (Months)</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={tenureData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.2} />
                <XAxis dataKey="name" className="text-xs font-medium fill-slate-600 dark:fill-slate-400" />
                <YAxis className="text-xs font-medium fill-slate-600 dark:fill-slate-400" />
                <RechartsTooltip cursor={{fill: 'rgba(99, 102, 241, 0.05)'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
                <Bar dataKey="Claimed" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Verified" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* BOTTOM SECTION: Project Analysis Feedback Cards */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pl-2">Project Granularity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          
          <Card className="hover:border-emerald-300 dark:hover:border-emerald-500/50 group">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                <CheckCircle size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">E-Commerce Platform Redesign</h3>
                <p className="text-xs font-medium text-emerald-600 dark:text-emerald-500 uppercase tracking-widest mt-1">Status: Confirmed</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5">
              The technical footprint aligns flawlessly with claimed Next.js and Tailwind usage. 
              Repository commit velocity and standard API references were successfully verified.
            </p>
          </Card>

          <Card className="hover:border-amber-300 dark:hover:border-amber-500/50 group">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-amber-100 dark:bg-amber-500/10 rounded-xl text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">GraphQL Implementation</h3>
                <p className="text-xs font-medium text-amber-600 dark:text-amber-500 uppercase tracking-widest mt-1">Status: Partial Evidence</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5">
              While GraphQL usage is present, the complexity suggests secondary involvement rather than principal architecture. 
              We recommend validating specific query optimization techniques in technical screening.
            </p>
          </Card>

          <Card className="hover:border-indigo-300 dark:hover:border-indigo-500/50 group">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                <Info size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">AWS Infrastructure Scaling</h3>
                <p className="text-xs font-medium text-indigo-600 dark:text-indigo-500 uppercase tracking-widest mt-1">Status: Unverified Deep Tech</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5">
              Candidate claims to have led the Dockerization and ECS cluster scaling, but public evidence primarily reflects standard EC2 maintenance. 
              Needs behavioral deep-dive.
            </p>
          </Card>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;
