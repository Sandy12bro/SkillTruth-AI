const express = require('express');
const router = express.Router();
const multer = require('multer');
const resumeController = require('../controllers/resumeController');

// Configure Multer for PDF memory storage validation
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Only accept PDF
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF format is allowed!'), false);
    }
  }
});

// Middleware to catch multer errors gracefully
const uploadMiddleware = (req, res, next) => {
  const uploadSingle = upload.single('resume');
  uploadSingle(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading (e.g., file too large).
      return res.status(400).json({ success: false, message: err.message });
    } else if (err) {
      // An unknown error occurred when uploading (e.g., wrong file type).
      return res.status(400).json({ success: false, message: err.message });
    }
    // Everything went fine.
    next();
  });
};

// @route   POST /api/resume/upload
// @desc    Upload PDF resume and parse text
// @access  Public (for now)
router.post('/upload', uploadMiddleware, resumeController.uploadResume);

// @route   POST /api/resume/analyze
// @desc    Send raw resume text to OpenAI to structure it
// @access  Public (for now)
router.post('/analyze', resumeController.analyzeResume);

// Keep the base route for simple status checking
router.get('/', (req, res) => {
    res.json({ message: 'Resume API is active' });
});

module.exports = router;
