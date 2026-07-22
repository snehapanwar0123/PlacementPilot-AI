import express from "express";
import {
  getTopics,
  getProblems,
  completeProblem,
  getProgress,
} from "../controllers/codingArenaController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/topics", protect, getTopics);

router.get("/problems", protect, getProblems);

router.post("/complete", protect, completeProblem);

router.get("/progress", protect, getProgress);

export default router;