import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog
} from "../controllers/adminBlogController.js";
import express from "express";

import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

router.use(adminAuthMiddleware);

router.get("/", getBlogs);
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
