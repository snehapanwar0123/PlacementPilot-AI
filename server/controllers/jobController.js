import { matchResumeWithJob } from "../services/geminiService.js";

export const matchJobDescription = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        message: "Resume text and job description are required.",
      });
    }

    const result = await matchResumeWithJob(
      resumeText,
      jobDescription
    );

    res.status(200).json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};