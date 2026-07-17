import ai from "../config/gemini.js";

export async function analyzeResume(resumeText) {
  const prompt = `
You are an expert ATS (Applicant Tracking System) and career coach.

Analyze the following resume.

Return ONLY valid JSON.

Format:

{
  "atsScore": number,
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}

Resume:

${resumeText}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
  });

  const cleanText = response.text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

return JSON.parse(cleanText);
}