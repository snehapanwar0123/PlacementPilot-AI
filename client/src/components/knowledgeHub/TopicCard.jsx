import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TopicCard = ({ note }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`bg-slate-900 border border-slate-700 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-1 ${
        expanded ? "min-h-[320px]" : "min-h-[220px]"
      }`}
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-2xl mb-5">
        ☁
      </div>

      {/* Topic */}
      <h2 className="text-xl font-bold text-white">
        {note.topic}
      </h2>

      {/* Count */}
      <p className="text-slate-400 mt-2">
        {note.roadmaps.length} Related Roles
      </p>

      {/* Expand */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-6 flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
      >
        {expanded ? (
          <>
            Collapse <ChevronUp size={18} />
          </>
        ) : (
          <>
            Expand for Details <ChevronDown size={18} />
          </>
        )}
      </button>

      {/* Expanded Section */}
      {expanded && (
        <div className="mt-6 animate-fade-in">

          <h3 className="font-semibold text-white mb-3">
            Used In
          </h3>

          <div className="space-y-2">

            {note.roadmaps.map((item, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300"
              >
                ✓ {item.role}
              </div>
            ))}

          </div>

          <button
            onClick={() => navigate(`/knowledge/${note._id}`)}
            className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 rounded-lg py-3 flex justify-center items-center gap-2 font-semibold transition"
          >
            <BookOpen size={18} />
            View Full Notes
          </button>

        </div>
      )}
    </div>
  );
};

export default TopicCard;