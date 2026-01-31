const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Blog routes are working!'
  });
});

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Get all blogs',
    blogs: []
  });
});

module.exports = router;  // ✅ Make sure this line is correct