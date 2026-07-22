import express from "express";
import {
  getSmartNotes,
  getAllNotes,
  getNoteById,
  deleteNote,
} from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, getSmartNotes);

router.get("/", protect, getAllNotes);

router.get("/:id", protect, getNoteById);

router.delete("/:id", protect, deleteNote);

export default router;