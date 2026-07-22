import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    answer: {
      type: String,
      required: true,
    },

    overallScore: Number,
    technicalAccuracy: Number,
    communication: Number,
    completeness: Number,
    confidence: Number,

    strengths: [String],
    weaknesses: [String],

    idealAnswer: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Interview", interviewSchema);