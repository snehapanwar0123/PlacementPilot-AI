export default function Card({ children }) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">
      {children}
    </div>
  );
}