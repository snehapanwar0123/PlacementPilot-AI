import { useEffect, useState } from "react";
import {
  generateRoadmap,
  getRoadmap,
} from "../services/roadmapService";
import { generateSmartNote } from "../services/noteService";

export default function Roadmap() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedNote, setSelectedNote] = useState(null);
  const [loadingNote, setLoadingNote] = useState(false);

  const [form, setForm] = useState({
    role: "",
    currentLevel: "Beginner",
    duration: "8 Weeks",
    dailyHours: 2,
  });

  const fetchRoadmap = async () => {
    try {
      const data = await getRoadmap();
      setRoadmap(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmap();
  }, []);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const data = await generateRoadmap(form);
      setRoadmap(data);
      setSelectedNote(null);
    } catch (error) {
      console.error(error);
      alert("Failed to generate roadmap.");
    } finally {
      setLoading(false);
    }
  };

  const handleTopicClick = async (topic) => {
    try {
      setLoadingNote(true);

      const note = await generateSmartNote(roadmap._id, topic.title);

      setSelectedNote(note);
    } catch (error) {
      console.error(error);
      alert("Failed to load smart notes.");
    } finally {
      setLoadingNote(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl p-8">
        <h1 className="mb-8 text-4xl font-bold text-violet-400">
          AI Career Roadmap
        </h1>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <input
              className="rounded-lg bg-slate-800 p-3"
              placeholder="Target Role"
              value={form.role}
              onChange={(e) =>
                setForm({
                  ...form,
                  role: e.target.value,
                })
              }
            />

            <select
              className="rounded-lg bg-slate-800 p-3"
              value={form.currentLevel}
              onChange={(e) =>
                setForm({
                  ...form,
                  currentLevel: e.target.value,
                })
              }
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            <input
              className="rounded-lg bg-slate-800 p-3"
              value={form.duration}
              onChange={(e) =>
                setForm({
                  ...form,
                  duration: e.target.value,
                })
              }
            />

            <input
              type="number"
              className="rounded-lg bg-slate-800 p-3"
              value={form.dailyHours}
              onChange={(e) =>
                setForm({
                  ...form,
                  dailyHours: Number(e.target.value),
                })
              }
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-6 rounded-lg bg-violet-600 px-6 py-3 hover:bg-violet-700"
          >
            {loading ? "Generating..." : "Generate Roadmap"}
          </button>
        </div>

        {roadmap && (
          <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-6 text-2xl font-bold">{roadmap.role}</h2>

            <div className="space-y-8">
              {roadmap.sections.map((section) => (
                <div key={section.title}>
                  <h3 className="mb-3 text-xl font-semibold text-violet-400">
                    {section.title}
                  </h3>

                  <div className="space-y-2">
                    {section.topics.map((topic, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg bg-slate-800 p-3"
                      >
                        <button
                          onClick={() => handleTopicClick(topic)}
                          className="text-left hover:text-violet-400 transition-colors"
                        >
                          {topic.title}
                        </button>

                        <span className="text-sm text-slate-400">
                          {topic.estimatedHours} hrs
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {loadingNote && (
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p>Generating Smart Notes...</p>
          </div>
        )}

        {selectedNote && (
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-6">
            <h2 className="text-3xl font-bold text-violet-400">
              {selectedNote.topic}
            </h2>

            <div>
              <h3 className="mb-2 text-xl font-semibold">Explanation</h3>
              <p>{selectedNote.explanation}</p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">Key Concepts</h3>
              <ul className="list-disc pl-6">
                {selectedNote.keyConcepts.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Common Mistakes
              </h3>
              <ul className="list-disc pl-6">
                {selectedNote.commonMistakes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Interview Questions
              </h3>
              <ul className="list-disc pl-6">
                {selectedNote.interviewQuestions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">Example Code</h3>
              <pre className="overflow-auto rounded-lg bg-slate-800 p-4">
                <code>{selectedNote.exampleCode}</code>
              </pre>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Revision Summary
              </h3>
              <p>{selectedNote.revisionSummary}</p>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold">Quiz</h3>

              {selectedNote.quiz.map((q, index) => (
                <div
                  key={index}
                  className="mb-6 rounded-lg bg-slate-800 p-4"
                >
                  <p className="font-semibold">
                    {index + 1}. {q.question}
                  </p>

                  <ul className="mt-3 space-y-2">
                    {q.options.map((option, i) => (
                      <li key={i}>• {option}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}