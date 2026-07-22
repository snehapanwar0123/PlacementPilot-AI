import { useEffect, useState } from "react";
import { getInterviewHistory } from "../../services/interviewService";

export default function InterviewHistory({ refreshKey }) {
  const [history, setHistory] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, [refreshKey]);

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const data = await getInterviewHistory();

      setHistory(data);

      // Keep the newest interview selected after refresh
      if (data.length > 0) {
        setSelectedInterview(data[0]);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load interview history.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-slate-400">Loading interview history...</p>
      </div>
    );
  }

  return (
    <div className="mt-12">

      <h2 className="mb-6 text-2xl font-bold text-violet-400">
        Interview History
      </h2>

      {history.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
          No interviews found.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">

          {/* History List */}

          <div className="space-y-4">

            {history.map((interview) => (

              <div
                key={interview._id}
                onClick={() => setSelectedInterview(interview)}
                className={`cursor-pointer rounded-xl border p-5 transition-all ${
                  selectedInterview?._id === interview._id
                    ? "border-violet-500 bg-slate-800"
                    : "border-slate-800 bg-slate-900 hover:border-slate-700"
                }`}
              >

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="font-semibold text-white">
                      {interview.role}
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      {interview.difficulty}
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      {new Date(interview.createdAt).toLocaleString()}
                    </p>

                  </div>

                  <div className="rounded-lg bg-violet-600 px-4 py-2 text-lg font-bold text-white">
                    {interview.overallScore}/10
                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* Report */}

          <div>

            {selectedInterview && (

              <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

                <h3 className="mb-6 text-2xl font-bold text-violet-400">
                  Interview Report
                </h3>

                <div className="space-y-6">

                  <div>
                    <h4 className="font-semibold text-slate-300">
                      Question
                    </h4>

                    <p className="mt-2 text-slate-200">
                      {selectedInterview.question}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-300">
                      Your Answer
                    </h4>

                    <p className="mt-2 whitespace-pre-wrap text-slate-200">
                      {selectedInterview.answer}
                    </p>
                  </div>

                  <div>

                    <h4 className="font-semibold text-emerald-400">
                      Strengths
                    </h4>

                    <ul className="mt-2 list-disc pl-6">

                      {(selectedInterview.strengths || []).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}

                    </ul>

                  </div>

                  <div>

                    <h4 className="font-semibold text-rose-400">
                      Weaknesses
                    </h4>

                    <ul className="mt-2 list-disc pl-6">

                      {(selectedInterview.weaknesses || []).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}

                    </ul>

                  </div>

                  <div>

                    <h4 className="font-semibold text-amber-400">
                      Ideal Answer
                    </h4>

                    <div className="mt-2 rounded-lg bg-slate-800 p-4 whitespace-pre-wrap text-slate-200">
                      {selectedInterview.idealAnswer}
                    </div>

                  </div>

                </div>

              </div>

            )}

          </div>

        </div>
      )}

    </div>
  );
}