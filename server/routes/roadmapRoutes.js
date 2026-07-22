import express from "express";
import {
  createRoadmap,
  getRoadmap,
} from "../controllers/roadmapController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router
  .route("/")
  .post(createRoadmap)
  .get(getRoadmap);

export default router;