import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import improveRoutes from "./routes/improveRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import interviewEvaluationRoutes from "./routes/interviewEvaluationRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import codingArenaRoutes from "./routes/codingArenaRoutes.js";

// Import database connection (we'll create this next)
import connectDB from "./config/db.js";

// Load environment variables
dotenv.config();

// Create Express application
const app = express();

// Connect to MongoDB
connectDB();
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/improve", improveRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/interview/evaluate", interviewEvaluationRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/coding", codingArenaRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to PlacementPilot AI Backend",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});