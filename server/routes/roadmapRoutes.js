import express from "express";
import {
  createRoadmap,
  getRoadmap,
  getRoadmapById,
} from "../controllers/roadmapController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router
  .route("/")
  .post(createRoadmap)
  .get(getRoadmap);

router.get("/:id", getRoadmapById);

export default router;