const { sendPrompt } = require('../services/openaiService');

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

    const payloadContext = `Skills: ${JSON.stringify(skills)}. Projects: ${JSON.stringify(projects || [])}`;

    const prompt = `
You are an expert AI technical recruiter generating an interview flow.
Based on the following candidate context, generate exactly 4 deep technical and behavioral interview questions designed to verify their integrity and actual depth of knowledge.
Make the questions conversational but challenging.

Candidate Context:
${payloadContext}

Return the response STRICTLY as a JSON array of strings. Do not use markdown blocks.
Example format:
[
  "Tell me about a challenging time you used React...",
  "Can you explain the architecture behind your E-commerce project?"
]
    `;

    const aiResponse = await sendPrompt(prompt);

    let questions;
    try {
      const cleanJsonStr = aiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      questions = JSON.parse(cleanJsonStr);
    } catch (parseError) {
      console.error('Failed to parse AI output as JSON:', aiResponse);
      // Fallback
      questions = [
        "Tell me about your most challenging technical project.",
        "How do you handle system failures in production?",
        "Describe a time you disagreed with an architectural decision.",
        "What is the most complex bug you've solved?"
      ];
    }

    return res.status(200).json({
      success: true,
      data: questions
    });
  } catch (error) {
    console.error('Error generating questions:', error);
    return res.status(500).json({ success: false, message: 'Failed to generate questions.', error: error.message });
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
      const cleanJsonStr = aiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
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
 * Evaluate User Answer
 * POST /api/interview/evaluate
 */
const evaluateAnswer = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ success: false, message: 'Question and answer are required.' });
    }

    const prompt = `
You are evaluating a candidate's response to an interview question.
Question: "${question}"
Candidate Answer: "${answer}"

Provide a constructive evaluation of their answer.
Return your response STRICTLY as a JSON object with this shape, no markdown blocks:
{
  "score": "A number between 1 and 10 grading their technical depth and accuracy",
  "feedback": "Constructive feedback on their answer, detailing what was good and what could be improved",
  "authenticity": "A brief assessment (e.g., 'High', 'Medium', 'Low') on whether the answer sounds genuine or potentially AI-generated/memorized, along with a short reason."
}
    `;

    const aiResponse = await sendPrompt(prompt);

    let evaluation;
    try {
      const cleanJsonStr = aiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      evaluation = JSON.parse(cleanJsonStr);
    } catch (parseError) {
      console.error('Failed to parse AI evaluation JSON:', aiResponse);
      evaluation = {
        score: 5,
        feedback: "We could not fully process your answer. Please ensure you are providing detailed technical responses.",
        authenticity: "Unknown - System parsing error occurred."
      };
    }

    return res.status(200).json({
      success: true,
      data: evaluation
    });
  } catch (error) {
    console.error('Error evaluating answer:', error);
    return res.status(500).json({ success: false, message: 'Failed to evaluate answer.', error: error.message });
  }
};

module.exports = {
  generateQuestions,
  evaluateAnswer,
  generateStructuredQuestions
};
