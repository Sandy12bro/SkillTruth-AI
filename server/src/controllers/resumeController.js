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

    console.log("🔥 FORCE TEST RUN - Bypassing OpenAI");

    const forceData = {
      skills: [
        { name: "React", level: "Intermediate", confidence: 80 },
        { name: "Node.js", level: "Intermediate", confidence: 75 },
        { name: "OpenAI Integration", level: "Advanced", confidence: 95 }
      ],
      projects: [
        {
          name: "SkillTruth AI (FORCE TEST)",
          description: "This is hardcoded data to verify the frontend pipeline is working correctly. If you see this, the AI integration is your broken link.",
          technologies: ["React", "Node", "OpenAI"],
          complexity: "High"
        }
      ],
      experienceSummary: "Full-stack developer with AI experience - Verified via Force Test Bypass.",
      strengths: ["Clean Architecture", "Precision Logic", "Diagnostic Thinking"],
      weaknesses: ["AI Pipeline Instability (Currently Investigating)"]
    };

    return res.json({
      success: true,
      data: forceData
    });

  } catch (error) {
    console.error("❌ Critical Analysis Error:", error);
    res.status(500).json({
      success: false,
      message: "An internal error occurred during analysis.",
      error: error.message
    });
  }
};

module.exports = {
  uploadResume,
  analyzeResume
};
