const pdf = require('pdf-parse');
const { sendPrompt } = require('../services/openaiService');

/**
 * Handle Resume Upload and Text Extraction
 * POST /api/resume/upload
 */
const uploadResume = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No file uploaded or file is not a valid PDF.' 
      });
    }

    // Check if file buffer is empty
    if (req.file.size === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'The uploaded file is empty.' 
      });
    }

    // Parse the PDF buffer using pdf-parse
    const data = await pdf(req.file.buffer);
    const extractedText = data.text;

    // Check if the extracted text is empty or too short
    if (!extractedText || extractedText.trim().length < 50) {
      return res.status(400).json({
        success: false,
        message: 'PDF is not readable or not a valid resume.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Resume text extracted successfully.',
      data: {
        text: extractedText,
        numpages: data.numpages,
        info: data.info
      }
    });

  } catch (error) {
    console.error('Error parsing PDF:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing the PDF file.',
      error: error.message
    });
  }
};

/**
 * Handle Resume Text Analysis via OpenAI
 * POST /api/resume/analyze
 */
const analyzeResume = async (req, res) => {
  try {
    const { text } = req.body;

    console.log("🔥 ANALYSIS STARTED");
    console.log("Text length:", text?.length);

    if (!text || text.length < 50) {
      return res.json({
        success: false,
        message: "Resume content is too short or invalid",
      });
    }

    console.log("🔥 CALLING AI FOR REAL-TIME ANALYSIS");
    console.log(`Key State: ${!!process.env.OPENAI_API_KEY ? 'DEFINED' : 'MISSING'}`);

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Server Configuration Error: OpenAI API Key is missing."
      });
    }

    const prompt = `
      You are an expert technical recruiter and AI integrity engine. 
      Analyze the following resume text and provide a structured JSON response. 
      
      BE CRITICAL: Identify actual skill levels (Beginner, Intermediate, Advanced) based on project complexity and tenure.
      
      Text: "${text.replace(/"/g, "'").substring(0, 10000)}"

      Response MUST be in this EXACT JSON format:
      {
        "skills": [
          { "name": "Skill Name", "level": "Advanced|Intermediate|Beginner", "confidence": 0-100 }
        ],
        "projects": [
          { "name": "Project Name", "description": "Short bio", "technologies": ["Tech"], "complexity": "High|Medium|Low" }
        ],
        "experienceSummary": "One sentence summary of their professional path.",
        "strengths": ["Strength 1", "Strength 2"],
        "weaknesses": ["Area to verify 1", "Area to verify 2"]
      }

      Return ONLY the JSON object. No markdown, no prose.
    `;

    try {
      const aiRes = await sendPrompt(prompt);
      console.log("🤖 RAW AI RESPONSE RECEIVED:", aiRes.substring(0, 150) + "...");
      
      let cleanJson = aiRes;
      const firstBrace = aiRes.indexOf('{');
      const lastBrace = aiRes.lastIndexOf('}');
      
      if (firstBrace !== -1 && lastBrace !== -1) {
        cleanJson = aiRes.substring(firstBrace, lastBrace + 1);
      }

      cleanJson = cleanJson.replace(/```json|```|``json|``|`/g, "").trim();
      
      const parsedData = JSON.parse(cleanJson);
      process.stdout.write("✅ ANALYTICS PARSED SUCCESSFULLY\n");

      return res.json({
        success: true,
        data: parsedData
      });

    } catch (aiErr) {
      console.error("❌ AI EXCEPTION:", aiErr.message);
      return res.status(500).json({
        success: false,
        message: `Intelligence Engine Error: ${aiErr.message}`
      });
    }

  } catch (error) {
    console.error("❌ Critical Analysis Error:", error);
    res.status(500).json({
      success: false,
      message: `System Error: ${error.message}`
    });
  }
};

module.exports = {
  uploadResume,
  analyzeResume
};
