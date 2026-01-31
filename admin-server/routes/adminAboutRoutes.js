import express from "express";
import {
  getAbout,
  updateAbout,
} from "../controllers/adminAboutController.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

router.get("/", adminAuthMiddleware, getAbout);
router.put("/", adminAuthMiddleware, updateAbout);

export default router;
