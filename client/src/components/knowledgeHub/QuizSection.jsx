import { useEffect } from "react";

const QuizSection = ({
  quiz,
  selectedAnswers,
  setSelectedAnswers,
  showResults,
  setShowResults,
  score,
  setScore,
}) => {
  useEffect(() => {
    if (!showResults) return;

    let total = 0;

    quiz.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        total++;
      }
    });

    setScore(total);
  }, [showResults]);

  const handleSelect = (questionIndex, option) => {
    if (showResults) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-6">
        📝 Quiz
      </h2>

      <div className="space-y-8">
        {quiz.map((q, questionIndex) => (
          <div key={questionIndex}>
            <h3 className="font-semibold mb-4">
              Q{questionIndex + 1}. {q.question}
            </h3>

            <div className="space-y-3">
              {q.options.map((option, optionIndex) => {
                const selected =
                  selectedAnswers[questionIndex] === option;

                const correct =
                  option === q.answer;

                let classes =
                  "w-full text-left rounded-lg p-3 border transition";

                if (!showResults) {
                  classes += selected
                    ? " border-cyan-500 bg-cyan-500/10"
                    : " border-slate-700 bg-slate-800 hover:border-cyan-500";
                } else {
                  if (correct) {
                    classes +=
                      " border-green-500 bg-green-500/20";
                  } else if (selected) {
                    classes +=
                      " border-red-500 bg-red-500/20";
                  } else {
                    classes +=
                      " border-slate-700 bg-slate-800";
                  }
                }

                return (
                  <button
                    key={optionIndex}
                    onClick={() =>
                      handleSelect(questionIndex, option)
                    }
                    className={classes}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {showResults && (
              <p className="mt-3 text-green-400">
                Correct Answer: {q.answer}
              </p>
            )}
          </div>
        ))}
      </div>

      {!showResults ? (
        <button
          onClick={() => setShowResults(true)}
          className="mt-8 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-semibold"
        >
          Submit Quiz
        </button>
      ) : (
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">
            🎉 Score: {score} / {quiz.length}
          </h3>

          <button
            onClick={resetQuiz}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold"
          >
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizSection;