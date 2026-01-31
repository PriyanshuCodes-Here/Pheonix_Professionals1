import Blog from "../models/Blog.js";

/**
 * GET all blogs
 */
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

/**
 * CREATE blog
 */
export const createBlog = async (req, res) => {
  try {
    const { title, description, content, tags } = req.body;

    if (!title || !description || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const blog = await Blog.create({
      title,
      description,
      content,
      tags,
      author: "Admin",
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to create blog" });
  }
};

/**
 * UPDATE blog
 */
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to update blog" });
  }
};

/**
 * DELETE blog
 */
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete blog" });
  }
};
