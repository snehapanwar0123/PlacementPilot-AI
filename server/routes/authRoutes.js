import express from "express";



import { protect } from "../middleware/authMiddleware.js";
import {
    registerUser,
    loginUser,
    getCurrentUser,
    changePassword,
} from "../controllers/authController.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Route
router.get("/me", protect, getCurrentUser);
router.put(
    "/change-password",
    protect,
    changePassword
);

export default router;
