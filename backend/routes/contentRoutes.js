const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Content routes are working!'
  });
});

module.exports = router;  // ✅ Make sure this line is correct