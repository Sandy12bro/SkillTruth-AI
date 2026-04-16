require('dotenv').config();
const { sendPrompt } = require('./server/src/services/openaiService');

async function test() {
  console.log("Testing OpenAI connection with key:", process.env.OPENAI_API_KEY?.substring(0, 10) + "...");
  try {
    const res = await sendPrompt("Hello, respond with 'OpenAI is working'.");
    console.log("Response:", res);
  } catch (err) {
    console.error("TEST FAILED:", err.message);
  }
}

test();
