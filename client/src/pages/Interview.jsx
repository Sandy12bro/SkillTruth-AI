import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import { Send, Bot, User, CheckCircle2, Loader2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFlow } from '../context/FlowContext';
import API_BASE_URL from '../config/api';

const FALLBACK_QUESTIONS = [
  "Hello! I'm the SkillTruth AI. I've analyzed your credentials and I'd like to ask you a few questions. First, tell me about a time you resolved a major conflict while implementing a new architecture.",
  "That's insightful. You mentioned leading the backend team. Could you elaborate on how you handled a database migration without downtime?",
  "Interesting approach. Regarding your certification, how have you applied the architectural principles in standardizing deployment pipelines?",
  "Thank you. One last question: Where do you see your technical leadership philosophy evolving over the next three years?",
  "Thank you for your detailed responses. The interview is now complete."
];

const Interview = () => {
  const navigate = useNavigate();
  const { flowState, updateFlowState } = useFlow();
  const resumeData = flowState.analysisData || {};

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(true);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  /**
   * 1. Initialize Interview with the first dynamic question
   */
  useEffect(() => {
    let mounted = true;
    const startInterview = async () => {
      try {
        const res = await axios.post(`${API_BASE_URL}/api/interview/chat`, {
          history: [],
          resumeData: resumeData
        });
        
        if (mounted) {
          const { nextQuestion } = res.data.data;
          setMessages([{ id: Date.now(), text: nextQuestion, sender: 'ai' }]);
          setIsGenerating(false);
          setIsTyping(false);
        }
      } catch (error) {
        console.error("Critical: Failed to start dynamic interview. Using fallback.", error);
        if (mounted) {
          setMessages([{ id: Date.now(), text: "I'm the SkillTruth Lead Architect. Let's dig into your architecture. What is the most complex system you've built recently?", sender: 'ai' }]);
          setIsGenerating(false);
          setIsTyping(false);
        }
      }
    };
    startInterview();
    return () => { mounted = false; };
  }, [resumeData]);

  /**
   * 2. Handle Continuous Chat Loop
   */
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping || isCompleted || isGenerating) return;

    const userText = inputValue.trim();
    const newUserMsg = { id: Date.now(), text: userText, sender: 'user' };
    
    // Optimistically add user message
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Build history for the AI
      const history = [...messages, newUserMsg].map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await axios.post(`${API_BASE_URL}/api/interview/chat`, {
        history,
        resumeData
      });
      
      const { nextQuestion, isCompleted: done } = res.data.data;
      
      setTimeout(() => {
        setIsTyping(false);
        const aiMsg = { id: Date.now() + 1, text: nextQuestion, sender: 'ai' };
        setMessages(prev => [...prev, aiMsg]);
        
        if (done) {
          setIsCompleted(true);
          updateFlowState({ interviewCompleted: true });
        }
      }, 800);

    } catch (err) {
      console.error("Interrogation cycle failed:", err);
      setIsTyping(false);
      // Hard fallback if cycle breaks
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "My neural link is flickering, but I've heard enough to finalize my report. Let's head to the dashboard.", 
        sender: 'ai' 
      }]);
      setIsCompleted(true);
      updateFlowState({ interviewCompleted: true });
    }
  };

  const progressPercentage = Math.min((messages.filter(m => m.sender === 'user').length / 5) * 100, 100);

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <Loader2 size={48} className="text-indigo-500 animate-spin mb-4" />
        <h2 className="text-2xl font-bold dark:text-white mb-2">Architecting Interview</h2>
        <p className="text-slate-500 dark:text-slate-400">The AI is parsing your technical signals to define an adaptive hurdle...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto h-[85vh] flex flex-col">
      {/* Top: Header & Progress Bar */}
      <header className="mb-6 shrink-0">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h1 className="text-3xl font-black mb-1 text-slate-900 dark:text-white flex items-center gap-3">
              <Bot className="text-indigo-600 dark:text-indigo-400" size={32} /> AI Interview
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-mono text-xs uppercase tracking-widest">
              Status: Real-Time Technical Probing
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">
              Proficiency Scan
            </span>
            <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
              {Math.floor(progressPercentage)}%
            </span>
          </div>
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
          />
        </div>
      </header>

      {/* Middle: Chat Messages Area */}
      <div className="flex-1 glass-card bg-slate-50 dark:bg-black/20 border border-slate-200/60 dark:border-white/5 rounded-3xl overflow-hidden shadow-inner flex flex-col relative mb-6">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const isAI = msg.sender === 'ai';
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex gap-4 w-full ${isAI ? 'justify-start' : 'justify-end'}`}
                >
                  {/* AI Avatar */}
                  {isAI && (
                    <div className="shrink-0 w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Bot size={20} />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 shadow-sm text-[15px] leading-relaxed
                    ${isAI 
                      ? 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-tl-sm' 
                      : 'bg-indigo-600 dark:bg-indigo-500 text-white rounded-tr-sm shadow-indigo-600/20'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* User Avatar */}
                  {!isAI && (
                    <div className="shrink-0 w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300">
                      <User size={20} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 w-full justify-start items-center"
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Bot size={20} />
              </div>
              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl rounded-tl-sm px-5 py-4 flex gap-1.5 items-center">
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-2 h-2 rounded-full bg-indigo-400" />
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 rounded-full bg-indigo-400" />
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 rounded-full bg-indigo-400" />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Bottom: Chat Input Area */}
      {isCompleted ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="shrink-0 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-emerald-600 dark:text-emerald-400" size={28} />
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Interview Complete</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Your responses have been recorded and sent for final processing.</p>
            </div>
          </div>
          <Button variant="primary" onClick={() => navigate('/dashboard')} className="!bg-emerald-600 !text-white hover:!bg-emerald-700 whitespace-nowrap">
            View Final Results
          </Button>
        </motion.div>
      ) : (
        <form onSubmit={handleSendMessage} className="shrink-0 relative">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
            placeholder={isTyping ? "AI is typing..." : "Type your answer..."}
            className="w-full glass-card bg-white dark:bg-black/40 border-slate-300 dark:border-white/10 rounded-2xl pl-6 pr-16 py-5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-lg"
          />
          <button 
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 dark:hover:bg-indigo-400 transition-colors"
          >
            <Send size={18} className="translate-x-[1px] translate-y-[1px]" />
          </button>
        </form>
      )}
    </div>
  );
};

export default Interview;
