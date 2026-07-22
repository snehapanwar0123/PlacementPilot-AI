import { useEffect, useState } from "react";

export default function ATSScoreCard({ score }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      current += 1;

      if (current >= score) {
        current = score;
        clearInterval(interval);
      }

      setProgress(current);
    }, 15);

    return () => clearInterval(interval);
  }, [score]);

  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  const getColor = () => {
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#facc15";
    return "#ef4444";
  };

  const getLabel = () => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-lg">
      <h2 className="mb-8 text-center text-2xl font-bold text-white">
        ATS Score
      </h2>

      <div className="flex flex-col items-center">
        <div className="relative h-40 w-40">
          <svg
            height="160"
            width="160"
            className="-rotate-90 transform"
          >
            <circle
              stroke="#334155"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx="80"
              cy="80"
            />

            <circle
              stroke={getColor()}
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              r={normalizedRadius}
              cx="80"
              cy="80"
              style={{
                transition: "stroke-dashoffset 0.5s ease",
              }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white">
              {progress}%
            </span>

            <span className="mt-1 text-sm text-slate-400">
              ATS Score
            </span>
          </div>
        </div>

        <div
          className="mt-6 rounded-full px-4 py-2 text-sm font-semibold text-white"
          style={{ backgroundColor: getColor() }}
        >
          {getLabel()}
        </div>

        <p className="mt-4 max-w-md text-center text-slate-400">
          This score estimates how well your resume is optimized for
          Applicant Tracking Systems based on formatting, keywords,
          and content quality.
        </p>
      </div>
    </div>
  );
}