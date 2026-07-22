export default function StatCard({
  title,
  value,
  icon,
  color = "text-violet-500",
}) {
  const Icon = icon;

  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:shadow-xl hover:shadow-violet-500/10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2 className={`mt-3 text-4xl font-bold ${color}`}>
            {value}
          </h2>
        </div>

        <div className="rounded-xl bg-slate-800 p-3 transition group-hover:bg-violet-600">
          <Icon size={30} className="text-white" />
        </div>
      </div>
    </div>
  );
}