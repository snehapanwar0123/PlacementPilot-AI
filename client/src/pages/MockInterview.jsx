import { useState } from "react";
import {
  startInterview,
  evaluateAnswer,
} from "../services/interviewService";
import InterviewHistory from "../components/interview/InterviewHistory";

function ScoreCard({ title, value }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 text-center">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-2 text-3xl font-bold text-white">
        {value ?? 0}
        <span className="text-lg text-slate-500"> /10</span>
      </p>
    </div>
  );
}

export default function MockInterview() {
  const [role, setRole] = useState("Full Stack Developer");
  const [difficulty, setDifficulty] = useState("Medium");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  // Used to refresh InterviewHistory
  const [refreshKey, setRefreshKey] = useState(0);

  const handleStart = async () => {
    try {
      setLoading(true);

      const data = await startInterview(role, difficulty);

      setQuestion(data.question);
      setAnswer("");
      setEvaluation(null);
    } catch (error) {
      console.error(error);
      alert("Failed to start interview.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!answer.trim()) {
      alert("Please enter an answer.");
      return;
    }

    try {
      setLoading(true);

      const data = await evaluateAnswer(
        role,
        difficulty,
        question,
        answer
      );

      setEvaluation(data.evaluation || data);

      // Refresh interview history automatically
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      alert("Failed to evaluate answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl p-8">

        <h1 className="mb-8 text-4xl font-bold text-violet-400">
          AI Mock Interview
        </h1>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="text-slate-300">
                Role
              </label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
              >
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Full Stack Developer</option>
                <option>Machine Learning Engineer</option>
                <option>Data Analyst</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300">
                Difficulty
              </label>

              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

          </div>

          <button
            onClick={handleStart}
            disabled={loading}
            className="mt-6 rounded-lg bg-violet-600 px-6 py-3 font-medium transition hover:bg-violet-700 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Start Interview"}
          </button>

        </div>

        {question && (
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="text-xl font-bold text-violet-400">
              Interview Question
            </h2>

            <div className="mt-4 rounded-lg bg-slate-800 p-5 leading-7">
              {question}
            </div>

            <textarea
              rows={8}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer..."
              className="mt-6 w-full rounded-lg border border-slate-700 bg-slate-800 p-4 text-white outline-none focus:border-violet-500"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-6 rounded-lg bg-emerald-600 px-6 py-3 font-medium transition hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? "Evaluating..." : "Submit Answer"}
            </button>

          </div>
        )}

        {evaluation && (
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="mb-6 text-2xl font-bold text-violet-400">
              Latest Evaluation
            </h2>

            <div className="grid gap-4 md:grid-cols-5">

              <ScoreCard title="Overall" value={evaluation.overallScore} />
              <ScoreCard title="Technical" value={evaluation.technicalAccuracy} />
              <ScoreCard title="Communication" value={evaluation.communication} />
              <ScoreCard title="Completeness" value={evaluation.completeness} />
              <ScoreCard title="Confidence" value={evaluation.confidence} />

            </div>

          </div>
        )}

        <InterviewHistory refreshKey={refreshKey} />

      </div>
    </div>
  );
}