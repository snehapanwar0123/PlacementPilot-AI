import Interview from "../models/Interview.js";
import { generateInterviewQuestion } from "../services/geminiService.js";

export const startInterview = async (req, res) => {
  try {
    const { role, difficulty } = req.body;

    if (!role || !difficulty) {
      return res.status(400).json({
        message: "Role and difficulty are required.",
      });
    }

    const question = await generateInterviewQuestion(role, difficulty);

    res.status(200).json({
      question,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getInterviewHistory = async (req, res) => {
  try {
    const interviews = await Interview.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(interviews);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};