import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    profilePicture: {
      type: String,
      default: "",
    },

    college: {
      type: String,
      default: "",
    },

    branch: {
      type: String,
      default: "",
    },

    graduationYear: {
      type: Number,
      default: new Date().getFullYear(),
    },

    targetRole: {
      type: String,
      enum: [
        "SDE",
        "Product Analyst",
        "Data Analyst",
        "ML Engineer",
        "Full Stack",
      ],
      default: "SDE",
    },

    skills: {
      type: [String],
      default: [],
    },

    experienceLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    dailyStudyHours: {
      type: Number,
      default: 2,
    },

    preferredLanguage: {
      type: String,
      enum: ["C++", "Java", "Python"],
      default: "C++",
    },

    notifications: {
      calendar: {
        type: Boolean,
        default: true,
      },
      interview: {
        type: Boolean,
        default: true,
      },
      oa: {
        type: Boolean,
        default: true,
      },
      weeklySummary: {
        type: Boolean,
        default: true,
      },
    },

    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "system",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Settings", settingsSchema);