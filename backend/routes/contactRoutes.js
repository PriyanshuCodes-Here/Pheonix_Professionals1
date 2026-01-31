const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Contact routes are working!'
  });
});

router.post('/', (req, res) => {
  console.log('Contact form data:', req.body);
  
  res.json({
    success: true,
    message: 'Contact form received!',
    data: req.body
  });
});

module.exports = router;  // ✅ Make sure this line is correct