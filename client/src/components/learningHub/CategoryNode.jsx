import { Handle, Position } from "reactflow";

import {
    ChevronDown,
    ChevronRight,
    BookOpen
} from "lucide-react";
export default function CategoryNode({ data }) {
  return (
    <>
      <Handle type="target" position={Position.Top} />

      <div
        onClick={data.onClick}
        className="
        group
        w-52
        rounded-2xl
        border
        border-violet-500/20
        bg-slate-900/80
        backdrop-blur-xl
        p-5
        shadow-[0_0_30px_rgba(139,92,246,0.15)]
        transition-all
        duration-300
        hover:scale-105
        hover:border-violet-400
        hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]
        cursor-pointer
      "
      >
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-violet-500/20 p-3">
            <BookOpen className="h-7 w-7 text-violet-400" />
          </div>
        </div>

        <h2 className="text-center text-lg font-semibold text-white">
          {data.label}
        </h2>

            <div className="mt-3 flex items-center justify-center gap-2 text-slate-400">

            {data.expanded ? (
                <ChevronDown size={16}/>
            ) : (
                <ChevronRight size={16}/>
            )}

            <span className="text-sm">
                {data.subtitle}
            </span>

        </div>
      </div>

      <Handle type="source" position={Position.Bottom} />
    </>
  );
}