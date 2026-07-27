import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

const CustomToolbar = ({ label, onNavigate, onView, view }) => {
  const views = ["month", "week", "day", "agenda"];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

      {/* Left */}
      <div className="flex items-center gap-3">

        <button
          onClick={() => onNavigate("PREV")}
          className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-indigo-600 transition flex items-center justify-center"
        >
          <ChevronLeft className="text-white" size={20} />
        </button>

        <button
          onClick={() => onNavigate("TODAY")}
          className="px-5 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition"
        >
          Today
        </button>

        <button
          onClick={() => onNavigate("NEXT")}
          className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-indigo-600 transition flex items-center justify-center"
        >
          <ChevronRight className="text-white" size={20} />
        </button>

      </div>

      {/* Center */}

      <div className="flex items-center gap-3">
        <CalendarDays
          className="text-indigo-400"
          size={30}
        />

        <div>
          <h2 className="text-3xl font-bold text-white">
            {label}
          </h2>

          <p className="text-slate-400 text-sm">
            Plan your placement journey
          </p>
        </div>
      </div>

      {/* Right */}

      <div className="flex rounded-xl overflow-hidden bg-slate-800">

        {views.map((v) => (
          <button
            key={v}
            onClick={() => onView(v)}
            className={`px-5 py-3 capitalize transition
            ${
              view === v
                ? "bg-indigo-600 text-white"
                : "text-slate-300 hover:bg-slate-700"
            }`}
          >
            {v}
          </button>
        ))}

      </div>

    </div>
  );
};

export default CustomToolbar;