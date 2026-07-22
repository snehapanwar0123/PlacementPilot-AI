import { Sparkles } from "lucide-react";

export default function AICoachCard() {
  return (
    <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-600/20 to-slate-900 p-6">

      <div className="mb-4 flex items-center gap-3">

        <Sparkles className="text-violet-400" />

        <h2 className="text-xl font-bold">
          AI Coach
        </h2>

      </div>

      <p className="leading-7 text-slate-300">
        You're making consistent progress.
        Finish two Graph problems today,
        revise DBMS for 30 minutes,
        and submit one internship application.
      </p>

    </div>
  );
}