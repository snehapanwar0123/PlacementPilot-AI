const ProgressCard = ({ progress }) => {
  if (!progress) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border">
      <h2 className="text-2xl font-semibold mb-4">
        Your Progress
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-gray-500 text-sm">Completed</p>
          <h3 className="text-3xl font-bold">
            {progress.completedProblems} / {progress.totalProblems}
          </h3>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Completion</p>
          <h3 className="text-3xl font-bold">
            {progress.completionPercentage}%
          </h3>
        </div>

        <div>
          <p className="text-gray-500 text-sm mb-2">
            Overall Progress
          </p>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${progress.completionPercentage}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;