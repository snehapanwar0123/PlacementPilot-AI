import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import database connection (we'll create this next)
import connectDB from "./config/db.js";

// Load environment variables
dotenv.config();

// Create Express application
const app = express();

// Connect to MongoDB
import mongoose from "mongoose";

console.log("URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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