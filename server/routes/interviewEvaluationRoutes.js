import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { evaluateAnswer } from "../controllers/interviewEvaluationController.js";

const router = express.Router();

router.post("/", protect, evaluateAnswer);

export default router;