import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { Upload, Cpu, ShieldCheck } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[90vh] flex flex-col pt-16 overflow-hidden">
      {/* Premium Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle dot matrix grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
        
        {/* Massive Ambient Orbs */}
        <motion.div 
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-indigo-200/50 dark:bg-indigo-600/20 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[15%] w-[500px] h-[500px] bg-blue-200/50 dark:bg-blue-600/20 rounded-full blur-[120px]"
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center flex-grow px-4 mt-6 mb-24 text-center">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-semibold rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm text-slate-700 dark:text-slate-300"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          Trust, Verified by AI.
        </motion.div>
        
        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold mb-6 tracking-tight max-w-5xl text-slate-900 dark:text-white leading-tight"
        >
          Your Resume Lies. <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400">
            We Prove It.
          </span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mb-12 font-medium"
        >
          The definitive truth engine for professional credentials. Detect discrepancies and verify authentic skills instantly.
        </motion.p>
        
        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Button 
            variant="neon" 
            onClick={() => navigate('/upload')}
            className="px-10 py-4 text-lg"
          >
            Scan Resume
          </Button>
          <Button 
            variant="glass" 
            onClick={() => navigate('/dashboard')}
            className="px-10 py-4 text-lg"
          >
            View Demo
          </Button>
        </motion.div>
      </section>

      {/* Value Proposition (Cards) */}
      <section className="relative z-10 py-16 px-6 max-w-6xl mx-auto w-full mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: Upload, 
              title: 'Instant Integration', 
              desc: 'Upload PDF/Docx or directly connect LinkedIn profiles.' 
            },
            { 
              icon: Cpu, 
              title: 'Neural Scanning', 
              desc: 'Our engine extracts and verifies millions of data points.' 
            },
            { 
              icon: ShieldCheck, 
              title: 'Certified Truth', 
              desc: 'Receive a cryptographic ST-Score for total confidence.' 
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="glass-card p-8 rounded-[2rem] flex flex-col group hover:-translate-y-1 transition-transform duration-500 text-left"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-white/5 border border-indigo-100 dark:border-white/10 flex items-center justify-center mb-6 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 transition-colors duration-300">
                <feature.icon size={28} className="text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white tracking-wide">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-white/10 mt-auto py-10 w-full">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
          <p>© 2026 SkillTruth AI.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Platform</a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Legal</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
