import { Sparkles } from "lucide-react";

export default function AICoachCard({ stats }) {
  const suggestions = [];

  if (stats.resumeScore < 80) {
    suggestions.push("Improve your resume before applying to more companies.");
  } else {
    suggestions.push("Your resume score looks good. Keep it updated.");
  }

  if (stats.companiesApplied < 10) {
    suggestions.push("Increase your applications. Aim for at least 20.");
  }

  if (stats.interviews > 0) {
    suggestions.push(
      `You have ${stats.interviews} interview${
        stats.interviews > 1 ? "s" : ""
      }. Revise DSA, DBMS and OS.`
    );
  }

  if (stats.offers > 0) {
    suggestions.push(
      `Congratulations! You have ${stats.offers} offer${
        stats.offers > 1 ? "s" : ""
      }.`
    );
  }

  if (suggestions.length === 0) {
    suggestions.push("Everything looks good. Keep up the momentum!");
  }

  return (
    <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-600/20 to-slate-900 p-6">
      <div className="mb-4 flex items-center gap-3">
        <Sparkles className="text-violet-400" />
        <h2 className="text-xl font-bold">AI Coach</h2>
      </div>

      <ul className="space-y-3 text-slate-300">
        {suggestions.map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}