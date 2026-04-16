import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { Upload, Cpu, ShieldCheck, ChevronRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-[calc(100vh-100px)] flex flex-col items-center justify-center overflow-hidden px-4 md:px-0">
      {/* Ambient Lighting (Sync with Demo) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-emerald-500/10 dark:bg-emerald-600/5 rounded-full blur-[150px]"
        />
      </div>

      <main className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center">
        {/* Transparent Hero Section (No Card Box) */}
        <div className="relative z-10 py-4 md:py-8 w-full">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1 mb-8 text-[10px] font-black uppercase tracking-[0.2em] rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
              Experimental Analysis Engine
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-[5.5rem] font-black mb-8 tracking-tighter text-slate-900 dark:text-white leading-[0.95]"
            >
              Your Resume Lies. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-500">
                We Prove It.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-10 font-bold leading-relaxed"
            >
              The definitive truth engine for professional credentials. Detect discrepancies and verify authentic skills instantly.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center"
            >
              <Button
                variant="neon"
                onClick={() => navigate('/upload')}
                className="group px-12 py-5 text-xl flex items-center gap-3 shadow-2xl shadow-indigo-500/30"
              >
                Scan Credentials Now
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
        </div>

        {/* Feature Teasers (Compact Single Line) */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-4 md:mt-8 pb-4">
          {[
            { icon: Upload, title: 'Upload' },
            { icon: Cpu, title: 'Analyze' },
            { icon: ShieldCheck, title: 'Verify' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="flex items-center gap-2 group cursor-default"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                 <feature.icon size={16} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{feature.title}</span>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Fixed Footer at the bottom of the non-scrollable area */}
      <footer className="absolute bottom-6 w-full text-center text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-700 opacity-50">
        © 2026 SkillTruth AI • Deep Scan Protocol v1.0.4
      </footer>
    </div>
  );
};

export default Home;
