import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },

    options: {
      type: [String],
      default: [],
    },

    answer: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    roadmaps: [
  {
    roadmapId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roadmap",
      required: true,
    },

    role: {
      type: String,
      required: true,
    },
  },
],

    topic: {
      type: String,
      required: true,
      trim: true,
    },

    explanation: {
      type: String,
      default: "",
    },

    keyConcepts: {
      type: [String],
      default: [],
    },

    commonMistakes: {
      type: [String],
      default: [],
    },

    interviewQuestions: {
      type: [String],
      default: [],
    },

    exampleCode: {
      type: String,
      default: "",
    },

    revisionSummary: {
      type: String,
      default: "",
    },

    quiz: {
      type: [quizSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Note", noteSchema);