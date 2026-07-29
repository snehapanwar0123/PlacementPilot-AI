import { Upload, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import {
  analyzeResume,
  getMyResumes,
} from "../../services/resumeService";

import ATSScoreCard from "./ATSScoreCard";
import AnalysisSection from "./AnalysisSection";
import ResumeHistory from "./ResumeHistory";
import ResumeImprover from "./ResumeImprover";
import JobMatcher from "../job/JobMatcher";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [selectedResume, setSelectedResume] = useState(null);
  const [error, setError] = useState("");
  const [resumes, setResumes] = useState([]);
  const [resumeText, setResumeText] = useState("");

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const data = await getMyResumes();
      console.log("Resume API Response:", data);
      setResumes(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setError("");

    try {
      setLoading(true);

      const result = await analyzeResume(file);

      setResumeText(result.resumeText);

      const analyzedResume = {
        atsScore: result.resume.atsScore,
        strengths: result.resume.strengths,
        weaknesses: result.resume.weaknesses,
        suggestions: result.resume.suggestions,
      };

      setAnalysis(analyzedResume);
      setSelectedResume(analyzedResume);

      await fetchResumes();
    } catch (err) {
      console.error(err);
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const displayedResume = selectedResume || analysis;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <h2 className="mb-6 text-xl font-semibold">
        Upload Resume
      </h2>

      <div className="mt-4">
        <label
          htmlFor="resume-upload"
          className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-violet-500 bg-slate-800 p-10 transition hover:border-violet-400 hover:bg-slate-700"
        >
          <Upload size={50} className="mb-4 text-violet-400" />

          <h3 className="text-xl font-semibold text-white">
            Upload Your Resume
          </h3>

          <p className="mt-2 text-slate-400">
            Drag & Drop your PDF here
          </p>

          <p className="mt-1 text-sm text-slate-500">
            or click to browse files
          </p>

          {file && (
            <div className="mt-6 flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2">
              <FileText className="text-green-400" size={20} />

              <span className="text-green-400">
                {file.name}
              </span>
            </div>
          )}
        </label>

        <input
          id="resume-upload"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setAnalysis(null);
            setSelectedResume(null);
            setResumeText("");
            setError("");
          }}
        />
      </div>

      <button
        onClick={handleAnalyze}
        disabled={!file || loading}
        className="mt-6 rounded-lg bg-violet-600 px-6 py-3 text-white transition hover:bg-violet-700 disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {error && (
        <p className="mt-4 text-red-400">
          {error}
        </p>
      )}

      {displayedResume && (
        <div className="mt-10 space-y-6">
          <ATSScoreCard score={displayedResume.atsScore} />

          <AnalysisSection
            title="Strengths"
            items={displayedResume.strengths}
            color="text-green-400"
          />

          <AnalysisSection
            title="Weaknesses"
            items={displayedResume.weaknesses}
            color="text-red-400"
          />

          <AnalysisSection
            title="Suggestions"
            items={displayedResume.suggestions}
            color="text-yellow-400"
          />
        </div>
      )}

      {resumeText && (
        <ResumeImprover resumeText={resumeText} />
      )}

      {resumeText && (
        <JobMatcher resumeText={resumeText} />
      )}

      <ResumeHistory
        resumes={resumes}
        onView={setSelectedResume}
      />
    </div>
  );
}