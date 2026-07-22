import fs from "fs";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import Resume from "../models/Resume.js";
import { analyzeResume } from "../services/geminiService.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const pdfBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(pdfBuffer);

    const analysis = await analyzeResume(data.text);

    const resume = await Resume.create({
      user: req.user._id,
      fileName: req.file.originalname,
      atsScore: analysis.atsScore,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      suggestions: analysis.suggestions,
    });

    res.status(200).json({
      message: "Resume analyzed successfully",
      resume,
      analysis,
      resumeText: data.text,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(resumes);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};