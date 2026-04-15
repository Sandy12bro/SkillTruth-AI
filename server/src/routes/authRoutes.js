const express = require('express');
const router = express.Router();

// @route   POST api/auth/google
// @desc    Authenticate user with Google
router.post('/google', (req, res) => {
  res.json({ message: 'Auth route (Google) - Placeholder' });
});

// @route   GET api/auth/status
// @desc    Check auth status
router.get('/status', (req, res) => {
  res.json({ message: 'Auth status - Placeholder' });
});

module.exports = router;
