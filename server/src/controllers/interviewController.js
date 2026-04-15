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

Act naturally as the interviewer. Provide a short, constructive follow-up response (less than 3 sentences). 
Return your response STRICTLY as a JSON object with this shape, no markdown blocks:
{
  "interviewerResponse": "Your conversational reply here",
  "score": "A number between 1 and 10 grading their technical depth"
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
        interviewerResponse: "Thank you for explaining that. Let's move on.",
        score: 5
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
  evaluateAnswer
};
