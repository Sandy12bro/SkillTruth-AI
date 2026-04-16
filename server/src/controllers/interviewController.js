const { sendPrompt } = require('../services/openaiService');

/**
 * Generate 4 highly contextual simulated questions based on candidate resume
 */
const generateSimulatedQuestions = (skills, projects) => {
  const skillList = Array.isArray(skills) ? skills : [];
  const projList = Array.isArray(projects) ? projects : [];

  const questions = [
    `Regarding your proficiency in ${skillList[0]?.name || 'the tech stack'}, can you walk me through a complex technical challenge you solved using it?`,
    `Looking at your project "${projList[0]?.name || 'Main Technical Case'}", what were the most critical architectural decisions you made during the design phase?`,
    `How do you typically ensure code quality and performance when working with ${skillList[1]?.name || 'distributed systems'}?`,
    `Tell me about a time you had to optimize a specific feature in one of your projects. What was the impact on the final system?`
  ];

  return questions;
};

/**
 * Generate Interview Questions
 * POST /api/interview/generate
 */
const generateQuestions = async (req, res) => {
  try {
    const { skills, projects } = req.body;

    if (!skills) {
      return res.status(400).json({ success: false, message: 'Skills array is required to generate questions.' });
    }

    try {
      const payloadContext = `Skills: ${JSON.stringify(skills)}. Projects: ${JSON.stringify(projects || [])}`;
      const prompt = `
        You are an expert AI technical recruiter generating an interview flow.
        Based on the following candidate context, generate exactly 4 deep technical and behavioral interview questions designed to verify their integrity and actual depth of knowledge.
        
        Candidate Context:
        ${payloadContext}
        
        Return the response STRICTLY as a JSON array of strings. Do not use markdown blocks.
      `;

      const aiResponse = await sendPrompt(prompt);
      const cleaned = aiResponse.replace(/```json|```|``json|``/g, "").trim();
      const questions = JSON.parse(cleaned);
      
      return res.status(200).json({ success: true, data: questions });

    } catch (aiErr) {
      if (aiErr.message.includes('429') || aiErr.message.includes('quota') || aiErr.message.includes('billing')) {
        console.warn("⚠️ INTERVIEW QUOTA REACHED - ACTIVATING NEURAL SIMULATION");
        const questions = generateSimulatedQuestions(skills, projects);
        return res.status(200).json({
          success: true,
          data: questions,
          message: "Simulation Mode: Context-aware interview based on resume keywords."
        });
      }
      throw aiErr;
    }
  } catch (error) {
    console.error('Error generating questions:', error);
    return res.status(500).json({ success: false, message: 'System error during question generation.', error: error.message });
  }
};

/**
 * Generate Structured Questions
 * POST /api/interview/questions
 */
const generateStructuredQuestions = async (req, res) => {
  try {
    const { skills, projects } = req.body;

    if (!skills) {
      return res.status(400).json({ success: false, message: 'Skills array is required to generate questions.' });
    }

    const payloadContext = `Skills: ${JSON.stringify(skills)}. Projects: ${JSON.stringify(projects || [])}`;

    const prompt = `
You are an expert AI technical recruiter generating an interview flow.
Based on the following candidate context, generate deep technical and behavioral interview questions.
Make the questions practical and real-world to verify their actual depth of knowledge and integrity.

Candidate Context:
${payloadContext}

Categorize the output into exactly two arrays of strings:
- "skillQuestions": Practical and real-world questions focused on testing the candidate's core skills.
- "projectQuestions": Practical, real-world, and scenario-based questions probing into the architecture and challenges of their specific projects.

Return the response STRICTLY as a JSON object with two arrays. Do not use markdown blocks.
Example format:
{
  "skillQuestions": [
    "Practical skill question 1...",
    "Practical skill question 2..."
  ],
  "projectQuestions": [
    "Real-world project scenario question 1...",
    "Real-world project scenario question 2..."
  ]
}
    `;

    const aiResponse = await sendPrompt(prompt);

    let parsedQuestions;
    try {
      const cleanJsonStr = aiResponse.replace(/```json|```|``json|``/g, '').trim();
      parsedQuestions = JSON.parse(cleanJsonStr);
    } catch (parseError) {
      console.error('Failed to parse AI output as JSON:', aiResponse);
      // Fallback
      parsedQuestions = {
        skillQuestions: [
          "Describe a real-world scenario where you had to quickly learn and apply a new skill.",
          "How do you ensure best practices in your core skill set?"
        ],
        projectQuestions: [
          "Tell me about a time you faced a critical issue in your most significant project and how you solved it.",
          "Can you explain the architectural choices behind your main project and why they were right for that use case?"
        ]
      };
    }

    return res.status(200).json({
      success: true,
      data: parsedQuestions
    });
  } catch (error) {
    console.error('Error generating structured questions:', error);
    return res.status(500).json({ success: false, message: 'Failed to generate questions.', error: error.message });
  }
};

/**
 * Generate a realistic simulated evaluation for candidate answers
 */
const generateSimulatedEvaluation = (answer) => {
  const isTechnical = answer.length > 50;
  return {
    score: isTechnical ? 8 : 4,
    feedback: isTechnical 
      ? "Your technical depth on this topic is evident. Good focus on implementation details." 
      : "The answer seems a bit brief. Try to elaborate more on the technical challenges.",
    authenticity: isTechnical ? "High" : "Medium",
    interviewerResponse: "Understood. That's a valid perspective. Let's move to the next topic."
  };
};

/**
 * Handle Dynamic Interview Chat Loop
 * POST /api/interview/chat
 */
const chatInterview = async (req, res) => {
  try {
    const { history, resumeData } = req.body;

    if (!history || !resumeData) {
      return res.status(400).json({ success: false, message: 'History and resume context are required.' });
    }

    try {
      const prompt = `
        You are a BRUTALLY RIGOROUS AI Technical Recruiter. Your mission is to verify the candidate's absolute truth.
        
        CONTEXT:
        ${JSON.stringify(resumeData)}

        CONVERSATION HISTORY:
        ${JSON.stringify(history)}

        RULES:
        1. If the candidate is vague, DRILL DEEPER into specifics (architectural choices, specific libraries, edge cases).
        2. Once you verify basic knowledge, ask for CODE LOGIC or PSEUDO-CODE for a specific feature on their resume.
        3. Transition naturally between topics (e.g., from DB to Frontend).
        4. If you have a clear picture of their level (6-8 total messages usually), set "isCompleted": true.
        5. Be conversational but firm. No generic behavioral talk.

        RESPONSE FORMAT (STRICT JSON):
        {
          "nextQuestion": "The next question/probing point",
          "evaluation": "Small internal note on their last answer",
          "isCompleted": false
        }
      `;

      const aiResponse = await sendPrompt(prompt);
      const cleaned = aiResponse.replace(/```json|```|``json|``/g, "").trim();
      const parsed = JSON.parse(cleaned);

      return res.status(200).json({ success: true, data: parsed });

    } catch (aiErr) {
      console.warn("🤖 AI ENGINE EXCEPTION - ACTIVATING UNBREAKABLE SIMULATION:", aiErr.message);
      
      const messageCount = history.filter(m => m.sender === 'user').length;
      const skills = resumeData.skills || [];
      const projects = resumeData.projects || [];

      let nextQuestion = "";
      let isCompleted = false;

      // Unbreakable Logic Tree
      if (messageCount === 0) {
        nextQuestion = `I've analyzed your expertise in ${skills[0]?.name || 'this technical landscape'}. Can you walk me through the most significant architectural hurdle you faced recently?`;
      } else if (messageCount === 1) {
        nextQuestion = `Regarding "${projects[0]?.name || 'your core projects'}", how did you ensure system integrity and data consistency? Give me technical specifics.`;
      } else if (messageCount === 2) {
        nextQuestion = `Let's pivot to logic. If you had to refactor a performance bottleneck in ${skills[1]?.name || 'your primary stack'}, what would be your first optimization step?`;
      } else if (messageCount === 3) {
        nextQuestion = `Technical Depth Check: How would you scale this architecture to support a high-concurrency event? What component breaks first?`;
      } else if (messageCount === 4) {
        nextQuestion = `Almost there. Tell me about a time you had to integrate a complex third-party API. How did you handle failures or rate limits?`;
      } else {
        nextQuestion = "Thank you for the rigorous technical exchange. Our session is complete, and I've compiled your proficiency report.";
        isCompleted = true;
      }

      return res.status(200).json({
        success: true,
        data: {
          nextQuestion,
          evaluation: "Neural Simulation Mode: Adaptive technical pathing.",
          isCompleted
        }
      });
    }
  } catch (error) {
    console.error('Fatal Interrogation Error:', error);
    return res.status(500).json({ success: false, message: 'System Error: Re-initializing neural link...', error: error.message });
  }
};

module.exports = {
  generateQuestions,
  evaluateAnswer,
  generateStructuredQuestions,
  chatInterview
};
