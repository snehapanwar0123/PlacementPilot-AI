import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QuizSection from "../components/knowledgeHub/QuizSection";

const KnowledgeDetails = () => {
  const { id } = useParams();

  const [note, setNote] = useState(null);
const [loading, setLoading] = useState(true);

const [selectedAnswers, setSelectedAnswers] = useState({});
const [showResults, setShowResults] = useState(false);
const [score, setScore] = useState(0);

  useEffect(() => {
    fetchNote();
  }, []);

  const fetchNote = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;

      const { data } = await axios.get(
        `http://localhost:5000/api/notes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNote(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading Notes...
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-400">
        Note not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 px-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold mb-8">
          {note.topic}
        </h1>

        <Section
          title="📖 Explanation"
          content={note.explanation}
        />

        <Section
          title="💡 Key Concepts"
          list={note.keyConcepts}
        />

        <Section
          title="⚠ Common Mistakes"
          list={note.commonMistakes}
        />

        <Section
          title="🎯 Interview Questions"
          list={note.interviewQuestions}
        />

        <Section
          title="📄 Revision Summary"
          content={note.revisionSummary}
        />

        <Section
          title="💻 Example Code"
          code={note.exampleCode}
        />

        <QuizSection
            quiz={note.quiz}
            selectedAnswers={selectedAnswers}
            setSelectedAnswers={setSelectedAnswers}
            showResults={showResults}
            setShowResults={setShowResults}
            score={score}
            setScore={setScore}
          />

      </div>
    </div>
  );
};

const Section = ({ title, content, list, code }) => (
  <div className="bg-slate-900 rounded-xl p-6 mb-8 border border-slate-800">

    <h2 className="text-2xl font-semibold mb-4">
      {title}
    </h2>

    {content && (
      <p className="text-slate-300 whitespace-pre-wrap leading-8">
        {content}
      </p>
    )}

    {list && (
  <div className="space-y-4">
    {list.map((item, index) => {
      if (typeof item === "string") {
        return (
          <div
            key={index}
            className="bg-slate-800 rounded-lg p-3"
          >
            {item}
          </div>
        );
      }

      return (
        <div
          key={index}
          className="bg-slate-800 rounded-lg p-4"
        >
          <p className="font-semibold mb-3">
            Q{index + 1}. {item.question}
          </p>

          <div className="space-y-2">
            {item.options?.map((option, i) => (
              <div
                key={i}
                className="bg-slate-700 rounded p-2"
              >
                {option}
              </div>
            ))}
          </div>

          <p className="mt-3 text-green-400">
            Answer: {item.answer}
          </p>
        </div>
      );
    })}
  </div>
)}

    {code && (
      <pre className="bg-black rounded-lg p-5 overflow-auto text-green-400">
        <code>{code}</code>
      </pre>
    )}

  </div>
);

export default KnowledgeDetails;