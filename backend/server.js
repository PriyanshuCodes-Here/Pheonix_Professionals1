// server.js (FINAL — UPLOAD LOGIC REMOVED)

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const publicBlogRoutes = require("./routes/publicBlogRoutes");
const servicesRoutes = require("./routes/serviceRoutes");
const blogsJsonRoutes = require("./routes/blogsJsonRoutes");

const app = express();

/* ================================
   BASIC CONFIG
================================ */
const PORT = process.env.PORT || 5001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

/* ================================
   MIDDLEWARE
================================ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS – Frontend (Vite)
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Security headers
app.use(helmet());

// Rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

/* ================================
   MONGODB CONNECTION
================================ */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection failed');
    console.error(err.message);
    process.exit(1);
  });

/* ================================
   HEALTH CHECK
================================ */
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    port: PORT,
    mongoState: mongoose.connection.readyState,
  });
});

/* ================================
   API ROUTES
================================ */
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/blogs', publicBlogRoutes);

/* 🔥 JSON-BASED CMS ROUTES ONLY */
app.use('/api', servicesRoutes);
app.use('/api', blogsJsonRoutes);

/* ================================
   404 HANDLER
================================ */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

/* ================================
   GLOBAL ERROR HANDLER
================================ */
app.use((err, req, res, next) => {
  console.error('🔥 Global Error:', err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

/* ================================
   START SERVER
================================ */
app.listen(PORT, () => {
  console.log('='.repeat(55));
  console.log(`🚀 Backend running on port: ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🖥 Frontend allowed: ${FRONTEND_URL}`);
  console.log('='.repeat(55));
});
