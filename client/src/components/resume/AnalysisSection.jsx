export default function AnalysisSection({
  title,
  items,
  color,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className={`mb-4 text-xl font-bold ${color}`}>
        {title}
      </h2>

      <ul className="space-y-3">

        {items.map((item, index) => (
          <li key={index}>
            • {item}
          </li>
        ))}

      </ul>

    </div>
  );
}