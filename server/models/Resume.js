import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    atsScore: {
      type: Number,
      required: true,
    },

    strengths: [String],

    weaknesses: [String],

    suggestions: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Resume", resumeSchema);