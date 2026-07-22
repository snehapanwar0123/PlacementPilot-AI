import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    estimatedHours: {
      type: Number,
      default: 2,
    },
  },
  { _id: false }
);

const sectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    topics: [topicSchema],
  },
  { _id: false }
);

const roadmapSchema = new mongoose.Schema(
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

    currentLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    dailyHours: {
      type: Number,
      required: true,
    },

    sections: [sectionSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Roadmap", roadmapSchema);