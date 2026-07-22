import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    topic: {
      type: String,
      required: true,
      trim: true,
    },

    sheet: {
      type: String,
      default: "Striver A2Z",
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    platform: {
      type: String,
      enum: ["LeetCode", "CodeStudio", "GeeksforGeeks"],
      required: true,
    },

    url: {
      type: String,
      required: true,
    },

    companyTags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Problem", problemSchema);