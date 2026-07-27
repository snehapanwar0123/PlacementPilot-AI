import { useState } from "react";
import { matchJob } from "../../services/jobService";

export default function JobMatcher({ resumeText }) {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!resumeText || !jobDescription) return;

    try {
      setLoading(true);

      const data = await matchJob(resumeText, jobDescription);

      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Failed to analyze job description.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Job Description ATS Matcher
      </h2>

      <textarea
        rows={10}
        placeholder="Paste the Job Description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-4 text-white outline-none"
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="mt-5 rounded-lg bg-violet-600 px-6 py-3 text-white hover:bg-violet-700 disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Match"}
      </button>

      {result && (
        <div className="mt-8 space-y-6">
          <div className="rounded-xl bg-slate-800 p-5">
            <h3 className="text-xl font-bold text-green-400">
              Match Score: {result.matchScore}%
            </h3>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold text-green-400">
              Matched Skills
            </h3>

            <ul className="list-disc pl-5 text-white">
              {result.matchedSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold text-red-400">
              Missing Keywords
            </h3>

            <ul className="list-disc pl-5 text-white">
              {result.missingKeywords.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold text-yellow-400">
              Suggestions
            </h3>

            <ul className="list-disc pl-5 text-white">
              {result.suggestions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}