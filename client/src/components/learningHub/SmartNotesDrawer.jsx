import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SmartNotesDrawer({
  topic,
  roadmapId,
  onClose,
}) {
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!topic) return;

    const fetchNotes = async () => {
      try {
        setLoading(true);

        const token = JSON.parse(
          localStorage.getItem("user")
        ).token;

        const response = await axios.post(
          "http://localhost:5000/api/notes",
          {
            roadmapId,
            topic,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setNote(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [topic, roadmapId]);

  if (!topic) return null;

  return (
    <div className="fixed top-0 right-0 h-screen w-[420px] bg-slate-900 border-l border-slate-700 shadow-2xl z-50 p-6 overflow-y-auto">

      <button
        onClick={onClose}
        className="text-white text-xl mb-6"
      >
        ✕
      </button>

      <h1 className="text-3xl font-bold text-white mb-2">
        {topic}
      </h1>

      <p className="text-slate-400 mb-6">
        AI Smart Notes
      </p>

      {loading ? (
        <p className="text-slate-300">
          Generating Notes...
        </p>
      ) : note ? (
        <>
          <div className="space-y-5">

            <div className="bg-slate-800 rounded-xl p-4">
              <h2 className="text-cyan-400 font-semibold mb-2">
                Explanation
              </h2>

              <p className="text-slate-300 whitespace-pre-wrap">
                {note.explanation}
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <h2 className="text-cyan-400 font-semibold mb-2">
                Key Concepts
              </h2>

              <ul className="list-disc ml-5 text-slate-300">
                {note.keyConcepts.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <h2 className="text-cyan-400 font-semibold mb-2">
                Common Mistakes
              </h2>

              <ul className="list-disc ml-5 text-slate-300">
                {note.commonMistakes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <h2 className="text-cyan-400 font-semibold mb-2">
                Interview Questions
              </h2>

              <ul className="list-disc ml-5 text-slate-300">
                {note.interviewQuestions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <h2 className="text-cyan-400 font-semibold mb-2">
                Example Code
              </h2>

              <pre className="text-sm text-slate-300 whitespace-pre-wrap">
                {note.exampleCode}
              </pre>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <h2 className="text-cyan-400 font-semibold mb-2">
                Revision Summary
              </h2>

              <p className="text-slate-300 whitespace-pre-wrap">
                {note.revisionSummary}
              </p>
            </div>

          </div>

          {/* View Full Notes Button */}
          <button
            onClick={() => {  onClose();  navigate(`/knowledge/${note._id}`);
}}
            className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-xl transition"
          >
            📖 View Full Notes
          </button>
        </>
      ) : (
        <p className="text-slate-300">
          No notes available.
        </p>
      )}
    </div>
  );
}