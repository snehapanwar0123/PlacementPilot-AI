import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { matchJobDescription } from "../controllers/jobController.js";

const router = express.Router();

router.post("/match", protect, matchJobDescription);

export default router;