import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import { Upload as UploadIcon, FileText, CheckCircle, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFlow } from '../context/FlowContext';
import API_BASE_URL from '../config/api';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { updateFlowState } = useFlow();

  // Handle Drag & Drop Events
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateAndSetFile = (selectedFile) => {
    setError(null);
    setSuccess(null);
    if (!selectedFile) return;
    
    if (selectedFile.type !== 'application/pdf' || !selectedFile.name.toLowerCase().endsWith('.pdf')) {
      setError('❌ Invalid file. Please upload a PDF resume.');
      return;
    }
    
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('❌ Invalid file. File size exceeds 5MB limit.');
      return;
    }
    
    setFile(selectedFile);
    setSuccess('✅ Valid resume detected. Ready for analysis.');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      validateAndSetFile(droppedFiles[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    setProgress(0);
    setIsComplete(false);
    setError(null);
    setSuccess(null);
    setUploadStatus('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setProgress(10);
    setError(null);
    setUploadStatus('Uploading resume...');
    console.log('Starting upload for file:', file.name);
    
    try {
      // 1. Prepare file for backend Multer endpoint
      const formData = new FormData();
      formData.append('resume', file);

      // 2. Upload and Extract Text
      const uploadRes = await axios.post(`${API_BASE_URL}/api/resume/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 50) / progressEvent.total);
          setProgress(percentCompleted);
        }
      });

      const extractedText = uploadRes.data?.data?.text;
      if (!extractedText) {
        throw new Error("No text could be extracted from the document.");
      }

      // Simulate partial loading for UI smoothness
      setProgress(60);
      setUploadStatus('Resume received. Initializing deep analysis...');

      // 3. Analyze Text via OpenAI (Bypass active in backend)
      const analyzeRes = await axios.post(`${API_BASE_URL}/api/resume/analyze`, { text: extractedText });
      
      console.log("🔍 FORCE TEST - RAW RESPONSE:", analyzeRes.data);
      
      if (analyzeRes.data.success) {
        const structuredData = analyzeRes.data.data;
        console.log("🔍 FORCE TEST - EXTRACTED DATA:", structuredData);

        if (!structuredData || !structuredData.skills) {
          console.error("❌ FORCE TEST FAILURE - Data received but malformed:", structuredData);
          throw new Error("Force Test bypass failed: Received empty data object.");
        }
        
        setProgress(100);
        setIsUploading(false);
        setIsComplete(true);
        
        updateFlowState({ 
          resumeUploaded: true, 
          analysisData: structuredData,
          analysisCompleted: false
        });

        console.log("🚀 MAPPING SUCCESS - Transitioning to /analysis");
        setTimeout(() => {
          navigate('/analysis', { state: { resultData: structuredData } });
        }, 1500);

      } else {
        console.error("❌ FORCE TEST FAILURE - Backend returned success: false:", analyzeRes.data.message);
        throw new Error(analyzeRes.data.message || "AI Analysis failed to produce valid results.");
      }

    } catch (err) {
      console.error(err);
      setIsUploading(false);
      setProgress(0);
      setError(err.response?.data?.message || err.message || "An unexpected error occurred during processing.");
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
      <header className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white"
        >
          Secure Validation
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-slate-600 dark:text-slate-400 text-lg"
        >
          Upload your resume in PDF format to begin the AI analysis.
        </motion.p>
      </header>

      {/* Main Upload Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full glass-card overflow-hidden shadow-2xl relative"
      >
        <AnimatePresence mode="wait">
          {isComplete ? (
            <motion.div
              key="complete-state"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-16 flex flex-col items-center justify-center"
            >
              <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400 relative">
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                >
                  <CheckCircle size={48} />
                </motion.div>
                <span className="absolute inset-0 rounded-full border-4 border-emerald-500/30 animate-ping"></span>
              </div>
              <h3 className="text-3xl font-bold mb-3 text-slate-900 dark:text-white">Analysis Ready</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 text-center max-w-sm">
                We've successfully processed your document and identified key verification points.
              </p>
              
              <Button 
                variant="neon" 
                onClick={() => navigate('/analysis')}
                className="px-10 py-4 shadow-emerald-500/20 !border-emerald-500 !text-emerald-600 dark:!text-emerald-400"
              >
                View Full Report
              </Button>
            </motion.div>
          ) : isUploading ? (
            <motion.div
              key="uploading-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-16 flex flex-col items-center justify-center"
            >
               <Loader2 size={48} className="text-indigo-600 dark:text-indigo-400 animate-spin mb-6" />
               <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{uploadStatus || 'Analyzing Data...'}</h3>
               <p className="text-slate-500 dark:text-slate-400 mb-8 text-center max-w-sm">
                 Extracting entities, checking integrity markers, and verifying timeline...
               </p>
               
               <div className="w-full max-w-md">
                 <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                   <span>Processing {file?.name}</span>
                   <span>{progress}%</span>
                 </div>
                 <div className="w-full h-3 bg-slate-100 dark:bg-gray-800 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${progress}%` }}
                     className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full relative overflow-hidden"
                   >
                     <div className="absolute top-0 left-0 bottom-0 w-[50px] bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[50px] animate-[shimmer_1.5s_infinite]" />
                   </motion.div>
                 </div>
               </div>
            </motion.div>
          ) : (
            <motion.div
              key="upload-zone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className={`p-10 transition-colors duration-300 ${isDragging ? 'bg-indigo-50/50 dark:bg-indigo-900/20' : ''}`}
            >
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !file && fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-300 ${
                  isDragging
                    ? 'border-indigo-500 bg-indigo-500/5 shadow-[0_0_30px_rgba(99,102,241,0.2)]'
                    : error
                    ? 'border-red-500/50 bg-red-500/5'
                    : file
                    ? 'border-emerald-500/50 bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.1)]'
                    : 'border-slate-300 dark:border-white/20 hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="application/pdf"
                  className="hidden"
                />

                {!file ? (
                  <>
                    <div
                      className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 ${
                        isDragging
                          ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      <UploadIcon size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">
                      Drag & Drop your resume here
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">
                      or click to browse from your computer
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                      Strictly PDF formats up to 5MB
                    </p>
                  </>
                ) : (
                  <div className="flex flex-col items-center w-full max-w-md mx-auto" onClick={(e) => e.stopPropagation()}>
                    <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                      <FileText size={32} />
                    </div>
                    <div className="text-center mb-8">
                      <p className="font-bold text-slate-900 dark:text-white truncate max-w-[250px] sm:max-w-xs">{file.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{formatFileSize(file.size)}</p>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        onClick={removeFile}
                        className="px-6 text-sm hover:!bg-red-50 dark:hover:!bg-red-500/10 hover:!text-red-500 dark:hover:!text-red-400 border-slate-300 dark:border-white/10"
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="primary" 
                        onClick={handleUpload} 
                        disabled={isUploading} 
                        className="px-8 shadow-indigo-500/25 shadow-xl"
                      >
                        Start Analysis
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* External Feedback Messages Container */}
      <div className="w-full max-w-xl mx-auto mt-8 h-20">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error-msg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-card !bg-red-500/5 border-red-500/20 p-4 flex items-center justify-center gap-3"
            >
              <X size={20} className="text-red-500" />
              <p className="text-red-500 font-semibold">{error}</p>
            </motion.div>
          )}
          {success && !isUploading && !isComplete && (
            <motion.div
              key="success-msg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-card !bg-emerald-500/5 border-emerald-500/20 p-4 flex items-center justify-center gap-3 text-emerald-600 dark:text-emerald-400 font-semibold"
            >
              {success}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Upload;
