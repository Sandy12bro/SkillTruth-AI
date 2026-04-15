const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');

router.post('/generate', interviewController.generateQuestions);
router.post('/evaluate', interviewController.evaluateAnswer);

module.exports = router;
