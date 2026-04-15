const express = require('express');
const router = express.Router();

// @route   GET api/results/:userId
// @desc    Get analysis history for a user
router.get('/:userId', (req, res) => {
  res.json({ message: `Results history for user ${req.params.userId} - Placeholder` });
});

module.exports = router;
