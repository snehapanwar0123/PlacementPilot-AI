import { Handle, Position } from "reactflow";
import { Target } from "lucide-react";

export default function RootNode({ data }) {
  return (
    <>
      <Handle type="source" position={Position.Bottom} />

      <div
        className="
          w-72
          rounded-3xl
          border
          border-violet-400/40
          bg-slate-900/80
          backdrop-blur-xl
          px-8
          py-6
          shadow-[0_0_60px_rgba(139,92,246,0.35)]
          transition-all
          duration-300
          hover:scale-105
          hover:shadow-[0_0_80px_rgba(139,92,246,0.55)]
        "
      >
        <div className="flex justify-center">
          <div className="rounded-full bg-violet-500/20 p-4">
            <Target className="h-10 w-10 text-violet-400" />
          </div>
        </div>

        <h1 className="mt-5 text-center text-2xl font-bold text-white">
          {data.label}
        </h1>

        <p className="mt-2 text-center text-sm text-slate-400">
          Your AI Learning Universe
        </p>
      </div>
    </>
  );
}