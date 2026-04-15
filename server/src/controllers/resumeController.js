const pdf = require('pdf-parse');

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

    // Check if the extracted text is empty
    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Could not extract text. The PDF might be scanned or image-based.'
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

const { sendPrompt } = require('../services/openaiService');

/**
 * Handle Resume Text Analysis via OpenAI
 * POST /api/resume/analyze
 */
const analyzeResume = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No resume text provided for analysis.'
      });
    }

    const prompt = `
You are an expert technical AI recruiter. Analyze the following resume text and extract the core capabilities into a STRICT JSON object. Do not wrap the JSON in markdown code blocks. Just output valid JSON.
The JSON must follow this exact structure:
{
  "skills": ["skill1", "skill2"],
  "projects": [{"title": "Project Name", "description": "Project overview"}],
  "experience": [{"role": "Job Title", "duration": "Duration in months or years", "details": "Brief description"}]
}

Resume Text:
${text}
`;

    // Send prompt to OpenAI
    const aiResponse = await sendPrompt(prompt);

    // Parse the JSON safely
    let structuredData;
    try {
      // In case the model still outputs markdown blocks, strip them safely
      const cleanJsonStr = aiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      structuredData = JSON.parse(cleanJsonStr);
    } catch (parseError) {
      console.error('Failed to parse AI output as JSON:', aiResponse);
      return res.status(500).json({
        success: false,
        message: 'OpenAI returned a response that could not be parsed as JSON.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Resume analyzed successfully.',
      data: structuredData
    });

  } catch (error) {
    console.error('Error analyzing resume:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during AI analysis.',
      error: error.message
    });
  }
};

module.exports = {
  uploadResume,
  analyzeResume
};
