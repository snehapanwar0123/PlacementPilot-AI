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
export const improveResume = async (resumeText) => {
  const prompt = `
You are an expert resume writer.

Rewrite the following resume professionally.

Rules:
- Improve grammar.
- Use strong action verbs.
- Add ATS-friendly wording.
- Keep all facts truthful.
- Don't invent experience.
- Return only the improved resume.

Resume:

${resumeText}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
  });

  return response.text;
};
export const matchResumeWithJob = async (resumeText, jobDescription) => {
  const prompt = `
You are an expert ATS (Applicant Tracking System) evaluator.

Compare the following resume with the job description.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return ONLY valid JSON in this exact format:

{
  "matchScore": 85,
  "matchedSkills": [
    "React",
    "Node.js"
  ],
  "missingKeywords": [
    "Docker",
    "AWS"
  ],
  "suggestions": [
    "Add Docker experience.",
    "Mention CI/CD projects.",
    "Highlight backend achievements using metrics."
  ]
}

Rules:
- matchScore must be an integer between 0 and 100.
- Do not include markdown.
- Do not wrap the JSON inside \`\`\`.
- Do not write any explanation outside the JSON.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
  });

  let text = response.text.trim();

  // Remove markdown code fences if Gemini accidentally adds them
  text = text.replace(/```json/g, "").replace(/```/g, "").trim();

  return JSON.parse(text);
};

export const generateInterviewQuestion = async (role, difficulty) => {
  const prompt = `
You are an experienced technical interviewer.

Generate ONE interview question.

Role: ${role}
Difficulty: ${difficulty}

Rules:
- Return only the interview question.
- Do not number it.
- Do not include explanations.
- Do not include answers.
- Make it realistic and commonly asked in interviews.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
  });

  return response.text.trim();
};

export const evaluateInterviewAnswer = async (question, answer) => {
  const prompt = `
You are a senior software engineering interviewer.

Evaluate the candidate's answer.

Interview Question:
${question}

Candidate's Answer:
${answer}

Return ONLY valid JSON in this exact format:

{
  "overallScore": 8,
  "technicalAccuracy": 8,
  "communication": 9,
  "completeness": 7,
  "confidence": 8,
  "strengths": [
    "Good explanation of the core concept.",
    "Used correct terminology."
  ],
  "weaknesses": [
    "Missed important edge cases.",
    "Could provide a more practical example."
  ],
  "idealAnswer": "Write a concise model answer that demonstrates an excellent response."
}

Rules:
- Scores must be integers from 0 to 10.
- strengths and weaknesses should each contain 2-4 concise points.
- idealAnswer should be under 200 words.
- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT wrap the JSON inside \`\`\`.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
  });

  let text = response.text.trim();

  text = text.replace(/```json/g, "").replace(/```/g, "").trim();

  return JSON.parse(text);
};

export async function generateRoadmap(
  role,
  currentLevel,
  duration,
  dailyHours
) {
  const prompt = `
You are an experienced placement mentor who has helped students prepare for software engineering interviews at top product companies and startups.

Your goal is NOT to generate a generic syllabus.

Your goal is to maximize the student's placement success within the available time.

Student Information

Target Role:
${role}

Current Level:
${currentLevel}

Preparation Duration:
${duration}

Daily Study Hours:
${dailyHours}

Create a realistic, industry-oriented roadmap.

Prioritize topics according to their interview importance.

Avoid teaching unnecessary concepts that rarely appear in interviews.

Focus on high ROI learning.

Generate ONLY the sections that are relevant for the chosen role.

For each section:

- arrange topics from beginner to advanced
- estimate study hours realistically
- include only concepts worth learning
- avoid duplicates
- keep topic names concise

Examples:

For Frontend:
HTML → CSS → JavaScript → ES6 → React → Routing → State Management → Performance → Testing → Projects

For Backend:
Language → OOP → APIs → Authentication → Databases → Caching → Docker → Deployment → System Design

For Data Science:
Python → Statistics → NumPy → Pandas → ML → Feature Engineering → SQL → Projects

For every topic include:

{
"title":"",
"estimatedHours":number
}

Guidelines:

- Build knowledge progressively.
- Respect the available preparation duration.
- If daily hours are low, prioritize essential topics.
- If preparation time is long, include advanced topics.
- Recommend 2–3 portfolio-worthy projects near the end.
- Reserve the final week for revision and mock interviews.
- Return ONLY valid JSON. `;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
  });

  let text = response.text.trim();

  text = text.replace(/```json/g, "");
  text = text.replace(/```/g, "");

  return JSON.parse(text);
}
export async function generateSmartNotes(
  role,
  currentLevel,
  topic
) {
  const prompt = `
You are an expert technical mentor helping students prepare for software engineering placements.

Target Role:
${role}

Current Level:
${currentLevel}

Topic:
${topic}

Return ONLY valid JSON.

Format:

{
  "explanation":"",

  "keyConcepts":[
    ""
  ],

  "commonMistakes":[
    ""
  ],

  "interviewQuestions":[
    ""
  ],

  "exampleCode":"",

  "revisionSummary":"",

  "quiz":[
    {
      "question":"",
      "options":[
        "",
        "",
        "",
        ""
      ],
      "answer":""
    }
  ]
}

Rules:

- Return ONLY JSON.
- No markdown.
- No code fences.
- No explanations outside JSON.

Requirements:

1. explanation
- Beginner-friendly.
- Easy to understand.
- Around 150–250 words.

2. keyConcepts
- 5–8 concise bullet points.

3. commonMistakes
- 4–6 common mistakes beginners make.

4. interviewQuestions
- 5 realistic placement interview questions.

5. exampleCode
- Short, clean example if applicable.
- If the topic is theoretical (OS, DBMS, CN), provide a small illustrative example or pseudocode.

6. revisionSummary
- Short revision sheet (5–10 lines).

7. quiz
- 5 MCQs.
- Each question must have exactly 4 options.
- Include the correct answer exactly as one of the options.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
  });

  let text = response.text.trim();

  text = text.replace(/```json/g, "");
  text = text.replace(/```/g, "");

  return JSON.parse(text);
}