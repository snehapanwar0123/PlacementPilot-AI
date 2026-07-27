import { Handle, Position } from "reactflow";
import { BookText } from "lucide-react";

export default function TopicNode({ data }) {
  return (
    <>
      <Handle type="target" position={Position.Top} />

      <div
        onClick={data.onClick}
        className="
          w-40
          rounded-xl
          border
          border-cyan-500/20
          bg-slate-800/90
          backdrop-blur-lg
          p-3
          transition-all
          duration-300
          hover:scale-105
          hover:border-cyan-400
          hover:shadow-[0_0_20px_rgba(34,211,238,0.35)]
          cursor-pointer
          active:scale-95
        "
      >
        <div className="flex justify-center mb-2">
          <BookText className="h-6 w-6 text-cyan-400" />
        </div>

        <h3 className="text-center text-sm font-semibold text-white">
          {data.label}
        </h3>

        <p className="text-center text-xs text-slate-400 mt-1">
          Click to open notes →
        </p>
      </div>

      <Handle type="source" position={Position.Bottom} />
    </>
  );
}