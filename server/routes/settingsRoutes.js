import express from "express";
import {
  getSettings,
  updateSettings,
} from "../controllers/settingsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all routes
router.use(protect);

// GET /api/settings
// PUT /api/settings
router
  .route("/")
  .get(getSettings)
  .put(updateSettings);

export default router;