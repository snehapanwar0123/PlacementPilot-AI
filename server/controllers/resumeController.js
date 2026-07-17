import fs from "fs";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
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

    res.status(200).json({
      message: "Resume analyzed successfully",
      file: req.file.filename,
      analysis,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};