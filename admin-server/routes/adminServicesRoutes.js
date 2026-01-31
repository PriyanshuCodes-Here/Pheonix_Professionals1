import express from "express";
import {
  getServices,
  saveServices
} from "../controllers/servicesJsonController.js";

const router = express.Router();

router.get("/", getServices);
router.post("/", saveServices);

export default router;
