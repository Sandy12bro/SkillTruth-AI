import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../context/FlowContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight, ShieldAlert } from 'lucide-react';
import Button from './ui/Button';

const ProtectedRoute = ({ children, requiredStep }) => {
  const { flowState } = useFlow();
  const navigate = useNavigate();

  const steps = {
    'upload': { condition: true, redirectTo: '/' }, 
    'analysis': { 
      condition: flowState.resumeUploaded, 
      redirectTo: '/upload', 
      title: 'Resume Required',
      message: 'We need to process your resume before generating an analysis deep scan.',
      buttonText: 'Go to Resume Upload'
    },
    'interview': { 
      condition: flowState.analysisCompleted, 
      redirectTo: '/analysis', 
      title: 'Analysis Pending',
      message: 'The AI must complete your technical blueprint before we can start the interview.',
      buttonText: 'View Analysis First'
    },
    'dashboard': { 
      condition: flowState.interviewCompleted, 
      redirectTo: '/interview', 
      title: 'Interview Required',
      message: 'Complete the personality & integrity scan to unlock your final dashboard.',
      buttonText: 'Start Interview'
    }
  };

  const currentStep = steps[requiredStep];

  if (!currentStep.condition) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        />
        
        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative bg-white dark:bg-[#0B0F19] p-8 md:p-12 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-white/10 max-w-lg w-full text-center overflow-hidden"
        >
          {/* Decorative background circle */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 relative">
              <ShieldAlert size={48} className="text-indigo-600 dark:text-indigo-400" />
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-[#0B0F19] rounded-full border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center shadow-lg"
              >
                <Lock size={14} className="text-indigo-600 dark:text-indigo-400" />
              </motion.div>
            </div>

            <h2 className="text-3xl font-black mb-4 text-slate-900 dark:text-white tracking-tight">
              {currentStep.title}
            </h2>
            
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10 max-w-[320px] mx-auto">
              {currentStep.message}
            </p>

            <Button 
              variant="neon" 
              onClick={() => navigate(currentStep.redirectTo)}
              className="w-full py-4 px-8 flex items-center justify-center gap-3 font-black text-lg group shadow-indigo-500/20"
            >
              {currentStep.buttonText}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <button 
              onClick={() => navigate('/')}
              className="mt-6 text-sm font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
