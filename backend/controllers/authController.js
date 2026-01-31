const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const admin = require('../config/firebaseAdmin');

/* =========================
   REGISTER
========================= */
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, company } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone,
      company,
      provider: 'local',
    });

    user.lastLogin = Date.now();
    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('❌ Registration Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Registration failed',
    });
  }
};

/* =========================
   LOGIN
========================= */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password required',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (user.provider !== 'local') {
      return res.status(400).json({
        success: false,
        message: `Please login using ${user.provider}`,
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    user.lastLogin = Date.now();
    await user.save();

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('❌ Login Error:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
};

/* =========================
   GOOGLE LOGIN (DEBUG + FIXED)
========================= */
const googleLogin = async (req, res) => {
  try {
    console.log('🔥 GOOGLE LOGIN API HIT');
    console.log('➡️ Request Body:', req.body);

    const { token } = req.body;

    if (!token) {
      console.log('❌ No token received from frontend');
      return res.status(400).json({
        success: false,
        message: 'Google ID token is missing',
      });
    }

    // 🔐 Verify Firebase ID token
    const decoded = await admin.auth().verifyIdToken(token);

    console.log('✅ Firebase token verified');
    console.log('➡️ Decoded Token:', decoded);

    const { uid, email, name, picture } = decoded;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email not found in Google token',
      });
    }

    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.log('🆕 Creating new Google user in MongoDB');

      user = await User.create({
        name: name || email.split('@')[0],
        email: email.toLowerCase(),
        googleId: uid,
        photo: picture || '',
        provider: 'google',
      });
    } else {
      console.log('♻️ Existing user found, updating Google data');

      user.googleId = uid;
      user.photo = picture || user.photo;
    }

    user.lastLogin = Date.now();
    await user.save();

    console.log('✅ User saved in MongoDB:', user.email);

    const jwtToken = generateToken(user._id);

    res.json({
      success: true,
      message: 'Google login successful',
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        provider: user.provider,
      },
    });
  } catch (error) {
    console.error('❌ Google Login Error:', error);

    res.status(401).json({
      success: false,
      message: error.message,
      code: error.code,
    });
  }
};

/* =========================
   GET ME
========================= */
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ success: true, user });
  } catch (error) {
    console.error('❌ GetMe Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch user' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  getMe,
};
