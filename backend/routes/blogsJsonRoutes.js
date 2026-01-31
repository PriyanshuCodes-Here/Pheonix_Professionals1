const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const BLOGS_JSON_PATH = path.join(
  __dirname,
  "../../client/src/data/blogs.json"
);

router.post("/blogs-json", (req, res) => {
  try {
    const { blogPosts } = req.body;

    if (!Array.isArray(blogPosts)) {
      return res.status(400).json({ message: "Invalid blogPosts data" });
    }

    const existing = JSON.parse(
      fs.readFileSync(BLOGS_JSON_PATH, "utf-8")
    );

    existing.blogPosts = blogPosts;

    fs.writeFileSync(
      BLOGS_JSON_PATH,
      JSON.stringify(existing, null, 2),
      "utf-8"
    );

    res.json({ success: true });
  } catch (err) {
    console.error("BLOG JSON SAVE ERROR:", err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
