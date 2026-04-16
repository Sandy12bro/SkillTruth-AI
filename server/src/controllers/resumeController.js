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
 * Generate a high-quality simulated analysis based on resume text keywords
 * (Used as a fallback when AI Quota is reached)
 */
const generateSimulatedAnalysis = (text) => {
  const commonSkills = ['React', 'Node.js', 'JavaScript', 'Python', 'Java', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'SQL', 'AWS', 'Docker', 'Git'];
  const extractedSkills = commonSkills.filter(skill => 
    new RegExp(`\\b${skill}\\b`, 'i').test(text)
  ).slice(0, 6);

  // If no skills found, provide a generic set
  const skills = extractedSkills.length > 0 ? extractedSkills : ['Communication', 'Teamwork', 'Problem Solving'];

  return {
    skills: skills.map(name => ({
      name,
      level: Math.random() > 0.5 ? 'Advanced' : 'Intermediate',
      confidence: Math.floor(Math.random() * 20) + 75
    })),
    projects: [
      {
        name: "Professional Portfolio System",
        description: "A comprehensive technical showcase built with the identified stack.",
        technologies: skills.slice(0, 3),
        complexity: "High"
      }
    ],
    experienceSummary: "A demonstrated history of technical contributions and iterative development cycles.",
    strengths: ["Technical Proficiency", "Core Architecture Understanding"],
    weaknesses: ["Deep Niche Specialization", "Extended System Scaling"],
    isSimulated: true // Diagnostic flag
  };
};

/**
 * Handle Resume Text Analysis via OpenAI
 * POST /api/resume/analyze
 */
const analyzeResume = async (req, res) => {
  try {
    const { text } = req.body;

    console.log("🔥 ANALYSIS STARTED");
    if (!text || text.length < 50) {
      return res.json({ success: false, message: "Resume content is too short or invalid" });
    }

    try {
      console.log("🔥 CALLING AI FOR REAL-TIME ANALYSIS");
      const aiRes = await sendPrompt(text.substring(0, 8000)); // Safer truncation
      
      let cleanJson = aiRes;
      const firstBrace = aiRes.indexOf('{');
      const lastBrace = aiRes.lastIndexOf('}');
      
      if (firstBrace !== -1 && lastBrace !== -1) {
        cleanJson = aiRes.substring(firstBrace, lastBrace + 1);
      }

      const parsedData = JSON.parse(cleanJson.replace(/```json|```|`/g, "").trim());
      process.stdout.write("✅ AI ANALYSIS COMPLETED\n");

      return res.json({ success: true, data: parsedData });

    } catch (aiErr) {
      // 429 is the specific Quota error
      if (aiErr.message.includes('429') || aiErr.message.includes('quota') || aiErr.message.includes('billing')) {
        console.warn("⚠️ AI QUOTA REACHED - ACTIVATING NEURAL SIMULATION");
        const simulatedData = generateSimulatedAnalysis(text);
        return res.json({
          success: true,
          data: simulatedData,
          message: "Simulation Mode: AI Quota reached. Providing keyword-based analysis."
        });
      }
      
      throw aiErr;
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
