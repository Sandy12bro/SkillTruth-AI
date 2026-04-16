const OpenAI = require('openai');

// Initialize the OpenAI client using the key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Reusable service to send a prompt to the OpenAI API
 * @param {string} prompt - The input text for the model.
 * @returns {string} - The AI's response text.
 */
const sendPrompt = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    const errorMsg = error.response?.data?.error?.message || error.message || 'Unknown OpenAI Error';
    console.error('❌ OpenAI Service Error:', errorMsg);
    throw new Error(`OpenAI Error: ${errorMsg}`);
  }
};

module.exports = {
  sendPrompt,
};
