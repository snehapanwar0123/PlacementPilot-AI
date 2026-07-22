export default function ResumeHistory({
  resumes,
  onView,
}) {
  return (
    <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Resume History
        </h2>

        <span className="rounded-full bg-violet-600 px-3 py-1 text-sm font-medium text-white">
          {resumes.length} Resume{resumes.length !== 1 ? "s" : ""}
        </span>
      </div>

      {resumes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 p-10 text-center">
          <p className="text-slate-400">
            No resume analyses found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800 p-5 transition hover:border-violet-500 hover:shadow-lg"
            >
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {resume.fileName}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {new Date(resume.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    resume.atsScore >= 80
                      ? "bg-green-600 text-white"
                      : resume.atsScore >= 60
                      ? "bg-yellow-500 text-black"
                      : "bg-red-600 text-white"
                  }`}
                >
                  ATS {resume.atsScore}%
                </span>

                <button
                  onClick={() =>
                    onView({
                      atsScore: resume.atsScore,
                      strengths: resume.strengths,
                      weaknesses: resume.weaknesses,
                      suggestions: resume.suggestions,
                    })
                  }
                  className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}