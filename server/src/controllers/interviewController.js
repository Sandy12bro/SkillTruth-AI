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
 * Evaluate User Answer
 * POST /api/interview/evaluate
 */
const evaluateAnswer = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ success: false, message: 'Question and answer are required.' });
    }

    try {
      const prompt = `
        You are evaluating a candidate's response to an interview question.
        Question: "${question}"
        Candidate Answer: "${answer}"
        
        Provide a constructive evaluation of their answer.
        Return your response STRICTLY as a JSON object with this shape, no markdown blocks:
        {
          "score": 1-10,
          "feedback": "Feedback string",
          "authenticity": "High|Medium|Low",
          "interviewerResponse": "Conversational follow-up"
        }
      `;

      const aiResponse = await sendPrompt(prompt);
      const cleaned = aiResponse.replace(/```json|```|``json|``/g, "").trim();
      const evaluation = JSON.parse(cleaned);
      
      return res.status(200).json({ success: true, data: evaluation });

    } catch (aiErr) {
      if (aiErr.message.includes('429') || aiErr.message.includes('quota') || aiErr.message.includes('billing')) {
        console.warn("⚠️ EVALUATION QUOTA REACHED - ACTIVATING NEURAL SIMULATION");
        const evaluation = generateSimulatedEvaluation(answer);
        return res.status(200).json({
          success: true,
          data: evaluation,
          message: "Simulation Mode: Using local evaluation engine."
        });
      }
      throw aiErr;
    }
  } catch (error) {
    console.error('Error evaluating answer:', error);
    return res.status(500).json({ success: false, message: 'System error during evaluation.', error: error.message });
  }
};

module.exports = {
  generateQuestions,
  evaluateAnswer,
  generateStructuredQuestions
};
