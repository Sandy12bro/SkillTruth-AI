import React, { createContext, useContext, useState, useEffect } from 'react';

const FlowContext = createContext();

export const FlowProvider = ({ children }) => {
  const [flowState, setFlowState] = useState(() => {
    const savedState = localStorage.getItem('skilltruth_flow_state');
    return savedState ? JSON.parse(savedState) : {
      resumeUploaded: false,
      analysisCompleted: false,
      interviewCompleted: false,
      analysisData: null,
    };
  });

  useEffect(() => {
    localStorage.setItem('skilltruth_flow_state', JSON.stringify(flowState));
  }, [flowState]);

  const updateFlowState = (updates) => {
    setFlowState((prev) => ({ ...prev, ...updates }));
  };

  const resetFlow = () => {
    setFlowState({
      resumeUploaded: false,
      analysisCompleted: false,
      interviewCompleted: false,
      analysisData: null,
    });
    localStorage.removeItem('skilltruth_flow_state');
  };

  return (
    <FlowContext.Provider value={{ flowState, updateFlowState, resetFlow }}>
      {children}
    </FlowContext.Provider>
  );
};

export const useFlow = () => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error('useFlow must be used within a FlowProvider');
  }
  return context;
};
