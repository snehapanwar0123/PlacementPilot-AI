const ProblemTable = ({ problems, onComplete }) => {
  if (!problems.length) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center">
        No problems found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-5 py-3 text-left">Problem</th>
            <th className="px-5 py-3 text-left">Topic</th>
            <th className="px-5 py-3 text-left">Difficulty</th>
            <th className="px-5 py-3 text-left">Sheet</th>
            <th className="px-5 py-3 text-left">Companies</th>
            <th className="px-5 py-3 text-center">Status</th>
            <th className="px-5 py-3 text-center">Solve</th>
          </tr>
        </thead>

        <tbody>
          {problems.map((problem) => (
            <tr
              key={problem._id}
              className="border-t hover:bg-gray-50"
            >
              <td className="px-5 py-4 font-medium">
                {problem.title}
              </td>

              <td className="px-5 py-4">
                {problem.topic}
              </td>

              <td className="px-5 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium
                    ${
                      problem.difficulty === "Easy"
                        ? "bg-green-100 text-green-700"
                        : problem.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {problem.difficulty}
                </span>
              </td>

              <td className="px-5 py-4">
                {problem.sheet}
              </td>

              <td className="px-5 py-4">
                <div className="flex flex-wrap gap-2">
                  {problem.companyTags.map((company) => (
                    <span
                      key={company}
                      className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </td>

              <td className="px-5 py-4 text-center">
                {problem.completed ? (
                  <span className="text-green-600 font-semibold">
                    ✓ Completed
                  </span>
                ) : (
                  <button
                    onClick={() => onComplete(problem._id)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Mark Complete
                  </button>
                )}
              </td>

              <td className="px-5 py-4 text-center">
                <a
                  href={problem.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Solve
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemTable;