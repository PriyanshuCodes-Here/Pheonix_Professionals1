const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

/* Ensure upload folders exist */
const BLOG_DIR = path.join(__dirname, "../uploads/blogs");
const AUTHOR_DIR = path.join(__dirname, "../uploads/authors");

[BLOG_DIR, AUTHOR_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

/* Multer storage */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.body.type === "author") cb(null, AUTHOR_DIR);
    else cb(null, BLOG_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage });

/* Upload endpoint */
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false });
  }

  const folder =
    req.body.type === "author" ? "authors" : "blogs";

  res.json({
    success: true,
    path: `/uploads/${folder}/${req.file.filename}`
  });
});

module.exports = router;
