import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { improveResumeContent } from "../controllers/improveController.js";

const router = express.Router();

router.post("/", protect, improveResumeContent);

export default router;