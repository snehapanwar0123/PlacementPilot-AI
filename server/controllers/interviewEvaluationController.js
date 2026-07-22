import Interview from "../models/Interview.js";
import { evaluateInterviewAnswer } from "../services/geminiService.js";

export const evaluateAnswer = async (req, res) => {
  try {
    console.log(req.body);
    const { role, difficulty, question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        message: "Question and answer are required.",
      });
    }

    const evaluation = await evaluateInterviewAnswer(question, answer);

    const interview = await Interview.create({
      user: req.user._id,
      role,
      difficulty,
      question,
      answer,

      overallScore: evaluation.overallScore,
      technicalAccuracy: evaluation.technicalAccuracy,
      communication: evaluation.communication,
      completeness: evaluation.completeness,
      confidence: evaluation.confidence,

      strengths: evaluation.strengths,
      weaknesses: evaluation.weaknesses,
      idealAnswer: evaluation.idealAnswer,
    });

    res.status(200).json({
      message: "Interview evaluated successfully.",
      evaluation,
      interview,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};