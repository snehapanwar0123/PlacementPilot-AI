import { CalendarClock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UpcomingDeadlines({ deadlines = [] }) {
  const navigate = useNavigate();

  return (
    <div className="h-full rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <div className="mb-5 flex items-center gap-2">
        <CalendarClock className="text-violet-400" />
        <h2 className="text-xl font-bold">
          Upcoming Deadlines
        </h2>
      </div>

      {deadlines.length === 0 ? (
        <p className="text-slate-400">
          No upcoming deadlines.
        </p>
      ) : (
        <div className="space-y-4">
          {deadlines.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate("/company-tracker")}
              className="cursor-pointer rounded-xl border border-slate-800 p-4 transition hover:border-violet-500 hover:bg-slate-800"
            >
              <h3 className="font-semibold">
                {item.companyName}
              </h3>

              <p className="text-sm text-slate-400">
                {item.role}
              </p>

              <p className="mt-2 text-sm text-red-400">
                {new Date(item.deadline).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}