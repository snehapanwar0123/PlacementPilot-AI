import express from "express";

import upload from "../middleware/uploadMiddleware.js";

import { protect } from "../middleware/authMiddleware.js";
import {
    uploadResume,
    getMyResumes,
    } from "../controllers/resumeController.js";

const router = express.Router();


router.get("/", protect, getMyResumes);
router.post(
  "/upload",
  protect,
  upload.single("resume"),
  uploadResume
);
export default router;