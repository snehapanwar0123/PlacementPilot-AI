import { useState } from "react";
import { improveResume } from "../../services/resumeService";

export default function ResumeImprover({ resumeText }) {
  const [loading, setLoading] = useState(false);
  const [improvedResume, setImprovedResume] = useState("");

  const handleImprove = async () => {
    if (!resumeText) return;

    try {
      setLoading(true);

      const result = await improveResume(resumeText);

      setImprovedResume(result.improvedResume);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(improvedResume);
    alert("Copied to clipboard!");
  };

  return (
    <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        AI Resume Improver
      </h2>

      <button
        onClick={handleImprove}
        disabled={loading}
        className="rounded-lg bg-violet-600 px-6 py-3 text-white hover:bg-violet-700 disabled:opacity-50"
      >
        {loading ? "Improving..." : "Improve Resume"}
      </button>

      {improvedResume && (
        <>
          <textarea
            readOnly
            value={improvedResume}
            className="mt-6 h-80 w-full rounded-lg border border-slate-700 bg-slate-800 p-4 text-slate-200"
          />

          <button
            onClick={copyToClipboard}
            className="mt-4 rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
          >
            Copy Improved Resume
          </button>
        </>
      )}
    </div>
  );
}