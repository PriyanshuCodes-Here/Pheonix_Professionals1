// backend/routes/publicBlogRoutes.js
const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

/**
 * GET all published blogs (PUBLIC)
 */
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});

/**
 * GET single blog by ID (PUBLIC)
 */
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blog" });
  }
});

module.exports = router; // ✅ THIS LINE IS CRITICAL
