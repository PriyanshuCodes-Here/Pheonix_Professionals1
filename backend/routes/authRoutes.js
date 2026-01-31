const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  googleLogin,
  getMe,
} = require('../controllers/authController');

const authMiddleware = require('../middleware/authMiddleware');

/* =========================
   TEST
========================= */
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Auth routes working',
  });
});

/* =========================
   AUTH ROUTES
========================= */

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Google Login
router.post('/google', googleLogin);

// Get current user (protected)
router.get('/me', authMiddleware, getMe);

module.exports = router;
