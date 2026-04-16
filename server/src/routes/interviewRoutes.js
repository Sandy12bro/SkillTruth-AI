const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');

router.post('/generate', interviewController.generateQuestions);
router.post('/evaluate', interviewController.evaluateAnswer);
router.post('/questions', interviewController.generateStructuredQuestions);
router.post('/chat', interviewController.chatInterview);

module.exports = router;
