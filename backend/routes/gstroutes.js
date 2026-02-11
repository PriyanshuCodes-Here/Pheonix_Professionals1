import express, { Router } from "express";
import { validateGstData } from "../middlewares/validateGstData.js";
import { createGst } from "../controllers/gst.controller.js";

const router = express.Router();

Router.post('/submitgst', validateGstData, createGst);

export default router;