import ProgressBar from "./ProgressBar";

export default function ActivityCard({ stats }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-bold">
        Today's Progress
      </h2>

      <div className="space-y-6">

        <div>
          <p className="mb-2">
            DSA Sheet
          </p>

          <ProgressBar value={68} />
        </div>

        <div>
          <p className="mb-2">
            Resume Completion
          </p>

          <ProgressBar
              value={stats.resumeScore}
              color="bg-green-500"
          />
        </div>

        <div>
          <p className="mb-2">
            Applications
          </p>

          <ProgressBar
            value={stats.applicationProgress}
            color="bg-yellow-500"
        />
        </div>

      </div>
    </div>
  );
}